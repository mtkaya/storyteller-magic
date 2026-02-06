import React, { useState } from 'react';
import { ScreenName, Story } from './types';
import Home from './pages/Home';
import CreateStory from './pages/CreateStory';
import Reader from './pages/Reader';
import Library from './pages/Library';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';
import BottomNav from './components/BottomNav';
import ParentalGate from './components/ParentalGate';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [targetRestrictedScreen, setTargetRestrictedScreen] = useState<ScreenName | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const handleNavigate = (screen: ScreenName) => {
    if (screen === 'parental_settings') {
      setTargetRestrictedScreen('settings');
      setShowParentalGate(true);
    } else if (screen === 'subscription') {
      setCurrentScreen('subscription');
    } else if (screen === 'settings') {
      setCurrentScreen('settings');
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleStorySelect = (story: Story) => {
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

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={handleNavigate} onStorySelect={handleStorySelect} />;
      case 'create_story':
        return <CreateStory onBack={() => setCurrentScreen('home')} onComplete={() => setCurrentScreen('reader')} />;
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
      default:
        return <Home onNavigate={handleNavigate} onStorySelect={handleStorySelect} />;
    }
  };

  // Screens that should show the bottom navigation
  const showNav = ['home', 'library', 'achievements'].includes(currentScreen);

  return (
    <div className="max-w-[430px] mx-auto bg-bg-dark min-h-screen relative shadow-2xl overflow-hidden">
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
    </div>
  );
};

export default App;