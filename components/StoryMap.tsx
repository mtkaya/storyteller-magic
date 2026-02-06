import React from 'react';
import { Story } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import { LIBRARY_STORIES } from '../data';

interface StoryMapProps {
    onStorySelect: (story: Story) => void;
    onClose: () => void;
}

const StoryMap: React.FC<StoryMapProps> = ({ onStorySelect, onClose }) => {
    const { language } = useLanguage();
    const { stats, favorites, isFavorite } = useAppState();

    // Group stories by theme
    const storiesByTheme = LIBRARY_STORIES.reduce((acc, story) => {
        const theme = story.theme || 'other';
        if (!acc[theme]) acc[theme] = [];
        acc[theme].push(story);
        return acc;
    }, {} as Record<string, Story[]>);

    const themeConfig: Record<string, { icon: string; name: string; nameTr: string; color: string }> = {
        courage: { icon: '🦁', name: 'Courage', nameTr: 'Cesaret', color: 'from-orange-500 to-red-500' },
        friendship: { icon: '🤝', name: 'Friendship', nameTr: 'Dostluk', color: 'from-pink-500 to-rose-500' },
        magic: { icon: '✨', name: 'Magic', nameTr: 'Sihir', color: 'from-purple-500 to-indigo-500' },
        adventure: { icon: '🗺️', name: 'Adventure', nameTr: 'Macera', color: 'from-blue-500 to-cyan-500' },
        kindness: { icon: '💖', name: 'Kindness', nameTr: 'İyilik', color: 'from-green-500 to-teal-500' },
        nature: { icon: '🌿', name: 'Nature', nameTr: 'Doğa', color: 'from-green-600 to-lime-500' },
        bedtime: { icon: '🌙', name: 'Bedtime', nameTr: 'Uyku', color: 'from-indigo-500 to-purple-600' },
        other: { icon: '📚', name: 'Other', nameTr: 'Diğer', color: 'from-gray-500 to-slate-500' },
    };

    // Calculate completion for each theme
    const getThemeProgress = (theme: string): number => {
        const themeStories = storiesByTheme[theme] || [];
        if (themeStories.length === 0) return 0;
        // Simplified: assume all stories are read based on total count (in real app, track per-story)
        return Math.min(100, (stats.totalStoriesRead / themeStories.length) * 20);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-bg-dark overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 p-4">
                <div className="flex items-center justify-between">
                    <button onClick={onClose} className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🗺️</span>
                        {language === 'tr' ? 'Hikaye Haritası' : 'Story Map'}
                    </h1>
                    <div className="size-10" />
                </div>
            </div>

            {/* Map Content */}
            <div className="p-4 pb-24">
                {/* Progress Overview */}
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-4 mb-6 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-bold">
                            {language === 'tr' ? 'Keşif İlerlemesi' : 'Exploration Progress'}
                        </span>
                        <span className="text-primary font-bold">
                            {Math.round((stats.totalStoriesRead / LIBRARY_STORIES.length) * 100)}%
                        </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${Math.min(100, (stats.totalStoriesRead / LIBRARY_STORIES.length) * 100)}%` }}
                        />
                    </div>
                    <p className="text-white/50 text-xs mt-2">
                        {stats.totalStoriesRead}/{LIBRARY_STORIES.length} {language === 'tr' ? 'hikaye keşfedildi' : 'stories discovered'}
                    </p>
                </div>

                {/* Theme Islands */}
                <div className="relative">
                    {/* Connecting paths (decorative) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ minHeight: '800px' }}>
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(238, 140, 43, 0.3)" />
                                <stop offset="100%" stopColor="rgba(110, 86, 207, 0.3)" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 100 50 Q 200 150 100 250 Q 0 350 100 450 Q 200 550 100 650"
                            fill="none"
                            stroke="url(#pathGradient)"
                            strokeWidth="4"
                            strokeDasharray="10 5"
                        />
                    </svg>

                    {/* Theme Cards */}
                    <div className="space-y-6">
                        {Object.entries(storiesByTheme).map(([theme, stories], index) => {
                            const config = themeConfig[theme] || themeConfig.other;
                            const progress = getThemeProgress(theme);
                            const isLeft = index % 2 === 0;

                            return (
                                <div
                                    key={theme}
                                    className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`w-[85%] bg-gradient-to-br ${config.color} rounded-2xl p-1 shadow-xl`}>
                                        <div className="bg-bg-dark rounded-xl p-4">
                                            {/* Theme Header */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                                                    {config.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-white font-bold">
                                                        {language === 'tr' ? config.nameTr : config.name}
                                                    </h3>
                                                    <p className="text-white/50 text-xs">
                                                        {stories.length} {language === 'tr' ? 'hikaye' : 'stories'}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-lg font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                                                        {Math.round(progress)}%
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Stories in theme */}
                                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                                                {stories.slice(0, 4).map((story) => (
                                                    <button
                                                        key={story.id}
                                                        onClick={() => onStorySelect(story)}
                                                        className="flex-shrink-0 w-16"
                                                    >
                                                        <div className={`w-16 h-20 rounded-lg overflow-hidden border-2 ${isFavorite(story.id) ? 'border-red-400' : 'border-white/20'
                                                            }`}>
                                                            <img
                                                                src={story.coverUrl}
                                                                alt={story.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <p className="text-white text-[10px] mt-1 truncate text-center">
                                                            {story.title.split(' ').slice(0, 2).join(' ')}
                                                        </p>
                                                    </button>
                                                ))}
                                                {stories.length > 4 && (
                                                    <div className="flex-shrink-0 w-16 h-20 rounded-lg bg-white/10 flex items-center justify-center">
                                                        <span className="text-white/50 text-sm">+{stories.length - 4}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-8 bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="text-white/60 text-sm font-bold mb-3">
                        {language === 'tr' ? 'Harita Rehberi' : 'Map Legend'}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="size-4 rounded bg-gradient-to-r from-primary to-secondary" />
                            <span className="text-white/60">{language === 'tr' ? 'Tamamlandı' : 'Completed'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-4 rounded bg-white/20" />
                            <span className="text-white/60">{language === 'tr' ? 'Keşfedilmedi' : 'Undiscovered'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-4 rounded border-2 border-red-400" />
                            <span className="text-white/60">{language === 'tr' ? 'Favori' : 'Favorite'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs">🎮</span>
                            <span className="text-white/60">{language === 'tr' ? 'İnteraktif' : 'Interactive'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryMap;
