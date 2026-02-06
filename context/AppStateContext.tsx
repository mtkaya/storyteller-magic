import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface ReadingStats {
    totalStoriesRead: number;
    totalMinutesListened: number;
    storiesCompletedToday: number;
    currentStreak: number;
    longestStreak: number;
    lastReadDate: string | null;
    favoriteTheme: string | null;
    themeCounts: Record<string, number>;
    interactiveChoicesMade: number;
    endingsDiscovered: number;
}

export interface Badge {
    id: string;
    name: string;
    nametr: string;
    description: string;
    descriptionTr: string;
    icon: string;
    unlockedAt: string | null;
    requirement: number;
    type: 'stories' | 'minutes' | 'streak' | 'interactive' | 'special';
}

export interface ChildProfile {
    id: string;
    name: string;
    avatar: string;
    age: number;
    createdAt: string;
    stats: ReadingStats;
    favorites: string[];
    preferences: {
        themes: string[];
        excludedThemes: string[];
        readingSpeed: number;
        backgroundMusic: string | null;
    };
}

// Default stats
const defaultStats: ReadingStats = {
    totalStoriesRead: 0,
    totalMinutesListened: 0,
    storiesCompletedToday: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastReadDate: null,
    favoriteTheme: null,
    themeCounts: {},
    interactiveChoicesMade: 0,
    endingsDiscovered: 0,
};

// Available badges
const BADGES: Badge[] = [
    // Story count badges
    { id: 'first_story', name: 'First Tale', nametr: 'İlk Masal', description: 'Read your first story', descriptionTr: 'İlk hikayeni oku', icon: '📖', unlockedAt: null, requirement: 1, type: 'stories' },
    { id: 'story_5', name: 'Story Explorer', nametr: 'Hikaye Kaşifi', description: 'Read 5 stories', descriptionTr: '5 hikaye oku', icon: '🔍', unlockedAt: null, requirement: 5, type: 'stories' },
    { id: 'story_10', name: 'Bookworm', nametr: 'Kitap Kurdu', description: 'Read 10 stories', descriptionTr: '10 hikaye oku', icon: '🐛', unlockedAt: null, requirement: 10, type: 'stories' },
    { id: 'story_25', name: 'Story Master', nametr: 'Masal Ustası', description: 'Read 25 stories', descriptionTr: '25 hikaye oku', icon: '🎓', unlockedAt: null, requirement: 25, type: 'stories' },
    { id: 'story_50', name: 'Legend Reader', nametr: 'Efsane Okuyucu', description: 'Read 50 stories', descriptionTr: '50 hikaye oku', icon: '👑', unlockedAt: null, requirement: 50, type: 'stories' },
    { id: 'story_100', name: 'Story Champion', nametr: 'Hikaye Şampiyonu', description: 'Read 100 stories', descriptionTr: '100 hikaye oku', icon: '🏆', unlockedAt: null, requirement: 100, type: 'stories' },

    // Listening time badges
    { id: 'minutes_30', name: 'Good Listener', nametr: 'İyi Dinleyici', description: 'Listen for 30 minutes', descriptionTr: '30 dakika dinle', icon: '👂', unlockedAt: null, requirement: 30, type: 'minutes' },
    { id: 'minutes_60', name: 'Dreamer', nametr: 'Hayalperest', description: 'Listen for 1 hour', descriptionTr: '1 saat dinle', icon: '💭', unlockedAt: null, requirement: 60, type: 'minutes' },
    { id: 'minutes_180', name: 'Night Owl', nametr: 'Gece Kuşu', description: 'Listen for 3 hours', descriptionTr: '3 saat dinle', icon: '🦉', unlockedAt: null, requirement: 180, type: 'minutes' },
    { id: 'minutes_600', name: 'Story Adventurer', nametr: 'Hikaye Maceracısı', description: 'Listen for 10 hours', descriptionTr: '10 saat dinle', icon: '🗺️', unlockedAt: null, requirement: 600, type: 'minutes' },

    // Streak badges
    { id: 'streak_3', name: 'Consistent', nametr: 'Düzenli', description: '3 day streak', descriptionTr: '3 gün üst üste', icon: '🔥', unlockedAt: null, requirement: 3, type: 'streak' },
    { id: 'streak_7', name: 'Week Warrior', nametr: 'Hafta Savaşçısı', description: '7 day streak', descriptionTr: '7 gün üst üste', icon: '⚡', unlockedAt: null, requirement: 7, type: 'streak' },
    { id: 'streak_30', name: 'Monthly Master', nametr: 'Aylık Usta', description: '30 day streak', descriptionTr: '30 gün üst üste', icon: '🌟', unlockedAt: null, requirement: 30, type: 'streak' },

    // Interactive badges
    { id: 'choices_10', name: 'Decision Maker', nametr: 'Karar Verici', description: 'Make 10 choices', descriptionTr: '10 seçim yap', icon: '🎯', unlockedAt: null, requirement: 10, type: 'interactive' },
    { id: 'choices_50', name: 'Path Finder', nametr: 'Yol Bulucu', description: 'Make 50 choices', descriptionTr: '50 seçim yap', icon: '🧭', unlockedAt: null, requirement: 50, type: 'interactive' },
    { id: 'endings_5', name: 'Ending Explorer', nametr: 'Son Kaşifi', description: 'Discover 5 endings', descriptionTr: '5 farklı son keşfet', icon: '🎭', unlockedAt: null, requirement: 5, type: 'interactive' },
    { id: 'endings_15', name: 'Story Completionist', nametr: 'Tamamlayıcı', description: 'Discover 15 endings', descriptionTr: '15 farklı son keşfet', icon: '🏅', unlockedAt: null, requirement: 15, type: 'interactive' },

    // Special badges
    { id: 'night_reader', name: 'Midnight Reader', nametr: 'Gece Yarısı Okuyucu', description: 'Read after midnight', descriptionTr: 'Gece yarısından sonra oku', icon: '🌙', unlockedAt: null, requirement: 1, type: 'special' },
    { id: 'early_bird', name: 'Early Bird', nametr: 'Erken Kuş', description: 'Read before 7am', descriptionTr: 'Sabah 7den önce oku', icon: '🐦', unlockedAt: null, requirement: 1, type: 'special' },
    { id: 'weekend_warrior', name: 'Weekend Warrior', nametr: 'Hafta Sonu Savaşçısı', description: 'Read on both weekend days', descriptionTr: 'Her iki hafta sonu günü oku', icon: '🎉', unlockedAt: null, requirement: 1, type: 'special' },
];

// Default profile
const createDefaultProfile = (name: string = 'Little Reader', age: number = 5): ChildProfile => ({
    id: `profile_${Date.now()}`,
    name,
    avatar: '🧒',
    age,
    createdAt: new Date().toISOString(),
    stats: { ...defaultStats },
    favorites: [],
    preferences: {
        themes: [],
        excludedThemes: [],
        readingSpeed: 0.9,
        backgroundMusic: null,
    },
});

// Context type
interface AppStateContextType {
    // Profiles
    profiles: ChildProfile[];
    activeProfile: ChildProfile | null;
    setActiveProfile: (profileId: string) => void;
    addProfile: (name: string, age: number, avatar: string) => void;
    updateProfile: (profileId: string, updates: Partial<ChildProfile>) => void;
    deleteProfile: (profileId: string) => void;

    // Favorites
    favorites: string[];
    addFavorite: (storyId: string) => void;
    removeFavorite: (storyId: string) => void;
    isFavorite: (storyId: string) => boolean;

    // Stats
    stats: ReadingStats;
    recordStoryRead: (storyId: string, theme: string, durationMinutes: number) => void;
    recordChoice: () => void;
    recordEnding: () => void;

    // Badges
    badges: Badge[];
    unlockedBadges: Badge[];
    newlyUnlockedBadge: Badge | null;
    clearNewBadge: () => void;

    // Settings
    settings: {
        dailyLimit: number; // minutes, 0 = unlimited
        dailyReminderTime: string | null; // "20:00" format
        backgroundMusic: string | null;
        soundEffects: boolean;
        nightModeAuto: boolean;
        nightModeStart: string;
        nightModeEnd: string;
    };
    updateSettings: (updates: Partial<AppStateContextType['settings']>) => void;

    // Daily limit tracking
    remainingTime: number; // minutes remaining today
    isLimitReached: boolean;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
    profiles: 'storyteller_profiles',
    activeProfileId: 'storyteller_active_profile',
    settings: 'storyteller_settings',
};

// Provider
export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Load from localStorage
    const [profiles, setProfiles] = useState<ChildProfile[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.profiles);
        if (saved) {
            return JSON.parse(saved);
        }
        // Create default profile
        return [createDefaultProfile()];
    });

    const [activeProfileId, setActiveProfileId] = useState<string>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.activeProfileId);
        return saved || profiles[0]?.id || '';
    });

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.settings);
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            dailyLimit: 0,
            dailyReminderTime: null,
            backgroundMusic: null,
            soundEffects: true,
            nightModeAuto: false,
            nightModeStart: '20:00',
            nightModeEnd: '07:00',
        };
    });

    const [badges, setBadges] = useState<Badge[]>(BADGES);
    const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

    // Derived state
    const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0] || null;
    const stats = activeProfile?.stats || defaultStats;
    const favorites = activeProfile?.favorites || [];

    // Calculate remaining time
    const today = new Date().toISOString().split('T')[0];
    const isToday = (date: string | null) => date?.split('T')[0] === today;
    const todayMinutes = isToday(stats.lastReadDate) ? stats.storiesCompletedToday * 5 : 0; // Approximate
    const remainingTime = settings.dailyLimit > 0 ? Math.max(0, settings.dailyLimit - todayMinutes) : Infinity;
    const isLimitReached = settings.dailyLimit > 0 && remainingTime <= 0;

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(profiles));
    }, [profiles]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.activeProfileId, activeProfileId);
    }, [activeProfileId]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
    }, [settings]);

    // Check and unlock badges
    const checkBadges = (updatedStats: ReadingStats) => {
        const newBadges = [...badges];
        let justUnlocked: Badge | null = null;

        newBadges.forEach(badge => {
            if (badge.unlockedAt) return; // Already unlocked

            let shouldUnlock = false;
            switch (badge.type) {
                case 'stories':
                    shouldUnlock = updatedStats.totalStoriesRead >= badge.requirement;
                    break;
                case 'minutes':
                    shouldUnlock = updatedStats.totalMinutesListened >= badge.requirement;
                    break;
                case 'streak':
                    shouldUnlock = updatedStats.currentStreak >= badge.requirement;
                    break;
                case 'interactive':
                    if (badge.id.startsWith('choices')) {
                        shouldUnlock = updatedStats.interactiveChoicesMade >= badge.requirement;
                    } else if (badge.id.startsWith('endings')) {
                        shouldUnlock = updatedStats.endingsDiscovered >= badge.requirement;
                    }
                    break;
                case 'special':
                    const hour = new Date().getHours();
                    if (badge.id === 'night_reader') {
                        shouldUnlock = hour >= 0 && hour < 5;
                    } else if (badge.id === 'early_bird') {
                        shouldUnlock = hour >= 5 && hour < 7;
                    }
                    break;
            }

            if (shouldUnlock) {
                badge.unlockedAt = new Date().toISOString();
                justUnlocked = badge;
            }
        });

        setBadges(newBadges);
        if (justUnlocked) {
            setNewlyUnlockedBadge(justUnlocked);
        }
    };

    // Profile management
    const setActiveProfile = (profileId: string) => {
        setActiveProfileId(profileId);
    };

    const addProfile = (name: string, age: number, avatar: string) => {
        const newProfile: ChildProfile = {
            ...createDefaultProfile(name, age),
            avatar,
        };
        setProfiles([...profiles, newProfile]);
    };

    const updateProfile = (profileId: string, updates: Partial<ChildProfile>) => {
        setProfiles(profiles.map(p =>
            p.id === profileId ? { ...p, ...updates } : p
        ));
    };

    const deleteProfile = (profileId: string) => {
        if (profiles.length <= 1) return; // Keep at least one profile
        setProfiles(profiles.filter(p => p.id !== profileId));
        if (activeProfileId === profileId) {
            setActiveProfileId(profiles[0].id);
        }
    };

    // Favorites
    const addFavorite = (storyId: string) => {
        if (!activeProfile) return;
        const newFavorites = [...favorites, storyId];
        updateProfile(activeProfile.id, { favorites: newFavorites });
    };

    const removeFavorite = (storyId: string) => {
        if (!activeProfile) return;
        const newFavorites = favorites.filter(id => id !== storyId);
        updateProfile(activeProfile.id, { favorites: newFavorites });
    };

    const isFavorite = (storyId: string) => favorites.includes(storyId);

    // Stats tracking
    const recordStoryRead = (storyId: string, theme: string, durationMinutes: number) => {
        if (!activeProfile) return;

        const today = new Date().toISOString().split('T')[0];
        const lastReadDate = stats.lastReadDate?.split('T')[0];
        const isConsecutiveDay = lastReadDate === new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const isSameDay = lastReadDate === today;

        const updatedStats: ReadingStats = {
            ...stats,
            totalStoriesRead: stats.totalStoriesRead + 1,
            totalMinutesListened: stats.totalMinutesListened + durationMinutes,
            storiesCompletedToday: isSameDay ? stats.storiesCompletedToday + 1 : 1,
            currentStreak: isConsecutiveDay ? stats.currentStreak + 1 : (isSameDay ? stats.currentStreak : 1),
            longestStreak: Math.max(stats.longestStreak, isConsecutiveDay ? stats.currentStreak + 1 : 1),
            lastReadDate: new Date().toISOString(),
            themeCounts: {
                ...stats.themeCounts,
                [theme]: (stats.themeCounts[theme] || 0) + 1,
            },
            favoriteTheme: Object.entries({
                ...stats.themeCounts,
                [theme]: (stats.themeCounts[theme] || 0) + 1,
            }).sort(([, a], [, b]) => b - a)[0]?.[0] || theme,
        };

        updateProfile(activeProfile.id, { stats: updatedStats });
        checkBadges(updatedStats);
    };

    const recordChoice = () => {
        if (!activeProfile) return;
        const updatedStats = {
            ...stats,
            interactiveChoicesMade: stats.interactiveChoicesMade + 1,
        };
        updateProfile(activeProfile.id, { stats: updatedStats });
        checkBadges(updatedStats);
    };

    const recordEnding = () => {
        if (!activeProfile) return;
        const updatedStats = {
            ...stats,
            endingsDiscovered: stats.endingsDiscovered + 1,
        };
        updateProfile(activeProfile.id, { stats: updatedStats });
        checkBadges(updatedStats);
    };

    const clearNewBadge = () => setNewlyUnlockedBadge(null);

    const updateSettings = (updates: Partial<typeof settings>) => {
        setSettings({ ...settings, ...updates });
    };

    const value: AppStateContextType = {
        profiles,
        activeProfile,
        setActiveProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        stats,
        recordStoryRead,
        recordChoice,
        recordEnding,
        badges,
        unlockedBadges: badges.filter(b => b.unlockedAt),
        newlyUnlockedBadge,
        clearNewBadge,
        settings,
        updateSettings,
        remainingTime,
        isLimitReached,
    };

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    );
};

// Hook
export const useAppState = (): AppStateContextType => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};
