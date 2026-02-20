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
type PlayableMusicType = Exclude<MusicType, 'none'>;

const TRACK_GAIN_MULTIPLIER: Record<PlayableMusicType, number> = {
    lullaby: 0.84,
    starlight: 0.82,
    rain: 0.92,
    forest: 0.9,
    ocean: 0.9,
    fireplace: 0.86,
    wind: 0.88,
};

const TRACK_DUCKING_TARGET: Record<PlayableMusicType, number> = {
    lullaby: 0.34,
    starlight: 0.34,
    rain: 0.5,
    forest: 0.48,
    ocean: 0.5,
    fireplace: 0.46,
    wind: 0.48,
};

class BackgroundMusicService {
    private audioContext: AudioContext | null = null;
    private currentSource: AudioBufferSourceNode | null = null;
    private gainNode: GainNode | null = null;
    private masterLowpass: BiquadFilterNode | null = null;
    private compressor: DynamicsCompressorNode | null = null;
    private htmlAudio: HTMLAudioElement | null = null;
    private unavailableFileTracks = new Set<MusicType>();
    private fileTrackAvailability = new Map<MusicType, boolean>();
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

            this.masterLowpass = this.audioContext.createBiquadFilter();
            this.masterLowpass.type = 'lowpass';
            this.masterLowpass.frequency.value = 4600;
            this.masterLowpass.Q.value = 0.7;

            this.compressor = this.audioContext.createDynamicsCompressor();
            this.compressor.threshold.value = -30;
            this.compressor.knee.value = 16;
            this.compressor.ratio.value = 2.8;
            this.compressor.attack.value = 0.03;
            this.compressor.release.value = 0.28;

            this.gainNode.connect(this.masterLowpass);
            this.masterLowpass.connect(this.compressor);
            this.compressor.connect(this.audioContext.destination);
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
        const trackMix = this.currentTrack !== 'none' ? TRACK_GAIN_MULTIPLIER[this.currentTrack] : 1;
        return Math.max(0, Math.min(1, this.userVolume * this.duckingMultiplier * trackMix));
    }

    private applyVolume() {
        const effectiveVolume = this.getEffectiveVolume();
        if (this.gainNode) {
            const now = this.audioContext?.currentTime ?? 0;
            this.gainNode.gain.cancelScheduledValues(now);
            this.gainNode.gain.linearRampToValueAtTime(effectiveVolume, now + 0.06);
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

    private applyEdgeFade(channelData: Float32Array, sampleRate: number, fadeMs = 90) {
        const fadeSamples = Math.max(32, Math.floor(sampleRate * (fadeMs / 1000)));
        const length = channelData.length;
        const limit = Math.min(fadeSamples, Math.floor(length / 2));
        for (let i = 0; i < limit; i += 1) {
            const fadeIn = i / limit;
            const fadeOut = (limit - i) / limit;
            channelData[i] *= fadeIn;
            channelData[length - 1 - i] *= fadeOut;
        }
    }

    private normalizeBuffer(buffer: AudioBuffer, targetPeak = 0.78) {
        let peak = 0;
        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            for (let i = 0; i < data.length; i += 1) {
                const sample = Math.abs(data[i]);
                if (sample > peak) peak = sample;
            }
        }

        if (peak < 1e-4) return;
        const scale = Math.min(1.6, targetPeak / peak);
        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            for (let i = 0; i < data.length; i += 1) {
                data[i] = Math.tanh(data[i] * scale);
            }
        }
    }

    private finalizeLoopBuffer(buffer: AudioBuffer, targetPeak = 0.78, fadeMs = 90) {
        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            this.applyEdgeFade(buffer.getChannelData(channel), buffer.sampleRate, fadeMs);
        }
        this.normalizeBuffer(buffer, targetPeak);
    }

    private async waitForAudioReady(audio: HTMLAudioElement, timeoutMs = 1600): Promise<boolean> {
        return new Promise((resolve) => {
            let settled = false;

            const finish = (result: boolean) => {
                if (settled) return;
                settled = true;
                cleanup();
                resolve(result);
            };

            const onCanPlay = () => finish(true);
            const onError = () => finish(false);

            const cleanup = () => {
                audio.removeEventListener('canplay', onCanPlay);
                audio.removeEventListener('canplaythrough', onCanPlay);
                audio.removeEventListener('error', onError);
                clearTimeout(timeout);
            };

            const timeout = window.setTimeout(() => finish(false), timeoutMs);
            audio.addEventListener('canplay', onCanPlay, { once: true });
            audio.addEventListener('canplaythrough', onCanPlay, { once: true });
            audio.addEventListener('error', onError, { once: true });
            audio.load();
        });
    }

    private async ensureFileTrackAvailable(type: MusicType, filePath: string): Promise<boolean> {
        const cached = this.fileTrackAvailability.get(type);
        if (cached !== undefined) return cached;

        const probe = new Audio(filePath);
        probe.preload = 'auto';

        const available = await this.waitForAudioReady(probe);
        this.fileTrackAvailability.set(type, available);
        if (!available) {
            this.unavailableFileTracks.add(type);
        }
        return available;
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
        const duration = 24;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

        const progression = [
            [261.63, 329.63, 392],
            [293.66, 369.99, 440],
            [246.94, 311.13, 392],
            [220, 293.66, 349.23],
        ];
        const melodyNotes = [392, 440, 493.88, 440, 392, 349.23, 329.63, 293.66, 261.63, 293.66, 329.63, 349.23, 392, 349.23, 329.63, 293.66];
        const noteDuration = 1.5;

        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            const panOffset = channel === 0 ? -0.0035 : 0.0035;

            for (let i = 0; i < data.length; i += 1) {
                const t = i / sampleRate;
                const tt = t + panOffset;
                const chord = progression[Math.floor(t / 6) % progression.length];
                const lfo = 0.55 + 0.45 * Math.sin(2 * Math.PI * 0.07 * t + (channel === 0 ? 0 : Math.PI / 5));

                const pad =
                    (Math.sin(2 * Math.PI * chord[0] * tt) * 0.016 +
                        Math.sin(2 * Math.PI * chord[1] * tt) * 0.013 +
                        Math.sin(2 * Math.PI * chord[2] * tt) * 0.011) * lfo;

                const noteIndex = Math.floor(t / noteDuration) % melodyNotes.length;
                const noteT = t % noteDuration;
                const env = Math.pow(Math.sin((noteT / noteDuration) * Math.PI), 1.35);
                const freq = melodyNotes[noteIndex];
                const melody =
                    (Math.sin(2 * Math.PI * freq * tt) * 0.07 +
                        Math.sin(2 * Math.PI * freq * 2 * tt) * 0.024 +
                        Math.sin(2 * Math.PI * freq * 3 * tt) * 0.01) * env;

                const bass = Math.sin(2 * Math.PI * (chord[0] / 2) * tt) * 0.024 * (0.7 + 0.3 * Math.sin(2 * Math.PI * 0.09 * t));
                const air = (Math.sin(2 * Math.PI * 31.5 * tt) + Math.sin(2 * Math.PI * 47.2 * tt)) * 0.0017;

                data[i] = pad + melody + bass + air;
            }
        }

        this.finalizeLoopBuffer(buffer, 0.64, 130);
        return buffer;
    }

    private createStarlightBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 20;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

        const arpeggio = [523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 523.25, 587.33, 739.99, 880, 1174.66, 1046.5, 880, 739.99, 587.33];
        const roots = [261.63, 293.66, 329.63, 349.23];
        const stepDuration = 0.5;

        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            const panOffset = channel === 0 ? -0.0028 : 0.0028;

            for (let i = 0; i < data.length; i += 1) {
                const t = i / sampleRate;
                const tt = t + panOffset;

                const step = Math.floor(t / stepDuration);
                const arpFreq = arpeggio[step % arpeggio.length];
                const stepT = t % stepDuration;
                const arpEnv = Math.pow(Math.sin((stepT / stepDuration) * Math.PI), 1.8);
                const sparkle =
                    (Math.sin(2 * Math.PI * arpFreq * tt) * 0.055 +
                        Math.sin(2 * Math.PI * arpFreq * 2 * tt) * 0.02 +
                        Math.sin(2 * Math.PI * arpFreq * 3 * tt) * 0.008) * arpEnv;

                const root = roots[Math.floor(t / 5) % roots.length];
                const padLfo = 0.45 + 0.55 * Math.sin(2 * Math.PI * 0.043 * t + (channel === 0 ? 0 : Math.PI / 7));
                const pad =
                    (Math.sin(2 * Math.PI * root * tt) * 0.018 +
                        Math.sin(2 * Math.PI * root * 1.25 * tt) * 0.014 +
                        Math.sin(2 * Math.PI * root * 1.5 * tt) * 0.009) * padLfo;

                const shimmer = Math.sin(2 * Math.PI * 0.23 * t) * 0.012;
                data[i] = sparkle + pad + shimmer;
            }
        }

        this.finalizeLoopBuffer(buffer, 0.62, 120);
        return buffer;
    }

    private createRainBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 18;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            let filtered = 0;
            let dropEnergy = 0;
            let dropFreq = 1100;

            for (let i = 0; i < data.length; i += 1) {
                const t = i / sampleRate;
                const white = Math.random() * 2 - 1;
                filtered = filtered * 0.985 + white * 0.015;

                if (Math.random() > 0.9992) {
                    dropEnergy = 0.75 + Math.random() * 0.35;
                    dropFreq = 700 + Math.random() * 1400;
                }

                dropEnergy *= 0.99925;
                const drizzle = filtered * 0.18;
                const drop = Math.sin(2 * Math.PI * dropFreq * t) * dropEnergy * 0.052;
                const hiss = (Math.random() * 2 - 1) * 0.014 * (0.6 + 0.4 * Math.sin(2 * Math.PI * 0.12 * t));
                data[i] = drizzle + drop + hiss;
            }
        }

        this.finalizeLoopBuffer(buffer, 0.74, 100);
        return buffer;
    }

    private createOceanBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 20;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            let brown = 0;

            for (let i = 0; i < data.length; i += 1) {
                const t = i / sampleRate;
                const white = Math.random() * 2 - 1;
                brown = (brown + white * 0.015) / 1.015;

                const swell = 0.32 + 0.68 * ((Math.sin(2 * Math.PI * 0.05 * t + channel * 0.35) + 1) / 2);
                const waveTone = Math.sin(2 * Math.PI * (0.18 + channel * 0.015) * t) * 0.03;
                const foam = (Math.random() * 2 - 1) * 0.018 * (0.4 + 0.6 * swell);
                data[i] = (brown * 0.24 + waveTone + foam) * swell;
            }
        }

        this.finalizeLoopBuffer(buffer, 0.7, 120);
        return buffer;
    }

    private createForestBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 18;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            let filtered = 0;

            for (let i = 0; i < data.length; i += 1) {
                const t = i / sampleRate;
                const white = Math.random() * 2 - 1;
                filtered = filtered * 0.978 + white * 0.022;
                const rustle = filtered * 0.16;

                const chirpCycle = 4.2;
                const chirpPhase = (t + channel * 0.22) % chirpCycle;
                const chirp =
                    chirpPhase < 0.095
                        ? Math.sin(2 * Math.PI * (1450 + chirpPhase * 1700) * chirpPhase) * (1 - chirpPhase / 0.095) * 0.045
                        : 0;

                const breeze = Math.sin(2 * Math.PI * 0.1 * t + channel * 0.4) * 0.018;
                data[i] = rustle + chirp + breeze;
            }
        }

        this.finalizeLoopBuffer(buffer, 0.72, 110);
        return buffer;
    }

    private createFireplaceBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 16;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            let brown = 0;
            let crack = 0;

            for (let i = 0; i < data.length; i += 1) {
                const white = Math.random() * 2 - 1;
                brown = (brown + white * 0.026) / 1.026;
                crack *= 0.86;

                if (Math.random() > 0.9981) {
                    crack += (Math.random() * 2 - 1) * 0.28;
                }

                const ember = Math.sin(2 * Math.PI * (120 + channel * 17) * (i / sampleRate)) * 0.008;
                data[i] = brown * 0.18 + crack * 0.11 + ember;
            }
        }

        this.finalizeLoopBuffer(buffer, 0.72, 100);
        return buffer;
    }

    private createWindBuffer(): AudioBuffer {
        const ctx = this.audioContext!;
        const duration = 16;
        const sampleRate = ctx.sampleRate;
        const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

        for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
            const data = buffer.getChannelData(channel);
            let filtered = 0;

            for (let i = 0; i < data.length; i += 1) {
                const t = i / sampleRate;
                const white = Math.random() * 2 - 1;
                filtered = filtered * 0.982 + white * 0.018;
                const gust = 0.2 + 0.8 * ((Math.sin(2 * Math.PI * 0.09 * t + channel * 0.3) + 1) / 2);
                const whistle = Math.sin(2 * Math.PI * (380 + 60 * gust) * t + channel * 0.7) * 0.012 * gust;
                data[i] = filtered * 0.17 * gust + whistle;
            }
        }

        this.finalizeLoopBuffer(buffer, 0.74, 110);
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

    private async playProceduralTrack(type: MusicType): Promise<boolean> {
        const buffer = await this.createAmbientSound(type);
        if (!buffer || !this.audioContext || !this.gainNode) return false;

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
        this.applyVolume();
        return true;
    }

    private async tryPlayFileTrack(type: MusicType): Promise<boolean> {
        const filePath = this.getTrackFilePath(type);
        if (!filePath || this.unavailableFileTracks.has(type)) return false;

        try {
            const isAvailable = await this.ensureFileTrackAvailable(type, filePath);
            if (!isAvailable) return false;

            const audio = new Audio(filePath);
            audio.loop = true;
            audio.preload = 'auto';
            audio.volume = this.getEffectiveVolume();
            (audio as HTMLAudioElement & { stopRequested?: boolean }).stopRequested = false;

            audio.addEventListener('error', () => {
                const stopRequested = (audio as HTMLAudioElement & { stopRequested?: boolean }).stopRequested;
                if (!stopRequested) {
                    this.unavailableFileTracks.add(type);
                    this.fileTrackAvailability.set(type, false);
                    if (this.htmlAudio === audio) {
                        this.htmlAudio = null;
                    }
                    this.isPlaying = false;
                    void this.playProceduralTrack(type);
                }
            }, { once: true });

            await audio.play();
            this.htmlAudio = audio;
            this.currentTrack = type;
            this.isPlaying = true;
            this.applyVolume();
            return true;
        } catch (error) {
            const domName = error instanceof DOMException ? error.name : '';
            if (domName !== 'NotAllowedError') {
                this.unavailableFileTracks.add(type);
                this.fileTrackAvailability.set(type, false);
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

            await this.playProceduralTrack(type);
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

    setDucking(shouldDuck: boolean, targetMultiplier?: number, duration = 360): void {
        const contextualTarget =
            this.currentTrack !== 'none'
                ? TRACK_DUCKING_TARGET[this.currentTrack]
                : 0.4;
        const requestedTarget = targetMultiplier ?? contextualTarget;
        const target = shouldDuck ? Math.max(0.15, Math.min(1, requestedTarget)) : 1;
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
