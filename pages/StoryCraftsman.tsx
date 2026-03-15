import React, { useState } from 'react';
import { Story } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import { generateStory, StoryPrompt } from '../services/storyGenerator';

interface StoryCraftsmanProps {
  onBack: () => void;
  onComplete: (story?: Story) => void;
}

type CraftsmanStep = 'hero' | 'place' | 'event' | 'ending' | 'generating' | 'result';

const StoryCraftsman: React.FC<StoryCraftsmanProps> = ({ onBack, onComplete }) => {
  const { language, t } = useLanguage();
  const { activeProfile, seenStoryIds, recordStoryGenerated } = useAppState();

  const [step, setStep] = useState<CraftsmanStep>('hero');
  const [selectedHero, setSelectedHero] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedEnding, setSelectedEnding] = useState('');
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const heroes = [
    { id: 'brave_knight', name: language === 'tr' ? 'Cesur Şövalye' : 'Brave Knight', emoji: '🛡️' },
    { id: 'curious_fox', name: language === 'tr' ? 'Meraklı Tilki' : 'Curious Fox', emoji: '🦊' },
    { id: 'kind_princess', name: language === 'tr' ? 'İyi Kalpli Prenses' : 'Kind Princess', emoji: '👸' },
    { id: 'wise_owl', name: language === 'tr' ? 'Bilge Baykuş' : 'Wise Owl', emoji: '🦉' },
    { id: 'playful_dragon', name: language === 'tr' ? 'Oyuncu Ejderha' : 'Playful Dragon', emoji: '🐉' },
    { id: 'friendly_robot', name: language === 'tr' ? 'Dostça Robot' : 'Friendly Robot', emoji: '🤖' },
  ];

  const places = [
    { id: 'enchanted_forest', name: language === 'tr' ? 'Büyülü Orman' : 'Enchanted Forest', emoji: '🌲' },
    { id: 'castle', name: language === 'tr' ? 'Şato' : 'Castle', emoji: '🏰' },
    { id: 'underwater', name: language === 'tr' ? 'Su Altı Dünyası' : 'Underwater World', emoji: '🌊' },
    { id: 'space', name: language === 'tr' ? 'Uzay' : 'Outer Space', emoji: '🚀' },
    { id: 'magical_village', name: language === 'tr' ? 'Sihirli Köy' : 'Magical Village', emoji: '🏡' },
    { id: 'cloud_city', name: language === 'tr' ? 'Bulut Şehri' : 'Cloud City', emoji: '☁️' },
  ];

  const events = [
    { id: 'find_treasure', name: language === 'tr' ? 'Kayıp Hazineyi Bul' : 'Find Lost Treasure', emoji: '💎' },
    { id: 'new_friend', name: language === 'tr' ? 'Yeni Arkadaş Edin' : 'Make a New Friend', emoji: '🤝' },
    { id: 'show_courage', name: language === 'tr' ? 'Cesaret Göster' : 'Show Courage', emoji: '💪' },
    { id: 'solve_mystery', name: language === 'tr' ? 'Gizemi Çöz' : 'Solve a Mystery', emoji: '🔍' },
  ];

  const endings = [
    { id: 'happy', name: language === 'tr' ? 'Mutlu Son' : 'Happy Ending', emoji: '🌟' },
    { id: 'lesson', name: language === 'tr' ? 'Ders Çıkar' : 'Learn a Lesson', emoji: '💡' },
    { id: 'adventure', name: language === 'tr' ? 'Macera Devam' : 'Adventure Continues', emoji: '🚀' },
  ];

  const handleNext = () => {
    if (step === 'hero') setStep('place');
    else if (step === 'place') setStep('event');
    else if (step === 'event') setStep('ending');
    else if (step === 'ending') handleGenerate();
  };

  const handleGenerate = async () => {
    setStep('generating');
    setLoadingProgress(0);
    setError(null);

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => (prev >= 90 ? prev : prev + Math.random() * 10));
    }, 300);

    const storyOptions: StoryPrompt = {
      theme: selectedEvent,
      tone: selectedEnding === 'happy' ? 'calm' : selectedEnding === 'lesson' ? 'mysterious' : 'exciting',
      duration: 'medium',
      childName: selectedHero,
      language,
      isInteractive: false,
      profileId: activeProfile?.id,
      seenStoryIds,
    };

    try {
      const story = await generateStory(storyOptions);
      clearInterval(progressInterval);
      setLoadingProgress(100);

      if (!story || !story.title || !story.content?.length) {
        throw new Error('Generated story is incomplete');
      }

      const craftsmanStory: Story = {
        id: story.id || `craftsman-${Date.now()}`,
        title: story.title || (language === 'tr' ? 'Senin Hikayeniz' : 'Your Story'),
        subtitle: story.subtitle,
        duration: story.duration || '10 min',
        coverUrl: story.coverUrl || '/images/magic_fairy_book.jpg',
        theme: story.theme || selectedEvent,
        content: story.content,
        character: selectedHero,
        place: selectedPlace,
        moral: story.moral,
        ageRange: story.ageRange,
        isInteractive: story.isInteractive,
        branches: story.branches,
        startBranchId: story.startBranchId,
      };

      recordStoryGenerated(`craftsman:${craftsmanStory.id}`);
      setGeneratedStory(craftsmanStory);
      setStep('result');
    } catch (err) {
      clearInterval(progressInterval);
      setError(
        language === 'tr'
          ? 'Hikaye oluşturulamadı. Lütfen tekrar dene.'
          : 'Failed to generate story. Please try again.'
      );
      setStep('hero');
    }
  };

  const renderStepContent = () => {
    if (step === 'generating') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-6xl mb-6 animate-bounce">✨</div>
          <h2 className="text-2xl font-bold text-white mb-4 font-serif text-center">
            {language === 'tr' ? 'Hikayen Hazırlanıyor...' : 'Crafting Your Story...'}
          </h2>
          <div className="w-full max-w-md bg-white/10 rounded-full h-4 overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-white/60 text-sm text-center">
            {language === 'tr'
              ? 'Kahramanın, yerin ve macerası birleştiriliyor...'
              : 'Combining your hero, place, and adventure...'}
          </p>
        </div>
      );
    }

    if (step === 'result' && !generatedStory) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-6xl mb-4 animate-pulse">✨</div>
          <p className="text-white/60 text-center">
            {language === 'tr' ? 'Hikaye yükleniyor...' : 'Loading story...'}
          </p>
        </div>
      );
    }

    if (step === 'result' && generatedStory) {
      return (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2 font-serif">
                {language === 'tr' ? 'Hikaye Hazır!' : 'Story Ready!'}
              </h2>
              <h3 className="text-xl text-primary mb-4 font-serif">
                {generatedStory.title}
              </h3>
            </div>

            <div className="bg-bg-card rounded-2xl p-6 mb-6 border border-white/10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full text-sm text-white">
                  {heroes.find(h => h.id === selectedHero)?.emoji} {heroes.find(h => h.id === selectedHero)?.name}
                </span>
                <span className="inline-flex items-center gap-2 bg-secondary/20 px-3 py-1 rounded-full text-sm text-white">
                  {places.find(p => p.id === selectedPlace)?.emoji} {places.find(p => p.id === selectedPlace)?.name}
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {generatedStory.content?.[0] || generatedStory.subtitle || ''}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => onComplete(generatedStory)}
                className="w-full bg-primary text-bg-dark font-bold py-4 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">play_circle</span>
                {language === 'tr' ? 'Hikayeyi Oku' : 'Read Story'}
              </button>
              <button
                onClick={() => {
                  setStep('hero');
                  setSelectedHero('');
                  setSelectedPlace('');
                  setSelectedEvent('');
                  setSelectedEnding('');
                  setGeneratedStory(null);
                }}
                className="w-full bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-all"
              >
                {language === 'tr' ? 'Yeni Hikaye Kurgula' : 'Craft New Story'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    const stepConfig = {
      hero: {
        title: language === 'tr' ? 'Kahramanın kim?' : 'Who is the hero?',
        subtitle: language === 'tr' ? 'Hikayenin ana karakterini seç' : 'Choose the main character',
        options: heroes,
        selected: selectedHero,
        onSelect: setSelectedHero,
      },
      place: {
        title: language === 'tr' ? 'Nerede geçsin?' : 'Where does it happen?',
        subtitle: language === 'tr' ? 'Hikayenin yerini belirle' : 'Choose the story setting',
        options: places,
        selected: selectedPlace,
        onSelect: setSelectedPlace,
      },
      event: {
        title: language === 'tr' ? 'Ne olsun?' : 'What happens?',
        subtitle: language === 'tr' ? 'Macerayı seç' : 'Choose the adventure',
        options: events,
        selected: selectedEvent,
        onSelect: setSelectedEvent,
      },
      ending: {
        title: language === 'tr' ? 'Nasıl bitsin?' : 'How should it end?',
        subtitle: language === 'tr' ? 'Sonu belirle' : 'Choose the ending',
        options: endings,
        selected: selectedEnding,
        onSelect: setSelectedEnding,
      },
    };

    const config = stepConfig[step as keyof typeof stepConfig];
    if (!config) return null;

    const canProceed = config.selected !== '';

    return (
      <div className="flex-1 flex flex-col p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2 font-serif">{config.title}</h2>
          <p className="text-white/60 text-sm">{config.subtitle}</p>
        </div>

        <div className="flex-1 overflow-y-auto mb-6">
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {config.options.map((option) => (
              <button
                key={option.id}
                onClick={() => config.onSelect(option.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
                  config.selected === option.id
                    ? 'border-primary bg-primary/20'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                <div className="text-4xl mb-2">{option.emoji}</div>
                <div className="text-sm font-medium text-white text-center">{option.name}</div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="w-full bg-primary text-bg-dark font-bold py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span>{language === 'tr' ? 'Devam' : 'Next'}</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-bg-dark overflow-hidden">
      {/* Header */}
      <div
        className="shrink-0 flex items-center justify-between px-4 pb-3 bg-bg-dark/80 backdrop-blur-md border-b border-white/5"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 10px)' }}
      >
        <button
          onClick={onBack}
          className="text-white/80 hover:text-white size-11 rounded-full active:scale-95 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>

        <div className="text-center flex-1">
          <h1 className="text-lg font-bold text-white flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary">auto_stories</span>
            {language === 'tr' ? 'Hikaye Kurucu' : 'Story Craftsman'}
          </h1>
        </div>

        <div className="w-11" /> {/* Spacer */}
      </div>

      {/* Progress Indicator */}
      {step !== 'generating' && step !== 'result' && (
        <div className="shrink-0 px-6 py-4 bg-bg-dark/50">
          <div className="flex items-center justify-center gap-2">
            {['hero', 'place', 'event', 'ending'].map((s, i) => (
              <div
                key={s}
                className={`size-2 rounded-full transition-all ${
                  s === step ? 'bg-primary w-8' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {renderStepContent()}
    </div>
  );
};

export default StoryCraftsman;
