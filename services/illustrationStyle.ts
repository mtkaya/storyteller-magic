export type IllustrationTechnique = 'watercolor' | 'gouache' | 'flat-storybook' | 'cut-paper';
export type IllustrationAgeProfile = 'toddler' | 'early-reader' | 'middle-grade' | 'older-kids';

const THEME_TECHNIQUES: Record<string, IllustrationTechnique> = {
  adventure: 'gouache',
  friendship: 'watercolor',
  magic: 'cut-paper',
  nature: 'watercolor',
  bedtime: 'watercolor',
  calm: 'flat-storybook',
  courage: 'gouache',
  kindness: 'watercolor',
  space: 'flat-storybook',
  underwater: 'cut-paper',
  family: 'watercolor'
};

const TECHNIQUE_ALIASES: Record<string, IllustrationTechnique> = {
  watercolor: 'watercolor',
  gouache: 'gouache',
  flat: 'flat-storybook',
  'flat-storybook': 'flat-storybook',
  cutpaper: 'cut-paper',
  'cut-paper': 'cut-paper'
};

function normalizeValue(value: string): string {
  return value.trim().toLowerCase();
}

export function parseTechniqueOverride(value: string | undefined): IllustrationTechnique | undefined {
  if (!value) return undefined;
  return TECHNIQUE_ALIASES[normalizeValue(value)];
}

export function normalizeIllustrationTheme(theme: string | undefined): string {
  const normalized = normalizeValue(theme || '');
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

export function resolveIllustrationTechnique(
  theme: string | undefined,
  override?: IllustrationTechnique
): IllustrationTechnique {
  if (override) return override;
  const normalizedTheme = normalizeIllustrationTheme(theme);
  return THEME_TECHNIQUES[normalizedTheme] || 'watercolor';
}

export function parseAgeRange(ageRange: string | undefined): { min: number; max: number } | null {
  if (!ageRange) return null;
  const normalized = ageRange.trim();
  if (!normalized) return null;

  const rangeMatch = normalized.match(/(\d+)\s*(?:-|\u2013)\s*(\d+)/);
  if (rangeMatch) {
    const min = Number(rangeMatch[1]);
    const max = Number(rangeMatch[2]);
    if (Number.isFinite(min) && Number.isFinite(max)) {
      return { min, max };
    }
  }

  const singleMatch = normalized.match(/(\d+)/);
  if (singleMatch) {
    const value = Number(singleMatch[1]);
    if (Number.isFinite(value)) {
      return { min: value, max: value };
    }
  }

  return null;
}

export function resolveIllustrationAgeProfile(ageRange: string | undefined): IllustrationAgeProfile {
  const parsed = parseAgeRange(ageRange);
  if (!parsed) return 'middle-grade';

  if (parsed.max <= 4) return 'toddler';
  if (parsed.max <= 6) return 'early-reader';
  if (parsed.max <= 8) return 'middle-grade';
  return 'older-kids';
}
