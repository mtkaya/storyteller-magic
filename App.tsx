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
import ParentReport from './pages/ParentReport';
import CollectionsPage from './pages/CollectionsPage';
import Onboarding from './pages/Onboarding';
import BottomNav from './components/BottomNav';
import ParentalGate from './components/ParentalGate';
import BadgeNotification from './components/BadgeNotification';
import ProfileSelector from './components/ProfileSelector';
import MusicSelector from './components/MusicSelector';
import StoryMap from './components/StoryMap';
import DailyGoals from './components/DailyGoals';
import { LanguageProvider } from './context/LanguageContext';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { MusicType, backgroundMusic } from './services/backgroundMusic';
import { soundEffects } from './services/soundEffects';

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [targetRestrictedScreen, setTargetRestrictedScreen] = useState<ScreenName | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [showStoryMap, setShowStoryMap] = useState(false);
  const [showDailyGoals, setShowDailyGoals] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<MusicType>('none');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const { isLimitReached, settings } = useAppState();

  // Check for first launch / onboarding
  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboarding_complete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    }
  }, []);

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
          setIsNightMode(currentTime >= startTime || currentTime < endTime);
        } else {
          setIsNightMode(currentTime >= startTime && currentTime < endTime);
        }
      };

      checkNightMode();
      const interval = setInterval(checkNightMode, 60000);
      return () => clearInterval(interval);
    }
  }, [settings.nightModeAuto, settings.nightModeStart, settings.nightModeEnd]);

  // Play button click sound
  const playClickSound = () => {
    if (settings.soundEffects) {
      soundEffects.play('button_click');
    }
  };

  const handleNavigate = (screen: ScreenName) => {
    playClickSound();

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
    } else if (screen === 'stats') {
      setCurrentScreen('stats');
    } else if (screen === 'parent_report' as ScreenName) {
      setCurrentScreen('parent_report' as ScreenName);
    } else if (screen === 'collections' as ScreenName) {
      setCurrentScreen('collections' as ScreenName);
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleStorySelect = (story: Story) => {
    playClickSound();
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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    soundEffects.play('success');
  };

  const handleMusicChange = (music: MusicType) => {
    setCurrentMusic(music);
    if (music === 'none') {
      backgroundMusic.fadeOut();
    } else {
      backgroundMusic.fadeIn(music);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <Home
            onNavigate={handleNavigate}
            onStorySelect={handleStorySelect}
            onProfileClick={() => { playClickSound(); setShowProfileSelector(true); }}
            onMusicClick={() => { playClickSound(); setShowMusicSelector(true); }}
            onMapClick={() => { playClickSound(); setShowStoryMap(true); }}
            onGoalsClick={() => { playClickSound(); setShowDailyGoals(true); }}
          />
        );
      case 'create_story':
        return <CreateStory onBack={() => setCurrentScreen('home')} onComplete={handleStoryComplete} />;
      case 'reader':
        return (
          <Reader
            story={selectedStory}
            onBack={() => setCurrentScreen('home')}
            currentMusic={currentMusic}
            onMusicChange={handleMusicChange}
          />
        );
      case 'library':
        return <Library onNavigate={handleNavigate} onStorySelect={handleStorySelect} />;
      case 'achievements':
        return <Achievements />;
      case 'settings':
        return (
          <Settings
            onNavigate={handleNavigate}
            onBack={() => setCurrentScreen('home')}
            onParentReport={() => handleNavigate('parent_report' as ScreenName)}
          />
        );
      case 'subscription':
        return <Subscription onBack={() => setCurrentScreen('settings')} />;
      case 'stats':
        return <StatsPage onBack={() => setCurrentScreen('home')} />;
      case 'parent_report' as ScreenName:
        return <ParentReport onBack={() => setCurrentScreen('settings')} />;
      case 'collections' as ScreenName:
        return (
          <CollectionsPage
            onBack={() => setCurrentScreen('home')}
            onStorySelect={handleStorySelect}
          />
        );
      default:
        return <Home onNavigate={handleNavigate} onStorySelect={handleStorySelect} />;
    }
  };

  // Screens that should show the bottom navigation
  const showNav = ['home', 'library', 'achievements'].includes(currentScreen);

  // Show onboarding on first launch
  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

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
        onSelect={handleMusicChange}
      />

      {/* Story Map Full Screen */}
      {showStoryMap && (
        <StoryMap
          onClose={() => setShowStoryMap(false)}
          onStorySelect={(story) => {
            setShowStoryMap(false);
            handleStorySelect(story);
          }}
        />
      )}

      {/* Daily Goals Modal */}
      {showDailyGoals && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowDailyGoals(false)}
                className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <DailyGoals />
          </div>
        </div>
      )}

      {/* Daily Limit Warning */}
      {isLimitReached && (
        <div className="fixed bottom-20 left-4 right-4 bg-orange-500/90 text-white p-4 rounded-xl text-center max-w-[400px] mx-auto z-50">
          <p className="font-bold">📵 Daily limit reached!</p>
          <p className="text-sm opacity-80">Come back tomorrow for more stories.</p>
        </div>
      )}

      {/* Night Mode Indicator */}
      {isNightMode && (
        <div className="fixed top-4 right-4 bg-purple-500/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 z-50">
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