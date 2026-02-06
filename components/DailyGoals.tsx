import React from 'react';
import { DAILY_GOALS } from '../data/collections';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';

interface DailyGoalsProps {
    onClose?: () => void;
}

const DailyGoals: React.FC<DailyGoalsProps> = ({ onClose }) => {
    const { stats } = useAppState();
    const { language } = useLanguage();

    // Calculate progress for each goal
    const getGoalProgress = (goalId: string, type: string, target: number): number => {
        switch (type) {
            case 'stories':
                return Math.min(100, (stats.storiesCompletedToday / target) * 100);
            case 'minutes':
                // Approximate: 5 min per story
                const todayMinutes = stats.storiesCompletedToday * 5;
                return Math.min(100, (todayMinutes / target) * 100);
            case 'interactive':
                // Check if any interactive story was completed today
                return stats.storiesCompletedToday > 0 ? 100 : 0;
            default:
                return 0;
        }
    };

    const isGoalCompleted = (goalId: string, type: string, target: number): boolean => {
        return getGoalProgress(goalId, type, target) >= 100;
    };

    const totalRewards = DAILY_GOALS.reduce((sum, goal) => {
        return sum + (isGoalCompleted(goal.id, goal.type, goal.target) ? goal.reward : 0);
    }, 0);

    const completedCount = DAILY_GOALS.filter(goal =>
        isGoalCompleted(goal.id, goal.type, goal.target)
    ).length;

    return (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🎯</span>
                        <div>
                            <h3 className="text-white font-bold">
                                {language === 'tr' ? 'Günlük Hedefler' : 'Daily Goals'}
                            </h3>
                            <p className="text-white/60 text-sm">
                                {completedCount}/{DAILY_GOALS.length} {language === 'tr' ? 'tamamlandı' : 'completed'}
                            </p>
                        </div>
                    </div>
                    {totalRewards > 0 && (
                        <div className="bg-primary/20 px-3 py-1 rounded-full">
                            <span className="text-primary font-bold">+{totalRewards} ⭐</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Goals List */}
            <div className="p-2">
                {DAILY_GOALS.map(goal => {
                    const progress = getGoalProgress(goal.id, goal.type, goal.target);
                    const completed = progress >= 100;

                    return (
                        <div
                            key={goal.id}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${completed ? 'bg-green-500/10' : 'hover:bg-white/5'
                                }`}
                        >
                            {/* Icon */}
                            <div className={`size-12 rounded-xl flex items-center justify-center text-2xl ${completed ? 'bg-green-500/20' : 'bg-white/10'
                                }`}>
                                {completed ? '✅' : goal.icon}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className={`font-bold text-sm ${completed ? 'text-green-400' : 'text-white'}`}>
                                    {language === 'tr' ? goal.nameTr : goal.name}
                                </p>
                                <p className="text-white/50 text-xs">
                                    {language === 'tr' ? goal.descriptionTr : goal.description}
                                </p>

                                {/* Progress bar */}
                                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${completed ? 'bg-green-500' : 'bg-primary'
                                            }`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Reward */}
                            <div className={`text-sm font-bold ${completed ? 'text-green-400' : 'text-white/40'}`}>
                                +{goal.reward}⭐
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="p-4 border-t border-white/10 text-center">
                {completedCount === DAILY_GOALS.length ? (
                    <p className="text-green-400 font-bold">
                        🎉 {language === 'tr' ? 'Tüm hedefler tamamlandı!' : 'All goals completed!'}
                    </p>
                ) : (
                    <p className="text-white/40 text-sm">
                        {language === 'tr'
                            ? 'Hikaye okuyarak hedefleri tamamla!'
                            : 'Read stories to complete goals!'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DailyGoals;
