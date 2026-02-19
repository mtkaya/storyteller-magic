import { Story } from '../types';

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
  return SUBTITLE_TERM_TR[clean] || clean;
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

export function getLocalizedStoryTitle(story: Pick<Story, 'title' | 'titleTr'>, language: AppLanguage): string {
  if (language !== 'tr') return story.title;
  if (story.titleTr && story.titleTr.trim().length > 0) return story.titleTr;
  return STORY_TITLE_TR[story.title] || story.title;
}

export function getLocalizedStorySubtitle(
  story: Pick<Story, 'subtitle' | 'subtitleTr'>,
  language: AppLanguage
): string | undefined {
  if (language !== 'tr') return story.subtitle;
  if (story.subtitleTr && story.subtitleTr.trim().length > 0) return story.subtitleTr;
  return translateSubtitleFallback(story.subtitle);
}

export function getLocalizedThemeName(theme: string | undefined, language: AppLanguage): string {
  const clean = (theme || '').trim();
  if (!clean) return language === 'tr' ? 'Diğer' : 'Other';
  if (language !== 'tr') return clean;

  const key = normalizeThemeKey(clean);
  if (key && THEME_TERM_TR[key]) return THEME_TERM_TR[key];

  const subtitleToken = SUBTITLE_TERM_TR[clean];
  if (subtitleToken) return subtitleToken;

  return clean;
}
