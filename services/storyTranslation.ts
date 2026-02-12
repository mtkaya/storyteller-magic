const STORY_API_PATH = '/api/generate-story';
const STORY_API_BASE_URL = import.meta.env.VITE_STORY_API_URL?.trim() || '';
const TRANSLATE_TIMEOUT_MS = 15_000;

const translationCache = new Map<string, string[]>();

interface TranslationOptions {
  contextLabel?: string;
}

const resolveStoryApiEndpoint = (): string => {
  if (!STORY_API_BASE_URL) return STORY_API_PATH;
  return `${STORY_API_BASE_URL.replace(/\/+$/, '')}${STORY_API_PATH}`;
};

const removeCodeFences = (text: string): string => {
  return text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
};

const extractFirstJSONObject = (text: string): string => {
  const start = text.indexOf('{');
  if (start === -1) throw new Error('No JSON object found in translator response.');

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < text.length; index += 1) {
    const ch = text[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === '\\') {
      escaped = true;
      continue;
    }

    if (ch === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        return text.slice(start, index + 1);
      }
    }
  }

  throw new Error('Incomplete JSON object in translator response.');
};

const parseTranslatorPayload = (generatedText: string): unknown => {
  const cleaned = removeCodeFences(generatedText);
  try {
    return JSON.parse(cleaned);
  } catch {
    const jsonSegment = extractFirstJSONObject(cleaned);
    return JSON.parse(jsonSegment);
  }
};

const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean);
};

const looksLikeTurkish = (text: string): boolean => {
  if (!text.trim()) return true;
  if (/[ğüşöçıİĞÜŞÖÇ]/.test(text)) return true;
  return /\b(ve|bir|ile|için|ama|gibi|çok|şimdi|gece|hikaye|masal)\b/i.test(text);
};

const buildCacheKey = (segments: string[]): string => segments.join('\n␞\n');

export async function translateSegmentsToTurkish(
  segments: string[],
  options: TranslationOptions = {}
): Promise<string[]> {
  if (!segments.length) return [];

  const normalized = segments.map((segment) => segment.trim());
  const indicesToTranslate = normalized
    .map((segment, index) => ({ segment, index }))
    .filter(({ segment }) => segment.length > 0 && !looksLikeTurkish(segment));

  if (indicesToTranslate.length === 0) {
    return normalized;
  }

  const sourceBatch = indicesToTranslate.map(({ segment }) => segment);
  const cacheKey = buildCacheKey(sourceBatch);
  const cached = translationCache.get(cacheKey);
  if (cached && cached.length === sourceBatch.length) {
    const merged = [...normalized];
    cached.forEach((line, index) => {
      const targetIndex = indicesToTranslate[index]?.index;
      if (typeof targetIndex === 'number') merged[targetIndex] = line;
    });
    return merged;
  }

  const contextLine = options.contextLabel
    ? `Context: ${options.contextLabel}\n`
    : '';

  const prompt = [
    'You are translating children bedtime story lines from English to Turkish.',
    'Return ONLY valid JSON in this exact shape:',
    '{"translations":["line1","line2"]}',
    'Rules:',
    '- Keep the same order and number of lines.',
    '- Keep emojis, punctuation, and names unchanged when possible.',
    '- Keep the tone warm, simple, and child-friendly.',
    '- Do not add explanations or markdown.',
    contextLine,
    `Input JSON: ${JSON.stringify({ lines: sourceBatch })}`
  ].join('\n');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TRANSLATE_TIMEOUT_MS);

  try {
    const response = await fetch(resolveStoryApiEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        prompt
      })
    });

    if (!response.ok) {
      throw new Error(`Translator request failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = typeof data.generatedText === 'string' ? data.generatedText : '';
    if (!generatedText) throw new Error('Translator response is empty.');

    const payload = parseTranslatorPayload(generatedText) as { translations?: unknown; lines?: unknown } | unknown[];
    let translations = Array.isArray(payload)
      ? asStringArray(payload)
      : asStringArray((payload as { translations?: unknown; lines?: unknown }).translations);

    if (translations.length === 0 && !Array.isArray(payload)) {
      translations = asStringArray((payload as { translations?: unknown; lines?: unknown }).lines);
    }

    if (translations.length !== sourceBatch.length) {
      throw new Error('Translator returned invalid line count.');
    }

    translationCache.set(cacheKey, translations);
    const merged = [...normalized];
    translations.forEach((line, index) => {
      const targetIndex = indicesToTranslate[index]?.index;
      if (typeof targetIndex === 'number') merged[targetIndex] = line;
    });
    return merged;
  } finally {
    clearTimeout(timeoutId);
  }
}
