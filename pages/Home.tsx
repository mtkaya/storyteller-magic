import React from 'react';
import { ScreenName, Story } from '../types';
import { RECENT_STORIES, IMAGES } from '../data';

interface HomeProps {
  onNavigate: (screen: ScreenName) => void;
  onStorySelect: (story: Story) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onStorySelect }) => {
  const themes = [
    { name: 'Bedtime', image: IMAGES.SLEEPING_CLOUD, icon: 'bedtime' },
    { name: 'Adventure', image: IMAGES.FLYING_CARPET, icon: 'explore' },
    { name: 'Nature', image: IMAGES.TURTLE_RABBIT, icon: 'forest' },
    { name: 'Magic', image: IMAGES.WAND_UI, icon: 'auto_fix' }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center p-6 pb-2 justify-between">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full border-2 border-white/10 overflow-hidden shadow-lg bg-bg-card">
            <img src={IMAGES.PROFILE} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold leading-tight">Good evening,</h2>
            <p className="text-accent-peach text-sm font-semibold">Little Explorer</p>
          </div>
        </div>
        <button className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-white">notifications</span>
        </button>
      </div>

      {/* Hero CTA */}
      <div className="p-6">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer" onClick={() => onNavigate('create_story')}>
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${IMAGES.HERO_BG}")` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f44] via-[#1e1f44]/20 to-transparent"></div>
          </div>
          <div className="relative z-10 p-6 pt-32 flex flex-col items-start gap-3">
            <div className="size-12 rounded-full bg-accent-peach flex items-center justify-center text-bg-dark shadow-lg shadow-accent-peach/20 mb-2">
              <span className="material-symbols-outlined text-3xl font-bold">auto_fix_high</span>
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold leading-tight">Create Magic Story</h3>
              <p className="text-white/80 text-sm mt-1 font-medium text-shadow">Weave a tale with AI instantly</p>
            </div>
            <button className="mt-2 px-6 py-2.5 bg-white text-bg-dark font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg">
              Start Now
            </button>
          </div>
        </div>
      </div>

      {/* Recently Read */}
      <div className="flex items-center justify-between px-6 pb-4">
        <h3 className="text-white text-lg font-bold">Recently Read</h3>
        <button className="text-accent-peach text-sm font-semibold" onClick={() => onNavigate('library')}>View All</button>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-6 gap-4">
        {RECENT_STORIES.map((story) => (
          <div key={story.id} className="snap-start min-w-[160px] flex flex-col gap-3 group cursor-pointer" onClick={() => onStorySelect(story)}>
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden relative shadow-lg border border-white/5">
              <img src={story.coverUrl} alt={story.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div>
              <p className="text-white text-base font-bold truncate">{story.title}</p>
              <p className="text-white/50 text-xs mt-0.5">{story.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories / Themes */}
      <div className="px-6 pb-20">
        <h3 className="text-white text-lg font-bold mb-4">Popular Themes</h3>
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