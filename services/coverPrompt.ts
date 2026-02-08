import {
  IllustrationAgeProfile,
  IllustrationTechnique,
  normalizeIllustrationTheme,
  parseTechniqueOverride,
  resolveIllustrationAgeProfile,
  resolveIllustrationTechnique
} from './illustrationStyle';

export interface CoverPromptInput {
  title: string;
  subtitle?: string;
  theme?: string;
  ageRange?: string;
  character?: string;
  moral?: string;
  tone?: string;
  language: 'en' | 'tr';
}

const THEME_LOOKS: Record<string, string> = {
  adventure: 'storybook adventure valley, winding path, distant glowing mountains',
  friendship: 'cozy friendship garden, warm lantern lights, soft evening sky',
  magic: 'enchanted forest clearing, floating sparkles, whimsical glow',
  nature: 'lush moonlit forest, gentle leaves, calm wildlife silhouettes',
  space: 'dreamy cosmos with friendly planets, soft nebula clouds, star trails',
  underwater: 'calm underwater world, bioluminescent corals, floating bubbles',
  bedtime: 'night nursery mood, moon glow, sleepy clouds and stars',
  calm: 'serene twilight atmosphere, soft mist, gentle color transitions',
  courage: 'heroic but gentle horizon, warm light beam, comforting scale',
  kindness: 'pastel heartwarming scene, soft glow, welcoming shapes'
};

const NEGATIVE_PROMPT =
  'no photorealism, no realistic camera lens, no real photo texture, no harsh shadows, no horror, no violence, no text watermark, no logo';

const STYLE_NOTE_EN: Record<IllustrationTechnique, string> = {
  watercolor: 'watercolor wash edges, airy blends, soft dreamy transitions',
  gouache: 'bold gouache strokes, rich matte color blocks, confident silhouettes',
  'flat-storybook': 'flat storybook geometry, crisp layered shapes, editorial clarity',
  'cut-paper': 'cut-paper collage layers, tactile overlaps, handcrafted depth'
};

const STYLE_NOTE_TR: Record<IllustrationTechnique, string> = {
  watercolor: 'sulu boya gecisleri, yumusak yayilimlar, ruyamsi ton gecisleri',
  gouache: 'gouache firca darbeleri, mat renk bloklari, guclu siluetler',
  'flat-storybook': 'duz storybook geometri, net katmanlar, temiz kompozisyon',
  'cut-paper': 'katmanli cut-paper kolaj, elde yapilmis doku hissi, derinlik'
};

const AGE_NOTE_EN: Record<IllustrationAgeProfile, string> = {
  toddler: 'ages 2-4: very simple forms, big readable focal shapes, low visual noise',
  'early-reader': 'ages 4-6: simple story cues, clear emotions, medium detail',
  'middle-grade': 'ages 6-8: richer environment details, layered storytelling props',
  'older-kids': 'ages 8+: cinematic framing, deeper scene detail, nuanced lighting'
};

const AGE_NOTE_TR: Record<IllustrationAgeProfile, string> = {
  toddler: '2-4 yas: cok sade sekiller, buyuk odak formlar, dusuk gorsel kalabalik',
  'early-reader': '4-6 yas: net hikaye ipuclari, belirgin duygular, orta detay',
  'middle-grade': '6-8 yas: daha zengin cevre detaylari, katmanli sahne unsurlari',
  'older-kids': '8+ yas: daha sinematik kadraj, derin sahne detayi, dengeli isik'
};

export function buildIllustrationCoverPrompt(input: CoverPromptInput): string {
  const styleOverride = parseTechniqueOverride(import.meta.env.VITE_ILLUSTRATION_STYLE_OVERRIDE);
  const themeKey = normalizeIllustrationTheme(input.theme) || 'magic';
  const technique = resolveIllustrationTechnique(input.theme, styleOverride);
  const ageProfile = resolveIllustrationAgeProfile(input.ageRange);
  const visualLook = THEME_LOOKS[themeKey] || THEME_LOOKS.magic;
  const character = (input.character || (input.language === 'tr' ? 'sevimli ana karakter' : 'friendly main character')).trim();
  const subtitle = (input.subtitle || '').trim();
  const moral = (input.moral || '').trim();
  const tone = (input.tone || (input.language === 'tr' ? 'sakin, sicak ve cocuk dostu' : 'calm, warm, child-friendly')).trim();
  const techniqueTag = technique.replace('-', ' ');

  if (input.language === 'tr') {
    return [
      `Cocuk kitabi icin kapak ilustrasyonu: "${input.title}"`,
      subtitle ? `Alt baslik atmosferi: ${subtitle}` : '',
      `Tema: ${themeKey}`,
      `Ana karakter: ${character}`,
      `Sahne: ${visualLook}`,
      `Teknik preset: ${techniqueTag}`,
      `Yas odagi: ${AGE_NOTE_TR[ageProfile]}`,
      moral ? `Duygusal mesaj: ${moral}` : '',
      `Stil: elde cizilmis dijital ilustrasyon, ${STYLE_NOTE_TR[technique]}, ${tone}`,
      'Renk paleti: zengin ama yumusak, gece ve sicak vurgu dengesi, cocuklara uygun',
      'Kadro: dikey 3:4, kapak kompozisyonu, merkeze yakin odak karakter',
      `Negatif: ${NEGATIVE_PROMPT}`
    ].filter(Boolean).join('\n');
  }

  return [
    `Children's book cover illustration for "${input.title}"`,
    subtitle ? `Subtitle mood: ${subtitle}` : '',
    `Theme: ${themeKey}`,
    `Main character: ${character}`,
    `Scene: ${visualLook}`,
    `Technique preset: ${techniqueTag}`,
    `Age direction: ${AGE_NOTE_EN[ageProfile]}`,
    moral ? `Emotional message: ${moral}` : '',
    `Style: hand-painted digital illustration, ${STYLE_NOTE_EN[technique]}, ${tone}`,
    'Color direction: rich but gentle palette, bedtime-friendly contrast, warm highlights',
    'Framing: vertical 3:4 cover composition, centered focal character',
    `Negative prompt: ${NEGATIVE_PROMPT}`
  ].filter(Boolean).join('\n');
}
