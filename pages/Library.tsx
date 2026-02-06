import React, { useState } from 'react';
import { LIBRARY_STORIES } from '../data';
import { ScreenName, Story } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';

interface LibraryProps {
  onNavigate: (screen: ScreenName) => void;
  onStorySelect: (story: Story) => void;
}

const Library: React.FC<LibraryProps> = ({ onNavigate, onStorySelect }) => {
  const { language, t } = useLanguage();
  const { isFavorite, addFavorite, removeFavorite, favorites } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filters = [
    { id: 'favorites', emoji: '❤️', name: language === 'tr' ? 'Favoriler' : 'Favorites' },
    { id: 'interactive', emoji: '🎮', name: language === 'tr' ? 'İnteraktif' : 'Interactive' },
    { id: 'courage', emoji: '🦁', name: language === 'tr' ? 'Cesaret' : 'Courage' },
    { id: 'friendship', emoji: '🤝', name: language === 'tr' ? 'Dostluk' : 'Friendship' },
    { id: 'magic', emoji: '✨', name: language === 'tr' ? 'Sihir' : 'Magic' },
    { id: 'adventure', emoji: '🚀', name: language === 'tr' ? 'Macera' : 'Adventure' },
    { id: 'kindness', emoji: '💖', name: language === 'tr' ? 'İyilik' : 'Kindness' },
  ];

  // Filter stories
  const filteredStories = LIBRARY_STORIES.filter(story => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!story.title.toLowerCase().includes(query) &&
        !story.subtitle?.toLowerCase().includes(query) &&
        !story.theme?.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Favorites filter
    if (activeFilter === 'favorites') {
      if (!favorites.includes(story.id)) return false;
    }

    // Interactive filter
    if (activeFilter === 'interactive') {
      if (!story.isInteractive) return false;
    }

    // Theme filters
    if (activeFilter && !['favorites', 'interactive'].includes(activeFilter)) {
      if (story.theme?.toLowerCase() !== activeFilter) return false;
    }

    return true;
  });

  const handleFilterClick = (filterId: string) => {
    if (activeFilter === filterId) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterId);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark pb-24">
      <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pt-4 pb-2">
        <div className="flex items-center justify-between px-4 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-white">{t.library_title}</h1>
          <div className="size-10" /> {/* Spacer */}
        </div>

        {/* Search */}
        <div className="px-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/40">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.library_search}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder:text-white/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-white/40 hover:text-white"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`flex items-center gap-1 h-9 px-4 rounded-full border whitespace-nowrap transition-all ${activeFilter === filter.id
                  ? 'bg-primary/20 border-primary text-primary shadow-sm'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                }`}
            >
              <span>{filter.emoji}</span>
              <span className="text-sm font-medium">{filter.name}</span>
              {filter.id === 'favorites' && favorites.length > 0 && (
                <span className="ml-1 bg-red-400 text-white text-[10px] px-1.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2">
        <p className="text-white/40 text-sm">
          {filteredStories.length} {language === 'tr' ? 'hikaye bulundu' : 'stories found'}
        </p>
      </div>

      {/* Story Grid */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 p-4">
          {filteredStories.map(story => (
            <div key={story.id} className="flex flex-col gap-2 group cursor-pointer">
              <div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10"
                onClick={() => onStorySelect(story)}
              >
                <img src={story.coverUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />

                {/* Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isFavorite(story.id) ? removeFavorite(story.id) : addFavorite(story.id);
                  }}
                  className={`absolute top-2 right-2 size-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center transition-colors ${isFavorite(story.id) ? 'text-red-400' : 'text-white/70 hover:text-red-400'
                    }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {isFavorite(story.id) ? 'favorite' : 'favorite_border'}
                  </span>
                </button>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                  <span className="text-[10px] font-bold text-white">{story.duration}</span>
                </div>

                {/* Type badge */}
                {story.isInteractive ? (
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-secondary to-purple-500 backdrop-blur-md px-2 py-1 rounded-lg animate-pulse">
                    <span className="text-[10px] font-bold text-white">🎮 Interactive</span>
                  </div>
                ) : story.content && (
                  <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-md px-2 py-1 rounded-lg">
                    <span className="text-[10px] font-bold text-bg-dark">📖 Full Story</span>
                  </div>
                )}
              </div>
              <div className="px-1" onClick={() => onStorySelect(story)}>
                <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{story.title}</h3>
                <p className="text-[10px] text-white/50">{story.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {language === 'tr' ? 'Hikaye bulunamadı' : 'No stories found'}
          </h3>
          <p className="text-white/50">
            {language === 'tr'
              ? 'Farklı bir filtre veya arama terimi deneyin'
              : 'Try a different filter or search term'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter(null);
            }}
            className="mt-4 px-6 py-2 bg-primary rounded-xl text-white font-bold"
          >
            {language === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Library;