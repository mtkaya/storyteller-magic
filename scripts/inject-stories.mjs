#!/usr/bin/env node
/**
 * Inject generated stories into data.ts
 * Usage: node scripts/inject-stories.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const storiesPath = path.join(ROOT, 'scripts', 'prompt-output', 'generated-stories.json');
const dataPath = path.join(ROOT, 'data.ts');

const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Find existing IDs to avoid duplicates
const existingIds = new Set();
const idMatches = dataContent.matchAll(/id:\s*['"](\d+)['"]/g);
for (const m of idMatches) existingIds.add(m[1]);

// Filter out already-injected stories
const newStories = stories.filter(s => !existingIds.has(s.id));
console.log(`📊 Total generated: ${stories.length}`);
console.log(`📊 Already in data.ts: ${stories.length - newStories.length}`);
console.log(`📊 New to inject: ${newStories.length}`);

if (newStories.length === 0) {
  console.log('✅ All stories already in data.ts');
  process.exit(0);
}

// Generate TypeScript entries
const themeToImage = {
  'Adventure': 'IMAGES.ADVENTURE_COVER',
  'Friendship': 'IMAGES.FRIENDSHIP_COVER',
  'Calm': 'IMAGES.CALM_COVER',
  'Bedtime': 'IMAGES.BEDTIME_COVER',
  'Nature': 'IMAGES.NATURE_COVER',
  'Courage': 'IMAGES.MOONLIGHT_LION',
  'Family': 'IMAGES.FAMILY_COVER',
  'Wisdom': 'IMAGES.WISDOM_COVER',
  'Mystery': 'IMAGES.DETECTIVE_MOUSE',
  'Kindness': 'IMAGES.KINDNESS_COVER',
  'Wonder': 'IMAGES.WONDER_COVER',
  'Magic': 'IMAGES.MAGIC_COVER',
};

function escapeStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

const entries = newStories.map(s => {
  const coverRef = themeToImage[s.theme] || 'IMAGES.DEFAULT_COVER';
  const contentLines = s.content.map(p => `      "${escapeStr(p)}"`).join(',\n');
  const contentTrLines = s.contentTr.map(p => `      "${escapeStr(p)}"`).join(',\n');

  return `  {
    id: '${s.id}',
    title: "${escapeStr(s.title)}",
    titleTr: "${escapeStr(s.titleTr)}",
    subtitle: "${escapeStr(s.subtitle)}",
    duration: "${s.duration}",
    theme: '${s.theme}',
    coverUrl: ${coverRef},
    character: '${escapeStr(s.character)}',
    ageRange: '${s.ageRange}',
    moral: "${escapeStr(s.moral)}",
    content: [
${contentLines}
    ],
    contentTr: [
${contentTrLines}
    ]
  }`;
}).join(',\n');

// Find the closing bracket of LIBRARY_STORIES array
const insertMarker = '\n]; // END LIBRARY_STORIES';
const closingPattern = /\n\s*\];\s*(?:\/\/.*)?$/m;

// Find last ]; in the file (end of LIBRARY_STORIES)
const lastArrayClose = dataContent.lastIndexOf('\n];');
if (lastArrayClose === -1) {
  console.error('❌ Could not find end of LIBRARY_STORIES array');
  process.exit(1);
}

const before = dataContent.slice(0, lastArrayClose);
const after = dataContent.slice(lastArrayClose);

// Check if last entry has trailing comma
const trimmed = before.trimEnd();
const needsComma = !trimmed.endsWith(',');

const newContent = before + (needsComma ? ',' : '') + '\n\n  // ═══════════════════════════════════════════\n  // AUTO-GENERATED STORIES (Turkish Characters)\n  // ═══════════════════════════════════════════\n' + entries + after;

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log(`✅ Injected ${newStories.length} stories into data.ts`);

// Verify
const newData = fs.readFileSync(dataPath, 'utf8');
const totalIds = [...newData.matchAll(/id:\s*['"](\d+)['"]/g)].length;
console.log(`📊 Total stories in data.ts: ${totalIds}`);
