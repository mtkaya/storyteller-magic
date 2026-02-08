import { Story } from '../types';

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
  src?: string;
  icon?: string;
}

const ILLUSTRATION_ONLY_MODE = (import.meta.env.VITE_ILLUSTRATION_ONLY_MODE ?? 'true').toLowerCase() !== 'false';

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

function normalizeTheme(theme: string | undefined): string {
  const normalized = (theme || '').trim().toLowerCase();
  if (!normalized) return '';
  if (normalized.includes('adventure')) return 'adventure';
  if (normalized.includes('friend')) return 'friendship';
  if (normalized.includes('magic')) return 'magic';
  if (normalized.includes('nature')) return 'nature';
  if (normalized.includes('bedtime')) return 'bedtime';
  if (normalized.includes('calm')) return 'calm';
  if (normalized.includes('courage')) return 'courage';
  if (normalized.includes('kind')) return 'kindness';
  if (normalized.includes('space')) return 'space';
  if (normalized.includes('underwater') || normalized.includes('ocean') || normalized.includes('sea')) return 'underwater';
  if (normalized.includes('family')) return 'family';
  return normalized;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function compactTitle(text: string): string[] {
  const clean = text.trim().replace(/\s+/g, ' ');
  if (!clean) return ['Story'];

  const words = clean.split(' ');
  const maxLineLength = 16;
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
    if (lines.length >= 2) break;
  }

  if (lines.length < 2 && current) lines.push(current);
  return lines.slice(0, 2);
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

function buildDecorations(seedText: string, palette: Palette): { circles: string; stars: string } {
  const rnd = makeRandom(toSeed(seedText));
  const circles: string[] = [];
  const stars: string[] = [];

  for (let i = 0; i < 10; i += 1) {
    const cx = Math.round(rnd() * 1200);
    const cy = Math.round(rnd() * 1600);
    const r = Math.round(28 + rnd() * 120);
    const opacity = (0.07 + rnd() * 0.14).toFixed(3);
    circles.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${palette.glow}" opacity="${opacity}" />`);
  }

  for (let i = 0; i < 18; i += 1) {
    const x = Math.round(rnd() * 1140 + 30);
    const y = Math.round(rnd() * 1000 + 40);
    const size = (1.4 + rnd() * 3.2).toFixed(2);
    const opacity = (0.45 + rnd() * 0.45).toFixed(3);
    stars.push(`<circle cx="${x}" cy="${y}" r="${size}" fill="${palette.accent}" opacity="${opacity}" />`);
  }

  return {
    circles: circles.join(''),
    stars: stars.join('')
  };
}

function buildIllustrationDataUri(input: IllustrationCoverInput): string {
  const normalizedTheme = normalizeTheme(input.theme);
  const palette = THEME_PALETTES[normalizedTheme] || DEFAULT_PALETTE;
  const titleLines = compactTitle(input.title || input.theme || 'Story');
  const subtitle = (input.subtitle || normalizedTheme || 'Illustrated bedtime story').trim();
  const icon = input.icon?.trim() || palette.emoji;
  const decorationSeed = `${input.title || ''}|${input.theme || ''}|${input.subtitle || ''}`;
  const { circles, stars } = buildDecorations(decorationSeed, palette);

  const lineOne = escapeXml(titleLines[0] || 'Story');
  const lineTwo = escapeXml(titleLines[1] || '');
  const subtitleSafe = escapeXml(subtitle);
  const iconSafe = escapeXml(icon);

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
  </defs>
  <rect width="1200" height="1600" fill="url(#bg)" />
  ${circles}
  ${stars}
  <circle cx="600" cy="540" r="240" fill="${palette.accent}" opacity="0.18" />
  <circle cx="600" cy="540" r="178" fill="rgba(255,255,255,0.20)" />
  <text x="600" y="590" text-anchor="middle" font-size="190" font-family="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif">${iconSafe}</text>
  <rect x="96" y="1080" width="1008" height="390" rx="52" fill="url(#glass)" />
  <text x="600" y="1220" text-anchor="middle" font-size="78" font-weight="700" fill="#ffffff" font-family="'Trebuchet MS','Arial Rounded MT Bold','Arial',sans-serif">${lineOne}</text>
  ${lineTwo ? `<text x="600" y="1310" text-anchor="middle" font-size="72" font-weight="700" fill="#ffffff" font-family="'Trebuchet MS','Arial Rounded MT Bold','Arial',sans-serif">${lineTwo}</text>` : ''}
  <text x="600" y="1392" text-anchor="middle" font-size="34" fill="rgba(255,255,255,0.86)" font-family="'Trebuchet MS','Arial Rounded MT Bold','Arial',sans-serif">${subtitleSafe}</text>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function getIllustratedImageUrl(input: IllustrationCoverInput): string {
  if (!ILLUSTRATION_ONLY_MODE && input.src) return input.src;
  return buildIllustrationDataUri(input);
}

export function getStoryCoverUrl(story: Pick<Story, 'title' | 'subtitle' | 'theme' | 'coverUrl'>): string {
  return getIllustratedImageUrl({
    title: story.title,
    subtitle: story.subtitle,
    theme: story.theme,
    src: story.coverUrl
  });
}
