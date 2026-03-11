import React from 'react';
import { ScreenName, Story } from '../types';
import { RECENT_STORIES, LIBRARY_STORIES, IMAGES } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import { getIllustratedImageUrl, getStoryCoverUrl } from '../services/illustrationCovers';
import { buildStoryPool, filterStoriesForLanguage, getCuratedHomeShelves } from '../services/storyCuration';
import { getLocalizedStorySubtitle, getLocalizedStoryTitle } from '../services/storyLocalization';

interface HomeProps {
  onNavigate: (screen: ScreenName) => void;
  onStorySelect: (story: Story) => void;
  onProfileClick?: () => void;
  onMusicClick?: () => void;
  onGoalsClick?: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onStorySelect, onProfileClick, onMusicClick, onGoalsClick }) => {
  const { language, t } = useLanguage();
  const { activeProfile, stats, favorites, isFavorite, addFavorite, removeFavorite, customStories, seenStoryIds } = useAppState();
  const currentHour = new Date().getHours();
  const localizedCustomStories = React.useMemo(
    () => filterStoriesForLanguage(customStories, language),
    [customStories, language]
  );

  const storyPool = React.useMemo(
    () => buildStoryPool(RECENT_STORIES, LIBRARY_STORIES, localizedCustomStories),
    [localizedCustomStories]
  );

  const curatedShelves = React.useMemo(
    () =>
      getCuratedHomeShelves(storyPool, {
        favorites,
        themeCounts: stats.themeCounts,
        hour: currentHour,
        seenStoryIds,
      }),
    [storyPool, favorites, stats.themeCounts, currentHour, seenStoryIds]
  );

  const getStoryTitle = (story: Story) => getLocalizedStoryTitle(story, language);
  const getStorySubtitle = (story: Story) => getLocalizedStorySubtitle(story, language);
  const displayProfileName = React.useMemo(() => {
    const fallback = language === 'tr' ? 'Minik Okur' : 'Little Reader';
    const currentName = activeProfile?.name?.trim();
    if (!currentName) return fallback;

    if (language === 'tr' && (currentName === 'Little Reader' || currentName === 'Little Explorer')) {
      return 'Minik Okur';
    }

    return currentName;
  }, [activeProfile?.name, language]);

  const themes = [
    { name: language === 'tr' ? 'Uyku' : 'Bedtime', image: IMAGES.SLEEPING_CLOUD, icon: 'bedtime', visualIcon: '🌙', theme: 'bedtime' },
    { name: language === 'tr' ? 'Macera' : 'Adventure', image: IMAGES.FLYING_CARPET, icon: 'explore', visualIcon: '🧭', theme: 'adventure' },
    { name: language === 'tr' ? 'Doğa' : 'Nature', image: IMAGES.TURTLE_RABBIT, icon: 'forest', visualIcon: '🌿', theme: 'nature' },
    { name: language === 'tr' ? 'Sihir' : 'Magic', image: IMAGES.WAND_UI, icon: 'auto_fix', visualIcon: '✨', theme: 'magic' }
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
      <div
        className="flex items-start gap-3 px-4 pb-2 justify-between"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
      >
        <button
          onClick={onProfileClick}
          className="flex min-w-0 flex-1 items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="size-11 rounded-full border-2 border-primary/30 overflow-hidden shadow-lg bg-bg-card flex items-center justify-center text-2xl">
            {activeProfile?.avatar || '🧒'}
          </div>
          <div className="min-w-0">
            <h2 className="text-white text-xl font-bold leading-tight truncate">{getGreeting()},</h2>
            <p className="text-accent-peach text-sm font-semibold truncate">{displayProfileName}</p>
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-2">
          {/* Goals Button */}
          <button
            onClick={onGoalsClick}
            className="size-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors touch-manipulation"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="material-symbols-outlined text-white">flag</span>
          </button>
          {/* Stats Button */}
          <button
            onClick={() => onNavigate('stats' as ScreenName)}
            className="size-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors relative touch-manipulation"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="material-symbols-outlined text-white">bar_chart</span>
            {stats.currentStreak > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-bg-dark text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                {stats.currentStreak}
              </span>
            )}
          </button>
          {/* Music Button */}
          <button
            onClick={onMusicClick}
            className="size-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors touch-manipulation"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="material-symbols-outlined text-white">music_note</span>
          </button>
          {/* Settings Button */}
          <button
            onClick={() => onNavigate('settings')}
            className="size-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-colors touch-manipulation"
            style={{ touchAction: 'manipulation' }}
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
              <p className="text-xl font-bold text-secondary">{stats.currentStreak}</p>
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
        <div className="relative w-full rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)] border border-white/10 group cursor-pointer" onClick={() => onNavigate('create_story')}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
            style={{
              backgroundImage: `url("${getIllustratedImageUrl({
                title: language === 'tr' ? 'Geceye Uygun Hikaye' : 'A Story for Tonight',
                subtitle: language === 'tr' ? 'Kisisel secimlerle' : 'With personal choices',
                theme: 'bedtime',
                src: IMAGES.MAGIC_QUILL,
                icon: '☾'
              })}")`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#151632] via-[#151632]/55 to-transparent"></div>
          </div>
          <div className="relative z-10 p-6 pt-28 flex flex-col items-start gap-3">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              {language === 'tr' ? 'Local Story Engine' : 'Local Story Engine'}
            </div>
            <div className="max-w-[260px]">
              <h3 className="text-white text-[28px] font-bold leading-[1.05]">{t.home_create_magic}</h3>
              <p className="text-white/78 text-sm mt-2 leading-relaxed">{t.home_create_subtitle}</p>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-white/60">
              <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1">{language === 'tr' ? 'Yerel Kütüphane' : 'Curated Library'}</span>
              <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1">{language === 'tr' ? 'Etkilesimli' : 'Interactive'}</span>
            </div>
            <button className="mt-3 px-6 py-2.5 bg-white text-bg-dark font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg">
              {language === 'tr' ? 'Başla' : 'Start Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Section (if any) */}
      {curatedShelves.favoriteStories.length > 0 && (
        <>
          <div className="flex items-center justify-between px-6 pb-4">
            <h3 className="text-white text-lg font-bold">
              {language === 'tr' ? 'Favorilerim' : 'My Favorites'}
            </h3>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-6 gap-4">
            {curatedShelves.favoriteStories.map((story) => (
              <div key={story.id} className="snap-start min-w-[140px] flex flex-col gap-3 group cursor-pointer" onClick={() => onStorySelect(story)}>
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative shadow-lg border border-red-400/30">
                  <img src={getStoryCoverUrl(story)} alt={getStoryTitle(story)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <p className="text-white text-sm font-bold truncate">{getStoryTitle(story)}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Curated Picks */}
      <div className="flex items-center justify-between px-6 pb-4">
        <h3 className="text-white text-lg font-bold">
          {language === 'tr' ? 'Sana Özel Seçkiler' : 'Picks For You'}
        </h3>
        <button className="text-accent-peach text-sm font-semibold" onClick={() => onNavigate('library')}>
          {language === 'tr' ? 'Tümünü Gör' : 'View All'}
        </button>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-6 gap-4">
        {curatedShelves.featured.map((story) => (
          <div key={story.id} className="snap-start min-w-[160px] flex flex-col gap-3 group cursor-pointer relative">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative shadow-lg border border-white/5" onClick={() => onStorySelect(story)}>
              <img src={getStoryCoverUrl(story)} alt={getStoryTitle(story)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                <div className="absolute top-2 left-2 rounded-full border border-white/10 bg-black/45 px-2 py-0.5 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-white">{language === 'tr' ? 'Seçimli' : 'Interactive'}</span>
                </div>
              )}
            </div>
            <div onClick={() => onStorySelect(story)}>
              <p className="text-white text-base font-bold truncate">{getStoryTitle(story)}</p>
              <p className="text-white/50 text-xs mt-0.5">{getStorySubtitle(story)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bedtime Picks */}
      {curatedShelves.bedtime.length > 0 && (
        <>
          <div className="flex items-center justify-between px-6 pb-4">
            <h3 className="text-white text-lg font-bold">
              {language === 'tr' ? 'Uyku Öncesi Kısa Masallar' : 'Short Bedtime Stories'}
            </h3>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-6 gap-4">
            {curatedShelves.bedtime.map((story) => (
              <div key={`bedtime-${story.id}`} className="snap-start min-w-[160px] flex flex-col gap-3 group cursor-pointer">
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative shadow-lg border border-white/5" onClick={() => onStorySelect(story)}>
                  <img src={getStoryCoverUrl(story)} alt={getStoryTitle(story)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                    <span className="text-[10px] font-bold text-white">{story.duration}</span>
                  </div>
                </div>
                <div onClick={() => onStorySelect(story)}>
                  <p className="text-white text-base font-bold truncate">{getStoryTitle(story)}</p>
                  <p className="text-white/50 text-xs mt-0.5">{getStorySubtitle(story)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Interactive Picks */}
      {curatedShelves.interactive.length > 0 && (
        <>
          <div className="flex items-center justify-between px-6 pb-4">
            <h3 className="text-white text-lg font-bold">
              {language === 'tr' ? 'İnteraktif Seçkiler' : 'Interactive Adventures'}
            </h3>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-6 gap-4">
            {curatedShelves.interactive.map((story) => (
              <div key={`interactive-${story.id}`} className="snap-start min-w-[160px] flex flex-col gap-3 group cursor-pointer">
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative shadow-lg border border-secondary/40" onClick={() => onStorySelect(story)}>
                  <img src={getStoryCoverUrl(story)} alt={getStoryTitle(story)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-2 left-2 rounded-full border border-white/10 bg-black/45 px-2 py-0.5 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-white">{language === 'tr' ? 'Seçimli Hikaye' : 'Interactive Story'}</span>
                  </div>
                </div>
                <div onClick={() => onStorySelect(story)}>
                  <p className="text-white text-base font-bold truncate">{getStoryTitle(story)}</p>
                  <p className="text-white/50 text-xs mt-0.5">{getStorySubtitle(story)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Collections Banner */}
      <div className="px-6 pb-4">
        <button
          onClick={() => onNavigate('collections' as ScreenName)}
          className="w-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:from-purple-600/40 hover:to-blue-600/40 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/80">
              <span className="material-symbols-outlined">collections_bookmark</span>
            </div>
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
              <img
                src={getIllustratedImageUrl({
                  title: theme.name,
                  subtitle: language === 'tr' ? 'Popüler Tema' : 'Popular Theme',
                  theme: theme.theme,
                  src: theme.image,
                  icon: theme.visualIcon
                })}
                alt={theme.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
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
