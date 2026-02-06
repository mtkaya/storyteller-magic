import React from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';

interface ParentReportProps {
    onBack: () => void;
}

const ParentReport: React.FC<ParentReportProps> = ({ onBack }) => {
    const { stats, activeProfile, profiles, unlockedBadges } = useAppState();
    const { language } = useLanguage();

    // Calculate weekly stats (simplified - in real app would track daily)
    const weeklyStats = {
        storiesRead: stats.totalStoriesRead,
        minutesListened: stats.totalMinutesListened,
        avgPerDay: Math.round(stats.totalStoriesRead / 7),
        favoriteTheme: Object.entries(stats.themeCounts)
            .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None',
        interactiveRatio: stats.totalStoriesRead > 0
            ? Math.round((stats.interactiveChoicesMade / stats.totalStoriesRead) * 100)
            : 0,
    };

    // Get current week dates
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-bg-dark text-white">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pt-4 pb-2">
                <div className="flex items-center gap-3 px-4 mb-2">
                    <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold">
                            {language === 'tr' ? 'Ebeveyn Raporu' : 'Parent Report'}
                        </h1>
                        <p className="text-white/50 text-xs">
                            {formatDate(weekStart)} - {formatDate(weekEnd)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Child Summary */}
                {activeProfile && (
                    <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl">{activeProfile.avatar}</div>
                            <div>
                                <h2 className="text-xl font-bold">{activeProfile.name}</h2>
                                <p className="text-white/60 text-sm">
                                    {activeProfile.age} {language === 'tr' ? 'yaşında' : 'years old'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Weekly Summary Card */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <span className="text-xl">📊</span>
                        {language === 'tr' ? 'Haftalık Özet' : 'Weekly Summary'}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-3xl font-bold text-primary">{weeklyStats.storiesRead}</p>
                            <p className="text-white/50 text-xs">{language === 'tr' ? 'Hikaye Okundu' : 'Stories Read'}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-3xl font-bold text-secondary">{weeklyStats.minutesListened}</p>
                            <p className="text-white/50 text-xs">{language === 'tr' ? 'Dakika' : 'Minutes'}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-3xl font-bold text-accent-peach">{stats.currentStreak}</p>
                            <p className="text-white/50 text-xs">{language === 'tr' ? 'Günlük Seri' : 'Day Streak'}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 text-center">
                            <p className="text-3xl font-bold text-green-400">{unlockedBadges.length}</p>
                            <p className="text-white/50 text-xs">{language === 'tr' ? 'Rozet' : 'Badges'}</p>
                        </div>
                    </div>
                </div>

                {/* Reading Pattern */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <span className="text-xl">📈</span>
                        {language === 'tr' ? 'Okuma Deseni' : 'Reading Pattern'}
                    </h3>

                    {/* Weekly Chart (simplified bar chart) */}
                    <div className="flex items-end justify-between h-24 gap-1 mb-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                            // Simulate data (in real app, would be actual daily stats)
                            const height = Math.random() * 80 + 20;
                            const isToday = index === new Date().getDay() - 1;

                            return (
                                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                                    <div
                                        className={`w-full rounded-t transition-all ${isToday
                                                ? 'bg-gradient-to-t from-primary to-secondary'
                                                : 'bg-white/20'
                                            }`}
                                        style={{ height: `${height}%` }}
                                    />
                                    <span className={`text-[10px] ${isToday ? 'text-primary' : 'text-white/40'}`}>
                                        {language === 'tr'
                                            ? ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa'][index]
                                            : day.slice(0, 2)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <p className="text-white/50 text-sm text-center">
                        {language === 'tr'
                            ? `Günlük ortalama: ${weeklyStats.avgPerDay} hikaye`
                            : `Daily average: ${weeklyStats.avgPerDay} stories`}
                    </p>
                </div>

                {/* Theme Preferences */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <span className="text-xl">❤️</span>
                        {language === 'tr' ? 'Tema Tercihleri' : 'Theme Preferences'}
                    </h3>

                    <div className="space-y-3">
                        {Object.entries(stats.themeCounts)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 5)
                            .map(([theme, count], index) => {
                                const maxCount = Object.values(stats.themeCounts)[0] || 1;
                                const percentage = (count / maxCount) * 100;

                                return (
                                    <div key={theme}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white capitalize">{theme}</span>
                                            <span className="text-white/50">{count}</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* Learning Insights */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <span className="text-xl">💡</span>
                        {language === 'tr' ? 'Öğrenme İçgörüleri' : 'Learning Insights'}
                    </h3>

                    <div className="space-y-4">
                        {/* Interactive Engagement */}
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                🎮
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">
                                    {language === 'tr' ? 'İnteraktif Katılım' : 'Interactive Engagement'}
                                </p>
                                <p className="text-white/50 text-xs">
                                    {language === 'tr'
                                        ? `${stats.interactiveChoicesMade} seçim yapıldı`
                                        : `${stats.interactiveChoicesMade} choices made`}
                                </p>
                            </div>
                            <span className="text-purple-400 font-bold">{weeklyStats.interactiveRatio}%</span>
                        </div>

                        {/* Endings Discovered */}
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                🎭
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">
                                    {language === 'tr' ? 'Keşfedilen Sonlar' : 'Endings Discovered'}
                                </p>
                                <p className="text-white/50 text-xs">
                                    {language === 'tr'
                                        ? 'Farklı hikaye sonları bulundu'
                                        : 'Different story endings found'}
                                </p>
                            </div>
                            <span className="text-green-400 font-bold">{stats.endingsDiscovered}</span>
                        </div>

                        {/* Consistency */}
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                🔥
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">
                                    {language === 'tr' ? 'Tutarlılık' : 'Consistency'}
                                </p>
                                <p className="text-white/50 text-xs">
                                    {language === 'tr'
                                        ? `En uzun seri: ${stats.longestStreak} gün`
                                        : `Best streak: ${stats.longestStreak} days`}
                                </p>
                            </div>
                            <span className="text-orange-400 font-bold">{stats.currentStreak}🔥</span>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-white/10">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        {language === 'tr' ? 'Öneriler' : 'Recommendations'}
                    </h3>

                    <ul className="space-y-2 text-sm text-white/70">
                        <li className="flex items-start gap-2">
                            <span>•</span>
                            {language === 'tr'
                                ? 'Günlük okuma alışkanlığını koruyun'
                                : 'Maintain daily reading habit'}
                        </li>
                        <li className="flex items-start gap-2">
                            <span>•</span>
                            {language === 'tr'
                                ? 'Yeni temalar keşfetmeyi teşvik edin'
                                : 'Encourage exploring new themes'}
                        </li>
                        <li className="flex items-start gap-2">
                            <span>•</span>
                            {language === 'tr'
                                ? 'İnteraktif hikayeler yaratıcılığı artırır'
                                : 'Interactive stories boost creativity'}
                        </li>
                    </ul>
                </div>

                {/* Export Button */}
                <button className="w-full py-4 rounded-xl bg-white/10 text-white/60 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">download</span>
                    {language === 'tr' ? 'Raporu İndir (PDF)' : 'Download Report (PDF)'}
                </button>
            </div>
        </div>
    );
};

export default ParentReport;
