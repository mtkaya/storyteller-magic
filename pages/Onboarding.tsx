import React, { useState } from 'react';
import { IMAGES } from '../data';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onComplete(trimmed);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark bg-star-dust items-center justify-center px-8 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-magic-gradient opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm gap-8">
        {/* Wand image */}
        <div
          className="w-32 h-32"
          style={{ animation: 'fadeIn 0.8s ease forwards', opacity: 0 }}
        >
          <img
            src={IMAGES.WAND_UI}
            alt="Magic Wand"
            className="w-full h-full object-contain drop-shadow-[0_0_24px_rgba(238,140,43,0.7)] animate-pulse-slow"
          />
        </div>

        {/* Headings */}
        <div
          className="text-center"
          style={{ animation: 'fadeIn 0.8s ease forwards', animationDelay: '0.3s', opacity: 0 }}
        >
          <h1 className="text-4xl font-bold text-white leading-tight mb-3">
            Storyteller Magic
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            A magical bedtime story world awaits.<br />What shall we call you, little explorer?
          </p>
        </div>

        {/* Name input */}
        <div
          className="w-full"
          style={{ animation: 'fadeIn 0.8s ease forwards', animationDelay: '0.6s', opacity: 0 }}
        >
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter your name..."
            maxLength={32}
            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-5 text-center text-xl text-white placeholder:text-white/30 outline-none focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/30 transition-all"
          />
        </div>

        {/* CTA button */}
        <div
          className="w-full"
          style={{ animation: 'fadeIn 0.8s ease forwards', animationDelay: '0.9s', opacity: 0 }}
        >
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full py-4 rounded-xl bg-accent-peach text-bg-dark text-lg font-extrabold shadow-[0_0_24px_rgba(255,176,142,0.4)] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">auto_fix_high</span>
            Begin Your Journey ✨
          </button>
        </div>

        <p
          className="text-white/30 text-xs text-center"
          style={{ animation: 'fadeIn 0.8s ease forwards', animationDelay: '1.2s', opacity: 0 }}
        >
          Your name stays on this device — no account needed.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
