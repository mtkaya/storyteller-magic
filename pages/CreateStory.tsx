import React, { useState, useEffect } from 'react';
import { CreateStep, ScreenName } from '../types';
import { IMAGES } from '../data';

interface CreateStoryProps {
  onBack: () => void;
  onComplete: () => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState<CreateStep>(CreateStep.THEME);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (step === CreateStep.GENERATING) {
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
  }, [step]);

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

  if (step === CreateStep.RESULT) {
      return (
          <div className="flex flex-col h-screen bg-bg-dark relative">
               <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url("${IMAGES.MOON_RESULT}")` }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent"></div>
               
               <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
                   <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 mb-8 mx-auto">
                        <img src={IMAGES.MOON_RESULT} className="w-full h-full object-cover" />
                   </div>
                   <h1 className="text-3xl font-bold text-white mb-2">Story Ready!</h1>
                   <p className="text-white/70 mb-8">Your magical journey "The Sleeping Moon" has been created.</p>
                   
                   <button onClick={onComplete} className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mb-4">
                       <span className="material-symbols-outlined">auto_stories</span>
                       Read Now
                   </button>
                   <button onClick={() => setStep(CreateStep.THEME)} className="text-white/50 text-sm hover:text-white">
                       Create Another
                   </button>
               </div>
          </div>
      )
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-white">
      {/* Header */}
      <div className="flex items-center p-6 pb-2">
        <button onClick={onBack} className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold pr-10">Create Magic Story</h2>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-end mb-2">
          <p className="text-white/90 text-base font-semibold">Crafting your adventure</p>
          <p className="text-white/60 text-xs font-medium">Step 1 of 3</p>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-accent-peach rounded-full transition-all duration-300" style={{ width: '33%' }}></div>
        </div>
      </div>

      {/* Theme Grid */}
      <div className="flex-1 px-6 py-4">
        <h3 className="text-xl font-bold mb-4">Choose a Theme</h3>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme, idx) => (
            <div key={idx} className={`p-3 rounded-2xl border transition-all cursor-pointer ${idx === 0 ? 'bg-white/10 border-accent-peach ring-2 ring-accent-peach/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              <div className="w-full aspect-square rounded-xl bg-[#2d2e4d] mb-3 overflow-hidden shadow-inner">
                <img src={theme.icon} alt={theme.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="font-bold text-sm">{theme.name}</span>
                {idx === 0 && <span className="material-symbols-outlined text-accent-peach text-sm">check_circle</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Tone */}
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Select a Tone</h3>
            <div className="flex gap-3">
                <button className="px-6 py-2.5 rounded-full bg-secondary text-white font-bold border border-white/20">Calm</button>
                <button className="px-6 py-2.5 rounded-full bg-white/5 text-white/70 font-bold border border-white/10">Funny</button>
                <button className="px-6 py-2.5 rounded-full bg-white/5 text-white/70 font-bold border border-white/10">Adventure</button>
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-bg-dark border-t border-white/5">
        <button 
          onClick={() => setStep(CreateStep.GENERATING)}
          className="w-full py-4 rounded-xl bg-accent-peach text-bg-dark text-lg font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,176,142,0.4)] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">auto_fix_high</span>
          Generate Story
        </button>
        <p className="text-center text-white/40 text-xs mt-4 italic">Using AI to weave your magical tale...</p>
      </div>
    </div>
  );
};

export default CreateStory;