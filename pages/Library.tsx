import React from 'react';
import { LIBRARY_STORIES } from '../data';
import { ScreenName } from '../types';

interface LibraryProps {
  onNavigate: (screen: ScreenName) => void;
}

const Library: React.FC<LibraryProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark pb-24">
      <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pt-4 pb-2">
        <div className="flex items-center justify-between px-4 mb-4">
           <button className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white">
             <span className="material-symbols-outlined">arrow_back</span>
           </button>
           <h1 className="text-lg font-bold text-white">Library</h1>
           <button className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white">
             <span className="material-symbols-outlined">search</span>
           </button>
        </div>
        
        {/* Search */}
        <div className="px-4 mb-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40">
                    <span className="material-symbols-outlined">search</span>
                </div>
                <input type="text" placeholder="Search for adventures..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder:text-white/30" />
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
            <button className="flex items-center h-9 px-4 rounded-full bg-white/10 border border-primary text-primary shadow-sm whitespace-nowrap">
                <span className="text-sm font-bold">🦁 Courage</span>
            </button>
            <button className="flex items-center h-9 px-4 rounded-full bg-white/5 border border-white/10 text-white/60 whitespace-nowrap">
                <span className="text-sm font-medium">🤝 Friendship</span>
            </button>
             <button className="flex items-center h-9 px-4 rounded-full bg-white/5 border border-white/10 text-white/60 whitespace-nowrap">
                <span className="text-sm font-medium">✨ Magic</span>
            </button>
             <button className="flex items-center h-9 px-4 rounded-full bg-white/5 border border-white/10 text-white/60 whitespace-nowrap">
                <span className="text-sm font-medium">🚀 Adventure</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
         {LIBRARY_STORIES.map(story => (
             <div key={story.id} className="flex flex-col gap-2 group cursor-pointer" onClick={() => onNavigate('reader')}>
                 <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10">
                    <img src={story.coverUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                    <div className="absolute top-2 right-2">
                        <button className="size-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-red-400">
                             <span className="material-symbols-outlined text-lg">favorite</span>
                        </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                        <span className="text-[10px] font-bold text-white">{story.duration}</span>
                    </div>
                 </div>
                 <div className="px-1">
                     <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{story.title}</h3>
                     <p className="text-[10px] text-white/50">{story.subtitle}</p>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};

export default Library;