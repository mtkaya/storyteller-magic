import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Story } from '../types';

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
    seenStoryIds: string[];
    generationUsage: {
        date: string; // YYYY-MM-DD
        count: number;
    };
    preferences: {
        themes: string[];
        excludedThemes: string[];
        readingSpeed: number;
        backgroundMusic: string | null;
    };
}

export type SubscriptionTier = 'free' | 'pro' | 'family';

export interface SubscriptionState {
    tier: SubscriptionTier;
    updatedAt: string;
}

interface PlanRule {
    id: SubscriptionTier;
    name: string;
    nameTr: string;
    dailyGeneratedStories: number;
    maxProfiles: number;
}

const PLAN_RULES: Record<SubscriptionTier, PlanRule> = {
    free: {
        id: 'free',
        name: 'Free',
        nameTr: 'Serbest',
        dailyGeneratedStories: 3,
        maxProfiles: 1,
    },
    pro: {
        id: 'pro',
        name: 'Pro',
        nameTr: 'Pro',
        dailyGeneratedStories: 20,
        maxProfiles: 2,
    },
    family: {
        id: 'family',
        name: 'Family',
        nameTr: 'Aile',
        dailyGeneratedStories: 60,
        maxProfiles: 5,
    },
};

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
    seenStoryIds: [],
    generationUsage: {
        date: new Date().toISOString().split('T')[0],
        count: 0,
    },
    preferences: {
        themes: [],
        excludedThemes: [],
        readingSpeed: 0.9,
        backgroundMusic: null,
    },
});

const TURKISH_CHAR_PATTERN = /[ğüşöçıİĞÜŞÖÇ]/;
const TURKISH_WORD_PATTERN = /\b(ve|bir|ile|için|ama|gibi|çok|şimdi|gece|hikaye|masal|uyku|rüya|ruya)\b/i;

const looksLikeTurkishText = (value: string): boolean => {
    const text = value.trim();
    if (!text) return false;
    if (TURKISH_CHAR_PATTERN.test(text)) return true;
    return TURKISH_WORD_PATTERN.test(text);
};

const detectStorySourceLanguage = (story: Story): 'en' | 'tr' => {
    if (story.sourceLanguage === 'en' || story.sourceLanguage === 'tr') return story.sourceLanguage;

    const turkishLocalizedSegments = [
        story.titleTr,
        story.subtitleTr,
        story.moralTr,
        ...(story.contentTr || []),
        ...(story.branches?.flatMap((branch) => [
            ...(branch.paragraphsTr || []),
            branch.endingTitleTr,
            ...(branch.choices?.flatMap((choice) => [choice.textTr, choice.consequenceTr]) || []),
        ]) || []),
    ].filter((segment): segment is string => typeof segment === 'string' && segment.trim().length > 0);

    if (turkishLocalizedSegments.some(looksLikeTurkishText)) return 'tr';

    const primarySegments = [
        story.title,
        story.subtitle,
        story.moral,
        ...(story.content || []),
        ...(story.branches?.flatMap((branch) => [
            ...(branch.paragraphs || []),
            branch.endingTitle,
            ...(branch.choices?.flatMap((choice) => [choice.text, choice.consequence]) || []),
        ]) || []),
    ].filter((segment): segment is string => typeof segment === 'string' && segment.trim().length > 0);

    if (primarySegments.some(looksLikeTurkishText)) return 'tr';
    return 'en';
};

const normalizeStoredStory = (story: Story): Story => ({
    ...story,
    sourceLanguage: detectStorySourceLanguage(story),
});

const todayKey = (): string => new Date().toISOString().split('T')[0];

const normalizeProfile = (profile: ChildProfile | Record<string, unknown>): ChildProfile => {
    const fallback = createDefaultProfile();
    const candidate = profile as Partial<ChildProfile>;
    const safeId = typeof candidate.id === 'string' && candidate.id.trim().length > 0
        ? candidate.id
        : fallback.id;
    const safeName = typeof candidate.name === 'string' && candidate.name.trim().length > 0
        ? candidate.name
        : fallback.name;
    const safeAvatar = typeof candidate.avatar === 'string' && candidate.avatar.trim().length > 0
        ? candidate.avatar
        : fallback.avatar;
    const safeAge = typeof candidate.age === 'number' && Number.isFinite(candidate.age)
        ? Math.min(12, Math.max(2, Math.round(candidate.age)))
        : fallback.age;

    const incomingSeen = Array.isArray(candidate.seenStoryIds)
        ? candidate.seenStoryIds.filter((id): id is string => typeof id === 'string' && id.trim().length > 0)
        : [];

    const incomingUsage = candidate.generationUsage as ChildProfile['generationUsage'] | undefined;
    const normalizedUsage = incomingUsage && typeof incomingUsage.date === 'string' && typeof incomingUsage.count === 'number'
        ? { date: incomingUsage.date, count: Math.max(0, Math.round(incomingUsage.count)) }
        : { date: todayKey(), count: 0 };

    return {
        ...fallback,
        ...candidate,
        id: safeId,
        name: safeName,
        avatar: safeAvatar,
        age: safeAge,
        stats: {
            ...defaultStats,
            ...(candidate.stats || {}),
        },
        favorites: Array.isArray(candidate.favorites)
            ? candidate.favorites.filter((id): id is string => typeof id === 'string' && id.trim().length > 0)
            : [],
        seenStoryIds: incomingSeen.slice(-6000),
        generationUsage: normalizedUsage,
        preferences: {
            ...fallback.preferences,
            ...(candidate.preferences || {}),
        },
    };
};

// Context type
interface AppStateContextType {
    // Subscription
    subscription: SubscriptionState;
    planRule: PlanRule;
    setSubscriptionTier: (tier: SubscriptionTier) => void;

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
    seenStoryIds: string[];
    markStorySeen: (storyId: string) => void;
    hasSeenStory: (storyId: string) => boolean;

    // Custom stories
    customStories: Story[];
    saveCustomStory: (story: Story) => void;
    removeCustomStory: (storyId: string) => void;

    // Story generation quota
    remainingGeneratedStories: number; // Infinity = unlimited
    isGenerationLimitReached: boolean;
    recordStoryGenerated: (storyId?: string) => void;

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
        musicVolume: number; // 0..1
        effectsVolume: number; // 0..1
        narrationVolume: number; // 0..1
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
    customStories: 'storyteller_custom_stories',
    subscription: 'storyteller_subscription',
};

// Provider
export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const defaultSettings = {
        dailyLimit: 0,
        dailyReminderTime: null,
        backgroundMusic: null,
        soundEffects: true,
        musicVolume: 0.35,
        effectsVolume: 0.55,
        narrationVolume: 1,
        nightModeAuto: false,
        nightModeStart: '20:00',
        nightModeEnd: '07:00',
    };

    // Load from localStorage
    const [profiles, setProfiles] = useState<ChildProfile[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.profiles);
            if (!saved) return [createDefaultProfile()];

            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed) || parsed.length === 0) return [createDefaultProfile()];
            const normalized = parsed
                .filter((profile) => Boolean(profile && typeof profile === 'object'))
                .map((profile) => normalizeProfile(profile));
            return normalized.length > 0 ? normalized : [createDefaultProfile()];
        } catch {
            return [createDefaultProfile()];
        }
    });

    const [activeProfileId, setActiveProfileId] = useState<string>(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.activeProfileId);
        return saved || profiles[0]?.id || '';
    });

    const [subscription, setSubscription] = useState<SubscriptionState>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.subscription);
            if (!saved) {
                return { tier: 'free', updatedAt: new Date().toISOString() };
            }
            const parsed = JSON.parse(saved) as Partial<SubscriptionState>;
            const tier: SubscriptionTier = parsed.tier === 'pro' || parsed.tier === 'family' || parsed.tier === 'free'
                ? parsed.tier
                : 'free';
            return {
                tier,
                updatedAt: typeof parsed.updatedAt === 'string' && parsed.updatedAt.trim().length > 0
                    ? parsed.updatedAt
                    : new Date().toISOString(),
            };
        } catch {
            return { tier: 'free', updatedAt: new Date().toISOString() };
        }
    });

    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.settings);
        if (saved) {
            return {
                ...defaultSettings,
                ...JSON.parse(saved),
            };
        }
        return defaultSettings;
    });
    const [customStories, setCustomStories] = useState<Story[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.customStories);
            if (!saved) return [];

            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed)) return [];

            return parsed
                .filter((item): item is Story => Boolean(item && typeof item === 'object' && typeof (item as Story).id === 'string'))
                .map(normalizeStoredStory);
        } catch {
            return [];
        }
    });

    const [badges, setBadges] = useState<Badge[]>(BADGES);
    const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

    // Derived state
    const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0] || null;
    const stats = activeProfile?.stats || defaultStats;
    const favorites = activeProfile?.favorites || [];
    const seenStoryIds = activeProfile?.seenStoryIds || [];
    const planRule = PLAN_RULES[subscription.tier] || PLAN_RULES.free;
    const usageDate = activeProfile?.generationUsage?.date || '';
    const usageCount = usageDate === todayKey()
        ? Math.max(0, activeProfile?.generationUsage?.count || 0)
        : 0;
    const remainingGeneratedStories = planRule.dailyGeneratedStories > 0
        ? Math.max(0, planRule.dailyGeneratedStories - usageCount)
        : Infinity;
    const isGenerationLimitReached = planRule.dailyGeneratedStories > 0 && remainingGeneratedStories <= 0;

    useEffect(() => {
        if (!profiles.length) return;
        if (profiles.some((profile) => profile.id === activeProfileId)) return;
        setActiveProfileId(profiles[0].id);
    }, [profiles, activeProfileId]);

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

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.customStories, JSON.stringify(customStories));
    }, [customStories]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.subscription, JSON.stringify(subscription));
    }, [subscription]);

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

    const setSubscriptionTier = (tier: SubscriptionTier) => {
        setSubscription({
            tier,
            updatedAt: new Date().toISOString(),
        });
    };

    const addProfile = (name: string, age: number, avatar: string) => {
        setProfiles((previous) => {
            const maxProfiles = PLAN_RULES[subscription.tier]?.maxProfiles || PLAN_RULES.free.maxProfiles;
            if (previous.length >= maxProfiles) return previous;

            const newProfile: ChildProfile = {
                ...createDefaultProfile(name, age),
                avatar,
            };
            return [...previous, newProfile];
        });
    };

    const updateProfile = (profileId: string, updates: Partial<ChildProfile>) => {
        setProfiles((previous) =>
            previous.map((profile) =>
                profile.id === profileId ? { ...profile, ...updates } : profile
            )
        );
    };

    const deleteProfile = (profileId: string) => {
        const nextActiveId = activeProfileId === profileId
            ? profiles.find((profile) => profile.id !== profileId)?.id || null
            : null;

        setProfiles((previous) => {
            if (previous.length <= 1) return previous; // Keep at least one profile
            const remaining = previous.filter((profile) => profile.id !== profileId);
            return remaining.length > 0 ? remaining : previous;
        });

        if (nextActiveId) {
            setActiveProfileId(nextActiveId);
        }
    };

    // Favorites
    const addFavorite = (storyId: string) => {
        if (!activeProfile || !storyId) return;
        setProfiles((previous) =>
            previous.map((profile) => {
                if (profile.id !== activeProfile.id) return profile;
                if (profile.favorites.includes(storyId)) return profile;
                return { ...profile, favorites: [...profile.favorites, storyId] };
            })
        );
    };

    const removeFavorite = (storyId: string) => {
        if (!activeProfile || !storyId) return;
        setProfiles((previous) =>
            previous.map((profile) => {
                if (profile.id !== activeProfile.id) return profile;
                return { ...profile, favorites: profile.favorites.filter((id) => id !== storyId) };
            })
        );
    };

    const isFavorite = (storyId: string) => favorites.includes(storyId);

    const markStorySeen = (storyId: string) => {
        if (!activeProfile || !storyId) return;
        setProfiles((previous) =>
            previous.map((profile) => {
                if (profile.id !== activeProfile.id) return profile;
                if (profile.seenStoryIds.includes(storyId)) return profile;
                return { ...profile, seenStoryIds: [...profile.seenStoryIds, storyId].slice(-6000) };
            })
        );
    };

    const hasSeenStory = (storyId: string) => seenStoryIds.includes(storyId);

    const recordStoryGenerated = (storyId?: string) => {
        if (!activeProfile) return;

        setProfiles((previous) =>
            previous.map((profile) => {
                if (profile.id !== activeProfile.id) return profile;

                const limit = planRule.dailyGeneratedStories;
                const today = todayKey();
                const prevUsage = profile.generationUsage;
                const todaysCount = prevUsage.date === today ? prevUsage.count : 0;
                if (limit > 0 && todaysCount >= limit) return profile;

                const nextUsage = prevUsage.date === today
                    ? { date: today, count: prevUsage.count + 1 }
                    : { date: today, count: 1 };

                const nextSeen = storyId && !profile.seenStoryIds.includes(storyId)
                    ? [...profile.seenStoryIds, storyId].slice(-6000)
                    : profile.seenStoryIds;

                return {
                    ...profile,
                    generationUsage: nextUsage,
                    seenStoryIds: nextSeen,
                };
            })
        );
    };

    const saveCustomStory = (story: Story) => {
        if (!story?.id) return;
        const normalizedStory = normalizeStoredStory(story);
        setCustomStories((previous) => {
            const withoutCurrent = previous.filter((item) => item.id !== normalizedStory.id);
            return [normalizedStory, ...withoutCurrent].slice(0, 80);
        });
    };

    const removeCustomStory = (storyId: string) => {
        setCustomStories((previous) => previous.filter((story) => story.id !== storyId));
    };

    // Stats tracking
    const recordStoryRead = (storyId: string, theme: string, durationMinutes: number) => {
        if (!activeProfile) return;

        const today = new Date().toISOString().split('T')[0];
        const lastReadDate = stats.lastReadDate?.split('T')[0];
        const isConsecutiveDay = lastReadDate === new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const isSameDay = lastReadDate === today;
        const updatedThemeCounts: Record<string, number> = {
            ...stats.themeCounts,
            [theme]: (stats.themeCounts[theme] || 0) + 1,
        };
        const favoriteTheme = (Object.entries(updatedThemeCounts) as Array<[string, number]>)
            .sort(([, a], [, b]) => b - a)[0]?.[0] || theme;

        const updatedStats: ReadingStats = {
            ...stats,
            totalStoriesRead: stats.totalStoriesRead + 1,
            totalMinutesListened: stats.totalMinutesListened + durationMinutes,
            storiesCompletedToday: isSameDay ? stats.storiesCompletedToday + 1 : 1,
            currentStreak: isConsecutiveDay ? stats.currentStreak + 1 : (isSameDay ? stats.currentStreak : 1),
            longestStreak: Math.max(stats.longestStreak, isConsecutiveDay ? stats.currentStreak + 1 : 1),
            lastReadDate: new Date().toISOString(),
            themeCounts: updatedThemeCounts,
            favoriteTheme,
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
        subscription,
        planRule,
        setSubscriptionTier,
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
        seenStoryIds,
        markStorySeen,
        hasSeenStory,
        customStories,
        saveCustomStory,
        removeCustomStory,
        remainingGeneratedStories,
        isGenerationLimitReached,
        recordStoryGenerated,
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
