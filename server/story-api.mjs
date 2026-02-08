import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const OPENAI_TTS_API_URL = 'https://api.openai.com/v1/audio/speech';
const GEMINI_REQUEST_TIMEOUT_MS = 25000;
const TTS_REQUEST_TIMEOUT_MS = 30000;
const PORT = Number(process.env.PORT || 8787);
const MAX_BODY_SIZE_BYTES = 1_000_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const CACHE_TTL_MS = 10 * 60_000;
const CACHE_MAX_ENTRIES = 200;
const MAX_TTS_TEXT_LENGTH = 4000;

const requestRateLimitStore = new Map();
const responseCache = new Map();

loadEnvFiles();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim() || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY?.trim() || '';
const OPENAI_TTS_MODEL = process.env.OPENAI_TTS_MODEL?.trim() || 'gpt-4o-mini-tts';
const OPENAI_TTS_VOICE = process.env.OPENAI_TTS_VOICE?.trim() || 'alloy';
const OPENAI_TTS_FORMAT = process.env.OPENAI_TTS_FORMAT?.trim() || 'mp3';
const MIN_TTS_SPEED = 0.25;
const MAX_TTS_SPEED = 4;

if (!GEMINI_API_KEY) {
  console.warn('[story-api] GEMINI_API_KEY is missing. Requests will fail with HTTP 500.');
}

if (!OPENAI_API_KEY) {
  console.warn('[story-api] OPENAI_API_KEY is missing. Premium TTS endpoint will fail with HTTP 500.');
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    if (req.method === 'OPTIONS') {
      sendJson(res, 204, { ok: true });
      return;
    }

    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'Method not allowed' });
      return;
    }

    if (url.pathname !== '/api/generate-story' && url.pathname !== '/api/tts') {
      sendJson(res, 404, { error: 'Not found' });
      return;
    }

    const clientIp = getClientIp(req);
    const rateLimit = checkAndConsumeRateLimit(clientIp);
    if (!rateLimit.allowed) {
      sendJson(
        res,
        429,
        { error: 'Rate limit exceeded. Try again later.' },
        { 'Retry-After': String(rateLimit.retryAfterSeconds) }
      );
      return;
    }

    let body;
    try {
      body = await readJsonBody(req);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid request body.';
      const statusCode = message === 'Request body too large.' ? 413 : 400;
      sendJson(res, statusCode, { error: message });
      return;
    }

    if (url.pathname === '/api/generate-story') {
      await handleGenerateStoryRequest(res, body);
      return;
    }

    if (url.pathname === '/api/tts') {
      await handleTtsRequest(res, body);
      return;
    }
  } catch (error) {
    console.error('[story-api] Request handling error:', error);
    sendJson(res, 500, { error: 'Internal server error.' });
  }
});

server.listen(PORT, () => {
  console.log(`[story-api] listening on http://localhost:${PORT}`);
});

async function handleGenerateStoryRequest(res, body) {
  if (!GEMINI_API_KEY) {
    sendJson(res, 500, {
      error: 'GEMINI_API_KEY is not configured on the server.'
    });
    return;
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt) {
    sendJson(res, 400, { error: '`prompt` is required.' });
    return;
  }

  const cacheKey = hashPrompt(prompt);
  const cachedResponse = getCachedResponse(cacheKey);
  if (cachedResponse) {
    sendJson(res, 200, { generatedText: cachedResponse, cached: true });
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GEMINI_REQUEST_TIMEOUT_MS);

  try {
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
      })
    });

    const geminiData = await safeJson(geminiResponse);
    if (!geminiResponse.ok) {
      const message = geminiData?.error?.message || geminiResponse.statusText || 'Gemini request failed.';
      sendJson(res, geminiResponse.status, { error: message });
      return;
    }

    const generatedText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText || typeof generatedText !== 'string') {
      sendJson(res, 502, { error: 'No content generated by Gemini.' });
      return;
    }

    setCachedResponse(cacheKey, generatedText);
    sendJson(res, 200, { generatedText, cached: false });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      sendJson(res, 504, { error: `Gemini request timed out after ${Math.round(GEMINI_REQUEST_TIMEOUT_MS / 1000)} seconds.` });
      return;
    }

    console.error('[story-api] Gemini proxy error:', error);
    sendJson(res, 502, { error: 'Failed to reach Gemini API.' });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function handleTtsRequest(res, body) {
  if (!OPENAI_API_KEY) {
    sendJson(res, 500, { error: 'OPENAI_API_KEY is not configured on the server.' });
    return;
  }

  const text = typeof body.text === 'string' ? body.text.trim() : '';
  const language = typeof body.language === 'string' ? body.language.trim().toLowerCase() : '';
  const rawSpeed = typeof body.speed === 'number' ? body.speed : Number(body.speed);
  const speed = Number.isFinite(rawSpeed)
    ? Math.max(MIN_TTS_SPEED, Math.min(MAX_TTS_SPEED, rawSpeed))
    : undefined;

  if (!text) {
    sendJson(res, 400, { error: '`text` is required.' });
    return;
  }

  if (text.length > MAX_TTS_TEXT_LENGTH) {
    sendJson(res, 413, { error: `Text is too long. Limit is ${MAX_TTS_TEXT_LENGTH} characters.` });
    return;
  }

  const voice = resolveVoiceForLanguage(language);
  const requestPayload = {
    model: OPENAI_TTS_MODEL,
    voice,
    response_format: OPENAI_TTS_FORMAT,
    input: text
  };
  if (speed !== undefined) {
    requestPayload.speed = speed;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TTS_REQUEST_TIMEOUT_MS);

  try {
    const ttsResponse = await fetch(OPENAI_TTS_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify(requestPayload)
    });

    if (!ttsResponse.ok) {
      const errorData = await safeJson(ttsResponse);
      const message = errorData?.error?.message || ttsResponse.statusText || 'TTS request failed.';
      sendJson(res, ttsResponse.status, { error: message });
      return;
    }

    const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
    if (audioBuffer.length === 0) {
      sendJson(res, 502, { error: 'No audio generated from TTS API.' });
      return;
    }

    const contentType = ttsResponse.headers.get('content-type') || 'audio/mpeg';
    sendBinary(res, 200, audioBuffer, contentType, {
      'Cache-Control': 'no-store'
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      sendJson(res, 504, { error: `TTS request timed out after ${Math.round(TTS_REQUEST_TIMEOUT_MS / 1000)} seconds.` });
      return;
    }

    console.error('[story-api] TTS proxy error:', error);
    sendJson(res, 502, { error: 'Failed to reach TTS API.' });
  } finally {
    clearTimeout(timeoutId);
  }
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8',
    ...extraHeaders
  });
  res.end(JSON.stringify(payload));
}

function sendBinary(res, statusCode, payloadBuffer, contentType, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Content-Type': contentType,
    'Content-Length': String(payloadBuffer.length),
    ...extraHeaders
  });
  res.end(payloadBuffer);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > MAX_BODY_SIZE_BYTES) {
        reject(new Error('Request body too large.'));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });

    req.on('error', reject);
  });
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function resolveVoiceForLanguage(language) {
  if (!language) return OPENAI_TTS_VOICE;
  if (OPENAI_TTS_VOICE !== 'alloy') return OPENAI_TTS_VOICE;

  // Keep default configurable voice; if untouched, prefer a softer voice mapping by language.
  if (language.startsWith('tr')) return 'alloy';
  if (language.startsWith('en')) return 'alloy';
  return OPENAI_TTS_VOICE;
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function checkAndConsumeRateLimit(clientIp) {
  const now = Date.now();
  pruneRateLimitStore(now);

  const current = requestRateLimitStore.get(clientIp);
  if (!current || now >= current.resetAt) {
    requestRateLimitStore.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000))
    };
  }

  current.count += 1;
  requestRateLimitStore.set(clientIp, current);
  return { allowed: true, retryAfterSeconds: 0 };
}

function pruneRateLimitStore(now) {
  for (const [ip, entry] of requestRateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      requestRateLimitStore.delete(ip);
    }
  }
}

function hashPrompt(prompt) {
  return crypto.createHash('sha256').update(prompt).digest('hex');
}

function getCachedResponse(cacheKey) {
  const entry = responseCache.get(cacheKey);
  if (!entry) return null;

  if (entry.expiresAt <= Date.now()) {
    responseCache.delete(cacheKey);
    return null;
  }

  return entry.generatedText;
}

function setCachedResponse(cacheKey, generatedText) {
  const now = Date.now();
  pruneExpiredCache(now);

  if (responseCache.has(cacheKey)) {
    responseCache.delete(cacheKey);
  }

  responseCache.set(cacheKey, {
    generatedText,
    expiresAt: now + CACHE_TTL_MS
  });

  while (responseCache.size > CACHE_MAX_ENTRIES) {
    const oldestKey = responseCache.keys().next().value;
    if (!oldestKey) break;
    responseCache.delete(oldestKey);
  }
}

function pruneExpiredCache(now) {
  for (const [cacheKey, entry] of responseCache.entries()) {
    if (entry.expiresAt <= now) {
      responseCache.delete(cacheKey);
    }
  }
}

function loadEnvFiles() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const rootDir = path.resolve(__dirname, '..');
  const candidates = ['.env.local', '.env'];

  for (const filename of candidates) {
    const filePath = path.join(rootDir, filename);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) continue;

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();

      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}
