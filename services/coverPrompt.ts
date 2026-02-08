export interface CoverPromptInput {
  title: string;
  subtitle?: string;
  theme?: string;
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

function normalizeTheme(theme: string | undefined): string {
  const value = (theme || '').trim().toLowerCase();
  if (!value) return 'magic';
  if (value.includes('adventure')) return 'adventure';
  if (value.includes('friend')) return 'friendship';
  if (value.includes('magic')) return 'magic';
  if (value.includes('nature')) return 'nature';
  if (value.includes('space')) return 'space';
  if (value.includes('underwater') || value.includes('ocean') || value.includes('sea')) return 'underwater';
  if (value.includes('bedtime')) return 'bedtime';
  if (value.includes('calm')) return 'calm';
  if (value.includes('courage')) return 'courage';
  if (value.includes('kind')) return 'kindness';
  return 'magic';
}

export function buildIllustrationCoverPrompt(input: CoverPromptInput): string {
  const themeKey = normalizeTheme(input.theme);
  const visualLook = THEME_LOOKS[themeKey] || THEME_LOOKS.magic;
  const character = (input.character || (input.language === 'tr' ? 'sevimli ana karakter' : 'friendly main character')).trim();
  const subtitle = (input.subtitle || '').trim();
  const moral = (input.moral || '').trim();
  const tone = (input.tone || (input.language === 'tr' ? 'sakin, sicak ve cocuk dostu' : 'calm, warm, child-friendly')).trim();

  if (input.language === 'tr') {
    return [
      `Cocuk kitabi icin kapak ilustrasyonu: "${input.title}"`,
      subtitle ? `Alt baslik atmosferi: ${subtitle}` : '',
      `Tema: ${themeKey}`,
      `Ana karakter: ${character}`,
      `Sahne: ${visualLook}`,
      moral ? `Duygusal mesaj: ${moral}` : '',
      `Stil: elde cizilmis dijital ilustrasyon, painterly, yumusak kenarlar, temiz kompozisyon, ${tone}`,
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
    moral ? `Emotional message: ${moral}` : '',
    `Style: hand-painted digital illustration, soft painterly shapes, clean composition, ${tone}`,
    'Color direction: rich but gentle palette, bedtime-friendly contrast, warm highlights',
    'Framing: vertical 3:4 cover composition, centered focal character',
    `Negative prompt: ${NEGATIVE_PROMPT}`
  ].filter(Boolean).join('\n');
}
