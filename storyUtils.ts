import { Story } from './types';

export interface StoryVisualIdentity {
  companionLabel: string;
  placeLabel: string;
  colorPalette: string[];
  icon: string;
}

const THEME_PALETTES: Record<string, string[]> = {
  Adventure: ['#FFA726', '#FF6F00', '#FFE082'],
  Friendship: ['#66BB6A', '#43A047', '#A5D6A7'],
  Magic: ['#AB47BC', '#8E24AA', '#CE93D8'],
  Nature: ['#26A69A', '#00897B', '#80CBC4'],
  Calm: ['#42A5F5', '#1E88E5', '#90CAF9'],
  Courage: ['#EF5350', '#D32F2F', '#EF9A9A'],
  Wisdom: ['#5C6BC0', '#3949AB', '#9FA8DA'],
  Mystery: ['#7E57C2', '#5E35B1', '#B39DDB'],
  Family: ['#FF7043', '#E64A19', '#FFAB91'],
  Wonder: ['#FFCA28', '#FFB300', '#FFE082'],
  Kindness: ['#EC407A', '#C2185B', '#F48FB1'],
};

const THEME_ICONS: Record<string, string> = {
  Adventure: 'explore',
  Friendship: 'favorite',
  Magic: 'auto_fix_high',
  Nature: 'park',
  Calm: 'cloud',
  Courage: 'shield',
  Wisdom: 'psychology',
  Mystery: 'search',
  Family: 'home',
  Wonder: 'star',
  Kindness: 'volunteer_activism',
};

const DEFAULT_PALETTE = ['#78909C', '#546E7A', '#B0BEC5'];
const DEFAULT_ICON = 'menu_book';

/**
 * Derives visual identity metadata from a Story object.
 * Used for consistent visual branding across Reader and Library views.
 */
export function deriveStoryVisualIdentity(story: Story): StoryVisualIdentity {
  // Use companion if available, otherwise derive from character or theme
  const companionLabel = story.companion
    || (story.character ? `with ${story.character}` : '')
    || story.theme;

  // Use place if available, otherwise derive from theme and title
  const placeLabel = story.place
    || (story.theme ? `in ${story.theme.toLowerCase()} world` : '')
    || 'a magical place';

  // Get color palette based on theme, with fallback
  const colorPalette = THEME_PALETTES[story.theme] || DEFAULT_PALETTE;

  // Get icon based on theme, with fallback
  const icon = THEME_ICONS[story.theme] || DEFAULT_ICON;

  return {
    companionLabel,
    placeLabel,
    colorPalette,
    icon,
  };
}
