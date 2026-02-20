import { Story } from '../types';
import { getLocalizedStoryTitle, getLocalizedThemeName } from './storyLocalization';
import { buildCanvaStoryboardScenes } from './storySceneVisuals';

export interface CanvaPromptRow {
  storyId: string;
  storyTitle: string;
  theme: string;
  sceneNumber: number;
  phase: string;
  prompt: string;
}

interface BuildCanvaPromptRowsOptions {
  language: 'en' | 'tr';
  scenesPerStory?: number;
}

const CSV_HEADERS = ['story_id', 'story_title', 'theme', 'scene_number', 'phase', 'prompt'];

const flattenPrompt = (value: string): string =>
  value
    .replace(/\r/g, '')
    .replace(/\n+/g, ' | ')
    .replace(/\s{2,}/g, ' ')
    .trim();

const toCsvCell = (value: string | number): string => {
  const safeValue = String(value ?? '');
  const escaped = safeValue.replace(/"/g, '""');
  return `"${escaped}"`;
};

export function buildCanvaPromptRows(
  stories: Story[],
  options: BuildCanvaPromptRowsOptions
): CanvaPromptRow[] {
  const language = options.language;
  const scenesPerStory = Math.max(4, Math.min(16, options.scenesPerStory ?? 8));

  return stories.flatMap((story) => {
    const storyTitle = getLocalizedStoryTitle(story, language);
    const theme = getLocalizedThemeName(story.theme, language);
    const scenes = buildCanvaStoryboardScenes(story, language, scenesPerStory);

    return scenes.map((scene) => ({
      storyId: story.id,
      storyTitle,
      theme,
      sceneNumber: scene.sceneNumber,
      phase: scene.phaseLabel,
      prompt: flattenPrompt(scene.prompt),
    }));
  });
}

export function buildCanvaPromptCsv(rows: CanvaPromptRow[]): string {
  const lines = [CSV_HEADERS.map(toCsvCell).join(',')];
  for (const row of rows) {
    lines.push(
      [
        toCsvCell(row.storyId),
        toCsvCell(row.storyTitle),
        toCsvCell(row.theme),
        toCsvCell(row.sceneNumber),
        toCsvCell(row.phase),
        toCsvCell(row.prompt),
      ].join(',')
    );
  }
  return lines.join('\n');
}

export function downloadCanvaPromptCsv(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
