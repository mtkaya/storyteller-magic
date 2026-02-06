import React, { useState, useEffect } from 'react';
import { ScreenName, Story } from './types';
import Home from './pages/Home';
import CreateStory from './pages/CreateStory';
import Reader from './pages/Reader';
import Library from './pages/Library';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';
import StatsPage from './pages/StatsPage';
import BottomNav from './components/BottomNav';
import ParentalGate from './components/ParentalGate';
import BadgeNotification from './components/BadgeNotification';
import ProfileSelector from './components/ProfileSelector';
import MusicSelector from './components/MusicSelector';
import { LanguageProvider } from './context/LanguageContext';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { MusicType } from './services/backgroundMusic';

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [targetRestrictedScreen, setTargetRestrictedScreen] = useState<ScreenName | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<MusicType>('none');

  const { isLimitReached, settings } = useAppState();

  // Check for night mode
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    if (settings.nightModeAuto) {
      const checkNightMode = () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour * 60 + minute;

        const [startH, startM] = settings.nightModeStart.split(':').map(Number);
        const [endH, endM] = settings.nightModeEnd.split(':').map(Number);
        const startTime = startH * 60 + startM;
        const endTime = endH * 60 + endM;

        if (startTime > endTime) {
          // Night spans midnight
          setIsNightMode(currentTime >= startTime || currentTime < endTime);
        } else {
          setIsNightMode(currentTime >= startTime && currentTime < endTime);
        }
      };

      checkNightMode();
      const interval = setInterval(checkNightMode, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [settings.nightModeAuto, settings.nightModeStart, settings.nightModeEnd]);

  const handleNavigate = (screen: ScreenName) => {
    // Check daily limit before navigating to reader
    if (screen === 'reader' && isLimitReached) {
      alert('Daily reading limit reached! Come back tomorrow. 🌙');
      return;
    }

    if (screen === 'parental_settings') {
      setTargetRestrictedScreen('settings');
      setShowParentalGate(true);
    } else if (screen === 'subscription') {
      setCurrentScreen('subscription');
    } else if (screen === 'settings') {
      setCurrentScreen('settings');
    } else if (screen === 'stats' as ScreenName) {
      setCurrentScreen('stats' as ScreenName);
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleStorySelect = (story: Story) => {
    if (isLimitReached) {
      alert('Daily reading limit reached! Come back tomorrow. 🌙');
      return;
    }
    setSelectedStory(story);
    setCurrentScreen('reader');
  };

  const handleParentalUnlock = () => {
    setShowParentalGate(false);
    if (targetRestrictedScreen) {
      setCurrentScreen(targetRestrictedScreen);
      setTargetRestrictedScreen(null);
    }
  };

  const handleStoryComplete = (story?: Story) => {
    if (story) {
      setSelectedStory(story);
    }
    setCurrentScreen('reader');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home
            onNavigate={handleNavigate}
            onStorySelect={handleStorySelect}
            onProfileClick={() => setShowProfileSelector(true)}
            onMusicClick={() => setShowMusicSelector(true)}
          />
        );
      case 'create_story':
        return <CreateStory onBack={() => setCurrentScreen('home')} onComplete={handleStoryComplete} />;
      case 'reader':
        return <Reader story={selectedStory} onBack={() => setCurrentScreen('home')} />;
      case 'library':
        return <Library onNavigate={handleNavigate} onStorySelect={handleStorySelect} />;
      case 'achievements':
        return <Achievements />;
      case 'settings':
        return <Settings onNavigate={handleNavigate} onBack={() => setCurrentScreen('home')} />;
      case 'subscription':
        return <Subscription onBack={() => setCurrentScreen('settings')} />;
      case 'stats' as ScreenName:
        return <StatsPage onBack={() => setCurrentScreen('home')} />;
      default:
        return <Home onNavigate={handleNavigate} onStorySelect={handleStorySelect} />;
    }
  };

  // Screens that should show the bottom navigation
  const showNav = ['home', 'library', 'achievements'].includes(currentScreen);

  return (
    <div className={`max-w-[430px] mx-auto bg-bg-dark min-h-screen relative shadow-2xl overflow-hidden ${isNightMode ? 'night-mode' : ''}`}>
      {renderScreen()}

      {showNav && (
        <BottomNav activeScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {showParentalGate && (
        <ParentalGate
          onUnlock={handleParentalUnlock}
          onClose={() => setShowParentalGate(false)}
        />
      )}

      {/* Badge Notification Popup */}
      <BadgeNotification />

      {/* Profile Selector Modal */}
      {showProfileSelector && (
        <ProfileSelector onClose={() => setShowProfileSelector(false)} />
      )}

      {/* Music Selector Bottom Sheet */}
      <MusicSelector
        isOpen={showMusicSelector}
        onClose={() => setShowMusicSelector(false)}
        currentTrack={currentMusic}
        onSelect={setCurrentMusic}
      />

      {/* Daily Limit Warning */}
      {isLimitReached && (
        <div className="fixed bottom-20 left-4 right-4 bg-orange-500/90 text-white p-4 rounded-xl text-center max-w-[400px] mx-auto">
          <p className="font-bold">📵 Daily limit reached!</p>
          <p className="text-sm opacity-80">Come back tomorrow for more stories.</p>
        </div>
      )}

      {/* Night Mode Indicator */}
      {isNightMode && (
        <div className="fixed top-4 right-4 bg-purple-500/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <span>🌙</span> Night Mode
        </div>
      )}

      <style>{`
        .night-mode {
          filter: brightness(0.85) contrast(1.1);
        }
      `}</style>
    </div>
  );
};

// Wrap the app with all providers
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppStateProvider>
        <AppContent />
      </AppStateProvider>
    </LanguageProvider>
  );
};

export default App;