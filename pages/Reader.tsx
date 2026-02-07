import React, { useState, useEffect, useRef } from 'react';
import { Story, StoryBranch, StoryChoice } from '../types';
import { LIBRARY_STORIES } from '../data';
import SleepController from '../components/SleepController';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { MusicType } from '../services/backgroundMusic';
import { soundEffects } from '../services/soundEffects';

interface ReaderProps {
  story: Story | null;
  onBack: () => void;
  currentMusic?: MusicType;
  onMusicChange?: (music: MusicType) => void;
  onMusicClick?: () => void;
}

const HIGH_QUALITY_VOICE_HINTS = ['neural', 'natural', 'premium', 'enhanced', 'wavenet', 'google', 'siri', 'apple', 'microsoft'];
const LOW_QUALITY_VOICE_HINTS = ['espeak', 'compact', 'default'];
const LANGUAGE_VOICE_HINTS: Record<'en' | 'tr', string[]> = {
  en: ['samantha', 'karen', 'daniel', 'serena', 'moira'],
  tr: ['yelda', 'filiz', 'mert', 'cem', 'tr']
};

const sanitizeTextForSpeech = (rawText: string, currentLanguage: 'en' | 'tr'): string => {
  const ampersandReplacement = currentLanguage === 'tr' ? ' ve ' : ' and ';
  return rawText
    .replace(/&/g, ampersandReplacement)
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const splitTextForSpeech = (rawText: string, currentLanguage: 'en' | 'tr'): string[] => {
  const normalized = sanitizeTextForSpeech(rawText, currentLanguage);
  if (!normalized) return [];

  const maxChunkLength = currentLanguage === 'tr' ? 170 : 200;
  const sentences = normalized.match(/[^.!?…]+[.!?…]?/g) || [normalized];
  const chunks: string[] = [];
  let buffer = '';

  for (const sentence of sentences) {
    const next = sentence.trim();
    if (!next) continue;

    if (!buffer) {
      buffer = next;
      continue;
    }

    if ((buffer.length + 1 + next.length) <= maxChunkLength) {
      buffer = `${buffer} ${next}`;
    } else {
      chunks.push(buffer);
      buffer = next;
    }
  }

  if (buffer) chunks.push(buffer);
  return chunks.length > 0 ? chunks : [normalized];
};

const chunkPauseMs = (chunk: string): number => {
  const trimmed = chunk.trim();
  if (!trimmed) return 120;

  const lastChar = trimmed[trimmed.length - 1];
  if (lastChar === '.') return 180;
  if (lastChar === '!' || lastChar === '?') return 240;
  if (lastChar === '…') return 300;
  if (lastChar === ',' || lastChar === ';' || lastChar === ':') return 140;
  return 120;
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

const Reader: React.FC<ReaderProps> = ({ story, onBack, currentMusic, onMusicChange, onMusicClick }) => {
  const { recordStoryRead, recordChoice, recordEnding } = useAppState();
  const { language } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [speechRate, setSpeechRate] = useState(0.9);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Interactive story state
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);
  const [storyPath, setStoryPath] = useState<Array<{ id: string; text: string; emoji?: string }>>([]); // Track choices made
  const [showChoices, setShowChoices] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [navigationError, setNavigationError] = useState<string | null>(null);

  // Sleep controller state
  const [sleepControllerActive, setSleepControllerActive] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const isPlayingRef = useRef(false);
  const speechSessionRef = useRef(0);
  const storyStartTime = useRef<number>(Date.now());
  const completionEventRef = useRef<string | null>(null);
  const discoveredEndingKeysRef = useRef<Set<string>>(new Set());

  const cancelSpeech = () => {
    speechSessionRef.current += 1;
    if (synthRef.current) synthRef.current.cancel();
    setIsSpeaking(false);
  };

  // Enable sleep controller when playing
  useEffect(() => {
    setSleepControllerActive(isPlaying);
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

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

  // Use provided story or fallback
  const defaultStory = LIBRARY_STORIES.find(s => s.content || s.isInteractive) || LIBRARY_STORIES[0];
  const activeStory = story || defaultStory;

  // Check if this is an interactive story
  const isInteractiveStory = activeStory.isInteractive && activeStory.branches && activeStory.branches.length > 0;
  const initialBranchId = activeStory.startBranchId || activeStory.branches?.[0]?.id || null;

  // Get current branch for interactive stories
  const currentBranch: StoryBranch | null = isInteractiveStory
    ? activeStory.branches!.find(b => b.id === (currentBranchId || activeStory.startBranchId)) || null
    : null;

  // Get content based on story type and language
  const getContent = (): string[] => {
    if (isInteractiveStory && currentBranch) {
      if (language === 'tr' && currentBranch.paragraphsTr) {
        return currentBranch.paragraphsTr;
      }
      return currentBranch.paragraphs;
    }

    if (language === 'tr' && activeStory.contentTr) {
      return activeStory.contentTr;
    }
    return activeStory.content || [];
  };

  const content = getContent();
  const hasContent = content.length > 0;

  // Get localized text helper
  const getLocalizedText = (obj: any, field: string) => {
    if (language === 'tr' && obj[`${field}Tr`]) {
      return obj[`${field}Tr`];
    }
    return obj[field];
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

  // Speak paragraph
  const speakParagraph = (text: string) => {
    if (!synthRef.current) return;
    const chunks = splitTextForSpeech(text, language);
    if (chunks.length === 0) return;

    cancelSpeech();
    const sessionId = speechSessionRef.current;
    let chunkIndex = 0;

    const voices = synthRef.current.getVoices();
    const preferredVoice = pickBestVoice(voices, language);
    preferredVoiceRef.current = preferredVoice;

    const effectiveRate = language === 'tr'
      ? Math.min(1.0, Math.max(0.75, speechRate))
      : Math.min(1.1, Math.max(0.8, speechRate));

    const speakNextChunk = () => {
      if (!synthRef.current || sessionId !== speechSessionRef.current) return;
      const chunk = chunks[chunkIndex];
      if (!chunk) return;

      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.rate = effectiveRate;
      utterance.pitch = language === 'tr' ? 0.98 : 1.0;
      utterance.volume = 1;
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
    }
  };

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

    const hasTargetBranch = activeStory.branches?.some(branch => branch.id === choice.nextBranchId);
    if (!hasTargetBranch) {
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
        text: getLocalizedText(choice, 'text'),
        emoji: choice.emoji
      }
    ]);
    recordChoice();
    soundEffects.play('choice_select');

    // Navigate to the next branch
    setCurrentBranchId(choice.nextBranchId);
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
    <div className="flex flex-col min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-bg-dark/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="text-white/80 hover:text-white size-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">expand_more</span>
        </button>

        <div className="text-center flex-1">
          <span className="text-sm font-serif font-medium tracking-widest uppercase text-white/60 block">
            {activeStory.theme}
          </span>
          {hasContent && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-[10px] text-white/40">
                {currentParagraph + 1} / {content.length}
              </span>
              {isInteractiveStory && (
                <span className="text-[10px] text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                  🎮 Interactive
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Music Button */}
          <button
            onClick={onMusicClick}
            className={`size-10 rounded-full flex items-center justify-center transition-colors ${currentMusic !== 'none' ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-white/60'
              }`}
          >
            <span className="material-symbols-outlined">music_note</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-4 py-2">
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl relative">
          <img src={activeStory.coverUrl} alt={activeStory.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>

          {/* Story Meta Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            {activeStory.character && (
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full mb-2">
                <span className="material-symbols-outlined text-primary text-sm">person</span>
                <span className="text-xs text-white/90 font-medium">{activeStory.character}</span>
              </div>
            )}
            {activeStory.ageRange && (
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full ml-2">
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
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full animate-pulse">
              <span className="material-symbols-outlined text-bg-dark text-sm">graphic_eq</span>
              <span className="text-xs text-bg-dark font-bold">Reading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300 relative px-4 pb-24">
        <div className="max-w-md mx-auto relative pt-4">

          {/* Text Content */}
          <div className="bg-bg-card rounded-2xl p-6 shadow-xl border border-white/5 relative mb-4">
            {hasContent ? (
              <p className="text-white text-lg leading-relaxed font-medium transition-all duration-500 ease-in-out font-serif">
                {content[currentParagraph]}
              </p>
            ) : (
              <div className="text-center py-10">
                <p className="text-white/60">Story content is loading...</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-1 text-white/40 hover:text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded hover:bg-white/5"
              >
                <span className="material-symbols-outlined text-sm">speed</span>
                {speechRate}x
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevParagraph}
                  disabled={currentParagraph === 0}
                  className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
                >
                  <span className="material-symbols-outlined text-white">chevron_left</span>
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
                  className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
                >
                  <span className="material-symbols-outlined text-white">chevron_right</span>
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
                        {getLocalizedText(choice, 'text')}
                      </span>
                      {getLocalizedText(choice, 'consequence') && (
                        <p className="text-xs text-white/60 mt-1">
                          {getLocalizedText(choice, 'consequence')}
                        </p>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors">arrow_forward</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Ending Screen */}
          {isEnding && (
            <div className="mt-8 text-center animate-fade-in p-6 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl border border-primary/20">
              <div className="text-6xl mb-4 animate-bounce-slow">
                {getEndingEmoji(currentBranch?.endingType)}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 font-serif">
                {getLocalizedText(currentBranch, 'endingTitle') || (language === 'tr' ? 'Son' : 'The End')}
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

      {/* Sleep Controller (Invisible but active) */}
      <SleepController
        isActive={sleepControllerActive}
        onSleepDetected={handleSleepDetected}
        onUserAwake={handleUserAwake}
      />
    </div>
  );
};

export default Reader;
