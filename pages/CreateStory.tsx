import React, { useState } from 'react';
import { CreateStep, Story } from '../types';
import { IMAGES } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { generateStoryWithAI, getFallbackStory, StoryPrompt, GeneratedStory } from '../services/storyGenerator';
import { getIllustratedImageUrl } from '../services/illustrationCovers';
import { buildIllustrationCoverPrompt } from '../services/coverPrompt';

interface CreateStoryProps {
  onBack: () => void;
  onComplete: (story?: Story) => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onBack, onComplete }) => {
  const { language, t } = useLanguage();
  const [step, setStep] = useState<CreateStep>(CreateStep.THEME);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Story options
  const [selectedTheme, setSelectedTheme] = useState('magic');
  const [selectedTone, setSelectedTone] = useState('calm');
  const [selectedDuration, setSelectedDuration] = useState<'short' | 'medium' | 'long'>('medium');
  const [isInteractive, setIsInteractive] = useState(false);
  const [childName, setChildName] = useState('');

  // Generated story
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyPromptStatus, setCopyPromptStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const themes = [
    { id: 'adventure', name: t.create_themes.adventure, icon: IMAGES.BRAVE_LION, visualIcon: '🧭' },
    { id: 'friendship', name: t.create_themes.friendship, icon: IMAGES.TEA_PARTY, visualIcon: '🤝' },
    { id: 'magic', name: t.create_themes.magic, icon: IMAGES.ENCHANTED_CHEST, visualIcon: '✨' },
    { id: 'nature', name: t.create_themes.nature, icon: IMAGES.GRATEFUL_DEER, visualIcon: '🌿' },
    { id: 'space', name: t.create_themes.space, icon: IMAGES.MAGIC_CARPET, visualIcon: '🚀' },
    { id: 'underwater', name: t.create_themes.underwater, icon: IMAGES.SLEEPING_ANIMALS, visualIcon: '🐠' }
  ];

  const tones = [
    { id: 'calm', name: t.create_tones.calm },
    { id: 'exciting', name: t.create_tones.exciting },
    { id: 'funny', name: t.create_tones.funny },
    { id: 'mysterious', name: t.create_tones.mysterious }
  ];

  const durations = [
    { id: 'short' as const, name: t.create_durations.short },
    { id: 'medium' as const, name: t.create_durations.medium },
    { id: 'long' as const, name: t.create_durations.long }
  ];

  // Generate story with AI
  const handleGenerateStory = async () => {
    setStep(CreateStep.GENERATING);
    setLoadingProgress(0);
    setError(null);

    // Start progress animation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 300);

    const storyOptions: StoryPrompt = {
      theme: selectedTheme,
      tone: selectedTone,
      duration: selectedDuration,
      childName: childName || undefined,
      language: language,
      isInteractive: isInteractive
    };

    try {
      const story = await generateStoryWithAI(storyOptions);
      setGeneratedStory(story);
      setLoadingProgress(100);
      setTimeout(() => setStep(CreateStep.RESULT), 500);
    } catch (err) {
      console.error('Story generation failed:', err);
      const errorMessage = err instanceof Error ? err.message.toLowerCase() : '';
      const isTimeout = errorMessage.includes('timed out');
      setError(
        isTimeout
          ? (language === 'tr'
            ? 'AI yanıtı gecikti, yedek hikaye gösteriliyor.'
            : 'AI response timed out, showing a fallback story.')
          : (language === 'tr'
            ? 'AI servisine ulaşılamadı, yedek hikaye gösteriliyor.'
            : 'Could not reach AI service, showing a fallback story.')
      );
      // Use fallback story
      const fallbackStory = getFallbackStory(storyOptions);
      setGeneratedStory(fallbackStory);
      setLoadingProgress(100);
      setTimeout(() => setStep(CreateStep.RESULT), 500);
    } finally {
      clearInterval(progressInterval);
    }
  };

  // Convert GeneratedStory to Story type for the reader
  const convertToStory = (generated: GeneratedStory): Story => {
    const themeData = themes.find(th => th.id === generated.theme);
    return {
      id: `generated_${Date.now()}`,
      title: generated.title,
      subtitle: generated.subtitle,
      duration: selectedDuration === 'short' ? '5 min' : selectedDuration === 'medium' ? '10 min' : '15 min',
      theme: generated.theme,
      coverUrl: themeData?.icon || IMAGES.MAGIC_BOOK,
      character: generated.character,
      ageRange: generated.ageRange,
      moral: generated.moral,
      content: generated.content,
      isInteractive: generated.isInteractive,
      branches: generated.branches,
      startBranchId: generated.startBranchId
    };
  };

  // Generating screen
  if (step === CreateStep.GENERATING) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-bg-dark relative overflow-hidden">
        {/* Magic gradient background */}
        <div className="absolute inset-0 bg-magic-gradient opacity-80"></div>
        <div className="absolute inset-0 bg-star-dust opacity-30"></div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
          <div className="relative w-64 h-64 mb-12">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
            <div className="absolute inset-4 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
              <img
                src={getIllustratedImageUrl({
                  title: language === 'tr' ? 'Sihir' : 'Magic',
                  subtitle: language === 'tr' ? 'Hikaye Üretimi' : 'Story Generation',
                  theme: 'magic',
                  src: IMAGES.MAGIC_QUILL,
                  icon: '✨'
                })}
                alt="Magic Quill"
                className="w-40 h-40 object-contain opacity-90 drop-shadow-[0_0_15px_rgba(238,140,43,0.6)] animate-pulse-slow"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">{t.create_generating}</h2>
          <p className="text-primary/80 italic mb-8">
            {language === 'tr' ? 'Sihir başladı...' : 'The magic is at work...'}
          </p>

          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(238,140,43,0.5)]"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-white/40 text-xs mt-3">{Math.round(loadingProgress)}% {language === 'tr' ? 'Tamamlandı' : 'Complete'}</p>
        </div>
      </div>
    );
  }

  // Result screen
  if (step === CreateStep.RESULT && generatedStory) {
    const storyForReader = convertToStory(generatedStory);
    const coverPrompt = buildIllustrationCoverPrompt({
      title: generatedStory.title,
      subtitle: generatedStory.subtitle,
      theme: generatedStory.theme,
      character: generatedStory.character,
      moral: generatedStory.moral,
      tone: selectedTone,
      language
    });

    const copyCoverPrompt = async () => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(coverPrompt);
          setCopyPromptStatus('copied');
        } else {
          throw new Error('Clipboard API unavailable');
        }
      } catch {
        setCopyPromptStatus('failed');
      } finally {
        setTimeout(() => setCopyPromptStatus('idle'), 2000);
      }
    };

    return (
      <div className="flex flex-col h-screen bg-bg-dark relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url("${getIllustratedImageUrl({
              title: generatedStory.title,
              subtitle: generatedStory.subtitle,
              theme: generatedStory.theme,
              src: themes.find(t => t.id === generatedStory.theme)?.icon || IMAGES.MOON_RESULT,
              icon: themes.find(t => t.id === generatedStory.theme)?.visualIcon
            })}")`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent"></div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 mb-8 mx-auto">
            <img
              src={getIllustratedImageUrl({
                title: generatedStory.title,
                subtitle: generatedStory.subtitle,
                theme: generatedStory.theme,
                src: themes.find(t => t.id === generatedStory.theme)?.icon || IMAGES.MOON_RESULT,
                icon: themes.find(t => t.id === generatedStory.theme)?.visualIcon
              })}
              className="w-full h-full object-cover"
            />
          </div>

          {generatedStory.isInteractive && (
            <div className="bg-gradient-to-r from-secondary to-purple-500 px-4 py-1 rounded-full mb-4">
              <span className="text-white text-sm font-bold">🎮 {language === 'tr' ? 'İnteraktif Hikaye' : 'Interactive Story'}</span>
            </div>
          )}

          <h1 className="text-3xl font-bold text-white mb-2">{generatedStory.title}</h1>
          <p className="text-white/70 mb-2">{generatedStory.subtitle}</p>
          <p className="text-primary/80 text-sm italic mb-8">"{generatedStory.moral}"</p>
          {error && (
            <div className="w-full mb-4 rounded-xl border border-amber-300/30 bg-amber-200/10 px-4 py-3 text-left">
              <p className="text-xs font-semibold text-amber-200">
                {language === 'tr' ? 'Bilgi' : 'Notice'}
              </p>
              <p className="text-sm text-amber-100/90">{error}</p>
            </div>
          )}

          <div className="w-full mb-5 rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-left">
            <p className="text-xs font-semibold text-white/80 mb-2">
              {language === 'tr' ? 'Illustrator Prompt (Kapak)' : 'Illustrator Prompt (Cover)'}
            </p>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap text-[11px] leading-relaxed text-white/75 bg-black/20 rounded-lg p-3 border border-white/10">
              {coverPrompt}
            </pre>
            <button
              onClick={copyCoverPrompt}
              className="mt-3 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-white transition-colors"
            >
              {copyPromptStatus === 'copied'
                ? (language === 'tr' ? 'Kopyalandi' : 'Copied')
                : copyPromptStatus === 'failed'
                  ? (language === 'tr' ? 'Kopyalama Basarisiz' : 'Copy Failed')
                  : (language === 'tr' ? 'Promptu Kopyala' : 'Copy Prompt')}
            </button>
          </div>

          <button
            onClick={() => onComplete(storyForReader)}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mb-4"
          >
            <span className="material-symbols-outlined">auto_stories</span>
            {language === 'tr' ? 'Şimdi Oku' : 'Read Now'}
          </button>
          <button onClick={() => { setError(null); setStep(CreateStep.THEME); }} className="text-white/50 text-sm hover:text-white">
            {language === 'tr' ? 'Başka Bir Hikaye Oluştur' : 'Create Another'}
          </button>
        </div>
      </div>
    );
  }

  // Main creation screen
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-white">
      {/* Header */}
      <div className="flex items-center p-6 pb-2">
        <button onClick={onBack} className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold pr-10">{t.create_title}</h2>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-end mb-2">
          <p className="text-white/90 text-base font-semibold">
            {language === 'tr' ? 'Maceranı şekillendir' : 'Crafting your adventure'}
          </p>
          <p className="text-white/60 text-xs font-medium">
            {language === 'tr' ? 'Adım 1 / 1' : 'Step 1 of 1'}
          </p>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-accent-peach rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto pb-32">
        {/* Child Name (Optional) */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">
            {language === 'tr' ? "Çocuğun Adı (İsteğe Bağlı)" : "Child's Name (Optional)"}
          </h3>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder={language === 'tr' ? "Adı gir..." : "Enter name..."}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Theme Grid */}
        <h3 className="text-lg font-bold mb-3">{t.create_choose_theme}</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`p-2 rounded-xl border transition-all ${selectedTheme === theme.id
                  ? 'bg-white/10 border-accent-peach ring-2 ring-accent-peach/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
            >
              <div className="w-full aspect-square rounded-lg bg-[#2d2e4d] mb-2 overflow-hidden shadow-inner">
                <img
                  src={getIllustratedImageUrl({
                    title: theme.name,
                    subtitle: language === 'tr' ? 'Tema' : 'Theme',
                    theme: theme.id,
                    src: theme.icon,
                    icon: theme.visualIcon
                  })}
                  alt={theme.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="font-medium text-xs">{theme.name}</span>
            </button>
          ))}
        </div>

        {/* Tone */}
        <h3 className="text-lg font-bold mb-3">{t.create_choose_tone}</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {tones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => setSelectedTone(tone.id)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${selectedTone === tone.id
                  ? 'bg-secondary text-white border border-white/20'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
            >
              {tone.name}
            </button>
          ))}
        </div>

        {/* Duration */}
        <h3 className="text-lg font-bold mb-3">{t.create_choose_duration}</h3>
        <div className="flex gap-2 mb-6">
          {durations.map((dur) => (
            <button
              key={dur.id}
              onClick={() => setSelectedDuration(dur.id)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${selectedDuration === dur.id
                  ? 'bg-primary text-bg-dark'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                }`}
            >
              {dur.name}
            </button>
          ))}
        </div>

        {/* Interactive Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎮</span>
            <div>
              <p className="font-bold text-sm">
                {language === 'tr' ? 'İnteraktif Hikaye' : 'Interactive Story'}
              </p>
              <p className="text-white/50 text-xs">
                {language === 'tr' ? 'Kendi maceranı seç!' : 'Choose your own adventure!'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsInteractive(!isInteractive)}
            className={`w-12 h-7 rounded-full relative transition-colors ${isInteractive ? 'bg-secondary' : 'bg-white/10'}`}
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isInteractive ? 'right-1' : 'left-1'}`}></div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-bg-dark border-t border-white/5 max-w-[430px] mx-auto">
        <button
          onClick={handleGenerateStory}
          className="w-full py-4 rounded-xl bg-accent-peach text-bg-dark text-lg font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,176,142,0.4)] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">auto_fix_high</span>
          {language === 'tr' ? 'AI ile Hikaye Oluştur' : 'Generate with AI'}
        </button>
        <p className="text-center text-white/40 text-xs mt-3 italic">
          {language === 'tr' ? 'Gemini AI ile sihirli hikayeni yazıyoruz...' : 'Using Gemini AI to weave your magical tale...'}
        </p>
      </div>
    </div>
  );
};

export default CreateStory;
