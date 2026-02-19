// Background Music Service
// Uses a hybrid approach:
// 1) Procedural ambient loops (always available, royalty-free)
// 2) Optional local audio files from /public/audio (if provided by the user)

export type MusicType =
    | 'none'
    | 'lullaby'
    | 'starlight'
    | 'rain'
    | 'forest'
    | 'ocean'
    | 'fireplace'
    | 'wind';

export interface MusicTrack {
    id: MusicType;
    name: string;
    nameTr: string;
    icon: string;
    filePath?: string;
}

export const MUSIC_TRACKS: MusicTrack[] = [
    { id: 'none', name: 'No Music', nameTr: 'Müzik Yok', icon: '🔇' },
    { id: 'lullaby', name: 'Gentle Lullaby', nameTr: 'Ninni', icon: '🎵', filePath: '/audio/lullaby-light.mp3' },
    { id: 'starlight', name: 'Starlight Piano', nameTr: 'Yıldız Piyanosu', icon: '✨', filePath: '/audio/starlight-piano.mp3' },
    { id: 'rain', name: 'Soft Rain', nameTr: 'Yağmur', icon: '🌧️', filePath: '/audio/soft-rain.mp3' },
    { id: 'forest', name: 'Forest Night', nameTr: 'Gece Ormanı', icon: '🌲', filePath: '/audio/forest-night.mp3' },
    { id: 'ocean', name: 'Ocean Waves', nameTr: 'Dalga Sesleri', icon: '🌊', filePath: '/audio/ocean-waves.mp3' },
    { id: 'fireplace', name: 'Warm Fireplace', nameTr: 'Şömine', icon: '🔥', filePath: '/audio/warm-fireplace.mp3' },
    { id: 'wind', name: 'Gentle Wind', nameTr: 'Rüzgar', icon: '🍃', filePath: '/audio/gentle-wind.mp3' },
];

type NoiseType = 'white' | 'pink' | 'brown';

class BackgroundMusicService {
    private audioContext: AudioContext | null = null;
    private currentSource: AudioBufferSourceNode | null = null;
    private gainNode: GainNode | null = null;
    private htmlAudio: HTMLAudioElement | null = null;
    private unavailableFileTracks = new Set<MusicType>();
    private fadeTimer: number | null = null;

    private currentTrack: MusicType = 'none';
    private isPlaying = false;
    private userVolume = 0.3;
    private duckingMultiplier = 1;
    private duckingTimer: number | null = null;
    private pendingTrack: MusicType | null = null;
    private pendingUnlockHandler: ((event: Event) => void) | null = null;

    private attachPendingUnlockHandler() {
        if (typeof window === 'undefined' || this.pendingUnlockHandler) return;

        this.pendingUnlockHandler = () => {
            const trackToResume = this.pendingTrack;
            this.pendingTrack = null;
            this.detachPendingUnlockHandler();

            if (!trackToResume || trackToResume === 'none') return;
            void this.play(trackToResume);
        };

        const options: AddEventListenerOptions = { once: true, passive: true };
        window.addEventListener('pointerdown', this.pendingUnlockHandler, options);
        window.addEventListener('touchstart', this.pendingUnlockHandler, options);
        window.addEventListener('keydown', this.pendingUnlockHandler, options);
    }

    private detachPendingUnlockHandler() {
        if (typeof window === 'undefined' || !this.pendingUnlockHandler) return;

        window.removeEventListener('pointerdown', this.pendingUnlockHandler);
        window.removeEventListener('touchstart', this.pendingUnlockHandler);
        window.removeEventListener('keydown', this.pendingUnlockHandler);
        this.pendingUnlockHandler = null;
    }

    private async initAudioContext() {
        if (!this.audioContext) {
            const AudioContextCtor: typeof AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            this.audioContext = new AudioContextCtor();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.gain.value = this.userVolume;
            this.gainNode.connect(this.audioContext.destination);
        }

        if (this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch {
                // On some mobile browsers resume may require a stricter user gesture.
                // Keep context instance alive so a later interaction can unlock it.
            }
        }

        return this.audioContext;
    }

    private getEffectiveVolume(): number {
        return Math.max(0, Math.min(1, this.userVolume * this.duckingMultiplier));
    }

    private applyVolume() {
        const effectiveVolume = this.getEffectiveVolume();
        if (this.gainNode) {
            this.gainNode.gain.value = effectiveVolume;
        }
        if (this.htmlAudio) {
            this.htmlAudio.volume = effectiveVolume;
        }
    }

    async warmup(): Promise<void> {
        await this.initAudioContext();
    }

    private clearFadeTimer() {
        if (this.fadeTimer !== null) {
            clearInterval(this.fadeTimer);
            this.fadeTimer = null;
        }
    }

    private createNoiseBuffer(duration = 4, type: NoiseType = 'white'): AudioBuffer {
        const ctx = this.audioContext!;
        const bufferSize = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        let pinkB0 = 0;
        let pinkB1 = 0;
        let pinkB2 = 0;
        let pinkB3 = 0;
        let pinkB4 = 0;
        let pinkB5 = 0;
        let pinkB6 = 0;
        let brown = 0;

        for (let i = 0; i < bufferSize; i += 1) {
            const white = Math.random() * 2 - 1;
            if (type === 'white') {
                data[i] = white * 0.4;
                continue;
            }

            if (type === 'pink') {
                pinkB0 = 0.99886 * pinkB0 + white * 0.0555179;
                pinkB1 = 0.99332 * pinkB1 + white * 0.0750759;
                pinkB2 = 0.96900 * pinkB2 + white * 0.1538520;
                pinkB3 = 0.86650 * pinkB3 + white * 0.3104856;
                pinkB4 = 0.55000 * pinkB4 + white * 0.5329522;
                pinkB5 = -0.7616 * pinkB5 - white * 0.0168980;
                const pink = (pinkB0 + pinkB1 + pinkB2 + pinkB3 + pinkB4 + pinkB5 + pinkB6 + white * 0.5362) * 0.1;
                pinkB6 = white * 0.115926;
                data[i] = pink;
                continue;
            }

            brown = (brown + white * 0.02) / 1.02;
            data[i] = brown * 1.3;
        }

        return buffer;
    }

    private createLullabyBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 12;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        const notes = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];
        const noteDuration = 0.75;

        for (let i = 0; i < data.length; i += 1) {
            const t = i / sampleRate;
            const noteIndex = Math.floor(t / noteDuration) % notes.length;
            const noteT = t % noteDuration;
            const freq = notes[noteIndex];
            const env = Math.sin((noteT / noteDuration) * Math.PI);
            const melody = Math.sin(2 * Math.PI * freq * t) * env * 0.12;
            const harmony = Math.sin(2 * Math.PI * (freq / 2) * t) * env * 0.05;
            data[i] = melody + harmony;
        }

        return buffer;
    }

    private createStarlightBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 12;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        const arpeggio = [523.25, 659.25, 783.99, 659.25, 587.33, 739.99, 880, 739.99];
        const chordRoots = [261.63, 293.66, 349.23, 329.63];
        const noteDuration = 0.5;

        for (let i = 0; i < data.length; i += 1) {
            const t = i / sampleRate;
            const step = Math.floor(t / noteDuration);
            const arpFreq = arpeggio[step % arpeggio.length];
            const noteT = t % noteDuration;
            const arpEnv = Math.sin((noteT / noteDuration) * Math.PI);
            const arp = Math.sin(2 * Math.PI * arpFreq * t) * arpEnv * 0.08;

            const chordRoot = chordRoots[Math.floor(t / 3) % chordRoots.length];
            const lfo = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.05 * t);
            const pad =
                Math.sin(2 * Math.PI * chordRoot * t) * 0.03 +
                Math.sin(2 * Math.PI * chordRoot * 1.5 * t) * 0.02;

            data[i] = arp + pad * (0.4 + lfo * 0.6);
        }

        return buffer;
    }

    private createRainBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 6;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        let filtered = 0;
        for (let i = 0; i < data.length; i += 1) {
            const white = Math.random() * 2 - 1;
            filtered = filtered * 0.94 + white * 0.06;
            const drizzle = filtered * 0.18;
            const drop = Math.random() > 0.9985 ? (Math.random() * 2 - 1) * 0.18 : 0;
            data[i] = drizzle + drop;
        }

        return buffer;
    }

    private createOceanBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 8;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        let brown = 0;
        for (let i = 0; i < data.length; i += 1) {
            const t = i / sampleRate;
            const white = Math.random() * 2 - 1;
            brown = (brown + white * 0.02) / 1.02;
            const swell = 0.35 + 0.65 * ((Math.sin(2 * Math.PI * 0.08 * t) + 1) / 2);
            const foam = (Math.random() * 2 - 1) * 0.03 * (0.6 + 0.4 * Math.sin(2 * Math.PI * 0.4 * t));
            data[i] = (brown * 0.2 + foam) * swell;
        }

        return buffer;
    }

    private createForestBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 8;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        let filtered = 0;
        for (let i = 0; i < data.length; i += 1) {
            const t = i / sampleRate;
            const white = Math.random() * 2 - 1;
            filtered = filtered * 0.96 + white * 0.04;
            const rustle = filtered * 0.15;

            const chirpPhase = t % 3.5;
            const chirp =
                chirpPhase < 0.12
                    ? Math.sin(2 * Math.PI * (1200 + chirpPhase * 2600) * chirpPhase) * (1 - chirpPhase / 0.12) * 0.06
                    : 0;

            const breeze = Math.sin(2 * Math.PI * 0.18 * t) * 0.02;
            data[i] = rustle + chirp + breeze;
        }

        return buffer;
    }

    private createFireplaceBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 6;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        let brown = 0;
        let crack = 0;
        for (let i = 0; i < data.length; i += 1) {
            const white = Math.random() * 2 - 1;
            brown = (brown + white * 0.03) / 1.03;
            crack *= 0.88;

            if (Math.random() > 0.9975) {
                crack += (Math.random() * 2 - 1) * 0.35;
            }

            data[i] = brown * 0.16 + crack * 0.1;
        }

        return buffer;
    }

    private createWindBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 6;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);

        let filtered = 0;
        for (let i = 0; i < data.length; i += 1) {
            const t = i / sampleRate;
            const white = Math.random() * 2 - 1;
            filtered = filtered * 0.97 + white * 0.03;
            const gust = 0.25 + 0.75 * ((Math.sin(2 * Math.PI * 0.11 * t) + 1) / 2);
            data[i] = filtered * 0.18 * gust;
        }

        return buffer;
    }

    private async createAmbientSound(type: MusicType): Promise<AudioBuffer | null> {
        await this.initAudioContext();

        switch (type) {
            case 'lullaby':
                return this.createLullabyBuffer();
            case 'starlight':
                return this.createStarlightBuffer();
            case 'rain':
                return this.createRainBuffer();
            case 'forest':
                return this.createForestBuffer();
            case 'ocean':
                return this.createOceanBuffer();
            case 'fireplace':
                return this.createFireplaceBuffer();
            case 'wind':
                return this.createWindBuffer();
            default:
                return null;
        }
    }

    private setupFilters(type: MusicType): BiquadFilterNode | null {
        if (!this.audioContext) return null;

        const filter = this.audioContext.createBiquadFilter();

        switch (type) {
            case 'rain':
                filter.type = 'lowpass';
                filter.frequency.value = 2600;
                return filter;
            case 'ocean':
                filter.type = 'lowpass';
                filter.frequency.value = 900;
                return filter;
            case 'wind':
                filter.type = 'bandpass';
                filter.frequency.value = 850;
                filter.Q.value = 1.6;
                return filter;
            case 'forest':
                filter.type = 'lowpass';
                filter.frequency.value = 3400;
                return filter;
            case 'fireplace':
                filter.type = 'lowpass';
                filter.frequency.value = 1800;
                return filter;
            case 'lullaby':
            case 'starlight':
                filter.type = 'lowpass';
                filter.frequency.value = 2800;
                return filter;
            default:
                return null;
        }
    }

    private getTrackFilePath(type: MusicType): string | null {
        const track = MUSIC_TRACKS.find(item => item.id === type);
        return track?.filePath || null;
    }

    private async tryPlayFileTrack(type: MusicType): Promise<boolean> {
        const filePath = this.getTrackFilePath(type);
        if (!filePath || this.unavailableFileTracks.has(type)) return false;

        try {
            const audio = new Audio(filePath);
            audio.loop = true;
            audio.preload = 'auto';
            audio.volume = this.getEffectiveVolume();
            (audio as HTMLAudioElement & { stopRequested?: boolean }).stopRequested = false;

            audio.addEventListener('error', () => {
                const stopRequested = (audio as HTMLAudioElement & { stopRequested?: boolean }).stopRequested;
                if (!stopRequested) {
                    this.unavailableFileTracks.add(type);
                }
            }, { once: true });

            await audio.play();
            this.htmlAudio = audio;
            this.currentTrack = type;
            this.isPlaying = true;
            return true;
        } catch (error) {
            const domName = error instanceof DOMException ? error.name : '';
            if (domName !== 'NotAllowedError') {
                this.unavailableFileTracks.add(type);
            }
            return false;
        }
    }

    async play(type: MusicType): Promise<void> {
        if (type === 'none') {
            this.stop();
            return;
        }

        this.clearFadeTimer();
        this.stop();

        try {
            // Warm audio context first so procedural fallback can still play when
            // local file tracks are missing or blocked.
            await this.initAudioContext();
            if (this.audioContext?.state === 'suspended') {
                this.pendingTrack = type;
                this.attachPendingUnlockHandler();
                return;
            }

            this.pendingTrack = null;
            this.detachPendingUnlockHandler();

            const playedFromFile = await this.tryPlayFileTrack(type);
            if (playedFromFile) return;

            const buffer = await this.createAmbientSound(type);
            if (!buffer || !this.audioContext || !this.gainNode) return;

            this.currentSource = this.audioContext.createBufferSource();
            this.currentSource.buffer = buffer;
            this.currentSource.loop = true;

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
        this.clearFadeTimer();
        if (this.duckingTimer !== null) {
            clearInterval(this.duckingTimer);
            this.duckingTimer = null;
        }
        this.duckingMultiplier = 1;
        this.pendingTrack = null;
        this.detachPendingUnlockHandler();

        if (this.currentSource) {
            try {
                this.currentSource.stop();
            } catch {
                // Source might already be stopped
            }
            this.currentSource = null;
        }

        if (this.htmlAudio) {
            (this.htmlAudio as HTMLAudioElement & { stopRequested?: boolean }).stopRequested = true;
            this.htmlAudio.pause();
            this.htmlAudio.currentTime = 0;
            this.htmlAudio.src = '';
            this.htmlAudio = null;
        }

        this.isPlaying = false;
        this.currentTrack = 'none';
    }

    setVolume(volume: number): void {
        this.userVolume = Math.max(0, Math.min(1, volume));
        this.applyVolume();
    }

    getVolume(): number {
        return this.userVolume;
    }

    getCurrentTrack(): MusicType {
        return this.currentTrack;
    }

    getIsPlaying(): boolean {
        return this.isPlaying;
    }

    setDucking(shouldDuck: boolean, targetMultiplier = 0.42, duration = 220): void {
        const target = shouldDuck ? Math.max(0.15, Math.min(1, targetMultiplier)) : 1;
        const start = this.duckingMultiplier;

        if (Math.abs(start - target) < 0.001) return;
        if (this.duckingTimer !== null) {
            clearInterval(this.duckingTimer);
            this.duckingTimer = null;
        }

        const startTime = Date.now();
        this.duckingTimer = window.setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);
            this.duckingMultiplier = start + (target - start) * progress;
            this.applyVolume();

            if (progress >= 1) {
                if (this.duckingTimer !== null) {
                    clearInterval(this.duckingTimer);
                    this.duckingTimer = null;
                }
            }
        }, 20);
    }

    async fadeIn(type: MusicType, duration = 2000): Promise<void> {
        if (type === 'none') {
            this.stop();
            return;
        }

        const targetVolume = this.userVolume;
        this.setVolume(0);
        await this.play(type);

        const startTime = Date.now();
        this.clearFadeTimer();
        this.fadeTimer = window.setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);
            this.setVolume(targetVolume * progress);

            if (progress >= 1) {
                this.clearFadeTimer();
            }
        }, 50);
    }

    fadeOut(duration = 2000): Promise<void> {
        return new Promise((resolve) => {
            const startVolume = this.userVolume;
            const startTime = Date.now();

            this.clearFadeTimer();
            this.fadeTimer = window.setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(1, elapsed / duration);
                this.setVolume(startVolume * (1 - progress));

                if (progress >= 1) {
                    this.clearFadeTimer();
                    this.stop();
                    this.setVolume(startVolume);
                    resolve();
                }
            }, 50);
        });
    }
}

// Singleton instance
export const backgroundMusic = new BackgroundMusicService();
