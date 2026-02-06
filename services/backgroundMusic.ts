// Background Music Service
// Uses Web Audio API for smooth, looping background music

export type MusicType = 'none' | 'lullaby' | 'rain' | 'forest' | 'ocean' | 'fireplace' | 'wind';

export interface MusicTrack {
    id: MusicType;
    name: string;
    nameTr: string;
    icon: string;
    // Using free audio URLs or base64 for simple sounds
    // In production, you'd use actual audio files in /public/audio/
}

export const MUSIC_TRACKS: MusicTrack[] = [
    { id: 'none', name: 'No Music', nameTr: 'Müzik Yok', icon: '🔇' },
    { id: 'lullaby', name: 'Gentle Lullaby', nameTr: 'Ninni', icon: '🎵' },
    { id: 'rain', name: 'Soft Rain', nameTr: 'Yağmur', icon: '🌧️' },
    { id: 'forest', name: 'Forest Sounds', nameTr: 'Orman Sesleri', icon: '🌲' },
    { id: 'ocean', name: 'Ocean Waves', nameTr: 'Dalga Sesleri', icon: '🌊' },
    { id: 'fireplace', name: 'Crackling Fire', nameTr: 'Şömine', icon: '🔥' },
    { id: 'wind', name: 'Gentle Wind', nameTr: 'Rüzgar', icon: '🍃' },
];

class BackgroundMusicService {
    private audioContext: AudioContext | null = null;
    private currentSource: AudioBufferSourceNode | null = null;
    private gainNode: GainNode | null = null;
    private currentTrack: MusicType = 'none';
    private isPlaying: boolean = false;
    private volume: number = 0.3;

    // Generate simple ambient sounds using Web Audio API
    private async initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            this.gainNode.gain.value = this.volume;
        }
        return this.audioContext;
    }

    // Generate white noise (for rain, wind, ocean base)
    private createNoiseBuffer(duration: number = 2, type: 'white' | 'pink' | 'brown' = 'white'): AudioBuffer {
        const ctx = this.audioContext!;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;

            if (type === 'white') {
                data[i] = white * 0.5;
            } else if (type === 'pink') {
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
                b6 = white * 0.115926;
            } else { // brown
                data[i] = (b0 = (white + b0 * 0.99) / 1.02) * 0.5;
            }
        }

        return buffer;
    }

    // Create specific ambient sounds
    private async createAmbientSound(type: MusicType): Promise<AudioBuffer | null> {
        const ctx = await this.initAudioContext();

        switch (type) {
            case 'rain':
                return this.createNoiseBuffer(3, 'pink');
            case 'ocean':
                return this.createNoiseBuffer(4, 'brown');
            case 'wind':
                return this.createNoiseBuffer(3, 'pink');
            case 'forest':
                return this.createNoiseBuffer(3, 'pink');
            case 'fireplace':
                return this.createNoiseBuffer(2, 'brown');
            case 'lullaby':
                return this.createLullabyBuffer();
            default:
                return null;
        }
    }

    // Create a simple lullaby melody
    private createLullabyBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 8;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        // Simple lullaby notes (C-E-G-E pattern)
        const notes = [261.63, 329.63, 392.00, 329.63, 261.63, 329.63, 392.00, 440.00];
        const noteDuration = sampleRate; // 1 second per note

        for (let i = 0; i < data.length; i++) {
            const noteIndex = Math.floor(i / noteDuration) % notes.length;
            const frequency = notes[noteIndex];
            const t = i / sampleRate;
            const noteT = (i % noteDuration) / sampleRate;

            // Envelope for smooth attack/release
            const envelope = Math.sin(noteT * Math.PI) * 0.15;

            // Soft sine wave
            data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope;
        }

        return buffer;
    }

    // Filter setup based on sound type
    private setupFilters(type: MusicType): BiquadFilterNode | null {
        if (!this.audioContext) return null;

        const filter = this.audioContext.createBiquadFilter();

        switch (type) {
            case 'rain':
                filter.type = 'lowpass';
                filter.frequency.value = 2000;
                break;
            case 'ocean':
                filter.type = 'lowpass';
                filter.frequency.value = 500;
                break;
            case 'wind':
                filter.type = 'bandpass';
                filter.frequency.value = 800;
                filter.Q.value = 2;
                break;
            case 'forest':
                filter.type = 'lowpass';
                filter.frequency.value = 3000;
                break;
            case 'fireplace':
                filter.type = 'lowpass';
                filter.frequency.value = 1500;
                break;
            default:
                return null;
        }

        return filter;
    }

    async play(type: MusicType): Promise<void> {
        if (type === 'none') {
            this.stop();
            return;
        }

        // Stop current playback
        this.stop();

        try {
            await this.initAudioContext();

            const buffer = await this.createAmbientSound(type);
            if (!buffer || !this.audioContext || !this.gainNode) return;

            this.currentSource = this.audioContext.createBufferSource();
            this.currentSource.buffer = buffer;
            this.currentSource.loop = true;

            // Add filter for the sound type
            const filter = this.setupFilters(type);
            if (filter) {
                this.currentSource.connect(filter);
                filter.connect(this.gainNode);
            } else {
                this.currentSource.connect(this.gainNode);
            }

            this.currentSource.start();
            this.currentTrack = type;
            this.isPlaying = true;
        } catch (error) {
            console.error('Error playing background music:', error);
        }
    }

    stop(): void {
        if (this.currentSource) {
            try {
                this.currentSource.stop();
            } catch (e) {
                // Source might already be stopped
            }
            this.currentSource = null;
        }
        this.isPlaying = false;
        this.currentTrack = 'none';
    }

    setVolume(volume: number): void {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.gainNode) {
            this.gainNode.gain.value = this.volume;
        }
    }

    getVolume(): number {
        return this.volume;
    }

    getCurrentTrack(): MusicType {
        return this.currentTrack;
    }

    getIsPlaying(): boolean {
        return this.isPlaying;
    }

    // Fade in effect
    async fadeIn(type: MusicType, duration: number = 2000): Promise<void> {
        if (!this.gainNode) await this.initAudioContext();

        const targetVolume = this.volume;
        this.setVolume(0);
        await this.play(type);

        const startTime = Date.now();
        const fadeInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);
            this.setVolume(targetVolume * progress);

            if (progress >= 1) {
                clearInterval(fadeInterval);
            }
        }, 50);
    }

    // Fade out effect
    fadeOut(duration: number = 2000): Promise<void> {
        return new Promise((resolve) => {
            const startVolume = this.volume;
            const startTime = Date.now();

            const fadeInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(1, elapsed / duration);
                this.setVolume(startVolume * (1 - progress));

                if (progress >= 1) {
                    clearInterval(fadeInterval);
                    this.stop();
                    this.setVolume(startVolume); // Reset volume for next play
                    resolve();
                }
            }, 50);
        });
    }
}

// Singleton instance
export const backgroundMusic = new BackgroundMusicService();
