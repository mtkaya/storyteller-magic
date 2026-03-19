/**
 * ElevenLabs TTS Service - Premium text-to-speech integration
 *
 * This is a stub implementation ready for API key integration.
 * If VITE_ELEVENLABS_KEY is not set, it will fall back to Web Speech API.
 */

// Recommended child-friendly voices from ElevenLabs
export const ELEVENLABS_VOICES = [
  {
    id: 'pNInz6obpgDQGcFmaJgB', // Adam
    name: 'Adam',
    description: 'Warm, friendly male voice',
    language: 'en-US',
    recommended: true,
  },
  {
    id: 'EXAVITQu4vr4xnSDxMaL', // Bella
    name: 'Bella',
    description: 'Gentle, soothing female voice',
    language: 'en-US',
    recommended: true,
  },
  {
    id: 'ErXwobaYiN019PkySvjV', // Antoni
    name: 'Antoni',
    description: 'Clear, calm male voice',
    language: 'en-US',
    recommended: false,
  },
  {
    id: 'MF3mGyEYCl7XYWbV9V6O', // Elli
    name: 'Elli',
    description: 'Young, energetic female voice',
    language: 'en-US',
    recommended: true,
  },
] as const;

/**
 * Check if ElevenLabs API key is configured
 */
export function isElevenLabsConfigured(): boolean {
  const apiKey = import.meta.env.VITE_ELEVENLABS_KEY;
  return Boolean(apiKey && apiKey.trim().length > 0);
}

/**
 * Get the ElevenLabs API key
 */
function getApiKey(): string | null {
  const apiKey = import.meta.env.VITE_ELEVENLABS_KEY;
  return apiKey && apiKey.trim().length > 0 ? apiKey.trim() : null;
}

/**
 * Speak text using ElevenLabs API
 *
 * @param text - The text to speak
 * @param voiceId - The ElevenLabs voice ID (default: Adam)
 * @returns Promise<AudioBuffer> - The audio buffer of the generated speech
 */
export async function speakWithElevenLabs(
  text: string,
  voiceId: string = ELEVENLABS_VOICES[0].id
): Promise<AudioBuffer> {
  const apiKey = getApiKey();

  if (!apiKey) {
    console.warn(
      'ElevenLabs API key not configured. Set VITE_ELEVENLABS_KEY in .env file. Falling back to Web Speech API.'
    );
    throw new Error('ElevenLabs API key not configured');
  }

  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  // Stub implementation - this will be replaced with actual API call
  console.warn('ElevenLabs API integration is stubbed. Implement actual API call here.');
  console.info('Would speak with ElevenLabs:', { text: text.substring(0, 50), voiceId });

  // TODO: Implement actual ElevenLabs API call
  // const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'audio/mpeg',
  //     'Content-Type': 'application/json',
  //     'xi-api-key': apiKey,
  //   },
  //   body: JSON.stringify({
  //     text,
  //     model_id: 'eleven_monolingual_v1',
  //     voice_settings: {
  //       stability: 0.5,
  //       similarity_boost: 0.75,
  //     },
  //   }),
  // });
  //
  // if (!response.ok) {
  //   throw new Error(`ElevenLabs API error: ${response.status}`);
  // }
  //
  // const audioArrayBuffer = await response.arrayBuffer();
  // const audioContext = new AudioContext();
  // const audioBuffer = await audioContext.decodeAudioData(audioArrayBuffer);
  // return audioBuffer;

  // For now, throw error to trigger fallback
  throw new Error('ElevenLabs API not yet implemented - using Web Speech fallback');
}

/**
 * Get recommended voice for a given language
 *
 * @param language - 'en' or 'tr'
 * @returns Recommended voice ID
 */
export function getRecommendedVoice(language: 'en' | 'tr'): string {
  // For now, only English voices are available in the stub
  // Turkish support can be added when implementing the full API
  if (language === 'tr') {
    console.info('Turkish voices not yet configured, using English fallback');
  }

  const recommendedVoice = ELEVENLABS_VOICES.find(v => v.recommended);
  return recommendedVoice?.id || ELEVENLABS_VOICES[0].id;
}

/**
 * Check if ElevenLabs is available and ready
 */
export async function checkElevenLabsAvailability(): Promise<boolean> {
  if (!isElevenLabsConfigured()) {
    return false;
  }

  // TODO: Implement health check when API is integrated
  // try {
  //   const response = await fetch('https://api.elevenlabs.io/v1/voices', {
  //     headers: {
  //       'xi-api-key': getApiKey()!,
  //     },
  //   });
  //   return response.ok;
  // } catch {
  //   return false;
  // }

  console.info('ElevenLabs API health check stubbed');
  return false;
}
