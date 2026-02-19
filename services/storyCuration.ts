import { Story } from '../types';

interface StoryRankOptions {
  favorites?: string[];
  themeCounts?: Record<string, number>;
  hour?: number;
}

interface RankedStory {
  story: Story;
  score: number;
  tieBreaker: number;
}

const NIGHT_THEMES = new Set(['calm', 'sleep', 'bedtime', 'dreams']);
const DAY_ADVENTURE_THEMES = new Set(['adventure', 'magic', 'mystery', 'wonder', 'space']);

const THEME_STORY_SEEDS: Record<string, string[]> = {
  adventure: ['a curious path', 'a brave little plan', 'a joyful discovery'],
  friendship: ['a warm hello', 'a shared promise', 'a kind surprise'],
  magic: ['a sparkling clue', 'a gentle spell', 'a wonder-filled moment'],
  nature: ['a whispering forest', 'a glowing meadow', 'a peaceful breeze'],
  calm: ['a moonlit room', 'a quiet breath', 'a cozy pause'],
  courage: ['a tiny fear', 'a bold step', 'a proud smile'],
  wisdom: ['a thoughtful question', 'a patient answer', 'a gentle lesson'],
  mystery: ['a hidden sign', 'a careful clue', 'a clever answer'],
  family: ['a loving hug', 'a safe home', 'a shared laugh'],
  wonder: ['a twinkling sky', 'a bright idea', 'a beautiful ending'],
};

const THEME_MORAL_FALLBACKS: Record<string, string> = {
  adventure: 'Every new step becomes easier when taken with courage and care.',
  friendship: 'Kind words and shared moments make friendships stronger.',
  magic: 'The brightest magic comes from kindness, curiosity, and imagination.',
  nature: 'When we listen to nature, we discover calm and wonder together.',
  calm: 'Slow breaths and gentle thoughts help us feel safe and peaceful.',
  courage: 'Bravery means moving forward with a kind heart, even when nervous.',
  wisdom: 'Asking questions and listening closely leads to true wisdom.',
  mystery: 'Patience and attention reveal answers hidden in plain sight.',
  family: 'Love grows stronger when families care for one another every day.',
  wonder: 'Small moments can feel magical when we notice them with gratitude.',
};

export function normalizeStoryTheme(theme: string | undefined): string {
  return (theme || '').trim().toLowerCase();
}

export function parseDurationMinutes(duration: string | undefined): number {
  if (!duration) return 10;
  const match = duration.match(/(\d+)/);
  if (!match) return 10;
  return Number(match[1]) || 10;
}

export function hasPlayableStoryData(story: Story): boolean {
  const hasLinear = (story.content && story.content.length > 0) || (story.contentTr && story.contentTr.length > 0);
  const hasInteractive = Boolean(story.isInteractive && story.branches && story.branches.length > 0);
  return hasLinear || hasInteractive;
}

const buildFallbackCharacter = (story: Story): string => {
  if (story.character && story.character.trim().length > 0) return story.character.trim();

  const titleTokens = story.title
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  const preferred = titleTokens.find((token) => token[0] === token[0]?.toUpperCase() && token.length > 2);
  if (preferred) return preferred;
  return 'Little Explorer';
};

const buildFallbackContent = (story: Story): string[] => {
  const theme = normalizeStoryTheme(story.theme) || 'adventure';
  const seeds = THEME_STORY_SEEDS[theme] || THEME_STORY_SEEDS.adventure;
  const character = buildFallbackCharacter(story);
  const title = story.title;

  return [
    `One calm evening, ${character} stepped into the world of "${title}" with bright and curious eyes.`,
    `The path ahead hinted at ${seeds[0]}, and ${character} chose to move forward with a gentle smile.`,
    `Along the way, a small challenge appeared, but ${character} stayed patient and listened carefully.`,
    `${character} discovered ${seeds[1]}, and everything started to make a little more sense.`,
    `With each step, the journey opened into ${seeds[2]}, turning worry into excitement.`,
    `Soon, friends and helpers gathered around, reminding ${character} that no one has to walk alone.`,
    `When the adventure settled down, ${character} looked back proudly at how far they had come.`,
    `At bedtime, the story closed softly, and ${character} carried that warm feeling into sweet dreams.`,
  ];
};

const ensurePlayableStory = (story: Story): Story => {
  if (hasPlayableStoryData(story)) return story;

  const theme = normalizeStoryTheme(story.theme);
  return {
    ...story,
    character: buildFallbackCharacter(story),
    ageRange: story.ageRange || '4-7',
    moral: story.moral || THEME_MORAL_FALLBACKS[theme] || THEME_MORAL_FALLBACKS.adventure,
    content: buildFallbackContent(story),
  };
};

export function buildStoryPool(...storyLists: Story[][]): Story[] {
  const byId = new Map<string, Story>();
  for (const list of storyLists) {
    for (const story of list) {
      const existing = byId.get(story.id);
      if (!existing) {
        byId.set(story.id, story);
        continue;
      }

      if (!hasPlayableStoryData(existing) && hasPlayableStoryData(story)) {
        byId.set(story.id, story);
      }
    }
  }

  return Array.from(byId.values()).map(ensurePlayableStory);
}

function toSeededNumber(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function isNightHour(hour: number): boolean {
  return hour >= 20 || hour < 7;
}

function scoreStory(story: Story, options: StoryRankOptions): number {
  const favorites = options.favorites || [];
  const themeCounts = options.themeCounts || {};
  const hour = options.hour ?? new Date().getHours();
  const theme = normalizeStoryTheme(story.theme);
  const duration = parseDurationMinutes(story.duration);
  const themeReadCount = themeCounts[theme] || 0;

  let score = 10;

  if (hasPlayableStoryData(story)) score += 45;
  if (favorites.includes(story.id)) score += 40;
  if (story.isInteractive) score += 8;

  score += Math.min(themeReadCount, 8) * 4;

  if (isNightHour(hour)) {
    if (NIGHT_THEMES.has(theme)) score += 14;
    if (duration <= 8) score += 10;
  } else {
    if (DAY_ADVENTURE_THEMES.has(theme)) score += 8;
    if (duration >= 10) score += 4;
  }

  return score;
}

function rankStories(stories: Story[], options: StoryRankOptions): RankedStory[] {
  const dateSeed = new Date().toISOString().slice(0, 10);
  return stories
    .map((story) => ({
      story,
      score: scoreStory(story, options),
      tieBreaker: toSeededNumber(`${dateSeed}|${story.id}`),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.tieBreaker - b.tieBreaker;
    });
}

function pickUniqueStories(candidates: Story[], limit: number, excludedIds: Set<string> = new Set()): Story[] {
  const selected: Story[] = [];
  for (const story of candidates) {
    if (selected.length >= limit) break;
    if (excludedIds.has(story.id)) continue;
    selected.push(story);
  }
  return selected;
}

export function rankStoriesForLibrary(stories: Story[], options: StoryRankOptions): Story[] {
  const ranked = rankStories(stories, options);
  return ranked
    .filter((item) => hasPlayableStoryData(item.story))
    .map((item) => item.story);
}

export function getTopThemeFilters(stories: Story[], limit: number = 6): Array<{ id: string; label: string; count: number }> {
  const themeMap = new Map<string, { label: string; count: number }>();

  for (const story of stories) {
    const id = normalizeStoryTheme(story.theme);
    if (!id) continue;

    const current = themeMap.get(id);
    if (current) {
      current.count += 1;
    } else {
      themeMap.set(id, { label: story.theme || id, count: 1 });
    }
  }

  return Array.from(themeMap.entries())
    .map(([id, meta]) => ({ id, label: meta.label, count: meta.count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit);
}

export function getCuratedHomeShelves(stories: Story[], options: StoryRankOptions) {
  const rankedStories = rankStoriesForLibrary(stories, options);
  const favorites = options.favorites || [];
  const excluded = new Set<string>();

  const featured = pickUniqueStories(rankedStories, 8, excluded);
  featured.forEach((story) => excluded.add(story.id));

  const bedtimeCandidates = rankedStories.filter((story) => {
    const theme = normalizeStoryTheme(story.theme);
    return NIGHT_THEMES.has(theme) || parseDurationMinutes(story.duration) <= 8;
  });
  const bedtime = pickUniqueStories(bedtimeCandidates, 6);

  const interactive = pickUniqueStories(
    rankedStories.filter((story) => story.isInteractive && hasPlayableStoryData(story)),
    6
  );

  const favoriteStories = pickUniqueStories(
    rankedStories.filter((story) => favorites.includes(story.id)),
    6
  );

  return {
    featured,
    bedtime,
    interactive,
    favoriteStories,
    rankedStories,
  };
}
