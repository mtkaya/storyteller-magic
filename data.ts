import { Story, Badge, SubscriptionPlan, Language } from './types';

// Centralized Image Repository
export const IMAGES = {
  // Characters & Scenes
  FOX: '/images/cozy_foxes_fireplace.jpg',
  BEAR_COOKIES: '/images/bunny_bear_cookies.jpg',
  MAGIC_FOREST: '/images/forest_tea_party.jpg',
  FLYING_CARPET: '/images/flying_carpet_adventure.jpg',
  SLEEPING_CLOUD: '/images/sleeping_animals_moon.jpg',
  LIGHTHOUSE: '/images/sleepy_owl_bookshelf.jpg',
  DEEP_SEA: '/images/penguin_stage.jpg',
  MOUNTAIN: '/images/grateful_deer_oak.jpg',

  // New Themes from Visuals
  LION_MOON: '/images/brave_lion_cub.jpg',
  PILLOW_FIGHT: '/images/pillow_fight.jpg',
  MAGIC_CHEST: '/images/magic_treasure_chest.jpg',
  TURTLE_RABBIT: '/images/turtle_rabbit_garden.jpg',

  // UI Assets
  WAND_UI: '/images/magic_quill.jpg',
  MOON_RESULT: '/images/sleeping_moon.jpg',
  FOREST_HEADER: '/images/forest_tea_party.jpg',
  PROFILE: '/images/wise_owl_library.jpg',
  HERO_BG: '/images/magic_fairy_book.jpg',

  // =====================================================
  // USER'S CUSTOM STORY IMAGES - Local Files
  // Place images in: public/images/
  // =====================================================

  // 🐭 Detective Mouse - Büyüteçli fare
  DETECTIVE_MOUSE: '/images/detective_mouse.jpg',

  // 🦉 Uyuyan Baykuş - Kitaplıkta uyuyan baykuş  
  SLEEPY_OWL: '/images/sleepy_owl_bookshelf.jpg',

  // 🦉 Bilge Baykuş - Ağaç kütüphanesi
  WISE_OWL: '/images/wise_owl_library.jpg',

  // 🐱 Kedi + Hazine - Orman hazine sandığı
  TREASURE_KITTEN: '/images/treasure_kitten.jpg',

  // ✍️ Sihirli Tüy Kalem - Create Story için
  MAGIC_QUILL: '/images/magic_quill.jpg',

  // 🐰 Tavşan + Kuş Yuvada - Dostluk
  BUNNY_NEST: '/images/bunny_helps_bird.jpg',

  // 🦊 Orman Çay Partisi - Hayvanlar çay içiyor
  TEA_PARTY: '/images/forest_tea_party.jpg',

  // 🐺 Kurt ve Prenses - Ay ışığı kule
  WOLF_PRINCESS: '/images/wolf_princess_crown.jpg',

  // 🧞 Uçan Halı Macerası - Bulutların üstünde
  MAGIC_CARPET: '/images/flying_carpet_adventure.jpg',

  // 🐧 Penguen Sahne Gösterisi - Spotlight
  PENGUIN_SHOW: '/images/penguin_stage.jpg',

  // 🐢 Kaplumbağa ve Tavşan - Ay ışığı
  TURTLE_BUNNY: '/images/turtle_rabbit_garden.jpg',

  // ✨ Sihirli Sandık - Taç ve asa
  ENCHANTED_CHEST: '/images/magic_treasure_chest.jpg',

  // 📖 Sihirli Kitap - Yıldızlar çıkan kitap
  MAGIC_BOOK: '/images/magic_fairy_book.jpg',

  // 🦊 Şömine Tilki - Kitap okuyan tilki
  COZY_FOX: '/images/cozy_foxes_fireplace.jpg',

  // 🎉 Yastık Savaşı - Hayvanlar yastık savaşı
  PILLOW_BATTLE: '/images/pillow_fight.jpg',

  // 🧸 Kurabiyeli Dostlar - Tavşan ve ayı
  BEDTIME_COOKIES: '/images/bunny_bear_cookies.jpg',

  // 🦁 Cesur Aslan Yavrusu
  BRAVE_LION: '/images/brave_lion_cub.jpg',

  // 🦌 Şükran Geyiği
  GRATEFUL_DEER: '/images/grateful_deer_oak.jpg',

  // 🌙 Uyuyan Ay
  SLEEPING_MOON: '/images/sleeping_moon.jpg',

  // 🐾 Uyuyan Hayvanlar
  SLEEPING_ANIMALS: '/images/sleeping_animals_moon.jpg',

  // Additional local prompt-based illustrations
  ORNATE_MAGICAL_LANTERN: '/images/ornate_magical_lantern.jpg',
  BABY_BEAR_CLOUD_SLEEP: '/images/baby_bear_cloud_sleep.jpg',
  FRIENDLY_ROCKET_STARS: '/images/friendly_rocket_stars.jpg',
  MAGICAL_SEAHORSE_GLOW: '/images/magical_seahorse_glow.jpg',
  COZY_TREEHOUSE_NIGHT: '/images/cozy_treehouse_night.jpg',
  VINTAGE_MAGIC_COMPASS: '/images/vintage_magic_compass.jpg',
  HOT_AIR_BALLOON_STARS: '/images/hot_air_balloon_stars.jpg',
  FAIRY_CASTLE_MOONLIGHT: '/images/fairy_castle_moonlight.jpg',
  MAGICAL_TOWER_STARS: '/images/magical_tower_stars.jpg',
  SMILING_CRESCENT_MOON_STARS: '/images/smiling_crescent_moon_stars.jpg',
  COZY_LIGHTHOUSE_ISLAND: '/images/cozy_lighthouse_island.jpg',
  GENTLE_WHALE_NIGHTSKY: '/images/gentle_whale_nightsky.jpg',
  ENCHANTED_FOREST_GLOW: '/images/enchanted_forest_glow.jpg',
  ENCHANTED_OLD_TREE: '/images/enchanted_old_tree.jpg',
  MAGICAL_DANDELION_WISH: '/images/magical_dandelion_wish.jpg',
  SERENE_LOTUS_MOONWATER: '/images/serene_lotus_moonwater.jpg',

  // Fallback URLs for stories (using existing URLs until images are added)
  MOONLIGHT_LION: '/images/brave_lion_cub.jpg',
  SLEEPY_OWL_BOOKSHELF: '/images/sleepy_owl_bookshelf.jpg',
  WISE_OWL_LIBRARY: '/images/wise_owl_library.jpg'
};

type VaultSeed = {
  key: string;
  theme: string;
  characterEn: string;
  characterTr: string;
  companionEn: string;
  companionTr: string;
  placeEn: string;
  placeTr: string;
  questEn: string;
  questTr: string;
  moralEn: string;
  moralTr: string;
  coverUrl: string;
};

const VAULT_THEME_TR: Record<string, string> = {
  Adventure: 'Macera',
  Friendship: 'Dostluk',
  Magic: 'Sihir',
  Nature: 'Doğa',
  Calm: 'Sakinlik',
  Courage: 'Cesaret',
  Wisdom: 'Bilgelik',
  Mystery: 'Gizem',
  Family: 'Aile',
  Wonder: 'Hayranlık',
  Kindness: 'İyilik',
};

const VAULT_SEEDS: VaultSeed[] = [
  {
    key: 'moon-trail',
    theme: 'Adventure',
    characterEn: 'Ari',
    characterTr: 'Ari',
    companionEn: 'Miko the fox',
    companionTr: 'tilki Miko',
    placeEn: 'the moonlit trail',
    placeTr: 'ay ışıklı patika',
    questEn: 'find the silver bridge before bedtime',
    questTr: 'uyku vakti gelmeden gümüş köprüyü bulmak',
    moralEn: 'Small brave steps can lead to beautiful places.',
    moralTr: 'Küçük cesur adımlar, güzel yerlere götürür.',
    coverUrl: IMAGES.FLYING_CARPET,
  },
  {
    key: 'tea-garden',
    theme: 'Friendship',
    characterEn: 'Nora',
    characterTr: 'Nora',
    companionEn: 'Pip the rabbit',
    companionTr: 'tavşan Pip',
    placeEn: 'the glow-tea garden',
    placeTr: 'ışıklı çay bahçesi',
    questEn: 'prepare a welcome table for new friends',
    questTr: 'yeni dostlar için bir karşılama masası hazırlamak',
    moralEn: 'Sharing small moments makes friendships stronger.',
    moralTr: 'Küçük anları paylaşmak dostlukları güçlendirir.',
    coverUrl: IMAGES.TEA_PARTY,
  },
  {
    key: 'lantern-valley',
    theme: 'Magic',
    characterEn: 'Luna',
    characterTr: 'Luna',
    companionEn: 'Zephyr the carpet',
    companionTr: 'sihirli halı Zephyr',
    placeEn: 'the lantern valley',
    placeTr: 'fener vadisi',
    questEn: 'wake the sleeping lights with kindness',
    questTr: 'uyuyan ışıkları iyilikle uyandırmak',
    moralEn: 'The warmest magic comes from a kind heart.',
    moralTr: 'En sıcak sihir, iyi kalpten gelir.',
    coverUrl: IMAGES.ORNATE_MAGICAL_LANTERN,
  },
  {
    key: 'river-song',
    theme: 'Nature',
    characterEn: 'Mina',
    characterTr: 'Mina',
    companionEn: 'Rio the otter',
    companionTr: 'su samuru Rio',
    placeEn: 'the whispering river',
    placeTr: 'fısıldayan nehir',
    questEn: 'help lost hatchlings follow the current home',
    questTr: 'kaybolan yavruların akıntıyı izleyip eve dönmesine yardım etmek',
    moralEn: 'Gentle guidance can carry others safely home.',
    moralTr: 'Nazik rehberlik, başkalarını güvenle eve taşır.',
    coverUrl: IMAGES.MAGICAL_SEAHORSE_GLOW,
  },
  {
    key: 'cloud-blanket',
    theme: 'Calm',
    characterEn: 'Bobo',
    characterTr: 'Bobo',
    companionEn: 'Nia the owl',
    companionTr: 'baykuş Nia',
    placeEn: 'the cloud blanket field',
    placeTr: 'bulut battaniye tarlası',
    questEn: 'collect soft breaths for a sleepy village',
    questTr: 'uykulu köy için yumuşak nefesler toplamak',
    moralEn: 'A slow breath can calm a busy heart.',
    moralTr: 'Yavaş bir nefes, telaşlı kalbi sakinleştirir.',
    coverUrl: IMAGES.BABY_BEAR_CLOUD_SLEEP,
  },
  {
    key: 'brave-hill',
    theme: 'Courage',
    characterEn: 'Leo',
    characterTr: 'Leo',
    companionEn: 'Penny the penguin',
    companionTr: 'penguen Penny',
    placeEn: 'the starlit hill',
    placeTr: 'yıldızlı tepe',
    questEn: 'cross the echo cave to help a tiny friend',
    questTr: 'minik bir dosta yardım etmek için yankı mağarasını geçmek',
    moralEn: 'Bravery means helping even when you feel nervous.',
    moralTr: 'Cesaret, heyecanlıyken bile yardım edebilmektir.',
    coverUrl: IMAGES.BRAVE_LION,
  },
  {
    key: 'owl-library',
    theme: 'Wisdom',
    characterEn: 'Oliver',
    characterTr: 'Oliver',
    companionEn: 'Professor Hoot',
    companionTr: 'Profesör Hoot',
    placeEn: 'the tree library',
    placeTr: 'ağaç kütüphanesi',
    questEn: 'find the right question hidden in old books',
    questTr: 'eski kitaplarda saklı doğru soruyu bulmak',
    moralEn: 'Wisdom grows when we keep asking and listening.',
    moralTr: 'Bilgelik, sormaya ve dinlemeye devam ettikçe büyür.',
    coverUrl: IMAGES.WISE_OWL,
  },
  {
    key: 'secret-map',
    theme: 'Mystery',
    characterEn: 'Milo',
    characterTr: 'Milo',
    companionEn: 'Rosie the robin',
    companionTr: 'kızılgerdan Rosie',
    placeEn: 'the hidden attic',
    placeTr: 'gizli çatı katı',
    questEn: 'follow clues to return a missing keepsake',
    questTr: 'kayıp hatıra eşyasını geri vermek için ipuçlarını takip etmek',
    moralEn: 'Careful observation turns mysteries into answers.',
    moralTr: 'Dikkatli gözlem, gizemleri cevaba dönüştürür.',
    coverUrl: IMAGES.DETECTIVE_MOUSE,
  },
  {
    key: 'home-light',
    theme: 'Family',
    characterEn: 'Nora',
    characterTr: 'Nora',
    companionEn: 'Taro the beaver',
    companionTr: 'kunduz Taro',
    placeEn: 'the little lighthouse island',
    placeTr: 'küçük deniz feneri adası',
    questEn: 'keep the harbor light steady through the fog',
    questTr: 'sisli gecede liman ışığını sabit tutmak',
    moralEn: 'Steady care helps everyone feel safe.',
    moralTr: 'Sürekli özen, herkese güven verir.',
    coverUrl: IMAGES.COZY_LIGHTHOUSE_ISLAND,
  },
  {
    key: 'comet-garden',
    theme: 'Wonder',
    characterEn: 'Pebble',
    characterTr: 'Pebble',
    companionEn: 'Lumo the star friend',
    companionTr: 'yıldız dostu Lumo',
    placeEn: 'the comet garden',
    placeTr: 'kuyruklu yıldız bahçesi',
    questEn: 'plant wishes that glow across the night',
    questTr: 'geceye yayılan parlayan dilekler ekmek',
    moralEn: 'Wonder grows when curiosity meets kindness.',
    moralTr: 'Hayranlık, merak ile iyilik buluşunca büyür.',
    coverUrl: IMAGES.FRIENDLY_ROCKET_STARS,
  },
  {
    key: 'kind-wish',
    theme: 'Kindness',
    characterEn: 'Pip',
    characterTr: 'Pip',
    companionEn: 'Flora the fox',
    companionTr: 'tilki Flora',
    placeEn: 'the firefly meadow',
    placeTr: 'ateşböceği çayırı',
    questEn: 'choose a wish that helps more than one heart',
    questTr: 'birden fazla kalbe iyi gelecek bir dilek seçmek',
    moralEn: 'Kind choices shine longer than quick rewards.',
    moralTr: 'İyi seçimler, hızlı ödüllerden daha uzun parlar.',
    coverUrl: IMAGES.MAGICAL_DANDELION_WISH,
  },
  {
    key: 'berry-bridge',
    theme: 'Friendship',
    characterEn: 'Kira',
    characterTr: 'Kira',
    companionEn: 'squirrel Mops',
    companionTr: 'sincap Mops',
    placeEn: 'the berry bridge market',
    placeTr: 'meyveli köprü pazarı',
    questEn: 'deliver the birthday basket before the market closes',
    questTr: 'pazar kapanmadan doğum günü sepetini teslim etmek',
    moralEn: 'Small errands done with care become big gifts.',
    moralTr: 'Özenle yapılan küçük işler, büyük hediyeye dönüşür.',
    coverUrl: IMAGES.TURTLE_RABBIT,
  },
  {
    key: 'sage-cave',
    theme: 'Mystery',
    characterEn: 'Finn',
    characterTr: 'Finn',
    companionEn: 'wren Maya',
    companionTr: 'çalıkuşu Maya',
    placeEn: 'the echo cave',
    placeTr: 'yankı mağarası',
    questEn: 'return the missing sound stone to the cave guardian',
    questTr: 'kayıp ses taşını mağara bekçisine iade etmek',
    moralEn: 'Every lost thing waits quietly for the right finder.',
    moralTr: 'Her kayıp şey, doğru bulucu için sessizce bekler.',
    coverUrl: IMAGES.ENCHANTED_OLD_TREE,
  },
  {
    key: 'moon-dock',
    theme: 'Wonder',
    characterEn: 'Reef',
    characterTr: 'Reef',
    companionEn: 'dolphin Bly',
    companionTr: 'yunus Bly',
    placeEn: 'the moon dock',
    placeTr: 'ay iskelesi',
    questEn: 'light the welcome lanterns before the tide turns',
    questTr: 'gelgit dönmeden karşılama fenerlerini yakmak',
    moralEn: 'A small light in the right place can guide many.',
    moralTr: 'Doğru yerdeki küçük bir ışık, pek çoğuna rehberlik eder.',
    coverUrl: IMAGES.GENTLE_WHALE_NIGHTSKY,
  },
];

const VAULT_TITLE_PREFIX_EN = ['Moonlit', 'Gentle', 'Quiet', 'Golden', 'Twinkling', 'Brave', 'Kind', 'Cozy'];
const VAULT_TITLE_PREFIX_TR = ['Ay Işıklı', 'Nazik', 'Sessiz', 'Altın', 'Yıldızlı', 'Cesur', 'İyi Kalpli', 'Sıcacık'];
const VAULT_TITLE_SUFFIX_EN = ['Journey', 'Promise', 'Secret', 'Path', 'Song', 'Lantern', 'Bridge', 'Garden'];
const VAULT_TITLE_SUFFIX_TR = ['Yolculuk', 'Söz', 'Sır', 'Patika', 'Şarkı', 'Fener', 'Köprü', 'Bahçe'];
const VAULT_TONE_HINT_EN = ['calmly', 'carefully', 'joyfully', 'patiently', 'kindly'];
const VAULT_TONE_HINT_TR = ['sakince', 'dikkatle', 'neşeyle', 'sabırla', 'nazikçe'];
const VAULT_ENDING_EN = ['safe and proud', 'warm and grateful', 'ready for sweet dreams'];
const VAULT_ENDING_TR = ['güvende ve gururlu', 'sıcacık ve minnettar', 'tatlı rüyalara hazır'];
const VAULT_MINUTES = [6, 7, 8, 9, 10, 11, 12];

const pickVaultValue = <T,>(values: T[], index: number): T => values[index % values.length];
const padVaultId = (index: number): string => String(index + 1).padStart(3, '0');

function buildVaultLinearStory(seed: VaultSeed, index: number): Story {
  const id = `vault_linear_${padVaultId(index)}`;
  const minutes = pickVaultValue(VAULT_MINUTES, index + 2);
  const prefixEn = pickVaultValue(VAULT_TITLE_PREFIX_EN, index + seed.key.length);
  const prefixTr = pickVaultValue(VAULT_TITLE_PREFIX_TR, index + seed.key.length);
  const suffixEn = pickVaultValue(VAULT_TITLE_SUFFIX_EN, index * 2 + seed.key.length);
  const suffixTr = pickVaultValue(VAULT_TITLE_SUFFIX_TR, index * 2 + seed.key.length);
  const toneEn = pickVaultValue(VAULT_TONE_HINT_EN, index + 1);
  const toneTr = pickVaultValue(VAULT_TONE_HINT_TR, index + 1);
  const endingEn = pickVaultValue(VAULT_ENDING_EN, index + 3);
  const endingTr = pickVaultValue(VAULT_ENDING_TR, index + 3);
  const themeTr = VAULT_THEME_TR[seed.theme] || 'Diğer';

  return {
    id,
    title: `${prefixEn} ${seed.characterEn} ${suffixEn}`,
    titleTr: `${prefixTr} ${seed.characterTr} ${suffixTr}`,
    subtitle: `${seed.theme} • Bedtime Tale`,
    subtitleTr: `${themeTr} • Uyku Masalı`,
    duration: `${minutes} min`,
    theme: seed.theme,
    coverUrl: seed.coverUrl,
    character: seed.characterEn,
    ageRange: minutes <= 7 ? '3-6' : '4-8',
    moral: seed.moralEn,
    moralTr: seed.moralTr,
    content: [
      `${seed.characterEn} entered ${seed.placeEn} one calm evening, while tiny stars blinked above.`,
      `${seed.companionEn} asked for help to ${seed.questEn}, and ${seed.characterEn} said yes ${toneEn}.`,
      `Together they followed small clues, helping each friend they met along the way.`,
      `When a tricky moment appeared, they paused, listened, and chose a gentle solution.`,
      `Soon the path became brighter, and the whole place felt lighter than before.`,
      `By bedtime, they returned home ${endingEn}, carrying a new lesson in their hearts.`,
    ],
    contentTr: [
      `${seed.characterTr}, minik yıldızların parladığı sakin bir akşam ${seed.placeTr} içine adım attı.`,
      `${seed.companionTr}, ${seed.questTr} için yardım istedi; ${seed.characterTr} ise ${toneTr} kabul etti.`,
      `Yolda karşılaştıkları her dosta yardım ederek küçük ipuçlarını birlikte takip ettiler.`,
      `Zor bir an geldiğinde durup dinlediler ve nazik bir çözüm seçtiler.`,
      `Kısa süre sonra yollar aydınlandı, ortam eskisinden daha huzurlu oldu.`,
      `Uyku vakti geldiğinde ${endingTr} eve döndüler; kalplerinde yeni bir ders vardı.`,
    ],
  };
}

function buildVaultInteractiveStory(seed: VaultSeed, index: number): Story {
  const storyId = `vault_interactive_${padVaultId(index)}`;
  const key = `vi_${padVaultId(index)}`;
  const themeTr = VAULT_THEME_TR[seed.theme] || 'Diğer';
  const minutes = pickVaultValue(VAULT_MINUTES, index + 4) + 1;

  const startId = `${key}_start`;
  const heartId = `${key}_heart_path`;
  const cleverId = `${key}_clever_path`;
  const helperId = `${key}_helper_path`;
  const happyEndId = `${key}_ending_happy`;
  const lessonEndId = `${key}_ending_lesson`;
  const adventureEndId = `${key}_ending_adventure`;

  return {
    id: storyId,
    title: `${seed.characterEn} and the ${pickVaultValue(VAULT_TITLE_SUFFIX_EN, index + 5)}`,
    titleTr: `${seed.characterTr} ve ${pickVaultValue(VAULT_TITLE_SUFFIX_TR, index + 5)}`,
    subtitle: `Interactive Story • ${seed.theme}`,
    subtitleTr: `Seçimli Hikaye • ${themeTr}`,
    duration: `${minutes}+ min`,
    theme: seed.theme,
    coverUrl: seed.coverUrl,
    character: seed.characterEn,
    ageRange: '4-9',
    moral: seed.moralEn,
    moralTr: seed.moralTr,
    isInteractive: true,
    startBranchId: startId,
    branches: [
      {
        id: startId,
        paragraphs: [
          `${seed.characterEn} and ${seed.companionEn} reached ${seed.placeEn} and found a glowing sign.`,
          `The sign asked them to ${seed.questEn}, but the path split into three choices.`,
          `Each choice looked possible, and each one could help someone different.`,
          `Which path should they choose first?`,
        ],
        paragraphsTr: [
          `${seed.characterTr} ve ${seed.companionTr}, ${seed.placeTr} içinde parlayan bir işaret buldu.`,
          `İşaret onlardan ${seed.questTr} istiyordu; fakat yol üç seçeneğe ayrılıyordu.`,
          `Her seçenek mümkün görünüyordu ve her biri farklı birine yardım edebilirdi.`,
          `Önce hangi yolu seçmeliler?`,
        ],
        choices: [
          {
            id: `${key}_choice_heart`,
            text: 'Choose the kind path',
            textTr: 'Nazik yolu seç',
            emoji: '💛',
            nextBranchId: heartId,
            consequence: 'Stop to help the worried friend before crossing.',
            consequenceTr: 'Köprüden önce endişeli dosta yardım et.',
          },
          {
            id: `${key}_choice_clever`,
            text: 'Choose the clever path',
            textTr: 'Akıllı yolu seç',
            emoji: '🧩',
            nextBranchId: cleverId,
            consequence: 'Read the signs and solve the route step by step.',
            consequenceTr: 'İşaretleri okuyup rotayı adım adım çöz.',
          },
          {
            id: `${key}_choice_helper`,
            text: 'Choose the team path',
            textTr: 'Takım yolunu seç',
            emoji: '🤝',
            nextBranchId: helperId,
            consequence: 'Gather small helpers and split the tasks.',
            consequenceTr: 'Küçük yardımcıları toplayıp işleri paylaştır.',
          },
        ],
      },
      {
        id: heartId,
        paragraphs: [
          `${seed.characterEn} stopped when a small, worried creature blocked the way — it had lost the one thing needed to ${seed.questEn}.`,
          `Listening carefully, ${seed.characterEn} spotted a quiet corner of ${seed.placeEn} where that missing thing might still be hidden.`,
          `There was not much time. Should they search for it together, or leave a clear marker and press on?`,
        ],
        paragraphsTr: [
          `${seed.characterTr} durdu; yolu küçük, endişeli bir yaratık kesmişti — ${seed.questTr} için gereken tek şeyi kaybetmişti.`,
          `Dikkatlice dinleyince ${seed.characterTr}, ${seed.placeTr}'nin sessiz bir köşesinde o kayıp şeyin hâlâ saklı olabileceğini fark etti.`,
          `Vakit azdı. Birlikte mi aramalılar, yoksa bir işaret bırakıp yola mı devam etmeliler?`,
        ],
        choices: [
          {
            id: `${key}_heart_to_happy`,
            text: 'Search together',
            textTr: 'Birlikte ara',
            emoji: '🔦',
            nextBranchId: happyEndId,
            consequence: 'Find it together and continue with a grateful companion.',
            consequenceTr: 'Birlikte bulup minnettar bir dostla yola devam et.',
          },
          {
            id: `${key}_heart_to_lesson`,
            text: 'Leave a marker and go on',
            textTr: 'İşaret bırak ve devam et',
            emoji: '🕯️',
            nextBranchId: lessonEndId,
            consequence: 'The marker guides others; the mission still gets done.',
            consequenceTr: 'İşaret başkalarına yol gösterir; görev yine de tamamlanır.',
          },
        ],
      },
      {
        id: cleverId,
        paragraphs: [
          `${seed.characterEn} noticed three small clues left behind in ${seed.placeEn} — each pointing in a different direction.`,
          `${seed.companionEn} read the first two quickly, but the third was faded and hard to make out.`,
          `Should they pause to decode it fully, or trust the first two clues and move with confidence?`,
        ],
        paragraphsTr: [
          `${seed.characterTr}, ${seed.placeTr}'de bırakılmış üç küçük ipucu fark etti — her biri farklı bir yönü işaret ediyordu.`,
          `${seed.companionTr} ilk ikisini hızla okudu; fakat üçüncüsü solmuş ve zor okunuyordu.`,
          `Onu tam olarak çözmek için mi durmalılar, yoksa ilk iki ipucuna güvenip emin adımlarla ilerlemelidir?`,
        ],
        choices: [
          {
            id: `${key}_clever_to_adventure`,
            text: 'Trust two clues and move',
            textTr: 'İki ipucuna güven ve ilerle',
            emoji: '🚀',
            nextBranchId: adventureEndId,
            consequence: 'Quick and bold — the path opens up ahead.',
            consequenceTr: 'Hızlı ve cesur — yol önlerinde açılır.',
          },
          {
            id: `${key}_clever_to_lesson`,
            text: 'Decode the third clue first',
            textTr: 'Önce üçüncü ipucunu çöz',
            emoji: '🔍',
            nextBranchId: lessonEndId,
            consequence: 'Patience reveals the safest, most complete answer.',
            consequenceTr: 'Sabır, en güvenli ve eksiksiz cevabı ortaya çıkarır.',
          },
        ],
      },
      {
        id: helperId,
        paragraphs: [
          `${seed.characterEn} called out and three nearby friends arrived, each carrying something that could help with ${seed.questEn}.`,
          `Together they had everything they needed — but a tired stranger appeared at the edge of ${seed.placeEn}, hoping for directions.`,
          `Should they stay a little longer to help the stranger, or begin the mission right away?`,
        ],
        paragraphsTr: [
          `${seed.characterTr} seslendi ve yakındaki üç dost geldi; her biri ${seed.questTr} için işe yarayabilecek bir şey taşıyordu.`,
          `Artık ihtiyaçları olan her şeye sahiplerdi — fakat yorgun bir yabancı yol tarifi umarak ${seed.placeTr}'nin kenarında belirdi.`,
          `Yabancıya yardım etmek için biraz daha mı beklesinler, yoksa göreve hemen mi başlasınlar?`,
        ],
        choices: [
          {
            id: `${key}_helper_to_happy`,
            text: 'Help the stranger first',
            textTr: 'Önce yabancıya yardım et',
            emoji: '🤲',
            nextBranchId: happyEndId,
            consequence: 'A small delay, a lasting kindness — then the mission succeeds.',
            consequenceTr: 'Küçük bir gecikme, kalıcı bir iyilik — sonra görev tamamlanır.',
          },
          {
            id: `${key}_helper_to_adventure`,
            text: 'Start the mission now',
            textTr: 'Göreve hemen başla',
            emoji: '🎉',
            nextBranchId: adventureEndId,
            consequence: 'Full focus on the task — the team finishes strong.',
            consequenceTr: 'Göreve tam odaklanma — takım güçlü bir şekilde tamamlar.',
          },
        ],
      },
      {
        id: happyEndId,
        paragraphs: [
          `By choosing with kindness, everyone reached the final gate with smiles.`,
          `${seed.characterEn} completed the mission and shared the success with every friend.`,
          `The night ended warm and peaceful, perfect for sweet dreams.`,
        ],
        paragraphsTr: [
          `Nazik seçimleri sayesinde herkes son kapıya gülümseyerek ulaştı.`,
          `${seed.characterTr}, görevi tamamladı ve başarıyı tüm dostlarıyla paylaştı.`,
          `Gece sıcacık ve huzurlu bitti; tatlı rüyalar için mükemmeldi.`,
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Warm Finish',
        endingTitleTr: 'Sıcak Final',
      },
      {
        id: lessonEndId,
        paragraphs: [
          `They moved slowly, listened carefully, and helped others before rushing ahead.`,
          `The mission took longer, but everyone felt safer and more confident.`,
          `${seed.characterEn} learned that patience can be the strongest magic.`,
        ],
        paragraphsTr: [
          `Acele etmeden ilerleyip dikkatle dinlediler; hızdan önce yardımı seçtiler.`,
          `Görev biraz uzun sürdü ama herkes kendini daha güvende ve güçlü hissetti.`,
          `${seed.characterTr}, sabrın en güçlü sihir olabileceğini öğrendi.`,
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The Patient Choice',
        endingTitleTr: 'Sabırlı Seçim',
      },
      {
        id: adventureEndId,
        paragraphs: [
          `A final surprise path opened and led them to a glowing overlook above the valley.`,
          `From there, they could see every place they had helped along the journey.`,
          `They promised to return for another kind adventure tomorrow night.`,
        ],
        paragraphsTr: [
          `Son bir sürpriz yol açıldı ve onları vadinin üstündeki parlayan seyir noktasına götürdü.`,
          `Buradan yol boyunca yardım ettikleri tüm yerleri bir arada görebildiler.`,
          `Yarın gece yeni bir iyilik macerası için geri dönmeye söz verdiler.`,
        ],
        isEnding: true,
        endingType: 'adventure',
        endingTitle: 'The Extra Mile',
        endingTitleTr: 'Ekstra Yol',
      },
    ],
  };
}

const VAULT_LINEAR_STORIES: Story[] = Array.from({ length: 96 }, (_, index) =>
  buildVaultLinearStory(pickVaultValue(VAULT_SEEDS, index), index)
);

const VAULT_INTERACTIVE_STORIES: Story[] = VAULT_SEEDS.map((seed, index) =>
  buildVaultInteractiveStory(seed, index)
);

export const RECENT_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Brave Lion Cub',
    subtitle: '10 min listen',
    duration: '10 min',
    theme: 'Courage',
    coverUrl: IMAGES.LION_MOON
  },
  {
    id: '2',
    title: 'Space Voyager',
    subtitle: '15 min listen',
    duration: '15 min',
    theme: 'Adventure',
    coverUrl: IMAGES.FLYING_CARPET
  },
  {
    id: '3',
    title: 'The Magic Forest',
    subtitle: '8 min listen',
    duration: '8 min',
    theme: 'Nature',
    coverUrl: IMAGES.MAGIC_FOREST
  }
];

export const LIBRARY_STORIES: Story[] = [
  {
    id: '4',
    title: 'The Cookie Mystery',
    subtitle: 'Friendship • Funny',
    duration: '7 min',
    theme: 'Friendship',
    coverUrl: IMAGES.BEAR_COOKIES
  },
  {
    id: '5',
    title: 'Deep Sea Dreams',
    subtitle: 'Wonder • Ocean',
    duration: '9 min',
    theme: 'Nature',
    coverUrl: IMAGES.DEEP_SEA
  },
  {
    id: '6',
    title: 'Cloud Castle',
    subtitle: 'Sleep • Calm',
    duration: '12 min',
    theme: 'Calm',
    coverUrl: IMAGES.SLEEPING_CLOUD
  },
  {
    id: '7',
    title: 'Lighthouse Keeper',
    subtitle: 'Safety • Home',
    duration: '11 min',
    theme: 'Family',
    coverUrl: IMAGES.LIGHTHOUSE
  },
  {
    id: '8',
    title: 'The Feather Storm',
    subtitle: 'Fun • Play',
    duration: '5 min',
    theme: 'Friendship',
    coverUrl: IMAGES.PILLOW_FIGHT
  },
  {
    id: '9',
    title: 'The Secret Attic',
    subtitle: 'Mystery • Discovery',
    duration: '14 min',
    theme: 'Wonder',
    coverUrl: IMAGES.MAGIC_CHEST
  },
  {
    id: '10',
    title: 'Slow & Steady',
    subtitle: 'Wisdom • Patience',
    duration: '8 min',
    theme: 'Nature',
    coverUrl: IMAGES.TURTLE_RABBIT
  },
  {
    id: '11',
    title: 'The Wizard\'s Quill',
    subtitle: 'Magic • Creation',
    duration: '10 min',
    theme: 'Magic',
    coverUrl: IMAGES.WAND_UI
  },
  {
    id: '12',
    title: 'Goodnight Moon',
    subtitle: 'Sleep • Dreams',
    duration: '6 min',
    theme: 'Calm',
    coverUrl: IMAGES.MOON_RESULT
  },
  {
    id: '13',
    title: 'The Autumn Fox',
    subtitle: 'Seasons • Change',
    duration: '9 min',
    theme: 'Nature',
    coverUrl: IMAGES.FOX
  },
  // New Stories with Full Content
  {
    id: '14',
    title: 'Detective Mouse',
    subtitle: 'Mystery • Curiosity',
    duration: '8 min',
    theme: 'Mystery',
    coverUrl: IMAGES.DETECTIVE_MOUSE,
    character: 'Milo the Mouse',
    ageRange: '4-7',
    moral: 'Curiosity and careful observation can solve any mystery.',
    content: [
      "In a cozy little hole beneath the old oak tree, there lived a clever mouse named Milo. Unlike other mice who only thought about cheese, Milo dreamed of solving mysteries.",
      "One sunny morning, Milo put on his favorite brown coat and his special detective hat. He grabbed his trusty magnifying glass — a gift from his grandmother.",
      "\"Today feels like a mystery day!\" Milo squeaked excitedly as he stepped outside.",
      "Just then, his friend Rosie the Robin landed nearby. \"Milo! Someone took my shiny blue button! It was right on my nest, and now it's gone!\"",
      "Milo's whiskers twitched with excitement. \"Don't worry, Rosie! Detective Milo is on the case!\"",
      "He examined Rosie's nest carefully with his magnifying glass. \"Aha! I see tiny scratches on this branch... and look — a trail of sparkly dust!\"",
      "Following the glittery trail, Milo crept through the garden, past the sunflowers, and around the old stone wall.",
      "The trail led to a small burrow. Milo peeked inside and found a young magpie surrounded by shiny objects — buttons, coins, and pretty stones!",
      "\"Oh dear!\" chirped the magpie. \"I'm sorry! Shiny things are just so beautiful. I couldn't help myself.\"",
      "Milo smiled kindly. \"I understand you love pretty things, but these belong to others. How about we return them, and I'll help you find shiny things that nobody owns?\"",
      "The magpie's eyes lit up. Together, they returned Rosie's button and all the other treasures to their owners.",
      "That evening, as fireflies danced in the twilight, Milo taught the magpie how to find beautiful pebbles by the stream.",
      "\"Thank you, Detective Milo,\" the magpie said. \"You didn't just solve the mystery — you helped me find a better way.\"",
      "Milo tipped his hat and smiled. Another mystery solved, and a new friend made. What a perfect day!"
    ]
  },
  {
    id: '15',
    title: 'The Brave Lion Cub',
    subtitle: 'Courage • Dreams',
    duration: '10 min',
    theme: 'Courage',
    coverUrl: IMAGES.MOONLIGHT_LION,
    character: 'Leo the Lion Cub',
    ageRange: '3-6',
    moral: 'True bravery is not about being fearless, but about facing your fears with a kind heart.',
    content: [
      "High on a grassy hill, under a sky full of twinkling stars, a little lion cub named Leo sat watching the moon rise.",
      "Leo was the smallest cub in his family, with the softest golden fur and the biggest, dreamiest eyes.",
      "\"Someday,\" Leo whispered to the moon, \"I want to be as brave as the great lions in the stories.\"",
      "His mother padded softly up the hill and sat beside him. \"What makes you think you're not brave already, little one?\"",
      "\"I'm scared of thunderstorms,\" Leo admitted. \"And the dark cave by the waterfall. And sometimes... I'm scared I'm too small.\"",
      "His mother nuzzled him gently. \"Let me tell you a secret. Your grandfather, the bravest lion I ever knew, was also afraid of storms when he was your age.\"",
      "\"Really?\" Leo's eyes grew wide.",
      "\"Really. But he learned that being brave doesn't mean you're never scared. It means you keep going, even when you are.\"",
      "Just then, a tiny cry echoed from below the hill. Leo's ears perked up. \"What was that?\"",
      "They found a baby rabbit, shivering and lost, separated from its family.",
      "Leo's heart pounded. The rabbit was near the dark cave — the one that scared him most.",
      "But looking at the frightened little rabbit, Leo felt something warm grow inside his chest. This little one needed help.",
      "\"Don't worry,\" Leo said, his voice trembling just a little. \"I'll help you.\"",
      "Step by step, Leo guided the rabbit past the shadowy cave. His paws shook, but he kept walking.",
      "When they found the rabbit's family, the mother rabbit thanked Leo with tears in her eyes. \"You're so brave, little lion!\"",
      "Walking back up the hill, Leo felt taller somehow. The moon seemed to smile down at him.",
      "\"You did it,\" his mother said proudly. \"You faced your fear to help someone else. That's the truest kind of brave.\"",
      "Leo curled up beside his mother, the stars dancing above. Tonight, he didn't feel so small anymore.",
      "And somewhere in his dreams, he roared — not a loud, scary roar, but a roar of kindness, echoing across the moonlit savanna."
    ]
  },
  {
    id: '16',
    title: 'The Sleepy Owl\'s Library',
    subtitle: 'Dreams • Bedtime',
    duration: '7 min',
    theme: 'Calm',
    coverUrl: IMAGES.SLEEPY_OWL_BOOKSHELF,
    character: 'Oliver the Owl',
    ageRange: '2-5',
    moral: 'Dreams are the stories our hearts tell when we sleep.',
    content: [
      "In a cozy corner of an old wooden bookshelf, nestled between dusty books and forgotten treasures, lived a fluffy little owl named Oliver.",
      "Oliver wasn't like other owls who stayed awake all night. He loved to sleep — especially when the moon rose high in the purple sky.",
      "Every evening, as the sun painted the sky in shades of lavender and gold, Oliver would yawn a big, fluffy yawn.",
      "\"Time for dreams,\" he would coo softly, fluffing up his feathers like a little cloud.",
      "Through the window, the moon would peek in, casting a gentle silver glow across the room.",
      "\"Goodnight, moon,\" Oliver would whisper. \"Watch over my dreams tonight.\"",
      "And the moon, so round and kind, seemed to whisper back, \"Always, little owl. Always.\"",
      "As Oliver's eyes grew heavy, he would think of all the wonderful things — the smell of old books, the warmth of his nest, the soft sounds of the night.",
      "In his dreams, Oliver would fly over mountains made of pillows and seas of starlight.",
      "He would meet friendly clouds who told stories of faraway lands and dancing northern lights.",
      "Sometimes, he dreamed of a great library in the sky, where every book ever written floated on gentle breezes.",
      "But his favorite dreams were the simple ones — snuggling in his cozy corner, safe and warm, while the world slept peacefully.",
      "\"Dreams are magic,\" Oliver thought as sleep wrapped around him like a soft blanket.",
      "\"They're the stories our hearts tell when our eyes are closed.\"",
      "And so, with the moon keeping watch and the stars twinkling their lullaby, Oliver drifted off into the sweetest, softest sleep.",
      "Goodnight, little owl. Goodnight, little one. May your dreams be as cozy as Oliver's bookshelf tonight."
    ]
  },
  {
    id: '17',
    title: 'Whiskers and the Golden Treasure',
    subtitle: 'Adventure • Kindness',
    duration: '9 min',
    theme: 'Adventure',
    coverUrl: IMAGES.TREASURE_KITTEN,
    character: 'Whiskers the Kitten',
    ageRange: '4-7',
    moral: 'The greatest treasures are the friends we make along the way.',
    content: [
      "Deep in the heart of the Enchanted Forest, where flowers glowed and streams sang lullabies, a curious little kitten named Whiskers discovered something magical.",
      "Whiskers had the softest gray fur with tiny stripes and the biggest, greenest eyes you ever saw.",
      "One misty morning, while chasing a golden butterfly, she tumbled through a curtain of vines and found herself in a hidden grove.",
      "There, beneath an ancient tree with roots that sparkled like silver, sat an old treasure chest, glowing with warm, golden light.",
      "\"Wow!\" Whiskers gasped, her little tail puffing up with excitement. \"A real treasure chest!\"",
      "She crept closer, her paws barely making a sound on the mossy ground.",
      "But just as she reached for the lid, a tiny voice squeaked, \"Please don't take it!\"",
      "Whiskers looked around and saw a small forest sprite, no bigger than her paw, with wings like dewdrops.",
      "\"This chest,\" the sprite explained, \"holds the last of the forest's magic. If it's opened by someone with a greedy heart, the magic will disappear forever.\"",
      "Whiskers sat back and thought carefully. The chest was beautiful, and she wondered what treasures might be inside.",
      "But then she saw the worried look in the sprite's tiny eyes, and she remembered what her mother always said: \"Be kind, little one. Kindness is the greatest gift.\"",
      "\"I don't need the treasure,\" Whiskers said softly. \"I have everything I need — a warm home, food in my tummy, and friends who love me.\"",
      "The sprite's face lit up with joy. \"Oh, thank you! You have a pure heart, little kitten!\"",
      "As thanks, the sprite touched Whiskers' nose with a tiny finger. A warm, tingly feeling spread through her whole body.",
      "\"I've given you the gift of speaking with forest creatures,\" the sprite said. \"Now you'll always have friends wherever you go.\"",
      "From that day on, Whiskers could understand the songs of birds, the whispers of rabbits, and the stories of ancient trees.",
      "And she realized that the sprite was right — the real treasure wasn't gold or jewels. It was the endless adventures and friendships waiting for her.",
      "The golden chest? It stayed safe under the ancient tree, its magic protected by the kindness of a little gray kitten with the biggest, greenest eyes in all the forest."
    ]
  },
  {
    id: '18',
    title: 'The Wise Owl\'s Secret',
    subtitle: 'Wisdom • Learning',
    duration: '8 min',
    theme: 'Wisdom',
    coverUrl: IMAGES.WISE_OWL_LIBRARY,
    character: 'Professor Hoot',
    ageRange: '5-8',
    moral: 'The wisest thing of all is to keep learning and to share what you know with others.',
    content: [
      "In a magnificent tree house library, where lanterns glowed with warm amber light and books lined every branch, lived the wisest owl in all the land — Professor Hoot.",
      "Professor Hoot had fluffy brown feathers, big round spectacles, and wings that had touched thousands of book pages.",
      "Animals came from far and wide to ask him questions. \"Professor Hoot, why is the sky blue?\" \"Professor Hoot, how do fish breathe underwater?\" \"Professor Hoot, where does the sun sleep?\"",
      "And Professor Hoot always knew the answer, because he had read every book in his magnificent library.",
      "One day, a tiny sparrow fluttered in, tears in her eyes. \"Professor Hoot, everyone thinks I'm too small and too young to know anything important.\"",
      "Professor Hoot adjusted his spectacles and smiled kindly. \"Come, little one. Sit with me.\"",
      "He led her to a special shelf, dusty and hidden behind the others. \"This is where I keep the most precious books of all.\"",
      "The sparrow looked confused. \"But they're so small! And some of them look... homemade?\"",
      "\"These,\" Professor Hoot explained, \"are books written by young animals just like you. Stories, drawings, questions, ideas. And do you know a secret?\"",
      "The sparrow leaned in close.",
      "\"Some of the most important things I've ever learned came from these little books. Because young minds see the world in ways that older minds sometimes forget.\"",
      "The sparrow's eyes grew wide. \"Really? But I don't know very much yet...\"",
      "Professor Hoot chuckled, a warm, hooting laugh. \"Ah, but that's the wonderful thing about wisdom. It's not about knowing everything. It's about always being curious, always asking questions, and always being willing to learn.\"",
      "He handed her a tiny blank book and a feather pen. \"Here. Start with your questions. Your wonderings. Your dreams. One day, this little book might teach someone something amazing.\"",
      "The sparrow flew home that night with the biggest smile, clutching her tiny book like a treasure.",
      "And Professor Hoot watched her go, his heart full. Because he knew the secret that all wise creatures know:",
      "The wisest thing of all is not to have all the answers, but to keep asking questions and to share what you discover with open wings and an open heart.",
      "In his tree house library, the lanterns glowed a little brighter that night, as if the books themselves were smiling."
    ]
  },
  // 🎮 INTERACTIVE STORY - Choose Your Own Adventure!
  {
    id: '20',
    title: 'Whiskers and the Treasure',
    subtitle: 'Interactive Story • Adventure',
    duration: '10+ min',
    theme: 'Adventure',
    coverUrl: IMAGES.TREASURE_KITTEN,
    character: 'Whiskers the Kitten',
    ageRange: '4-8',
    moral: 'Every choice leads to a new adventure. There is no wrong path when you follow your heart.',
    isInteractive: true,
    startBranchId: 'start',
    branches: [
      {
        id: 'start',
        paragraphs: [
          "Deep in the Enchanted Forest, a curious little kitten named Whiskers was exploring near the old willow tree.",
          "Her soft gray fur sparkled in the morning light, and her bright green eyes were full of wonder.",
          "Suddenly, Whiskers noticed something shimmering behind a bush — a beautiful golden treasure chest!",
          "The chest was covered in mysterious symbols and had a tiny note attached: 'For the bravest explorer. Open if you dare!'",
          "Whiskers' heart beat fast with excitement. What should she do?"
        ],
        choices: [
          {
            id: 'choice_open',
            text: "Open the treasure chest!",
            emoji: "🔓",
            nextBranchId: 'open_chest',
            consequence: "What magical treasures await inside?"
          },
          {
            id: 'choice_friend',
            text: "Find a friend to share the adventure",
            emoji: "🐰",
            nextBranchId: 'find_friend',
            consequence: "Adventures are better with friends!"
          },
          {
            id: 'choice_hide',
            text: "Hide and watch the chest first",
            emoji: "👀",
            nextBranchId: 'watch_chest',
            consequence: "Sometimes patience reveals secrets..."
          }
        ]
      },
      {
        id: 'open_chest',
        paragraphs: [
          "With trembling paws, Whiskers carefully lifted the golden lid of the chest.",
          "WOOOOSH! A burst of sparkles and stars exploded from inside!",
          "Inside the chest were three magical items: a glowing map, a tiny compass that always points to adventure, and a beautiful blue feather.",
          "A gentle voice echoed from the chest: 'Choose one gift, brave explorer. Each will lead you somewhere special.'"
        ],
        choices: [
          {
            id: 'choose_map',
            text: "Take the glowing map",
            emoji: "🗺️",
            nextBranchId: 'map_adventure',
            consequence: "Where will it lead?"
          },
          {
            id: 'choose_compass',
            text: "Take the adventure compass",
            emoji: "🧭",
            nextBranchId: 'compass_adventure',
            consequence: "Follow where adventure calls!"
          },
          {
            id: 'choose_feather',
            text: "Take the blue feather",
            emoji: "🪶",
            nextBranchId: 'feather_adventure',
            consequence: "It seems to whisper secrets..."
          }
        ]
      },
      {
        id: 'find_friend',
        paragraphs: [
          "Whiskers ran through the forest calling for her best friend, Honey the Bunny.",
          "'Honey! Honey! I found something amazing!' Whiskers shouted with excitement.",
          "Honey hopped over quickly, her floppy ears bouncing. 'What is it, Whiskers?'",
          "Together, they returned to the treasure chest. 'Let's open it together,' Honey said, holding Whiskers' paw.",
          "When they opened the chest together, something magical happened — TWO bursts of sparkles came out!",
          "Instead of three items, there was one special golden key with a note: 'A key for two friends. Use it to unlock the Friendship Garden.'"
        ],
        choices: [
          {
            id: 'find_garden',
            text: "Search for the Friendship Garden!",
            emoji: "🌸",
            nextBranchId: 'friendship_ending',
            consequence: "A special place for special friends!"
          }
        ]
      },
      {
        id: 'watch_chest',
        paragraphs: [
          "Whiskers hid behind a mushroom and watched the chest carefully.",
          "After a few minutes, a tiny blue fairy appeared! She was no bigger than Whiskers' paw.",
          "The fairy danced around the chest, sprinkling stardust on the flowers nearby.",
          "'I know you're there, little kitten,' the fairy giggled. 'Only the most patient explorers find me!'",
          "The fairy floated over to Whiskers. 'Because you were wise enough to wait, I will grant you a special wish.'"
        ],
        choices: [
          {
            id: 'wish_fly',
            text: "I wish I could fly!",
            emoji: "✨",
            nextBranchId: 'flying_ending',
            consequence: "Up, up, and away!"
          },
          {
            id: 'wish_friend',
            text: "I wish for a new friend",
            emoji: "💕",
            nextBranchId: 'fairy_friend_ending',
            consequence: "The best gift of all!"
          }
        ]
      },
      {
        id: 'map_adventure',
        paragraphs: [
          "The map unrolled magically in Whiskers' paws. It showed the entire Enchanted Forest!",
          "A golden dotted line appeared, leading to a place marked 'The Sleepy Mountain Peak.'",
          "Whiskers followed the map through sparkling streams and past friendly squirrels who waved hello.",
          "At the top of Sleepy Mountain, she found the most beautiful sunset she had ever seen.",
          "The whole forest was painted in orange, pink, and purple. Whiskers felt warm and peaceful.",
          "On a stone at the peak, words were carved: 'The greatest treasure is seeing the world's beauty.'",
          "Whiskers curled up and watched the stars come out, her heart full of wonder."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Beautiful View'
      },
      {
        id: 'compass_adventure',
        paragraphs: [
          "The compass spun wildly and then pointed STRAIGHT UP!",
          "Before Whiskers could wonder what that meant, a rainbow staircase appeared in the sky!",
          "Step by step, Whiskers climbed the colorful stairs, each one making a musical sound.",
          "At the top was a cloud castle where cloud kittens lived! They were fluffy and white and bounced like cotton.",
          "'Welcome, brave explorer!' the Cloud Kittens cheered. 'You found our secret home!'",
          "The Cloud Kittens taught Whiskers how to slide down rainbows and bounce on clouds.",
          "It was the most fun adventure she had ever had!"
        ],
        isEnding: true,
        endingType: 'adventure',
        endingTitle: 'Cloud Castle Discovery'
      },
      {
        id: 'feather_adventure',
        paragraphs: [
          "When Whiskers touched the blue feather, she heard a gentle voice.",
          "'I am Azura, the Wise Wind Bird. This is my calling feather.'",
          "A magnificent blue bird with glittering wings descended from the clouds.",
          "'You are kind and gentle,' Azura said. 'I will teach you the language of birds.'",
          "From that day on, Whiskers could understand every tweet, chirp, and song in the forest.",
          "She learned amazing stories from the birds — about distant lands, ocean shores, and mountain tops.",
          "Whiskers became known as the Kitten Who Speaks to Birds!"
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The Gift of Understanding'
      },
      {
        id: 'friendship_ending',
        paragraphs: [
          "Following the butterflies that appeared from the key, Whiskers and Honey found the secret Friendship Garden.",
          "It was the most magical place they had ever seen! Flowers of every color bloomed everywhere.",
          "In the center was a tree with two swings side by side.",
          "'This garden appears only for true friends,' a friendly Garden Gnome explained.",
          "Whiskers and Honey promised to visit their special garden every week.",
          "And whenever one of them felt sad, the other would say, 'Let's go to OUR garden!'",
          "Because some treasures are not gold or jewels — they're the friends who share your adventures."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'Our Friendship Garden'
      },
      {
        id: 'flying_ending',
        paragraphs: [
          "The fairy sprinkled magical stardust over Whiskers' back.",
          "Beautiful, translucent wings sprouted from her shoulders — shimmering like morning dew!",
          "'These wings will appear whenever you really need them,' the fairy explained.",
          "Whiskers leaped into the air and FLEW! She soared over the treetops, touching the clouds.",
          "She could see the whole forest below — her home, her friends' homes, the river, everything!",
          "'I can see how everything is connected,' Whiskers whispered in wonder.",
          "She became the Guardian Kitten of the Enchanted Forest!"
        ],
        isEnding: true,
        endingType: 'adventure',
        endingTitle: 'Wings of Wonder'
      },
      {
        id: 'fairy_friend_ending',
        paragraphs: [
          "The fairy's eyes sparkled with joy. 'That is the kindest wish of all!'",
          "She twirled her tiny wand, and POOF! She grew to be the same size as Whiskers!",
          "'I've been alone in this forest for so long,' the fairy said. 'Will you really be my friend?'",
          "'Of course!' Whiskers hugged her new friend. 'Let's have adventures together!'",
          "And so, Whiskers and Stardust the Fairy became the best of friends.",
          "They explored the forest together and had tea parties on mushroom tops.",
          "Whiskers learned that the best treasure isn't found — it's made, when you open your heart to new friends."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'A Friend Like Stardust'
      }
    ]
  },
  // 🎮 INTERACTIVE STORY 2 - Flying Carpet Adventure
  {
    id: '21',
    title: 'The Magic Carpet Ride',
    titleTr: 'Sihirli Halı Yolculuğu',
    subtitle: 'Interactive Story • Magic',
    subtitleTr: 'Seçimli Hikaye • Sihir',
    duration: '8+ min',
    theme: 'Magic',
    coverUrl: IMAGES.MAGIC_CARPET,
    character: 'Luna & the Magic Carpet',
    ageRange: '4-8',
    moral: 'The best adventures are the ones where you help others along the way.',
    moralTr: 'En güzel maceralar, yol boyunca başkalarına yardım ettiğin maceralardır.',
    isInteractive: true,
    startBranchId: 'carpet_start',
    branches: [
      {
        id: 'carpet_start',
        paragraphs: [
          "In a dusty old attic, a young girl named Luna found a beautiful carpet rolled up in a corner.",
          "When she unrolled it, the carpet shimmered with golden threads and began to FLOAT!",
          "'Hello, Luna!' the carpet said in a warm, friendly voice. 'I am Zephyr, the Magic Carpet.'",
          "'I can take you anywhere you wish to go. But choose wisely — every journey has its own magic.'",
          "Luna's eyes sparkled with excitement. Where should they go first?"
        ],
        paragraphsTr: [
          "Tozlu eski bir çatı katında, Luna adında küçük bir kız köşede dürülmüş güzel bir halı buldu.",
          "Halının ucunu açar açmaz altın iplikler parladı ve halı HAVALANMAYA başladı!",
          "'Merhaba, Luna!' dedi halı sıcak ve dostça bir sesle. 'Ben Zephyr, Sihirli Halı.'",
          "'Seni dilediğin her yere götürebilirim. Ama akıllıca seç — her yolculuğun kendine özgü bir sihri vardır.'",
          "Luna'nın gözleri heyecanla parladı. İlk olarak nereye gitseler?"
        ],
        choices: [
          { id: 'go_clouds', text: "Fly to the clouds!", textTr: "Bulutlara uçalım!", emoji: "☁️", nextBranchId: 'cloud_kingdom', consequence: "What's hiding above the clouds?", consequenceTr: "Bulutların üstünde neler saklı?" },
          { id: 'go_desert', text: "Visit the golden desert", textTr: "Altın çölü ziyaret edelim", emoji: "🏜️", nextBranchId: 'desert_palace', consequence: "Ancient mysteries await...", consequenceTr: "Kadim gizemler bizi bekliyor..." },
          { id: 'go_ocean', text: "Soar over the sparkling ocean", textTr: "Parıldayan okyanusun üstünden süzülelim", emoji: "🌊", nextBranchId: 'ocean_adventure', consequence: "The sea holds many secrets!", consequenceTr: "Denizin birçok sırrı var!" }
        ]
      },
      {
        id: 'cloud_kingdom',
        paragraphs: [
          "Zephyr zoomed up, up, up through fluffy white clouds!",
          "Above the clouds was a magical kingdom made entirely of cotton candy and rainbows!",
          "The Cloud King approached them. 'Welcome, travelers! But we have a problem.'",
          "'Our rainbow machine is broken, and without it, children on Earth can't see rainbows after the rain.'",
          "Luna looked at Zephyr. What should they do?"
        ],
        paragraphsTr: [
          "Zephyr pofuduk beyaz bulutların içinden yukarı, daha yukarı, çok yukarı süzüldü!",
          "Bulutların üstünde, pamuk şekerden ve gökkuşaklarından yapılmış sihirli bir krallık vardı!",
          "Bulut Kralı onlara yaklaştı. 'Hoş geldiniz yolcular! Ama bir sorunumuz var.'",
          "'Gökkuşağı makinemiz bozuldu. O olmadan, yağmurdan sonra Dünya'daki çocuklar gökkuşağı göremiyor.'",
          "Luna Zephyr'e baktı. Ne yapmalılar?"
        ],
        choices: [
          { id: 'fix_rainbow', text: "Help fix the rainbow machine!", textTr: "Gökkuşağı makinesini tamir edelim!", emoji: "🌈", nextBranchId: 'rainbow_ending', consequence: "Be the hero!", consequenceTr: "Kahraman ol!" },
          { id: 'find_parts', text: "Search for missing parts", textTr: "Eksik parçaları arayalım", emoji: "🔍", nextBranchId: 'search_ending', consequence: "Every piece matters...", consequenceTr: "Her parça önemli..." }
        ]
      },
      {
        id: 'desert_palace',
        paragraphs: [
          "They flew over golden sand dunes that sparkled like treasure.",
          "In the distance, a magnificent palace rose from the sand!",
          "A kind Sultan welcomed them. 'You've arrived just in time! Tonight is the Festival of Stars.'",
          "'But our magical lanterns have all gone out. Without light, the stars won't dance.'",
          "How could Luna help?"
        ],
        paragraphsTr: [
          "Parlayan hazine gibi ışıldayan altın kum tepelerinin üstünden uçtular.",
          "Uzakta, kumların arasından görkemli bir saray yükseliyordu!",
          "Nazik bir Sultan onları karşıladı. 'Tam zamanında geldiniz! Bu gece Yıldız Festivali var.'",
          "'Ama sihirli fenerlerimizin hepsi söndü. Işık olmadan yıldızlar dans etmiyor.'",
          "Luna nasıl yardım edebilirdi?"
        ],
        choices: [
          { id: 'share_light', text: "Share Zephyr's magic glow", textTr: "Zephyr'in sihirli ışığını paylaş", emoji: "✨", nextBranchId: 'lantern_ending', consequence: "Light up the night!", consequenceTr: "Geceyi ışıl ışıl yap!" },
          { id: 'call_fireflies', text: "Call the desert fireflies", textTr: "Çöl ateşböceklerini çağır", emoji: "🪲", nextBranchId: 'firefly_ending', consequence: "Nature's little helpers!", consequenceTr: "Doğanın minik yardımcıları!" }
        ]
      },
      {
        id: 'ocean_adventure',
        paragraphs: [
          "They soared low over crystal blue waters, the waves sparkling below.",
          "Suddenly, they heard a tiny voice: 'Help! Help!'",
          "It was a baby dolphin, separated from its family!",
          "'Please,' the dolphin cried, 'I can't find my way home!'",
          "Luna knew exactly what to do."
        ],
        paragraphsTr: [
          "Kristal mavi suların üzerinde alçaktan süzüldüler, aşağıda dalgalar parlıyordu.",
          "Birden minik bir ses duydular: 'Yardım edin! Yardım edin!'",
          "Bu, ailesinden ayrılmış bir yavru yunustu!",
          "'Lütfen,' diye ağladı yunus, 'Eve giden yolu bulamıyorum!'",
          "Luna ne yapması gerektiğini hemen anladı."
        ],
        choices: [
          { id: 'guide_dolphin', text: "Guide the dolphin home", textTr: "Yunusu evine götür", emoji: "🐬", nextBranchId: 'dolphin_ending', consequence: "Lead the way!", consequenceTr: "Yolu sen göster!" },
          { id: 'sing_song', text: "Sing a dolphin family song", textTr: "Bir yunus aile şarkısı söyle", emoji: "🎵", nextBranchId: 'song_ending', consequence: "Music brings families together!", consequenceTr: "Müzik aileleri bir araya getirir!" }
        ]
      },
      {
        id: 'rainbow_ending',
        paragraphs: [
          "Luna and Zephyr worked together to fix the rainbow machine.",
          "When they turned it on, the most beautiful rainbow anyone had ever seen stretched across the sky!",
          "Children all over the world looked up and smiled.",
          "The Cloud King gave Luna a tiny rainbow crystal. 'Whenever you need magic, hold this close.'",
          "As they flew home, Luna felt warm inside. She had brought joy to so many children.",
          "'That was the best adventure ever,' Luna whispered to Zephyr. And it was."
        ],
        paragraphsTr: [
          "Luna ve Zephyr, gökkuşağı makinesini tamir etmek için birlikte çalıştı.",
          "Makine çalışınca, gökyüzünü baştan sona kaplayan şimdiye kadarki en güzel gökkuşağı oluştu!",
          "Dünyanın dört bir yanındaki çocuklar göğe bakıp gülümsedi.",
          "Bulut Kralı Luna'ya minik bir gökkuşağı kristali verdi. 'Ne zaman sihre ihtiyacın olursa bunu yanında tut.'",
          "Eve doğru uçarken Luna'nın içi sıcacık oldu. Pek çok çocuğa neşe getirmişti.",
          "'Bu şimdiye kadarki en güzel maceraydı,' diye fısıldadı Luna Zephyr'e. Gerçekten de öyleydi."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Rainbow Maker',
        endingTitleTr: 'Gökkuşağı Ustası'
      },
      {
        id: 'search_ending',
        paragraphs: [
          "Luna searched high and low through the cloud kingdom.",
          "She found rainbow pieces in the most unexpected places — a red piece in a rose garden, blue in a puddle, green hiding in a four-leaf clover!",
          "When she put them all together, the rainbow was even MORE beautiful than before!",
          "'You taught us something important,' said the Cloud King. 'Sometimes broken things become even more beautiful when we rebuild them with care.'",
          "Luna smiled. She had learned that looking carefully and never giving up could work magic all its own."
        ],
        paragraphsTr: [
          "Luna bulut krallığında her yeri dikkatle aradı.",
          "Gökkuşağının parçalarını hiç beklemediği yerlerde buldu: kırmızı parça gül bahçesinde, mavi bir su birikintisinde, yeşil ise dört yapraklı yoncanın altında!",
          "Hepsini bir araya getirdiğinde gökkuşağı eskisinden bile DAHA güzel oldu!",
          "'Bize önemli bir şey öğrettin,' dedi Bulut Kralı. 'Bazen kırılan şeyler, sevgiyle onarıldığında daha da güzelleşir.'",
          "Luna gülümsedi. Dikkatle bakmanın ve asla vazgeçmemenin başlı başına bir sihir olduğunu öğrenmişti."
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The Piece Finder',
        endingTitleTr: 'Parça Kaşifi'
      },
      {
        id: 'lantern_ending',
        paragraphs: [
          "Zephyr glowed with all his magical light, and Luna spread it gently into each lantern.",
          "One by one, the lanterns flickered to life, casting beautiful patterns on the palace walls.",
          "When night fell, the stars began to dance in the sky, reflecting the lights below!",
          "The Sultan's people cheered and celebrated. 'You are always welcome here, Luna the Light Bringer!'",
          "As she flew home, Luna watched the stars dance and knew she would always carry this magic in her heart."
        ],
        paragraphsTr: [
          "Zephyr tüm sihirli ışığını parlatırken Luna da bu ışığı nazikçe fenerlerin içine dağıttı.",
          "Fenerler birer birer yanmaya başladı ve sarayın duvarlarına harika desenler yansıttı.",
          "Gece çöktüğünde yıldızlar gökyüzünde dans etmeye başladı, aşağıdaki ışıklar da onlara eşlik ediyordu!",
          "Sultanın halkı sevinçle tezahürat yaptı. 'Her zaman bekleriz seni, Işık Getiren Luna!'",
          "Eve dönerken Luna yıldızların dansını izledi ve bu sihri kalbinde hep taşıyacağını hissetti."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'Light Bringer',
        endingTitleTr: 'Işık Getiren'
      },
      {
        id: 'firefly_ending',
        paragraphs: [
          "Luna remembered that fireflies loved music. She began to hum a soft, sweet melody.",
          "From behind every sand dune, thousands of fireflies rose into the air!",
          "They circled the palace, creating a light show more beautiful than any lanterns could!",
          "The Festival of Stars became the Festival of Fireflies, and it was the most magical night ever.",
          "Luna learned that sometimes the best solutions come from working with nature, not against it."
        ],
        paragraphsTr: [
          "Luna, ateşböceklerinin müziği sevdiğini hatırladı. Yumuşacık, tatlı bir melodi mırıldanmaya başladı.",
          "Her kum tepesinin arkasından binlerce ateşböceği gökyüzüne yükseldi!",
          "Sarayın etrafında dönerek fenerlerin bile yapamayacağı kadar güzel bir ışık şöleni oluşturdular!",
          "Yıldız Festivali, Ateşböceği Festivali'ne dönüştü ve bu, şimdiye kadarki en sihirli gece oldu.",
          "Luna bazen en iyi çözümlerin doğaya karşı değil, doğayla birlikte hareket etmekten geldiğini öğrendi."
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The Firefly Whisperer',
        endingTitleTr: 'Ateşböceği Fısıldayanı'
      },
      {
        id: 'dolphin_ending',
        paragraphs: [
          "Luna and Zephyr flew low and slow, letting the baby dolphin follow their magical trail.",
          "After a wonderful journey through coral caves and past friendly sea turtles, they found the dolphin family!",
          "The dolphins jumped and splashed with joy, spraying rainbow droplets into the air.",
          "'Thank you, kind sky-travelers!' they sang. 'You gave us back our family!'",
          "Luna learned that the greatest gift isn't treasure or magic — it's bringing loved ones together."
        ],
        paragraphsTr: [
          "Luna ve Zephyr alçaktan ve yavaşça uçtu; yavru yunus sihirli izlerini takip etti.",
          "Mercan mağaralarından geçip dost canlısı deniz kaplumbağalarının yanından ilerledikten sonra yunus ailesini buldular!",
          "Yunuslar neşeyle zıplayıp su sıçrattı, göğe gökkuşağı gibi damlacıklar saçıldı.",
          "'Teşekkürler, iyi kalpli gök yolcuları!' diye şarkı söylediler. 'Ailemizi bize geri verdiniz!'",
          "Luna en büyük hediyenin hazine ya da sihir değil, sevdiklerini yeniden bir araya getirmek olduğunu öğrendi."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Dolphin Guide',
        endingTitleTr: 'Yunus Rehberi'
      },
      {
        id: 'song_ending',
        paragraphs: [
          "Luna sang the ancient dolphin family song that Zephyr taught her.",
          "The melody carried across the waves, and soon, answering songs came from far away!",
          "The baby dolphin's parents found them, guided by the beautiful music!",
          "The dolphins invited Luna to swim with them, and Zephyr magically kept her warm and dry.",
          "That night, under the stars, Luna danced with dolphins and learned that music connects all hearts."
        ],
        paragraphsTr: [
          "Luna, Zephyr'in ona öğrettiği eski yunus aile şarkısını söyledi.",
          "Melodi dalgaların üzerinden uzaklara taşındı ve biraz sonra çok uzaktan cevap şarkıları geldi!",
          "Yavru yunusun annesiyle babası, bu güzel müziği izleyerek onlara ulaştı.",
          "Yunuslar Luna'yı onlarla yüzmeye davet etti; Zephyr de sihirle onu sıcak ve kuru tuttu.",
          "O gece yıldızların altında Luna yunuslarla dans etti ve müziğin tüm kalpleri birbirine bağladığını öğrendi."
        ],
        isEnding: true,
        endingType: 'adventure',
        endingTitle: 'The Ocean Singer',
        endingTitleTr: 'Okyanus Şarkıcısı'
      }
    ]
  },
  // 🎮 INTERACTIVE STORY 3 - Tea Party Tales
  {
    id: '22',
    title: 'The Enchanted Tea Party',
    subtitle: 'Interactive Story • Friendship',
    duration: '7+ min',
    theme: 'Friendship',
    coverUrl: IMAGES.TEA_PARTY,
    character: 'Flora the Fox',
    ageRange: '3-6',
    moral: 'True friends make even the simplest moments magical.',
    isInteractive: true,
    startBranchId: 'tea_start',
    branches: [
      {
        id: 'tea_start',
        paragraphs: [
          "Flora the Fox was preparing the most special tea party in the whole Whispering Woods!",
          "She set up her tiny table under the old oak tree, with her best acorn cups and mushroom stools.",
          "But oh no! Only three guests could fit at the table, and FIVE friends wanted to come!",
          "She had to send out invitations. Who should she invite?"
        ],
        choices: [
          { id: 'invite_old', text: "Invite the oldest friends", emoji: "🦔🐰🦌", nextBranchId: 'old_friends', consequence: "Loyalty is precious..." },
          { id: 'invite_new', text: "Invite the newest friend and others", emoji: "🐿️🦋🐦", nextBranchId: 'new_friends', consequence: "New friendships blossom!" },
          { id: 'think_harder', text: "Think of a creative solution", emoji: "💡", nextBranchId: 'creative_solution', consequence: "There might be another way..." }
        ]
      },
      {
        id: 'old_friends',
        paragraphs: [
          "Flora invited Hedgie the Hedgehog, Rosie the Rabbit, and Dotty the Deer — her oldest friends.",
          "They had the most wonderful time, sharing honey cakes and chamomile tea!",
          "But later, Flora saw Squirrel, Butterfly, and Bird watching from behind a bush, looking sad.",
          "Flora's heart felt heavy. What should she do?"
        ],
        choices: [
          { id: 'apologize', text: "Invite them for dessert!", emoji: "🍰", nextBranchId: 'everyone_ending', consequence: "There's always room for more!" }
        ]
      },
      {
        id: 'new_friends',
        paragraphs: [
          "Flora invited Sammy Squirrel (her newest friend), Bella Butterfly, and Billy Bird.",
          "They were SO excited! Sammy had never been to a fancy tea party before.",
          "'This is the best day ever!' Sammy squeaked, his eyes shining with joy.",
          "Flora felt happy she had made her new friends feel so special and welcome.",
          "After the party, Flora's old friends said they understood — making new friends feel welcome is important!"
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Welcoming Host'
      },
      {
        id: 'creative_solution',
        paragraphs: [
          "Flora had an idea! 'What if we make the party BIGGER?'",
          "She gathered more mushroom stools and asked Mr. Beaver to help build a longer table.",
          "By afternoon, there was room for EVERYONE!",
          "All five friends came, and they had the biggest, happiest tea party the forest had ever seen!",
          "Flora learned that sometimes the best solution is to make more room, not less."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'Room for Everyone'
      },
      {
        id: 'everyone_ending',
        paragraphs: [
          "Flora rushed over to her other friends. 'Please, come join us for dessert!'",
          "They squeezed together, sitting on logs and blankets around the table.",
          "It was a bit crowded, but everyone was laughing and sharing treats.",
          "'This is the best tea party ever!' they all agreed.",
          "Flora smiled. She learned that sometimes the best parties aren't perfect — they're just full of love."
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The More The Merrier'
      }
    ]
  },
  // 🎮 INTERACTIVE STORY 4 - Penguin's Big Show
  {
    id: '23',
    title: "Penny's Big Show",
    subtitle: 'Interactive Story • Courage',
    duration: '8+ min',
    theme: 'Courage',
    coverUrl: IMAGES.PENGUIN_SHOW,
    character: 'Penny the Penguin',
    ageRange: '4-7',
    moral: 'Being brave means trying even when you are afraid.',
    isInteractive: true,
    startBranchId: 'show_start',
    branches: [
      {
        id: 'show_start',
        paragraphs: [
          "Tonight was the night! Penny the Penguin was going to perform in the Grand Ice Show!",
          "She had practiced her dance for weeks, twirling and sliding on the ice.",
          "But as she peeked from behind the curtain and saw the HUGE audience, her flippers started shaking!",
          "Her tummy felt like it was full of jumping fish. What should Penny do?"
        ],
        choices: [
          { id: 'deep_breath', text: "Take deep breaths and try", emoji: "🌬️", nextBranchId: 'brave_try', consequence: "Courage begins with one breath..." },
          { id: 'find_friend', text: "Find a friend backstage", emoji: "🐧", nextBranchId: 'friend_help', consequence: "Friends make everything easier!" },
          { id: 'practice_more', text: "Practice one more time", emoji: "🩰", nextBranchId: 'extra_practice', consequence: "One more try can't hurt..." }
        ]
      },
      {
        id: 'brave_try',
        paragraphs: [
          "Penny closed her eyes and took three deep breaths. One... two... three...",
          "She remembered what her grandmother told her: 'Being brave doesn't mean you're not scared. It means you try anyway.'",
          "Penny waddled onto the stage. The spotlight was bright and warm.",
          "She began to dance, and something wonderful happened — she forgot to be scared!",
          "The audience cheered, and Penny felt like she was flying on ice!"
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Brave Dancer'
      },
      {
        id: 'friend_help',
        paragraphs: [
          "Penny found her best friend, Pip, backstage.",
          "'I'm so scared!' Penny whispered. 'What if I fall?'",
          "Pip took her flipper. 'Then you get back up! And I'll be right here cheering for you.'",
          "Just knowing Pip was there made Penny feel braver.",
          "She walked onto the stage and danced beautifully. Every time she looked backstage, Pip was smiling and waving!"
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'Friends Give Courage'
      },
      {
        id: 'extra_practice',
        paragraphs: [
          "Penny practiced her routine one more time in the corner.",
          "Spin, slide, jump, bow! She knew every move perfectly.",
          "'I CAN do this!' she said to herself.",
          "When she went on stage, her muscles remembered every move. She danced like the star she was!",
          "The audience gave her a standing ovation, and Penny learned that preparation gives confidence!"
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'Practice Makes Perfect'
      }
    ]
  },
  // 🎮 INTERACTIVE STORY 5 - Wolf Princess
  {
    id: '24',
    title: 'The Wolf and the Moon Princess',
    subtitle: 'Interactive Story • Kindness',
    duration: '10+ min',
    theme: 'Kindness',
    coverUrl: IMAGES.WOLF_PRINCESS,
    character: 'Shadow the Wolf',
    ageRange: '5-9',
    moral: 'Kindness can change hearts and break old fears.',
    isInteractive: true,
    startBranchId: 'wolf_start',
    branches: [
      {
        id: 'wolf_start',
        paragraphs: [
          "In the Moonlit Kingdom, a gentle wolf named Shadow lived alone in the forest.",
          "The villagers were afraid of wolves, so Shadow never had any friends.",
          "One night, he heard crying from the tall tower in the castle. The Moon Princess was trapped!",
          "An evil spell kept her locked away, and only an act of pure kindness could break it.",
          "Shadow wanted to help, but the villagers would chase him away. What should he do?"
        ],
        choices: [
          { id: 'sneak', text: "Sneak to the tower at night", emoji: "🌙", nextBranchId: 'night_journey', consequence: "Under the cover of darkness..." },
          { id: 'ask_animals', text: "Ask the forest animals for help", emoji: "🦊🐰", nextBranchId: 'animal_help', consequence: "Friends come in all forms!" },
          { id: 'approach_village', text: "Bravely approach the village", emoji: "🏘️", nextBranchId: 'village_approach', consequence: "Face your fears..." }
        ]
      },
      {
        id: 'night_journey',
        paragraphs: [
          "Shadow crept through the sleeping village, his soft paws making no sound.",
          "He climbed the tower using the vines growing on its walls.",
          "The Princess was surprised but not afraid. 'A wolf? But... you look so kind!'",
          "'I want to help you,' Shadow said softly. 'What can break the spell?'",
          "The Princess smiled. 'The spell can only be broken by someone who shows kindness expecting nothing in return.'",
          "Shadow didn't need to think. He gently took her hand and led her down the tower, asking for nothing."
        ],
        choices: [
          { id: 'spell_breaks', text: "Watch the magic happen", emoji: "✨", nextBranchId: 'spell_ending', consequence: "Pure kindness works wonders!" }
        ]
      },
      {
        id: 'animal_help',
        paragraphs: [
          "Shadow called all the forest animals together — foxes, rabbits, deer, and birds.",
          "'We can distract the guards while you save the princess!' said a brave little mouse.",
          "The animals worked together. Birds sang in the trees, rabbits hopped around the gardens, and foxes did funny tricks!",
          "While everyone watched the animals, Shadow slipped into the tower unnoticed.",
          "He found the Princess and together they escaped through a secret passage the mice had discovered!"
        ],
        isEnding: true,
        endingType: 'adventure',
        endingTitle: 'The Forest Alliance'
      },
      {
        id: 'village_approach',
        paragraphs: [
          "Shadow took a deep breath and walked into the village in broad daylight.",
          "People screamed and ran! But Shadow didn't growl or scare anyone.",
          "He simply sat down and waited.",
          "An old woman looked at him carefully. 'This wolf... he's not dangerous. Look at his eyes — they're kind!'",
          "Slowly, the villagers realized they had been wrong about wolves. They thanked Shadow and asked for his help.",
          "Together, they walked to the tower and freed the Princess, who declared that wolves and villagers would be friends forever."
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'Breaking Old Fears'
      },
      {
        id: 'spell_ending',
        paragraphs: [
          "The moment Shadow helped the Princess with no thought of reward, the tower glowed with silver light!",
          "The spell shattered like ice melting in spring!",
          "The villagers saw everything and realized they had been wrong about wolves.",
          "'You saved our Princess!' they cheered. 'You are a hero!'",
          "The King declared Shadow a Royal Guardian. For the first time ever, Shadow had a home and a family.",
          "The Moon Princess became his best friend, and they often watched the moon rise together — no longer alone."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Gentle Guardian'
      }
    ]
  },
  {
    id: '25',
    title: 'The Lantern That Listened',
    subtitle: 'Magic • Kindness',
    duration: '9 min',
    theme: 'Magic',
    coverUrl: IMAGES.ORNATE_MAGICAL_LANTERN,
    character: 'Nia',
    ageRange: '4-8',
    moral: 'When we listen with care, we can light someone else\'s night.',
    content: [
      "Nia found an ornate lantern in her grandmother's attic, glowing with warm golden light.",
      "Each evening the lantern flickered brighter whenever Nia listened to someone share a worry.",
      "A shy hedgehog feared the dark path home, so Nia walked beside him and held the lantern low.",
      "A little owl worried about forgetting her song, so Nia listened patiently until the tune returned.",
      "By moonrise the whole village looked brighter, not because the lantern was magical, but because Nia had made everyone feel seen.",
      "That night Nia whispered, 'Thank you,' and the lantern glowed once before gently drifting to sleep."
    ]
  },
  {
    id: '26',
    title: 'Bobo and the Cloud Blanket',
    subtitle: 'Calm • Sleep',
    duration: '6 min',
    theme: 'Calm',
    coverUrl: IMAGES.BABY_BEAR_CLOUD_SLEEP,
    character: 'Bobo the Bear Cub',
    ageRange: '2-5',
    moral: 'Slow breaths and safe thoughts help us rest.',
    content: [
      "Bobo lay on a fluffy cloud blanket and watched tiny stars blink hello.",
      "Whenever his thoughts felt jumpy, he hugged his pillow and counted one soft breath at a time.",
      "A sleepy rabbit floated by and taught Bobo to stretch his paws, then relax them like melting butter.",
      "The moon hummed a gentle tune while the wind tucked the cloud around his shoulders.",
      "Soon Bobo's eyes felt heavy and warm, and every worry drifted away like mist.",
      "He fell asleep smiling, wrapped in moonlight and quiet."
    ]
  },
  {
    id: '27',
    title: 'Captain Pebble\'s Star Rocket',
    subtitle: 'Adventure • Wonder',
    duration: '8 min',
    theme: 'Adventure',
    coverUrl: IMAGES.FRIENDLY_ROCKET_STARS,
    character: 'Captain Pebble',
    ageRange: '4-7',
    moral: 'Curiosity is brightest when shared with friends.',
    content: [
      "Captain Pebble launched his friendly little rocket toward the twinkling belt of stars.",
      "At each stop, he wrote down one wonder: a singing comet, a sleepy planet, and a ring made of moon dust.",
      "When his map fluttered out the window, Pebble felt nervous, but his new alien friend Lumo calmly held the controls.",
      "Together they followed a trail of glowing crumbs left by a playful meteor bird.",
      "They found the map, added Lumo's home to it, and promised to explore together next time.",
      "Back on Earth, Pebble pinned the map above his bed and fell asleep planning kind adventures."
    ]
  },
  {
    id: '28',
    title: 'Luna and the Seahorse Song',
    subtitle: 'Nature • Calm',
    duration: '9 min',
    theme: 'Nature',
    coverUrl: IMAGES.MAGICAL_SEAHORSE_GLOW,
    character: 'Luna the Seahorse',
    ageRange: '4-8',
    moral: 'Gentle voices can guide others home.',
    content: [
      "Luna the seahorse glowed softly in the moonlit sea, weaving between bubbles and coral.",
      "One evening she heard tiny crabs calling for their little brother who had drifted away.",
      "Luna sang a low, shimmering song that traveled farther than any shout.",
      "The lost crab followed the melody through sea grass and found his family waiting.",
      "To celebrate, every fish in the reef hummed the same peaceful tune under the stars.",
      "Luna learned that calm music can be a lighthouse in the deep."
    ]
  },
  {
    id: '29',
    title: 'The Treehouse Promise',
    subtitle: 'Friendship • Home',
    duration: '8 min',
    theme: 'Friendship',
    coverUrl: IMAGES.COZY_TREEHOUSE_NIGHT,
    character: 'Mina and Taro',
    ageRange: '4-8',
    moral: 'A shared home is built from trust, not wood.',
    content: [
      "Mina and Taro built a tiny treehouse with rope ladders, lanterns, and a window facing the moon.",
      "They promised it would always be a place where no one laughed at mistakes.",
      "When a new squirrel dropped his paint bucket and ruined the welcome sign, he expected to be sent away.",
      "Instead Mina handed him a brush, and Taro said, 'Then let's paint a better sign together.'",
      "By sunset the new sign read, 'Climb up, breathe deep, you belong here.'",
      "That night the treehouse glowed brighter than ever, full of friends and second chances."
    ]
  },
  {
    id: '30',
    title: 'Compass of Kind Paths',
    subtitle: 'Adventure • Kindness',
    duration: '10 min',
    theme: 'Adventure',
    coverUrl: IMAGES.VINTAGE_MAGIC_COMPASS,
    character: 'Rin the Explorer',
    ageRange: '5-9',
    moral: 'The best direction is the one that helps others too.',
    content: [
      "Rin discovered an old compass whose needle pointed not north, but toward the nearest person who needed help.",
      "It first led him to a duckling stuck behind reeds, then to a fox cub searching for his mitten.",
      "At a fork in the forest trail, Rin wanted to race toward treasure, but the compass spun toward a shaky bridge.",
      "On the bridge he found two younger travelers afraid to cross in the wind.",
      "Rin crossed slowly with them, step by step, until all three reached safe ground.",
      "When they looked back, the compass glowed warm gold and pointed home, as if saying the real treasure was already found."
    ]
  },
  {
    id: '31',
    title: 'Balloon Above Sleepy Valley',
    subtitle: 'Adventure • Dreams',
    duration: '8 min',
    theme: 'Adventure',
    coverUrl: IMAGES.HOT_AIR_BALLOON_STARS,
    character: 'Eli the Balloon Keeper',
    ageRange: '4-8',
    moral: 'Seeing from above helps us appreciate what we already have.',
    content: [
      "Eli's striped balloon rose slowly over Sleepy Valley while stars gathered like lanterns in the sky.",
      "From above, the noisy parts of the day looked small and gentle.",
      "He waved to rooftops, gardens, and winding paths that had once felt confusing.",
      "A gust of wind pushed him off course, but Eli remembered to steer with patience, not panic.",
      "He landed near home with a basket full of moonlit pears he picked from a high orchard.",
      "Eli shared them with neighbors and said, 'Everything looked kinder from the sky tonight.'"
    ]
  },
  {
    id: '32',
    title: 'The Castle of Quiet Crowns',
    subtitle: 'Kindness • Wisdom',
    duration: '9 min',
    theme: 'Kindness',
    coverUrl: IMAGES.FAIRY_CASTLE_MOONLIGHT,
    character: 'Princess Elin',
    ageRange: '4-8',
    moral: 'A true leader listens before speaking.',
    content: [
      "In a moonlit castle, Princess Elin wore a light silver crown that chimed whenever she spoke too quickly.",
      "At first she found it annoying, but the royal baker smiled and said it might be a useful reminder.",
      "The next day two villages argued over who could use the river first.",
      "Elin took off her shoes, sat between them, and listened to both sides until the moon climbed high.",
      "Together they designed a shared schedule and planted extra water lilies to keep the river healthy.",
      "When Elin returned home, her crown stayed silent, and she realized calm listening had become her strongest magic."
    ]
  },
  {
    id: '33',
    title: 'The Tower and the Falling Star',
    subtitle: 'Magic • Hope',
    duration: '9 min',
    theme: 'Magic',
    coverUrl: IMAGES.MAGICAL_TOWER_STARS,
    character: 'Theo',
    ageRange: '5-9',
    moral: 'Small brave steps can carry big dreams.',
    content: [
      "Theo climbed the spiral steps of the star tower to return a tiny falling star to the sky.",
      "Halfway up he wanted to turn back, because the stairs seemed endless and the night wind was loud.",
      "A friendly bat guided him with soft clicks, and Theo kept climbing one careful step at a time.",
      "At the top he opened his hands, and the little star floated up like a spark from a candle.",
      "Before disappearing, it left Theo a silver thread that glowed whenever he felt unsure.",
      "Theo tucked the thread in his pocket and walked down smiling, taller inside than when he started."
    ]
  },
  {
    id: '34',
    title: 'Goodnight, Smiling Moon',
    subtitle: 'Calm • Bedtime',
    duration: '6 min',
    theme: 'Calm',
    coverUrl: IMAGES.SMILING_CRESCENT_MOON_STARS,
    character: 'The Smiling Moon',
    ageRange: '2-6',
    moral: 'Night can feel friendly when we welcome rest.',
    content: [
      "A smiling crescent moon peeped through soft clouds and greeted each child by name.",
      "For every yawn, a tiny star twinkled once like a bedtime bell.",
      "The moon asked everyone to place one happy memory in an invisible pocket before sleep.",
      "Soon bedrooms became quiet harbors, and blankets felt like warm boats.",
      "The moon hummed until even the loudest thoughts turned soft and slow.",
      "When morning came, each child woke with the same memory still glowing inside."
    ]
  },
  {
    id: '35',
    title: 'The Lighthouse of Little Waves',
    subtitle: 'Family • Safety',
    duration: '8 min',
    theme: 'Family',
    coverUrl: IMAGES.COZY_LIGHTHOUSE_ISLAND,
    character: 'Nora the Keeper',
    ageRange: '4-8',
    moral: 'Steady care helps everyone find their way.',
    content: [
      "Nora lived in a cozy lighthouse where the sea hummed bedtime songs against the rocks.",
      "Each evening she polished the lamp so boats could find safe water before night grew thick.",
      "One foggy night she heard a tiny horn and spotted a little fishing boat drifting too close to shore.",
      "Nora adjusted the beam into slow, gentle circles the captain could follow.",
      "The boat reached calm harbor, and the crew waved with grateful smiles.",
      "Nora wrote in her journal: 'A steady light is a kind promise kept.'"
    ]
  },
  {
    id: '36',
    title: 'The Whale Who Carried Starlight',
    subtitle: 'Nature • Wonder',
    duration: '9 min',
    theme: 'Nature',
    coverUrl: IMAGES.GENTLE_WHALE_NIGHTSKY,
    character: 'Mavi the Whale',
    ageRange: '4-8',
    moral: 'Gentleness makes even great strength comforting.',
    content: [
      "Mavi, a giant gentle whale, swam beneath a sky so clear that stars reflected like silver shells.",
      "One small seal felt afraid of deep water and asked to travel on Mavi's back.",
      "Mavi moved slowly, letting each wave become a rocking cradle instead of a giant wall.",
      "As they crossed the bay, Mavi pointed out constellations and made stories for each one.",
      "By the time they reached home, the little seal was laughing and splashing beside him.",
      "Mavi learned that being strong means helping others feel safe."
    ]
  },
  {
    id: '37',
    title: 'Firefly Forest Picnic',
    subtitle: 'Nature • Friendship',
    duration: '8 min',
    theme: 'Nature',
    coverUrl: IMAGES.ENCHANTED_FOREST_GLOW,
    character: 'Tina the Fox',
    ageRange: '3-7',
    moral: 'Simple moments become magical when shared.',
    content: [
      "Tina packed berry tarts and tea for a picnic in the glowing firefly forest.",
      "When rain began to sprinkle, she worried the picnic would be ruined.",
      "Her friends tied broad leaves into a roof and turned raindrops into a drumbeat game.",
      "As dusk arrived, fireflies blinked in patterns that matched their laughter.",
      "The picnic became even better than planned, full of songs and warm tea.",
      "Tina smiled and said, 'Plans can change, but joy can stay.'"
    ]
  },
  {
    id: '38',
    title: 'The Old Tree\'s Lantern Leaves',
    subtitle: 'Magic • Wisdom',
    duration: '8 min',
    theme: 'Magic',
    coverUrl: IMAGES.ENCHANTED_OLD_TREE,
    character: 'Grand Tree Rowan',
    ageRange: '4-8',
    moral: 'Wisdom grows when we care for others.',
    content: [
      "At the heart of the woods stood Rowan, an old tree whose leaves glowed like tiny lanterns.",
      "Every evening animals came to Rowan with questions too heavy to carry alone.",
      "Rowan listened first, then let one glowing leaf fall for each honest answer they found inside themselves.",
      "A worried rabbit received a leaf after admitting she needed help finishing her burrow.",
      "A proud magpie received one after apologizing for taking shiny things that were not his.",
      "By dawn the path around Rowan glowed gold, lit by lessons learned with gentle hearts."
    ]
  },
  {
    id: '39',
    title: 'The Dandelion Wish',
    subtitle: 'Kindness • Dreams',
    duration: '7 min',
    theme: 'Kindness',
    coverUrl: IMAGES.MAGICAL_DANDELION_WISH,
    character: 'Pip',
    ageRange: '3-7',
    moral: 'The best wishes include someone else.',
    content: [
      "Pip found a glowing dandelion that granted one wish when blown under moonlight.",
      "He first wished for a mountain of sweets, then paused and thought of his tired grandmother.",
      "Instead, he wished for her cough to ease and for warm soup to always be in her kitchen.",
      "The dandelion seeds flew out like tiny stars and settled gently across the village.",
      "That week neighbors brought soup, blankets, and laughter to Pip's home without being asked.",
      "Pip discovered that kind wishes keep growing long after we make them."
    ]
  },
  {
    id: '40',
    title: 'Lotus Lake Breathing',
    subtitle: 'Calm • Mindfulness',
    duration: '6 min',
    theme: 'Calm',
    coverUrl: IMAGES.SERENE_LOTUS_MOONWATER,
    character: 'Mina',
    ageRange: '3-7',
    moral: 'A quiet breath can calm a busy mind.',
    content: [
      "Mina sat by Lotus Lake where pink petals floated in perfect circles.",
      "A wise frog taught her to breathe in for four counts and breathe out for four, like ripples on water.",
      "Each slow breath made the noisy thoughts in Mina's head sink gently to the lake floor.",
      "When a sudden splash startled her, Mina smiled and returned to her breathing rhythm.",
      "Soon she felt light, warm, and steady, as if moonlight lived in her chest.",
      "Before bed, Mina repeated the same breathing and drifted into peaceful dreams."
    ]
  },
  ...VAULT_LINEAR_STORIES,
  ...VAULT_INTERACTIVE_STORIES
];

export const BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'First Tale',
    description: 'Completed your first story!',
    icon: 'grade',
    colorClass: 'from-primary to-yellow-300',
    isLocked: false
  },
  {
    id: 'b2',
    name: '7 Night Streak',
    description: 'Read for 7 nights',
    icon: 'nights_stay',
    colorClass: 'from-indigo-400 to-purple-400',
    isLocked: false
  },
  {
    id: 'b3',
    name: 'Adventurer',
    description: 'Finished 5 adventure stories',
    icon: 'backpack',
    colorClass: 'from-green-400 to-teal-400',
    isLocked: false
  },
  {
    id: 'b4',
    name: 'Dreamer',
    description: 'Locked Badge',
    icon: 'cloud',
    colorClass: 'gray',
    isLocked: true
  },
  {
    id: 'b5',
    name: 'Star Walker',
    description: 'Locked Badge',
    icon: 'planet',
    colorClass: 'gray',
    isLocked: true
  },
  {
    id: 'b6',
    name: 'Wise Owl',
    description: 'Locked Badge',
    icon: 'school',
    colorClass: 'gray',
    isLocked: true
  }
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    features: ['3 personalized story creations / month', 'Access to the curated library', 'Ads included'],
    color: 'bg-white/10',
    buttonText: 'Current Plan'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    features: ['Higher story capacity', 'No Ads', 'Exclusive Themes', 'HD Audio'],
    isPopular: true,
    color: 'bg-gradient-to-br from-secondary to-purple-800',
    buttonText: 'Upgrade to Pro'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$89.99',
    period: '/year',
    features: ['Everything in Pro', 'Offline Mode', 'Parental Analytics', 'Early Access Features'],
    color: 'bg-gradient-to-br from-yellow-500 to-primary',
    buttonText: 'Get Premium'
  }
];
