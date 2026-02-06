import React, { useState } from 'react';
import { LANGUAGES } from '../data';
import { ScreenName } from '../types';

interface SettingsProps {
  onNavigate: (screen: ScreenName) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate, onBack }) => {
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-white">
       <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pt-4 pb-2">
        <div className="flex items-center gap-3 px-4 mb-2">
           <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white">
             <span className="material-symbols-outlined">arrow_back</span>
           </button>
           <h1 className="text-xl font-bold">Parental Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Subscription Banner */}
        <div 
            onClick={() => onNavigate('subscription')}
            className="rounded-2xl bg-gradient-to-r from-secondary to-purple-900 p-5 flex items-center justify-between cursor-pointer shadow-lg active:scale-98 transition-transform"
        >
            <div>
                <p className="font-bold text-lg">Upgrade to Pro</p>
                <p className="text-white/80 text-xs mt-1">Unlock unlimited stories & features</p>
            </div>
            <div className="size-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">chevron_right</span>
            </div>
        </div>

        {/* Language Settings */}
        <section>
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 px-1">Language / Dil</h3>
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                {LANGUAGES.map((lang, idx) => (
                    <button 
                        key={lang.code}
                        onClick={() => setSelectedLang(lang.code)}
                        className={`w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors ${idx !== LANGUAGES.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{lang.flag}</span>
                            <span className="font-medium">{lang.name}</span>
                        </div>
                        {selectedLang === lang.code && (
                            <span className="material-symbols-outlined text-primary">check</span>
                        )}
                    </button>
                ))}
            </div>
        </section>

        {/* General Settings */}
        <section>
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 px-1">App Settings</h3>
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 space-y-[1px]">
                <div className="flex items-center justify-between p-4 bg-bg-card">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white/60">volume_up</span>
                        <span>Sound Effects</span>
                    </div>
                    <div className="w-10 h-6 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>
                 <div className="flex items-center justify-between p-4 bg-bg-card">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white/60">notifications</span>
                        <span>Notifications</span>
                    </div>
                     <div className="w-10 h-6 bg-white/10 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>

        {/* Support */}
        <section>
             <button className="w-full text-left text-white/60 text-sm p-4 hover:text-white transition-colors">
                 Restore Purchases
             </button>
             <button className="w-full text-left text-white/60 text-sm p-4 hover:text-white transition-colors">
                 Help & Support
             </button>
             <button className="w-full text-left text-red-400 text-sm p-4 hover:text-red-300 transition-colors">
                 Log Out
             </button>
        </section>
        
        <p className="text-center text-white/20 text-xs py-4">Version 1.0.2</p>
      </div>
    </div>
  );
};

export default Settings;