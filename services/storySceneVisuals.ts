import { IMAGES } from '../data';
import { Story, StoryBranch } from '../types';
import { normalizeStoryTheme } from './storyCuration';
import { getLocalizedThemeName } from './storyLocalization';
import { GENERATED_SCENE_IMAGE_POOLS } from '../data/generatedSceneImages';

export type StoryScenePhase = 'opening' | 'journey' | 'choice' | 'climax' | 'resolution';

export interface StorySceneVisualInput {
  story: Story;
  language: 'en' | 'tr';
  paragraphIndex: number;
  paragraphCount: number;
  branchId?: string | null;
  choiceDepth?: number;
  endingType?: StoryBranch['endingType'];
  fallbackImageUrl: string;
}

export interface StorySceneVisualOutput {
  imageUrl: string;
  sceneKey: string;
  phase: StoryScenePhase;
  phaseLabel: string;
  canvaPrompt: string;
  variantIndex: number;
  totalVariants: number;
}

const DEFAULT_IMAGE_POOL = [
  IMAGES.MAGIC_BOOK,
  IMAGES.FLYING_CARPET,
  IMAGES.ENCHANTED_FOREST_GLOW,
  IMAGES.SLEEPING_ANIMALS,
  IMAGES.ORNATE_MAGICAL_LANTERN,
  IMAGES.FAIRY_CASTLE_MOONLIGHT,
  IMAGES.MAGICAL_TOWER_STARS,
  IMAGES.HOT_AIR_BALLOON_STARS,
  IMAGES.SERENE_LOTUS_MOONWATER,
  IMAGES.FRIENDLY_ROCKET_STARS,
];

const THEME_IMAGE_POOLS: Record<string, string[]> = {
  adventure: [
    IMAGES.FLYING_CARPET,
    IMAGES.HOT_AIR_BALLOON_STARS,
    IMAGES.VINTAGE_MAGIC_COMPASS,
    IMAGES.FRIENDLY_ROCKET_STARS,
    IMAGES.TREASURE_KITTEN,
    IMAGES.COZY_TREEHOUSE_NIGHT,
    IMAGES.MAGICAL_TOWER_STARS,
    IMAGES.COZY_LIGHTHOUSE_ISLAND,
    IMAGES.MAGIC_CARPET,
    IMAGES.MAGIC_BOOK,
  ],
  friendship: [
    IMAGES.BEDTIME_COOKIES,
    IMAGES.TEA_PARTY,
    IMAGES.BUNNY_NEST,
    IMAGES.TURTLE_RABBIT,
    IMAGES.COZY_FOX,
    IMAGES.FAIRY_CASTLE_MOONLIGHT,
    IMAGES.PILLOW_BATTLE,
    IMAGES.MAGICAL_DANDELION_WISH,
    IMAGES.SLEEPING_ANIMALS,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
  ],
  magic: [
    IMAGES.MAGIC_BOOK,
    IMAGES.MAGIC_CARPET,
    IMAGES.ORNATE_MAGICAL_LANTERN,
    IMAGES.MAGIC_QUILL,
    IMAGES.ENCHANTED_CHEST,
    IMAGES.MAGICAL_TOWER_STARS,
    IMAGES.WOLF_PRINCESS,
    IMAGES.MAGIC_QUILL,
    IMAGES.FAIRY_CASTLE_MOONLIGHT,
    IMAGES.MAGICAL_DANDELION_WISH,
  ],
  nature: [
    IMAGES.ENCHANTED_FOREST_GLOW,
    IMAGES.GRATEFUL_DEER,
    IMAGES.TURTLE_RABBIT,
    IMAGES.GENTLE_WHALE_NIGHTSKY,
    IMAGES.SERENE_LOTUS_MOONWATER,
    IMAGES.ENCHANTED_OLD_TREE,
    IMAGES.MAGICAL_DANDELION_WISH,
    IMAGES.GENTLE_WHALE_NIGHTSKY,
    IMAGES.TEA_PARTY,
    IMAGES.TURTLE_BUNNY,
  ],
  calm: [
    IMAGES.SLEEPING_CLOUD,
    IMAGES.SLEEPING_ANIMALS,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.SMILING_CRESCENT_MOON_STARS,
    IMAGES.SLEEPY_OWL,
    IMAGES.SLEEPING_MOON,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.SERENE_LOTUS_MOONWATER,
    IMAGES.SLEEPY_OWL_BOOKSHELF,
  ],
  bedtime: [
    IMAGES.SLEEPING_CLOUD,
    IMAGES.SLEEPING_ANIMALS,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.SMILING_CRESCENT_MOON_STARS,
    IMAGES.SLEEPY_OWL,
    IMAGES.SLEEPING_MOON,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.MOON_RESULT,
    IMAGES.SLEEPY_OWL_BOOKSHELF,
  ],
  courage: [
    IMAGES.BRAVE_LION,
    IMAGES.PILLOW_BATTLE,
    IMAGES.COZY_LIGHTHOUSE_ISLAND,
    IMAGES.MOONLIGHT_LION,
    IMAGES.FRIENDLY_ROCKET_STARS,
    IMAGES.MAGICAL_TOWER_STARS,
    IMAGES.MAGIC_CARPET,
    IMAGES.FLYING_CARPET,
    IMAGES.VINTAGE_MAGIC_COMPASS,
  ],
  wisdom: [
    IMAGES.WISE_OWL,
    IMAGES.SLEEPY_OWL,
    IMAGES.VINTAGE_MAGIC_COMPASS,
    IMAGES.DETECTIVE_MOUSE,
    IMAGES.COZY_LIGHTHOUSE_ISLAND,
    IMAGES.MAGIC_QUILL,
    IMAGES.WISE_OWL_LIBRARY,
    IMAGES.ENCHANTED_OLD_TREE,
    IMAGES.VINTAGE_MAGIC_COMPASS,
  ],
  mystery: [
    IMAGES.DETECTIVE_MOUSE,
    IMAGES.MAGIC_CHEST,
    IMAGES.ENCHANTED_CHEST,
    IMAGES.VINTAGE_MAGIC_COMPASS,
    IMAGES.ENCHANTED_OLD_TREE,
    IMAGES.MAGICAL_TOWER_STARS,
    IMAGES.WOLF_PRINCESS,
    IMAGES.ORNATE_MAGICAL_LANTERN,
    IMAGES.TREASURE_KITTEN,
  ],
  family: [
    IMAGES.COZY_LIGHTHOUSE_ISLAND,
    IMAGES.COZY_TREEHOUSE_NIGHT,
    IMAGES.BEDTIME_COOKIES,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.SLEEPING_ANIMALS,
    IMAGES.GRATEFUL_DEER,
    IMAGES.BEDTIME_COOKIES,
    IMAGES.SLEEPY_OWL_BOOKSHELF,
    IMAGES.SERENE_LOTUS_MOONWATER,
  ],
  wonder: [
    IMAGES.FRIENDLY_ROCKET_STARS,
    IMAGES.MAGICAL_SEAHORSE_GLOW,
    IMAGES.FAIRY_CASTLE_MOONLIGHT,
    IMAGES.MAGICAL_TOWER_STARS,
    IMAGES.SERENE_LOTUS_MOONWATER,
    IMAGES.HOT_AIR_BALLOON_STARS,
    IMAGES.MAGIC_BOOK,
    IMAGES.FLYING_CARPET,
    IMAGES.GENTLE_WHALE_NIGHTSKY,
  ],
  kindness: [
    IMAGES.MAGICAL_DANDELION_WISH,
    IMAGES.BUNNY_NEST,
    IMAGES.TEA_PARTY,
    IMAGES.BEDTIME_COOKIES,
    IMAGES.GRATEFUL_DEER,
    IMAGES.SERENE_LOTUS_MOONWATER,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.ENCHANTED_FOREST_GLOW,
    IMAGES.TEA_PARTY,
  ],
};

const PHASE_LABELS: Record<StoryScenePhase, { tr: string; en: string }> = {
  opening: { tr: 'Başlangıç', en: 'Opening' },
  journey: { tr: 'Yolculuk', en: 'Journey' },
  choice: { tr: 'Seçim', en: 'Choice' },
  climax: { tr: 'Dönüm', en: 'Climax' },
  resolution: { tr: 'Final', en: 'Resolution' },
};

const PHASE_HINTS: Record<StoryScenePhase, { tr: string; en: string }> = {
  opening: {
    tr: 'karakterin dünyaya giriş anı, merak uyandıran başlangıç',
    en: 'welcoming opening moment, character entering the story world',
  },
  journey: {
    tr: 'ilerleyen yolculuk, keşif ve sıcak etkileşimler',
    en: 'mid-journey exploration with warm interactions',
  },
  choice: {
    tr: 'karar anı, birden fazla yolun görüldüğü sahne',
    en: 'decision point with multiple visible paths',
  },
  climax: {
    tr: 'duygusal veya macera zirvesi, parlak vurgu',
    en: 'emotional or adventure peak with cinematic emphasis',
  },
  resolution: {
    tr: 'huzurlu kapanış, güvenli ve sıcak son',
    en: 'peaceful closure, safe and warm ending',
  },
};

const STYLE_LOCK_EN =
  "children's book illustration, hand-painted digital art, soft painterly shapes, clean composition, bedtime-friendly mood, whimsical but calm, no photorealism";
const STYLE_LOCK_TR =
  'cocuk kitabi ilustrasyonu, elde cizilmis dijital sanat, yumusak boyasal formlar, temiz kompozisyon, uykuya uygun huzurlu atmosfer, fotogercekcilik yok';
const NEGATIVE_PROMPT_EN =
  'no photorealism, no realistic camera lens, no real photo texture, no harsh shadows, no horror, no violence, no text watermark, no logo';
const NEGATIVE_PROMPT_TR =
  'fotogercekcilik yok, gercek kamera lens efekti yok, fotograf dokusu yok, sert golge yok, korku yok, siddet yok, watermark yok, logo yok';

const THEME_PROMPT_STARTERS: Record<string, { en: string; tr: string }> = {
  adventure: {
    en: 'brave but gentle adventure, winding path, glowing horizon, cozy color grading',
    tr: 'cesur ama nazik macera, kivrimli yol, parlayan ufuk, sicak renk gecisi',
  },
  friendship: {
    en: 'warm friendship moment, soft lantern lights, cozy meadow, inviting expressions',
    tr: 'sicak dostluk ani, yumusak fener isiklari, huzurlu cayir, davetkar ifadeler',
  },
  magic: {
    en: 'enchanted forest clearing, floating sparkles, magical artifacts, dreamy atmosphere',
    tr: 'buyulu orman acikligi, havada isiltılar, sihirli nesneler, ruyamsi atmosfer',
  },
  nature: {
    en: 'moonlit forest with calm animals, gentle leaves, peaceful night sky',
    tr: 'ay isikli orman, sakin hayvanlar, yumusak yapraklar, huzurlu gece gogu',
  },
  calm: {
    en: 'quiet bedtime room, moon glow, sleepy clouds, soft transitions',
    tr: 'sessiz uyku odasi, ay isigi, uykulu bulutlar, yumusak gecisler',
  },
};

const toSeed = (value: string): number => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const normalizeBranchToken = (value?: string | null): string =>
  (value || 'linear')
    .toLowerCase()
    .replace(/[^a-z0-9çğıöşü_-]+/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

const uniqueImages = (items: string[]): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const clean = (item || '').trim();
    if (!clean) continue;
    if (seen.has(clean)) continue;
    seen.add(clean);
    out.push(clean);
  }
  return out;
};

const normalizeGeneratedThemeKey = (theme: string): string =>
  theme
    .toLowerCase()
    .replace(/[^a-z0-9çğıöşü_-]+/gi, '')
    .trim();

const detectScenePhase = (input: StorySceneVisualInput): StoryScenePhase => {
  if (input.endingType) return 'resolution';

  const total = Math.max(1, input.paragraphCount - 1);
  const progress = Math.max(0, Math.min(1, input.paragraphIndex / total));
  const branchToken = normalizeBranchToken(input.branchId);

  if (progress <= 0.18) return 'opening';
  if (/choice|split|path|start|branch|decision|secim|yol/.test(branchToken)) return 'choice';
  if (progress <= 0.52) return 'journey';
  if (progress <= 0.82) return 'climax';
  return 'resolution';
};

const resolveImagePool = (story: Story): string[] => {
  const normalizedTheme = normalizeStoryTheme(story.theme);
  const generatedThemePool =
    GENERATED_SCENE_IMAGE_POOLS[normalizedTheme]
    || GENERATED_SCENE_IMAGE_POOLS[normalizeGeneratedThemeKey(story.theme || '')]
    || [];

  const staticThemePool = THEME_IMAGE_POOLS[normalizedTheme] || DEFAULT_IMAGE_POOL;
  const merged = uniqueImages([
    ...generatedThemePool,
    ...staticThemePool,
    story.coverUrl,
  ]);

  return merged.length > 0 ? merged : DEFAULT_IMAGE_POOL;
};

const buildScenePrompt = (
  input: StorySceneVisualInput,
  phase: StoryScenePhase,
  variantIndex: number
): string => {
  const language = input.language;
  const themeLabel = getLocalizedThemeName(input.story.theme, language);
  const title = language === 'tr' && input.story.titleTr ? input.story.titleTr : input.story.title;
  const character = input.story.character || (language === 'tr' ? 'sevimli kahraman' : 'friendly hero');
  const normalizedTheme = normalizeStoryTheme(input.story.theme);
  const themeStarter = THEME_PROMPT_STARTERS[normalizedTheme];
  const branchHint = normalizeBranchToken(input.branchId).replace(/_/g, ' ');
  const branchText = branchHint ? (language === 'tr' ? `Dal ipucu: ${branchHint}` : `Branch cue: ${branchHint}`) : '';
  const phaseHint = PHASE_HINTS[phase][language];

  if (language === 'tr') {
    return [
      `Baslik: ${title}`,
      `Tema: ${themeLabel}`,
      `Karakter: ${character}`,
      `Sahne fazi: ${PHASE_LABELS[phase].tr}`,
      `Sahne niyeti: ${phaseHint}`,
      themeStarter ? `Tema baslangici: ${themeStarter.tr}` : '',
      branchText,
      `Varyant: ${variantIndex + 1}`,
      'Renk butunlugu: mevcut uygulamadaki gece-masal paletine uyumlu kal.',
      `Stil kilidi: ${STYLE_LOCK_TR}`,
      `Negatif prompt: ${NEGATIVE_PROMPT_TR}`,
    ]
      .filter(Boolean)
      .join('\n');
  }

  return [
    `Title: ${title}`,
    `Theme: ${themeLabel}`,
    `Character: ${character}`,
    `Scene phase: ${PHASE_LABELS[phase].en}`,
    `Scene intent: ${phaseHint}`,
    themeStarter ? `Theme starter: ${themeStarter.en}` : '',
    branchText,
    `Variant: ${variantIndex + 1}`,
    'Color continuity: stay consistent with the app bedtime palette.',
    `Style lock: ${STYLE_LOCK_EN}`,
    `Negative prompt: ${NEGATIVE_PROMPT_EN}`,
  ]
    .filter(Boolean)
    .join('\n');
};

export const getScenePhaseLabel = (phase: StoryScenePhase, language: 'en' | 'tr'): string =>
  PHASE_LABELS[phase][language];

export function resolveStorySceneVisual(input: StorySceneVisualInput): StorySceneVisualOutput {
  const pool = resolveImagePool(input.story);
  const phase = detectScenePhase(input);
  const branchToken = normalizeBranchToken(input.branchId);
  const choiceDepth = Math.max(0, input.choiceDepth || 0);
  const sceneSeed = `${input.story.id}|${branchToken}|${phase}|${input.paragraphIndex}|${choiceDepth}`;
  const stepSeed = `${input.story.id}|${branchToken}|step`;
  const poolSize = Math.max(1, pool.length);
  const phaseOffsetMap: Record<StoryScenePhase, number> = {
    opening: 0,
    journey: 2,
    choice: 4,
    climax: 6,
    resolution: 8,
  };
  const baseOffset = toSeed(sceneSeed) % poolSize;
  const phaseOffset = phaseOffsetMap[phase] % poolSize;
  const jump = ((toSeed(stepSeed) % (poolSize - 1 || 1)) + 1);
  let variantIndex = (baseOffset + phaseOffset + ((input.paragraphIndex + choiceDepth) * jump)) % poolSize;
  if (poolSize > 1 && input.paragraphIndex > 0) {
    const prevIndex = (baseOffset + phaseOffset + (((input.paragraphIndex - 1) + choiceDepth) * jump)) % poolSize;
    if (variantIndex === prevIndex) {
      variantIndex = (variantIndex + 1) % poolSize;
    }
  }
  const imageUrl = pool[variantIndex] || input.fallbackImageUrl;
  const sceneKey = `${branchToken || 'linear'}:${phase}:${input.paragraphIndex}:${variantIndex}`;

  return {
    imageUrl,
    sceneKey,
    phase,
    phaseLabel: getScenePhaseLabel(phase, input.language),
    canvaPrompt: buildScenePrompt(input, phase, variantIndex),
    variantIndex,
    totalVariants: pool.length,
  };
}

export interface CanvaStoryboardScene {
  sceneNumber: number;
  phase: StoryScenePhase;
  phaseLabel: string;
  prompt: string;
}

export function buildCanvaStoryboardScenes(
  story: Story,
  language: 'en' | 'tr',
  totalScenes = 8
): CanvaStoryboardScene[] {
  const count = Math.max(4, Math.min(16, totalScenes));
  const scenes: CanvaStoryboardScene[] = [];

  for (let i = 0; i < count; i += 1) {
    const visual = resolveStorySceneVisual({
      story,
      language,
      paragraphIndex: i,
      paragraphCount: count,
      fallbackImageUrl: story.coverUrl || IMAGES.MAGIC_BOOK,
      choiceDepth: Math.floor(i / 2),
    });
    scenes.push({
      sceneNumber: i + 1,
      phase: visual.phase,
      phaseLabel: visual.phaseLabel,
      prompt: visual.canvaPrompt,
    });
  }

  return scenes;
}
