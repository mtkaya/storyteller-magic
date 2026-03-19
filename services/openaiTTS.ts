// OpenAI TTS Service — direct REST call from browser
// Env: VITE_OPENAI_TTS_KEY

const OPENAI_TTS_URL = 'https://api.openai.com/v1/audio/speech';
const MAX_CHUNK_CHARS = 4096; // OpenAI TTS limit

export type OpenAIVoice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';

// Voice recommendations:
// TR female: nova (warm, natural), shimmer (softer)
// TR male: onyx (deep), echo (clear)
// EN female: nova, shimmer
// EN male: alloy (neutral), onyx (authoritative)

const DEFAULT_VOICE_TR: OpenAIVoice = 'nova';
const DEFAULT_VOICE_EN: OpenAIVoice = 'nova';

export function isOpenAITTSAvailable(): boolean {
  return Boolean(import.meta.env.VITE_OPENAI_TTS_KEY);
}

export function getDefaultVoice(language: 'tr' | 'en'): OpenAIVoice {
  return language === 'tr' ? DEFAULT_VOICE_TR : DEFAULT_VOICE_EN;
}

// Split text into chunks under MAX_CHUNK_CHARS, split on sentence boundary
function chunkText(text: string): string[] {
  if (text.length <= MAX_CHUNK_CHARS) return [text];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    if ((current + sentence).length > MAX_CHUNK_CHARS) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export interface OpenAITTSOptions {
  text: string;
  language: 'tr' | 'en';
  voice?: OpenAIVoice;
  model?: 'tts-1' | 'tts-1-hd'; // tts-1 faster, tts-1-hd better quality
  speed?: number; // 0.25–4.0, default 1.0
  onChunkReady?: (audioBlob: Blob, chunkIndex: number) => void;
}

// Returns array of AudioBlob URLs (one per chunk)
export async function synthesizeSpeech(options: OpenAITTSOptions): Promise<string[]> {
  const key = import.meta.env.VITE_OPENAI_TTS_KEY;
  if (!key) throw new Error('VITE_OPENAI_TTS_KEY not set');

  const {
    text,
    language,
    voice = getDefaultVoice(language),
    model = 'tts-1',
    speed = 1.0,
    onChunkReady,
  } = options;

  const chunks = chunkText(text);
  const audioUrls: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const response = await fetch(OPENAI_TTS_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: chunks[i],
        voice,
        speed,
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const err = await response.text().catch(() => response.statusText);
      throw new Error(`OpenAI TTS error ${response.status}: ${err}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    audioUrls.push(url);
    onChunkReady?.(blob, i);
  }

  return audioUrls;
}

// Convenience: synthesize single paragraph, return audio element
export async function speakParagraph(
  text: string,
  language: 'tr' | 'en',
  voice?: OpenAIVoice,
  speed = 1.0
): Promise<HTMLAudioElement> {
  const urls = await synthesizeSpeech({ text, language, voice, speed });
  const audio = new Audio(urls[0]);
  audio.playbackRate = speed;
  return audio;
}

// Revoke object URLs to free memory
export function revokeAudioUrls(urls: string[]): void {
  urls.forEach(url => URL.revokeObjectURL(url));
}
