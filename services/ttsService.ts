// Google Cloud Text-to-Speech Service
// Uses Neural2/WaveNet voices for natural, high-quality speech

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const TTS_API_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

export type VoiceGender = 'FEMALE' | 'MALE';

interface TTSConfig {
  language: 'en' | 'tr';
  gender: VoiceGender;
  pitch: number;    // -20.0 to 20.0 semitones
  rate: number;     // 0.25 to 4.0
}

// Voice names for high quality output
const VOICE_MAP = {
  en: {
    FEMALE: 'en-US-Neural2-F',  // Warm, storytelling female voice
    MALE: 'en-US-Neural2-D',    // Gentle male voice
  },
  tr: {
    FEMALE: 'tr-TR-Standard-A', // Turkish female
    MALE: 'tr-TR-Standard-B',   // Turkish male (fallback if unavailable)
  },
};

// In-memory cache to avoid re-requesting the same text
const audioCache = new Map<string, string>();

function getCacheKey(text: string, config: TTSConfig): string {
  return `${config.language}_${config.gender}_${config.pitch}_${config.rate}_${text}`;
}

export async function synthesizeSpeech(
  text: string,
  config: TTSConfig
): Promise<string> {
  if (!API_KEY) {
    throw new Error('API key not configured');
  }

  const cacheKey = getCacheKey(text, config);
  const cached = audioCache.get(cacheKey);
  if (cached) return cached;

  const voiceName = VOICE_MAP[config.language]?.[config.gender]
    || VOICE_MAP.en.FEMALE;

  const languageCode = config.language === 'tr' ? 'tr-TR' : 'en-US';

  const body = {
    input: { text },
    voice: {
      languageCode,
      name: voiceName,
      ssmlGender: config.gender,
    },
    audioConfig: {
      audioEncoding: 'MP3' as const,
      pitch: config.pitch,
      speakingRate: config.rate,
      effectsProfileId: ['small-bluetooth-speaker-class-device'],
    },
  };

  const response = await fetch(`${TTS_API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `TTS API error: ${(err as any).error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  const audioContent: string = data.audioContent; // base64 encoded MP3

  const audioUrl = `data:audio/mp3;base64,${audioContent}`;

  // Cache it (limit cache size to 100 entries)
  if (audioCache.size > 100) {
    const firstKey = audioCache.keys().next().value;
    if (firstKey !== undefined) audioCache.delete(firstKey);
  }
  audioCache.set(cacheKey, audioUrl);

  return audioUrl;
}

// Convenience: play audio and return a promise that resolves when done
export function playAudioUrl(url: string, volume: number = 1): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error('Audio playback failed'));
    audio.play().catch(reject);
  });
}

// Check if the TTS API is available (key is set)
export function isTTSAvailable(): boolean {
  return !!API_KEY;
}

// Clear the audio cache
export function clearTTSCache(): void {
  audioCache.clear();
}
