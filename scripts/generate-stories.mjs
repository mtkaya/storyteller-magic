#!/usr/bin/env node
/**
 * Generate 54 new stories with Turkish character names using Gemini API
 * Usage: node scripts/generate-stories.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Load API key
const envPath = path.join(ROOT, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const GEMINI_KEY = envContent.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim();
if (!GEMINI_KEY || GEMINI_KEY === 'PLACEHOLDER_API_KEY') {
  console.error('❌ GEMINI_API_KEY not set in .env.local');
  process.exit(1);
}

const STORY_PLANS = [
  // === MACERA (7 yeni) ===
  { theme: 'Adventure', character: 'Kemal', characterTr: 'Kemal', title: 'Kemal and the Sky Bridge', titleTr: 'Kemal ve Gökyüzü Köprüsü', ageRange: '4-7', moral: 'Cesaret, bilinmeyene adım atmakla başlar.', subtitle: 'Adventure • Courage' },
  { theme: 'Adventure', character: 'Defne', characterTr: 'Defne', title: 'Defne and the Underground River', titleTr: 'Defne ve Yeraltı Nehri', ageRange: '5-8', moral: 'Merak eden keşfeder, keşfeden büyür.', subtitle: 'Adventure • Discovery' },
  { theme: 'Adventure', character: 'Arda', characterTr: 'Arda', title: 'Arda and the Wind Horse', titleTr: 'Arda ve Rüzgar Atı', ageRange: '4-7', moral: 'Özgürlük, başkalarına saygı duymakla başlar.', subtitle: 'Adventure • Freedom' },
  { theme: 'Adventure', character: 'Zeynep', characterTr: 'Zeynep', title: 'Zeynep and the Invisible Map', titleTr: 'Zeynep ve Görünmez Harita', ageRange: '5-8', moral: 'En iyi harita kalbinin sesini dinlemektir.', subtitle: 'Adventure • Intuition' },
  { theme: 'Adventure', character: 'Yusuf', characterTr: 'Yusuf', title: 'Yusuf and the Volcano Island', titleTr: 'Yusuf ve Yanardağ Adası', ageRange: '5-8', moral: 'Tehlikelerde sakin kalmak en büyük güçtür.', subtitle: 'Adventure • Resilience' },
  { theme: 'Adventure', character: 'Aymira', characterTr: 'Aymira', title: 'Aymira and the Crystal Cave', titleTr: 'Aymira ve Kristal Mağara', ageRange: '4-7', moral: 'Gerçek hazine içindeki ışıktır.', subtitle: 'Adventure • Self-discovery' },
  { theme: 'Adventure', character: 'Baran', characterTr: 'Baran', title: 'Baran and the Giant\'s Garden', titleTr: 'Baran ve Devin Bahçesi', ageRange: '4-7', moral: 'Büyük görünen şeyler yakından bakınca dost olabilir.', subtitle: 'Adventure • Perspective' },

  // === DOSTLUK (7 yeni) ===
  { theme: 'Friendship', character: 'Ela', characterTr: 'Ela', title: 'Ela and the New Neighbor', titleTr: 'Ela ve Yeni Komşu', ageRange: '3-6', moral: 'Farklılıklar zenginliktir.', subtitle: 'Friendship • Diversity' },
  { theme: 'Friendship', character: 'Doruk', characterTr: 'Doruk', title: 'Doruk and the Lonely Star', titleTr: 'Doruk ve Yalnız Yıldız', ageRange: '3-6', moral: 'Kimse yalnız kalmak zorunda değil.', subtitle: 'Friendship • Belonging' },
  { theme: 'Friendship', character: 'Nisan', characterTr: 'Nisan', title: 'Nisan and the Secret Club', titleTr: 'Nisan ve Gizli Kulüp', ageRange: '4-7', moral: 'Gerçek arkadaşlık herkesi dahil eder.', subtitle: 'Friendship • Inclusion' },
  { theme: 'Friendship', character: 'Mete', characterTr: 'Mete', title: 'Mete and the Broken Kite', titleTr: 'Mete ve Kırık Uçurtma', ageRange: '3-6', moral: 'Birlikte tamir edilen şeyler daha güçlü olur.', subtitle: 'Friendship • Cooperation' },
  { theme: 'Friendship', character: 'Lina', characterTr: 'Lina', title: 'Lina and the Mirror Pond', titleTr: 'Lina ve Ayna Gölet', ageRange: '4-7', moral: 'Kendini sevmek başkalarını sevmenin ilk adımıdır.', subtitle: 'Friendship • Self-love' },
  { theme: 'Friendship', character: 'Can', characterTr: 'Can', title: 'Can and the Talking Tree', titleTr: 'Can ve Konuşan Ağaç', ageRange: '4-7', moral: 'Dinlemek en güzel hediyedir.', subtitle: 'Friendship • Listening' },
  { theme: 'Friendship', character: 'Sude', characterTr: 'Sude', title: 'Sude and the Color Thief', titleTr: 'Sude ve Renk Hırsızı', ageRange: '3-6', moral: 'Paylaşılan renkler daha parlak olur.', subtitle: 'Friendship • Sharing' },

  // === UYKU/SAKİNLİK (7 yeni) ===
  { theme: 'Calm', character: 'Miray', characterTr: 'Miray', title: 'Miray and the Dream Clouds', titleTr: 'Miray ve Düş Bulutları', ageRange: '2-5', moral: 'Uykuya dalmak yeni bir maceraya başlamaktır.', subtitle: 'Calm • Sleep' },
  { theme: 'Calm', character: 'Bulut', characterTr: 'Bulut', title: 'Bulut the Sleepy Bear', titleTr: 'Uykucu Ayı Bulut', ageRange: '2-5', moral: 'Dinlenmek de bir süper güçtür.', subtitle: 'Calm • Rest' },
  { theme: 'Calm', character: 'Duru', characterTr: 'Duru', title: 'Duru and the Night Garden', titleTr: 'Duru ve Gece Bahçesi', ageRange: '3-6', moral: 'Gecenin sessizliği kendi müziğini taşır.', subtitle: 'Calm • Mindfulness' },
  { theme: 'Calm', character: 'Rüzgar', characterTr: 'Rüzgar', title: 'Rüzgar and the Moonlit Path', titleTr: 'Rüzgar ve Ay Işığı Patikası', ageRange: '3-6', moral: 'Yavaşlamak bazen en hızlı yoldur.', subtitle: 'Calm • Patience' },
  { theme: 'Calm', character: 'Nehir', characterTr: 'Nehir', title: 'Nehir and the Whispering Waves', titleTr: 'Nehir ve Fısıldayan Dalgalar', ageRange: '2-5', moral: 'Her dalga kıyıya bir huzur bırakır.', subtitle: 'Calm • Tranquility' },
  { theme: 'Bedtime', character: 'Yıldız', characterTr: 'Yıldız', title: 'Yıldız and the Sleepy Moon', titleTr: 'Yıldız ve Uykucu Ay', ageRange: '2-5', moral: 'Ay bile uyur, sen de uyuyabilirsin.', subtitle: 'Bedtime • Sleep' },
  { theme: 'Bedtime', character: 'Pamuk', characterTr: 'Pamuk', title: 'Pamuk and the Pillow Mountain', titleTr: 'Pamuk ve Yastık Dağı', ageRange: '2-5', moral: 'En yumuşak yer annenin kucağıdır.', subtitle: 'Bedtime • Comfort' },

  // === DOĞA (8 yeni) ===
  { theme: 'Nature', character: 'Toprak', characterTr: 'Toprak', title: 'Toprak and the First Seed', titleTr: 'Toprak ve İlk Tohum', ageRange: '3-6', moral: 'Küçük tohumlar büyük ağaçlar olur.', subtitle: 'Nature • Growth' },
  { theme: 'Nature', character: 'Çiçek', characterTr: 'Çiçek', title: 'Çiçek and the Bee Dance', titleTr: 'Çiçek ve Arı Dansı', ageRange: '3-6', moral: 'Doğada herkesin bir görevi vardır.', subtitle: 'Nature • Ecosystem' },
  { theme: 'Nature', character: 'Deniz', characterTr: 'Deniz', title: 'Deniz and the Coral Kingdom', titleTr: 'Deniz ve Mercan Krallığı', ageRange: '4-7', moral: 'Denizi korumak geleceği korumaktır.', subtitle: 'Nature • Conservation' },
  { theme: 'Nature', character: 'Yaprak', characterTr: 'Yaprak', title: 'Yaprak and the Four Seasons', titleTr: 'Yaprak ve Dört Mevsim', ageRange: '3-6', moral: 'Her mevsimin kendine göre güzelliği vardır.', subtitle: 'Nature • Seasons' },
  { theme: 'Nature', character: 'Bulut', characterTr: 'Bulut', title: 'Bulut and the Thirsty Village', titleTr: 'Bulut ve Susuz Köy', ageRange: '4-7', moral: 'Vermek en güzel zenginliktir.', subtitle: 'Nature • Generosity' },
  { theme: 'Nature', character: 'Poyraz', characterTr: 'Poyraz', title: 'Poyraz and the Mountain Eagle', titleTr: 'Poyraz ve Dağ Kartalı', ageRange: '5-8', moral: 'Yükseklere uçmak için köklerini bilmek gerekir.', subtitle: 'Nature • Heritage' },
  { theme: 'Nature', character: 'Irmak', characterTr: 'Irmak', title: 'Irmak and the Forest Fire', titleTr: 'Irmak ve Orman Yangını', ageRange: '5-8', moral: 'Küçük eller büyük işler başarır.', subtitle: 'Nature • Responsibility' },
  { theme: 'Nature', character: 'Kumru', characterTr: 'Kumru', title: 'Kumru and the Lost Nest', titleTr: 'Kumru ve Kayıp Yuva', ageRange: '3-6', moral: 'Ev, sevdiklerinin olduğu yerdir.', subtitle: 'Nature • Home' },

  // === CESARET (6 yeni) ===
  { theme: 'Courage', character: 'Alp', characterTr: 'Alp', title: 'Alp and the Dark Forest', titleTr: 'Alp ve Karanlık Orman', ageRange: '4-7', moral: 'Karanlık, ışığı tanımanın yoludur.', subtitle: 'Courage • Overcoming Fear' },
  { theme: 'Courage', character: 'Asya', characterTr: 'Asya', title: 'Asya and the Stage Fright', titleTr: 'Asya ve Sahne Korkusu', ageRange: '4-7', moral: 'Titreyen dizlerle bile sahneye çıkılır.', subtitle: 'Courage • Performance' },
  { theme: 'Courage', character: 'Kaan', characterTr: 'Kaan', title: 'Kaan and the Bully Bridge', titleTr: 'Kaan ve Zorba Köprüsü', ageRange: '5-8', moral: 'Güç kullanmadan güçlü olunabilir.', subtitle: 'Courage • Standing Up' },
  { theme: 'Courage', character: 'Elif', characterTr: 'Elif', title: 'Elif and the Hospital Visit', titleTr: 'Elif ve Hastane Ziyareti', ageRange: '4-7', moral: 'Korkuların arkasında iyilik saklıdır.', subtitle: 'Courage • Healthcare' },
  { theme: 'Courage', character: 'Ömer', characterTr: 'Ömer', title: 'Ömer and the Swimming Lesson', titleTr: 'Ömer ve Yüzme Dersi', ageRange: '3-6', moral: 'Her şey ilk adımla başlar.', subtitle: 'Courage • First Steps' },
  { theme: 'Courage', character: 'Azra', characterTr: 'Azra', title: 'Azra and the Thunder Night', titleTr: 'Azra ve Gök Gürültüsü Gecesi', ageRange: '3-6', moral: 'Fırtınalar geçer, cesaret kalır.', subtitle: 'Courage • Storms' },

  // === AİLE (5 yeni) ===
  { theme: 'Family', character: 'Emir', characterTr: 'Emir', title: 'Emir and the Baby Sister', titleTr: 'Emir ve Minik Kardeş', ageRange: '3-6', moral: 'Sevgi paylaştıkça büyür.', subtitle: 'Family • New Sibling' },
  { theme: 'Family', character: 'Nil', characterTr: 'Nil', title: 'Nil and Grandpa\'s Workshop', titleTr: 'Nil ve Dedenin Atölyesi', ageRange: '4-7', moral: 'Büyüklerden öğrenmek en değerli mirastır.', subtitle: 'Family • Grandparents' },
  { theme: 'Family', character: 'Ada', characterTr: 'Ada', title: 'Ada and the Family Recipe', titleTr: 'Ada ve Aile Tarifi', ageRange: '4-7', moral: 'Aile gelenekleri nesilden nesile aktarılır.', subtitle: 'Family • Traditions' },
  { theme: 'Family', character: 'Ali', characterTr: 'Ali', title: 'Ali and the Moving Day', titleTr: 'Ali ve Taşınma Günü', ageRange: '4-7', moral: 'Yeni başlangıçlar korkutucu ama güzel olabilir.', subtitle: 'Family • Change' },
  { theme: 'Family', character: 'Ceren', characterTr: 'Ceren', title: 'Ceren and the Weekend Market', titleTr: 'Ceren ve Hafta Sonu Pazarı', ageRange: '3-6', moral: 'En güzel anlar ailecek geçirilen anlardır.', subtitle: 'Family • Togetherness' },

  // === BİLGELİK (5 yeni) ===
  { theme: 'Wisdom', character: 'Bilge', characterTr: 'Bilge', title: 'Bilge and the Question Tree', titleTr: 'Bilge ve Soru Ağacı', ageRange: '5-8', moral: 'Doğru soru sormak doğru cevap bulmaktan önemlidir.', subtitle: 'Wisdom • Questions' },
  { theme: 'Wisdom', character: 'Ege', characterTr: 'Ege', title: 'Ege and the Two Paths', titleTr: 'Ege ve İki Yol', ageRange: '5-8', moral: 'Her seçim seni bir yere götürür.', subtitle: 'Wisdom • Choices' },
  { theme: 'Wisdom', character: 'Sena', characterTr: 'Sena', title: 'Sena and the Patient Fisherman', titleTr: 'Sena ve Sabırlı Balıkçı', ageRange: '4-7', moral: 'Sabır en tatlı meyveyi verir.', subtitle: 'Wisdom • Patience' },
  { theme: 'Wisdom', character: 'Tan', characterTr: 'Tan', title: 'Tan and the Broken Clock', titleTr: 'Tan ve Kırık Saat', ageRange: '5-8', moral: 'Zaman geçer ama anılar kalır.', subtitle: 'Wisdom • Time' },
  { theme: 'Wisdom', character: 'Maya', characterTr: 'Maya', title: 'Maya and the Empty Jar', titleTr: 'Maya ve Boş Kavanoz', ageRange: '4-7', moral: 'Boşluk da bir güzelliktir, doldurmayı bilene.', subtitle: 'Wisdom • Simplicity' },

  // === GİZEM (4 yeni) ===
  { theme: 'Mystery', character: 'Demir', characterTr: 'Demir', title: 'Demir and the Vanishing Footprints', titleTr: 'Demir ve Kaybolan Ayak İzleri', ageRange: '5-8', moral: 'Her gizem bir ders saklar.', subtitle: 'Mystery • Investigation' },
  { theme: 'Mystery', character: 'İrem', characterTr: 'İrem', title: 'İrem and the Whispering Walls', titleTr: 'İrem ve Fısıldayan Duvarlar', ageRange: '5-8', moral: 'Eski hikayeler dinleyeni bulur.', subtitle: 'Mystery • History' },
  { theme: 'Mystery', character: 'Burak', characterTr: 'Burak', title: 'Burak and the Lighthouse Secret', titleTr: 'Burak ve Deniz Fenerinin Sırrı', ageRange: '5-8', moral: 'Işık her zaman yol gösterir.', subtitle: 'Mystery • Truth' },
  { theme: 'Mystery', character: 'Dila', characterTr: 'Dila', title: 'Dila and the Midnight Library', titleTr: 'Dila ve Gece Yarısı Kütüphanesi', ageRange: '5-8', moral: 'Kitaplar kapıları açar.', subtitle: 'Mystery • Reading' },

  // === İYİLİK (5 yeni) ===
  { theme: 'Kindness', character: 'Ceyda', characterTr: 'Ceyda', title: 'Ceyda and the Rainy Day Gift', titleTr: 'Ceyda ve Yağmurlu Gün Hediyesi', ageRange: '3-6', moral: 'Küçük iyilikler büyük mutluluklar yaratır.', subtitle: 'Kindness • Giving' },
  { theme: 'Kindness', character: 'Emre', characterTr: 'Emre', title: 'Emre and the Forgotten Garden', titleTr: 'Emre ve Unutulmuş Bahçe', ageRange: '4-7', moral: 'İlgi gösterilen her şey çiçek açar.', subtitle: 'Kindness • Care' },
  { theme: 'Kindness', character: 'Hazal', characterTr: 'Hazal', title: 'Hazal and the Thank You Chain', titleTr: 'Hazal ve Teşekkür Zinciri', ageRange: '3-6', moral: 'Teşekkür etmek dünyayı güzelleştirir.', subtitle: 'Kindness • Gratitude' },
  { theme: 'Kindness', character: 'Çınar', characterTr: 'Çınar', title: 'Çınar and the Lost Puppy', titleTr: 'Çınar ve Kayıp Yavru Köpek', ageRange: '3-6', moral: 'Yardım eden el hiç boş kalmaz.', subtitle: 'Kindness • Compassion' },
  { theme: 'Kindness', character: 'Melis', characterTr: 'Melis', title: 'Melis and the Sharing Song', titleTr: 'Melis ve Paylaşma Şarkısı', ageRange: '3-6', moral: 'Paylaşılan neşe iki katına çıkar.', subtitle: 'Kindness • Joy' },

  // === HAYAL GÜCÜ (5 yeni) ===
  { theme: 'Wonder', character: 'Tuna', characterTr: 'Tuna', title: 'Tuna and the Paper Airplane', titleTr: 'Tuna ve Kağıt Uçak', ageRange: '3-6', moral: 'Hayal gücü kanatlardan güçlüdür.', subtitle: 'Wonder • Imagination' },
  { theme: 'Wonder', character: 'Peri', characterTr: 'Peri', title: 'Peri and the Painted Door', titleTr: 'Peri ve Boyalı Kapı', ageRange: '4-7', moral: 'Her kapı yeni bir dünyaya açılır.', subtitle: 'Wonder • Creativity' },
  { theme: 'Wonder', character: 'Atlas', characterTr: 'Atlas', title: 'Atlas and the Star Factory', titleTr: 'Atlas ve Yıldız Fabrikası', ageRange: '4-7', moral: 'Her çocuk bir yıldız yaratabilir.', subtitle: 'Wonder • Dreams' },
  { theme: 'Magic', character: 'Naz', characterTr: 'Naz', title: 'Naz and the Wishing Well', titleTr: 'Naz ve Dilek Kuyusu', ageRange: '3-6', moral: 'En güzel dilek başkası için dilenir.', subtitle: 'Magic • Wishes' },
  { theme: 'Magic', character: 'Yağız', characterTr: 'Yağız', title: 'Yağız and the Invisible Friend', titleTr: 'Yağız ve Görünmez Arkadaş', ageRange: '4-7', moral: 'Gerçek dostlar her zaman yanındadır.', subtitle: 'Magic • Friendship' },
];

const GEMINI_MODEL = 'gemini-2.5-flash';

async function generateStoryContent(plan) {
  const prompt = `You are a professional children's story writer. Write a bedtime story for children aged ${plan.ageRange}.

STORY DETAILS:
- Title (Turkish): ${plan.titleTr}
- Main character: ${plan.characterTr}
- Theme: ${plan.theme}
- Moral: ${plan.moral}

REQUIREMENTS:
1. Write BOTH English and Turkish versions
2. Each version should have exactly 10-14 paragraphs
3. Each paragraph should be 1-3 sentences
4. Use simple, warm language appropriate for children
5. The story should have: opening → invitation → journey → choice → climax → resolution → bedtime ending
6. Character name should be "${plan.characterTr}" in BOTH versions (Turkish name)
7. The moral should be woven naturally into the story, not stated explicitly
8. End with a cozy, sleepy feeling
9. Turkish version must be natural Turkish, not a direct translation
10. NO scary or violent content

RESPOND IN THIS EXACT JSON FORMAT:
{
  "content": ["paragraph1 in English", "paragraph2 in English", ...],
  "contentTr": ["paragraph1 in Turkish", "paragraph2 in Turkish", ...]
}

ONLY return valid JSON, nothing else.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No text in response');

  const parsed = JSON.parse(text);
  if (!parsed.content || !parsed.contentTr) throw new Error('Missing content/contentTr');
  if (!Array.isArray(parsed.content) || !Array.isArray(parsed.contentTr)) throw new Error('content/contentTr not arrays');

  return parsed;
}

async function main() {
  const outputPath = path.join(ROOT, 'scripts', 'prompt-output', 'generated-stories.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Resume from existing if available
  let results = [];
  if (fs.existsSync(outputPath)) {
    try {
      results = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      console.log(`📂 Resuming from ${results.length} existing stories`);
    } catch { results = []; }
  }

  const startId = 100; // Start from id 100 to avoid conflicts
  let generated = 0;
  let failed = 0;

  for (let i = 0; i < STORY_PLANS.length; i++) {
    const plan = STORY_PLANS[i];

    // Skip if already generated
    if (results.find(r => r.title === plan.title)) {
      console.log(`⏭️  [${i + 1}/${STORY_PLANS.length}] ${plan.titleTr} (already done)`);
      continue;
    }

    console.log(`🖊️  [${i + 1}/${STORY_PLANS.length}] ${plan.titleTr}...`);

    try {
      const storyContent = await generateStoryContent(plan);

      const story = {
        id: String(startId + i),
        title: plan.title,
        titleTr: plan.titleTr,
        subtitle: plan.subtitle,
        duration: `${Math.ceil(storyContent.content.length * 0.7)} min`,
        theme: plan.theme,
        coverUrl: `IMAGES.DEFAULT_COVER`,
        character: plan.characterTr,
        ageRange: plan.ageRange,
        moral: plan.moral,
        content: storyContent.content,
        contentTr: storyContent.contentTr,
      };

      results.push(story);
      generated++;

      // Save after each story (resume support)
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
      console.log(`✅ ${plan.titleTr} (${storyContent.content.length} EN + ${storyContent.contentTr.length} TR paragraphs)`);

      // Rate limit: 2 second delay
      await new Promise(r => setTimeout(r, 2000));

    } catch (err) {
      console.error(`❌ ${plan.titleTr}: ${err.message}`);
      failed++;
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log(`\n📊 Done: ${generated} generated, ${failed} failed, ${results.length} total`);
  console.log(`📄 Output: ${outputPath}`);
}

main().catch(console.error);
