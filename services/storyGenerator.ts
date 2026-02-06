// AI Story Generation Service using Gemini API
// Replace GEMINI_API_KEY with your actual API key

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

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
    short: { paragraphs: 5, ageRange: '2-4', minutes: 3 },
    medium: { paragraphs: 10, ageRange: '4-6', minutes: 7 },
    long: { paragraphs: 15, ageRange: '5-8', minutes: 12 }
};

// Build the prompt for Gemini
function buildStoryPrompt(options: StoryPrompt): string {
    const { theme, tone, duration, childName, language, isInteractive } = options;
    const durationConfig = DURATION_CONFIG[duration];
    const themeDesc = THEME_PROMPTS[theme as keyof typeof THEME_PROMPTS]?.[language] || theme;
    const toneDesc = TONE_PROMPTS[tone as keyof typeof TONE_PROMPTS]?.[language] || tone;

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
- Create 3-4 different possible endings
- Each branch should have 3-5 short paragraphs
- Choices should be meaningful and child-appropriate
- Include emojis that match each choice
- Make it ${toneDesc}
- The story should be calming and suitable for bedtime` :

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
- 3-4 farklı olası son oluştur
- Her dal 3-5 kısa paragraf içermeli
- Seçimler anlamlı ve çocuklara uygun olmalı
- Her seçime uygun emoji ekle
- ${toneDesc} olmalı
- Hikaye sakinleştirici ve uyku vakti için uygun olmalı`;
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
- Each paragraph should be 2-3 sentences
- Use simple words appropriate for ${durationConfig.ageRange} year olds
- Make it ${toneDesc}
- End with a gentle, positive conclusion
- The story should be calming and suitable for bedtime` :

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
- Her paragraf 2-3 cümle olmalı
- ${durationConfig.ageRange} yaş için uygun basit kelimeler kullan
- ${toneDesc} olmalı
- Nazik, olumlu bir sonuçla bitir
- Hikaye sakinleştirici ve uyku vakti için uygun olmalı`;
}

// Call Gemini API
export async function generateStoryWithAI(options: StoryPrompt): Promise<GeneratedStory> {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env.local file.');
    }

    const prompt = buildStoryPrompt(options);

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.8,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 4096,
                },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            throw new Error('No content generated from Gemini API');
        }

        // Parse the JSON response
        // Clean up the response (remove markdown code blocks if present)
        let cleanedText = generatedText.trim();
        if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.slice(7);
        }
        if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.slice(3);
        }
        if (cleanedText.endsWith('```')) {
            cleanedText = cleanedText.slice(0, -3);
        }
        cleanedText = cleanedText.trim();

        const story = JSON.parse(cleanedText) as GeneratedStory;

        return story;
    } catch (error) {
        console.error('Error generating story:', error);
        throw error;
    }
}

// Fallback story if API fails
export function getFallbackStory(language: 'en' | 'tr'): GeneratedStory {
    if (language === 'tr') {
        return {
            title: 'Küçük Yıldız',
            subtitle: 'Macera • Cesaret',
            character: 'Yıldız',
            moral: 'En küçük ışık bile karanlığı aydınlatabilir.',
            ageRange: '3-6',
            theme: 'magic',
            content: [
                'Bir zamanlar, gökyüzünde küçücük bir yıldız yaşarmış. Adı Parıltı\'ymış.',
                'Parıltı, diğer yıldızlar kadar parlak olmadığı için üzgünmüş.',
                'Bir gece, kaybolmuş küçük bir ateş böceği yardım istemiş.',
                'Parıltı, tüm gücüyle parlamış ve ateş böceğine yol göstermiş.',
                'O gece Parıltı anlamış ki, boyut önemli değil - önemli olan kalpteki ışık.'
            ]
        };
    }

    return {
        title: 'The Little Star',
        subtitle: 'Adventure • Courage',
        character: 'Twinkle',
        moral: 'Even the smallest light can brighten the darkness.',
        ageRange: '3-6',
        theme: 'magic',
        content: [
            'Once upon a time, in the vast night sky, there lived a tiny star named Twinkle.',
            'Twinkle was sad because she wasn\'t as bright as the other stars.',
            'One night, a lost little firefly asked for help finding its way home.',
            'Twinkle shone with all her might and guided the firefly safely home.',
            'That night, Twinkle learned that size doesn\'t matter - what matters is the light in your heart.'
        ]
    };
}
