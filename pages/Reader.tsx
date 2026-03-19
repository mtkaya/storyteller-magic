import React, { useState, useEffect, useRef } from 'react';
import { Story, StoryBranch, StoryChoice } from '../types';
import { LIBRARY_STORIES } from '../data';
import SleepController from '../components/SleepController';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { MusicType, backgroundMusic } from '../services/backgroundMusic';
import { soundEffects } from '../services/soundEffects';
import { getStoryCoverUrl } from '../services/illustrationCovers';
import { translateSegmentsToTurkish } from '../services/storyTranslation';
import { getLocalizedStoryTitle, getLocalizedThemeName } from '../services/storyLocalization';
import { resolveStorySceneVisual } from '../services/storySceneVisuals';
import { deriveStoryVisualIdentity } from '../storyUtils';
import { useReadingAssistant } from '../hooks/useReadingAssistant';
import { isOpenAITTSAvailable, speakParagraph as speakParagraphOpenAI } from '../services/openaiTTS';

interface ReaderProps {
  story: Story | null;
  onBack: () => void;
  currentMusic?: MusicType;
  onMusicChange?: (music: MusicType) => void;
  onMusicClick?: () => void;
}

const STORY_API_BASE_URL = import.meta.env.VITE_STORY_API_URL?.trim() || '';
const TTS_API_PATH = '/api/tts';
const PREMIUM_TTS_TIMEOUT_MS = 35_000;
const PREMIUM_TTS_DISABLE_STATUSES = new Set([400, 401, 403, 404, 405, 500, 501]);

const resolveTtsApiEndpoint = (): string => {
  if (!STORY_API_BASE_URL) return TTS_API_PATH;
  return `${STORY_API_BASE_URL.replace(/\/+$/, '')}${TTS_API_PATH}`;
};

const HIGH_QUALITY_VOICE_HINTS = ['neural', 'natural', 'premium', 'enhanced', 'wavenet', 'google', 'siri', 'apple', 'microsoft'];
const LOW_QUALITY_VOICE_HINTS = ['espeak', 'compact', 'default'];
const LANGUAGE_VOICE_HINTS: Record<'en' | 'tr', string[]> = {
  en: ['samantha', 'karen', 'daniel', 'serena', 'moira'],
  tr: ['yelda', 'filiz', 'mert', 'cem', 'tr']
};

const SPEECH_SYMBOL_REPLACEMENTS: Record<'en' | 'tr', Array<[RegExp, string]>> = {
  en: [
    [/%/g, ' percent '],
    [/\+/g, ' plus '],
    [/\//g, ' over '],
    [/@/g, ' at '],
    [/#/g, ' number '],
    [/&/g, ' and ']
  ],
  tr: [
    [/%/g, ' yüzde '],
    [/\+/g, ' artı '],
    [/\//g, ' bölü '],
    [/@/g, ' et '],
    [/#/g, ' numara '],
    [/&/g, ' ve ']
  ]
};

const splitByWordBudget = (text: string, maxLength: number): string[] => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const parts: string[] = [];
  let buffer = '';

  for (const word of words) {
    const candidate = buffer ? `${buffer} ${word}` : word;
    if (candidate.length <= maxLength || !buffer) {
      buffer = candidate;
    } else {
      parts.push(buffer);
      buffer = word;
    }
  }

  if (buffer) parts.push(buffer);
  return parts;
};

const splitLongSentenceForSpeech = (sentence: string, maxLength: number): string[] => {
  const clauses = sentence.match(/[^,;:]+[,;:]?/g) || [sentence];
  const chunks: string[] = [];
  let buffer = '';

  for (const clause of clauses) {
    const nextClause = clause.trim();
    if (!nextClause) continue;

    if (!buffer) {
      if (nextClause.length <= maxLength) {
        buffer = nextClause;
      } else {
        const splitParts = splitByWordBudget(nextClause, maxLength);
        chunks.push(...splitParts.slice(0, -1));
        buffer = splitParts[splitParts.length - 1] || '';
      }
      continue;
    }

    const candidate = `${buffer} ${nextClause}`;
    if (candidate.length <= maxLength) {
      buffer = candidate;
      continue;
    }

    chunks.push(buffer);
    if (nextClause.length <= maxLength) {
      buffer = nextClause;
    } else {
      const splitParts = splitByWordBudget(nextClause, maxLength);
      chunks.push(...splitParts.slice(0, -1));
      buffer = splitParts[splitParts.length - 1] || '';
    }
  }

  if (buffer) chunks.push(buffer);
  return chunks;
};

const sanitizeTextForSpeech = (rawText: string, currentLanguage: 'en' | 'tr'): string => {
  let text = rawText
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\.{4,}/g, '…')
    .replace(/--+/g, ', ')
    .replace(/[_*~`]/g, ' ')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, ' ')
    .replace(/[()[\]{}]/g, ' ')
    .trim();

  for (const [pattern, replacement] of SPEECH_SYMBOL_REPLACEMENTS[currentLanguage]) {
    text = text.replace(pattern, replacement);
  }

  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.!?…;:])/g, '$1')
    .trim();
};

const splitTextForSpeech = (rawText: string, currentLanguage: 'en' | 'tr'): string[] => {
  const normalized = sanitizeTextForSpeech(rawText, currentLanguage);
  if (!normalized) return [];

  const maxChunkLength = currentLanguage === 'tr' ? 155 : 180;
  const sentences = normalized.match(/[^.!?…]+[.!?…]?/g) || [normalized];
  const chunks: string[] = [];

  for (const sentence of sentences) {
    const nextSentence = sentence.trim();
    if (!nextSentence) continue;

    if (nextSentence.length <= maxChunkLength) {
      chunks.push(nextSentence);
      continue;
    }

    const splitChunks = splitLongSentenceForSpeech(nextSentence, maxChunkLength);
    chunks.push(...splitChunks);
  }

  return chunks.length > 0 ? chunks : [normalized];
};

const chunkPauseMs = (chunk: string): number => {
  const trimmed = chunk.trim();
  if (!trimmed) return 120;

  const lastChar = trimmed[trimmed.length - 1];
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const pacingBoost = Math.min(180, wordCount * 8);

  if (lastChar === '.') return 180 + pacingBoost;
  if (lastChar === '!' || lastChar === '?') return 240 + pacingBoost;
  if (lastChar === '…') return 320 + pacingBoost;
  if (lastChar === ',' || lastChar === ';' || lastChar === ':') return 150 + Math.round(pacingBoost * 0.6);
  return 120 + Math.round(pacingBoost * 0.5);
};

const pickBestVoice = (voices: SpeechSynthesisVoice[], currentLanguage: 'en' | 'tr'): SpeechSynthesisVoice | null => {
  if (voices.length === 0) return null;

  const scored = voices.map((voice) => {
    const name = voice.name.toLowerCase();
    const lang = voice.lang.toLowerCase();
    let score = 0;

    if (currentLanguage === 'tr') {
      if (lang.startsWith('tr')) score += 90;
      if (lang === 'tr-tr') score += 25;
    } else {
      if (lang.startsWith('en')) score += 90;
      if (lang === 'en-us' || lang === 'en-gb') score += 25;
    }

    if (!voice.localService) score += 10;

    for (const hint of HIGH_QUALITY_VOICE_HINTS) {
      if (name.includes(hint)) score += 8;
    }

    for (const hint of LANGUAGE_VOICE_HINTS[currentLanguage]) {
      if (name.includes(hint)) score += 10;
    }

    for (const hint of LOW_QUALITY_VOICE_HINTS) {
      if (name.includes(hint)) score -= 12;
    }

    return { voice, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.voice || null;
};

const splitParagraphForReader = (paragraph: string): string[] => {
  const cleaned = paragraph.trim();
  if (!cleaned) return [];

  const sentences = cleaned
    .match(/[^.!?…]+[.!?…]?/g)
    ?.map((segment) => segment.trim())
    .filter(Boolean) || [cleaned];

  if (sentences.length <= 2) return [cleaned];

  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(' ').trim());
  }
  return chunks.filter(Boolean);
};

const ensureMinimumLinearParagraphs = (paragraphs: string[], language: 'en' | 'tr'): string[] => {
  const targetCount = 8;
  const seeded = [...paragraphs];
  if (seeded.length >= targetCount) return seeded;

  const fillers =
    language === 'tr'
      ? [
        'Gece biraz daha sakinleşti ve herkes derin bir nefes aldı.',
        'Ay ışığı, yolun üstüne yumuşak bir huzur serdi.',
        'Küçük kahramanımız, kalbindeki cesaretle gülümsemeye devam etti.',
        'Sessizce esen rüzgar, herkese güven veren bir ninni gibi duyuldu.',
      ]
      : [
        'The night grew calmer, and everyone took a deep gentle breath.',
        'Moonlight spread a soft layer of comfort across the path.',
        'Our little hero kept smiling with quiet courage in their heart.',
        'A soft breeze sounded like a lullaby and made everyone feel safe.',
      ];

  while (seeded.length < targetCount) {
    seeded.push(fillers[seeded.length % fillers.length]);
  }

  return seeded;
};

const TURKISH_TRANSLATION_FALLBACK_LINES = [
  'Masalın bu bölümünün Türkçe uyarlaması hazırlanırken kahramanımız yoluna umutla devam etti.',
  'Gece yumuşarken küçük kahramanımız yeni bir seçimle macerasını sürdürdü.',
  'Kalbindeki cesaretle ilerleyen dostumuz, etrafına iyilik ve neşe yaydı.',
  'Ay ışığı altında her adım onu sıcak ve güvenli bir sona biraz daha yaklaştırdı.',
  'Bu yolculukta öğrendiği en önemli şey, birlikte hareket etmenin gücü oldu.',
  'Masalın ritmi sakinleşti ve herkesin içini huzurla dolduran bir an doğdu.',
  'Yeni kapılar açıldıkça kahramanımız merakını ve nezaketini hiç kaybetmedi.',
];

const buildTurkishFallbackParagraphs = (count: number, character?: string): string[] => {
  const safeCount = Math.max(1, count);
  const namePrefix = character && character.trim().length > 0
    ? `${character.trim()} `
    : '';

  return Array.from({ length: safeCount }, (_, index) => {
    const template = TURKISH_TRANSLATION_FALLBACK_LINES[index % TURKISH_TRANSLATION_FALLBACK_LINES.length];
    if (!namePrefix) return template;
    return `${namePrefix}${template.charAt(0).toLowerCase()}${template.slice(1)}`;
  });
};

const buildTurkishChoiceFallbackText = (index: number): string => `Seçenek ${index + 1}`;
const buildTurkishChoiceFallbackConsequence = (): string => 'Bu yol yeni bir maceraya açılıyor.';
const looksLikeTurkishText = (text: string): boolean => {
  if (!text.trim()) return true;
  if (/[ğüşöçıİĞÜŞÖÇ]/.test(text)) return true;
  return /\b(ve|bir|ile|için|ama|gibi|çok|şimdi|gece|hikaye|masal|yol|seçenek)\b/i.test(text);
};
const hasTrustedTurkishParagraphs = (paragraphs: string[] | null | undefined): paragraphs is string[] => {
  if (!paragraphs || paragraphs.length === 0) return false;
  return paragraphs.every((line) => looksLikeTurkishText((line || '').trim()));
};
const sanitizeTurkishParagraphs = (paragraphs: string[], character?: string): string[] => {
  const fallback = buildTurkishFallbackParagraphs(paragraphs.length, character);
  return paragraphs.map((line, index) => {
    const trimmed = (line || '').trim();
    if (!trimmed) return fallback[index];
    return looksLikeTurkishText(trimmed) ? trimmed : fallback[index];
  });
};

const Reader: React.FC<ReaderProps> = ({ story, onBack, currentMusic, onMusicChange, onMusicClick }) => {
  const { recordStoryRead, recordChoice, recordEnding, settings, activeProfile, updateProfile } = useAppState();
  const { language, t } = useLanguage();

  const persistedReadingSpeed = activeProfile?.preferences.readingSpeed ?? 0.9;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [speechRate, setSpeechRate] = useState(persistedReadingSpeed);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Word highlighting state — currentText/words computed after content/hasContent below
  const [wordHighlightEnabled, setWordHighlightEnabled] = useState(false);
  const [autoWordSpeed, setAutoWordSpeed] = useState(300);

  // Reading assistant drawer state
  const [showAssistantDrawer, setShowAssistantDrawer] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState<'text-lg' | 'text-xl' | 'text-2xl'>('text-lg');
  const [readerFontFamily, setReaderFontFamily] = useState<'font-serif' | 'font-sans'>('font-serif');
  const [readerTheme, setReaderTheme] = useState<'dark' | 'light'>('dark');

  // Reflection card state
  const [showReflectionCard, setShowReflectionCard] = useState(false);
  const [reflectionQuestion, setReflectionQuestion] = useState<{
    question: string;
    questionTr: string;
    options: string[];
    optionsTr: string[];
  } | null>(null);

  // Interactive story state
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);
  const [storyPath, setStoryPath] = useState<Array<{ id: string; text: string; emoji?: string }>>([]); // Track choices made
  const [showChoices, setShowChoices] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [navigationError, setNavigationError] = useState<string | null>(null);
  const [translatedLinearContent, setTranslatedLinearContent] = useState<string[] | null>(null);
  const [translatedBranchParagraphs, setTranslatedBranchParagraphs] = useState<Record<string, string[]>>({});
  const [translatedChoiceTexts, setTranslatedChoiceTexts] = useState<Record<string, string>>({});
  const [translatedChoiceConsequences, setTranslatedChoiceConsequences] = useState<Record<string, string>>({});
  const [isTranslatingCurrentContent, setIsTranslatingCurrentContent] = useState(false);

  // Sleep controller state
  const [sleepControllerActive, setSleepControllerActive] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const currentOpenAIAudioRef = useRef<HTMLAudioElement | null>(null);
  const premiumTtsAvailableRef = useRef(true);
  const isPlayingRef = useRef(false);
  const speechSessionRef = useRef(0);
  const storyStartTime = useRef<number>(Date.now());
  const completionEventRef = useRef<string | null>(null);
  const discoveredEndingKeysRef = useRef<Set<string>>(new Set());

  const stopPremiumAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
      audioRef.current = null;
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  };

  const cancelSpeech = () => {
    speechSessionRef.current += 1;
    if (synthRef.current) synthRef.current.cancel();
    stopPremiumAudio();
    if (currentOpenAIAudioRef.current) {
      currentOpenAIAudioRef.current.pause();
      currentOpenAIAudioRef.current = null;
    }
    setIsSpeaking(false);
  };

  // Enable sleep controller when playing
  useEffect(() => {
    setSleepControllerActive(isPlaying);
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!currentMusic || currentMusic === 'none') {
      backgroundMusic.setDucking(false);
      return;
    }

    backgroundMusic.setDucking(isSpeaking);
    return () => {
      backgroundMusic.setDucking(false);
    };
  }, [isSpeaking, currentMusic]);

  // Handle sleep detection - goodnight and close
  const handleSleepDetected = () => {
    setIsPlaying(false);
    cancelSpeech();
    // Go back to main screen after goodnight
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  const handleUserAwake = () => {
    // User is still listening, continue
  };

  const hasPlayableStoryData = (candidate: Story | null | undefined) =>
    Boolean(
      candidate &&
      ((candidate.content && candidate.content.length > 0) ||
        (candidate.branches && candidate.branches.length > 0))
    );

  // Use provided story or fallback. If selected card has no paragraphs/branches,
  // hydrate it with the closest playable story to avoid "empty story" screens.
  const defaultStory = LIBRARY_STORIES.find(s => hasPlayableStoryData(s)) || LIBRARY_STORIES[0];
  const activeStory = React.useMemo(() => {
    if (!story) return defaultStory;
    if (hasPlayableStoryData(story)) return story;

    const sameIdStory = LIBRARY_STORIES.find(
      candidate => candidate.id === story.id && hasPlayableStoryData(candidate)
    );
    if (sameIdStory) {
      return {
        ...sameIdStory,
        ...story,
        content: sameIdStory.content,
        contentTr: sameIdStory.contentTr,
        branches: sameIdStory.branches,
        isInteractive: sameIdStory.isInteractive,
        startBranchId: sameIdStory.startBranchId,
      };
    }

    const sameThemeStory = LIBRARY_STORIES.find(
      candidate => candidate.theme === story.theme && hasPlayableStoryData(candidate)
    );
    if (sameThemeStory) {
      return sameThemeStory;
    }

    return defaultStory;
  }, [story, defaultStory]);

  // Derive visual identity for companion/place display and color palette
  const visualIdentity = React.useMemo(() => deriveStoryVisualIdentity(activeStory), [activeStory]);

  // Check if this is an interactive story
  const isInteractiveStory = activeStory.isInteractive && activeStory.branches && activeStory.branches.length > 0;
  const initialBranchId = activeStory.startBranchId || activeStory.branches?.[0]?.id || null;

  // Get current branch for interactive stories
  const currentBranch: StoryBranch | null = isInteractiveStory
    ? activeStory.branches!.find(b => b.id === (currentBranchId || activeStory.startBranchId)) || null
    : null;

  const buildChoiceTranslationKey = (branchId: string, choiceId: string) => `${branchId}:${choiceId}`;
  const localizedStoryTitle = getLocalizedStoryTitle(activeStory, language);
  const localizedThemeName = getLocalizedThemeName(activeStory.theme, language);

  const getLocalizedChoiceText = (choice: StoryChoice, branchId?: string | null): string => {
    if (language !== 'tr') return choice.text;
    if (choice.textTr && choice.textTr.trim().length > 0 && looksLikeTurkishText(choice.textTr)) return choice.textTr;
    if (branchId) {
      const translated = translatedChoiceTexts[buildChoiceTranslationKey(branchId, choice.id)];
      if (translated && looksLikeTurkishText(translated)) return translated;
    }
    const branchChoices = currentBranch?.choices || [];
    const choiceIndex = branchChoices.findIndex((item) => item.id === choice.id);
    return buildTurkishChoiceFallbackText(choiceIndex >= 0 ? choiceIndex : 0);
  };

  const getLocalizedChoiceConsequence = (choice: StoryChoice, branchId?: string | null): string | undefined => {
    if (language !== 'tr') return choice.consequence;
    if (choice.consequenceTr && choice.consequenceTr.trim().length > 0 && looksLikeTurkishText(choice.consequenceTr)) return choice.consequenceTr;
    if (branchId) {
      const translated = translatedChoiceConsequences[buildChoiceTranslationKey(branchId, choice.id)];
      if (translated && looksLikeTurkishText(translated)) return translated;
    }
    if (!choice.consequence) return undefined;
    return buildTurkishChoiceFallbackConsequence();
  };

  const normalizeBranchReference = (value: string): string =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9çğıöşü_-]/gi, '');

  const resolveSafeNextBranchId = (targetBranchId: string, fromBranchId?: string): string | null => {
    if (!activeStory.branches || activeStory.branches.length === 0) return null;

    const exactMatch = activeStory.branches.find(branch => branch.id === targetBranchId);
    if (exactMatch) return exactMatch.id;

    const normalizedTarget = normalizeBranchReference(targetBranchId);
    if (normalizedTarget) {
      const normalizedMatch = activeStory.branches.find(
        branch => normalizeBranchReference(branch.id) === normalizedTarget
      );
      if (normalizedMatch) return normalizedMatch.id;
    }

    const preferredEnding = activeStory.branches.find(
      branch => branch.isEnding && branch.id !== fromBranchId
    );
    if (preferredEnding) return preferredEnding.id;

    const alternate = activeStory.branches.find(branch => branch.id !== fromBranchId);
    return alternate?.id || null;
  };

  useEffect(() => {
    setTranslatedLinearContent(null);
    setTranslatedBranchParagraphs({});
    setTranslatedChoiceTexts({});
    setTranslatedChoiceConsequences({});
    setIsTranslatingCurrentContent(false);
  }, [activeStory.id, language]);

  useEffect(() => {
    setSpeechRate(persistedReadingSpeed);
  }, [persistedReadingSpeed, activeProfile?.id]);

  useEffect(() => {
    if (language !== 'tr') return;
    if (isInteractiveStory) return;
    if (hasTrustedTurkishParagraphs(activeStory.contentTr)) return;
    if (hasTrustedTurkishParagraphs(translatedLinearContent)) return;

    const sourceParagraphs = ((activeStory.content && activeStory.content.length > 0)
      ? activeStory.content
      : (activeStory.contentTr || []))
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    if (sourceParagraphs.length === 0) return;

    let cancelled = false;
    setIsTranslatingCurrentContent(true);

    translateSegmentsToTurkish(sourceParagraphs, { contextLabel: `story:${activeStory.id}:linear` })
      .then((translated) => {
        if (cancelled) return;
        setTranslatedLinearContent(translated);
      })
      .catch(() => {
        if (cancelled) return;
        setTranslatedLinearContent(buildTurkishFallbackParagraphs(sourceParagraphs.length, activeStory.character));
      })
      .finally(() => {
        if (!cancelled) setIsTranslatingCurrentContent(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    language,
    isInteractiveStory,
    activeStory.id,
    activeStory.content,
    activeStory.contentTr,
    translatedLinearContent
  ]);

  useEffect(() => {
    if (language !== 'tr') return;
    if (!isInteractiveStory || !currentBranch) return;
    if (hasTrustedTurkishParagraphs(currentBranch.paragraphsTr)) return;
    if (hasTrustedTurkishParagraphs(translatedBranchParagraphs[currentBranch.id])) return;

    const sourceParagraphs = currentBranch.paragraphs
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    if (sourceParagraphs.length === 0) return;

    let cancelled = false;
    setIsTranslatingCurrentContent(true);

    translateSegmentsToTurkish(sourceParagraphs, { contextLabel: `story:${activeStory.id}:branch:${currentBranch.id}` })
      .then((translated) => {
        if (cancelled) return;
        setTranslatedBranchParagraphs((previous) => ({
          ...previous,
          [currentBranch.id]: translated
        }));
      })
      .catch(() => {
        if (cancelled) return;
        setTranslatedBranchParagraphs((previous) => ({
          ...previous,
          [currentBranch.id]: buildTurkishFallbackParagraphs(sourceParagraphs.length, activeStory.character)
        }));
      })
      .finally(() => {
        if (!cancelled) setIsTranslatingCurrentContent(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    language,
    isInteractiveStory,
    currentBranch,
    activeStory.id,
    translatedBranchParagraphs
  ]);

  useEffect(() => {
    if (language !== 'tr') return;
    if (!isInteractiveStory || !currentBranch?.choices?.length) return;

    const branchId = currentBranch.id;
    const textQueue = currentBranch.choices
      .filter((choice) =>
        !choice.textTr && !translatedChoiceTexts[buildChoiceTranslationKey(branchId, choice.id)]
      )
      .map((choice) => ({ key: buildChoiceTranslationKey(branchId, choice.id), text: choice.text }));

    const consequenceQueue = currentBranch.choices
      .filter((choice) =>
        Boolean(choice.consequence) &&
        !choice.consequenceTr &&
        !translatedChoiceConsequences[buildChoiceTranslationKey(branchId, choice.id)]
      )
      .map((choice) => ({
        key: buildChoiceTranslationKey(branchId, choice.id),
        text: choice.consequence as string
      }));

    if (textQueue.length === 0 && consequenceQueue.length === 0) return;

    let cancelled = false;

    const translateChoices = async () => {
      try {
        if (textQueue.length > 0) {
          const translatedTexts = await translateSegmentsToTurkish(
            textQueue.map((item) => item.text),
            { contextLabel: `story:${activeStory.id}:branch:${branchId}:choices` }
          );
          if (!cancelled) {
            setTranslatedChoiceTexts((previous) => {
              const next = { ...previous };
              textQueue.forEach((item, index) => {
                const candidate = translatedTexts[index];
                next[item.key] = candidate && looksLikeTurkishText(candidate)
                  ? candidate
                  : buildTurkishChoiceFallbackText(index);
              });
              return next;
            });
          }
        }

        if (consequenceQueue.length > 0) {
          const translatedConsequences = await translateSegmentsToTurkish(
            consequenceQueue.map((item) => item.text),
            { contextLabel: `story:${activeStory.id}:branch:${branchId}:consequences` }
          );
          if (!cancelled) {
            setTranslatedChoiceConsequences((previous) => {
              const next = { ...previous };
              consequenceQueue.forEach((item, index) => {
                const candidate = translatedConsequences[index];
                next[item.key] = candidate && looksLikeTurkishText(candidate)
                  ? candidate
                  : buildTurkishChoiceFallbackConsequence();
              });
              return next;
            });
          }
        }
      } catch {
        if (cancelled) return;
        if (textQueue.length > 0) {
          setTranslatedChoiceTexts((previous) => {
            const next = { ...previous };
            textQueue.forEach((item, index) => {
              next[item.key] = buildTurkishChoiceFallbackText(index);
            });
            return next;
          });
        }
        if (consequenceQueue.length > 0) {
          setTranslatedChoiceConsequences((previous) => {
            const next = { ...previous };
            consequenceQueue.forEach((item) => {
              next[item.key] = buildTurkishChoiceFallbackConsequence();
            });
            return next;
          });
        }
      }
    };

    void translateChoices();

    return () => {
      cancelled = true;
    };
  }, [
    language,
    isInteractiveStory,
    currentBranch,
    activeStory.id,
    translatedChoiceTexts,
    translatedChoiceConsequences
  ]);

  // Get content based on story type/language and expand short linear stories.
  const content = React.useMemo(() => {
    const rawContent = (() => {
      if (isInteractiveStory && currentBranch) {
        if (language === 'tr') {
          if (hasTrustedTurkishParagraphs(currentBranch.paragraphsTr)) {
            return sanitizeTurkishParagraphs(currentBranch.paragraphsTr, activeStory.character);
          }
          if (hasTrustedTurkishParagraphs(translatedBranchParagraphs[currentBranch.id])) {
            return sanitizeTurkishParagraphs(translatedBranchParagraphs[currentBranch.id], activeStory.character);
          }

          const sourceParagraphs = currentBranch.paragraphs
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);
          if (sourceParagraphs.length > 0) {
            return buildTurkishFallbackParagraphs(sourceParagraphs.length, activeStory.character);
          }
          return [];
        }
        return currentBranch.paragraphs;
      }

      if (language === 'tr') {
        if (hasTrustedTurkishParagraphs(activeStory.contentTr)) {
          return sanitizeTurkishParagraphs(activeStory.contentTr, activeStory.character);
        }
        if (hasTrustedTurkishParagraphs(translatedLinearContent)) {
          return sanitizeTurkishParagraphs(translatedLinearContent, activeStory.character);
        }

        const sourceParagraphs = ((activeStory.content && activeStory.content.length > 0)
          ? activeStory.content
          : (activeStory.contentTr || []))
          .map((paragraph) => paragraph.trim())
          .filter(Boolean);

        if (sourceParagraphs.length > 0) {
          return buildTurkishFallbackParagraphs(sourceParagraphs.length, activeStory.character);
        }
        return [];
      }
      return activeStory.content || [];
    })();

    const segmented = rawContent
      .flatMap(splitParagraphForReader)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (isInteractiveStory) return segmented;
    return ensureMinimumLinearParagraphs(segmented, language);
  }, [
    isInteractiveStory,
    currentBranch,
    language,
    activeStory.content,
    activeStory.contentTr,
    activeStory.character,
    translatedLinearContent,
    translatedBranchParagraphs
  ]);
  const hasContent = content.length > 0;

  // Word highlighting — depends on content/hasContent
  const currentText = hasContent ? content[currentParagraph] : '';
  const words = currentText.split(/\s+/).filter(Boolean);
  const readingAssistant = useReadingAssistant({
    totalWords: words.length,
    isEnabled: wordHighlightEnabled,
    autoSpeed: autoWordSpeed,
  });

  const sceneVisual = React.useMemo(
    () =>
      resolveStorySceneVisual({
        story: activeStory,
        language,
        paragraphIndex: currentParagraph,
        paragraphCount: content.length,
        branchId: currentBranch?.id || currentBranchId,
        choiceDepth: storyPath.length,
        endingType: currentBranch?.endingType,
        fallbackImageUrl: getStoryCoverUrl(activeStory),
      }),
    [
      activeStory,
      language,
      currentParagraph,
      content.length,
      currentBranch?.id,
      currentBranch?.endingType,
      currentBranchId,
      storyPath.length,
    ]
  );

  const getLocalizedEndingTitle = (branch?: StoryBranch | null): string => {
    if (!branch) return language === 'tr' ? 'Son' : 'The End';
    if (language !== 'tr') return branch.endingTitle || 'The End';
    if (branch.endingTitleTr && branch.endingTitleTr.trim().length > 0) return branch.endingTitleTr;

    switch (branch.endingType) {
      case 'happy':
        return 'Mutlu Son';
      case 'adventure':
        return 'Macera Sonu';
      case 'lesson':
        return 'Dersle Biten Son';
      case 'neutral':
        return 'Huzurlu Son';
      default:
        return 'Masal Sonu';
    }
  };

  const getSessionDurationMinutes = () => {
    return Math.max(1, Math.round((Date.now() - storyStartTime.current) / 60000));
  };

  // Calculate progress
  const progress = hasContent ? ((currentParagraph + 1) / content.length) * 100 : 0;

  // Reset session state when story changes
  useEffect(() => {
    storyStartTime.current = Date.now();
    completionEventRef.current = null;
    discoveredEndingKeysRef.current = new Set();
    setCurrentParagraph(0);
    setStoryPath([]);
    setShowChoices(false);
    setIsEnding(false);
    setNavigationError(null);
    if (isInteractiveStory) {
      setCurrentBranchId(initialBranchId);
    } else {
      setCurrentBranchId(null);
    }
  }, [activeStory.id, isInteractiveStory, initialBranchId]);

  // Recover from malformed branch IDs by jumping to the best available start branch.
  useEffect(() => {
    if (!isInteractiveStory || currentBranch || !activeStory.branches?.length) return;

    const safeStart =
      activeStory.branches.find(branch => branch.id === initialBranchId) ||
      activeStory.branches.find(branch => (branch.choices?.length || 0) > 0) ||
      activeStory.branches[0];

    if (!safeStart) return;

    setCurrentBranchId(safeStart.id);
    setCurrentParagraph(0);
    setShowChoices(false);
    setIsEnding(false);
    setNavigationError(null);
  }, [isInteractiveStory, currentBranch, activeStory.branches, initialBranchId]);

  // Keep paragraph index in bounds when language/content changes
  useEffect(() => {
    if (!hasContent) {
      setCurrentParagraph(0);
      return;
    }

    if (currentParagraph > content.length - 1) {
      setCurrentParagraph(Math.max(0, content.length - 1));
    }
  }, [hasContent, content.length, currentParagraph]);

  // Interactive flow: show choices/endings and record analytics safely once per completion event
  useEffect(() => {
    if (!isInteractiveStory || !currentBranch) return;

    const isLastParagraph = content.length > 0 && currentParagraph >= content.length - 1;
    const hasChoices = (currentBranch.choices?.length || 0) > 0;
    const isBranchEnding = Boolean(currentBranch.isEnding) || !hasChoices;

    if (!isLastParagraph) {
      setShowChoices(false);
      setIsEnding(false);
      return;
    }

    if (hasChoices) {
      setShowChoices(true);
      setIsEnding(false);
      return;
    }

    if (isBranchEnding) {
      setShowChoices(false);
      setIsEnding(true);

      const completionKey = `interactive:${activeStory.id}:${currentBranch.id}:${storyPath.map(step => step.id).join('>')}`;
      if (completionEventRef.current !== completionKey) {
        completionEventRef.current = completionKey;
        recordStoryRead(activeStory.id, activeStory.theme || 'general', getSessionDurationMinutes());

        const endingKey = `${activeStory.id}:${currentBranch.id}`;
        if (!discoveredEndingKeysRef.current.has(endingKey)) {
          discoveredEndingKeysRef.current.add(endingKey);
          recordEnding();
        }

        soundEffects.play('story_complete');
      }
    }
  }, [isInteractiveStory, currentBranch, currentParagraph, content.length, activeStory.id, activeStory.theme, storyPath, recordStoryRead, recordEnding]);

  // Linear stories should also count as completed once the last paragraph is reached
  useEffect(() => {
    if (isInteractiveStory || !hasContent) return;

    const isLastParagraph = currentParagraph >= content.length - 1;
    if (!isLastParagraph) return;

    const completionKey = `linear:${activeStory.id}`;
    if (completionEventRef.current === completionKey) return;

    completionEventRef.current = completionKey;
    recordStoryRead(activeStory.id, activeStory.theme || 'general', getSessionDurationMinutes());
    soundEffects.play('story_complete');

    // Show reflection card after linear story completion
    const reflectionQuestions = [
      {
        question: 'Who was your favorite character in the story?',
        questionTr: 'Hikayede en sevdiğin karakter hangisiydi?',
        options: ['The hero', 'The companion', 'The magical creature'],
        optionsTr: ['Kahraman', 'Arkadaş', 'Sihirli yaratık'],
      },
      {
        question: 'What did you learn from this story?',
        questionTr: 'Bu hikayeden ne öğrendin?',
        options: ['Be brave', 'Help others', 'Never give up'],
        optionsTr: ['Cesur ol', 'Başkalarına yardım et', 'Asla vazgeçme'],
      },
      {
        question: 'How would you tell this story to a friend?',
        questionTr: 'Bu hikayeyi bir arkadaşına nasıl anlatırdın?',
        options: ['Exciting adventure!', 'Magical journey!', 'Heartwarming tale!'],
        optionsTr: ['Heyecanlı macera!', 'Sihirli yolculuk!', 'İçten bir hikaye!'],
      },
    ];
    const randomQuestion = reflectionQuestions[Math.floor(Math.random() * reflectionQuestions.length)];
    setReflectionQuestion(randomQuestion);
    setTimeout(() => setShowReflectionCard(true), 1000);
  }, [isInteractiveStory, hasContent, currentParagraph, content.length, activeStory.id, activeStory.theme, recordStoryRead]);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const applyBestVoice = () => {
        if (!synthRef.current) return;
        preferredVoiceRef.current = pickBestVoice(synthRef.current.getVoices(), language);
      };

      applyBestVoice();
      window.speechSynthesis.addEventListener('voiceschanged', applyBestVoice);

      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', applyBestVoice);
        cancelSpeech();
      };
    }
    return undefined;
  }, [language]);

  const finalizeParagraphPlayback = (sessionId: number) => {
    if (sessionId !== speechSessionRef.current) return;

    setIsSpeaking(false);
    // Auto-advance (but not past the last paragraph if choices are available)
    if (hasContent && currentParagraph < content.length - 1 && isPlayingRef.current) {
      setTimeout(() => {
        setCurrentParagraph(prev => prev + 1);
      }, 800);
    } else if (currentParagraph >= content.length - 1) {
      setIsPlaying(false);
    }
  };

  const playPremiumChunk = async (textChunk: string, sessionId: number, playbackRate: number): Promise<boolean> => {
    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), PREMIUM_TTS_TIMEOUT_MS);
      let response: Response;
      try {
        response = await fetch(resolveTtsApiEndpoint(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: controller.signal,
          body: JSON.stringify({
            text: textChunk,
            language,
            speed: playbackRate
          })
        });
      } finally {
        window.clearTimeout(timeoutId);
      }

      if (!response.ok) {
        if (PREMIUM_TTS_DISABLE_STATUSES.has(response.status)) {
          premiumTtsAvailableRef.current = false;
        }
        return false;
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.startsWith('audio/')) {
        return false;
      }

      const audioBlob = await response.blob();
      if (audioBlob.size === 0) {
        return false;
      }

      if (sessionId !== speechSessionRef.current || !isPlayingRef.current) {
        return false;
      }

      const objectUrl = URL.createObjectURL(audioBlob);
      stopPremiumAudio();
      audioUrlRef.current = objectUrl;

      const audio = new Audio(objectUrl);
      audio.preload = 'auto';
      audio.playbackRate = playbackRate;
      audio.volume = settings.narrationVolume;
      audioRef.current = audio;

      const played = await new Promise<boolean>((resolve) => {
        let settled = false;
        const finish = (ok: boolean) => {
          if (settled) return;
          settled = true;
          audio.onended = null;
          audio.onerror = null;
          audio.onpause = null;
          resolve(ok);
        };

        audio.onended = () => finish(true);
        audio.onerror = () => finish(false);
        audio.onpause = () => {
          const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
          const isCompleted = duration > 0 && audio.currentTime >= duration - 0.05;
          finish(isCompleted);
        };

        audio.play().catch(() => finish(false));
      });

      if (audioUrlRef.current === objectUrl) {
        URL.revokeObjectURL(objectUrl);
        audioUrlRef.current = null;
      }

      if (audioRef.current === audio) {
        audioRef.current = null;
      }

      return played;
    } catch {
      return false;
    }
  };

  const tryPlayPremiumTts = async (text: string, sessionId: number, playbackRate: number): Promise<boolean> => {
    if (!premiumTtsAvailableRef.current) return false;
    if (!text) return false;
    if (sessionId !== speechSessionRef.current || !isPlayingRef.current) return false;
    return playPremiumChunk(text, sessionId, playbackRate);
  };

  // Speak paragraph
  const speakParagraph = async (text: string) => {
    // OpenAI TTS path
    if (isOpenAITTSAvailable() && text) {
      try {
        setIsSpeaking(true);
        const audio = await speakParagraphOpenAI(
          text,
          language as 'tr' | 'en',
          undefined,
          speechRate
        );
        currentOpenAIAudioRef.current?.pause();
        currentOpenAIAudioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          // Auto-advance logic
          if (hasContent && currentParagraph < content.length - 1 && isPlayingRef.current) {
            setTimeout(() => {
              setCurrentParagraph(prev => prev + 1);
            }, 800);
          } else if (currentParagraph >= content.length - 1) {
            setIsPlaying(false);
          }
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          setIsPlaying(false);
          console.warn('OpenAI TTS failed, falling back');
        };
        await audio.play();
        return;
      } catch (err) {
        console.warn('OpenAI TTS error, falling back to WebSpeech:', err);
        // fall through to WebSpeech
      }
    }

    const chunks = splitTextForSpeech(text, language);
    if (chunks.length === 0) return;

    cancelSpeech();
    const sessionId = speechSessionRef.current;
    const effectiveRate = language === 'tr'
      ? Math.min(0.96, Math.max(0.72, speechRate))
      : Math.min(1.05, Math.max(0.78, speechRate));

    setIsSpeaking(true);
    const premiumPlayed = await tryPlayPremiumTts(chunks.join(' '), sessionId, effectiveRate);
    if (premiumPlayed) {
      finalizeParagraphPlayback(sessionId);
      return;
    }

    if (sessionId !== speechSessionRef.current) return;

    if (!synthRef.current) {
      setIsSpeaking(false);
      return;
    }

    let chunkIndex = 0;
    const voices = synthRef.current.getVoices();
    preferredVoiceRef.current = pickBestVoice(voices, language);

    const speakNextChunk = () => {
      if (!synthRef.current || sessionId !== speechSessionRef.current) return;
      const chunk = chunks[chunkIndex];
      if (!chunk) return;

      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.rate = effectiveRate;
      utterance.pitch = language === 'tr' ? 0.98 : 1.0;
      utterance.volume = settings.narrationVolume;
      utterance.lang = language === 'tr' ? 'tr-TR' : 'en-US';

      if (preferredVoiceRef.current) {
        utterance.voice = preferredVoiceRef.current;
      }

      utterance.onstart = () => {
        if (sessionId === speechSessionRef.current) {
          setIsSpeaking(true);
        }
      };

      utterance.onend = () => {
        if (sessionId !== speechSessionRef.current) return;
        chunkIndex += 1;

        if (chunkIndex < chunks.length && isPlayingRef.current) {
          setTimeout(speakNextChunk, chunkPauseMs(chunk));
          return;
        }

        finalizeParagraphPlayback(sessionId);
      };

      utterance.onerror = () => {
        if (sessionId === speechSessionRef.current) {
          setIsSpeaking(false);
        }
      };

      synthRef.current.speak(utterance);
    };

    speakNextChunk();
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && hasContent && content[currentParagraph]) {
      speakParagraph(content[currentParagraph]);
    } else if (!isPlaying) {
      cancelSpeech();
    }
  }, [isPlaying, hasContent, content, currentParagraph, currentBranchId]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      cancelSpeech();
    } else {
      setIsPlaying(true);
      // Auto-start music if selected and not already playing
      if (currentMusic && currentMusic !== 'none') {
        backgroundMusic.play(currentMusic);
      }
    }
  };

  // Auto-start music when story loads if music is selected
  useEffect(() => {
    if (currentMusic && currentMusic !== 'none' && !backgroundMusic.getIsPlaying()) {
      backgroundMusic.play(currentMusic);
    }

    // Stop music when leaving reader
    return () => {
      if (currentMusic && currentMusic !== 'none') {
        backgroundMusic.stop();
      }
    };
  }, []);

  // Update music when selection changes
  useEffect(() => {
    if (currentMusic && currentMusic !== 'none' && isPlaying) {
      backgroundMusic.play(currentMusic);
    } else if (!currentMusic || currentMusic === 'none') {
      backgroundMusic.stop();
    }
  }, [currentMusic]);

  const handleNextParagraph = () => {
    if (hasContent && currentParagraph < content.length - 1) {
      cancelSpeech();
      setCurrentParagraph(prev => prev + 1);
    }
  };

  const handlePrevParagraph = () => {
    if (currentParagraph > 0) {
      cancelSpeech();
      setCurrentParagraph(prev => prev - 1);
    }
  };

  const changeSpeed = (rate: number) => {
    setSpeechRate(rate);
    setShowSpeedMenu(false);

    if (activeProfile) {
      updateProfile(activeProfile.id, {
        preferences: {
          ...activeProfile.preferences,
          readingSpeed: rate,
        },
      });
    }

    if (isPlaying && hasContent && content[currentParagraph]) {
      cancelSpeech();
      setTimeout(() => {
        speakParagraph(content[currentParagraph]);
      }, 100);
    }
  };

  // Handle interactive choice selection
  const handleChoiceSelect = (choice: StoryChoice) => {
    cancelSpeech();
    setIsPlaying(false);

    const resolvedNextBranchId = resolveSafeNextBranchId(choice.nextBranchId, currentBranch?.id);
    if (!resolvedNextBranchId) {
      setNavigationError(
        language === 'tr'
          ? 'Bu yol şu an açık değil. Lütfen başka bir seçim dene.'
          : 'That path is unavailable right now. Please choose another option.'
      );
      soundEffects.play('error');
      return;
    }

    setNavigationError(null);

    // Record the choice
    setStoryPath(prev => [
      ...prev,
      {
        id: choice.id,
        text: getLocalizedChoiceText(choice, currentBranch?.id),
        emoji: choice.emoji
      }
    ]);
    recordChoice();
    soundEffects.play('choice_select');

    // Navigate to the next branch
    setCurrentBranchId(resolvedNextBranchId);
    setCurrentParagraph(0);
    setShowChoices(false);
    setIsEnding(false);
  };

  // Restart interactive story
  const handleRestartStory = () => {
    cancelSpeech();
    setIsPlaying(false);
    storyStartTime.current = Date.now();
    completionEventRef.current = null;
    setCurrentBranchId(initialBranchId);
    setStoryPath([]);
    setCurrentParagraph(0);
    setShowChoices(false);
    setIsEnding(false);
    setNavigationError(null);
  };

  // Get ending emoji based on type
  const getEndingEmoji = (type?: string) => {
    switch (type) {
      case 'happy': return '🌟';
      case 'adventure': return '🚀';
      case 'lesson': return '💡';
      case 'neutral': return '🌙';
      default: return '✨';
    }
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${readerTheme === 'light' ? 'bg-gray-50' : 'bg-bg-dark'}`}>
      {/* Header */}
      <div
        className="shrink-0 flex items-center justify-between px-4 pb-3 bg-bg-dark/80 backdrop-blur-md border-b border-white/5"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 10px)' }}
      >
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white size-11 rounded-full active:scale-95 flex items-center justify-center touch-manipulation"
          style={{ touchAction: 'manipulation' }}
        >
          <span className="material-symbols-outlined text-3xl">expand_more</span>
        </button>

        <div className="text-center flex-1">
          <span className="text-sm font-serif font-medium tracking-widest uppercase text-white/60 block">
            {localizedThemeName}
          </span>
          {hasContent && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] text-white/40">
                {currentParagraph + 1} / {content.length}
              </span>
              {isInteractiveStory && (
                <span className="text-[10px] text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                  🎮 {language === 'tr' ? 'İnteraktif' : 'Interactive'}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Music Button */}
          <button
            onClick={onMusicClick}
            className={`size-11 rounded-full flex items-center justify-center transition-colors touch-manipulation ${currentMusic !== 'none' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-white/60'
              }`}
            style={{ touchAction: 'manipulation' }}
          >
            <span className="material-symbols-outlined">music_note</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="shrink-0 px-4 py-2">
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl relative">
          <img
            key={sceneVisual.sceneKey}
            src={sceneVisual.imageUrl}
            alt={localizedStoryTitle}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>

          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-[11px] text-white/90 backdrop-blur-md">
            <span className="material-symbols-outlined text-[14px] text-accent-peach">auto_awesome</span>
            <span>{language === 'tr' ? 'Sahne' : 'Scene'} {Math.max(1, currentParagraph + 1)} • {sceneVisual.phaseLabel}</span>
          </div>

          {/* Story Meta Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {activeStory.character && (
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-primary text-sm">person</span>
                <span className="text-xs text-white/90 font-medium">{activeStory.character}</span>
              </div>
            )}
            {visualIdentity.companionLabel && (
              <div
                className="inline-flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-full"
                style={{ backgroundColor: `${visualIdentity.colorPalette[1]}20` }}
              >
                <span className="material-symbols-outlined text-sm" style={{ color: visualIdentity.colorPalette[0] }}>groups</span>
                <span className="text-xs text-white/90 font-medium">{visualIdentity.companionLabel}</span>
              </div>
            )}
            {visualIdentity.placeLabel && (
              <div
                className="inline-flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-full"
                style={{ backgroundColor: `${visualIdentity.colorPalette[2]}20` }}
              >
                <span className="material-symbols-outlined text-sm" style={{ color: visualIdentity.colorPalette[1] }}>location_on</span>
                <span className="text-xs text-white/90 font-medium">{visualIdentity.placeLabel}</span>
              </div>
            )}
            {activeStory.ageRange && (
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-accent-peach text-sm">child_care</span>
                <span className="text-xs text-white/90 font-medium">{language === 'tr' ? 'Yaş ' : 'Ages '}{activeStory.ageRange}</span>
              </div>
            )}
            {/* Story path indicator for interactive stories */}
            {isInteractiveStory && storyPath.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-primary/30 backdrop-blur-md px-3 py-1.5 rounded-full ml-2">
                <span className="material-symbols-outlined text-primary text-sm">route</span>
                <span className="text-xs text-white/90 font-medium">{storyPath.length} {language === 'tr' ? 'seçim' : 'choices made'}</span>
              </div>
            )}
          </div>

          {/* Speaking indicator */}
          {isSpeaking && (
            <div
              className="absolute right-4 flex items-center gap-2 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full animate-pulse"
              style={{ top: 'max(env(safe-area-inset-top), 10px)' }}
            >
              <span className="material-symbols-outlined text-bg-dark text-sm">graphic_eq</span>
              <span className="text-xs text-bg-dark font-bold">{t.reader_reading}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto transition-all duration-300 relative px-4 pb-4">
        <div className="max-w-md mx-auto relative pt-4">

          {/* Text Content */}
          <div
            className={`rounded-2xl p-6 shadow-xl relative mb-4 ${readerTheme === 'light' ? 'bg-white border border-gray-200' : 'bg-bg-card border border-white/5'}`}
            onClick={() => {
              if (wordHighlightEnabled && !readingAssistant.isAuto) {
                readingAssistant.nextWord();
              }
            }}
          >
            {hasContent ? (
              <p className={`${readerTheme === 'light' ? 'text-gray-900' : 'text-white'} ${readerFontSize} leading-relaxed font-medium transition-all duration-500 ease-in-out ${readerFontFamily}`}>
                {wordHighlightEnabled ? (
                  words.map((word, index) => (
                    <span
                      key={`${index}-${word}`}
                      className={`transition-all duration-200 ${
                        index === readingAssistant.activeWordIndex
                          ? 'font-bold text-primary underline decoration-2 underline-offset-4'
                          : ''
                      }`}
                    >
                      {word}{index < words.length - 1 ? ' ' : ''}
                    </span>
                  ))
                ) : (
                  content[currentParagraph]
                )}
              </p>
            ) : (
              <div className="text-center py-10">
                <p className={readerTheme === 'light' ? 'text-gray-400' : 'text-white/60'}>
                  {language === 'tr'
                    ? (isTranslatingCurrentContent ? 'Hikaye Türkçeye çevriliyor...' : 'Hikaye içeriği yükleniyor...')
                    : 'Story content is loading...'}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className={`flex items-center justify-between mt-6 pt-4 border-t ${readerTheme === 'light' ? 'border-gray-200' : 'border-white/5'}`}>
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${readerTheme === 'light' ? 'text-gray-400 hover:text-gray-700 hover:bg-gray-100' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                <span className="material-symbols-outlined text-sm">speed</span>
                {speechRate}x
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevParagraph}
                  disabled={currentParagraph === 0}
                  className={`size-8 rounded-full flex items-center justify-center disabled:opacity-30 transition-all ${readerTheme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <span className={`material-symbols-outlined ${readerTheme === 'light' ? 'text-gray-700' : 'text-white'}`}>chevron_left</span>
                </button>

                <button
                  onClick={togglePlayPause}
                  className="size-12 rounded-full bg-primary text-bg-dark flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined text-2xl fill-current">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                <button
                  onClick={handleNextParagraph}
                  disabled={!hasContent || currentParagraph >= content.length - 1}
                  className={`size-8 rounded-full flex items-center justify-center disabled:opacity-30 transition-all ${readerTheme === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <span className={`material-symbols-outlined ${readerTheme === 'light' ? 'text-gray-700' : 'text-white'}`}>chevron_right</span>
                </button>
              </div>

              <div className="w-12"></div> {/* Spacer for balance */}
            </div>

            {/* Speed Menu Dropdown */}
            {showSpeedMenu && (
              <div className="absolute bottom-16 left-4 bg-bg-dark border border-white/10 rounded-xl shadow-xl p-1 flex flex-col gap-1 z-20">
                {[0.7, 0.9, 1.0, 1.2, 1.5].map(rate => (
                  <button
                    key={rate}
                    onClick={() => changeSpeed(rate)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold text-center transition-colors ${speechRate === rate ? 'bg-primary text-bg-dark' : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Choices */}
          {showChoices && currentBranch?.choices && (
            <div className="mt-4 space-y-3 animate-slide-up">
              <h3 className="text-center text-white/60 text-sm uppercase tracking-widest font-bold mb-4">
                {language === 'tr' ? 'Ne olsun?' : 'What happens next?'}
              </h3>
              {navigationError && (
                <div className="rounded-xl border border-red-300/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                  {navigationError}
                </div>
              )}
              {currentBranch.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <span className="text-white font-medium flex items-center gap-2">
                        {choice.emoji && <span>{choice.emoji}</span>}
                        {getLocalizedChoiceText(choice, currentBranch?.id)}
                      </span>
                      {getLocalizedChoiceConsequence(choice, currentBranch?.id) && (
                        <p className="text-xs text-white/60 mt-1">
                          {getLocalizedChoiceConsequence(choice, currentBranch?.id)}
                        </p>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors">arrow_forward</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Reflection Card */}
          {showReflectionCard && !isEnding && reflectionQuestion && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="bg-gradient-to-b from-bg-card to-bg-dark rounded-3xl p-8 max-w-md w-full border border-primary/20 shadow-2xl shadow-primary/10 animate-slide-up">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🌙</div>
                  <h2 className="text-2xl font-bold text-white mb-2 font-serif">
                    {language === 'tr' ? 'Hikaye Bitti!' : 'Story Complete!'}
                  </h2>
                  <p className="text-white/60 text-sm">
                    {language === 'tr' ? reflectionQuestion.questionTr : reflectionQuestion.question}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {(language === 'tr' ? reflectionQuestion.optionsTr : reflectionQuestion.options).map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        soundEffects.play('choice_select');
                        setTimeout(() => setShowReflectionCard(false), 300);
                      }}
                      className="w-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {index + 1}
                        </div>
                        <span className="text-white font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4">
                  <button
                    onClick={() => setShowReflectionCard(false)}
                    className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                    {language === 'tr' ? 'Devam' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ending Screen */}
          {isEnding && (
            <div className="mt-8 text-center p-6 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl border border-primary/20 animate-fade-in-scale">
              <div className="text-7xl mb-4 animate-float-sparkle">
                ✨ {getEndingEmoji(currentBranch?.endingType)} ✨
              </div>
              <h2 className="text-3xl font-bold text-white mb-3 font-serif animate-glow">
                {getLocalizedEndingTitle(currentBranch)}
              </h2>
              <p className="text-white/60 text-sm mb-6">
                {language === 'tr'
                  ? 'Bu sonlardan sadece biri! Başka yollar keşfetmek ister misin?'
                  : "You've discovered one of the endings! Try different choices to find other paths."}
              </p>
              {storyPath.length > 0 && (
                <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[11px] uppercase tracking-widest text-white/50 mb-2">
                    {language === 'tr' ? 'Seçim Yolun' : 'Your Path'}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {storyPath.map((step) => (
                      <span
                        key={`${step.id}-${step.text}`}
                        className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90"
                      >
                        {step.emoji || '✨'} {step.text}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleRestartStory}
                  className="w-full bg-primary text-bg-dark font-bold py-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">replay</span>
                  {language === 'tr' ? 'Tekrar Oku' : 'Read Again'}
                </button>
                <button
                  onClick={onBack}
                  className="w-full bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-all"
                >
                  {language === 'tr' ? 'Kütüphaneye Dön' : 'Back to Library'}
                </button>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-full overflow-hidden mt-6">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

        </div>
      </div>

      {/* Reading Assistant Toggle Button */}
      {!showAssistantDrawer && (
        <button
          onClick={() => setShowAssistantDrawer(true)}
          className="fixed bottom-6 right-6 size-14 rounded-full bg-primary text-bg-dark shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30"
          style={{ bottom: 'max(env(safe-area-inset-bottom, 0px) + 24px, 24px)' }}
        >
          <span className="material-symbols-outlined text-2xl">auto_stories</span>
        </button>
      )}

      {/* Reading Assistant Drawer */}
      {showAssistantDrawer && (
        <div
          className="fixed inset-x-0 bottom-0 bg-bg-dark/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl shadow-2xl z-40 transform transition-transform duration-300"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}
        >
          <div className="p-6 max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_stories</span>
                {language === 'tr' ? 'Okuma Yardımcısı' : 'Reading Assistant'}
              </h3>
              <button
                onClick={() => setShowAssistantDrawer(false)}
                className="size-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Word Highlight Toggle */}
            <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">
                  {language === 'tr' ? 'Kelime Vurgulama' : 'Word Highlight'}
                </span>
                <button
                  onClick={() => {
                    setWordHighlightEnabled(!wordHighlightEnabled);
                    if (wordHighlightEnabled) {
                      readingAssistant.reset();
                    }
                  }}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    wordHighlightEnabled ? 'bg-primary' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-1 size-4 bg-white rounded-full transition-transform ${
                      wordHighlightEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {wordHighlightEnabled && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-xs">
                      {language === 'tr' ? 'Otomatik' : 'Auto'}
                    </span>
                    <button
                      onClick={readingAssistant.toggleAuto}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        readingAssistant.isAuto ? 'bg-primary/80' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 size-4 bg-white rounded-full transition-transform ${
                          readingAssistant.isAuto ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                  {readingAssistant.isAuto && (
                    <div className="mt-3">
                      <label className="text-white/60 text-xs block mb-2">
                        {language === 'tr' ? 'Hız: ' : 'Speed: '}{autoWordSpeed}ms
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="800"
                        step="50"
                        value={autoWordSpeed}
                        onChange={(e) => {
                          const newSpeed = parseInt(e.target.value);
                          setAutoWordSpeed(newSpeed);
                          readingAssistant.setAutoSpeed(newSpeed);
                        }}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Font Size */}
            <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <label className="text-white text-sm font-medium block mb-3">
                {language === 'tr' ? 'Yazı Boyutu' : 'Font Size'}
              </label>
              <div className="flex gap-2">
                {(['text-lg', 'text-xl', 'text-2xl'] as const).map((size, index) => (
                  <button
                    key={size}
                    onClick={() => setReaderFontSize(size)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                      readerFontSize === size
                        ? 'bg-primary text-bg-dark'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {['A', 'A+', 'A++'][index]}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <label className="text-white text-sm font-medium block mb-3">
                {language === 'tr' ? 'Yazı Tipi' : 'Font Style'}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setReaderFontFamily('font-serif')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    readerFontFamily === 'font-serif'
                      ? 'bg-primary text-bg-dark'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  Serif
                </button>
                <button
                  onClick={() => setReaderFontFamily('font-sans')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    readerFontFamily === 'font-sans'
                      ? 'bg-primary text-bg-dark'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  Sans
                </button>
              </div>
            </div>

            {/* Theme Toggle (Reader-specific) */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <label className="text-white text-sm font-medium block mb-3">
                {language === 'tr' ? 'Tema (Okuyucu)' : 'Theme (Reader)'}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setReaderTheme('dark')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    readerTheme === 'dark'
                      ? 'bg-primary text-bg-dark'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">dark_mode</span>
                  {language === 'tr' ? 'Karanlık' : 'Dark'}
                </button>
                <button
                  onClick={() => setReaderTheme('light')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    readerTheme === 'light'
                      ? 'bg-primary text-bg-dark'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">light_mode</span>
                  {language === 'tr' ? 'Aydınlık' : 'Light'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sleep Controller (Invisible but active) */}
      <SleepController
        isActive={sleepControllerActive}
        onSleepDetected={handleSleepDetected}
        onUserAwake={handleUserAwake}
      />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float-sparkle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(238, 140, 43, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(238, 140, 43, 0.6);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        .animate-float-sparkle {
          animation: float-sparkle 2s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Reader;
