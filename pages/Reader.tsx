import React, { useState, useEffect, useRef } from 'react';
import { Story, StoryBranch, StoryChoice } from '../types';
import { LIBRARY_STORIES } from '../data';
import SleepController from '../components/SleepController';

interface ReaderProps {
  story: Story | null;
  onBack: () => void;
}

const Reader: React.FC<ReaderProps> = ({ story, onBack }) => {
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

  // Enable sleep controller when playing
  useEffect(() => {
    setSleepControllerActive(isPlaying);
  }, [isPlaying]);

  // Handle sleep detection - goodnight and close
  const handleSleepDetected = () => {
    setIsPlaying(false);
    if (synthRef.current) {
      synthRef.current.cancel();
    }
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

  // Get current branch for interactive stories
  const currentBranch: StoryBranch | null = isInteractiveStory
    ? activeStory.branches!.find(b => b.id === (currentBranchId || activeStory.startBranchId)) || null
    : null;

  // Get content based on story type
  const getContent = (): string[] => {
    if (isInteractiveStory && currentBranch) {
      return currentBranch.paragraphs;
    }
    return activeStory.content || [];
  };

  const content = getContent();
  const hasContent = content.length > 0;

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
        }
      } else {
        setShowChoices(false);
        setIsEnding(false);
      }
    }
  }, [currentParagraph, currentBranchId]);

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

  // Speak paragraph
  const speakParagraph = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Karen') ||
      v.name.includes('Daniel') ||
      v.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      // Auto-advance (but not past the last paragraph if choices are available)
      if (hasContent && currentParagraph < content.length - 1 && isPlaying) {
        setTimeout(() => {
          setCurrentParagraph(prev => prev + 1);
        }, 800);
      } else if (currentParagraph >= content.length - 1) {
        setIsPlaying(false);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && hasContent && content[currentParagraph]) {
      speakParagraph(content[currentParagraph]);
    } else if (!isPlaying && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, [isPlaying, currentParagraph, currentBranchId]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    } else {
      setIsPlaying(true);
    }
  };

  const handleNextParagraph = () => {
    if (hasContent && currentParagraph < content.length - 1) {
      if (synthRef.current) synthRef.current.cancel();
      setCurrentParagraph(prev => prev + 1);
    }
  };

  const handlePrevParagraph = () => {
    if (currentParagraph > 0) {
      if (synthRef.current) synthRef.current.cancel();
      setCurrentParagraph(prev => prev - 1);
    }
  };

  const changeSpeed = (rate: number) => {
    setSpeechRate(rate);
    setShowSpeedMenu(false);
    if (isPlaying && hasContent && content[currentParagraph]) {
      if (synthRef.current) synthRef.current.cancel();
      setTimeout(() => {
        speakParagraph(content[currentParagraph]);
      }, 100);
    }
  };

  // Handle interactive choice selection
  const handleChoiceSelect = (choice: StoryChoice) => {
    if (synthRef.current) synthRef.current.cancel();
    setIsPlaying(false);

    // Record the choice
    setStoryPath(prev => [...prev, choice.id]);

    // Navigate to the next branch
    setCurrentBranchId(choice.nextBranchId);
    setCurrentParagraph(0);
    setShowChoices(false);
    setIsEnding(false);
  };

  // Restart interactive story
  const handleRestartStory = () => {
    if (synthRef.current) synthRef.current.cancel();
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
        <button onClick={onBack} className="text-white/80 hover:text-white">
          <span className="material-symbols-outlined text-3xl">expand_more</span>
        </button>
        <div className="text-center">
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
        <div className="w-8"></div>
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
                <span className="text-xs text-white/90 font-medium">Ages {activeStory.ageRange}</span>
              </div>
            )}
            {/* Story path indicator for interactive stories */}
            {isInteractiveStory && storyPath.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-primary/30 backdrop-blur-md px-3 py-1.5 rounded-full ml-2">
                <span className="material-symbols-outlined text-primary text-sm">route</span>
                <span className="text-xs text-white/90 font-medium">{storyPath.length} choices made</span>
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

      {/* Text Content */}
      <div className="px-6 py-4 flex-1 pb-48 overflow-y-auto">
        <h1 className="font-serif text-3xl text-white font-bold leading-tight mb-4">{activeStory.title}</h1>

        {/* Moral badge */}
        {activeStory.moral && !isEnding && (
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-4 mb-6 border border-primary/30">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
              <div>
                <p className="text-xs text-primary font-bold uppercase tracking-wide mb-1">Lesson</p>
                <p className="text-sm text-white/80 italic">{activeStory.moral}</p>
              </div>
            </div>
          </div>
        )}

        {hasContent ? (
          <div className="space-y-6 text-lg font-serif leading-relaxed text-gray-300">
            {content.map((paragraph, index) => (
              <p
                key={`${currentBranchId}-${index}`}
                onClick={() => {
                  setCurrentParagraph(index);
                  if (isPlaying && synthRef.current) {
                    synthRef.current.cancel();
                    setTimeout(() => speakParagraph(paragraph), 100);
                  }
                }}
                className={`transition-all duration-500 cursor-pointer hover:text-white/90 ${index === currentParagraph
                  ? 'opacity-100 text-white bg-white/5 -mx-4 px-4 py-2 rounded-lg border-l-4 border-primary'
                  : index < currentParagraph
                    ? 'opacity-40'
                    : 'opacity-60'
                  }`}
              >
                {paragraph}
              </p>
            ))}

            {/* Interactive Choices */}
            {showChoices && currentBranch?.choices && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary text-2xl animate-bounce">touch_app</span>
                  <p className="text-secondary font-bold text-lg">What happens next?</p>
                </div>
                <div className="grid gap-3">
                  {currentBranch.choices.map((choice, index) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoiceSelect(choice)}
                      className="group relative bg-gradient-to-r from-bg-card to-bg-card/80 border-2 border-white/10 hover:border-primary/50 rounded-2xl p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl shadow-lg">
                          {choice.emoji || ['🌟', '🎯', '💫', '🌈'][index % 4]}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-base group-hover:text-primary transition-colors">
                            {choice.text}
                          </p>
                          {choice.consequence && (
                            <p className="text-white/50 text-sm mt-1 italic">
                              {choice.consequence}
                            </p>
                          )}
                        </div>
                        <span className="material-symbols-outlined text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all">
                          arrow_forward
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Story Ending */}
            {isEnding && currentBranch?.isEnding && (
              <div className="mt-8 text-center py-8 bg-gradient-to-b from-primary/10 to-secondary/10 rounded-2xl border border-primary/30">
                <span className="text-6xl block mb-4 animate-bounce">
                  {getEndingEmoji(currentBranch.endingType)}
                </span>
                <p className="text-white font-bold text-xl mb-2">
                  {currentBranch.endingTitle || 'The End'}
                </p>
                <p className="text-white/60 text-sm mb-6">
                  {currentBranch.endingType === 'happy' && 'What a wonderful adventure!'}
                  {currentBranch.endingType === 'adventure' && 'The adventure continues another day!'}
                  {currentBranch.endingType === 'lesson' && 'Every choice teaches us something new.'}
                  {!currentBranch.endingType && 'Sweet dreams, little one.'}
                </p>

                {/* Story stats */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl px-4 py-2">
                    <p className="text-2xl font-bold text-primary">{storyPath.length}</p>
                    <p className="text-xs text-white/50">Choices Made</p>
                  </div>
                  <div className="bg-white/10 rounded-xl px-4 py-2">
                    <p className="text-2xl font-bold text-secondary">
                      {activeStory.branches?.filter(b => b.isEnding).length || 1}
                    </p>
                    <p className="text-xs text-white/50">Possible Endings</p>
                  </div>
                </div>

                <button
                  onClick={handleRestartStory}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-bg-dark font-bold px-6 py-3 rounded-full transition-all hover:scale-105"
                >
                  <span className="material-symbols-outlined">replay</span>
                  Try Different Choices
                </button>
              </div>
            )}

            {/* Linear Story End */}
            {!isInteractiveStory && currentParagraph === content.length - 1 && (
              <div className="text-center py-8">
                <span className="text-4xl">🌙</span>
                <p className="text-white/60 text-sm mt-2 font-medium">The End</p>
                <p className="text-white/40 text-xs mt-1">Sweet dreams, little one</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 text-lg font-serif leading-relaxed text-gray-300">
            <p>
              This story doesn't have content yet. Check out our <span className="text-primary font-bold">new stories</span> in the library with full narration!
            </p>
            <p className="text-white/50 italic">
              Look for stories marked with "📖 Full Story" or "🎮 Interactive" badge.
            </p>
          </div>
        )}
      </div>

      {/* Player Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#16131f]/95 backdrop-blur-xl border-t border-white/10 pb-8 pt-6 px-6 rounded-t-3xl max-w-[430px] mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-white/50 font-medium">
              {hasContent ? `Para ${currentParagraph + 1}` : '02:15'}
            </span>
            <span className="text-xs text-white/50 font-medium">
              {hasContent ? `${content.length} total` : activeStory.duration}
            </span>
          </div>

          {/* Progress Bar */}
          <div
            className="w-full h-1.5 bg-white/10 rounded-full relative cursor-pointer group"
            onClick={(e) => {
              if (!hasContent) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percent = x / rect.width;
              const newParagraph = Math.floor(percent * content.length);
              setCurrentParagraph(Math.min(newParagraph, content.length - 1));
            }}
          >
            <div
              className="absolute h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className="absolute h-4 w-4 bg-white border-2 border-primary rounded-full top-1/2 -translate-y-1/2 shadow-lg"
              style={{ left: `calc(${progress}% - 8px)` }}
            ></div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-2 relative">
            {/* Speed Control */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="text-white/60 hover:text-white flex items-center gap-1"
              >
                <span className="material-symbols-outlined">speed</span>
                <span className="text-[10px]">{speechRate}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-bg-card rounded-lg border border-white/10 shadow-xl overflow-hidden">
                  {[0.5, 0.75, 0.9, 1.0, 1.25].map(rate => (
                    <button
                      key={rate}
                      onClick={() => changeSpeed(rate)}
                      className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/10 ${speechRate === rate ? 'bg-primary/20 text-primary' : 'text-white/80'
                        }`}
                    >
                      {rate}x {rate === 0.9 && '(default)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={handlePrevParagraph}
                disabled={currentParagraph === 0}
                className={`${currentParagraph === 0 ? 'text-white/30' : 'text-white/80 hover:text-white'}`}
              >
                <span className="material-symbols-outlined text-3xl">skip_previous</span>
              </button>
              <button
                onClick={togglePlayPause}
                className={`size-16 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform ${isPlaying
                  ? 'bg-accent-peach shadow-accent-peach/30'
                  : 'bg-primary shadow-primary/30'
                  } text-bg-dark`}
              >
                <span className="material-symbols-outlined text-4xl fill-current">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button
                onClick={handleNextParagraph}
                disabled={!hasContent || currentParagraph >= content.length - 1}
                className={`${!hasContent || currentParagraph >= content.length - 1 ? 'text-white/30' : 'text-white/80 hover:text-white'}`}
              >
                <span className="material-symbols-outlined text-3xl">skip_next</span>
              </button>
            </div>

            {/* Restart button for interactive stories */}
            {isInteractiveStory ? (
              <button
                onClick={handleRestartStory}
                className="text-white/60 hover:text-primary"
                title="Restart Story"
              >
                <span className="material-symbols-outlined">replay</span>
              </button>
            ) : (
              <button className="text-white/60 hover:text-white active:text-accent-peach">
                <span className="material-symbols-outlined">bedtime</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sleep Controller - Detects inactivity */}
      <SleepController
        isActive={sleepControllerActive}
        onSleepDetected={handleSleepDetected}
        onUserAwake={handleUserAwake}
        inactivityTimeout={30}
        goodnightDelay={5}
      />
    </div>
  );
};

export default Reader;