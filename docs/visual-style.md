# Visual Style Guidelines (Draft)

This document outlines the visual style for Storyteller-Magic MVP. It references existing prompts/docs to ensure consistency.

## Color & Palette
- Base palette based on pastel/soft tones: blue, mint, peach, lavender.
- Primary action accents in warm orange or teal.
- Accessibility: ensure contrast ratios >= 4.5:1 for text on colored backgrounds.

## Illustrations & Icons
- Use prompts from illustration-prompts.md and canva-scene-visuals.md.
- Styles: watercolor, gouache, flat-storybook, cut-paper. Global override via VITE_ILLUSTRATION_STYLE_OVERRIDE.
- Characters and places should have friendly round shapes; avoid scary imagery for age ranges.

## Typography
- Readable sans-serif for UI, serif option for headings (Noto Serif).
- Size hierarchy: large titles, medium subtitles, readable body text.

## Story Visual Identity
- Use deriveStoryVisualIdentity to produce colorPalette, icons for companion/place, and badge colors.

## UI Motifs
- Rounded corners, soft shadows, accessible focus states.
