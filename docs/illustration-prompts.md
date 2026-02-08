# Illustration Prompt Pack

Use these prompts when generating story covers so outputs stay in an illustrated style.

## Global Style Lock

Always include this in every prompt:

```text
children's book illustration, hand-painted digital art, soft painterly shapes, clean composition, bedtime-friendly mood, whimsical but calm, no photorealism
```

Always include this negative prompt:

```text
no photorealism, no realistic camera lens, no real photo texture, no harsh shadows, no horror, no violence, no text watermark, no logo
```

## Theme Prompt Starters

### Adventure

```text
children's book cover, brave but gentle adventure, winding path, glowing horizon, cozy color grading, expressive friendly character
```

### Friendship

```text
children's book cover, warm friendship moment, soft lantern lights, cozy meadow, inviting facial expressions, pastel highlights
```

### Magic

```text
children's book cover, enchanted forest clearing, floating sparkles, magical artifacts, dreamy atmosphere, playful wonder
```

### Nature

```text
children's book cover, moonlit forest with calm animals, soft leaves, gentle night sky, peaceful bedtime energy
```

### Space

```text
children's book cover, dreamy cosmos, friendly planets and stars, soft nebula clouds, imaginative exploration mood
```

### Underwater

```text
children's book cover, calm underwater world, glowing corals, bubbles, friendly sea creatures, bedtime serenity
```

## Technique Presets

### Watercolor

```text
watercolor wash edges, airy blends, soft dreamy transitions, gentle pigment bloom
```

### Gouache

```text
bold gouache brush strokes, rich matte color blocks, confident silhouettes, clean edge control
```

### Flat Storybook

```text
flat storybook geometry, crisp layered shapes, editorial clarity, simplified perspective
```

### Cut-Paper

```text
cut-paper collage layers, tactile overlaps, handcrafted depth, subtle paper shadow separation
```

## Age Direction Profiles

### Ages 2-4

```text
very simple forms, large focal character, low visual noise, high readability
```

### Ages 4-6

```text
clear emotions, simple environment cues, medium detail, friendly rhythm
```

### Ages 6-8

```text
richer environment details, layered storytelling props, balanced complexity
```

### Ages 8+

```text
cinematic framing, nuanced lighting, deeper world detail, stronger atmosphere
```

## Full Prompt Template

```text
Children's book cover illustration for "{TITLE}".
Theme: {THEME}.
Main character: {CHARACTER}.
Mood: {TONE}.
Scene: {SCENE_DESCRIPTION}.
Technique preset: {TECHNIQUE}.
Age direction: {AGE_PROFILE}.
Style: children's book illustration, hand-painted digital art, soft painterly shapes, clean composition, bedtime-friendly mood, whimsical but calm.
Color direction: rich but gentle palette, warm highlights, soft contrast.
Framing: vertical 3:4, centered focal character, readable cover composition.
Negative prompt: no photorealism, no realistic camera lens, no real photo texture, no harsh shadows, no horror, no violence, no text watermark, no logo.
```

## App Defaults

- Theme-based technique auto-selection:
  - `adventure`, `courage`: `gouache`
  - `friendship`, `nature`, `bedtime`, `kindness`, `family`: `watercolor`
  - `space`, `calm`: `flat-storybook`
  - `magic`, `underwater`: `cut-paper`
- Age range auto-adjusts composition density and text hierarchy.
- Optional override: `VITE_ILLUSTRATION_STYLE_OVERRIDE=watercolor|gouache|flat-storybook|cut-paper`

## Quick Try

1. Create a story in the app.
2. Open the result screen.
3. Use `Copy Prompt`.
4. Paste into your image model.
5. Keep image ratio at `3:4`.
