/**
 * Scene Illustration Prompt Generator
 *
 * Generates prompt files for Canva (CSV) and Gemini (JSON) based on
 * the illustration-prompts.md standards.
 *
 * Usage:
 *   node scripts/generate-scene-prompts.mjs
 *   node scripts/generate-scene-prompts.mjs --gemini  (also generates images via Gemini)
 *
 * Requires GEMINI_API_KEY in .env.local for --gemini mode.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'scripts', 'prompt-output');

// ── Style Constants (from illustration-prompts.md) ──

const STYLE_LOCK = "children's book illustration, hand-painted digital art, soft painterly shapes, clean composition, bedtime-friendly mood, whimsical but calm, no photorealism";
const NEGATIVE_PROMPT = "no photorealism, no realistic camera lens, no real photo texture, no harsh shadows, no horror, no violence, no text watermark, no logo";
const CONTINUITY_LOCK = "same main character design as previous scene, same costume palette, same world art direction, same brush language, no style drift, no text, no logo, vertical 3:4";

// ── Theme Configuration ──

const THEMES = {
  adventure: {
    flavor: 'winding path, glowing horizon, brave but gentle momentum',
    technique: 'gouache',
    character: 'curious young explorer with a small backpack',
    companion: 'a friendly fox companion',
    location: 'a magical forest trail',
  },
  friendship: {
    flavor: 'warm lantern lights, shared smiles, cozy meadow togetherness',
    technique: 'watercolor',
    character: 'a kind young girl with braided hair',
    companion: 'a shy bunny friend',
    location: 'a sunlit meadow near a gentle stream',
  },
  magic: {
    flavor: 'enchanted clearing, floating sparkles, playful magical artifacts',
    technique: 'cut-paper',
    character: 'a young apprentice wizard with a glowing wand',
    companion: 'a mischievous owl familiar',
    location: 'an enchanted forest clearing',
  },
  nature: {
    flavor: 'moonlit forest, soft leaves, peaceful wildlife presence',
    technique: 'watercolor',
    character: 'a gentle young nature guardian',
    companion: 'a calm deer friend',
    location: 'a moonlit ancient forest',
  },
  calm: {
    flavor: 'quiet room energy, soft gradients, soothing low-contrast composition',
    technique: 'flat-storybook',
    character: 'a sleepy child in pajamas',
    companion: 'a fluffy cloud pillow friend',
    location: 'a cozy bedroom with moon glow',
  },
  bedtime: {
    flavor: 'moonlight lullaby mood, sleepy clouds, warm nighttime comfort',
    technique: 'watercolor',
    character: 'a drowsy child holding a teddy bear',
    companion: 'a gentle moon character',
    location: 'a starlit nursery room',
  },
  courage: {
    flavor: 'small hero, gentle challenge, hopeful beam of light',
    technique: 'gouache',
    character: 'a tiny brave knight with a wooden sword',
    companion: 'a loyal puppy squire',
    location: 'a rolling hill with a tower in the distance',
  },
  mystery: {
    flavor: 'safe hidden clues, curious observation, magical attic atmosphere',
    technique: 'cut-paper',
    character: 'a young detective with a magnifying glass',
    companion: 'a curious cat sidekick',
    location: 'a dusty magical attic full of treasures',
  },
  family: {
    flavor: 'home warmth, protective togetherness, caring gestures',
    technique: 'watercolor',
    character: 'a loving parent and child duo',
    companion: 'a family pet dog',
    location: 'a warm living room with fireplace',
  },
  kindness: {
    flavor: 'helping hands, welcoming expressions, soft glowing empathy',
    technique: 'watercolor',
    character: 'a thoughtful child with open arms',
    companion: 'a small injured bird being helped',
    location: 'a garden path with blooming flowers',
  },
  wonder: {
    flavor: 'twinkling discovery, awe and curiosity, radiant magical atmosphere',
    technique: 'flat-storybook',
    character: 'a wide-eyed young stargazer',
    companion: 'a friendly shooting star character',
    location: 'a hilltop observatory under the night sky',
  },
  wisdom: {
    flavor: 'lantern-lit learning, thoughtful calm, gentle mentor presence',
    technique: 'flat-storybook',
    character: 'a studious young reader with round glasses',
    companion: 'a wise old owl on a bookshelf',
    location: 'a lantern-lit library nook',
  },
};

// ── Scene Templates (8 scenes per story) ──

const SCENES = [
  {
    num: 1,
    phase: 'opening',
    template: (t) =>
      `children's book scene, opening moment, ${t.character} arrives at ${t.location}, gentle curiosity, readable focal composition, ${t.flavor}, ${STYLE_LOCK}`,
  },
  {
    num: 2,
    phase: 'invitation',
    template: (t) =>
      `children's book scene, ${t.companion} presents a small quest to ${t.character}, warm expressions, story setup, ${t.flavor}, ${STYLE_LOCK}, cozy night lighting`,
  },
  {
    num: 3,
    phase: 'journey',
    template: (t) =>
      `children's book scene, first steps into the journey, path details and small magical clues, hopeful movement, ${t.flavor}, ${STYLE_LOCK}`,
  },
  {
    num: 4,
    phase: 'choice',
    template: (t) =>
      `children's book scene, clear decision moment with two or three safe path options, visual branching, curious pause, ${t.flavor}, ${STYLE_LOCK}`,
  },
  {
    num: 5,
    phase: 'mid-adventure',
    template: (t) =>
      `children's book scene, exploration in progress, ${t.character} with ${t.companion}, helpful interaction, emotional warmth, ${t.flavor}, ${STYLE_LOCK}`,
  },
  {
    num: 6,
    phase: 'climax',
    template: (t) =>
      `children's book scene, gentle emotional peak, challenge resolved through kindness and courage, focused lighting, ${t.flavor}, ${STYLE_LOCK}`,
  },
  {
    num: 7,
    phase: 'resolution',
    template: (t) =>
      `children's book scene, peaceful return, calm smiles, world feels safer and brighter, ${t.flavor}, ${STYLE_LOCK}, lullaby mood`,
  },
  {
    num: 8,
    phase: 'bedtime-ending',
    template: (t) =>
      `children's book scene, bedtime closure, stars and moon, comforting final frame, sleepy calm atmosphere, ${t.flavor}, ${STYLE_LOCK}`,
  },
];

// ── Technique Presets ──

const TECHNIQUES = {
  watercolor: 'watercolor wash edges, airy blends, soft dreamy transitions, gentle pigment bloom',
  gouache: 'bold gouache brush strokes, rich matte color blocks, confident silhouettes, clean edge control',
  'flat-storybook': 'flat storybook geometry, crisp layered shapes, editorial clarity, simplified perspective',
  'cut-paper': 'cut-paper collage layers, tactile overlaps, handcrafted depth, subtle paper shadow separation',
};

// ── Generate All Prompts ──

function generateAllPrompts() {
  const allPrompts = [];

  for (const [themeName, themeConfig] of Object.entries(THEMES)) {
    const technique = TECHNIQUES[themeConfig.technique] || '';

    for (const scene of SCENES) {
      const basePrompt = scene.template(themeConfig);
      const fullPrompt = `${basePrompt}. Technique: ${technique}. ${CONTINUITY_LOCK}. Negative: ${NEGATIVE_PROMPT}`;
      const filename = `${themeName}-scene-${String(scene.num).padStart(2, '0')}-${scene.phase}.jpg`;

      allPrompts.push({
        theme: themeName,
        scene: scene.num,
        phase: scene.phase,
        filename,
        prompt: fullPrompt,
        technique: themeConfig.technique,
        outputPath: `/images/generated/${themeName}/${filename}`,
      });
    }
  }

  return allPrompts;
}

// ── Export: Canva CSV ──

function exportCanvaCsv(prompts) {
  const header = 'Theme,Scene,Phase,Filename,Prompt';
  const rows = prompts.map(
    (p) => `"${p.theme}","${p.scene}","${p.phase}","${p.filename}","${p.prompt.replace(/"/g, '""')}"`
  );
  return [header, ...rows].join('\n');
}

// ── Export: Gemini JSON ──

function exportGeminiJson(prompts) {
  return JSON.stringify(prompts, null, 2);
}

// ── Export: Copy-Paste Text (for ChatGPT/Canva manual use) ──

function exportReadableText(prompts) {
  const lines = [];
  let currentTheme = '';

  for (const p of prompts) {
    if (p.theme !== currentTheme) {
      currentTheme = p.theme;
      lines.push('');
      lines.push(`═══════════════════════════════════════`);
      lines.push(`  THEME: ${p.theme.toUpperCase()}`);
      lines.push(`  Technique: ${p.technique}`);
      lines.push(`═══════════════════════════════════════`);
    }

    lines.push('');
    lines.push(`── Scene ${p.scene}: ${p.phase} ──`);
    lines.push(`Filename: ${p.filename}`);
    lines.push(`Prompt:`);
    lines.push(p.prompt);
  }

  return lines.join('\n');
}

// ── Main ──

async function main() {
  const prompts = generateAllPrompts();

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // 1. Canva CSV
  const csvPath = path.join(OUTPUT_DIR, 'canva-scene-prompts.csv');
  fs.writeFileSync(csvPath, exportCanvaCsv(prompts), 'utf8');
  console.log(`✅ Canva CSV: ${csvPath} (${prompts.length} prompts)`);

  // 2. Gemini JSON
  const jsonPath = path.join(OUTPUT_DIR, 'gemini-scene-prompts.json');
  fs.writeFileSync(jsonPath, exportGeminiJson(prompts), 'utf8');
  console.log(`✅ Gemini JSON: ${jsonPath}`);

  // 3. Readable text (for copy-paste)
  const txtPath = path.join(OUTPUT_DIR, 'scene-prompts-readable.txt');
  fs.writeFileSync(txtPath, exportReadableText(prompts), 'utf8');
  console.log(`✅ Readable text: ${txtPath}`);

  console.log(`\n📊 Total: ${prompts.length} prompts (${Object.keys(THEMES).length} themes × ${SCENES.length} scenes)`);

  // 4. If --gemini flag, generate images
  if (process.argv.includes('--gemini')) {
    await generateWithGemini(prompts);
  } else {
    console.log(`\n💡 To generate with Gemini: node scripts/generate-scene-prompts.mjs --gemini`);
    console.log(`💡 Or copy prompts from ${txtPath} into Canva/ChatGPT`);
  }
}

// ── Gemini Image Generation ──

async function generateWithGemini(prompts) {
  // Load API key from .env.local
  const envPath = path.join(ROOT, '.env.local');
  let apiKey = '';

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.+)/);
    if (match) apiKey = match[1].trim();
  }

  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    console.error('\n❌ GEMINI_API_KEY not set in .env.local');
    console.error('   Get a free key at: https://aistudio.google.com/apikey');
    process.exit(1);
  }

  console.log(`\n🎨 Generating ${prompts.length} images with Gemini...\n`);

  // Gemini 2.5 Flash Image (native image generation)
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`;
  // Fallback: Imagen 4
  const IMAGEN_URL = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${apiKey}`;

  let generated = 0;
  let failed = 0;

  for (const p of prompts) {
    const outputDir = path.join(ROOT, 'public', 'images', 'generated', p.theme);
    const outputFile = path.join(outputDir, p.filename);

    if (fs.existsSync(outputFile)) {
      console.log(`⏭️  Skip (exists): ${p.filename}`);
      generated++;
      continue;
    }

    fs.mkdirSync(outputDir, { recursive: true });

    try {
      // Try Gemini Flash image generation first
      let imageData = await tryGeminiFlash(GEMINI_URL, p.prompt);

      // Fallback to Imagen 3
      if (!imageData) {
        imageData = await tryImagen(IMAGEN_URL, p.prompt);
      }

      if (imageData) {
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync(outputFile, buffer);
        console.log(`✅ ${p.filename} (${(buffer.length / 1024).toFixed(0)} KB)`);
        generated++;
      } else {
        console.error(`❌ ${p.filename}: No image data from any model`);
        failed++;
      }

      // Rate limit: ~10 RPM for free tier
      await new Promise(resolve => setTimeout(resolve, 7000));

    } catch (err) {
      console.error(`❌ ${p.filename}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Done: ${generated} generated, ${failed} failed`);
}

async function tryImagen(url, prompt) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '3:4',
          safetyFilterLevel: 'block_few',
        },
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const image = data.predictions?.[0]?.bytesBase64Encoded;
    return image || null;
  } catch {
    return null;
  }
}

async function tryGeminiFlash(url, prompt) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Generate an illustration: ${prompt}` }],
        }],
        generationConfig: {
          responseModalities: ['Text', 'Image'],
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.log(`  [gemini] ${response.status}: ${errText.slice(0, 120)}`);
      return null;
    }

    const data = await response.json();
    const imagePart = data.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData
    );
    return imagePart?.inlineData?.data || null;
  } catch (err) {
    console.log(`  [gemini] error: ${err.message}`);
    return null;
  }
}

main().catch(console.error);
