/**
 * Text-to-Speech service using Web Speech API
 *
 * Provides paragraph-based reading with word-level callbacks for highlighting
 */

export interface TTSOptions {
  rate?: number;    // 0.7 - 1.2
  pitch?: number;   // 0.9 - 1.1
  volume?: number;  // 0 - 1
  lang?: 'tr-TR' | 'en-US';
}

export interface WordPosition {
  charIndex: number;
  charLength: number;
}

export type OnWordCallback = (paragraphIndex: number, word: string, position: WordPosition) => void;
export type OnParagraphEndCallback = (paragraphIndex: number) => void;

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPaused = false;
  private currentParagraphs: string[] = [];
  private currentParagraphIndex = 0;
  private onWordCallback: OnWordCallback | null = null;
  private onParagraphEndCallback: OnParagraphEndCallback | null = null;
  private currentOptions: TTSOptions = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
  }

  /**
   * Check if TTS is supported in current browser
   */
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  /**
   * Get available voices, filtered for Turkish and English
   */
  getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];

    const voices = this.synth.getVoices();
    return voices.filter(voice =>
      voice.lang.startsWith('tr') || voice.lang.startsWith('en')
    );
  }

  /**
   * Speak a single text with options
   */
  async speak(text: string, options: TTSOptions = {}): Promise<void> {
    if (!this.synth) {
      console.warn('TTS not supported');
      return;
    }

    this.stop(); // Stop any ongoing speech

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);

      // Apply options
      utterance.rate = options.rate ?? 1.0;
      utterance.pitch = options.pitch ?? 1.0;
      utterance.volume = options.volume ?? 1.0;
      utterance.lang = options.lang ?? 'tr-TR';

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);

      this.currentUtterance = utterance;
      this.synth!.speak(utterance);
    });
  }

  /**
   * Speak paragraphs with word-level tracking
   */
  async speakParagraphs(
    paragraphs: string[],
    onWord?: OnWordCallback,
    onParagraphEnd?: OnParagraphEndCallback,
    options: TTSOptions = {}
  ): Promise<void> {
    if (!this.synth) {
      console.warn('TTS not supported');
      return;
    }

    this.stop(); // Stop any ongoing speech
    this.currentParagraphs = paragraphs;
    this.currentParagraphIndex = 0;
    this.onWordCallback = onWord || null;
    this.onParagraphEndCallback = onParagraphEnd || null;
    this.currentOptions = options;
    this.isPaused = false;

    await this.speakNextParagraph();
  }

  /**
   * Speak the next paragraph in queue
   */
  private async speakNextParagraph(): Promise<void> {
    if (!this.synth) return;
    if (this.currentParagraphIndex >= this.currentParagraphs.length) return;

    const text = this.currentParagraphs[this.currentParagraphIndex];
    const paragraphIndex = this.currentParagraphIndex;

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);

      // Apply options
      utterance.rate = this.currentOptions.rate ?? 1.0;
      utterance.pitch = this.currentOptions.pitch ?? 1.0;
      utterance.volume = this.currentOptions.volume ?? 1.0;
      utterance.lang = this.currentOptions.lang ?? 'tr-TR';

      // Word boundary callback for highlighting
      utterance.onboundary = (event) => {
        if (event.name === 'word' && this.onWordCallback) {
          const word = text.substring(event.charIndex, event.charIndex + event.charLength);
          this.onWordCallback(paragraphIndex, word, {
            charIndex: event.charIndex,
            charLength: event.charLength || 0
          });
        }
      };

      utterance.onend = () => {
        if (this.onParagraphEndCallback) {
          this.onParagraphEndCallback(paragraphIndex);
        }

        // Move to next paragraph
        this.currentParagraphIndex++;

        if (this.currentParagraphIndex < this.currentParagraphs.length) {
          this.speakNextParagraph().then(resolve).catch(reject);
        } else {
          resolve();
        }
      };

      utterance.onerror = (event) => {
        console.error('TTS error:', event);
        reject(event);
      };

      this.currentUtterance = utterance;
      this.synth!.speak(utterance);
    });
  }

  /**
   * Stop speaking
   */
  stop(): void {
    if (!this.synth) return;

    this.synth.cancel();
    this.currentUtterance = null;
    this.currentParagraphs = [];
    this.currentParagraphIndex = 0;
    this.isPaused = false;
    this.onWordCallback = null;
    this.onParagraphEndCallback = null;
  }

  /**
   * Pause speaking
   */
  pause(): void {
    if (!this.synth) return;

    this.synth.pause();
    this.isPaused = true;
  }

  /**
   * Resume speaking
   */
  resume(): void {
    if (!this.synth) return;

    this.synth.resume();
    this.isPaused = false;
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synth?.speaking ?? false;
  }

  /**
   * Check if paused
   */
  isPausedState(): boolean {
    return this.isPaused;
  }
}

// Export singleton instance
export const ttsService = new TTSService();
