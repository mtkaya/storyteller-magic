import React, { useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';

interface ProfileSelectorProps {
    onClose: () => void;
}

const AVATARS = ['🧒', '👧', '👦', '🧒🏻', '👧🏻', '👦🏻', '🧒🏽', '👧🏽', '👦🏽', '🧒🏿', '👧🏿', '👦🏿', '🦸', '🦸‍♀️', '🧚', '🧜‍♀️', '🦄', '🐱', '🐶', '🐰'];

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onClose }) => {
    const { profiles, activeProfile, setActiveProfile, addProfile, deleteProfile } = useAppState();
    const { language } = useLanguage();
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState(5);
    const [newAvatar, setNewAvatar] = useState('🧒');

    const handleAddProfile = () => {
        if (newName.trim()) {
            addProfile(newName.trim(), newAge, newAvatar);
            setIsAdding(false);
            setNewName('');
            setNewAge(5);
            setNewAvatar('🧒');
        }
    };

    const handleSelectProfile = (profileId: string) => {
        setActiveProfile(profileId);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-bg-dark rounded-3xl p-6 mx-4 max-w-md w-full border border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {language === 'tr' ? 'Profil Seç' : 'Choose Profile'}
                    </h2>
                    <button onClick={onClose} className="text-white/60 hover:text-white">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {!isAdding ? (
                    <>
                        {/* Profile List */}
                        <div className="space-y-3 mb-6">
                            {profiles.map(profile => (
                                <button
                                    key={profile.id}
                                    onClick={() => handleSelectProfile(profile.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeProfile?.id === profile.id
                                            ? 'bg-primary/20 border-2 border-primary'
                                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="text-4xl">{profile.avatar}</div>
                                    <div className="flex-1 text-left">
                                        <p className="font-bold text-white">{profile.name}</p>
                                        <p className="text-white/50 text-sm">
                                            {profile.age} {language === 'tr' ? 'yaş' : 'years old'} • {profile.stats.totalStoriesRead} {language === 'tr' ? 'hikaye' : 'stories'}
                                        </p>
                                    </div>
                                    {activeProfile?.id === profile.id && (
                                        <span className="material-symbols-outlined text-primary">check_circle</span>
                                    )}
                                    {profiles.length > 1 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (confirm(language === 'tr' ? 'Bu profili silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this profile?')) {
                                                    deleteProfile(profile.id);
                                                }
                                            }}
                                            className="text-white/30 hover:text-red-400 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Add Profile Button */}
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full py-4 rounded-xl border-2 border-dashed border-white/20 text-white/60 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">add</span>
                            {language === 'tr' ? 'Yeni Profil Ekle' : 'Add New Profile'}
                        </button>
                    </>
                ) : (
                    /* Add Profile Form */
                    <div className="space-y-6">
                        {/* Avatar Selection */}
                        <div>
                            <label className="text-white/60 text-sm mb-2 block">
                                {language === 'tr' ? 'Avatar Seç' : 'Choose Avatar'}
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {AVATARS.map(avatar => (
                                    <button
                                        key={avatar}
                                        onClick={() => setNewAvatar(avatar)}
                                        className={`text-3xl p-2 rounded-xl transition-all ${newAvatar === avatar
                                                ? 'bg-primary/30 ring-2 ring-primary'
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        {avatar}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Name Input */}
                        <div>
                            <label className="text-white/60 text-sm mb-2 block">
                                {language === 'tr' ? 'İsim' : 'Name'}
                            </label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder={language === 'tr' ? 'Çocuğun adı...' : "Child's name..."}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
                                maxLength={20}
                            />
                        </div>

                        {/* Age Selector */}
                        <div>
                            <label className="text-white/60 text-sm mb-2 block">
                                {language === 'tr' ? 'Yaş' : 'Age'}: {newAge}
                            </label>
                            <input
                                type="range"
                                min="2"
                                max="12"
                                value={newAge}
                                onChange={(e) => setNewAge(parseInt(e.target.value))}
                                className="w-full accent-primary"
                            />
                            <div className="flex justify-between text-white/40 text-xs mt-1">
                                <span>2</span>
                                <span>12</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsAdding(false)}
                                className="flex-1 py-3 rounded-xl bg-white/10 text-white/60 hover:bg-white/20 transition-all"
                            >
                                {language === 'tr' ? 'İptal' : 'Cancel'}
                            </button>
                            <button
                                onClick={handleAddProfile}
                                disabled={!newName.trim()}
                                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-all"
                            >
                                {language === 'tr' ? 'Ekle' : 'Add'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileSelector;
