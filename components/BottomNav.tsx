import React from 'react';
import { ScreenName } from '../types';

interface BottomNavProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const getIconClass = (screen: ScreenName) => {
    return activeScreen === screen ? 'text-primary' : 'text-gray-400 hover:text-white transition-colors';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="flex gap-2 border-t border-white/10 bg-[#1a1625]/95 backdrop-blur-xl px-4 pb-8 pt-3 max-w-[430px] mx-auto">
        <button 
          onClick={() => onNavigate('home')} 
          className={`flex flex-1 flex-col items-center justify-center gap-1 ${getIconClass('home')}`}
        >
          <span className="material-symbols-outlined text-2xl">home</span>
          <p className="text-[10px] font-medium leading-normal tracking-wide uppercase">Home</p>
        </button>

        <button 
          onClick={() => onNavigate('library')} 
          className={`flex flex-1 flex-col items-center justify-center gap-1 ${getIconClass('library')}`}
        >
          <span className="material-symbols-outlined text-2xl">auto_stories</span>
          <p className="text-[10px] font-medium leading-normal tracking-wide uppercase">Library</p>
        </button>

        <button 
          onClick={() => onNavigate('achievements')} 
          className={`flex flex-1 flex-col items-center justify-center gap-1 ${getIconClass('achievements')}`}
        >
          <span className="material-symbols-outlined text-2xl">emoji_events</span>
          <p className="text-[10px] font-medium leading-normal tracking-wide uppercase">Badges</p>
        </button>

        <button 
          onClick={() => onNavigate('parental_settings')} 
          className={`flex flex-1 flex-col items-center justify-center gap-1 ${getIconClass('parental_settings')}`}
        >
          <span className="material-symbols-outlined text-2xl">settings</span>
          <p className="text-[10px] font-medium leading-normal tracking-wide uppercase">Parents</p>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;