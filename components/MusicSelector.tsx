import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { backgroundMusic, MUSIC_TRACKS, MusicType } from '../services/backgroundMusic';

interface MusicSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    currentTrack: MusicType;
    onSelect: (track: MusicType) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({ isOpen, onClose, currentTrack, onSelect }) => {
    const { language } = useLanguage();
    const [volume, setVolume] = useState(30);
    const [previewTrack, setPreviewTrack] = useState<MusicType | null>(null);

    useEffect(() => {
        // Set initial volume
        backgroundMusic.setVolume(volume / 100);
    }, []);

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        backgroundMusic.setVolume(newVolume / 100);
    };

    const handlePreview = (trackId: MusicType) => {
        if (previewTrack === trackId) {
            // Stop preview
            backgroundMusic.stop();
            setPreviewTrack(null);
        } else {
            // Play preview
            backgroundMusic.play(trackId);
            setPreviewTrack(trackId);
        }
    };

    const handleSelect = (trackId: MusicType) => {
        onSelect(trackId);
        if (trackId === 'none') {
            backgroundMusic.stop();
        } else {
            backgroundMusic.fadeIn(trackId, 1000);
        }
        setPreviewTrack(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-bg-dark rounded-t-3xl p-6 w-full max-w-md border-t border-white/10 shadow-2xl animate-slide-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Handle */}
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🎵</span>
                        <h2 className="text-xl font-bold text-white">
                            {language === 'tr' ? 'Arka Plan Müziği' : 'Background Music'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-white/60 hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Volume Control */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-white/60 text-sm">
                            {language === 'tr' ? 'Ses Seviyesi' : 'Volume'}
                        </span>
                        <span className="text-primary font-bold">{volume}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white/40">volume_down</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                            className="flex-1 accent-primary h-2 rounded-full"
                        />
                        <span className="material-symbols-outlined text-white/40">volume_up</span>
                    </div>
                </div>

                {/* Track List */}
                <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                    {MUSIC_TRACKS.map(track => (
                        <div
                            key={track.id}
                            className={`flex items-center gap-4 p-3 rounded-xl transition-all ${currentTrack === track.id
                                    ? 'bg-primary/20 border border-primary'
                                    : 'bg-white/5 border border-transparent hover:bg-white/10'
                                }`}
                        >
                            {/* Preview Button */}
                            <button
                                onClick={() => handlePreview(track.id)}
                                className={`size-10 rounded-full flex items-center justify-center transition-all ${previewTrack === track.id
                                        ? 'bg-secondary text-white animate-pulse'
                                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                                    }`}
                                disabled={track.id === 'none'}
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {previewTrack === track.id ? 'stop' : 'play_arrow'}
                                </span>
                            </button>

                            {/* Track Info */}
                            <div className="flex-1" onClick={() => handleSelect(track.id)}>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">{track.icon}</span>
                                    <span className="font-medium text-white">
                                        {language === 'tr' ? track.nameTr : track.name}
                                    </span>
                                </div>
                            </div>

                            {/* Select Button */}
                            {currentTrack === track.id ? (
                                <span className="material-symbols-outlined text-primary">check_circle</span>
                            ) : (
                                <button
                                    onClick={() => handleSelect(track.id)}
                                    className="text-white/40 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined">radio_button_unchecked</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Tip */}
                <p className="text-white/40 text-xs text-center mt-4">
                    {language === 'tr'
                        ? 'Müzik hikaye okunurken sessizce çalar'
                        : 'Music plays softly during story reading'}
                </p>
            </div>

            <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default MusicSelector;
