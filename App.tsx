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
import CloudIntro from './components/CloudIntro';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { MusicType, backgroundMusic } from './services/backgroundMusic';
import { soundEffects } from './services/soundEffects';
import { LIBRARY_STORIES, RECENT_STORIES } from './data';
import { buildStoryPool, filterStoriesForLanguage, hasPlayableStoryData, normalizeStoryTheme } from './services/storyCuration';
import { prefetchTurkishTranslations } from './services/storyTranslation';

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
  const [showCloudIntro, setShowCloudIntro] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const { isLimitReached, settings, updateSettings, saveCustomStory, customStories } = useAppState();
  const { language } = useLanguage();
  const localizedCustomStories = React.useMemo(
    () => filterStoriesForLanguage(customStories, language),
    [customStories, language]
  );
  const storyPool = React.useMemo(
    () => buildStoryPool(LIBRARY_STORIES, RECENT_STORIES, localizedCustomStories),
    [localizedCustomStories]
  );

  const resolvePlayableStorySelection = React.useCallback((candidate: Story): Story => {
    if (hasPlayableStoryData(candidate)) return candidate;

    const byId = storyPool.find(
      (story) => story.id === candidate.id && hasPlayableStoryData(story)
    );
    if (byId) return byId;

    const targetTheme = normalizeStoryTheme(candidate.theme);
    const byTheme = storyPool.find((story) => {
      if (!hasPlayableStoryData(story)) return false;
      if (normalizeStoryTheme(story.theme) !== targetTheme) return false;
      if (candidate.isInteractive && !story.isInteractive) return false;
      return true;
    });

    return byTheme || candidate;
  }, [storyPool]);

  const warmTurkishStoryContent = React.useCallback((story: Story) => {
    if (language !== 'tr') return;

    const segments = new Set<string>();
    const pushSegment = (text?: string) => {
      if (!text) return;
      const trimmed = text.trim();
      if (!trimmed) return;
      segments.add(trimmed);
    };

    story.content?.forEach(pushSegment);
    story.branches?.forEach((branch) => {
      branch.paragraphs?.forEach(pushSegment);
      branch.choices?.forEach((choice) => {
        pushSegment(choice.text);
        pushSegment(choice.consequence);
      });
    });

    if (segments.size === 0) return;
    void prefetchTurkishTranslations(Array.from(segments), {
      contextLabel: `story:${story.id}:prefetch`
    });
  }, [language]);

  useEffect(() => {
    if (language !== 'tr') return;

    const starterStories = storyPool
      .filter((story) => hasPlayableStoryData(story))
      .slice(0, 5);

    starterStories.forEach((story) => warmTurkishStoryContent(story));
  }, [language, storyPool, warmTurkishStoryContent]);

  useEffect(() => {
    soundEffects.setEnabled(settings.soundEffects);
    soundEffects.setVolume(settings.effectsVolume);
    backgroundMusic.setVolume(settings.musicVolume);
  }, [settings.soundEffects, settings.effectsVolume, settings.musicVolume]);

  useEffect(() => {
    let activated = false;

    const unlockAudio = async () => {
      if (activated) return;
      activated = true;
      await Promise.allSettled([soundEffects.unlock(), backgroundMusic.warmup()]);
      setAudioUnlocked(true);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    if (!audioUnlocked) return;
    if (currentMusic !== 'none') return;

    const savedTrack = settings.backgroundMusic as MusicType | null;
    if (!savedTrack || savedTrack === 'none') return;

    setCurrentMusic(savedTrack);
    void backgroundMusic.fadeIn(savedTrack, 900);
  }, [audioUnlocked, currentMusic, settings.backgroundMusic]);

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
      alert(
        language === 'tr'
          ? 'Günlük okuma limitine ulaşıldı! Yarın tekrar gel. 🌙'
          : 'Daily reading limit reached! Come back tomorrow. 🌙'
      );
      return;
    }

    if (screen === 'parental_settings') {
      // This is usually for general parental controls unlock
      setTargetRestrictedScreen(null); // Just unlock
      setShowParentalGate(true);
    } else if (screen === 'parent_report' as ScreenName) {
      setTargetRestrictedScreen('parent_report' as ScreenName);
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
      alert(
        language === 'tr'
          ? 'Günlük okuma limitine ulaşıldı! Yarın tekrar gel. 🌙'
          : 'Daily reading limit reached! Come back tomorrow. 🌙'
      );
      return;
    }
    const resolvedStory = resolvePlayableStorySelection(story);
    warmTurkishStoryContent(resolvedStory);
    setSelectedStory(resolvedStory);
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
      saveCustomStory(story);
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
    updateSettings({ backgroundMusic: music === 'none' ? null : music });
    if (music === 'none') {
      void backgroundMusic.fadeOut(600);
    } else {
      void (async () => {
        await backgroundMusic.warmup();
        await backgroundMusic.fadeIn(music, 1000);
      })();
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
            onMusicClick={() => { playClickSound(); setShowMusicSelector(true); }}
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

  const appScreen = showOnboarding ? (
    <Onboarding onComplete={handleOnboardingComplete} />
  ) : (
    <div className={`max-w-[430px] mx-auto bg-bg-dark min-h-screen relative shadow-2xl overflow-hidden ${isNightMode ? 'night-mode' : ''}`}>
      {renderScreen()}

      {showNav && (
        <BottomNav
          activeScreen={currentScreen}
          onNavigate={handleNavigate}
          onMapClick={() => {
            playClickSound();
            setShowStoryMap(true);
          }}
        />
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
          <p className="font-bold">{language === 'tr' ? '📵 Günlük limit doldu!' : '📵 Daily limit reached!'}</p>
          <p className="text-sm opacity-80">
            {language === 'tr' ? 'Daha fazla hikaye için yarın tekrar gel.' : 'Come back tomorrow for more stories.'}
          </p>
        </div>
      )}

      {/* Night Mode Indicator */}
      {isNightMode && (
        <div className="fixed top-4 right-4 bg-purple-500/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 z-50">
          <span>🌙</span> {language === 'tr' ? 'Gece Modu' : 'Night Mode'}
        </div>
      )}

      <style>{`
        .night-mode {
          filter: brightness(0.85) contrast(1.1);
        }
      `}</style>
    </div>
  );

  return (
    <>
      {appScreen}
      {showCloudIntro && (
        <CloudIntro onFinish={() => setShowCloudIntro(false)} />
      )}
    </>
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
