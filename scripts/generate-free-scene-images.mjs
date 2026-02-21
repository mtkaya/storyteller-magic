import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
const OUTPUT_ROOT = path.join(ROOT, 'public', 'images', 'generated');
const DEFAULT_ENDPOINT = 'https://image.pollinations.ai/prompt/';

const GLOBAL_STYLE_LOCK =
  "children's bedtime story illustration, hand-painted digital art, soft painterly shapes, clean composition, whimsical but calm mood, no photorealism, no text watermark, no logo";

const THEME_PROMPTS = {
  adventure: 'brave but gentle adventure, winding path, glowing horizon, expressive friendly character',
  friendship: 'warm friendship moment, cozy meadow, lantern lights, inviting expressions',
  magic: 'enchanted forest clearing, floating sparkles, magical artifacts, dreamy wonder',
  nature: 'moonlit forest with calm animals, soft leaves, peaceful bedtime energy',
  space: 'dreamy cosmos, friendly planets and stars, soft nebula clouds',
  underwater: 'calm underwater world, glowing corals, friendly sea creatures',
  bedtime: 'night nursery mood, moon glow, sleepy clouds and stars',
  calm: 'serene twilight atmosphere, soft mist, gentle transitions',
  courage: 'heroic but gentle horizon, warm beam of light, comforting scale',
  kindness: 'heartwarming scene, soft glow, welcoming shapes and gestures',
  mystery: 'gentle mystery, hidden clues, magical attic ambience',
  family: 'cozy home mood, warm hearth, togetherness and safety',
  wonder: 'twinkling sky, magical discovery moment, awe and curiosity',
  wisdom: 'storybook library mood, lantern light, thoughtful calm expressions',
};

const TECHNIQUE_PRESETS = [
  'watercolor wash edges, airy blends, soft dreamy transitions',
  'bold gouache brush strokes, rich matte color blocks, clean silhouettes',
  'flat storybook geometry, crisp layered shapes, editorial clarity',
  'cut-paper collage layers, tactile overlaps, handcrafted depth',
];

const AGE_PRESETS = [
  'ages 4-6, clear emotions, medium detail',
  'ages 6-8, richer environment details, balanced complexity',
  'ages 8+, nuanced lighting, slightly cinematic framing',
];

const PHASE_VARIANTS = [
  'opening scene, entering the story world',
  'journey scene, exploration and warm interactions',
  'choice scene, multiple possible paths visible',
  'climax scene, emotional peak with soft dramatic light',
  'resolution scene, peaceful closure and bedtime calm',
];

const THEME_PALETTES = {
  adventure: { start: '#203a8f', end: '#0f766e', accent: '#fcd34d' },
  friendship: { start: '#7f1d1d', end: '#7e22ce', accent: '#fde68a' },
  magic: { start: '#581c87', end: '#1d4ed8', accent: '#fde68a' },
  nature: { start: '#14532d', end: '#1d4ed8', accent: '#bbf7d0' },
  space: { start: '#0f172a', end: '#312e81', accent: '#93c5fd' },
  underwater: { start: '#0f766e', end: '#1d4ed8', accent: '#67e8f9' },
  bedtime: { start: '#1e1b4b', end: '#312e81', accent: '#a5b4fc' },
  calm: { start: '#164e63', end: '#3730a3', accent: '#e0e7ff' },
  courage: { start: '#7c2d12', end: '#b91c1c', accent: '#fdba74' },
  kindness: { start: '#7e22ce', end: '#0f766e', accent: '#fbcfe8' },
  mystery: { start: '#312e81', end: '#0f172a', accent: '#c4b5fd' },
  family: { start: '#7c2d12', end: '#4c1d95', accent: '#fee2e2' },
  wonder: { start: '#1d4ed8', end: '#4338ca', accent: '#fef08a' },
  wisdom: { start: '#1f2937', end: '#3730a3', accent: '#fcd34d' },
};

const parseArgs = () => {
  const args = new Map();
  for (const arg of process.argv.slice(2)) {
    if (!arg.startsWith('--')) continue;
    const [key, value] = arg.slice(2).split('=');
    args.set(key, value === undefined ? 'true' : value);
  }
  return args;
};

const args = parseArgs();
const countPerTheme = Math.max(1, Number(args.get('count') || '8'));
const width = Math.max(512, Number(args.get('width') || '768'));
const height = Math.max(512, Number(args.get('height') || '1024'));
const force = args.get('force') === 'true';
const dryRun = args.get('dry-run') === 'true';
const endpoint = (args.get('endpoint') || process.env.FREE_IMAGE_ENDPOINT || DEFAULT_ENDPOINT).trim();
const onlyThemes = (args.get('themes') || '')
  .split(',')
  .map((theme) => theme.trim().toLowerCase())
  .filter(Boolean);
const activeThemes = onlyThemes.length > 0 ? onlyThemes : Object.keys(THEME_PROMPTS);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createRng = (seed) => {
  let state = seed >>> 0;
  return () => {
    state = Math.imul(state, 1664525) + 1013904223;
    return (state >>> 0) / 4294967295;
  };
};

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const buildPrompt = (theme, index) => {
  const technique = TECHNIQUE_PRESETS[index % TECHNIQUE_PRESETS.length];
  const agePreset = AGE_PRESETS[index % AGE_PRESETS.length];
  const phase = PHASE_VARIANTS[index % PHASE_VARIANTS.length];

  return [
    GLOBAL_STYLE_LOCK,
    `theme: ${theme}`,
    THEME_PROMPTS[theme] || THEME_PROMPTS.magic,
    `scene intent: ${phase}`,
    `technique: ${technique}`,
    `audience: ${agePreset}`,
    'vertical 3:4 composition, no title text, no watermark, bedtime-safe palette',
  ].join(', ');
};

const makePollinationsUrl = (prompt, seed) => {
  const base = endpoint.endsWith('/') ? endpoint : `${endpoint}/`;
  const encodedPrompt = encodeURIComponent(prompt);
  const query = new URLSearchParams({
    width: String(width),
    height: String(height),
    seed: String(seed),
    nologo: 'true',
    safe: 'true',
    model: 'flux',
  });
  return `${base}${encodedPrompt}?${query.toString()}`;
};

const fetchImage = async (url, timeoutMs = 90_000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      throw new Error(`Unexpected content-type: ${contentType}`);
    }
    const arrBuf = await response.arrayBuffer();
    return Buffer.from(arrBuf);
  } finally {
    clearTimeout(timeoutId);
  }
};

const writeImage = (theme, index, data) => {
  const themeDir = path.join(OUTPUT_ROOT, theme);
  ensureDir(themeDir);
  const fileName = `${theme}-${String(index + 1).padStart(3, '0')}.jpg`;
  const filePath = path.join(themeDir, fileName);
  fs.writeFileSync(filePath, data);
  return filePath;
};

const writeFallbackSvg = (theme, index, seed) => {
  const themeDir = path.join(OUTPUT_ROOT, theme);
  ensureDir(themeDir);
  const fileName = `${theme}-${String(index + 1).padStart(3, '0')}.svg`;
  const filePath = path.join(themeDir, fileName);

  const palette = THEME_PALETTES[theme] || THEME_PALETTES.magic;
  const rng = createRng(seed);
  const blobs = Array.from({ length: 9 }, () => {
    const cx = Math.round(80 + rng() * 600);
    const cy = Math.round(80 + rng() * 860);
    const rx = Math.round(70 + rng() * 120);
    const ry = Math.round(45 + rng() * 100);
    const opacity = (0.06 + rng() * 0.16).toFixed(3);
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${palette.accent}" opacity="${opacity}" />`;
  }).join('');
  const stars = Array.from({ length: 22 }, () => {
    const x = Math.round(18 + rng() * 732);
    const y = Math.round(12 + rng() * 1012);
    const size = (0.8 + rng() * 2.8).toFixed(2);
    const opacity = (0.42 + rng() * 0.5).toFixed(3);
    return `<circle cx="${x}" cy="${y}" r="${size}" fill="#ffffff" opacity="${opacity}" />`;
  }).join('');

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="768" height="1024" viewBox="0 0 768 1024">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.start}" />
      <stop offset="100%" stop-color="${palette.end}" />
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>
  <rect width="768" height="1024" fill="url(#bg)"/>
  ${blobs}
  ${stars}
  <circle cx="384" cy="430" r="${Math.round(130 + rng() * 60)}" fill="${palette.accent}" opacity="0.22" filter="url(#blur)"/>
  <path d="M120 860 C240 760 360 790 500 730 C590 690 660 700 760 660 L760 1024 L120 1024 Z" fill="#ffffff" opacity="0.08"/>
</svg>
`.trim();

  fs.writeFileSync(filePath, svg, 'utf8');
  return filePath;
};

const fileExists = (theme, index) => {
  const base = `${theme}-${String(index + 1).padStart(3, '0')}`;
  return (
    fs.existsSync(path.join(OUTPUT_ROOT, theme, `${base}.jpg`)) ||
    fs.existsSync(path.join(OUTPUT_ROOT, theme, `${base}.svg`))
  );
};

const run = async () => {
  ensureDir(OUTPUT_ROOT);
  let generated = 0;
  let skipped = 0;

  for (const theme of activeThemes) {
    for (let i = 0; i < countPerTheme; i += 1) {
      if (!force && fileExists(theme, i)) {
        skipped += 1;
        continue;
      }

      const prompt = buildPrompt(theme, i);
      const seed = Math.abs(
        [...`${theme}:${i}`].reduce((acc, char) => (acc * 33 + char.charCodeAt(0)) | 0, 5381)
      );
      const url = makePollinationsUrl(prompt, seed);

      if (dryRun) {
        console.log(`[dry-run] ${theme} #${i + 1} -> ${url}`);
        continue;
      }

      let success = false;
      let lastError = null;

      for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
          const image = await fetchImage(url);
          const savedPath = writeImage(theme, i, image);
          console.log(`[ok] ${theme} #${i + 1} -> ${path.relative(ROOT, savedPath)}`);
          generated += 1;
          success = true;
          break;
        } catch (error) {
          lastError = error;
          console.warn(`[retry ${attempt}/3] ${theme} #${i + 1} failed: ${error.message}`);
          await sleep(700 * attempt);
        }
      }

      if (!success) {
        const fallbackPath = writeFallbackSvg(theme, i, seed);
        console.warn(
          `[fallback-svg] ${theme} #${i + 1} -> ${path.relative(ROOT, fallbackPath)} (${lastError?.message || 'unknown error'})`
        );
        generated += 1;
      }
    }
  }

  if (!dryRun) {
    execSync('node scripts/build-generated-scene-images.mjs', { stdio: 'inherit', cwd: ROOT });
  }

  console.log(
    `[free-image-gen] themes=${activeThemes.length} generated=${generated} skipped=${skipped} countPerTheme=${countPerTheme}`
  );
};

run().catch((error) => {
  console.error('[free-image-gen][fatal]', error);
  process.exitCode = 1;
});
