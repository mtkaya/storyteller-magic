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

## Production Prompt Library (Cover + Story Sequence)

Use this section when you want many consistent images for one story.

### Continuity Lock (append to every scene prompt)

```text
same main character design as previous scene, same costume palette, same world art direction, same brush language, no style drift, no text, no logo, vertical 3:4
```

### Cover Prompts (All Core Themes)

#### Adventure Cover

```text
children's book cover, brave but gentle adventure, winding path, glowing horizon, cozy color grading, expressive friendly character, hand-painted digital illustration, bedtime-friendly mood
```

#### Friendship Cover

```text
children's book cover, warm friendship moment, soft lantern lights, cozy meadow, inviting facial expressions, pastel highlights, hand-painted digital illustration, bedtime-friendly mood
```

#### Magic Cover

```text
children's book cover, enchanted forest clearing, floating sparkles, magical artifacts, dreamy atmosphere, playful wonder, hand-painted digital illustration, bedtime-friendly mood
```

#### Nature Cover

```text
children's book cover, moonlit forest with calm animals, soft leaves, gentle night sky, peaceful bedtime energy, hand-painted digital illustration
```

#### Space Cover

```text
children's book cover, dreamy cosmos, friendly planets and stars, soft nebula clouds, imaginative exploration mood, hand-painted digital illustration
```

#### Underwater Cover

```text
children's book cover, calm underwater world, glowing corals, bubbles, friendly sea creatures, bedtime serenity, hand-painted digital illustration
```

#### Calm Cover

```text
children's book cover, quiet bedtime room, moon glow, sleepy clouds, soft transitions, soothing low-stimulation palette, hand-painted digital illustration
```

#### Bedtime Cover

```text
children's book cover, sleepy village at night, warm window lights, crescent moon, cozy atmosphere, lullaby mood, hand-painted digital illustration
```

#### Courage Cover

```text
children's book cover, tiny hero facing a gentle challenge, warm beam of light, hopeful expressions, comforting heroic framing, hand-painted digital illustration
```

#### Mystery Cover

```text
children's book cover, gentle mystery scene, hidden clues, magical attic corner, glowing dust particles, curious but safe atmosphere, hand-painted digital illustration
```

#### Family Cover

```text
children's book cover, cozy family moment, warm hearth light, caring expressions, safe home mood, bedtime-friendly composition, hand-painted digital illustration
```

#### Kindness Cover

```text
children's book cover, heartwarming helping moment, soft glow, welcoming gestures, gentle pastel warmth, hand-painted digital illustration
```

#### Wonder Cover

```text
children's book cover, twinkling sky discovery, magical awe, soft radiant highlights, curious joyful mood, hand-painted digital illustration
```

#### Wisdom Cover

```text
children's book cover, thoughtful library scene, lantern-lit reading nook, gentle mentor character, calm intellectual warmth, hand-painted digital illustration
```

### Sequential Story Prompts (8 Scenes)

Use one set per story. Replace placeholders:
- `{THEME_FLAVOR}`
- `{MAIN_CHARACTER}`
- `{COMPANION}`
- `{LOCATION}`

#### Scene 1 - Opening

```text
children's book scene, opening moment, {MAIN_CHARACTER} arrives at {LOCATION}, gentle curiosity, readable focal composition, {THEME_FLAVOR}, hand-painted digital illustration, soft bedtime palette
```

#### Scene 2 - Invitation

```text
children's book scene, {COMPANION} presents a small quest to {MAIN_CHARACTER}, warm expressions, story setup, {THEME_FLAVOR}, hand-painted digital illustration, cozy night lighting
```

#### Scene 3 - Journey Begins

```text
children's book scene, first steps into the journey, path details and small magical clues, hopeful movement, {THEME_FLAVOR}, hand-painted digital illustration
```

#### Scene 4 - Choice Point

```text
children's book scene, clear decision moment with two or three safe path options, visual branching, curious pause, {THEME_FLAVOR}, hand-painted digital illustration
```

#### Scene 5 - Mid Adventure

```text
children's book scene, exploration in progress, helpful interaction with a small friend, emotional warmth, {THEME_FLAVOR}, hand-painted digital illustration
```

#### Scene 6 - Climax

```text
children's book scene, gentle emotional peak, challenge resolved through kindness and courage, focused lighting, {THEME_FLAVOR}, hand-painted digital illustration
```

#### Scene 7 - Resolution

```text
children's book scene, peaceful return, calm smiles, world feels safer and brighter, {THEME_FLAVOR}, hand-painted digital illustration, lullaby mood
```

#### Scene 8 - Bedtime Ending

```text
children's book scene, bedtime closure, stars and moon, comforting final frame, sleepy calm atmosphere, {THEME_FLAVOR}, hand-painted digital illustration
```

### Theme Flavor Snippets (for {THEME_FLAVOR})

#### Adventure Flavor

```text
winding path, glowing horizon, brave but gentle momentum
```

#### Friendship Flavor

```text
warm lantern lights, shared smiles, cozy meadow togetherness
```

#### Magic Flavor

```text
enchanted clearing, floating sparkles, playful magical artifacts
```

#### Nature Flavor

```text
moonlit forest, soft leaves, peaceful wildlife presence
```

#### Space Flavor

```text
friendly planets and stars, dreamy nebula clouds, soft cosmic glow
```

#### Underwater Flavor

```text
glowing corals, calm bubbles, friendly sea creatures
```

#### Calm Flavor

```text
quiet room energy, soft gradients, soothing low-contrast composition
```

#### Bedtime Flavor

```text
moonlight lullaby mood, sleepy clouds, warm nighttime comfort
```

#### Courage Flavor

```text
small hero, gentle challenge, hopeful beam of light
```

#### Mystery Flavor

```text
safe hidden clues, curious observation, magical attic atmosphere
```

#### Family Flavor

```text
home warmth, protective togetherness, caring gestures
```

#### Kindness Flavor

```text
helping hands, welcoming expressions, soft glowing empathy
```

#### Wonder Flavor

```text
twinkling discovery, awe and curiosity, radiant magical atmosphere
```

#### Wisdom Flavor

```text
lantern-lit learning, thoughtful calm, gentle mentor presence
```

### Single-Cover-Only Story Mode

Use this when one story uses one main cover image only:

```text
children's book cover for "{TITLE}", {THEME_FLAVOR}, {MAIN_CHARACTER} centered, clear readable silhouette, hand-painted digital illustration, bedtime-friendly mood, rich but gentle palette, vertical 3:4, no text, no logo, no photorealism
```

### Interactive Story Branch Mode

Use these as extra prompts when the story has choices:

```text
children's book scene, choice branch A, optimistic path, safe adventure tone, {THEME_FLAVOR}, same main character design as previous scene, vertical 3:4
```

```text
children's book scene, choice branch B, calm clever path, gentle mystery cues, {THEME_FLAVOR}, same main character design as previous scene, vertical 3:4
```

```text
children's book scene, choice branch C, kindness-first path, warm social interaction, {THEME_FLAVOR}, same main character design as previous scene, vertical 3:4
```
