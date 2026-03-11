import { Story } from '../types';
import { normalizeStoryTheme } from './storyCuration';

export interface StoryVisualIdentity {
  themeKey: string;
  mainCharacter: string;
  companionCue: string;
  signatureProp: string;
  paletteHint: string;
  worldCue: string;
}

const VISUAL_PRESETS: Record<string, Omit<StoryVisualIdentity, 'themeKey' | 'mainCharacter'>> = {
  adventure: {
    companionCue: 'a gentle travel companion',
    signatureProp: 'a lantern compass',
    paletteHint: 'deep twilight blue, warm amber, soft teal highlights',
    worldCue: 'winding paths, bridges, and faraway lights',
  },
  friendship: {
    companionCue: 'a small friendly companion',
    signatureProp: 'a shared lantern',
    paletteHint: 'rose glow, berry purple, honey highlights',
    worldCue: 'cozy meeting spots, warm clearings, welcoming corners',
  },
  magic: {
    companionCue: 'a curious magical helper',
    signatureProp: 'a glowing quill or floating charm',
    paletteHint: 'violet glow, moon blue, golden spark accents',
    worldCue: 'enchanted clearings, floating lights, soft magical props',
  },
  nature: {
    companionCue: 'a calm woodland friend',
    signatureProp: 'a leaf lantern',
    paletteHint: 'moss green, moonlit blue, pale mint highlights',
    worldCue: 'quiet forests, small trails, moonlit leaves',
  },
  space: {
    companionCue: 'a friendly stargazing companion',
    signatureProp: 'a star map',
    paletteHint: 'night navy, starlight silver, soft gold glows',
    worldCue: 'small observatories, glowing skies, gentle planets',
  },
  underwater: {
    companionCue: 'a kind sea friend',
    signatureProp: 'a shell lantern',
    paletteHint: 'deep aqua, coral glow, pearl highlights',
    worldCue: 'soft reefs, bubble trails, calm underwater paths',
  },
  bedtime: {
    companionCue: 'a sleepy bedside friend',
    signatureProp: 'a moon pillow',
    paletteHint: 'indigo night, warm cream, soft apricot glow',
    worldCue: 'quiet rooms, moon windows, cozy bedtime corners',
  },
  calm: {
    companionCue: 'a soothing quiet companion',
    signatureProp: 'a breathing lantern',
    paletteHint: 'mist blue, lavender gray, candlelight gold',
    worldCue: 'still air, gentle curtains, slow drifting lights',
  },
};

const DEFAULT_PRESET: Omit<StoryVisualIdentity, 'themeKey' | 'mainCharacter'> = {
  companionCue: 'a gentle story companion',
  signatureProp: 'a glowing bedtime lantern',
  paletteHint: 'midnight blue, soft gold, subtle pastel glow',
  worldCue: 'calm storybook spaces with gentle night light',
};

export function deriveStoryVisualIdentity(input: Pick<Story, 'theme' | 'title' | 'character'>): StoryVisualIdentity {
  const themeKey = normalizeStoryTheme(input.theme || '') || 'bedtime';
  const preset = VISUAL_PRESETS[themeKey] || DEFAULT_PRESET;

  return {
    themeKey,
    mainCharacter: input.character?.trim() || input.title?.trim() || 'friendly bedtime hero',
    companionCue: preset.companionCue,
    signatureProp: preset.signatureProp,
    paletteHint: preset.paletteHint,
    worldCue: preset.worldCue,
  };
}
