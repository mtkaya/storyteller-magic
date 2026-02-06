import React from 'react';
import { ScreenName, Story } from '../types';
import { RECENT_STORIES, IMAGES } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';

interface HomeProps {
  onNavigate: (screen: ScreenName) => void;
  onStorySelect: (story: Story) => void;
  onProfileClick?: () => void;
  onMusicClick?: () => void;
  onMapClick?: () => void;
  onGoalsClick?: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onStorySelect, onProfileClick, onMusicClick, onMapClick, onGoalsClick }) => {
  const { language, t } = useLanguage();
  const { activeProfile, stats, favorites, isFavorite, addFavorite, removeFavorite } = useAppState();

  const themes = [
    { name: language === 'tr' ? 'Uyku' : 'Bedtime', image: IMAGES.SLEEPING_CLOUD, icon: 'bedtime' },
    { name: language === 'tr' ? 'Macera' : 'Adventure', image: IMAGES.FLYING_CARPET, icon: 'explore' },
    { name: language === 'tr' ? 'Doğa' : 'Nature', image: IMAGES.TURTLE_RABBIT, icon: 'forest' },
    { name: language === 'tr' ? 'Sihir' : 'Magic', image: IMAGES.WAND_UI, icon: 'auto_fix' }
  ];

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'tr') {
      if (hour < 12) return 'Günaydın';
      if (hour < 18) return 'İyi günler';
      return 'İyi akşamlar';
    }
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center p-6 pb-2 justify-between">
        <button
          onClick={onProfileClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="size-11 rounded-full border-2 border-primary/30 overflow-hidden shadow-lg bg-bg-card flex items-center justify-center text-2xl">
            {activeProfile?.avatar || '🧒'}
          </div>
          <div>
            <h2 className="text-white text-xl font-bold leading-tight">{getGreeting()},</h2>
            <p className="text-accent-peach text-sm font-semibold">{activeProfile?.name || 'Little Explorer'}</p>
          </div>
        </button>
        <div className="flex items-center gap-2">
          {/* Goals Button */}
          <button
            onClick={onGoalsClick}
            className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white">flag</span>
          </button>
          {/* Map Button */}
          <button
            onClick={onMapClick}
            className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white">map</span>
          </button>
          {/* Stats Button */}
          <button
            onClick={() => onNavigate('stats' as ScreenName)}
            className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative"
          >
            <span className="material-symbols-outlined text-white">bar_chart</span>
            {stats.currentStreak > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-bg-dark text-[10px] font-bold rounded-full size-5 flex items-center justify-center">
                🔥
              </span>
            )}
          </button>
          {/* Music Button */}
          <button
            onClick={onMusicClick}
            className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white">music_note</span>
          </button>
          {/* Settings Button */}
          <button
            onClick={() => onNavigate('settings')}
            className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white">settings</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Bar */}
      {stats.totalStoriesRead > 0 && (
        <div className="px-6 pb-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-3 flex items-center justify-around border border-white/5">
            <div className="text-center">
              <p className="text-xl font-bold text-primary">{stats.totalStoriesRead}</p>
              <p className="text-white/50 text-[10px]">{language === 'tr' ? 'Hikaye' : 'Stories'}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-xl font-bold text-secondary">{stats.currentStreak}🔥</p>
              <p className="text-white/50 text-[10px]">{language === 'tr' ? 'Seri' : 'Streak'}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-xl font-bold text-accent-peach">{stats.endingsDiscovered}</p>
              <p className="text-white/50 text-[10px]">{language === 'tr' ? 'Son' : 'Endings'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero CTA */}
      <div className="p-6 pt-2">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer" onClick={() => onNavigate('create_story')}>
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${IMAGES.MAGIC_QUILL}")` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f44] via-[#1e1f44]/40 to-transparent"></div>
          </div>
          <div className="relative z-10 p-6 pt-32 flex flex-col items-start gap-3">
            <div className="size-12 rounded-full bg-accent-peach flex items-center justify-center text-bg-dark shadow-lg shadow-accent-peach/20 mb-2">
              <span className="material-symbols-outlined text-3xl font-bold">auto_fix_high</span>
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold leading-tight">{t.home_create_magic}</h3>
              <p className="text-white/80 text-sm mt-1 font-medium text-shadow">{t.home_create_subtitle}</p>
            </div>
            <button className="mt-2 px-6 py-2.5 bg-white text-bg-dark font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg">
              {language === 'tr' ? 'Başla' : 'Start Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Section (if any) */}
      {favorites.length > 0 && (
        <>
          <div className="flex items-center justify-between px-6 pb-4">
            <h3 className="text-white text-lg font-bold flex items-center gap-2">
              <span className="text-red-400">❤️</span>
              {language === 'tr' ? 'Favorilerim' : 'My Favorites'}
            </h3>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-6 gap-4">
            {RECENT_STORIES.filter(s => favorites.includes(s.id)).slice(0, 5).map((story) => (
              <div key={story.id} className="snap-start min-w-[140px] flex flex-col gap-3 group cursor-pointer" onClick={() => onStorySelect(story)}>
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative shadow-lg border border-red-400/30">
                  <img src={story.coverUrl} alt={story.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <p className="text-white text-sm font-bold truncate">{story.title}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Recently Read */}
      <div className="flex items-center justify-between px-6 pb-4">
        <h3 className="text-white text-lg font-bold">
          {language === 'tr' ? 'Son Okunanlar' : 'Recently Read'}
        </h3>
        <button className="text-accent-peach text-sm font-semibold" onClick={() => onNavigate('library')}>
          {language === 'tr' ? 'Tümünü Gör' : 'View All'}
        </button>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-6 gap-4">
        {RECENT_STORIES.map((story) => (
          <div key={story.id} className="snap-start min-w-[160px] flex flex-col gap-3 group cursor-pointer relative">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative shadow-lg border border-white/5" onClick={() => onStorySelect(story)}>
              <img src={story.coverUrl} alt={story.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isFavorite(story.id) ? removeFavorite(story.id) : addFavorite(story.id);
                }}
                className="absolute top-2 right-2 size-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <span className={`material-symbols-outlined text-lg ${isFavorite(story.id) ? 'text-red-400' : 'text-white/60'}`}>
                  {isFavorite(story.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>
              {/* Interactive badge */}
              {story.isInteractive && (
                <div className="absolute top-2 left-2 bg-secondary/90 px-2 py-0.5 rounded-full">
                  <span className="text-[10px] font-bold text-white">🎮</span>
                </div>
              )}
            </div>
            <div onClick={() => onStorySelect(story)}>
              <p className="text-white text-base font-bold truncate">{story.title}</p>
              <p className="text-white/50 text-xs mt-0.5">{story.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Collections Banner */}
      <div className="px-6 pb-4">
        <button
          onClick={() => onNavigate('collections' as ScreenName)}
          className="w-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:from-purple-600/40 hover:to-blue-600/40 transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <div className="text-left">
              <p className="text-white font-bold">{language === 'tr' ? 'Hikaye Koleksiyonları' : 'Story Collections'}</p>
              <p className="text-white/50 text-xs">{language === 'tr' ? '8 özel paket keşfet' : 'Explore 8 curated packs'}</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-white/50">chevron_right</span>
        </button>
      </div>

      {/* Categories / Themes */}
      <div className="px-6 pb-20">
        <h3 className="text-white text-lg font-bold mb-4">{t.home_popular}</h3>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <div key={theme.name} className="relative h-24 rounded-2xl overflow-hidden cursor-pointer group border border-white/10 shadow-lg" onClick={() => onNavigate('library')}>
              <img src={theme.image} alt={theme.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-white drop-shadow-md">{theme.icon}</span>
                <span className="text-white font-bold text-lg drop-shadow-md">{theme.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;