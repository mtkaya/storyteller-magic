import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';

const Achievements: React.FC = () => {
    const { badges, unlockedBadges, stats, activeProfile } = useAppState();
    const { language } = useLanguage();

    // Group badges by type
    const badgesByType = {
        stories: badges.filter(b => b.type === 'stories'),
        minutes: badges.filter(b => b.type === 'minutes'),
        streak: badges.filter(b => b.type === 'streak'),
        interactive: badges.filter(b => b.type === 'interactive'),
        special: badges.filter(b => b.type === 'special'),
    };

    const typeLabels = {
        stories: { en: 'Story Badges', tr: 'Hikaye Rozetleri', icon: '📚' },
        minutes: { en: 'Time Badges', tr: 'Zaman Rozetleri', icon: '⏱️' },
        streak: { en: 'Streak Badges', tr: 'Seri Rozetleri', icon: '🔥' },
        interactive: { en: 'Adventure Badges', tr: 'Macera Rozetleri', icon: '🎮' },
        special: { en: 'Special Badges', tr: 'Özel Rozetler', icon: '⭐' },
    };

    return (
        <div className="flex flex-col min-h-screen bg-bg-dark bg-star-dust pb-24">
            <div className="sticky top-0 z-40 bg-bg-dark/80 backdrop-blur-md p-4 flex items-center justify-center border-b border-white/5">
                <h2 className="text-white text-xl font-bold">
                    {language === 'tr' ? 'Başarılar' : 'Achievements'}
                </h2>
            </div>

            {/* Profile & Stats Summary */}
            <div className="p-4">
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-4 flex items-center gap-4 border border-white/10">
                    <div className="text-5xl">{activeProfile?.avatar || '🧒'}</div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{activeProfile?.name || 'Explorer'}</h3>
                        <p className="text-white/60 text-sm">
                            {unlockedBadges.length}/{badges.length} {language === 'tr' ? 'rozet kazanıldı' : 'badges unlocked'}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-primary">{Math.round((unlockedBadges.length / badges.length) * 100)}%</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 px-4 pb-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stats.totalStoriesRead}</p>
                    <p className="text-white/50 text-xs">{language === 'tr' ? 'Hikaye' : 'Stories'}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-secondary">{stats.currentStreak}🔥</p>
                    <p className="text-white/50 text-xs">{language === 'tr' ? 'Seri' : 'Streak'}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <p className="text-2xl font-bold text-accent-peach">{Math.floor(stats.totalMinutesListened / 60)}h</p>
                    <p className="text-white/50 text-xs">{language === 'tr' ? 'Dinleme' : 'Listened'}</p>
                </div>
            </div>

            {/* Badge Sections */}
            {Object.entries(badgesByType).map(([type, typeBadges]) => (
                <div key={type} className="px-4 pb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{typeLabels[type as keyof typeof typeLabels].icon}</span>
                        <h3 className="text-white text-lg font-bold">
                            {language === 'tr'
                                ? typeLabels[type as keyof typeof typeLabels].tr
                                : typeLabels[type as keyof typeof typeLabels].en}
                        </h3>
                        <span className="ml-auto text-white/40 text-sm">
                            {typeBadges.filter(b => b.unlockedAt).length}/{typeBadges.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {typeBadges.map(badge => {
                            const isUnlocked = !!badge.unlockedAt;
                            return (
                                <div
                                    key={badge.id}
                                    className={`flex flex-col items-center gap-2 text-center p-3 rounded-2xl border transition-all ${isUnlocked
                                            ? 'bg-primary/10 border-primary/30 shadow-lg'
                                            : 'bg-white/5 border-white/5 opacity-50 grayscale'
                                        }`}
                                >
                                    <div className={`text-3xl ${isUnlocked ? '' : 'opacity-30'}`}>
                                        {badge.icon}
                                    </div>
                                    <p className="text-white text-[10px] font-bold line-clamp-2">
                                        {language === 'tr' ? badge.nametr : badge.name}
                                    </p>
                                    {!isUnlocked && (
                                        <span className="text-white/30 text-[10px]">🔒</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Encouragement */}
            <div className="px-4 py-6 text-center">
                <p className="text-white/40 text-sm">
                    {language === 'tr'
                        ? 'Hikaye okuyarak daha fazla rozet kazan! 📖✨'
                        : 'Read more stories to unlock magical rewards! 📖✨'}
                </p>
            </div>
        </div>
    );
};

export default Achievements;