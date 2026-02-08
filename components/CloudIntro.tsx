import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CloudIntroProps {
  onFinish: () => void;
  durationMs?: number;
}

const LEFT_CLOUDS = [
  { id: '2', src: '/images/clouds/intro-cloud-2-alpha.png', className: 'cloud-left-a' },
  { id: '3', src: '/images/clouds/intro-cloud-3-alpha.png', className: 'cloud-left-b' },
];

const RIGHT_CLOUDS = [
  { id: '1', src: '/images/clouds/intro-cloud-1-alpha.png', className: 'cloud-right-a' },
  { id: '4', src: '/images/clouds/intro-cloud-4-alpha.png', className: 'cloud-right-b' },
];

const CloudIntro: React.FC<CloudIntroProps> = ({ onFinish, durationMs = 5000 }) => {
  const { language } = useLanguage();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const closeAt = Math.max(450, durationMs - 360);
    const closeTimer = window.setTimeout(() => setIsClosing(true), closeAt);
    const finishTimer = window.setTimeout(onFinish, durationMs);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(finishTimer);
    };
  }, [durationMs, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[220] overflow-hidden pointer-events-none transition-opacity duration-500 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="cloud-intro-bg" />
      <div className="cloud-intro-stars" />
      <div className="cloud-intro-mist" />

      <div className="cloud-intro-bank cloud-intro-bank-left">
        {LEFT_CLOUDS.map((cloud) => (
          <img
            key={`left-cloud-${cloud.id}`}
            src={cloud.src}
            alt=""
            aria-hidden
            className={`cloud-intro-cloud cloud-intro-cloud-left ${cloud.className}`}
          />
        ))}
      </div>

      <div className="cloud-intro-bank cloud-intro-bank-right">
        {RIGHT_CLOUDS.map((cloud) => (
          <img
            key={`right-cloud-${cloud.id}`}
            src={cloud.src}
            alt=""
            aria-hidden
            className={`cloud-intro-cloud cloud-intro-cloud-right ${cloud.className}`}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-8">
        <div className="cloud-intro-center">
          <div className="cloud-intro-glow" />
          <img
            src="/images/logo-storyteller.jpg"
            alt="Storyteller"
            className="cloud-intro-logo"
          />
          <p className="cloud-intro-title">Storyteller</p>
          <p className="cloud-intro-subtitle">
            {language === 'tr' ? 'Bulutların arasından masala geçiliyor...' : 'Passing through the clouds into story...'}
          </p>
        </div>
      </div>

      <style>{`
        .cloud-intro-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(125% 78% at 50% 10%, rgba(148, 118, 255, 0.45), transparent 55%),
            linear-gradient(180deg, #231556 0%, #1b1245 44%, #130c32 100%);
          isolation: isolate;
        }

        .cloud-intro-stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 14% 18%, rgba(255, 255, 255, 0.35) 0 1.4px, transparent 2px),
            radial-gradient(circle at 85% 24%, rgba(255, 255, 255, 0.3) 0 1.1px, transparent 1.8px),
            radial-gradient(circle at 72% 69%, rgba(255, 255, 255, 0.22) 0 1.2px, transparent 2px),
            radial-gradient(circle at 25% 63%, rgba(255, 255, 255, 0.25) 0 1.2px, transparent 2px);
          animation: cloud-intro-stars 1.8s ease-out both;
        }

        .cloud-intro-mist {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(80% 55% at 50% 92%, rgba(255, 255, 255, 0.26) 0, rgba(255, 255, 255, 0) 74%),
            radial-gradient(65% 40% at 50% 12%, rgba(255, 255, 255, 0.16) 0, rgba(255, 255, 255, 0) 70%);
          animation: cloud-intro-mist 1.55s ease-out forwards;
        }

        .cloud-intro-bank {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 56%;
          will-change: transform, opacity;
          pointer-events: none;
          overflow: visible;
        }

        .cloud-intro-bank-left {
          left: 0;
        }

        .cloud-intro-bank-right {
          right: 0;
        }

        .cloud-intro-cloud {
          position: absolute;
          object-fit: contain;
          opacity: 0.96;
          filter: saturate(1.07) contrast(1.05) drop-shadow(0 10px 14px rgba(27, 18, 69, 0.24));
          will-change: transform, opacity;
          user-select: none;
          -webkit-user-drag: none;
          --cloud-delay: 0.22s;
          --cloud-duration: 4.2s;
          animation-duration: var(--cloud-duration);
          animation-delay: var(--cloud-delay);
          animation-timing-function: cubic-bezier(0.2, 0.82, 0.24, 1);
          animation-fill-mode: both;
        }

        .cloud-intro-cloud-left {
          left: 0;
          animation-name: cloud-intro-cloud-left-drift;
        }

        .cloud-intro-cloud-right {
          right: 0;
          animation-name: cloud-intro-cloud-right-drift;
        }

        .cloud-left-a {
          top: 14%;
          left: -22%;
          width: min(84vw, 420px);
        }

        .cloud-left-b {
          top: 52%;
          left: -28%;
          width: min(98vw, 490px);
        }

        .cloud-right-a {
          top: 8%;
          right: -26%;
          width: min(90vw, 450px);
        }

        .cloud-right-b {
          top: 49%;
          right: -20%;
          width: min(88vw, 440px);
        }

        .cloud-intro-center {
          position: relative;
          text-align: center;
          transform: translateY(8px) scale(0.98);
          animation: cloud-intro-center 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
        }

        .cloud-intro-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(72vw, 320px);
          height: min(72vw, 320px);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 204, 150, 0.38) 0%, rgba(255, 204, 150, 0) 74%);
          filter: blur(6px);
        }

        .cloud-intro-logo {
          position: relative;
          width: min(44vw, 190px);
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 30%;
          border: 3px solid rgba(246, 240, 255, 0.72);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.38), 0 0 0 10px rgba(255, 255, 255, 0.1);
          animation:
            cloud-intro-logo-in 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both,
            cloud-intro-logo-float 2.8s ease-in-out 1.1s infinite;
        }

        .cloud-intro-title {
          margin-top: 14px;
          color: #f7f2ff;
          font-weight: 800;
          font-size: clamp(1.45rem, 4.7vw, 1.9rem);
          letter-spacing: 0.01em;
          text-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
        }

        .cloud-intro-subtitle {
          margin-top: 6px;
          color: rgba(240, 232, 255, 0.88);
          font-size: clamp(0.78rem, 2.6vw, 0.95rem);
          font-weight: 600;
          text-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        @keyframes cloud-intro-cloud-left-drift {
          0% { transform: translateX(8%) scale(1.01); opacity: 0.95; }
          76% { opacity: 0.9; }
          100% { transform: translateX(-122%) scale(1.06); opacity: 0; }
        }

        @keyframes cloud-intro-cloud-right-drift {
          0% { transform: translateX(-8%) scale(1.01); opacity: 0.95; }
          76% { opacity: 0.9; }
          100% { transform: translateX(122%) scale(1.06); opacity: 0; }
        }

        @keyframes cloud-intro-mist {
          0% { opacity: 0.9; }
          100% { opacity: 0.08; }
        }

        @keyframes cloud-intro-logo-in {
          0% { transform: scale(0.9) rotate(-4deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes cloud-intro-logo-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes cloud-intro-center {
          0% { opacity: 0; transform: translateY(18px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes cloud-intro-stars {
          0% { opacity: 0.4; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cloud-intro-stars,
          .cloud-intro-cloud,
          .cloud-intro-mist,
          .cloud-intro-center,
          .cloud-intro-logo {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            animation-delay: 0ms !important;
          }
        }

      `}</style>
    </div>
  );
};

export default CloudIntro;
