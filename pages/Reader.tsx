import React, { useState } from 'react';
import { IMAGES } from '../data';
import { StorySeed, STORY_SEEDS } from '../storyGenerator';

interface ReaderProps {
  onBack: () => void;
  story?: StorySeed;
}

type ReadingState = "reading" | "at_choice" | "branch_selected" | "finished";

const Reader: React.FC<ReaderProps> = ({ onBack, story }) => {
  const activeStory = story || STORY_SEEDS[0];
  const [readingState, setReadingState] = useState<ReadingState>("reading");
  const [selectedBranch, setSelectedBranch] = useState<"A" | "B" | null>(null);

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
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-bg-dark/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="text-white/80 hover:text-white">
          <span className="material-symbols-outlined text-3xl">expand_more</span>
        </button>
        <span className="text-sm font-serif font-medium tracking-widest uppercase text-white/60">Chapter 1: {activeStory.setting}</span>
        <div className="w-8"></div>
      </div>

      {/* Hero Image */}
      <div className="px-4 py-2">
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl relative">
            <img src={activeStory.coverImage} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Text Content */}
      <div className="px-6 py-4 flex-1 pb-20">
        <h1 className="font-serif text-3xl text-white font-bold leading-tight mb-8">{activeStory.title}</h1>

        <div className="space-y-6 text-lg font-serif leading-relaxed text-gray-300">
            {/* Opening */}
            <p>{activeStory.opening}</p>

            {/* Midpoint */}
            {(readingState === "at_choice" || readingState === "branch_selected" || readingState === "finished") && (
              <p>{activeStory.midpoint}</p>
            )}

            {/* Choice Buttons */}
            {readingState === "at_choice" && (
              <div className="space-y-3 my-8">
                <p className="text-center text-white/60 text-sm italic mb-4">What will {activeStory.character} do?</p>
                {activeStory.branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => handleChoiceSelect(branch.id)}
                    className="w-full p-4 rounded-xl bg-white/5 border border-primary/30 hover:border-primary hover:bg-white/10 transition-all flex items-center gap-3 text-left"
                  >
                    <span className="material-symbols-outlined text-primary text-2xl">
                      {branch.id === "A" ? "explore" : "favorite"}
                    </span>
                    <span className="text-white font-medium">{branch.choiceText}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Branch Content */}
            {readingState === "branch_selected" && selectedBranch && (
              <>
                <p>{activeStory.branches.find(b => b.id === selectedBranch)?.sceneText}</p>
                <p>{activeStory.branches.find(b => b.id === selectedBranch)?.outcomeText}</p>
              </>
            )}

            {/* Ending */}
            {readingState === "finished" && (
              <>
                {selectedBranch && (
                  <>
                    <p>{activeStory.branches.find(b => b.id === selectedBranch)?.sceneText}</p>
                    <p>{activeStory.branches.find(b => b.id === selectedBranch)?.outcomeText}</p>
                  </>
                )}
                <p>{activeStory.ending}</p>

                <div className="my-8 text-center">
                  <p className="text-2xl mb-6">The End 🌙</p>
                  <div className="space-y-3">
                    <button
                      onClick={handleReadAgain}
                      className="w-full py-3 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">replay</span>
                      Read Again
                    </button>
                    <button
                      onClick={onBack}
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10"
                    >
                      Back to Library
                    </button>
                  </div>
                </div>
              </>
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