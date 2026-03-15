import React, { useState } from 'react';
import { CreateStep, Story } from '../types';
import { IMAGES } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import { generateStory, getStoryGenerationMode, getFallbackStory, StoryPrompt, GeneratedStory } from '../services/storyGenerator';
import { getIllustratedImageUrl } from '../services/illustrationCovers';
import { buildIllustrationCoverPrompt } from '../services/coverPrompt';
import { deriveStoryVisualIdentity } from '../services/storyVisualIdentity';

interface CreateStoryProps {
  onBack: () => void;
  onComplete: (story?: Story) => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ onBack, onComplete }) => {
  const { language, t } = useLanguage();
  const {
    activeProfile,
    seenStoryIds,
    recordStoryGenerated,
    remainingGeneratedStories,
    isGenerationLimitReached,
    planRule,
  } = useAppState();
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
  const generationMode = React.useMemo(() => getStoryGenerationMode(), []);
  const isLocalMode = generationMode === 'local';

  const generationModeMeta = React.useMemo(() => {
    switch (generationMode) {
      case 'hybrid':
        return {
          label: language === 'tr' ? 'Mod: Hibrit' : 'Mode: Hybrid',
          description: language === 'tr'
            ? 'Önce AI dener, gerekirse yerel hikaye havuzuna döner.'
            : 'Tries AI first, then falls back to the local story pool when needed.'
        };
      case 'remote':
        return {
          label: language === 'tr' ? 'Mod: Uzak Kaynak' : 'Mode: Remote Source',
          description: language === 'tr'
            ? 'Hikaye uzak üretim servisi üzerinden hazırlanır.'
            : 'Uses the remote generation service for story creation.'
        };
      default:
        return {
          label: language === 'tr' ? 'Mod: Yerel' : 'Mode: Local',
          description: language === 'tr'
            ? 'Yerleşik hikaye havuzundan maliyet dostu üretim yapar.'
            : 'Uses the built-in story pool for cost-friendly generation.'
        };
    }
  }, [generationMode, language]);

  const looksLikeTurkishText = (text: string): boolean => {
    const clean = text.trim();
    if (!clean) return false;
    if (/[ğüşöçıİĞÜŞÖÇ]/.test(clean)) return true;
    return /\b(ve|bir|ile|için|ama|gibi|çok|şimdi|gece|hikaye|masal|uyku|rüya|ruya)\b/i.test(clean);
  };

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
    if (isGenerationLimitReached) {
      setError(
        language === 'tr'
          ? `Günlük oluşturma kotan doldu (${planRule.nameTr}). Yarın yenilenir veya planını yükseltebilirsin.`
          : `Daily generation quota reached (${planRule.name}). It refreshes tomorrow or you can upgrade your plan.`
      );
      return;
    }

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
      isInteractive: isInteractive,
      profileId: activeProfile?.id,
      seenStoryIds,
    };

    try {
      const story = await generateStory(storyOptions);
      if (!story || !story.title || (!story.content?.length && !story.branches?.length)) {
        throw new Error('Generated story is incomplete or missing content');
      }
      const generatedStoryKey = `generated:${story.theme}:${story.title}`;
      recordStoryGenerated(generatedStoryKey);
      setGeneratedStory(story);
      if (generationMode === 'local') {
        setError(
          language === 'tr'
            ? 'Maliyet dostu yerel hikaye havuzundan üretildi.'
            : 'Generated from the local story pool (cost saver mode).'
        );
      } else if (generationMode === 'hybrid') {
        setError(
          language === 'tr'
            ? 'Hibrit mod aktif: uygun olduğunda uzak üretim, gerekirse yerel havuz kullanılır.'
            : 'Hybrid mode active: remote generation when available, local pool as fallback.'
        );
      } else {
        setError(null);
      }
      setLoadingProgress(100);
      setTimeout(() => setStep(CreateStep.RESULT), 500);
    } catch (err) {
      console.error('Story generation failed:', err);
      const errorMessage = err instanceof Error ? err.message.toLowerCase() : '';
      const isTimeout = errorMessage.includes('timed out');
      setError(
        isTimeout
          ? (language === 'tr'
            ? 'Uzak üretim gecikti, yedek hikaye gösteriliyor.'
            : 'Remote generation timed out, showing a fallback story.')
          : (language === 'tr'
            ? 'Uzak üretim servisine ulaşılamadı, yedek hikaye gösteriliyor.'
            : 'Could not reach the remote generation service, showing a fallback story.')
      );
      // Use fallback story
      const fallbackStory = getFallbackStory(storyOptions);
      const fallbackStoryKey = `generated:${fallbackStory.theme}:${fallbackStory.title}`;
      recordStoryGenerated(fallbackStoryKey);
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
    const cleanContent = (generated.content || [])
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    const hasTrustedTurkishLinearContent = cleanContent.length > 0 && cleanContent.every(looksLikeTurkishText);

    const localizedBranches = generated.branches?.map((branch) => {
      const cleanParagraphs = (branch.paragraphs || [])
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
      const hasTrustedTurkishBranchContent = cleanParagraphs.length > 0 && cleanParagraphs.every(looksLikeTurkishText);

      const localizedChoices = branch.choices?.map((choice) => ({
        ...choice,
        ...(language === 'tr' && choice.text && looksLikeTurkishText(choice.text)
          ? { textTr: choice.text.trim() }
          : {}),
        ...(language === 'tr' && choice.consequence && looksLikeTurkishText(choice.consequence)
          ? { consequenceTr: choice.consequence.trim() }
          : {}),
      }));

      return {
        ...branch,
        paragraphs: cleanParagraphs,
        choices: localizedChoices,
        ...(language === 'tr' && hasTrustedTurkishBranchContent
          ? { paragraphsTr: cleanParagraphs }
          : {}),
        ...(language === 'tr' && branch.endingTitle && looksLikeTurkishText(branch.endingTitle)
          ? { endingTitleTr: branch.endingTitle.trim() }
          : {}),
      };
    });

    return {
      id: `generated_${Date.now()}`,
      title: generated.title,
      sourceLanguage: language,
      ...(language === 'tr' ? { titleTr: generated.title } : {}),
      subtitle: generated.subtitle,
      ...(language === 'tr' ? { subtitleTr: generated.subtitle } : {}),
      duration: selectedDuration === 'short' ? '5 min' : selectedDuration === 'medium' ? '10 min' : '15 min',
      theme: generated.theme,
      coverUrl: themeData?.icon || IMAGES.MAGIC_BOOK,
      character: generated.character,
      ageRange: generated.ageRange,
      moral: generated.moral,
      ...(language === 'tr' ? { moralTr: generated.moral } : {}),
      content: cleanContent,
      ...(language === 'tr' && hasTrustedTurkishLinearContent ? { contentTr: cleanContent } : {}),
      isInteractive: generated.isInteractive,
      branches: localizedBranches,
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

          <div className="mb-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/85">
            {generationModeMeta.label}
          </div>
          <h2 className="text-3xl font-bold text-white text-center mb-2">{t.create_generating}</h2>
          <p className="text-primary/80 italic mb-3">
            {isLocalMode
              ? (language === 'tr' ? 'Hikaye havuzundan sana uygun masal seçiliyor...' : 'Selecting the best match from the story pool...')
              : (language === 'tr' ? 'Sihir başladı...' : 'The magic is at work...')}
          </p>
          <p className="text-white/55 text-xs text-center mb-8 max-w-xs">
            {generationModeMeta.description}
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
      ageRange: generatedStory.ageRange,
      character: generatedStory.character,
      moral: generatedStory.moral,
      tone: selectedTone,
      language
    });
    const visualIdentity = deriveStoryVisualIdentity({
      theme: generatedStory.theme,
      title: generatedStory.title,
      character: generatedStory.character,
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
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url("${getIllustratedImageUrl({
              title: generatedStory.title,
              subtitle: generatedStory.subtitle,
              theme: generatedStory.theme,
              ageRange: generatedStory.ageRange,
              src: themes.find(t => t.id === generatedStory.theme)?.icon || IMAGES.MOON_RESULT,
              icon: themes.find(t => t.id === generatedStory.theme)?.visualIcon
            })}")`
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(13,14,32,0.24),rgba(13,14,32,0.92)_45%,rgba(13,14,32,1))]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center py-8">
          <div className="w-full max-w-sm rounded-[28px] border border-white/12 bg-black/20 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.35)] px-5 py-6">
            <div className="mx-auto mb-5 inline-flex items-center rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
              {language === 'tr' ? 'Hikaye Hazır' : 'Story Ready'}
            </div>

            <div className="w-52 h-52 rounded-[24px] overflow-hidden shadow-2xl border border-white/15 mb-6 mx-auto">
              <img
                src={getIllustratedImageUrl({
                  title: generatedStory.title,
                  subtitle: generatedStory.subtitle,
                  theme: generatedStory.theme,
                  ageRange: generatedStory.ageRange,
                  src: themes.find(t => t.id === generatedStory.theme)?.icon || IMAGES.MOON_RESULT,
                  icon: themes.find(t => t.id === generatedStory.theme)?.visualIcon
                })}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1">
                <span className="text-white text-sm font-bold">{generationModeMeta.label}</span>
              </div>
              {generatedStory.isInteractive && (
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1">
                  <span className="text-white text-sm font-bold">{language === 'tr' ? 'Etkileşimli Hikaye' : 'Interactive Story'}</span>
                </div>
              )}
            </div>

            <h1 className="text-[30px] font-bold text-white leading-tight mb-2">{generatedStory.title}</h1>
            <p className="text-white/68 text-sm mb-2">{generatedStory.subtitle}</p>
            <p className="text-primary/80 text-sm italic mb-4">"{generatedStory.moral}"</p>

            <div className="mb-6 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 mb-2">
                {language === 'tr' ? 'Gorsel Kimlik' : 'Visual Identity'}
              </p>
              <div className="space-y-1.5 text-xs text-white/72 leading-relaxed">
                <p><span className="text-white/45">{language === 'tr' ? 'Ana karakter:' : 'Main character:'}</span> {visualIdentity.mainCharacter}</p>
                <p><span className="text-white/45">{language === 'tr' ? 'Imza obje:' : 'Signature prop:'}</span> {visualIdentity.signatureProp}</p>
                <p><span className="text-white/45">{language === 'tr' ? 'Palet:' : 'Palette:'}</span> {visualIdentity.paletteHint}</p>
              </div>
            </div>
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
      </div>
    );
  }

  // Main creation screen
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-white">
      {/* Header */}
      <div
        className="flex items-center px-6 pb-2"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 16px)' }}
      >
        <button
          onClick={onBack}
          className="size-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 touch-manipulation"
          style={{ touchAction: 'manipulation' }}
        >
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

      <div className="flex-1 px-6 py-4 overflow-y-auto pb-48">
        <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white/90">{generationModeMeta.label}</p>
            <span className="text-[11px] text-white/45">{isLocalMode ? 'No API cost' : (language === 'tr' ? 'Uzak üretim açık' : 'Remote generation enabled')}</span>
          </div>
          <p className="mt-2 text-xs text-white/60">{generationModeMeta.description}</p>
        </div>
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
        <div className="mb-6 rounded-[24px] border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold">{t.create_choose_theme}</h3>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
              {language === 'tr' ? 'Gorsel Yon' : 'Visual Direction'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`rounded-2xl border p-2.5 transition-all ${selectedTheme === theme.id
                    ? 'bg-white/10 border-accent-peach ring-2 ring-accent-peach/50 shadow-[0_12px_30px_rgba(255,176,142,0.12)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
              >
                <div className="w-full aspect-square rounded-xl bg-[#2d2e4d] mb-2 overflow-hidden shadow-inner">
                  <img
                    src={getIllustratedImageUrl({
                      title: theme.name,
                      subtitle: language === 'tr' ? 'Tema' : 'Theme',
                      theme: theme.id,
                      src: theme.icon,
                      icon: theme.visualIcon
                    })}
                    alt={theme.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="block font-semibold text-xs leading-snug">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tone + Duration */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-bold mb-3">{t.create_choose_tone}</h3>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`px-4 py-2.5 rounded-full font-bold text-sm transition-all ${selectedTone === tone.id
                      ? 'bg-secondary text-white border border-white/20 shadow-[0_10px_24px_rgba(145,92,255,0.18)]'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                    }`}
                >
                  {tone.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-bold mb-3">{t.create_choose_duration}</h3>
            <div className="grid grid-cols-3 gap-2">
              {durations.map((dur) => (
                <button
                  key={dur.id}
                  onClick={() => setSelectedDuration(dur.id)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${selectedDuration === dur.id
                      ? 'bg-primary text-bg-dark shadow-[0_10px_24px_rgba(255,176,142,0.18)]'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                    }`}
                >
                  {dur.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Toggle */}
        <div className="mb-6 rounded-[24px] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/80">
                <span className="material-symbols-outlined">alt_route</span>
              </div>
              <div>
                <p className="font-bold text-sm">
                  {language === 'tr' ? 'Etkileşimli Hikaye' : 'Interactive Story'}
                </p>
                <p className="text-white/50 text-xs leading-relaxed max-w-[220px]">
                  {language === 'tr' ? 'Secimlerle akis degissin, sonlar farklilassin.' : 'Let simple choices change the flow and ending.'}
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
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-bg-dark border-t border-white/5 max-w-[430px] mx-auto">
        <button
          onClick={handleGenerateStory}
          disabled={isGenerationLimitReached}
          className={`w-full py-4 rounded-xl text-lg font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,176,142,0.4)] transition-transform ${isGenerationLimitReached
              ? 'bg-white/15 text-white/40 cursor-not-allowed'
              : 'bg-accent-peach text-bg-dark active:scale-95'
            }`}
        >
          <span className="material-symbols-outlined">auto_fix_high</span>
          {isLocalMode
            ? (language === 'tr' ? 'Hikaye Oluştur' : 'Generate Story')
            : (language === 'tr' ? 'Yeni Hikaye Oluştur' : 'Create New Story')}
        </button>
        <p className="text-center text-white/40 text-xs mt-3 italic">
          {isLocalMode
            ? (language === 'tr'
              ? 'Yüzlerce hikayelik yerel havuzdan kişiselleştirilmiş masal hazırlıyoruz.'
              : 'Preparing a personalized tale from the local story library.')
            : generationMode === 'hybrid'
              ? (language === 'tr'
                ? 'Önce uzak üretimi deniyoruz; gerekirse yerel havuza dönüyoruz.'
                : 'Trying remote generation first, with local fallback when needed.')
              : (language === 'tr'
                ? 'Uzak üretimle yeni hikaye hazırlanıyor.'
                : 'Preparing a new story with remote generation.')}
        </p>
        <p className="text-center text-white/40 text-[11px] mt-2">
          {remainingGeneratedStories === Infinity
            ? (language === 'tr'
              ? `${planRule.nameTr} planı: sınırsız oluşturma`
              : `${planRule.name} plan: unlimited generation`)
            : (language === 'tr'
              ? `${planRule.nameTr} planı: bugün ${remainingGeneratedStories} oluşturma hakkı kaldı`
              : `${planRule.name} plan: ${remainingGeneratedStories} generations left today`)}
        </p>
      </div>
    </div>
  );
};

export default CreateStory;
