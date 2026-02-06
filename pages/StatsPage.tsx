import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';

const StatsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { stats, activeProfile, badges, unlockedBadges } = useAppState();
    const { language } = useLanguage();

    // Calculate stats
    const hoursListened = Math.floor(stats.totalMinutesListened / 60);
    const minutesListened = stats.totalMinutesListened % 60;
    const completionRate = stats.totalStoriesRead > 0
        ? Math.round((stats.endingsDiscovered / Math.max(1, stats.totalStoriesRead)) * 100)
        : 0;

    // Get top themes
    const topThemes = Object.entries(stats.themeCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3);

    const StatCard: React.FC<{ icon: string; value: string | number; label: string; color: string }> =
        ({ icon, value, label, color }) => (
            <div className={`bg-gradient-to-br ${color} rounded-2xl p-4 border border-white/10`}>
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-white/60 text-sm">{label}</div>
            </div>
        );

    return (
        <div className="flex flex-col min-h-screen bg-bg-dark text-white">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pt-4 pb-2">
                <div className="flex items-center gap-3 px-4 mb-2">
                    <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold">
                        {language === 'tr' ? 'Okuma İstatistikleri' : 'Reading Stats'}
                    </h1>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Profile Summary */}
                {activeProfile && (
                    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-4 flex items-center gap-4 border border-white/10">
                        <div className="text-5xl">{activeProfile.avatar}</div>
                        <div>
                            <h2 className="text-xl font-bold">{activeProfile.name}</h2>
                            <p className="text-white/60">
                                {language === 'tr' ? `${stats.currentStreak} günlük seri 🔥` : `${stats.currentStreak} day streak 🔥`}
                            </p>
                        </div>
                    </div>
                )}

                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <StatCard
                        icon="📚"
                        value={stats.totalStoriesRead}
                        label={language === 'tr' ? 'Hikaye Okundu' : 'Stories Read'}
                        color="from-blue-500/20 to-purple-500/20"
                    />
                    <StatCard
                        icon="⏱️"
                        value={`${hoursListened}h ${minutesListened}m`}
                        label={language === 'tr' ? 'Dinleme Süresi' : 'Listening Time'}
                        color="from-green-500/20 to-teal-500/20"
                    />
                    <StatCard
                        icon="🎮"
                        value={stats.interactiveChoicesMade}
                        label={language === 'tr' ? 'Seçim Yapıldı' : 'Choices Made'}
                        color="from-orange-500/20 to-red-500/20"
                    />
                    <StatCard
                        icon="🎭"
                        value={stats.endingsDiscovered}
                        label={language === 'tr' ? 'Son Keşfedildi' : 'Endings Found'}
                        color="from-pink-500/20 to-purple-500/20"
                    />
                </div>

                {/* Streak Info */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <span className="text-2xl">🔥</span>
                        {language === 'tr' ? 'Okuma Serisi' : 'Reading Streak'}
                    </h3>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-3xl font-bold text-primary">{stats.currentStreak}</p>
                            <p className="text-white/60 text-sm">{language === 'tr' ? 'Güncel' : 'Current'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-secondary">{stats.longestStreak}</p>
                            <p className="text-white/60 text-sm">{language === 'tr' ? 'En Uzun' : 'Best'}</p>
                        </div>
                    </div>
                    <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${Math.min(100, (stats.currentStreak / 30) * 100)}%` }}
                        />
                    </div>
                    <p className="text-white/40 text-xs mt-2 text-center">
                        {language === 'tr' ? '30 gün hedefi' : '30 day goal'}
                    </p>
                </div>

                {/* Favorite Themes */}
                {topThemes.length > 0 && (
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <span className="text-2xl">❤️</span>
                            {language === 'tr' ? 'Favori Temalar' : 'Favorite Themes'}
                        </h3>
                        <div className="space-y-3">
                            {topThemes.map(([theme, count], index) => (
                                <div key={theme} className="flex items-center gap-3">
                                    <span className="text-xl">{['🥇', '🥈', '🥉'][index]}</span>
                                    <span className="flex-1 capitalize">{theme}</span>
                                    <span className="text-white/60">{count} {language === 'tr' ? 'hikaye' : 'stories'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Badges Section */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold flex items-center gap-2">
                            <span className="text-2xl">🏆</span>
                            {language === 'tr' ? 'Rozetler' : 'Badges'}
                        </h3>
                        <span className="text-white/60 text-sm">
                            {unlockedBadges.length}/{badges.length}
                        </span>
                    </div>

                    {/* Badge Grid */}
                    <div className="grid grid-cols-5 gap-2">
                        {badges.slice(0, 15).map(badge => (
                            <div
                                key={badge.id}
                                className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${badge.unlockedAt
                                        ? 'bg-primary/20 border border-primary/30'
                                        : 'bg-white/5 border border-white/10 grayscale opacity-50'
                                    }`}
                                title={language === 'tr' ? badge.nametr : badge.name}
                            >
                                {badge.icon}
                            </div>
                        ))}
                    </div>

                    {badges.length > 15 && (
                        <p className="text-center text-white/40 text-sm mt-3">
                            +{badges.length - 15} {language === 'tr' ? 'daha fazla' : 'more'}
                        </p>
                    )}
                </div>

                {/* Last Read */}
                {stats.lastReadDate && (
                    <p className="text-center text-white/40 text-sm">
                        {language === 'tr' ? 'Son okuma: ' : 'Last read: '}
                        {new Date(stats.lastReadDate).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
                            day: 'numeric',
                            month: 'long',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatsPage;
