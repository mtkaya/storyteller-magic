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

const DEFAULT_STYLE_PROFILE = {
  technique: 'watercolor wash edges, airy blends, soft dreamy transitions',
  ageDirection: 'ages 4-8, clear emotions, medium detail, bedtime readability',
  tone: 'soft contrast, warm highlights, night-safe cozy mood',
};

const THEME_STYLE_PROFILES = {
  adventure: {
    technique: 'bold gouache brush strokes, rich matte color blocks, clean silhouettes',
    ageDirection: 'ages 6-8, richer environment details, balanced complexity',
    tone: 'gentle cinematic depth with clear focal character',
  },
  friendship: {
    technique: 'watercolor wash edges, airy blends, soft dreamy transitions',
    ageDirection: 'ages 4-7, friendly expressions, low visual noise',
    tone: 'pastel warmth and cozy shared moments',
  },
  magic: {
    technique: 'cut-paper collage layers, tactile overlaps, handcrafted depth',
    ageDirection: 'ages 5-8, layered props, readable magical motifs',
    tone: 'enchanted glow with soft moonlit harmony',
  },
  nature: {
    technique: 'watercolor wash edges, airy blends, soft dreamy transitions',
    ageDirection: 'ages 4-8, calm animals, medium detail',
    tone: 'organic greens and soft moonlight blues',
  },
  calm: {
    technique: 'flat storybook geometry, crisp layered shapes, editorial clarity',
    ageDirection: 'ages 4-7, very readable forms and quiet compositions',
    tone: 'low stimulation, soothing gradients, soft diffused light',
  },
  bedtime: {
    technique: 'flat storybook geometry, crisp layered shapes, editorial clarity',
    ageDirection: 'ages 3-7, simple forms and comforting silhouettes',
    tone: 'night lullaby mood, muted cozy colors',
  },
};

const PHASE_VARIANTS = [
  'opening scene, entering the story world',
  'journey scene, exploration and warm interactions',
  'choice scene, multiple possible paths visible',
  'climax scene, emotional peak with soft dramatic light',
  'resolution scene, peaceful closure and bedtime calm',
];


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

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const buildPrompt = (theme, index) => {
  const profile = THEME_STYLE_PROFILES[theme] || DEFAULT_STYLE_PROFILE;
  const phase = PHASE_VARIANTS[index % PHASE_VARIANTS.length];

  return [
    GLOBAL_STYLE_LOCK,
    `theme: ${theme}`,
    THEME_PROMPTS[theme] || THEME_PROMPTS.magic,
    `style continuity: keep same character design language, brush style, and palette family across all ${theme} scenes`,
    `scene intent: ${phase}`,
    `technique lock: ${profile.technique}`,
    `age direction: ${profile.ageDirection}`,
    `tone lock: ${profile.tone}`,
    'vertical 3:4 composition, no title text, no watermark, bedtime-safe palette, avoid style drift between scenes',
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

const fileExists = (theme, index) => {
  const base = `${theme}-${String(index + 1).padStart(3, '0')}`;
  return fs.existsSync(path.join(OUTPUT_ROOT, theme, `${base}.jpg`));
};

const run = async () => {
  ensureDir(OUTPUT_ROOT);
  let generated = 0;
  let skipped = 0;
  let failed = 0;

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
        failed += 1;
        console.warn(`[skip] ${theme} #${i + 1}: ${lastError?.message || 'unknown error'}`);
      }
    }
  }

  if (!dryRun) {
    execSync('node scripts/build-generated-scene-images.mjs', { stdio: 'inherit', cwd: ROOT });
  }

  console.log(
    `[free-image-gen] themes=${activeThemes.length} generated=${generated} skipped=${skipped} failed=${failed} countPerTheme=${countPerTheme}`
  );
};

run().catch((error) => {
  console.error('[free-image-gen][fatal]', error);
  process.exitCode = 1;
});
