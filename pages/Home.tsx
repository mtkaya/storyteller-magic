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
          <div className="size-11 rounded-full border-2 border-primary/30 overflow-hidden shadow-lg bg-bg-card flex items-center justify-center text-white/80">
            {activeProfile?.avatar ? (
              <span className="text-2xl">{activeProfile.avatar}</span>
            ) : (
              <span className="material-symbols-outlined text-[22px]">face</span>
            )}
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
        <div className="relative w-full rounded-[28px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-white/10 group cursor-pointer hover:shadow-[0_40px_100px_rgba(238,140,43,0.3)] transition-shadow duration-500" onClick={() => onNavigate('create_story')}>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#151632] via-[#151632]/60 to-transparent"></div>
            <div className="absolute -left-20 top-6 h-28 w-56 rounded-[999px] bg-white/10 blur-3xl opacity-85"></div>
            <div className="absolute -left-6 top-14 h-20 w-36 rounded-[999px] bg-white/12 blur-2xl opacity-75"></div>
            <div className="absolute left-20 top-10 h-14 w-24 rounded-[999px] bg-white/8 blur-xl opacity-60"></div>
            <div className="absolute -right-16 top-8 h-28 w-52 rounded-[999px] bg-white/10 blur-3xl opacity-80"></div>
            <div className="absolute right-8 top-18 h-16 w-28 rounded-[999px] bg-white/10 blur-2xl opacity-70"></div>
            <div className="absolute right-24 top-8 h-12 w-20 rounded-[999px] bg-white/8 blur-xl opacity-55"></div>
            <div className="absolute inset-x-6 bottom-14 h-24 rounded-[999px] bg-[#a9b8ff]/12 blur-3xl opacity-65"></div>
            <div className="absolute -left-10 bottom-10 h-16 w-40 rounded-[999px] bg-[#d7deff]/8 blur-2xl opacity-45"></div>
            <div className="absolute -right-10 bottom-12 h-16 w-40 rounded-[999px] bg-[#d7deff]/8 blur-2xl opacity-45"></div>
          </div>
          <div className="relative z-10 p-6 pt-32 flex flex-col items-start gap-3">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              ✨ {language === 'tr' ? 'Local Story Engine' : 'Local Story Engine'}
            </div>
            <div className="max-w-[280px]">
              <h3 className="text-white text-[32px] font-bold leading-[1.05] mb-3">{t.home_create_magic}</h3>
              <p className="text-white/85 text-base mt-2 leading-relaxed">{t.home_create_subtitle}</p>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-white/70">
              <span className="rounded-full border border-white/15 bg-white/15 px-3 py-1.5 backdrop-blur-sm">{language === 'tr' ? 'Yerel Kütüphane' : 'Curated Library'}</span>
              <span className="rounded-full border border-white/15 bg-white/15 px-3 py-1.5 backdrop-blur-sm">{language === 'tr' ? 'Etkilesimli' : 'Interactive'}</span>
            </div>
            <button className="mt-4 px-7 py-3 bg-white text-bg-dark font-bold rounded-full text-base hover:scale-105 active:scale-95 transition-transform shadow-2xl hover:shadow-white/30">
              {language === 'tr' ? 'Başla' : 'Start Now'} →
            </button>
          </div>
        </div>

        {/* Story Craftsman Card */}
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 cursor-pointer hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br from-secondary/20 to-primary/20 mt-4"
          onClick={() => onNavigate('story_craftsman')}
        >
          <div className="p-5 flex items-center gap-4">
            <div className="size-14 rounded-xl bg-primary/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-3xl">auto_stories</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-lg font-bold mb-1">
                {language === 'tr' ? 'Hikaye Kurgula' : 'Craft Story'}
              </h3>
              <p className="text-white/60 text-sm leading-snug">
                {language === 'tr'
                  ? 'Kahramanını, yerini ve macerasını sen seç!'
                  : 'Choose your hero, place, and adventure!'}
              </p>
            </div>
            <span className="material-symbols-outlined text-white/40 text-2xl">arrow_forward</span>
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
          <div key={story.id} className="snap-start min-w-[168px] flex flex-col gap-3 group cursor-pointer relative">
            <div className="w-full aspect-[3/4] rounded-[22px] overflow-hidden relative shadow-[0_18px_40px_rgba(0,0,0,0.28)] border border-white/8" onClick={() => onStorySelect(story)}>
              <img src={getStoryCoverUrl(story)} alt={getStoryTitle(story)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
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
              {story.isInteractive && (
                <div className="absolute top-2 left-2 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-white">{language === 'tr' ? 'Seçimli' : 'Interactive'}</span>
                </div>
              )}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[10px] text-white/85">
                <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1 backdrop-blur-sm">{story.duration}</span>
                <span className="rounded-full border border-white/10 bg-black/35 px-2.5 py-1 backdrop-blur-sm truncate max-w-[84px]">{story.theme}</span>
              </div>
            </div>
            <div onClick={() => onStorySelect(story)} className="px-0.5">
              <p className="text-white text-[15px] font-bold truncate">{getStoryTitle(story)}</p>
              <p className="text-white/50 text-xs mt-1 line-clamp-2 min-h-[32px] leading-relaxed">{getStorySubtitle(story)}</p>
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
                  <p className="text-white/50 text-xs mt-0.5 line-clamp-2 min-h-[30px]">{getStorySubtitle(story)}</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-white/42">
                    <span className="rounded-full border border-white/8 bg-white/5 px-2 py-1">{story.duration}</span>
                    <span className="rounded-full border border-white/8 bg-white/5 px-2 py-1">{language === 'tr' ? 'Uyku' : 'Bedtime'}</span>
                  </div>
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
                  <p className="text-white/50 text-xs mt-0.5 line-clamp-2 min-h-[30px]">{getStorySubtitle(story)}</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-white/42">
                    <span className="rounded-full border border-white/8 bg-white/5 px-2 py-1">{story.duration}</span>
                    <span className="rounded-full border border-white/8 bg-white/5 px-2 py-1">{language === 'tr' ? 'Seçimli' : 'Interactive'}</span>
                  </div>
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
