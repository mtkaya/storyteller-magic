// AI Story Generation Service via backend proxy

const STORY_API_PATH = '/api/generate-story';
const STORY_API_BASE_URL = import.meta.env.VITE_STORY_API_URL?.trim() || '';
const GEMINI_REQUEST_TIMEOUT_MS = 25000;

function resolveStoryApiEndpoint(): string {
    if (!STORY_API_BASE_URL) return STORY_API_PATH;
    return `${STORY_API_BASE_URL.replace(/\/+$/, '')}${STORY_API_PATH}`;
}

export interface StoryPrompt {
    theme: string;
    tone: string;
    duration: 'short' | 'medium' | 'long';
    childName?: string;
    language: 'en' | 'tr';
    isInteractive?: boolean;
}

export interface GeneratedStory {
    title: string;
    subtitle: string;
    character: string;
    moral: string;
    content: string[];
    ageRange: string;
    theme: string;
    // For interactive stories
    isInteractive?: boolean;
    branches?: Array<{
        id: string;
        paragraphs: string[];
        choices?: Array<{
            id: string;
            text: string;
            emoji: string;
            nextBranchId: string;
            consequence?: string;
        }>;
        isEnding?: boolean;
        endingType?: 'happy' | 'adventure' | 'lesson' | 'neutral';
        endingTitle?: string;
    }>;
    startBranchId?: string;
}

// Story themes with descriptions
const THEME_PROMPTS = {
    adventure: {
        en: 'an exciting adventure story with exploration and discovery',
        tr: 'keşif ve macera dolu heyecanlı bir hikaye'
    },
    friendship: {
        en: 'a heartwarming story about making friends and caring for others',
        tr: 'arkadaşlık kurma ve başkalarını önemseme hakkında kalp ısıtan bir hikaye'
    },
    magic: {
        en: 'a magical story with enchanted objects and wonderful spells',
        tr: 'büyülü nesneler ve harika büyülerle dolu sihirli bir hikaye'
    },
    nature: {
        en: 'a story about animals, forests, and the beauty of nature',
        tr: 'hayvanlar, ormanlar ve doğanın güzelliği hakkında bir hikaye'
    },
    space: {
        en: 'a cosmic adventure among the stars and planets',
        tr: 'yıldızlar ve gezegenler arasında kozmik bir macera'
    },
    underwater: {
        en: 'an underwater adventure with sea creatures and ocean mysteries',
        tr: 'deniz canlıları ve okyanus gizemleriyle dolu bir sualtı macerası'
    }
};

// Story tones
const TONE_PROMPTS = {
    calm: {
        en: 'gentle, soothing, and perfect for bedtime',
        tr: 'nazik, sakinleştirici ve yatmadan önce mükemmel'
    },
    exciting: {
        en: 'exciting and full of wonder',
        tr: 'heyecanlı ve hayranlık dolu'
    },
    funny: {
        en: 'funny and playful with silly moments',
        tr: 'komik ve eğlenceli, aptalca anlarla dolu'
    },
    mysterious: {
        en: 'mysterious with gentle suspense',
        tr: 'yumuşak bir gerilimle gizemli'
    }
};

// Duration to paragraph count
const DURATION_CONFIG = {
    short: { paragraphs: 8, ageRange: '2-4', minutes: 5, sentencesPerParagraph: 3 },
    medium: { paragraphs: 14, ageRange: '4-6', minutes: 10, sentencesPerParagraph: 3 },
    long: { paragraphs: 20, ageRange: '5-8', minutes: 15, sentencesPerParagraph: 4 }
};

const STORY_STRUCTURE_GUIDE: Record<StoryPrompt['duration'], { en: string; tr: string }> = {
    short: {
        en: 'Paragraphs 1-2 setup, 3-6 gentle challenge and help, 7-8 cozy resolution.',
        tr: '1-2. paragraflar giriş, 3-6. paragraflar küçük zorluk ve destek, 7-8. paragraflar sıcak çözüm.'
    },
    medium: {
        en: 'Paragraphs 1-3 setup, 4-10 journey with small discoveries, 11-14 comforting resolution.',
        tr: '1-3. paragraflar giriş, 4-10. paragraflar keşif dolu yolculuk, 11-14. paragraflar rahatlatıcı çözüm.'
    },
    long: {
        en: 'Paragraphs 1-4 setup, 5-15 layered journey with kind actions, 16-20 calm wrap-up and bedtime closure.',
        tr: '1-4. paragraflar giriş, 5-15. paragraflar katmanlı yolculuk ve iyilik anları, 16-20. paragraflar sakin kapanış.'
    }
};

const STORY_OPENERS: Record<StoryPrompt['language'], string[]> = {
    en: ['Soon after,', 'A little later,', 'Before long,', 'As night continued,', 'In the meantime,'],
    tr: ['Biraz sonra,', 'Derken,', 'Az sonra,', 'Gecenin ilerleyen saatlerinde,', 'Bu sırada,']
};

const GENTLE_ENDING_SENTENCES: Record<StoryPrompt['language'], string[]> = {
    en: [
        'At last, everyone felt safe and ready for sleep.',
        'With calm hearts, they drifted toward sweet dreams.',
        'The night ended softly, wrapped in warmth and peace.'
    ],
    tr: [
        'Sonunda herkes kendini güvende hissedip uykuya hazırlandı.',
        'Sakin kalplerle tatlı rüyalara doğru usulca yol aldılar.',
        'Gece, sıcaklık ve huzurla yumuşakça sona erdi.'
    ]
};

const SLEEP_ENDING_KEYWORDS: Record<StoryPrompt['language'], string[]> = {
    en: ['sleep', 'dream', 'blanket', 'pillow', 'goodnight', 'calm', 'rest'],
    tr: ['uyku', 'rüya', 'ruya', 'battaniye', 'yastık', 'iyi geceler', 'huzur', 'dinlen']
};

// Build the prompt for Gemini
function buildStoryPrompt(options: StoryPrompt): string {
    const { theme, tone, duration, childName, language, isInteractive } = options;
    const durationConfig = DURATION_CONFIG[duration];
    const themeDesc = THEME_PROMPTS[theme as keyof typeof THEME_PROMPTS]?.[language] || theme;
    const toneDesc = TONE_PROMPTS[tone as keyof typeof TONE_PROMPTS]?.[language] || tone;
    const structureGuide = STORY_STRUCTURE_GUIDE[duration][language];

    const childReference = childName ?
        (language === 'en' ? `The main character could be named ${childName} or a friendly animal.` :
            `Ana karakter ${childName} adında veya dost canlısı bir hayvan olabilir.`) : '';

    if (isInteractive) {
        return language === 'en' ?
            `Create an interactive "choose your own adventure" bedtime story for children.

Theme: ${themeDesc}
Tone: ${toneDesc}
Target age: ${durationConfig.ageRange} years old
${childReference}

You must respond ONLY with a valid JSON object (no markdown, no explanation) in this exact format:
{
  "title": "Story title",
  "subtitle": "Short tagline",
  "character": "Main character name",
  "moral": "The lesson of the story",
  "ageRange": "${durationConfig.ageRange}",
  "theme": "${theme}",
  "isInteractive": true,
  "startBranchId": "start",
  "branches": [
    {
      "id": "start",
      "paragraphs": ["Opening paragraph 1", "Opening paragraph 2", "What should the character do?"],
      "choices": [
        {"id": "choice1", "text": "First choice", "emoji": "🌟", "nextBranchId": "branch1", "consequence": "What might happen"},
        {"id": "choice2", "text": "Second choice", "emoji": "🎯", "nextBranchId": "branch2", "consequence": "What might happen"}
      ]
    },
    {
      "id": "branch1",
      "paragraphs": ["Story continues...", "More story...", "Another decision point?"],
      "choices": [
        {"id": "choice3", "text": "Choice A", "emoji": "✨", "nextBranchId": "ending1", "consequence": "Hint"}
      ]
    },
    {
      "id": "branch2", 
      "paragraphs": ["Different path...", "Story continues..."],
      "isEnding": true,
      "endingType": "happy",
      "endingTitle": "A Happy Ending"
    },
    {
      "id": "ending1",
      "paragraphs": ["The conclusion...", "The end."],
      "isEnding": true,
      "endingType": "lesson",
      "endingTitle": "The Lesson Learned"
    }
  ]
}

Requirements:
- Create 7-9 branches total, with at least 4 different endings
- Non-ending branches should have 3-4 short paragraphs
- Ending branches should have 2-3 short paragraphs
- Choice text should be child-friendly and concise (max 8 words)
- Include emojis that match each choice
- Keep all outcomes bedtime-safe and emotionally gentle
- Avoid repeating the same sentence openings across paragraphs
- Make it ${toneDesc}
- Keep clear beginning, middle, and ending structure in each branch` :

            `Çocuklar için interaktif bir "kendi maceranı seç" uyku hikayesi oluştur.

Tema: ${themeDesc}
Ton: ${toneDesc}
Hedef yaş: ${durationConfig.ageRange} yaş
${childReference}

SADECE geçerli bir JSON nesnesi ile yanıt ver (markdown yok, açıklama yok), tam olarak bu formatta:
{
  "title": "Hikaye başlığı",
  "subtitle": "Kısa tanım",
  "character": "Ana karakter adı",
  "moral": "Hikayenin dersi",
  "ageRange": "${durationConfig.ageRange}",
  "theme": "${theme}",
  "isInteractive": true,
  "startBranchId": "start",
  "branches": [
    {
      "id": "start",
      "paragraphs": ["Açılış paragrafı 1", "Açılış paragrafı 2", "Karakter ne yapmalı?"],
      "choices": [
        {"id": "secim1", "text": "İlk seçenek", "emoji": "🌟", "nextBranchId": "dal1", "consequence": "Ne olabilir"},
        {"id": "secim2", "text": "İkinci seçenek", "emoji": "🎯", "nextBranchId": "dal2", "consequence": "Ne olabilir"}
      ]
    }
  ]
}

Gereksinimler:
- Toplam 7-9 dal oluştur, en az 4 farklı son olsun
- Son olmayan dallar 3-4 kısa paragraf içersin
- Son dallar 2-3 kısa paragraf içersin
- Seçim metinleri kısa ve çocuk dostu olsun (en fazla 8 kelime)
- Her seçime uygun emoji ekle
- Tüm sonuçlar uyku saatine uygun, güvenli ve yumuşak olsun
- Paragraflarda aynı cümle başlangıçlarını tekrar etme
- ${toneDesc} olmalı
- Her dalda giriş, gelişme ve sonuç hissi olmalı`;
    }

    // Regular (non-interactive) story prompt
    return language === 'en' ?
        `Create a bedtime story for children.

Theme: ${themeDesc}
Tone: ${toneDesc}
Length: ${durationConfig.paragraphs} paragraphs
Target age: ${durationConfig.ageRange} years old
${childReference}

You must respond ONLY with a valid JSON object (no markdown, no explanation) in this exact format:
{
  "title": "Story title",
  "subtitle": "Theme • Key emotion",
  "character": "Main character name",
  "moral": "The lesson or moral of the story",
  "ageRange": "${durationConfig.ageRange}",
  "theme": "${theme}",
  "content": [
    "First paragraph of the story...",
    "Second paragraph...",
    "And so on for ${durationConfig.paragraphs} paragraphs..."
  ]
}

Requirements:
- Create exactly ${durationConfig.paragraphs} paragraphs
- Each paragraph should be 3-4 sentences, each sentence short and clear
- Use simple words appropriate for ${durationConfig.ageRange} year olds
- Story flow guide: ${structureGuide}
- Make it ${toneDesc}
- End with a gentle, positive conclusion
- The story should be calming and suitable for bedtime
- Avoid repeating the same first 3 words at the beginning of paragraphs
- Keep story arc strong: setup, challenge, warm resolution` :

        `Çocuklar için bir uyku hikayesi oluştur.

Tema: ${themeDesc}
Ton: ${toneDesc}
Uzunluk: ${durationConfig.paragraphs} paragraf
Hedef yaş: ${durationConfig.ageRange} yaş
${childReference}

SADECE geçerli bir JSON nesnesi ile yanıt ver (markdown yok, açıklama yok), tam olarak bu formatta:
{
  "title": "Hikaye başlığı",
  "subtitle": "Tema • Ana duygu",
  "character": "Ana karakter adı",
  "moral": "Hikayenin dersi veya mesajı",
  "ageRange": "${durationConfig.ageRange}",
  "theme": "${theme}",
  "content": [
    "Hikayenin ilk paragrafı...",
    "İkinci paragraf...",
    "${durationConfig.paragraphs} paragraf boyunca devam eder..."
  ]
}

Gereksinimler:
- Tam olarak ${durationConfig.paragraphs} paragraf oluştur
- Her paragraf 3-4 cümle olsun, cümleler kısa ve anlaşılır olsun
- ${durationConfig.ageRange} yaş için uygun basit kelimeler kullan
- Akış rehberi: ${structureGuide}
- ${toneDesc} olmalı
- Nazik, olumlu bir sonuçla bitir
- Hikaye sakinleştirici ve uyku vakti için uygun olmalı
- Paragrafların başında aynı ilk 3 kelimeyi tekrar etme
- Hikaye akışı net olsun: giriş, küçük bir zorluk, sıcak bir çözüm`;
}

type StoryBranchType = NonNullable<GeneratedStory['branches']>[number];
type StoryChoiceType = NonNullable<StoryBranchType['choices']>[number];
type EndingType = NonNullable<StoryBranchType['endingType']>;

const ENDING_TYPES: EndingType[] = ['happy', 'adventure', 'lesson', 'neutral'];
const DEFAULT_CHOICE_EMOJIS = ['🌟', '✨', '🧭', '🎈', '🌈'];

const THEME_FALLBACK_LABELS: Record<string, { en: string; tr: string }> = {
    adventure: { en: 'adventure trail', tr: 'macera yolu' },
    friendship: { en: 'friendship garden', tr: 'arkadaşlık bahçesi' },
    magic: { en: 'enchanted valley', tr: 'büyülü vadi' },
    nature: { en: 'forest path', tr: 'orman patikası' },
    space: { en: 'starry sky route', tr: 'yıldızlı gökyüzü yolu' },
    underwater: { en: 'shimmering ocean path', tr: 'parıltılı okyanus yolu' }
};

function asRecord(value: unknown): Record<string, unknown> | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    return value as Record<string, unknown>;
}

function asString(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
}

function asStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value
        .map(item => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean);
}

function removeCodeFences(text: string): string {
    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
    if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
    return cleaned.trim();
}

function extractFirstJSONObject(text: string): string {
    const startIndex = text.indexOf('{');
    if (startIndex === -1) {
        throw new Error('No JSON object found in model response.');
    }

    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = startIndex; i < text.length; i++) {
        const ch = text[i];

        if (escaped) {
            escaped = false;
            continue;
        }

        if (ch === '\\') {
            escaped = true;
            continue;
        }

        if (ch === '"') {
            inString = !inString;
            continue;
        }

        if (inString) continue;

        if (ch === '{') depth += 1;
        if (ch === '}') {
            depth -= 1;
            if (depth === 0) {
                return text.slice(startIndex, i + 1);
            }
        }
    }

    throw new Error('Incomplete JSON object in model response.');
}

function parseModelStoryPayload(generatedText: string): unknown {
    const cleaned = removeCodeFences(generatedText);
    try {
        return JSON.parse(cleaned);
    } catch {
        const jsonSegment = extractFirstJSONObject(cleaned);
        return JSON.parse(jsonSegment);
    }
}

function toEndingType(value: unknown): EndingType | undefined {
    const ending = asString(value).toLowerCase();
    if (ENDING_TYPES.includes(ending as EndingType)) {
        return ending as EndingType;
    }
    return undefined;
}

function countSentences(text: string): number {
    const matches = text.match(/[^.!?…]+[.!?…]?/g);
    return matches?.filter(segment => segment.trim().length > 0).length || 0;
}

function detailSentence(language: StoryPrompt['language'], index: number): string {
    const trDetails = [
        'Gökyüzü sakinleşirken minik yıldızlar yolu nazikçe aydınlatmış.',
        'Rüzgarın yumuşak sesi herkese güven ve huzur vermiş.',
        'Küçük dostlar birlikte hareket edince her şey daha kolay olmuş.',
        'Gece boyunca paylaşılan iyilikler kalpleri ısıtmış.',
        'Ay ışığı, adımların üzerinde gümüş bir iz bırakmış.'
    ];

    const enDetails = [
        'As the sky settled, tiny stars gently lit the path ahead.',
        'A soft breeze carried a calm feeling through the night.',
        'Moving together made every little challenge easier.',
        'Small acts of kindness warmed every heart along the way.',
        'Moonlight left a silver trail under each careful step.'
    ];

    const details = language === 'tr' ? trDetails : enDetails;
    return details[index % details.length];
}

function enrichParagraph(paragraph: string, language: StoryPrompt['language'], minSentences: number, seedIndex: number): string {
    const cleaned = paragraph.trim();
    if (!cleaned) return cleaned;

    let sentenceCount = countSentences(cleaned);
    let result = cleaned;
    let detailIndex = seedIndex;

    while (sentenceCount < minSentences) {
        result = `${result} ${detailSentence(language, detailIndex)}`;
        sentenceCount += 1;
        detailIndex += 1;
    }

    return result;
}

function cleanParagraphText(paragraph: string): string {
    return paragraph
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.!?…;:])/g, '$1')
        .replace(/([,.!?…;:])([^\s])/g, '$1 $2')
        .replace(/([!?]){2,}/g, '$1')
        .replace(/\.{3,}/g, '…')
        .trim();
}

function paragraphStartKey(paragraph: string): string {
    return cleanParagraphText(paragraph)
        .toLowerCase()
        .replace(/[^a-z0-9çğıöşüâîûéèàùêëïöüäßñ\s]/gi, ' ')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 3)
        .join(' ');
}

function addVariedOpener(paragraph: string, language: StoryPrompt['language'], seedIndex: number): string {
    const openerList = STORY_OPENERS[language];
    const opener = openerList[seedIndex % openerList.length];
    const trimmed = cleanParagraphText(paragraph);
    if (!trimmed) return trimmed;

    const first = trimmed.charAt(0).toLowerCase();
    const rest = trimmed.slice(1);
    return cleanParagraphText(`${opener} ${first}${rest}`);
}

function ensureGentleEnding(paragraph: string, language: StoryPrompt['language'], seedIndex: number): string {
    const cleaned = cleanParagraphText(paragraph);
    if (!cleaned) return cleaned;

    const lowered = cleaned.toLowerCase();
    const alreadyGentle = SLEEP_ENDING_KEYWORDS[language].some(keyword => lowered.includes(keyword));
    if (alreadyGentle) return cleaned;

    const sentence = GENTLE_ENDING_SENTENCES[language][seedIndex % GENTLE_ENDING_SENTENCES[language].length];
    return cleanParagraphText(`${cleaned} ${sentence}`);
}

function polishParagraphSequence(
    paragraphs: string[],
    language: StoryPrompt['language'],
    ensureSleepEnding: boolean
): string[] {
    const usedStarts = new Set<string>();
    const polished: string[] = [];

    for (let index = 0; index < paragraphs.length; index += 1) {
        let paragraph = cleanParagraphText(paragraphs[index] || '');
        if (!paragraph) continue;

        const startKey = paragraphStartKey(paragraph);
        if (index > 0 && startKey && usedStarts.has(startKey)) {
            paragraph = addVariedOpener(paragraph, language, index);
        }

        const normalizedStart = paragraphStartKey(paragraph);
        if (normalizedStart) usedStarts.add(normalizedStart);
        polished.push(paragraph);
    }

    if (ensureSleepEnding && polished.length > 0) {
        const lastIndex = polished.length - 1;
        polished[lastIndex] = ensureGentleEnding(polished[lastIndex], language, polished.length);
    }

    return polished;
}

function normalizeParagraphs(
    paragraphs: string[],
    targetCount: number,
    language: StoryPrompt['language'],
    minSentencesPerParagraph: number
): string[] {
    const normalized = [...paragraphs].map((paragraph, index) =>
        enrichParagraph(paragraph, language, minSentencesPerParagraph, index)
    );

    while (normalized.length < targetCount) {
        const index = normalized.length + 1;
        const filler =
            language === 'tr'
                ? `Gece ilerlerken ${index}. bölüm de sakin bir gülümsemeyle devam etti.`
                : `As the night drifted by, part ${index} continued with calm and comfort.`;

        normalized.push(enrichParagraph(filler, language, minSentencesPerParagraph, index));
    }

    const trimmed = normalized.slice(0, targetCount);
    return polishParagraphSequence(trimmed, language, true);
}

function resolveOptions(input: StoryPrompt | StoryPrompt['language']): StoryPrompt {
    if (typeof input === 'string') {
        return {
            theme: 'magic',
            tone: 'calm',
            duration: 'short',
            language: input,
            isInteractive: false
        };
    }

    return {
        ...input,
        childName: input.childName?.trim() || undefined
    };
}

function fallbackCharacter(options: StoryPrompt): string {
    if (options.childName) return options.childName;
    return options.language === 'tr' ? 'Parıltı' : 'Twinkle';
}

function fallbackThemeLabel(options: StoryPrompt): string {
    return THEME_FALLBACK_LABELS[options.theme]?.[options.language]
        || (options.language === 'tr' ? 'huzurlu bir hayal diyarı' : 'a peaceful dreamland');
}

function buildLinearFallbackParagraphs(options: StoryPrompt): string[] {
    const durationConfig = DURATION_CONFIG[options.duration];
    const targetCount = durationConfig.paragraphs;
    const character = fallbackCharacter(options);
    const place = fallbackThemeLabel(options);

    const starterParagraphs = options.language === 'tr'
        ? [
            `Bir varmış bir yokmuş, ${character} her gece ${place} boyunca yumuşak adımlarla yürürmüş.`,
            `${character}, gökyüzündeki yıldızlara bakıp derin bir nefes almış ve kalbindeki merakı dinlemiş.`,
            `Yolda karşılaştığı küçük dostlarına nazikçe yardım etmiş, herkesin yüzünde sıcak bir gülümseme bırakmış.`,
            `Birlikte sakin bir şarkı mırıldanmışlar ve rüzgarın sesi onlara güvenli bir yol göstermiş.`,
            `${character}, ay ışığında parlayan taşların üstünden geçerken küçük bir ışık kelebeğiyle arkadaş olmuş.`,
            `Kelebek, yolunu kaybeden minik bir kirpiye eşlik etmelerini isteyince ${character} hemen kabul etmiş.`,
            `Hepsi birlikte yavaş adımlarla ilerleyip kirpiyi sıcak yuvasına ulaştırmış ve gece sessizce gülümsemiş.`,
            `Gecenin sonunda ${character}, en güzel maceranın paylaşmak ve iyi kalpli olmak olduğunu anlamış.`
        ]
        : [
            `Once upon a time, ${character} walked softly along the ${place} each evening.`,
            `${character} looked up at the stars, took a deep breath, and listened to a curious little dream.`,
            `Along the way, gentle friends asked for help, and each kind act brought warm smiles.`,
            `Together they hummed a quiet song while the breeze showed a safe and peaceful path.`,
            `${character} met a tiny light butterfly dancing over the moonlit stones and waved hello.`,
            `The butterfly asked for help guiding a little hedgehog home, and ${character} happily agreed.`,
            `Step by step, they walked together until the hedgehog reached a cozy nest and sighed with relief.`,
            `By the end of the night, ${character} learned that the best adventures are shared with kindness.`
        ];

    const padded = normalizeParagraphs(
        starterParagraphs,
        Math.max(targetCount - 1, 1),
        options.language,
        durationConfig.sentencesPerParagraph
    );
    const ending = options.language === 'tr'
        ? `${character}, battaniyesine sarılıp huzurla gözlerini kapatmış ve tatlı rüyalara doğru gülümsemiş.`
        : `${character} snuggled into a cozy blanket, closed their eyes, and smiled into sweet dreams.`;

    return [...padded, enrichParagraph(ending, options.language, durationConfig.sentencesPerParagraph, 999)].slice(0, targetCount);
}

function buildInteractiveFallbackStory(options: StoryPrompt): GeneratedStory {
    const character = fallbackCharacter(options);
    const ageRange = DURATION_CONFIG[options.duration].ageRange;

    if (options.language === 'tr') {
        return {
            title: 'Yıldızlı Yol Ayrımı',
            subtitle: 'Macera • Seçimler',
            character,
            moral: 'Nazik seçimler, en güzel sonlara götürür.',
            ageRange,
            theme: options.theme,
            isInteractive: true,
            content: [],
            startBranchId: 'start',
            branches: [
                {
                    id: 'start',
                    paragraphs: [
                        `${character}, ay ışığında parlayan yolda yürürken uzakta iki farklı ışık görmüş.`,
                        'Bir yol göl kenarına, diğer yol ise yıldız bahçesine gidiyormuş.',
                        'Gökyüzündeki yıldızlar sanki hangi yolu seçeceğini merak eder gibi parıldıyormuş.',
                        'Hangisini seçmeli?'
                    ],
                    choices: [
                        { id: 'secim_gol', text: 'Göl yolunu izle', emoji: '🌊', nextBranchId: 'lake_path', consequence: 'Yeni bir dostla karşılaşabilirsin.' },
                        { id: 'secim_yildiz', text: 'Yıldız bahçesine git', emoji: '🌟', nextBranchId: 'star_garden', consequence: 'Parlayan bir sürpriz bulabilirsin.' }
                    ]
                },
                {
                    id: 'lake_path',
                    paragraphs: [
                        `${character}, göl kıyısında yönünü kaybetmiş minik bir kurbağa görmüş.`,
                        'Kurbağanın yuvasına dönmesine yardım etmek için sabırla etrafı incelemiş.',
                        'Rüzgar hafifçe esmiş ve suyun üstünde gümüş bir iz bırakmış.',
                        'Şimdi ne yapmalı?'
                    ],
                    choices: [
                        { id: 'secim_sarki', text: 'Kurbağayla sakin bir şarkı söyle', emoji: '🎵', nextBranchId: 'ending_friendship', consequence: 'Kalpleri ısıtan bir an yaşanır.' },
                        { id: 'secim_fener', text: 'Yol göstermek için fener yak', emoji: '🏮', nextBranchId: 'ending_lesson', consequence: 'Herkes güvenle evine ulaşır.' }
                    ]
                },
                {
                    id: 'star_garden',
                    paragraphs: [
                        `${character}, yıldız bahçesinde dilek tohumlarıyla dolu bir kutu bulmuş.`,
                        'Tohumlar yalnızca paylaşılırsa parlıyormuş.',
                        'Bahçedeki çiçekler, nazik bir seçim bekliyormuş gibi hafifçe sallanmış.',
                        `${character} kutuyu arkadaşlarıyla paylaşmaya karar vermiş.`
                    ],
                    choices: [
                        { id: 'secim_paylas', text: 'Dilek tohumlarını paylaş', emoji: '✨', nextBranchId: 'ending_happy', consequence: 'Bahçe ışıl ışıl olur.' }
                    ]
                },
                {
                    id: 'ending_friendship',
                    paragraphs: [
                        'Şarkı göl üzerinde yankılanmış ve kurbağa yuvasını kolayca bulmuş.',
                        'Göl kıyısındaki nilüferler de bu neşeli anı kutlamak için hafifçe sallanmış.',
                        `${character}, dostlukla atılan küçük adımların büyük mutluluk getirdiğini görmüş.`
                    ],
                    isEnding: true,
                    endingType: 'happy',
                    endingTitle: 'Dostlukla Biten Gece'
                },
                {
                    id: 'ending_lesson',
                    paragraphs: [
                        'Fenerin yumuşak ışığı yolu aydınlatmış ve herkes güvenle evine dönmüş.',
                        'Kurbağa teşekkür ederken gece daha da huzurlu bir sessizliğe bürünmüş.',
                        `${character}, cesaretin en güzel halinin başkalarına ışık olmak olduğunu öğrenmiş.`
                    ],
                    isEnding: true,
                    endingType: 'lesson',
                    endingTitle: 'Işığın Dersi'
                },
                {
                    id: 'ending_happy',
                    paragraphs: [
                        'Paylaşılan tohumlar bir anda göğe yükselip yıldız yağmuruna dönüşmüş.',
                        'Parlayan tohumlar, tüm dostların üzerine umut dolu bir ışık serpmiş.',
                        `${character}, paylaşmanın her dileği daha parlak yaptığını fark ederek huzurla eve dönmüş.`
                    ],
                    isEnding: true,
                    endingType: 'adventure',
                    endingTitle: 'Parlayan Bahçe'
                }
            ]
        };
    }

    return {
        title: 'The Starlit Crossroads',
        subtitle: 'Adventure • Choices',
        character,
        moral: 'Kind choices lead to beautiful endings.',
        ageRange,
        theme: options.theme,
        isInteractive: true,
        content: [],
        startBranchId: 'start',
        branches: [
            {
                id: 'start',
                paragraphs: [
                    `${character} walked under moonlight and noticed two glowing paths ahead.`,
                    'One path led to a calm lake, and the other led to a garden of stars.',
                    'The stars above shimmered as if they were waiting for the next choice.',
                    'Which way should the journey continue?'
                ],
                choices: [
                    { id: 'choice_lake', text: 'Follow the lake path', emoji: '🌊', nextBranchId: 'lake_path', consequence: 'A new friend might need help.' },
                    { id: 'choice_stars', text: 'Visit the star garden', emoji: '🌟', nextBranchId: 'star_garden', consequence: 'A sparkling surprise may appear.' }
                ]
            },
            {
                id: 'lake_path',
                paragraphs: [
                    `${character} found a tiny frog who could not find the way home.`,
                    'Together they looked around carefully and listened to the quiet night sounds.',
                    'A silver ripple moved across the water as the breeze whispered by.',
                    'What should they try next?'
                ],
                choices: [
                    { id: 'choice_song', text: 'Sing a calming song', emoji: '🎵', nextBranchId: 'ending_friendship', consequence: 'The frog may feel brave again.' },
                    { id: 'choice_lantern', text: 'Light a gentle lantern', emoji: '🏮', nextBranchId: 'ending_lesson', consequence: 'A safe path may appear.' }
                ]
            },
            {
                id: 'star_garden',
                paragraphs: [
                    `${character} discovered a box filled with tiny wishing seeds in the star garden.`,
                    'The seeds glowed only when they were shared kindly.',
                    'The flowers in the garden swayed softly, waiting for a gentle decision.',
                    `${character} decided to share every glowing seed with friends.`
                ],
                choices: [
                    { id: 'choice_share', text: 'Share the wishing seeds', emoji: '✨', nextBranchId: 'ending_happy', consequence: 'The sky might light up.' }
                ]
            },
            {
                id: 'ending_friendship',
                paragraphs: [
                    'The calming song echoed across the lake, and the frog found the way home.',
                    'Nearby lily pads swayed like they were celebrating the kind choice.',
                    `${character} learned that gentle friendship can guide anyone through the dark.`
                ],
                isEnding: true,
                endingType: 'happy',
                endingTitle: 'A Night of Friendship'
            },
            {
                id: 'ending_lesson',
                paragraphs: [
                    'The lantern painted a warm trail of light, and everyone reached home safely.',
                    'As the frog smiled with relief, the whole night felt calmer and brighter.',
                    `${character} discovered that courage often looks like helping others first.`
                ],
                isEnding: true,
                endingType: 'lesson',
                endingTitle: 'The Lantern Lesson'
            },
            {
                id: 'ending_happy',
                paragraphs: [
                    'As the seeds were shared, they rose like tiny comets and lit up the whole sky.',
                    'The sparkling seeds drifted gently and wrapped every friend in warm light.',
                    `${character} returned home smiling, knowing kindness makes every wish brighter.`
                ],
                isEnding: true,
                endingType: 'adventure',
                endingTitle: 'The Glowing Garden'
            }
        ]
    };
}

function normalizeInteractiveStory(
    raw: Record<string, unknown>,
    options: StoryPrompt,
    baseMeta: Omit<GeneratedStory, 'content'>
): GeneratedStory | null {
    const inputBranches = Array.isArray(raw.branches) ? raw.branches : [];
    if (inputBranches.length === 0) return null;

    const branches: StoryBranchType[] = inputBranches
        .map((branchInput, branchIndex) => {
            const branchRecord = asRecord(branchInput);
            if (!branchRecord) return null;

            const id = asString(branchRecord.id) || `branch_${branchIndex + 1}`;
            const rawBranchParagraphs = asStringArray(branchRecord.paragraphs)
                .map((paragraph, paragraphIndex) => enrichParagraph(paragraph, options.language, 3, paragraphIndex));
            if (rawBranchParagraphs.length === 0) return null;

            const inputChoices = Array.isArray(branchRecord.choices) ? branchRecord.choices : [];
            const choices: StoryChoiceType[] = inputChoices
                .map((choiceInput, choiceIndex) => {
                    const choiceRecord = asRecord(choiceInput);
                    if (!choiceRecord) return null;

                    const nextBranchId = asString(choiceRecord.nextBranchId);
                    const text = asString(choiceRecord.text);
                    if (!nextBranchId || !text) return null;

                    return {
                        id: asString(choiceRecord.id) || `${id}_choice_${choiceIndex + 1}`,
                        text,
                        emoji: asString(choiceRecord.emoji) || DEFAULT_CHOICE_EMOJIS[choiceIndex % DEFAULT_CHOICE_EMOJIS.length],
                        nextBranchId,
                        consequence: asString(choiceRecord.consequence) || undefined
                    };
                })
                .filter((choice) => choice !== null) as StoryChoiceType[];

            const branchShouldEnd = Boolean(branchRecord.isEnding) || choices.length === 0;
            const branchParagraphs = polishParagraphSequence(rawBranchParagraphs, options.language, branchShouldEnd);
            if (branchParagraphs.length === 0) return null;

            const branch: StoryBranchType = {
                id,
                paragraphs: branchParagraphs,
                isEnding: Boolean(branchRecord.isEnding),
                endingType: toEndingType(branchRecord.endingType),
                endingTitle: asString(branchRecord.endingTitle) || undefined
            };

            if (choices.length > 0) {
                branch.choices = choices;
            }

            return branch;
        })
        .filter((branch): branch is StoryBranchType => Boolean(branch));

    if (branches.length < 2) return null;

    const branchIds = new Set(branches.map(branch => branch.id));
    let hasChoices = false;

    branches.forEach((branch, index) => {
        if (branch.choices?.length) {
            branch.choices = branch.choices.filter(choice => branchIds.has(choice.nextBranchId));
        }

        if (!branch.choices || branch.choices.length === 0) {
            branch.choices = undefined;
            branch.isEnding = true;
            if (!branch.endingType) {
                branch.endingType = index % 2 === 0 ? 'happy' : 'lesson';
            }
            if (!branch.endingTitle) {
                branch.endingTitle = options.language === 'tr' ? 'Nazik Bir Son' : 'A Gentle Ending';
            }
        } else {
            hasChoices = true;
            branch.isEnding = false;
        }
    });

    if (!hasChoices) return null;

    const requestedStart = asString(raw.startBranchId);
    const startBranchId = branchIds.has(requestedStart) ? requestedStart : branches[0].id;

    if (!branches.some(branch => branch.isEnding)) {
        const finalBranch = branches[branches.length - 1];
        finalBranch.isEnding = true;
        finalBranch.endingType = finalBranch.endingType || 'neutral';
        finalBranch.endingTitle = finalBranch.endingTitle || (options.language === 'tr' ? 'Rüya Sonu' : 'Dream Ending');
    }

    return {
        ...baseMeta,
        isInteractive: true,
        startBranchId,
        branches,
        content: []
    };
}

function normalizeGeneratedStory(rawPayload: unknown, options: StoryPrompt): GeneratedStory {
    const fallback = getFallbackStory(options);
    const payload = asRecord(rawPayload);
    if (!payload) return fallback;

    const durationConfig = DURATION_CONFIG[options.duration];
    const title = asString(payload.title) || fallback.title;
    const subtitle = asString(payload.subtitle) || fallback.subtitle;
    const character = asString(payload.character) || fallback.character;
    const moral = asString(payload.moral) || fallback.moral;
    const theme = asString(payload.theme) || options.theme;

    const baseMeta: Omit<GeneratedStory, 'content'> = {
        title,
        subtitle,
        character,
        moral,
        ageRange: durationConfig.ageRange,
        theme
    };

    if (options.isInteractive) {
        const interactiveStory = normalizeInteractiveStory(payload, options, baseMeta);
        if (interactiveStory) return interactiveStory;
    }

    const content = asStringArray(payload.content);
    const normalizedContent = content.length > 0
        ? normalizeParagraphs(content, durationConfig.paragraphs, options.language, durationConfig.sentencesPerParagraph)
        : buildLinearFallbackParagraphs(options);

    return {
        ...baseMeta,
        isInteractive: false,
        content: normalizedContent
    };
}

// Call Gemini API
export async function generateStoryWithAI(options: StoryPrompt): Promise<GeneratedStory> {
    const prompt = buildStoryPrompt(options);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GEMINI_REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(resolveStoryApiEndpoint(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
            body: JSON.stringify({
                prompt
            })
        });

        if (!response.ok) {
            let errorMessage = response.statusText;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error?.message || errorMessage;
            } catch {
                // keep status text fallback
            }
            throw new Error(`Story API error: ${errorMessage}`);
        }

        const data = await response.json();
        const generatedText = typeof data.generatedText === 'string' ? data.generatedText : '';

        if (!generatedText) {
            throw new Error('No content generated from Story API.');
        }

        const payload = parseModelStoryPayload(generatedText);
        return normalizeGeneratedStory(payload, options);
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw new Error(`Gemini request timed out after ${Math.round(GEMINI_REQUEST_TIMEOUT_MS / 1000)} seconds.`);
        }
        console.error('Error generating story:', error);
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

// Fallback story if API fails
export function getFallbackStory(optionsOrLanguage: StoryPrompt | StoryPrompt['language']): GeneratedStory {
    const options = resolveOptions(optionsOrLanguage);
    const ageRange = DURATION_CONFIG[options.duration].ageRange;

    if (options.isInteractive) {
        return buildInteractiveFallbackStory(options);
    }

    const character = fallbackCharacter(options);
    const title = options.language === 'tr' ? 'Küçük Yıldızın Yolculuğu' : 'The Little Star Journey';
    const subtitle = options.language === 'tr' ? 'Uyku Hikayesi • Nezaket' : 'Bedtime Story • Kindness';
    const moral = options.language === 'tr'
        ? 'Küçük bir iyilik bile geceyi aydınlatır.'
        : 'Even a small act of kindness can light up the night.';

    return {
        title,
        subtitle,
        character,
        moral,
        ageRange,
        theme: options.theme || 'magic',
        content: buildLinearFallbackParagraphs(options)
    };
}
