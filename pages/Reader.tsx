import React, { useState, useEffect, useRef } from 'react';
import { Story } from '../types';
import { LIBRARY_STORIES } from '../data';

interface ReaderProps {
  story: Story | null;
  onBack: () => void;
}

const Reader: React.FC<ReaderProps> = ({ story, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [speechRate, setSpeechRate] = useState(0.9); // Slower for kids
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Use provided story or fallback to a default story with content
  const defaultStory = LIBRARY_STORIES.find(s => s.content) || LIBRARY_STORIES[0];
  const activeStory = story || defaultStory;

  const hasContent = activeStory.content && activeStory.content.length > 0;

  // Calculate reading progress
  const progress = hasContent
    ? ((currentParagraph + 1) / activeStory.content!.length) * 100
    : 45;

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      // Cleanup: stop speaking when component unmounts
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Speak the current paragraph
  const speakParagraph = (text: string) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1.1; // Slightly higher pitch for kids
    utterance.volume = 1;

    // Try to find a nice voice
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
      // Auto-advance to next paragraph when done
      if (hasContent && currentParagraph < activeStory.content!.length - 1 && isPlaying) {
        setTimeout(() => {
          setCurrentParagraph(prev => prev + 1);
        }, 800); // Small pause between paragraphs
      } else if (currentParagraph >= activeStory.content!.length - 1) {
        setIsPlaying(false);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  // Effect to handle auto-play
  useEffect(() => {
    if (isPlaying && hasContent && activeStory.content) {
      speakParagraph(activeStory.content[currentParagraph]);
    } else if (!isPlaying && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, [isPlaying, currentParagraph]);

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
    if (hasContent && currentParagraph < activeStory.content!.length - 1) {
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
    // If currently playing, restart with new speed
    if (isPlaying && hasContent && activeStory.content) {
      if (synthRef.current) synthRef.current.cancel();
      setTimeout(() => {
        speakParagraph(activeStory.content![currentParagraph]);
      }, 100);
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
            <span className="text-[10px] text-white/40">
              {currentParagraph + 1} / {activeStory.content!.length}
            </span>
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
        {activeStory.moral && (
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
            {activeStory.content!.map((paragraph, index) => (
              <p
                key={index}
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

            {/* Story End */}
            {currentParagraph === activeStory.content!.length - 1 && (
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
              Look for stories marked with "📖 Full Story" badge.
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
              {hasContent ? `${activeStory.content!.length} total` : activeStory.duration}
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
              const newParagraph = Math.floor(percent * activeStory.content!.length);
              setCurrentParagraph(Math.min(newParagraph, activeStory.content!.length - 1));
            }}
          >
            <div
              className="absolute h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className="absolute h-4 w-4 bg-white border-2 border-primary rounded-full top-1/2 -translate-y-1/2 shadow-lg opacity-100 transition-all duration-300"
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
                disabled={!hasContent || currentParagraph >= activeStory.content!.length - 1}
                className={`${!hasContent || currentParagraph >= activeStory.content!.length - 1 ? 'text-white/30' : 'text-white/80 hover:text-white'}`}
              >
                <span className="material-symbols-outlined text-3xl">skip_next</span>
              </button>
            </div>

            <button className="text-white/60 hover:text-white active:text-accent-peach">
              <span className="material-symbols-outlined">bedtime</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;