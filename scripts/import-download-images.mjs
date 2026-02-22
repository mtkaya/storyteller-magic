import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const DOWNLOADS = path.join(os.homedir(), 'Downloads');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'images');
const GENERATED_ROOT = path.join(PUBLIC_IMAGES, 'generated');
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const normalizeText = (value) =>
  value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const isImageFile = (fileName) => ALLOWED_EXT.has(path.extname(fileName).toLowerCase());

const findCandidateDir = (needle) => {
  if (!fs.existsSync(DOWNLOADS)) return null;
  const entries = fs.readdirSync(DOWNLOADS, { withFileTypes: true });
  const found = entries.find(
    (entry) => entry.isDirectory() && normalizeText(entry.name).includes(needle)
  );
  return found ? path.join(DOWNLOADS, found.name) : null;
};

const THEME_KEYWORDS = [
  { theme: 'adventure', terms: ['adventure', 'journey', 'flying carpet', 'carpet', 'rocket'] },
  { theme: 'friendship', terms: ['friend', 'tea party', 'sharing', 'cookies', 'bunny and a bear', 'foxes cuddling'] },
  { theme: 'magic', terms: ['magical', 'magic', 'sparkles', 'fairy', 'quill', 'treasure chest'] },
  { theme: 'nature', terms: ['forest', 'deer', 'turtle', 'rabbit', 'bird', 'oak tree'] },
  { theme: 'calm', terms: ['sleeping', 'peaceful', 'moon', 'serene', 'cozy'] },
  { theme: 'bedtime', terms: ['bedtime', 'sleepy', 'lullaby'] },
  { theme: 'courage', terms: ['brave', 'lion', 'noble', 'wolf'] },
  { theme: 'wisdom', terms: ['wise', 'teaching', 'library', 'owl'] },
  { theme: 'mystery', terms: ['detective', 'mystery', 'clue', 'confused'] },
  { theme: 'kindness', terms: ['kind', 'helping', 'grateful'] },
  { theme: 'family', terms: ['sibling', 'family', 'cuddling'] },
  { theme: 'wonder', terms: ['wonder', 'stars', 'twinkling'] },
];

const detectThemeFromName = (fileName) => {
  const normalized = normalizeText(fileName).replace(/[_-]+/g, ' ');
  for (const entry of THEME_KEYWORDS) {
    if (entry.terms.some((term) => normalized.includes(term))) return entry.theme;
  }
  return 'magic';
};

const slugify = (value) =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const importCoversFromStorytellImages = (sourceDir) => {
  if (!sourceDir || !fs.existsSync(sourceDir)) return { copied: 0 };
  const files = fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name));

  let copied = 0;
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file.name);
    const targetPath = path.join(PUBLIC_IMAGES, file.name);
    fs.copyFileSync(sourcePath, targetPath);
    copied += 1;
  }
  return { copied };
};

const importGeneratedScenes = (sourceDir) => {
  if (!sourceDir || !fs.existsSync(sourceDir)) return { copied: 0, byTheme: {} };
  const files = fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name));

  const byTheme = {};
  let copied = 0;

  for (const file of files) {
    const theme = detectThemeFromName(file.name);
    byTheme[theme] = (byTheme[theme] || 0) + 1;
    const sourcePath = path.join(sourceDir, file.name);
    const ext = path.extname(file.name).toLowerCase() === '.jpeg' ? '.jpg' : path.extname(file.name).toLowerCase();
    const fileBase = slugify(path.basename(file.name, path.extname(file.name))) || 'scene';
    const targetDir = path.join(GENERATED_ROOT, theme);
    ensureDir(targetDir);

    const targetFileName = `${theme}-${fileBase}${ext}`;
    const targetPath = path.join(targetDir, targetFileName);
    fs.copyFileSync(sourcePath, targetPath);
    copied += 1;
  }

  return { copied, byTheme };
};

const main = () => {
  ensureDir(PUBLIC_IMAGES);
  ensureDir(GENERATED_ROOT);

  const storytellDir = findCandidateDir('storytell-images');
  const gorselDir = findCandidateDir('gorsel');

  const coverResult = importCoversFromStorytellImages(storytellDir);
  const sceneResult = importGeneratedScenes(gorselDir);

  execSync('node scripts/build-generated-scene-images.mjs', { cwd: ROOT, stdio: 'inherit' });

  console.log(`[import-images] covers_copied=${coverResult.copied} scenes_copied=${sceneResult.copied}`);
  console.log(`[import-images] theme_distribution=${JSON.stringify(sceneResult.byTheme)}`);
  console.log(`[import-images] source_storytell=${storytellDir || 'not-found'}`);
  console.log(`[import-images] source_gorsel=${gorselDir || 'not-found'}`);
};

main();
