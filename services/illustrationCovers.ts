import { Story } from '../types';
import {
  IllustrationTechnique,
  parseTechniqueOverride,
  normalizeIllustrationTheme,
  resolveIllustrationTechnique,
  resolveIllustrationAgeProfile
} from './illustrationStyle';

type Palette = {
  start: string;
  end: string;
  glow: string;
  accent: string;
  emoji: string;
};

interface IllustrationCoverInput {
  title?: string;
  subtitle?: string;
  theme?: string;
  ageRange?: string;
  src?: string;
  icon?: string;
}

const ILLUSTRATION_STYLE_OVERRIDE = parseTechniqueOverride(import.meta.env.VITE_ILLUSTRATION_STYLE_OVERRIDE);

const THEME_PALETTES: Record<string, Palette> = {
  adventure: { start: '#203a8f', end: '#0f766e', glow: '#67e8f9', accent: '#fcd34d', emoji: '🧭' },
  friendship: { start: '#7f1d1d', end: '#7e22ce', glow: '#f9a8d4', accent: '#fde68a', emoji: '🤝' },
  magic: { start: '#581c87', end: '#1d4ed8', glow: '#c4b5fd', accent: '#fde68a', emoji: '✨' },
  nature: { start: '#14532d', end: '#1d4ed8', glow: '#86efac', accent: '#bbf7d0', emoji: '🌿' },
  bedtime: { start: '#1e1b4b', end: '#312e81', glow: '#a5b4fc', accent: '#fde68a', emoji: '🌙' },
  calm: { start: '#164e63', end: '#3730a3', glow: '#93c5fd', accent: '#e0e7ff', emoji: '🫧' },
  courage: { start: '#7c2d12', end: '#b91c1c', glow: '#fdba74', accent: '#fde68a', emoji: '🦁' },
  kindness: { start: '#7e22ce', end: '#0f766e', glow: '#fbcfe8', accent: '#a7f3d0', emoji: '💖' },
  space: { start: '#0f172a', end: '#312e81', glow: '#93c5fd', accent: '#fef08a', emoji: '🚀' },
  underwater: { start: '#0f766e', end: '#1d4ed8', glow: '#67e8f9', accent: '#bae6fd', emoji: '🐠' },
  family: { start: '#7c2d12', end: '#4c1d95', glow: '#fdba74', accent: '#fee2e2', emoji: '🏠' }
};

const DEFAULT_PALETTE: Palette = {
  start: '#312e81',
  end: '#0f766e',
  glow: '#c4b5fd',
  accent: '#fde68a',
  emoji: '📚'
};

type AgeLayout = {
  maxLineLength: number;
  titleSizeMain: number;
  titleSizeSecond: number;
  subtitleSize: number;
  iconSize: number;
  circles: number;
  stars: number;
};

const AGE_LAYOUTS: Record<string, AgeLayout> = {
  toddler: {
    maxLineLength: 12,
    titleSizeMain: 88,
    titleSizeSecond: 80,
    subtitleSize: 0,
    iconSize: 230,
    circles: 7,
    stars: 10
  },
  'early-reader': {
    maxLineLength: 14,
    titleSizeMain: 84,
    titleSizeSecond: 76,
    subtitleSize: 30,
    iconSize: 215,
    circles: 9,
    stars: 14
  },
  'middle-grade': {
    maxLineLength: 16,
    titleSizeMain: 78,
    titleSizeSecond: 72,
    subtitleSize: 34,
    iconSize: 190,
    circles: 10,
    stars: 18
  },
  'older-kids': {
    maxLineLength: 18,
    titleSizeMain: 74,
    titleSizeSecond: 68,
    subtitleSize: 34,
    iconSize: 180,
    circles: 11,
    stars: 22
  }
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function compactTitle(text: string, maxLineLength: number, maxLines = 2): string[] {
  const clean = text.trim().replace(/\s+/g, ' ');
  if (!clean) return ['Story'];

  const words = clean.split(' ').slice(0, 8);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxLineLength || !current) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
    if (lines.length >= maxLines) break;
  }

  if (lines.length < maxLines && current) lines.push(current);
  return lines.slice(0, maxLines);
}

function toSeed(input: string): number {
  let seed = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    seed ^= input.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }
  return seed >>> 0;
}

function makeRandom(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state = Math.imul(state, 1664525) + 1013904223;
    return ((state >>> 0) / 4294967295);
  };
}

function buildTechniqueLayers(
  rnd: () => number,
  palette: Palette,
  technique: IllustrationTechnique
): string {
  if (technique === 'watercolor') {
    const blobs: string[] = [];
    for (let i = 0; i < 5; i += 1) {
      const cx = Math.round(150 + rnd() * 900);
      const cy = Math.round(120 + rnd() * 900);
      const rx = Math.round(170 + rnd() * 160);
      const ry = Math.round(130 + rnd() * 160);
      const opacity = (0.10 + rnd() * 0.14).toFixed(3);
      blobs.push(`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${palette.glow}" opacity="${opacity}" filter="url(#softBlur)" />`);
    }
    return blobs.join('');
  }

  if (technique === 'gouache') {
    const blocks: string[] = [];
    for (let i = 0; i < 4; i += 1) {
      const x = Math.round(30 + rnd() * 780);
      const y = Math.round(70 + rnd() * 920);
      const width = Math.round(280 + rnd() * 280);
      const height = Math.round(140 + rnd() * 180);
      const opacity = (0.11 + rnd() * 0.15).toFixed(3);
      blocks.push(`<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="46" fill="${palette.glow}" opacity="${opacity}" />`);
    }
    return blocks.join('');
  }

  if (technique === 'flat-storybook') {
    return `
      <path d="M0 960 L270 760 L520 960 Z" fill="${palette.accent}" opacity="0.18" />
      <path d="M420 980 L820 700 L1200 980 Z" fill="${palette.glow}" opacity="0.15" />
      <circle cx="980" cy="210" r="118" fill="${palette.accent}" opacity="0.18" />`.trim();
  }

  // cut-paper
  return `
    <path d="M0 980 C180 900 320 930 520 880 C690 840 860 850 1200 760 L1200 1600 L0 1600 Z" fill="${palette.glow}" opacity="0.20" filter="url(#paperShadow)" />
    <path d="M0 1110 C240 1020 420 1070 620 1010 C770 970 930 970 1200 910 L1200 1600 L0 1600 Z" fill="${palette.accent}" opacity="0.17" filter="url(#paperShadow)" />
    <path d="M0 1220 C250 1160 470 1200 660 1150 C860 1100 1040 1120 1200 1080 L1200 1600 L0 1600 Z" fill="#ffffff" opacity="0.10" filter="url(#paperShadow)" />`.trim();
}

function buildDecorations(
  seedText: string,
  palette: Palette,
  ageLayout: AgeLayout,
  technique: IllustrationTechnique
): { circles: string; stars: string; layers: string } {
  const rnd = makeRandom(toSeed(seedText));
  const circles: string[] = [];
  const stars: string[] = [];
  const techniqueLayers = buildTechniqueLayers(rnd, palette, technique);

  const techniqueCircleBoost = technique === 'watercolor' ? 2 : technique === 'cut-paper' ? 1 : 0;
  const techniqueStarBoost = technique === 'flat-storybook' ? 3 : technique === 'gouache' ? 1 : 0;
  const circleCount = ageLayout.circles + techniqueCircleBoost;
  const starCount = ageLayout.stars + techniqueStarBoost;

  for (let i = 0; i < circleCount; i += 1) {
    const cx = Math.round(rnd() * 1200);
    const cy = Math.round(rnd() * 1600);
    const r = Math.round(24 + rnd() * 136);
    const opacity = (0.07 + rnd() * 0.14).toFixed(3);
    circles.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${palette.glow}" opacity="${opacity}" />`);
  }

  for (let i = 0; i < starCount; i += 1) {
    const x = Math.round(rnd() * 1140 + 30);
    const y = Math.round(rnd() * 960 + 40);
    const size = (1.4 + rnd() * 3.2).toFixed(2);
    const opacity = (0.45 + rnd() * 0.45).toFixed(3);
    stars.push(`<circle cx="${x}" cy="${y}" r="${size}" fill="${palette.accent}" opacity="${opacity}" />`);
  }

  return {
    layers: techniqueLayers,
    circles: circles.join(''),
    stars: stars.join('')
  };
}

function buildIllustrationDataUri(input: IllustrationCoverInput): string {
  const normalizedTheme = normalizeIllustrationTheme(input.theme);
  const palette = THEME_PALETTES[normalizedTheme] || DEFAULT_PALETTE;
  const technique = resolveIllustrationTechnique(input.theme, ILLUSTRATION_STYLE_OVERRIDE);
  const ageProfile = resolveIllustrationAgeProfile(input.ageRange);
  const layout = AGE_LAYOUTS[ageProfile] || AGE_LAYOUTS['middle-grade'];
  const titleLines = compactTitle(input.title || input.theme || 'Story', layout.maxLineLength, 2);
  const subtitle = (input.subtitle || normalizedTheme || 'Illustrated bedtime story').trim();
  const showSubtitle = Boolean(layout.subtitleSize) && subtitle.length <= 84;
  const icon = input.icon?.trim() || palette.emoji;
  const decorationSeed = `${input.title || ''}|${input.theme || ''}|${input.subtitle || ''}`;
  const { circles, stars, layers } = buildDecorations(decorationSeed, palette, layout, technique);
  const panelStroke = technique === 'cut-paper' ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.14)';
  const panelFillOpacity = technique === 'gouache' ? '0.24' : technique === 'flat-storybook' ? '0.16' : '0.20';
  const techniqueLabel = technique.replace('-', ' ');

  const lineOne = escapeXml(titleLines[0] || 'Story');
  const lineTwo = escapeXml(titleLines[1] || '');
  const subtitleSafe = escapeXml(subtitle);
  const iconSafe = escapeXml(icon);
  const techniqueSafe = escapeXml(techniqueLabel);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.start}" />
      <stop offset="100%" stop-color="${palette.end}" />
    </linearGradient>
    <linearGradient id="glass" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.24)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.08)" />
    </linearGradient>
    <filter id="softBlur">
      <feGaussianBlur stdDeviation="14" />
    </filter>
    <filter id="paperShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.18" />
    </filter>
  </defs>
  <rect width="1200" height="1600" fill="url(#bg)" />
  ${layers}
  ${circles}
  ${stars}
  <circle cx="600" cy="540" r="240" fill="${palette.accent}" opacity="0.18" />
  <circle cx="600" cy="540" r="178" fill="rgba(255,255,255,0.20)" />
  <text x="600" y="590" text-anchor="middle" font-size="${layout.iconSize}" font-family="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif">${iconSafe}</text>
  <rect x="96" y="1080" width="1008" height="390" rx="52" fill="rgba(255,255,255,${panelFillOpacity})" stroke="${panelStroke}" stroke-width="2" />
  <text x="600" y="1220" text-anchor="middle" font-size="${layout.titleSizeMain}" font-weight="700" fill="#ffffff" font-family="'Trebuchet MS','Arial Rounded MT Bold','Arial',sans-serif">${lineOne}</text>
  ${lineTwo ? `<text x="600" y="1306" text-anchor="middle" font-size="${layout.titleSizeSecond}" font-weight="700" fill="#ffffff" font-family="'Trebuchet MS','Arial Rounded MT Bold','Arial',sans-serif">${lineTwo}</text>` : ''}
  ${showSubtitle ? `<text x="600" y="1390" text-anchor="middle" font-size="${layout.subtitleSize}" fill="rgba(255,255,255,0.86)" font-family="'Trebuchet MS','Arial Rounded MT Bold','Arial',sans-serif">${subtitleSafe}</text>` : ''}
  <rect x="92" y="94" width="276" height="56" rx="28" fill="rgba(255,255,255,0.18)" />
  <text x="230" y="130" text-anchor="middle" font-size="28" font-weight="700" fill="#ffffff" font-family="'Trebuchet MS','Arial Rounded MT Bold','Arial',sans-serif">${techniqueSafe}</text>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function getIllustratedImageUrl(input: IllustrationCoverInput): string {
  if (input.src) return input.src;
  return buildIllustrationDataUri(input);
}

export function getStoryCoverUrl(story: Pick<Story, 'title' | 'subtitle' | 'theme' | 'coverUrl' | 'ageRange'>): string {
  return getIllustratedImageUrl({
    title: story.title,
    subtitle: story.subtitle,
    theme: story.theme,
    ageRange: story.ageRange,
    src: story.coverUrl
  });
}
