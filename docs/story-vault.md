# Local Story Vault

This app now uses a local-first story vault so generation can run without API token costs.

## Where stories are kept

- Base catalog is bundled from:
  - `data.ts` (`LIBRARY_STORIES`, `RECENT_STORIES`)
- Runtime selection/rotation state is persisted in browser storage:
  - `localStorage` key: `storyteller_local_story_rotation_v1`

## How repetition is reduced

- Stories are ranked by theme, duration, language, and interactive mode.
- A per-bucket rotation queue serves a different template each time.
- Recent story IDs are temporarily blocked in the same bucket to avoid quick repeats.
- Interactive stories are expanded at runtime with extra detour branches and choices.

## Scaling to larger catalogs

To add hundreds/thousands of stories without AI cost:

1. Move large static story batches into split data files under `data/` (for example `data/vault/*.ts`).
2. Merge those files into the local pool build step in `services/storyGenerator.ts`.
3. Keep translation fields (`titleTr`, `subtitleTr`, `contentTr`, `paragraphsTr`) populated for Turkish-first UX.
