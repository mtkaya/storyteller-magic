import React, { useState, useEffect, useRef } from 'react';
import { Story, StoryBranch, StoryChoice } from '../types';
import { LIBRARY_STORIES } from '../data';
import SleepController from '../components/SleepController';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';
import { backgroundMusic, MusicType } from '../services/backgroundMusic';
import { soundEffects } from '../services/soundEffects';
import { synthesizeSpeech, playAudioUrl, isTTSAvailable } from '../services/ttsService';

interface ReaderProps {
  story: Story | null;
  onBack: () => void;
  currentMusic?: MusicType;
  onMusicChange?: (music: MusicType) => void;
  onMusicClick?: () => void;
}

const Reader: React.FC<ReaderProps> = ({ story, onBack, currentMusic, onMusicChange, onMusicClick }) => {
  const { recordStoryRead, recordChoice, recordEnding, isFavorite, addFavorite, removeFavorite } = useAppState();
  const { language, t } = useLanguage();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [speechRate, setSpeechRate] = useState(0.9);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Interactive story state
  const [currentBranchId, setCurrentBranchId] = useState<string | null>(null);
  const [storyPath, setStoryPath] = useState<string[]>([]); // Track choices made
  const [showChoices, setShowChoices] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  // Sleep controller state
  const [sleepControllerActive, setSleepControllerActive] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<boolean>(false);
  const storyStartTime = useRef<number>(Date.now());

  // Enable sleep controller when playing
  useEffect(() => {
    setSleepControllerActive(isPlaying);
  }, [isPlaying]);

  // Handle sleep detection - goodnight and close
  const handleSleepDetected = () => {
    setIsPlaying(false);
    abortRef.current = true;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (synthRef.current) { synthRef.current.cancel(); }
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

  const storyTitle = getLocalizedText(activeStory, 'title');
  const storySubtitle = getLocalizedText(activeStory, 'subtitle');
  const storyMoral = getLocalizedText(activeStory, 'moral');

  // Calculate progress
  const progress = hasContent ? ((currentParagraph + 1) / content.length) * 100 : 0;

  // Initialize interactive story
  useEffect(() => {
    if (isInteractiveStory && activeStory.startBranchId) {
      setCurrentBranchId(activeStory.startBranchId);
      setStoryPath([]);
      setCurrentParagraph(0);
      setShowChoices(false);
      setIsEnding(false);
    }
  }, [activeStory.id]);

  // Check if we need to show choices
  useEffect(() => {
    if (isInteractiveStory && currentBranch) {
      const isLastParagraph = currentParagraph >= content.length - 1;
      const hasChoices = currentBranch.choices && currentBranch.choices.length > 0;
      const isBranchEnding = currentBranch.isEnding;

      if (isLastParagraph) {
        if (hasChoices) {
          setShowChoices(true);
          setIsEnding(false);
        } else if (isBranchEnding) {
          setShowChoices(false);
          setIsEnding(true);
          // Record story completion
          const duration = Math.round((Date.now() - storyStartTime.current) / 60000);
          recordStoryRead(activeStory.id, activeStory.theme || 'general', duration);
          recordEnding();
          soundEffects.play('story_complete');
        }
      } else {
        setShowChoices(false);
        setIsEnding(false);
      }
    }
  }, [currentParagraph, currentBranchId, content.length]); // Added content.length to dependency for lang switch

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Parse text into narration vs dialogue segments
  const parseSegments = (text: string): { text: string; isDialogue: boolean }[] => {
    const segments: { text: string; isDialogue: boolean }[] = [];
    const dialogueRegex = /"([^"]+)"/g;
    let lastIndex = 0;
    let match;

    while ((match = dialogueRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const narration = text.slice(lastIndex, match.index).trim();
        if (narration) segments.push({ text: narration, isDialogue: false });
      }
      segments.push({ text: match[1], isDialogue: true });
      lastIndex = dialogueRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      const remaining = text.slice(lastIndex).trim();
      if (remaining) segments.push({ text: remaining, isDialogue: false });
    }
    if (segments.length === 0) {
      segments.push({ text, isDialogue: false });
    }
    return segments;
  };

  // Auto-advance to next paragraph
  const advanceAfterSpeech = () => {
    if (hasContent && currentParagraph < content.length - 1 && isPlaying) {
      setTimeout(() => setCurrentParagraph(prev => prev + 1), 800);
    } else if (currentParagraph >= content.length - 1) {
      setIsPlaying(false);
    }
  };

  // Cloud TTS: speak segments sequentially using Google Cloud TTS
  const speakWithCloudTTS = async (text: string) => {
    const segments = parseSegments(text);
    abortRef.current = false;
    setIsSpeaking(true);

    for (const segment of segments) {
      if (abortRef.current) break;

      try {
        const audioUrl = await synthesizeSpeech(segment.text, {
          language: language as 'en' | 'tr',
          gender: segment.isDialogue ? 'MALE' : 'FEMALE',
          pitch: segment.isDialogue ? 3.0 : 0,
          rate: speechRate,
        });

        if (abortRef.current) break;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.volume = 1;

        await new Promise<void>((resolve, reject) => {
          audio.onended = () => resolve();
          audio.onerror = () => reject(new Error('playback failed'));
          audio.play().catch(reject);
        });
      } catch {
        // If Cloud TTS fails, fall back to browser speech for this segment
        if (!abortRef.current) {
          await speakSegmentWithBrowser(segment);
        }
      }
    }

    audioRef.current = null;
    if (!abortRef.current) {
      setIsSpeaking(false);
      advanceAfterSpeech();
    }
  };

  // Browser fallback: speak a single segment using Web Speech API
  const speakSegmentWithBrowser = (segment: { text: string; isDialogue: boolean }): Promise<void> => {
    return new Promise(resolve => {
      if (!synthRef.current) { resolve(); return; }

      const utterance = new SpeechSynthesisUtterance(segment.text);
      utterance.rate = speechRate;
      utterance.pitch = segment.isDialogue ? 1.4 : 1.1;
      utterance.volume = 1;

      const voices = synthRef.current.getVoices();
      const preferredVoice = language === 'tr'
        ? voices.find(v => v.lang.startsWith('tr'))
        : voices.find(v =>
            v.name.includes('Samantha') || v.name.includes('Karen') ||
            v.name.includes('Daniel') || v.lang.startsWith('en')
          );
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      synthRef.current.speak(utterance);
    });
  };

  // Browser-only fallback: speak all segments sequentially
  const speakWithBrowser = async (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const segments = parseSegments(text);
    abortRef.current = false;
    setIsSpeaking(true);

    for (const segment of segments) {
      if (abortRef.current) break;
      await speakSegmentWithBrowser(segment);
    }

    if (!abortRef.current) {
      setIsSpeaking(false);
      advanceAfterSpeech();
    }
  };

  // Main speak function: tries Cloud TTS first, falls back to browser
  const speakParagraph = (text: string) => {
    // Stop any ongoing speech
    abortRef.current = true;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (synthRef.current) { synthRef.current.cancel(); }

    if (isTTSAvailable()) {
      speakWithCloudTTS(text);
    } else {
      speakWithBrowser(text);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && hasContent && content[currentParagraph]) {
      speakParagraph(content[currentParagraph]);
    } else if (!isPlaying) {
      abortRef.current = true;
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (synthRef.current) { synthRef.current.cancel(); }
      setIsSpeaking(false);
    }
  }, [isPlaying, currentParagraph, currentBranchId]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      abortRef.current = true;
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (synthRef.current) { synthRef.current.cancel(); }
    } else {
      setIsPlaying(true);
    }
  };

  const stopAllAudio = () => {
    abortRef.current = true;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    if (synthRef.current) { synthRef.current.cancel(); }
  };

  const handleNextParagraph = () => {
    if (hasContent && currentParagraph < content.length - 1) {
      stopAllAudio();
      setCurrentParagraph(prev => prev + 1);
    }
  };

  const handlePrevParagraph = () => {
    if (currentParagraph > 0) {
      stopAllAudio();
      setCurrentParagraph(prev => prev - 1);
    }
  };

  const changeSpeed = (rate: number) => {
    setSpeechRate(rate);
    setShowSpeedMenu(false);
    if (isPlaying && hasContent && content[currentParagraph]) {
      stopAllAudio();
      setTimeout(() => {
        speakParagraph(content[currentParagraph]);
      }, 100);
    }
  };

  // Handle interactive choice selection
  const handleChoiceSelect = (choice: StoryChoice) => {
    stopAllAudio();
    setIsPlaying(false);

    // Record the choice
    setStoryPath(prev => [...prev, choice.id]);
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
    stopAllAudio();
    setIsPlaying(false);
    setCurrentBranchId(activeStory.startBranchId || null);
    setStoryPath([]);
    setCurrentParagraph(0);
    setShowChoices(false);
    setIsEnding(false);
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
              {currentBranch.choices.map((choice, idx) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-white font-medium">
                      {getLocalizedText(choice, 'text')}
                    </span>
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