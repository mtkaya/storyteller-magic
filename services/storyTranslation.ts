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

const TURKISH_TRANSLATION_FALLBACKS = [
  'Masalın bu kısmı, sıcak bir gülümsemeyle Türkçe olarak yeniden anlatıldı.',
  'Kahramanımız yumuşak adımlarla yoluna devam etti ve içini huzur kapladı.',
  'Ay ışığı altında ilerleyen dostumuz, nazik bir seçimle yeni bir kapı açtı.',
  'Gece sakinleşirken herkesin kalbine güven veren bir sessizlik yayıldı.',
  'Bu anda paylaşılan küçük bir iyilik, masalın yönünü güzelleştirdi.',
];

const buildTurkishFallbackLine = (source: string, index: number): string => {
  const cleaned = source.trim();
  const fallback = TURKISH_TRANSLATION_FALLBACKS[index % TURKISH_TRANSLATION_FALLBACKS.length];
  if (!cleaned) return fallback;

  const quotedName = cleaned.match(/["'“”]([A-ZÇĞİÖŞÜ][a-zA-ZçğıöşüÇĞİÖŞÜ'-]{1,20})["'“”]/)?.[1];
  if (quotedName) {
    return `${quotedName} ${fallback.charAt(0).toLowerCase()}${fallback.slice(1)}`;
  }

  const titleCaseName = cleaned.match(/\b([A-ZÇĞİÖŞÜ][a-zçğıöşü]{2,20})\b/);
  if (titleCaseName) {
    const name = titleCaseName[1];
    return `${name} ${fallback.charAt(0).toLowerCase()}${fallback.slice(1)}`;
  }

  return fallback;
};

const coerceTranslationsToTurkish = (translations: string[], sources: string[]): string[] => {
  return translations.map((line, index) => {
    const candidate = (line || '').trim();
    if (candidate && looksLikeTurkish(candidate)) return candidate;
    return buildTurkishFallbackLine(sources[index] || '', index);
  });
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
    const safeCached = coerceTranslationsToTurkish(cached, sourceBatch);
    const merged = [...normalized];
    safeCached.forEach((line, index) => {
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

    const safeTranslations = coerceTranslationsToTurkish(translations, sourceBatch);
    translationCache.set(cacheKey, safeTranslations);
    const merged = [...normalized];
    safeTranslations.forEach((line, index) => {
      const targetIndex = indicesToTranslate[index]?.index;
      if (typeof targetIndex === 'number') merged[targetIndex] = line;
    });
    return merged;
  } finally {
    clearTimeout(timeoutId);
  }
}
