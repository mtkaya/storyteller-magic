import React from 'react';
import { ScreenName } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  onMapClick?: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate, onMapClick }) => {
  const { language, t } = useLanguage();

  const getIconClass = (screen: ScreenName) => {
    return activeScreen === screen ? 'text-primary' : 'text-gray-400 hover:text-white transition-colors';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="grid grid-cols-5 gap-1 border-t border-white/10 bg-[#1a1625]/95 backdrop-blur-xl px-3 pb-8 pt-3 max-w-[430px] mx-auto">
        <button 
          onClick={() => onNavigate('home')} 
          className={`flex min-w-0 flex-col items-center justify-center gap-1 ${getIconClass('home')}`}
        >
          <span className="material-symbols-outlined text-[22px]">home</span>
          <p className="text-[9px] font-semibold leading-tight tracking-wide truncate">{t.nav_home}</p>
        </button>

        <button 
          onClick={() => onNavigate('library')} 
          className={`flex min-w-0 flex-col items-center justify-center gap-1 ${getIconClass('library')}`}
        >
          <span className="material-symbols-outlined text-[22px]">auto_stories</span>
          <p className="text-[9px] font-semibold leading-tight tracking-wide truncate">{t.nav_library}</p>
        </button>

        <button
          onClick={onMapClick}
          className="flex min-w-0 flex-col items-center justify-center gap-1 text-gray-300 hover:text-white transition-colors"
          aria-label={language === 'tr' ? 'Harita' : 'Map'}
        >
          <span className="material-symbols-outlined text-[22px]">map</span>
          <p className="text-[9px] font-semibold leading-tight tracking-wide truncate">
            {language === 'tr' ? 'Harita' : 'Map'}
          </p>
        </button>

        <button 
          onClick={() => onNavigate('achievements')} 
          className={`flex min-w-0 flex-col items-center justify-center gap-1 ${getIconClass('achievements')}`}
        >
          <span className="material-symbols-outlined text-[22px]">emoji_events</span>
          <p className="text-[9px] font-semibold leading-tight tracking-wide truncate">{t.nav_achievements}</p>
        </button>

        <button 
          onClick={() => onNavigate('parental_settings')} 
          className={`flex min-w-0 flex-col items-center justify-center gap-1 ${getIconClass('parental_settings')}`}
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <p className="text-[9px] font-semibold leading-tight tracking-wide truncate">
            {language === 'tr' ? 'Ebeveyn' : 'Parents'}
          </p>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
