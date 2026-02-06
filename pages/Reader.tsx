import React from 'react';
import { IMAGES } from '../data';

interface ReaderProps {
  onBack: () => void;
}

const Reader: React.FC<ReaderProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-bg-dark/80 backdrop-blur-md border-b border-white/5">
        <button onClick={onBack} className="text-white/80 hover:text-white">
          <span className="material-symbols-outlined text-3xl">expand_more</span>
        </button>
        <span className="text-sm font-serif font-medium tracking-widest uppercase text-white/60">Chapter 1: The Luminous Grove</span>
        <div className="w-8"></div>
      </div>

      {/* Hero Image */}
      <div className="px-4 py-2">
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl relative">
            <img src={IMAGES.FOREST_HEADER} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Text Content */}
      <div className="px-6 py-4 flex-1 pb-40">
        <h1 className="font-serif text-3xl text-white font-bold leading-tight mb-8">The Secret of the Glowing Moss</h1>
        
        <div className="space-y-6 text-lg font-serif leading-relaxed text-gray-300">
            <p>
                In the heart of the whispering woods, a small kitten named <span className="text-primary font-bold cursor-pointer hover:underline">Luna</span> began to twitch her whiskers. The silver moon cast a gentle glow over the mossy ground, and the fireflies danced like tiny lanterns.
            </p>
            <p>
                Luna had always wondered why the trees hummed at night. It wasn't a loud sound, but a soft vibration that tickled her paws. "It's the earth dreaming," her mother would say, but Luna wanted to see the dreams for herself.
            </p>
            <p className="opacity-60">
                Tonight, she decided to explore deeper than ever before. She padded past the tall oaks and found a hollow tree that smelled like cinnamon and fresh rain...
            </p>
        </div>
        
        <p className="text-center text-xs text-white/30 italic mt-8">Tap any word to jump to that moment</p>
      </div>

      {/* Player Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#16131f]/95 backdrop-blur-xl border-t border-white/10 pb-8 pt-6 px-6 rounded-t-3xl max-w-[430px] mx-auto">
         <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
                <span className="text-xs text-white/50 font-medium">02:15</span>
                <span className="text-xs text-white/50 font-medium">05:00</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full relative cursor-pointer group">
                <div className="absolute h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                <div className="absolute h-4 w-4 bg-white border-2 border-primary rounded-full top-1/2 -translate-y-1/2 shadow-lg opacity-100" style={{ left: '45%' }}></div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-2">
                 <button className="text-white/60 hover:text-white"><span className="material-symbols-outlined">speed</span></button>
                 
                 <div className="flex items-center gap-6">
                    <button className="text-white/80 hover:text-white"><span className="material-symbols-outlined text-3xl">replay_10</span></button>
                    <button className="size-16 rounded-full bg-primary flex items-center justify-center text-bg-dark shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-4xl fill-current">pause</span>
                    </button>
                    <button className="text-white/80 hover:text-white"><span className="material-symbols-outlined text-3xl">forward_10</span></button>
                 </div>

                 <button className="text-white/60 hover:text-white active:text-accent-peach"><span className="material-symbols-outlined">bedtime</span></button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reader;