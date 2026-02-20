import { IMAGES } from '../data';
import { Story, StoryBranch } from '../types';
import { normalizeStoryTheme } from './storyCuration';
import { getLocalizedThemeName } from './storyLocalization';

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
];

const THEME_IMAGE_POOLS: Record<string, string[]> = {
  adventure: [
    IMAGES.FLYING_CARPET,
    IMAGES.HOT_AIR_BALLOON_STARS,
    IMAGES.VINTAGE_MAGIC_COMPASS,
    IMAGES.FRIENDLY_ROCKET_STARS,
    IMAGES.TREASURE_KITTEN,
    IMAGES.COZY_TREEHOUSE_NIGHT,
  ],
  friendship: [
    IMAGES.BEDTIME_COOKIES,
    IMAGES.TEA_PARTY,
    IMAGES.BUNNY_NEST,
    IMAGES.TURTLE_RABBIT,
    IMAGES.COZY_FOX,
    IMAGES.FAIRY_CASTLE_MOONLIGHT,
  ],
  magic: [
    IMAGES.MAGIC_BOOK,
    IMAGES.MAGIC_CARPET,
    IMAGES.ORNATE_MAGICAL_LANTERN,
    IMAGES.MAGIC_QUILL,
    IMAGES.ENCHANTED_CHEST,
    IMAGES.MAGICAL_TOWER_STARS,
    IMAGES.WOLF_PRINCESS,
  ],
  nature: [
    IMAGES.ENCHANTED_FOREST_GLOW,
    IMAGES.GRATEFUL_DEER,
    IMAGES.TURTLE_RABBIT,
    IMAGES.GENTLE_WHALE_NIGHTSKY,
    IMAGES.SERENE_LOTUS_MOONWATER,
    IMAGES.ENCHANTED_OLD_TREE,
    IMAGES.MAGICAL_DANDELION_WISH,
  ],
  calm: [
    IMAGES.SLEEPING_CLOUD,
    IMAGES.SLEEPING_ANIMALS,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.SMILING_CRESCENT_MOON_STARS,
    IMAGES.SLEEPY_OWL,
    IMAGES.SLEEPING_MOON,
  ],
  bedtime: [
    IMAGES.SLEEPING_CLOUD,
    IMAGES.SLEEPING_ANIMALS,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.SMILING_CRESCENT_MOON_STARS,
    IMAGES.SLEEPY_OWL,
    IMAGES.SLEEPING_MOON,
  ],
  courage: [
    IMAGES.BRAVE_LION,
    IMAGES.PILLOW_BATTLE,
    IMAGES.COZY_LIGHTHOUSE_ISLAND,
    IMAGES.MOONLIGHT_LION,
    IMAGES.FRIENDLY_ROCKET_STARS,
    IMAGES.MAGICAL_TOWER_STARS,
  ],
  wisdom: [
    IMAGES.WISE_OWL,
    IMAGES.SLEEPY_OWL,
    IMAGES.VINTAGE_MAGIC_COMPASS,
    IMAGES.DETECTIVE_MOUSE,
    IMAGES.COZY_LIGHTHOUSE_ISLAND,
    IMAGES.MAGIC_QUILL,
  ],
  mystery: [
    IMAGES.DETECTIVE_MOUSE,
    IMAGES.MAGIC_CHEST,
    IMAGES.ENCHANTED_CHEST,
    IMAGES.VINTAGE_MAGIC_COMPASS,
    IMAGES.ENCHANTED_OLD_TREE,
    IMAGES.MAGICAL_TOWER_STARS,
  ],
  family: [
    IMAGES.COZY_LIGHTHOUSE_ISLAND,
    IMAGES.COZY_TREEHOUSE_NIGHT,
    IMAGES.BEDTIME_COOKIES,
    IMAGES.BABY_BEAR_CLOUD_SLEEP,
    IMAGES.SLEEPING_ANIMALS,
    IMAGES.GRATEFUL_DEER,
  ],
  wonder: [
    IMAGES.FRIENDLY_ROCKET_STARS,
    IMAGES.MAGICAL_SEAHORSE_GLOW,
    IMAGES.FAIRY_CASTLE_MOONLIGHT,
    IMAGES.MAGICAL_TOWER_STARS,
    IMAGES.SERENE_LOTUS_MOONWATER,
    IMAGES.HOT_AIR_BALLOON_STARS,
  ],
  kindness: [
    IMAGES.MAGICAL_DANDELION_WISH,
    IMAGES.BUNNY_NEST,
    IMAGES.TEA_PARTY,
    IMAGES.BEDTIME_COOKIES,
    IMAGES.GRATEFUL_DEER,
    IMAGES.SERENE_LOTUS_MOONWATER,
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
  "children's bedtime story illustration, hand-painted digital art, soft painterly texture, whimsical but calm mood, vertical 3:4, no text, no logo, no photorealism";
const STYLE_LOCK_TR =
  'cocuk uyku masali ilustrasyonu, elde cizilmis dijital stil, yumusak boyasal doku, huzurlu ama sihirli atmosfer, dikey 3:4, yazi yok, logo yok, fotogercekcilik yok';

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
  return THEME_IMAGE_POOLS[normalizedTheme] || DEFAULT_IMAGE_POOL;
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
      branchText,
      `Varyant: ${variantIndex + 1}`,
      'Renk butunlugu: mevcut uygulamadaki gece-masal paletine uyumlu kal.',
      `Stil kilidi: ${STYLE_LOCK_TR}`,
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
    branchText,
    `Variant: ${variantIndex + 1}`,
    'Color continuity: stay consistent with the app bedtime palette.',
    `Style lock: ${STYLE_LOCK_EN}`,
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
  const baseOffset = toSeed(sceneSeed) % pool.length;
  const jump = (toSeed(stepSeed) % 4) + 1;
  const variantIndex = (baseOffset + input.paragraphIndex * jump + choiceDepth) % pool.length;
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
