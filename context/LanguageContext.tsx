import React, { createContext, useContext, useState, ReactNode } from 'react';

// Supported languages
export type LanguageCode = 'en' | 'tr';

// Translation keys
export interface Translations {
    // General
    app_name: string;
    loading: string;

    // Navigation
    nav_home: string;
    nav_library: string;
    nav_create: string;
    nav_achievements: string;
    nav_settings: string;

    // Home
    home_greeting: string;
    home_continue_reading: string;
    home_create_magic: string;
    home_create_subtitle: string;
    home_popular: string;

    // Library
    library_title: string;
    library_search: string;
    library_all: string;
    library_favorites: string;
    library_full_story: string;
    library_interactive: string;

    // Reader
    reader_reading: string;
    reader_the_end: string;
    reader_sweet_dreams: string;
    reader_what_next: string;
    reader_try_different: string;
    reader_choices_made: string;
    reader_possible_endings: string;
    reader_lesson: string;
    reader_ages: string;
    reader_para: string;
    reader_total: string;

    // Sleep Controller
    sleep_still_listening: string;
    sleep_tap_to_continue: string;
    sleep_goodnight: string;
    sleep_sweet_dreams: string;
    sleep_closing: string;

    // Create Story
    create_title: string;
    create_choose_theme: string;
    create_choose_tone: string;
    create_choose_duration: string;
    create_generating: string;
    create_your_story: string;
    create_themes: {
        adventure: string;
        friendship: string;
        magic: string;
        nature: string;
        space: string;
        underwater: string;
    };
    create_tones: {
        calm: string;
        exciting: string;
        funny: string;
        mysterious: string;
    };
    create_durations: {
        short: string;
        medium: string;
        long: string;
    };

    // Settings
    settings_title: string;
    settings_language: string;
    settings_sleep_timer: string;
    settings_narrator_voice: string;
    settings_reading_speed: string;
    settings_parental_controls: string;

    // Achievements
    achievements_title: string;
    achievements_unlocked: string;
    achievements_locked: string;

    // Common
    common_continue: string;
    common_back: string;
    common_next: string;
    common_skip: string;
    common_save: string;
    common_cancel: string;
    common_close: string;
    common_minutes: string;
}

// English translations
const en: Translations = {
    app_name: 'Storyteller Magic',
    loading: 'Loading...',

    nav_home: 'Home',
    nav_library: 'Library',
    nav_create: 'Create',
    nav_achievements: 'Badges',
    nav_settings: 'Settings',

    home_greeting: 'Good Evening',
    home_continue_reading: 'Continue Reading',
    home_create_magic: 'Create a Bedtime Story',
    home_create_subtitle: 'Choose a theme, tone, and length for tonight',
    home_popular: 'Popular Stories',

    library_title: 'Story Library',
    library_search: 'Search stories...',
    library_all: 'All',
    library_favorites: 'Favorites',
    library_full_story: 'Full Story',
    library_interactive: 'Interactive',

    reader_reading: 'Reading...',
    reader_the_end: 'The End',
    reader_sweet_dreams: 'Sweet dreams, little one',
    reader_what_next: 'What happens next?',
    reader_try_different: 'Try Different Choices',
    reader_choices_made: 'Choices Made',
    reader_possible_endings: 'Possible Endings',
    reader_lesson: 'Lesson',
    reader_ages: 'Ages',
    reader_para: 'Para',
    reader_total: 'total',

    sleep_still_listening: 'Still listening?',
    sleep_tap_to_continue: 'Tap anywhere to continue',
    sleep_goodnight: 'Goodnight!',
    sleep_sweet_dreams: 'Sweet dreams, little one...',
    sleep_closing: 'Closing in',

    create_title: 'Create Your Story',
    create_choose_theme: 'Choose a Theme',
    create_choose_tone: 'Choose the Mood',
    create_choose_duration: 'Story Length',
    create_generating: 'Writing your magical story...',
    create_your_story: 'Your Story is Ready!',
    create_themes: {
        adventure: 'Adventure',
        friendship: 'Friendship',
        magic: 'Magic',
        nature: 'Nature',
        space: 'Space',
        underwater: 'Underwater',
    },
    create_tones: {
        calm: 'Calm',
        exciting: 'Exciting',
        funny: 'Funny',
        mysterious: 'Mysterious',
    },
    create_durations: {
        short: 'Short (5 min)',
        medium: 'Medium (10 min)',
        long: 'Long (15 min)',
    },

    settings_title: 'Settings',
    settings_language: 'Language',
    settings_sleep_timer: 'Sleep Timer',
    settings_narrator_voice: 'Narrator Voice',
    settings_reading_speed: 'Reading Speed',
    settings_parental_controls: 'Parental Controls',

    achievements_title: 'My Badges',
    achievements_unlocked: 'Unlocked',
    achievements_locked: 'Locked',

    common_continue: 'Continue',
    common_back: 'Back',
    common_next: 'Next',
    common_skip: 'Skip',
    common_save: 'Save',
    common_cancel: 'Cancel',
    common_close: 'Close',
    common_minutes: 'min',
};

// Turkish translations
const tr: Translations = {
    app_name: 'Masal Dünyası',
    loading: 'Yükleniyor...',

    nav_home: 'Ana Sayfa',
    nav_library: 'Kütüphane',
    nav_create: 'Oluştur',
    nav_achievements: 'Rozetler',
    nav_settings: 'Ayarlar',

    home_greeting: 'İyi Akşamlar',
    home_continue_reading: 'Okumaya Devam Et',
    home_create_magic: 'Uyku Hikayesi Oluştur',
    home_create_subtitle: 'Bu gece için tema, ton ve süre seç',
    home_popular: 'Popüler Hikayeler',

    library_title: 'Hikaye Kütüphanesi',
    library_search: 'Hikaye ara...',
    library_all: '✨ Tümü',
    library_favorites: '❤️ Favoriler',
    library_full_story: '📖 Tam Hikaye',
    library_interactive: 'Seçimli',

    reader_reading: 'Okunuyor...',
    reader_the_end: 'Son',
    reader_sweet_dreams: 'Tatlı rüyalar, küçük kahraman',
    reader_what_next: 'Şimdi ne olacak?',
    reader_try_different: 'Farklı Seçimler Dene',
    reader_choices_made: 'Yapılan Seçim',
    reader_possible_endings: 'Olası Son',
    reader_lesson: 'Ders',
    reader_ages: 'Yaş',
    reader_para: 'Paragraf',
    reader_total: 'toplam',

    sleep_still_listening: 'Hâlâ dinliyor musun?',
    sleep_tap_to_continue: 'Devam etmek için dokun',
    sleep_goodnight: 'İyi Geceler!',
    sleep_sweet_dreams: 'Tatlı rüyalar, minik kahraman...',
    sleep_closing: 'Kapanıyor',

    create_title: 'Hikayeni Oluştur',
    create_choose_theme: 'Tema Seç',
    create_choose_tone: 'Ruh Halini Seç',
    create_choose_duration: 'Hikaye Uzunluğu',
    create_generating: 'Sihirli hikayeniz yazılıyor...',
    create_your_story: 'Hikayen Hazır!',
    create_themes: {
        adventure: 'Macera',
        friendship: 'Dostluk',
        magic: 'Sihir',
        nature: 'Doğa',
        space: 'Uzay',
        underwater: 'Denizaltı',
    },
    create_tones: {
        calm: 'Sakin',
        exciting: 'Heyecanlı',
        funny: 'Komik',
        mysterious: 'Gizemli',
    },
    create_durations: {
        short: 'Kısa (5 dk)',
        medium: 'Orta (10 dk)',
        long: 'Uzun (15 dk)',
    },

    settings_title: 'Ayarlar',
    settings_language: 'Dil',
    settings_sleep_timer: 'Uyku Zamanlayıcı',
    settings_narrator_voice: 'Anlatıcı Sesi',
    settings_reading_speed: 'Okuma Hızı',
    settings_parental_controls: 'Ebeveyn Kontrolleri',

    achievements_title: 'Rozetlerim',
    achievements_unlocked: 'Açıldı',
    achievements_locked: 'Kilitli',

    common_continue: 'Devam',
    common_back: 'Geri',
    common_next: 'İleri',
    common_skip: 'Atla',
    common_save: 'Kaydet',
    common_cancel: 'İptal',
    common_close: 'Kapat',
    common_minutes: 'dk',
};

// All translations
const translations: Record<LanguageCode, Translations> = { en, tr };

// Language context
interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const resolveInitialLanguage = (): LanguageCode => {
    const saved = localStorage.getItem('app_language');
    if (saved === 'en' || saved === 'tr') return saved;

    const candidate = typeof navigator !== 'undefined'
        ? (navigator.languages?.[0] || navigator.language || '')
        : '';
    const normalized = candidate.trim().toLowerCase();
    if (normalized.startsWith('tr')) return 'tr';
    return 'en';
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<LanguageCode>(resolveInitialLanguage);

    const handleSetLanguage = (lang: LanguageCode) => {
        setLanguage(lang);
        localStorage.setItem('app_language', lang);
    };

    const value: LanguageContextType = {
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook to use language
export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Language options for UI
export const languageOptions = [
    { code: 'en' as LanguageCode, name: 'English', flag: '🇬🇧' },
    { code: 'tr' as LanguageCode, name: 'Türkçe', flag: '🇹🇷' },
];
