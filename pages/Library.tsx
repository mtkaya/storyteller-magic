import React, { useState } from 'react';
import { LIBRARY_STORIES } from '../data';
import { ScreenName } from '../types';
import { GameState } from '../useGameState';

interface LibraryProps {
  onNavigate: (screen: ScreenName) => void;
  gameState: GameState;
  onToggleFavorite: (id: string) => void;
  onReadStory: (id: string) => void;
}

const Library: React.FC<LibraryProps> = ({ onNavigate, gameState, onToggleFavorite, onReadStory }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Courage", "Friendship", "Magic", "Adventure"];

  const filteredStories = LIBRARY_STORIES.filter(story => {
    const matchesSearch = !searchQuery ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.subtitle || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || story.theme === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getFilterEmoji = (filter: string) => {
    switch (filter) {
      case "Courage": return "🦁";
      case "Friendship": return "🤝";
      case "Magic": return "✨";
      case "Adventure": return "🚀";
      default: return "";
    }
  };

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
                <input
                  type="text"
                  placeholder="Search for adventures..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder:text-white/30"
                />
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center h-9 px-4 rounded-full border whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? 'bg-white/10 border-primary text-primary shadow-sm'
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                }`}
              >
                <span className="text-sm font-medium">
                  {filter !== "All" && getFilterEmoji(filter)} {filter}
                </span>
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
         {filteredStories.map(story => {
           const isFavorite = gameState.favoriteStories.includes(story.id);
           return (
             <div key={story.id} className="flex flex-col gap-2 group cursor-pointer" onClick={() => onReadStory(story.id)}>
                 <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10">
                    <img src={story.coverUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" alt={story.title} />
                    <div className="absolute top-2 right-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(story.id);
                          }}
                          className={`size-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center transition-colors ${
                            isFavorite ? 'text-red-400' : 'text-white/70 hover:text-red-400'
                          }`}
                        >
                             <span className="material-symbols-outlined text-lg">
                               {isFavorite ? 'favorite' : 'favorite_border'}
                             </span>
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
           );
         })}
      </div>
    </div>
  );
};

export default Library;
