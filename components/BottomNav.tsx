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

  const getNavItemStyle = (screen: ScreenName) => {
    const isActive = activeScreen === screen;
    return {
      color: isActive ? '#ee8c2b' : 'rgba(255,255,255,0.45)',
    };
  };

  const NavButton = ({
    screen,
    icon,
    label,
    onClick
  }: {
    screen?: ScreenName;
    icon: string;
    label: string;
    onClick: () => void;
  }) => {
    const isActive = screen && activeScreen === screen;
    const style = screen ? getNavItemStyle(screen) : { color: 'rgba(255,255,255,0.6)' };

    return (
      <button
        onClick={onClick}
        className="flex min-w-0 flex-col items-center justify-center gap-1 transition-colors relative"
        style={style}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = style.color;
        }}
      >
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
        <p className="text-[9px] font-semibold leading-tight tracking-wide truncate">{label}</p>
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#ee8c2b' }} />
        )}
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="grid grid-cols-5 gap-1 border-t border-white/10 bg-[#1a1625]/95 backdrop-blur-xl px-3 pb-8 pt-3 max-w-[430px] mx-auto">
        <NavButton
          screen="home"
          icon="home"
          label={t.nav_home}
          onClick={() => onNavigate('home')}
        />

        <NavButton
          screen="library"
          icon="auto_stories"
          label={t.nav_library}
          onClick={() => onNavigate('library')}
        />

        <NavButton
          icon="map"
          label={language === 'tr' ? 'Harita' : 'Map'}
          onClick={onMapClick || (() => {})}
        />

        <NavButton
          screen="achievements"
          icon="emoji_events"
          label={t.nav_achievements}
          onClick={() => onNavigate('achievements')}
        />

        <NavButton
          screen="parental_settings"
          icon="settings"
          label={language === 'tr' ? 'Ebeveyn' : 'Parents'}
          onClick={() => onNavigate('parental_settings')}
        />
      </div>
    </div>
  );
};

export default BottomNav;
