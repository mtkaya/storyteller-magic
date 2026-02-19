import { Story } from '../types';
import { normalizeStoryTheme } from './storyCuration';

type AppLanguage = 'en' | 'tr';

const STORY_TITLE_TR: Record<string, string> = {
  'The Brave Lion Cub': 'Cesur Aslan Yavrusu',
  'Space Voyager': 'Uzay Kaşifi',
  'The Magic Forest': 'Sihirli Orman',
  'The Cookie Mystery': 'Kurabiye Gizemi',
  'Deep Sea Dreams': 'Derin Deniz Düşleri',
  'Cloud Castle': 'Bulut Şatosu',
  'Lighthouse Keeper': 'Deniz Feneri Bekçisi',
  'The Feather Storm': 'Tüy Fırtınası',
  'The Secret Attic': 'Gizli Çatı Katı',
  'Slow & Steady': 'Yavaş ve Kararlı',
  "The Wizard's Quill": 'Sihirbazın Kalemi',
  'Goodnight Moon': 'İyi Geceler Ay',
  'The Autumn Fox': 'Sonbahar Tilkisi',
  'Detective Mouse': 'Dedektif Fare',
  "The Sleepy Owl's Library": 'Uykucu Baykuşun Kütüphanesi',
  'Whiskers and the Golden Treasure': 'Bıyık ve Altın Hazine',
  "The Wise Owl's Secret": 'Bilge Baykuşun Sırrı',
  'Whiskers and the Treasure': 'Bıyık ve Hazine',
  'The Magic Carpet Ride': 'Sihirli Halı Yolculuğu',
  'The Enchanted Tea Party': 'Büyülü Çay Partisi',
  "Penny's Big Show": "Penny'nin Büyük Gösterisi",
  'The Wolf and the Moon Princess': 'Kurt ve Ay Prensesi',
  'The Lantern That Listened': 'Dinleyen Fener',
  'Bobo and the Cloud Blanket': 'Bobo ve Bulut Battaniye',
  "Captain Pebble's Star Rocket": "Kaptan Pebble'ın Yıldız Roketi",
  'Luna and the Seahorse Song': 'Luna ve Denizatı Şarkısı',
  'The Treehouse Promise': 'Ağaç Ev Sözü',
  'Compass of Kind Paths': 'Nazik Yolların Pusulası',
  'Balloon Above Sleepy Valley': 'Uykulu Vadi Üstünde Balon',
  'The Castle of Quiet Crowns': 'Sessiz Taçlar Şatosu',
  'The Tower and the Falling Star': 'Kule ve Düşen Yıldız',
  'Goodnight, Smiling Moon': 'İyi Geceler, Gülümseyen Ay',
  'The Lighthouse of Little Waves': 'Küçük Dalgaların Deniz Feneri',
  'The Whale Who Carried Starlight': 'Yıldız Işığını Taşıyan Balina',
  'Firefly Forest Picnic': 'Ateşböceği Orman Pikniği',
  "The Old Tree's Lantern Leaves": 'Yaşlı Ağacın Fener Yaprakları',
  'The Dandelion Wish': 'Karahindiba Dileği',
  'Lotus Lake Breathing': 'Lotus Gölünde Nefes',
};

const SUBTITLE_TERM_TR: Record<string, string> = {
  Adventure: 'Macera',
  Friendship: 'Dostluk',
  Funny: 'Eğlence',
  Magic: 'Sihir',
  Nature: 'Doğa',
  Wonder: 'Hayranlık',
  Ocean: 'Okyanus',
  Sleep: 'Uyku',
  Calm: 'Sakinlik',
  Safety: 'Güven',
  Home: 'Yuva',
  Fun: 'Eğlence',
  Play: 'Oyun',
  Mystery: 'Gizem',
  Discovery: 'Keşif',
  Curiosity: 'Merak',
  Wisdom: 'Bilgelik',
  Patience: 'Sabır',
  Creation: 'Yaratım',
  Dreams: 'Düşler',
  Bedtime: 'Uyku Vakti',
  Courage: 'Cesaret',
  Learning: 'Öğrenme',
  Kindness: 'İyilik',
  Family: 'Aile',
  Seasons: 'Mevsimler',
  Change: 'Değişim',
  Hope: 'Umut',
  Mindfulness: 'Farkındalık',
  Interactive: 'İnteraktif',
};

const SUBTITLE_TERM_TR_NORMALIZED: Record<string, string> = Object.fromEntries(
  Object.entries(SUBTITLE_TERM_TR).map(([key, value]) => [key.toLowerCase(), value])
);

const TURKISH_CHAR_PATTERN = /[ğüşöçıİĞÜŞÖÇ]/;
const TURKISH_WORD_PATTERN = /\b(ve|bir|ile|için|ama|gibi|çok|şimdi|gece|hikaye|masal|uyku|rüya|ruya)\b/i;

const looksLikeTurkishText = (text: string | undefined): boolean => {
  const clean = (text || '').trim();
  if (!clean) return false;
  if (TURKISH_CHAR_PATTERN.test(clean)) return true;
  return TURKISH_WORD_PATTERN.test(clean);
};

const THEME_TERM_TR: Record<string, string> = {
  adventure: 'Macera',
  friendship: 'Dostluk',
  magic: 'Sihir',
  nature: 'Doğa',
  calm: 'Sakinlik',
  courage: 'Cesaret',
  wisdom: 'Bilgelik',
  mystery: 'Gizem',
  family: 'Aile',
  wonder: 'Hayranlık',
  bedtime: 'Uyku',
  sleep: 'Uyku',
  dreams: 'Rüyalar',
  discovery: 'Keşif',
  learning: 'Öğrenme',
  kindness: 'İyilik',
  safety: 'Güven',
  home: 'Yuva',
  fun: 'Eğlence',
  play: 'Oyun',
  seasons: 'Mevsimler',
  change: 'Değişim',
  hope: 'Umut',
  mindfulness: 'Farkındalık',
  interactive: 'İnteraktif',
};

const translateSubtitleToken = (token: string): string => {
  const clean = token.trim();
  if (!clean) return clean;

  const hasInteractiveBadge = clean.startsWith('🎮');
  const normalizedToken = hasInteractiveBadge
    ? clean.replace(/^🎮\s*/, '')
    : clean;

  const translated = SUBTITLE_TERM_TR[normalizedToken]
    || SUBTITLE_TERM_TR_NORMALIZED[normalizedToken.toLowerCase()];

  if (!translated) return clean;
  if (hasInteractiveBadge) return `🎮 ${translated}`;
  return translated;
};

const normalizeThemeKey = (value: string | undefined): string => {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9çğıöşü_-]/gi, '');
};

const translateSubtitleFallback = (subtitle: string | undefined): string | undefined => {
  if (!subtitle) return subtitle;

  const minListenMatch = subtitle.match(/^(\d+)\s*min listen$/i);
  if (minListenMatch) {
    return `${minListenMatch[1]} dk dinleme`;
  }

  if (subtitle.includes('•')) {
    const parts = subtitle.split('•').map((part) => translateSubtitleToken(part));
    return parts.join(' • ');
  }

  if (subtitle.startsWith('🎮')) {
    return subtitle.replace(/Interactive/gi, 'İnteraktif');
  }

  return translateSubtitleToken(subtitle);
};

const parseDurationMinutes = (duration: string | undefined): number | null => {
  if (!duration) return null;
  const match = duration.match(/(\d+)/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) && value > 0 ? value : null;
};

const buildTurkishSubtitleFallback = (
  story: Pick<Story, 'theme' | 'duration' | 'isInteractive'>
): string => {
  const themeLabel = getLocalizedThemeName(story.theme, 'tr');
  const minutes = parseDurationMinutes(story.duration);

  if (story.isInteractive) {
    if (minutes) return `🎮 İnteraktif • ${themeLabel} • ${minutes} dk`;
    return `🎮 İnteraktif • ${themeLabel}`;
  }

  if (minutes) return `${themeLabel} • ${minutes} dk masal`;
  return `${themeLabel} • Uyku masalı`;
};

export function getLocalizedStoryTitle(story: Pick<Story, 'title' | 'titleTr'>, language: AppLanguage): string {
  if (language !== 'tr') return story.title;
  if (story.titleTr && story.titleTr.trim().length > 0) return story.titleTr;
  return STORY_TITLE_TR[story.title] || story.title;
}

export function getLocalizedStorySubtitle(
  story: Pick<Story, 'subtitle' | 'subtitleTr' | 'theme' | 'duration' | 'isInteractive'>,
  language: AppLanguage
): string | undefined {
  if (language !== 'tr') return story.subtitle;
  if (story.subtitleTr && story.subtitleTr.trim().length > 0 && looksLikeTurkishText(story.subtitleTr)) {
    return story.subtitleTr;
  }

  const translated = translateSubtitleFallback(story.subtitle);
  if (translated && looksLikeTurkishText(translated)) return translated;

  return buildTurkishSubtitleFallback(story);
}

export function getLocalizedThemeName(theme: string | undefined, language: AppLanguage): string {
  const clean = (theme || '').trim();
  if (!clean) return language === 'tr' ? 'Diğer' : 'Other';
  if (language !== 'tr') return clean;

  const canonical = normalizeStoryTheme(clean);
  if (canonical && THEME_TERM_TR[canonical]) return THEME_TERM_TR[canonical];

  const key = normalizeThemeKey(clean);
  if (key && THEME_TERM_TR[key]) return THEME_TERM_TR[key];

  const subtitleToken = SUBTITLE_TERM_TR[clean];
  if (subtitleToken) return subtitleToken;

  return clean;
}
