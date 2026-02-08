import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let failureCount = 0;

function logSection(title) {
  console.log(`\n[smoke] ${title}`);
}

function fail(message) {
  failureCount += 1;
  console.error(`[smoke][fail] ${message}`);
}

function warn(message) {
  console.warn(`[smoke][warn] ${message}`);
}

function runCommand(name, command, args) {
  logSection(name);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: 'utf8'
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.status !== 0) {
    fail(`${name} failed with exit code ${result.status}`);
    return false;
  }

  return true;
}

function checkDataIntegrity() {
  logSection('Data Integrity');

  const dataFile = path.join(ROOT, 'data.ts');
  const imagesDir = path.join(ROOT, 'public', 'images');
  const source = fs.readFileSync(dataFile, 'utf8');

  const imageRefs = [...source.matchAll(/'\/images\/([^']+)'/g)].map((match) => match[1]);
  const uniqueImageRefs = [...new Set(imageRefs)];
  const missingImageRefs = uniqueImageRefs.filter((fileName) => !fs.existsSync(path.join(imagesDir, fileName)));

  if (missingImageRefs.length > 0) {
    fail(`Missing image files referenced by data.ts:\n${missingImageRefs.join('\n')}`);
  } else {
    console.log(`[smoke] image refs OK (${uniqueImageRefs.length} unique refs)`);
  }

  const numericStoryIds = [...source.matchAll(/\n\s*id:\s*'(\d+)'/g)].map((match) => match[1]);
  const idCounts = new Map();
  for (const id of numericStoryIds) {
    idCounts.set(id, (idCounts.get(id) || 0) + 1);
  }
  const duplicateStoryIds = [...idCounts.entries()].filter(([, count]) => count > 1);

  if (duplicateStoryIds.length > 0) {
    const formatted = duplicateStoryIds.map(([id, count]) => `${id}:${count}`).join(', ');
    fail(`Duplicate numeric story IDs found: ${formatted}`);
  } else {
    console.log(`[smoke] story id uniqueness OK (${numericStoryIds.length} numeric ids)`);
  }
}

async function runApiSmokeIfEnabled() {
  if (process.env.SMOKE_API !== '1') {
    logSection('API Smoke (Skipped)');
    console.log('[smoke] set SMOKE_API=1 to enable endpoint checks');
    return;
  }

  logSection('API Smoke');
  const port = Number(process.env.SMOKE_API_PORT || 8794);
  const child = spawn(process.execPath, ['server/story-api.mjs'], {
    cwd: ROOT,
    env: {
      ...process.env,
      PORT: String(port),
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'dummy',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'dummy'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let serverLogs = '';
  child.stdout.on('data', (chunk) => {
    serverLogs += chunk.toString();
  });
  child.stderr.on('data', (chunk) => {
    serverLogs += chunk.toString();
  });

  await new Promise((resolve) => setTimeout(resolve, 900));

  try {
    if (child.exitCode !== null) {
      if (serverLogs.includes('EPERM') || serverLogs.includes('EACCES')) {
        warn('Port bind is not allowed in this environment. API smoke skipped.');
        return;
      }
      fail(`API server exited early (${child.exitCode}). Logs:\n${serverLogs}`);
      return;
    }

    const checks = [
      { path: '/api/generate-story', body: {}, expected: [400] },
      { path: '/api/tts', body: {}, expected: [400] }
    ];

    for (const check of checks) {
      const response = await fetch(`http://127.0.0.1:${port}${check.path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(check.body)
      });

      if (!check.expected.includes(response.status)) {
        const body = await response.text();
        fail(`Unexpected ${check.path} status: ${response.status}. Body: ${body}`);
      } else {
        console.log(`[smoke] ${check.path} OK (${response.status})`);
      }
    }
  } catch (error) {
    fail(`API smoke request failed: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    child.kill('SIGTERM');
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (child.exitCode === null) child.kill('SIGKILL');
  }
}

async function main() {
  runCommand('Typecheck', 'npx', ['tsc', '--noEmit', '--pretty', 'false']);
  runCommand('Build', 'npm', ['run', 'build']);
  checkDataIntegrity();
  await runApiSmokeIfEnabled();

  if (failureCount > 0) {
    console.error(`\n[smoke] completed with ${failureCount} failure(s)`);
    process.exit(1);
  }

  console.log('\n[smoke] all checks passed');
}

await main();
