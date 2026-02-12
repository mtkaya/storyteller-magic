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

export function buildStoryPool(...storyLists: Story[][]): Story[] {
  const byId = new Map<string, Story>();
  for (const list of storyLists) {
    for (const story of list) {
      if (!byId.has(story.id)) {
        byId.set(story.id, story);
      }
    }
  }
  return Array.from(byId.values());
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
  const playable = ranked.filter((item) => hasPlayableStoryData(item.story)).map((item) => item.story);
  const placeholders = ranked.filter((item) => !hasPlayableStoryData(item.story)).map((item) => item.story);
  return [...playable, ...placeholders];
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
