#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'public', 'audio');
const ATTRIBUTION_JSON_PATH = path.join(OUTPUT_DIR, 'openverse-attribution.json');
const ATTRIBUTION_MD_PATH = path.join(OUTPUT_DIR, 'openverse-attribution.md');

const DEFAULT_AUDIO_BASES = [
  'https://api.openverse.engineering/v1/audio/',
  'https://api.openverse.org/v1/audio/'
];

const ALLOWED_LICENSES = new Set(['cc0', 'pdm', 'by', 'by-sa', 'by-nd']);
const DENY_TITLE_PATTERN = /\b(podcast|speech|voice.?over|narration|audiobook|talk)\b/i;

const TRACK_SPECS = [
  {
    id: 'lullaby',
    fileName: 'lullaby-light.mp3',
    query: 'lullaby',
    fallbackQueries: [
      'music box lullaby instrumental calm sleep',
      'soft bedtime instrumental'
    ],
    minDurationSec: 45,
    maxDurationSec: 600,
    targetDurationSec: 180
  },
  {
    id: 'starlight',
    fileName: 'starlight-piano.mp3',
    query: 'soft piano ambient night stars instrumental',
    fallbackQueries: [
      'dreamy piano ambient instrumental calm',
      'night piano lullaby instrumental'
    ],
    minDurationSec: 45,
    maxDurationSec: 600,
    targetDurationSec: 200
  },
  {
    id: 'rain',
    fileName: 'soft-rain.mp3',
    query: 'rain ambience',
    fallbackQueries: [
      'soft rain ambience',
      'rain ambience loop'
    ],
    minDurationSec: 45,
    maxDurationSec: 480,
    targetDurationSec: 220,
    maxFileSizeBytes: 8_500_000
  },
  {
    id: 'forest',
    fileName: 'forest-night.mp3',
    query: 'night forest ambience birds wind calm',
    minDurationSec: 45,
    maxDurationSec: 480,
    targetDurationSec: 220,
    maxFileSizeBytes: 8_500_000
  },
  {
    id: 'ocean',
    fileName: 'ocean-waves.mp3',
    query: 'ocean waves ambience calm relaxing',
    minDurationSec: 45,
    maxDurationSec: 480,
    targetDurationSec: 250,
    maxFileSizeBytes: 8_500_000
  },
  {
    id: 'fireplace',
    fileName: 'warm-fireplace.mp3',
    query: 'fireplace crackling ambience warm',
    fallbackQueries: [
      'fire crackling ambience',
      'campfire ambience crackle'
    ],
    minDurationSec: 45,
    maxDurationSec: 1800,
    targetDurationSec: 260
  },
  {
    id: 'wind',
    fileName: 'gentle-wind.mp3',
    query: 'gentle wind ambience calm night',
    minDurationSec: 45,
    maxDurationSec: 1800,
    targetDurationSec: 260
  }
];

function printUsage() {
  console.log(`
Usage:
  node scripts/sync-openverse-audio.mjs [options]

Options:
  --force               Re-download tracks even if local files exist
  --dry-run             Search and resolve sources without downloading
  --max-pages <n>       Search page depth per query (default: 4)
  --page-size <n>       Results page size 10..20 (default: 20)
  --timeout-ms <n>      Per-request timeout in ms (default: 12000)
  --help                Show help

Environment:
  OPENVERSE_API_BASE_URL
    Optional override for API base URL.
    Examples:
      https://api.openverse.engineering/v1/audio/
      https://api.openverse.org/v1/audio/
  `);
}

function parseArgs(argv) {
  const options = {
    force: false,
    dryRun: false,
    maxPages: 4,
    pageSize: 20,
    timeoutMs: 12000
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--force') {
      options.force = true;
      continue;
    }
    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }
    if (arg === '--max-pages') {
      options.maxPages = Math.max(1, Number(argv[i + 1]) || 4);
      i += 1;
      continue;
    }
    if (arg === '--page-size') {
      options.pageSize = Math.max(10, Math.min(20, Number(argv[i + 1]) || 20));
      i += 1;
      continue;
    }
    if (arg === '--timeout-ms') {
      options.timeoutMs = Math.max(1500, Number(argv[i + 1]) || 12000);
      i += 1;
      continue;
    }
    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function normalizeAudioBaseUrl(raw) {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return null;

  const withoutQuery = trimmed.replace(/\?.*$/, '');
  let base = withoutQuery.endsWith('/') ? withoutQuery : `${withoutQuery}/`;
  if (!/\/audio\/?$/i.test(base)) {
    if (!/\/v1\/$/i.test(base)) {
      if (/\/v1\/audio\//i.test(base)) {
        return base;
      }
      base = `${base.replace(/\/+$/, '')}/v1/`;
    }
    base = `${base}audio/`;
  }
  return base;
}

function resolveApiBases() {
  const bases = [];
  const configured = normalizeAudioBaseUrl(process.env.OPENVERSE_API_BASE_URL);
  if (configured) bases.push(configured);

  for (const candidate of DEFAULT_AUDIO_BASES) {
    const normalized = normalizeAudioBaseUrl(candidate);
    if (normalized) bases.push(normalized);
  }

  return [...new Set(bases)];
}

function toNumeric(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeLicense(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/^license[:\s-]*/, '')
    .replace(/^cc-/, '')
    .replace(/^creativecommons-/, '');
}

function looksLikeMp3(result) {
  const filetype = String(result.filetype || '').toLowerCase();
  if (filetype === 'mp3' || filetype === 'mpeg') return true;
  const url = String(result.url || '');
  return /\.mp3(\?|$)/i.test(url);
}

function evaluateCandidate(result, spec) {
  if (!result || typeof result !== 'object') return null;
  const url = String(result.url || '').trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) return null;
  if (!looksLikeMp3(result)) return null;

  const license = normalizeLicense(result.license);
  if (!ALLOWED_LICENSES.has(license)) return null;

  const title = String(result.title || '').trim();
  if (DENY_TITLE_PATTERN.test(title)) return null;

  const duration = toNumeric(result.duration);
  const bitRate = toNumeric(result.bit_rate);
  const fileSize = toNumeric(result.filesize);
  const maxFileSize = toNumeric(spec.maxFileSizeBytes) || 12_000_000;
  if (fileSize !== null && fileSize > maxFileSize) return null;
  const tags = Array.isArray(result.tags)
    ? result.tags
        .map((tag) => {
          if (typeof tag === 'string') return tag.toLowerCase();
          if (tag && typeof tag.name === 'string') return tag.name.toLowerCase();
          return '';
        })
        .filter(Boolean)
    : [];

  let score = 0;
  if (duration !== null) {
    if (duration >= spec.minDurationSec && duration <= spec.maxDurationSec) {
      score += 30;
      score += Math.max(0, 18 - Math.abs(duration - spec.targetDurationSec) / 12);
    } else {
      score -= 18;
    }
  }
  if (bitRate !== null) score += bitRate >= 128 ? 5 : bitRate >= 96 ? 3 : 1;
  if (fileSize !== null) {
    if (fileSize <= 450_000) score -= 3;
    else if (fileSize <= 950_000) score += 1;
    else if (fileSize <= 4_000_000) score += 4;
    else if (fileSize <= 8_500_000) score += 2;
    else score -= 2;
  }
  if (tags.some((tag) => /loop|ambient|calm|sleep|night/.test(tag))) score += 5;
  if (/loop|ambient|calm|sleep|night/i.test(title)) score += 6;
  if (/children|kid|story/i.test(title)) score -= 4;

  return {
    score,
    result,
    normalized: {
      id: result.id || null,
      title,
      url,
      license,
      creator: String(result.creator || '').trim() || null,
      creatorUrl: String(result.creator_url || '').trim() || null,
      licenseUrl: String(result.license_url || '').trim() || null,
      source: String(result.source || '').trim() || null,
      provider: String(result.provider || '').trim() || null,
      foreignLandingUrl: String(result.foreign_landing_url || '').trim() || null,
      duration: duration,
      bitRate: bitRate,
      fileSize: fileSize
    }
  };
}

async function fetchJson(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'storyteller-magic-openverse-sync/1.0'
      },
      signal: controller.signal
    });

    const rawText = await response.text();
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}: ${rawText.slice(0, 200)}`);
    }

    return JSON.parse(rawText);
  } finally {
    clearTimeout(timer);
  }
}

async function findBestMatch(spec, options, apiBases) {
  let best = null;
  let lastError = null;
  const searchQueries = [spec.query, ...(spec.fallbackQueries || [])];

  for (const query of searchQueries) {
    for (const baseUrl of apiBases) {
      for (let page = 1; page <= options.maxPages; page += 1) {
        const params = new URLSearchParams({
          q: query,
          page: String(page),
          page_size: String(options.pageSize),
          mature: 'false',
          license: 'pdm,cc0,by,by-sa,by-nd'
        });
        const searchUrl = `${baseUrl}?${params.toString()}`;

        try {
          const payload = await fetchJson(searchUrl, options.timeoutMs);
          const results = Array.isArray(payload.results) ? payload.results : [];
          if (results.length === 0) break;

          for (const result of results) {
            const evaluated = evaluateCandidate(result, spec);
            if (!evaluated) continue;
            if (!best || evaluated.score > best.score) {
              best = evaluated;
            }
          }

          if (best && best.score >= 42) return best;
        } catch (error) {
          lastError = error;
          break;
        }
      }
    }
  }

  if (best) return best;
  if (lastError) {
    throw new Error(`No match for "${spec.fileName}". Last API error: ${String(lastError)}`);
  }
  throw new Error(`No suitable Openverse result found for "${spec.fileName}".`);
}

async function downloadBinary(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'storyteller-magic-openverse-sync/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Download failed (${response.status} ${response.statusText})`);
    }

    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    if (contentType && !contentType.includes('audio') && !contentType.includes('octet-stream')) {
      throw new Error(`Unexpected content-type "${contentType}"`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 12_000) {
      throw new Error(`Downloaded file too small (${buffer.length} bytes)`);
    }
    return buffer;
  } finally {
    clearTimeout(timer);
  }
}

function buildMarkdownReport(records) {
  const lines = [
    '# Openverse Audio Attribution',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    'This file lists source/license metadata for tracks downloaded via Openverse API.',
    ''
  ];

  for (const record of records) {
    lines.push(`## ${record.fileName}`);
    lines.push(`- Track: ${record.title || '(untitled)'}`);
    lines.push(`- Creator: ${record.creator || '(unknown)'}`);
    lines.push(`- License: ${record.license || '(unknown)'}`);
    if (record.licenseUrl) lines.push(`- License URL: ${record.licenseUrl}`);
    if (record.foreignLandingUrl) lines.push(`- Source page: ${record.foreignLandingUrl}`);
    lines.push(`- Direct audio URL: ${record.url}`);
    lines.push('');
  }

  return lines.join('\n');
}

async function loadExistingAttribution() {
  try {
    const raw = await fs.readFile(ATTRIBUTION_JSON_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.tracks)) {
      return parsed;
    }
  } catch {
    // ignore missing/invalid file
  }
  return { tracks: [] };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printUsage();
    return;
  }

  const apiBases = resolveApiBases();
  if (apiBases.length === 0) {
    throw new Error('No Openverse API base URL available.');
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const existingAttribution = await loadExistingAttribution();
  const attributionByFile = new Map(
    existingAttribution.tracks.map((track) => [track.fileName, track])
  );

  const failures = [];
  const resolvedRecords = [];

  console.log(`[audio-sync] API bases: ${apiBases.join(', ')}`);
  console.log(`[audio-sync] Target folder: ${OUTPUT_DIR}`);

  for (const spec of TRACK_SPECS) {
    const destination = path.join(OUTPUT_DIR, spec.fileName);
    const exists = await fs
      .access(destination)
      .then(() => true)
      .catch(() => false);

    if (exists && !options.force) {
      const existing = attributionByFile.get(spec.fileName) || {
        fileName: spec.fileName,
        title: '(existing local file)',
        creator: null,
        license: null,
        url: null,
        source: 'local',
        provider: null,
        foreignLandingUrl: null,
        licenseUrl: null,
        duration: null,
        bitRate: null,
        fileSize: null,
        fetchedAt: null
      };
      resolvedRecords.push(existing);
      console.log(`[audio-sync] kept existing ${spec.fileName}`);
      continue;
    }

    console.log(`[audio-sync] searching ${spec.fileName} -> "${spec.query}"`);

    try {
      const best = await findBestMatch(spec, options, apiBases);
      const entry = {
        fileName: spec.fileName,
        ...best.normalized,
        fetchedAt: new Date().toISOString()
      };

      if (!options.dryRun) {
        const binary = await downloadBinary(best.normalized.url, options.timeoutMs);
        await fs.writeFile(destination, binary);
        console.log(`[audio-sync] downloaded ${spec.fileName} (${binary.length} bytes)`);
      } else {
        console.log(`[audio-sync] dry-run selected ${spec.fileName}: ${best.normalized.url}`);
      }

      resolvedRecords.push(entry);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push(`${spec.fileName}: ${message}`);
      console.error(`[audio-sync][fail] ${spec.fileName} -> ${message}`);
    }
  }

  if (!options.dryRun) {
    const payload = {
      generatedAt: new Date().toISOString(),
      apiBases,
      allowedLicenses: [...ALLOWED_LICENSES],
      tracks: resolvedRecords
    };
    await fs.writeFile(ATTRIBUTION_JSON_PATH, `${JSON.stringify(payload, null, 2)}\n`);
    await fs.writeFile(ATTRIBUTION_MD_PATH, `${buildMarkdownReport(resolvedRecords)}\n`);
    console.log(`[audio-sync] wrote ${path.relative(ROOT, ATTRIBUTION_JSON_PATH)}`);
    console.log(`[audio-sync] wrote ${path.relative(ROOT, ATTRIBUTION_MD_PATH)}`);
  }

  if (failures.length > 0) {
    throw new Error(`Completed with ${failures.length} failure(s):\n${failures.join('\n')}`);
  }

  console.log('[audio-sync] completed successfully.');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[audio-sync] ${message}`);
  process.exit(1);
});
