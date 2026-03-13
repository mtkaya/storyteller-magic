import React, { useState, useEffect } from 'react';
import { CreateStep, ScreenName } from '../types';
import { IMAGES } from '../data';
import { StorySeed, generateStory } from '../storyGenerator';

interface CreateStoryProps {
  onBack: () => void;
  onComplete: (story: StorySeed) => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState<CreateStep>(CreateStep.THEME);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<string>("Courage");
  const [selectedTone, setSelectedTone] = useState<string>("Calm");
  const [selectedDuration, setSelectedDuration] = useState<string>("Short");
  const [generatedStory, setGeneratedStory] = useState<StorySeed | null>(null);

  useEffect(() => {
    if (step === CreateStep.GENERATING) {
      // Generate the story
      const story = generateStory(selectedTheme, selectedTone, selectedDuration);
      setGeneratedStory(story);

      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep(CreateStep.RESULT);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step, selectedTheme, selectedTone, selectedDuration]);

  const themes = [
    { name: 'Courage', icon: IMAGES.LION_MOON },
    { name: 'Friendship', icon: IMAGES.PILLOW_FIGHT },
    { name: 'Wonder', icon: IMAGES.MAGIC_CHEST },
    { name: 'Nature', icon: IMAGES.TURTLE_RABBIT }
  ];

  if (step === CreateStep.GENERATING) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-bg-dark relative overflow-hidden">
        {/* Magic gradient background */}
        <div className="absolute inset-0 bg-magic-gradient opacity-80"></div>
        <div className="absolute inset-0 bg-star-dust opacity-30"></div>
        
        <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
           <div className="relative w-64 h-64 mb-12">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border-4 border-primary/20"></div>
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                 <img src={IMAGES.WAND_UI} alt="Magic Wand" className="w-40 h-40 object-contain opacity-90 drop-shadow-[0_0_15px_rgba(238,140,43,0.6)] animate-pulse-slow" />
              </div>
           </div>
           
           <h2 className="text-3xl font-bold text-white text-center mb-2">Writing Story...</h2>
           <p className="text-primary/80 italic mb-8">The magic is at work</p>
           
           <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
             <div 
               className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(238,140,43,0.5)]"
               style={{ width: `${loadingProgress}%` }}
             ></div>
           </div>
           <p className="text-white/40 text-xs mt-3">{loadingProgress}% Complete</p>
        </div>
      </div>
    );
  }

  if (step === CreateStep.RESULT && generatedStory) {
      return (
          <div className="flex flex-col h-screen bg-bg-dark relative">
               <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url("${generatedStory.coverImage}")` }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent"></div>

               <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
                   <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 mb-8 mx-auto">
                        <img src={generatedStory.coverImage} className="w-full h-full object-cover" />
                   </div>
                   <h1 className="text-3xl font-bold text-white mb-2">Story Ready!</h1>
                   <p className="text-white/70 mb-8">Your magical journey "{generatedStory.title}" has been created.</p>

                   <button onClick={() => onComplete(generatedStory)} className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mb-4">
                       <span className="material-symbols-outlined">auto_stories</span>
                       Read Now
                   </button>
                   <button onClick={() => { setStep(CreateStep.THEME); setLoadingProgress(0); }} className="text-white/50 text-sm hover:text-white">
                       Create Another
                   </button>
               </div>
          </div>
      )
  }

  const currentStepNum = step === CreateStep.THEME ? 1 : step === CreateStep.TONE ? 2 : 3;
  const progressWidth = step === CreateStep.THEME ? '33%' : step === CreateStep.TONE ? '66%' : '100%';

  // Step 1: Theme Selection
  if (step === CreateStep.THEME) {
    return (
      <div className="flex flex-col min-h-screen bg-bg-dark text-white">
        <div className="flex items-center p-6 pb-2">
          <button onClick={onBack} className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="flex-1 text-center text-lg font-bold pr-10">Create Magic Story</h2>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between items-end mb-2">
            <p className="text-white/90 text-base font-semibold">Crafting your adventure</p>
            <p className="text-white/60 text-xs font-medium">Step 1 of 3</p>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-accent-peach rounded-full transition-all duration-300" style={{ width: progressWidth }}></div>
          </div>
        </div>

        <div className="flex-1 px-6 py-4">
          <h3 className="text-xl font-bold mb-4">Choose a Theme</h3>
          <div className="grid grid-cols-2 gap-4">
            {themes.map((theme, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTheme(theme.name)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${selectedTheme === theme.name ? 'bg-white/10 border-accent-peach ring-2 ring-accent-peach/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <div className="w-full aspect-square rounded-xl bg-[#2d2e4d] mb-3 overflow-hidden shadow-inner">
                  <img src={theme.icon} alt={theme.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="font-bold text-sm">{theme.name}</span>
                  {selectedTheme === theme.name && <span className="material-symbols-outlined text-accent-peach text-sm">check_circle</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-bg-dark border-t border-white/5">
          <button
            onClick={() => setStep(CreateStep.TONE)}
            className="w-full py-4 rounded-xl bg-accent-peach text-bg-dark text-lg font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,176,142,0.4)] active:scale-95 transition-transform"
          >
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    );
  }

  // Step 2: Tone Selection
  if (step === CreateStep.TONE) {
    const tones = ["Calm", "Funny", "Adventure"];
    return (
      <div className="flex flex-col min-h-screen bg-bg-dark text-white">
        <div className="flex items-center p-6 pb-2">
          <button onClick={() => setStep(CreateStep.THEME)} className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="flex-1 text-center text-lg font-bold pr-10">Create Magic Story</h2>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between items-end mb-2">
            <p className="text-white/90 text-base font-semibold">Crafting your adventure</p>
            <p className="text-white/60 text-xs font-medium">Step 2 of 3</p>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-accent-peach rounded-full transition-all duration-300" style={{ width: progressWidth }}></div>
          </div>
        </div>

        <div className="flex-1 px-6 py-4">
          <h3 className="text-xl font-bold mb-4">Select a Tone</h3>
          <div className="flex flex-col gap-3">
            {tones.map((tone) => (
              <button
                key={tone}
                onClick={() => setSelectedTone(tone)}
                className={`px-6 py-4 rounded-xl font-bold border transition-all ${selectedTone === tone ? 'bg-secondary text-white border-white/20 ring-2 ring-secondary/50' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'}`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-bg-dark border-t border-white/5">
          <button
            onClick={() => setStep(CreateStep.DURATION)}
            className="w-full py-4 rounded-xl bg-accent-peach text-bg-dark text-lg font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,176,142,0.4)] active:scale-95 transition-transform"
          >
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Duration Selection
  if (step === CreateStep.DURATION) {
    const durations = [
      { label: "Short", time: "5 min" },
      { label: "Medium", time: "10 min" },
      { label: "Long", time: "15 min" }
    ];
    return (
      <div className="flex flex-col min-h-screen bg-bg-dark text-white">
        <div className="flex items-center p-6 pb-2">
          <button onClick={() => setStep(CreateStep.TONE)} className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="flex-1 text-center text-lg font-bold pr-10">Create Magic Story</h2>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between items-end mb-2">
            <p className="text-white/90 text-base font-semibold">Crafting your adventure</p>
            <p className="text-white/60 text-xs font-medium">Step 3 of 3</p>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-accent-peach rounded-full transition-all duration-300" style={{ width: progressWidth }}></div>
          </div>
        </div>

        <div className="flex-1 px-6 py-4">
          <h3 className="text-xl font-bold mb-4">Story Duration</h3>
          <div className="flex flex-col gap-3">
            {durations.map((duration) => (
              <button
                key={duration.label}
                onClick={() => setSelectedDuration(duration.label)}
                className={`px-6 py-4 rounded-xl font-bold border transition-all flex justify-between items-center ${selectedDuration === duration.label ? 'bg-secondary text-white border-white/20 ring-2 ring-secondary/50' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'}`}
              >
                <span>{duration.label}</span>
                <span className="text-sm opacity-70">{duration.time}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-bg-dark border-t border-white/5">
          <button
            onClick={() => setStep(CreateStep.GENERATING)}
            className="w-full py-4 rounded-xl bg-accent-peach text-bg-dark text-lg font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,176,142,0.4)] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">auto_fix_high</span>
            Create Story
          </button>
          <p className="text-center text-white/40 text-xs mt-4 italic">Crafting your story from the library...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default CreateStory;