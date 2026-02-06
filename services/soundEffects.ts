// Sound Effects Service for story interactions
// Provides ambient sounds and feedback effects

export type SoundEffect =
    | 'page_turn'
    | 'choice_select'
    | 'badge_unlock'
    | 'story_complete'
    | 'magic_sparkle'
    | 'button_click'
    | 'notification'
    | 'success'
    | 'error';

class SoundEffectsService {
    private audioContext: AudioContext | null = null;
    private enabled: boolean = true;
    private volume: number = 0.5;

    private async initContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.audioContext;
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
    }

    setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    async play(effect: SoundEffect): Promise<void> {
        if (!this.enabled) return;

        const ctx = await this.initContext();
        const gainNode = ctx.createGain();
        gainNode.gain.value = this.volume;
        gainNode.connect(ctx.destination);

        switch (effect) {
            case 'page_turn':
                await this.playPageTurn(ctx, gainNode);
                break;
            case 'choice_select':
                await this.playChoiceSelect(ctx, gainNode);
                break;
            case 'badge_unlock':
                await this.playBadgeUnlock(ctx, gainNode);
                break;
            case 'story_complete':
                await this.playStoryComplete(ctx, gainNode);
                break;
            case 'magic_sparkle':
                await this.playMagicSparkle(ctx, gainNode);
                break;
            case 'button_click':
                await this.playButtonClick(ctx, gainNode);
                break;
            case 'notification':
                await this.playNotification(ctx, gainNode);
                break;
            case 'success':
                await this.playSuccess(ctx, gainNode);
                break;
            case 'error':
                await this.playError(ctx, gainNode);
                break;
        }
    }

    // Page turn - soft whoosh sound
    private async playPageTurn(ctx: AudioContext, gain: GainNode) {
        const duration = 0.15;
        const noise = this.createNoiseBuffer(ctx, duration);
        const source = ctx.createBufferSource();
        source.buffer = noise;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1500, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + duration);
        filter.Q.value = 2;

        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0.3, ctx.currentTime);
        envelope.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        source.connect(filter);
        filter.connect(envelope);
        envelope.connect(gain);
        source.start();
        source.stop(ctx.currentTime + duration);
    }

    // Choice select - soft chime
    private async playChoiceSelect(ctx: AudioContext, gain: GainNode) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.1);

        const envelope = ctx.createGain();
        envelope.gain.setValueAtTime(0.2, ctx.currentTime);
        envelope.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        osc.connect(envelope);
        envelope.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    }

    // Badge unlock - celebratory fanfare
    private async playBadgeUnlock(ctx: AudioContext, gain: GainNode) {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        const duration = 0.15;

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.value = freq;

            const env = ctx.createGain();
            const startTime = ctx.currentTime + i * 0.1;
            env.gain.setValueAtTime(0, startTime);
            env.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
            env.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

            osc.connect(env);
            env.connect(gain);
            osc.start(startTime);
            osc.stop(startTime + duration);
        });
    }

    // Story complete - magical completion sound
    private async playStoryComplete(ctx: AudioContext, gain: GainNode) {
        // Ascending arpeggio
        const notes = [392, 493.88, 587.33, 783.99]; // G4, B4, D5, G5

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;

            const env = ctx.createGain();
            const startTime = ctx.currentTime + i * 0.15;
            env.gain.setValueAtTime(0, startTime);
            env.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
            env.gain.setValueAtTime(0.2, startTime + 0.2);
            env.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

            osc.connect(env);
            env.connect(gain);
            osc.start(startTime);
            osc.stop(startTime + 0.5);
        });
    }

    // Magic sparkle - twinkling sound
    private async playMagicSparkle(ctx: AudioContext, gain: GainNode) {
        for (let i = 0; i < 5; i++) {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = 2000 + Math.random() * 2000;

            const env = ctx.createGain();
            const startTime = ctx.currentTime + i * 0.05;
            env.gain.setValueAtTime(0.1, startTime);
            env.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

            osc.connect(env);
            env.connect(gain);
            osc.start(startTime);
            osc.stop(startTime + 0.1);
        }
    }

    // Button click - subtle pop
    private async playButtonClick(ctx: AudioContext, gain: GainNode) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

        const env = ctx.createGain();
        env.gain.setValueAtTime(0.15, ctx.currentTime);
        env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        osc.connect(env);
        env.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }

    // Notification - gentle bell
    private async playNotification(ctx: AudioContext, gain: GainNode) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 880;

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 1320;

        const env = ctx.createGain();
        env.gain.setValueAtTime(0.2, ctx.currentTime);
        env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        osc.connect(env);
        osc2.connect(env);
        env.connect(gain);
        osc.start();
        osc2.start();
        osc.stop(ctx.currentTime + 0.3);
        osc2.stop(ctx.currentTime + 0.3);
    }

    // Success - positive confirmation
    private async playSuccess(ctx: AudioContext, gain: GainNode) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);

        const env = ctx.createGain();
        env.gain.setValueAtTime(0.15, ctx.currentTime);
        env.gain.setValueAtTime(0.15, ctx.currentTime + 0.15);
        env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

        osc.connect(env);
        env.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
    }

    // Error - soft warning
    private async playError(ctx: AudioContext, gain: GainNode) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.setValueAtTime(250, ctx.currentTime + 0.1);

        const env = ctx.createGain();
        env.gain.setValueAtTime(0.15, ctx.currentTime);
        env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        osc.connect(env);
        env.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    }

    // Utility: Create noise buffer
    private createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
        const sampleRate = ctx.sampleRate;
        const bufferSize = sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        return buffer;
    }
}

export const soundEffects = new SoundEffectsService();
