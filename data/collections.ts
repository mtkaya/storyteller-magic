// Story Collections - Curated story packs
import { IMAGES } from '../data';

export interface StoryCollection {
    id: string;
    name: string;
    nameTr: string;
    description: string;
    descriptionTr: string;
    icon: string;
    coverImage: string;
    storyIds: string[];
    isPremium: boolean;
    theme: string;
}

export const STORY_COLLECTIONS: StoryCollection[] = [
    {
        id: 'bedtime_classics',
        name: 'Bedtime Classics',
        nameTr: 'Uyku Klasikleri',
        description: 'Timeless tales perfect for a peaceful sleep',
        descriptionTr: 'Huzurlu bir uyku için zamansız masallar',
        icon: '🌙',
        coverImage: IMAGES.SLEEPING_CLOUD,
        storyIds: ['1', '2', '5'],
        isPremium: false,
        theme: 'bedtime',
    },
    {
        id: 'adventure_series',
        name: 'Adventure Series',
        nameTr: 'Macera Serisi',
        description: 'Exciting journeys for brave explorers',
        descriptionTr: 'Cesur kaşifler için heyecanlı yolculuklar',
        icon: '🗺️',
        coverImage: IMAGES.FLYING_CARPET,
        storyIds: ['3', '7', '8'],
        isPremium: false,
        theme: 'adventure',
    },
    {
        id: 'interactive_adventures',
        name: 'Choose Your Path',
        nameTr: 'Kendi Yolunu Seç',
        description: 'Interactive stories with multiple endings',
        descriptionTr: 'Birden fazla sonlu interaktif hikayeler',
        icon: '🎮',
        coverImage: IMAGES.MAGIC_CARPET,
        storyIds: ['6', '9', '10', '11', '12'],
        isPremium: true,
        theme: 'interactive',
    },
    {
        id: 'friendship_tales',
        name: 'Friendship Tales',
        nameTr: 'Dostluk Hikayeleri',
        description: 'Stories about making friends and caring',
        descriptionTr: 'Arkadaşlık ve paylaşım hikayeleri',
        icon: '🤝',
        coverImage: IMAGES.TEA_PARTY,
        storyIds: ['4', '10'],
        isPremium: false,
        theme: 'friendship',
    },
    {
        id: 'courage_collection',
        name: 'Tales of Courage',
        nameTr: 'Cesaret Masalları',
        description: 'Stories about being brave and strong',
        descriptionTr: 'Cesur ve güçlü olmak hakkında hikayeler',
        icon: '🦁',
        coverImage: IMAGES.BRAVE_LION,
        storyIds: ['1', '8', '11'],
        isPremium: false,
        theme: 'courage',
    },
    {
        id: 'magic_kingdom',
        name: 'Magic Kingdom',
        nameTr: 'Sihir Krallığı',
        description: 'Enchanting stories full of wonder',
        descriptionTr: 'Hayranlık dolu büyülü hikayeler',
        icon: '✨',
        coverImage: IMAGES.ENCHANTED_CHEST,
        storyIds: ['6', '7', '9'],
        isPremium: true,
        theme: 'magic',
    },
    {
        id: 'animal_friends',
        name: 'Animal Friends',
        nameTr: 'Hayvan Dostları',
        description: 'Adventures with adorable animal characters',
        descriptionTr: 'Sevimli hayvan karakterlerle maceralar',
        icon: '🐾',
        coverImage: IMAGES.TURTLE_RABBIT,
        storyIds: ['2', '5', '12'],
        isPremium: false,
        theme: 'nature',
    },
    {
        id: 'kindness_matters',
        name: 'Kindness Matters',
        nameTr: 'İyilik Önemli',
        description: 'Teaching compassion through stories',
        descriptionTr: 'Hikayelerle şefkati öğreten masallar',
        icon: '💖',
        coverImage: IMAGES.GRATEFUL_DEER,
        storyIds: ['4', '12'],
        isPremium: false,
        theme: 'kindness',
    },
];

// Daily goals configuration
export interface DailyGoal {
    id: string;
    name: string;
    nameTr: string;
    description: string;
    descriptionTr: string;
    icon: string;
    target: number;
    type: 'stories' | 'minutes' | 'interactive';
    reward: number; // XP or points
}

export const DAILY_GOALS: DailyGoal[] = [
    {
        id: 'read_one',
        name: 'Daily Reader',
        nameTr: 'Günlük Okuyucu',
        description: 'Read at least 1 story today',
        descriptionTr: 'Bugün en az 1 hikaye oku',
        icon: '📖',
        target: 1,
        type: 'stories',
        reward: 10,
    },
    {
        id: 'read_three',
        name: 'Story Enthusiast',
        nameTr: 'Hikaye Meraklısı',
        description: 'Read 3 stories today',
        descriptionTr: 'Bugün 3 hikaye oku',
        icon: '📚',
        target: 3,
        type: 'stories',
        reward: 30,
    },
    {
        id: 'listen_15',
        name: 'Good Listener',
        nameTr: 'İyi Dinleyici',
        description: 'Listen for 15 minutes',
        descriptionTr: '15 dakika dinle',
        icon: '🎧',
        target: 15,
        type: 'minutes',
        reward: 20,
    },
    {
        id: 'adventure',
        name: 'Choose Your Path',
        nameTr: 'Yolunu Seç',
        description: 'Complete an interactive story',
        descriptionTr: 'Bir interaktif hikayeyi tamamla',
        icon: '🎮',
        target: 1,
        type: 'interactive',
        reward: 25,
    },
];
