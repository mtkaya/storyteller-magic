import React, { useState, useRef, useEffect } from 'react';
import { IMAGES } from '../data';
import { StorySeed, STORY_SEEDS } from '../storyGenerator';

interface ReaderProps {
  onBack: () => void;
  story?: StorySeed;
  onComplete?: (id: string) => void;
}

type ReadingState = "reading" | "at_choice" | "branch_selected" | "finished";

const Reader: React.FC<ReaderProps> = ({ onBack, story, onComplete }) => {
  const activeStory = story || STORY_SEEDS[0];
  const [readingState, setReadingState] = useState<ReadingState>("reading");
  const [selectedBranch, setSelectedBranch] = useState<"A" | "B" | null>(null);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const audioRef = useRef<{ src: AudioBufferSourceNode; ctx: AudioContext } | null>(null);

  const handleChoiceSelect = (branchId: "A" | "B") => {
    setSelectedBranch(branchId);
    setReadingState("branch_selected");
  };

  const handleContinue = () => {
    if (readingState === "reading") {
      setReadingState("at_choice");
    } else if (readingState === "branch_selected") {
      setReadingState("finished");
    }
  };

  const handleReadAgain = () => {
    setReadingState("reading");
    setSelectedBranch(null);
  };

  const startAmbient = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 350;
    const gain = ctx.createGain();
    gain.gain.value = 0.12;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    return { src, ctx };
  };

  const toggleAmbient = () => {
    if (ambientPlaying && audioRef.current) {
      audioRef.current.src.stop();
      audioRef.current.ctx.close();
      audioRef.current = null;
      setAmbientPlaying(false);
    } else {
      audioRef.current = startAmbient();
      setAmbientPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.src.stop();
        audioRef.current.ctx.close();
      }
    };
  }, []);

  useEffect(() => {
    if (readingState === "finished" && onComplete) {
      onComplete(activeStory.id);
    }
  }, [readingState, activeStory.id, onComplete]);

  const progressPercent = readingState === "reading" ? 33 : readingState === "at_choice" || readingState === "branch_selected" ? 66 : 100;

  const renderParagraph = (text: string, index: number) => (
    <div
      key={index}
      style={{
        animation: "fadeIn 0.8s ease forwards",
        animationDelay: `${index * 0.3}s`,
        opacity: 0
      }}
    >
      <p>{text}</p>
    </div>
  );

  let paragraphs: React.ReactNode[] = [];
  let currentIndex = 0;

  paragraphs.push(renderParagraph(activeStory.opening, currentIndex++));

  if (readingState === "at_choice" || readingState === "branch_selected" || readingState === "finished") {
    paragraphs.push(renderParagraph(activeStory.midpoint, currentIndex++));
  }

  if (readingState === "branch_selected" && selectedBranch) {
    const branch = activeStory.branches.find(b => b.id === selectedBranch);
    if (branch) {
      paragraphs.push(renderParagraph(branch.sceneText, currentIndex++));
      paragraphs.push(renderParagraph(branch.outcomeText, currentIndex++));
    }
  }

  if (readingState === "finished") {
    if (selectedBranch) {
      const branch = activeStory.branches.find(b => b.id === selectedBranch);
      if (branch) {
        paragraphs.push(renderParagraph(branch.sceneText, currentIndex++));
        paragraphs.push(renderParagraph(branch.outcomeText, currentIndex++));
      }
    }
    paragraphs.push(renderParagraph(activeStory.ending, currentIndex++));
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark">
      {/* Progress Bar */}
      <div className="h-0.5 bg-white/10 sticky top-0 z-50">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Header */}
      <div className="sticky top-0.5 z-50 flex items-center justify-between p-4 bg-bg-dark/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="text-white/80 hover:text-white">
          <span className="material-symbols-outlined text-3xl">expand_more</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-sm font-serif font-medium tracking-widest uppercase text-white/60">Chapter 1: {activeStory.setting}</span>
          <div className="flex gap-1 mt-1">
            <span className={`text-xs ${readingState === "reading" || readingState === "at_choice" || readingState === "branch_selected" || readingState === "finished" ? "text-primary" : "text-white/20"}`}>●</span>
            <span className={`text-xs ${readingState === "at_choice" || readingState === "branch_selected" || readingState === "finished" ? "text-primary" : "text-white/20"}`}>●</span>
            <span className={`text-xs ${readingState === "finished" ? "text-primary" : "text-white/20"}`}>●</span>
          </div>
        </div>
        <button onClick={toggleAmbient} className="text-white/80 hover:text-white">
          <span className="material-symbols-outlined text-2xl">
            {ambientPlaying ? "volume_up" : "volume_off"}
          </span>
        </button>
      </div>

      {/* Hero Image */}
      <div className="px-4 py-2">
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl relative">
          <img src={activeStory.coverImage} className="w-full h-full object-cover" alt={activeStory.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Text Content */}
      <div className="px-6 py-4 flex-1 pb-20">
        <h1 className="font-serif text-3xl text-white font-bold leading-tight mb-8">{activeStory.title}</h1>

        <div className="space-y-6 text-lg font-serif leading-relaxed text-gray-300">
          {paragraphs}

          {/* Choice Buttons */}
          {readingState === "at_choice" && (
            <div className="space-y-3 my-8">
              <p className="text-center text-white/60 text-sm italic mb-4">What will {activeStory.character} do?</p>
              {activeStory.branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => handleChoiceSelect(branch.id)}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-primary/10 to-yellow-500/10 border-2 border-primary/50 hover:border-primary hover:bg-primary/20 transition-all flex items-center gap-3 text-left shadow-lg"
                >
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {branch.id === "A" ? "explore" : "favorite"}
                  </span>
                  <span className="text-white font-medium">{branch.choiceText}</span>
                </button>
              ))}
            </div>
          )}

          {/* Ending Section */}
          {readingState === "finished" && (
            <div className="my-8 text-center">
              <p className="text-2xl mb-6">The End 🌙</p>
              <div className="space-y-3">
                <button
                  onClick={handleReadAgain}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined">replay</span>
                  Read Again
                </button>
                <button
                  onClick={onBack}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 transition-all"
                >
                  Back to Library
                </button>
              </div>
            </div>
          )}

          {/* Continue Button */}
          {(readingState === "reading" || readingState === "branch_selected") && (
            <div className="text-center my-8">
              <button
                onClick={handleContinue}
                className="px-8 py-3 rounded-xl bg-accent-peach text-bg-dark font-bold hover:scale-105 transition-transform"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reader;
