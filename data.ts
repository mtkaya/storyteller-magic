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
    characterEn: 'Riku',
    characterTr: 'Riku',
    companionEn: 'Henna the hedgehog',
    companionTr: 'kirpi Henna',
    placeEn: 'the lantern-lit forest tea grove',
    placeTr: 'fenerli orman çay korusunda',
    questEn: 'gather all forest friends for a surprise welcome tea before the fireflies dim',
    questTr: 'ateşböcekleri kararmadan tüm orman dostlarını sürpriz karşılama çayı için bir araya getirmek',
    moralEn: 'A warm welcome turns strangers into friends.',
    moralTr: 'Sıcak bir karşılama yabancıları dosta çevirir.',
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
    characterEn: 'Coral',
    characterTr: 'Coral',
    companionEn: 'the moonlit seahorse',
    companionTr: 'ay ışıklı denizatı',
    placeEn: 'the glowing seahorse grotto',
    placeTr: 'parlayan denizatı mağarası',
    questEn: 'find the lost tidal melody before the silver tide turns',
    questTr: 'gümüş gelgit dönmeden kayıp gelgit ezgisini bulmak',
    moralEn: 'Soft rhythms guide us safely through change.',
    moralTr: 'Yumuşak ritimler bizi değişimden güvenle geçirir.',
    coverUrl: IMAGES.MAGICAL_SEAHORSE_GLOW,
  },
  {
    key: 'cloud-blanket',
    theme: 'Calm',
    characterEn: 'Bruno the bear cub',
    characterTr: 'ayı yavrusu Bruno',
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
    characterEn: 'Nova',
    characterTr: 'Nova',
    companionEn: 'Lumo the rocket friend',
    companionTr: 'roket dostu Lumo',
    placeEn: 'the starlit launch garden',
    placeTr: 'yıldızlı kalkış bahçesi',
    questEn: 'collect glowing wish sparks before the stars fade',
    questTr: 'yıldızlar sönmeden önce parlayan dilek kıvılcımlarını toplamak',
    moralEn: 'Wonder grows when courage and curiosity travel together.',
    moralTr: 'Hayranlık, cesaret ve merak birlikte yol alınca büyür.',
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
  {
    key: 'scroll-tower',
    theme: 'Wisdom',
    characterEn: 'Sage',
    characterTr: 'Sage',
    companionEn: 'parrot Echo',
    companionTr: 'papağan Echo',
    placeEn: 'the ancient scroll tower',
    placeTr: 'antik tomar kulesi',
    questEn: 'decode three riddles before sunrise',
    questTr: 'güneş doğmadan üç bilmeceyi çözmek',
    moralEn: 'True wisdom comes from thinking together.',
    moralTr: 'Gerçek bilgelik, birlikte düşünmekten gelir.',
    coverUrl: IMAGES.WISE_OWL,
  },
  {
    key: 'shadow-garden',
    theme: 'Mystery',
    characterEn: 'Luna',
    characterTr: 'Luna',
    companionEn: 'cat Shadow',
    companionTr: 'kedi Shadow',
    placeEn: 'the midnight garden',
    placeTr: 'gece yarısı bahçesi',
    questEn: 'discover who painted the silver flowers',
    questTr: 'gümüş çiçekleri kimin boyadığını keşfetmek',
    moralEn: 'Mysteries reveal themselves to patient hearts.',
    moralTr: 'Gizemler, sabırlı kalplere kendini gösterir.',
    coverUrl: IMAGES.DETECTIVE_MOUSE,
  },
  {
    key: 'honey-stream',
    theme: 'Kindness',
    characterEn: 'Bea',
    characterTr: 'Bea',
    companionEn: 'bee Buzzy',
    companionTr: 'arı Buzzy',
    placeEn: 'the honey stream valley',
    placeTr: 'bal akıntısı vadisi',
    questEn: 'share sweet treats with all forest friends',
    questTr: 'tüm orman dostlarıyla tatlı ikramları paylaşmak',
    moralEn: 'Sharing sweetness makes the whole world warmer.',
    moralTr: 'Tatlılığı paylaşmak, tüm dünyayı ısıtır.',
    coverUrl: IMAGES.MAGICAL_DANDELION_WISH,
  },
  {
    key: 'crystal-cave',
    theme: 'Wonder',
    characterEn: 'Spark',
    characterTr: 'Spark',
    companionEn: 'firefly Glimmer',
    companionTr: 'ateşböceği Glimmer',
    placeEn: 'the singing crystal cave',
    placeTr: 'şarkı söyleyen kristal mağara',
    questEn: 'awaken the sleeping music stones',
    questTr: 'uyuyan müzik taşlarını uyandırmak',
    moralEn: 'Wonder lives in the tiniest beautiful sounds.',
    moralTr: 'Hayranlık, en küçük güzel seslerde yaşar.',
    coverUrl: IMAGES.ENCHANTED_FOREST_GLOW,
  },
  {
    key: 'family-nest',
    theme: 'Family',
    characterEn: 'Robin',
    characterTr: 'Robin',
    companionEn: 'mother bird Cora',
    companionTr: 'anne kuş Cora',
    placeEn: 'the cozy oak nest',
    placeTr: 'sıcacık meşe yuvası',
    questEn: 'prepare a warm home before the storm',
    questTr: 'fırtınadan önce sıcak bir yuva hazırlamak',
    moralEn: 'Family means building safety together.',
    moralTr: 'Aile, birlikte güvenlik inşa etmek demektir.',
    coverUrl: IMAGES.BUNNY_NEST,
  },
  {
    key: 'elder-oak',
    theme: 'Wisdom',
    characterEn: 'Willow',
    characterTr: 'Willow',
    companionEn: 'turtle Elder',
    companionTr: 'kaplumbağa Elder',
    placeEn: 'the whispering elder oak',
    placeTr: 'fısıldayan yaşlı meşe',
    questEn: 'learn the three old forest secrets',
    questTr: 'ormanın üç eski sırrını öğrenmek',
    moralEn: 'The oldest voices teach the gentlest lessons.',
    moralTr: 'En yaşlı sesler, en nazik dersleri öğretir.',
    coverUrl: IMAGES.ENCHANTED_OLD_TREE,
  },
  {
    key: 'footprint-trail',
    theme: 'Mystery',
    characterEn: 'Scout',
    characterTr: 'Scout',
    companionEn: 'raccoon Rascal',
    companionTr: 'rakun Rascal',
    placeEn: 'the hidden footprint trail',
    placeTr: 'gizli ayak izi patikası',
    questEn: 'follow glowing paw prints to a lost treasure',
    questTr: 'parlayan pati izlerini takip edip kayıp hazineyi bulmak',
    moralEn: 'Every clue leads to a new discovery.',
    moralTr: 'Her ipucu, yeni bir keşfe götürür.',
    coverUrl: IMAGES.MAGIC_CHEST,
  },
  {
    key: 'blanket-fort',
    theme: 'Family',
    characterEn: 'Max',
    characterTr: 'Max',
    companionEn: 'sister Lily',
    companionTr: 'kız kardeş Lily',
    placeEn: 'the pillow blanket fort',
    placeTr: 'yastık battaniye kalesi',
    questEn: 'create a cozy hideout for story time',
    questTr: 'hikaye zamanı için rahat bir sığınak yaratmak',
    moralEn: 'Home is wherever loved ones gather.',
    moralTr: 'Ev, sevdiklerimizin toplandığı yerdir.',
    coverUrl: IMAGES.PILLOW_BATTLE,
  },
  {
    key: 'starlight-pond',
    theme: 'Kindness',
    characterEn: 'Pearl',
    characterTr: 'Pearl',
    companionEn: 'swan Grace',
    companionTr: 'kuğu Grace',
    placeEn: 'the starlight reflection pond',
    placeTr: 'yıldız ışığı yansıma gölü',
    questEn: 'help tired travelers find rest by the water',
    questTr: 'yorgun yolculara su kenarında dinlenme yeri bulmalarına yardım etmek',
    moralEn: 'A kind gesture ripples far beyond the moment.',
    moralTr: 'İyi bir jest, o andan çok uzağa dalgalanır.',
    coverUrl: IMAGES.SERENE_LOTUS_MOONWATER,
  },
  {
    key: 'balloon-voyage',
    theme: 'Wonder',
    characterEn: 'Sky',
    characterTr: 'Sky',
    companionEn: 'cloud friend Nimbus',
    companionTr: 'bulut arkadaşı Nimbus',
    placeEn: 'the floating balloon harbor',
    placeTr: 'yüzen balon limanı',
    questEn: 'collect star dust before the night ends',
    questTr: 'gece bitmeden yıldız tozu toplamak',
    moralEn: 'The best adventures lift us higher together.',
    moralTr: 'En iyi maceralar, bizi birlikte yükseltir.',
    coverUrl: IMAGES.HOT_AIR_BALLOON_STARS,
  },
  // ===== NEW SEEDS: Seasons, Space, Ocean, Folklore =====
  {
    key: 'autumn-maple',
    theme: 'Nature',
    characterEn: 'Maple the Autumn Fox',
    characterTr: 'Sonbahar Tilkisi Maple',
    companionEn: 'Hazel the squirrel',
    companionTr: 'sincap Hazel',
    placeEn: 'the golden leaf grove',
    placeTr: 'altın yapraklı koru',
    questEn: 'gather falling leaves to prepare the forest for winter',
    questTr: 'ormanı kışa hazırlamak için düşen yaprakları toplamak',
    moralEn: 'Every season teaches us to let go gently.',
    moralTr: 'Her mevsim bize nazikçe bırakmayı öğretir.',
    coverUrl: IMAGES.COZY_FOX,
  },
  {
    key: 'winter-owl',
    theme: 'Wisdom',
    characterEn: 'Sage the Winter Owl',
    characterTr: 'Kış Baykuşu Sage',
    companionEn: 'Frost the white rabbit',
    companionTr: 'beyaz tavşan Frost',
    placeEn: 'the snow-covered pine library',
    placeTr: 'karla kaplı çam kütüphanesi',
    questEn: 'find the lost winter stories before the first thaw',
    questTr: 'ilk erime başlamadan kayıp kış hikayelerini bulmak',
    moralEn: 'Winter whispers teach us to listen quietly.',
    moralTr: 'Kışın fısıltıları, sessizce dinlemeyi öğretir.',
    coverUrl: IMAGES.WISE_OWL,
  },
  {
    key: 'spring-bunny',
    theme: 'Friendship',
    characterEn: 'Clover the Spring Bunny',
    characterTr: 'Bahar Tavşanı Clover',
    companionEn: 'Robin the songbird',
    companionTr: 'ötücü kuş Robin',
    placeEn: 'the blooming meadow',
    placeTr: 'çiçek açan çayır',
    questEn: 'wake sleeping flowers with gentle morning songs',
    questTr: 'uyuyan çiçekleri nazik sabah şarkılarıyla uyandırmak',
    moralEn: 'New beginnings bloom with patient care.',
    moralTr: 'Yeni başlangıçlar, sabırlı özenle çiçek açar.',
    coverUrl: IMAGES.BUNNY_NEST,
  },
  {
    key: 'summer-firefly',
    theme: 'Wonder',
    characterEn: 'Glow the Summer Firefly',
    characterTr: 'Yaz Ateşböceği Glow',
    companionEn: 'Cricket the musician',
    companionTr: 'müzisyen Cırcırböceği',
    placeEn: 'the warm twilight field',
    placeTr: 'sıcak alacakaranlık tarlası',
    questEn: 'conduct the firefly symphony under the stars',
    questTr: 'yıldızlar altında ateşböceği senfonisini yönetmek',
    moralEn: 'Our light shines brightest when we glow together.',
    moralTr: 'Işığımız, birlikte parladığımızda en parlaktır.',
    coverUrl: IMAGES.ENCHANTED_FOREST_GLOW,
  },
  {
    key: 'space-bunny',
    theme: 'Adventure',
    characterEn: 'Cosmo the Star Bunny',
    characterTr: 'Yıldız Tavşanı Cosmo',
    companionEn: 'Orbit the moon pup',
    companionTr: 'ay köpeği Orbit',
    placeEn: 'the comet landing field',
    placeTr: 'kuyruklu yıldız iniş alanı',
    questEn: 'welcome the visiting comet with lanterns and warm wishes',
    questTr: 'ziyaret eden kuyruklu yıldızı fenerler ve sıcak dileklerle karşılamak',
    moralEn: 'Even the stars need a friendly welcome home.',
    moralTr: 'Yıldızlar bile dostça bir karşılamaya ihtiyaç duyar.',
    coverUrl: IMAGES.FRIENDLY_ROCKET_STARS,
  },
  {
    key: 'space-explorer',
    theme: 'Courage',
    characterEn: 'Nova the Space Mouse',
    characterTr: 'Uzay Faresi Nova',
    companionEn: 'Stella the star sprite',
    companionTr: 'yıldız perisi Stella',
    placeEn: 'the nebula playground',
    placeTr: 'nebula oyun alanı',
    questEn: 'navigate through the asteroid field to deliver messages',
    questTr: 'mesajları ulaştırmak için asteroid alanından geçmek',
    moralEn: 'Courage grows in the dark when friends light the way.',
    moralTr: 'Cesaret, dostlar yolu aydınlattığında karanlıkta büyür.',
    coverUrl: IMAGES.SMILING_CRESCENT_MOON_STARS,
  },
  {
    key: 'space-telescope',
    theme: 'Wonder',
    characterEn: 'Jupiter the Stargazer Cat',
    characterTr: 'Yıldız Gözlemcisi Kedi Jupiter',
    companionEn: 'Twinkle the comet',
    companionTr: 'kuyruklu yıldız Twinkle',
    placeEn: 'the observatory cloud',
    placeTr: 'gözlemevi bulutu',
    questEn: 'chart new constellations for tomorrow\'s dreamers',
    questTr: 'yarının hayalperestleri için yeni takımyıldızlar çizmek',
    moralEn: 'Wonder begins when we look up together.',
    moralTr: 'Hayranlık, birlikte gökyüzüne baktığımızda başlar.',
    coverUrl: IMAGES.MAGICAL_TOWER_STARS,
  },
  {
    key: 'ocean-pearl',
    theme: 'Nature',
    characterEn: 'Pearl the Coral Fish',
    characterTr: 'Mercan Balığı Pearl',
    companionEn: 'Shimmer the jellyfish',
    companionTr: 'denizanası Shimmer',
    placeEn: 'the glowing coral garden',
    placeTr: 'parlayan mercan bahçesi',
    questEn: 'restore light to the fading coral reef',
    questTr: 'solan mercan resifine ışığı geri vermek',
    moralEn: 'Every creature\'s light helps the ocean glow.',
    moralTr: 'Her canlının ışığı, okyanusun parlamasına yardım eder.',
    coverUrl: IMAGES.MAGICAL_SEAHORSE_GLOW,
  },
  {
    key: 'ocean-turtle',
    theme: 'Wisdom',
    characterEn: 'Anchor the Sea Turtle',
    characterTr: 'Deniz Kaplumbağası Anchor',
    companionEn: 'Bubbles the seahorse',
    companionTr: 'denizatı Bubbles',
    placeEn: 'the ancient tide pools',
    placeTr: 'antik gelgit havuzları',
    questEn: 'teach young fish the old ocean songs',
    questTr: 'genç balıklara eski okyanus şarkılarını öğretmek',
    moralEn: 'Wisdom flows like water, from old to young.',
    moralTr: 'Bilgelik su gibi akar, yaşlıdan gence.',
    coverUrl: IMAGES.GENTLE_WHALE_NIGHTSKY,
  },
  {
    key: 'ocean-dolphin',
    theme: 'Friendship',
    characterEn: 'Wave the Dolphin',
    characterTr: 'Yunus Wave',
    companionEn: 'Splash the otter',
    companionTr: 'su samuru Splash',
    placeEn: 'the moonlit bay',
    placeTr: 'mehtaplı koy',
    questEn: 'guide lost sailors safely to shore with songs',
    questTr: 'kayıp denizcileri şarkılarla güvenle kıyıya yönlendirmek',
    moralEn: 'True friends guide each other through any storm.',
    moralTr: 'Gerçek dostlar, her fırtınada birbirlerine rehberlik eder.',
    coverUrl: IMAGES.SERENE_LOTUS_MOONWATER,
  },
  {
    key: 'folklore-fox',
    theme: 'Magic',
    characterEn: 'Ember the Folk Fox',
    characterTr: 'Halk Tilkisi Ember',
    companionEn: 'Whisper the forest spirit',
    companionTr: 'orman ruhu Whisper',
    placeEn: 'the enchanted storytelling circle',
    placeTr: 'büyülü hikaye anlatma çemberi',
    questEn: 'collect forgotten tales from the old trees',
    questTr: 'yaşlı ağaçlardan unutulmuş masalları toplamak',
    moralEn: 'Old stories hold the keys to new wisdom.',
    moralTr: 'Eski hikayeler, yeni bilgeliğin anahtarlarını tutar.',
    coverUrl: IMAGES.ENCHANTED_OLD_TREE,
  },
  {
    key: 'folklore-raven',
    theme: 'Mystery',
    characterEn: 'Midnight the Folklore Raven',
    characterTr: 'Halk Kuzgunı Midnight',
    companionEn: 'Echo the wind chime',
    companionTr: 'rüzgar çanı Echo',
    placeEn: 'the moonlit stone circle',
    placeTr: 'mehtaplı taş çember',
    questEn: 'solve the riddle carved in ancient stones',
    questTr: 'antik taşlara oyulmuş bilmeceyi çözmek',
    moralEn: 'Ancient riddles reveal truths to patient seekers.',
    moralTr: 'Antik bilmeceler, sabırlı arayanlara gerçeği gösterir.',
    coverUrl: IMAGES.DETECTIVE_MOUSE,
  },
  {
    key: 'folklore-deer',
    theme: 'Kindness',
    characterEn: 'Fawn the Folk Deer',
    characterTr: 'Halk Geyiği Fawn',
    companionEn: 'Bramble the hedgehog',
    companionTr: 'kirpi Bramble',
    placeEn: 'the sacred grove',
    placeTr: 'kutsal koru',
    questEn: 'bless travelers with safe passage through the woods',
    questTr: 'yolculara ormanda güvenli geçiş sağlamak',
    moralEn: 'Kindness blesses both the giver and receiver.',
    moralTr: 'İyilik, hem verene hem de alana bereket getirir.',
    coverUrl: IMAGES.GRATEFUL_DEER,
  },
  {
    key: 'folklore-hare',
    theme: 'Courage',
    characterEn: 'Moon the Folklore Hare',
    characterTr: 'Halk Tavşanı Moon',
    companionEn: 'Thorn the bramble keeper',
    companionTr: 'diken bekçisi Thorn',
    placeEn: 'the mist-covered moor',
    placeTr: 'sisle kaplı bozkır',
    questEn: 'carry lanterns to guide night travelers home',
    questTr: 'gece yolcularına eve giden yolu göstermek için fener taşımak',
    moralEn: 'Small lights in darkness guide the bravest hearts.',
    moralTr: 'Karanlıktaki küçük ışıklar, en cesur kalplere yol gösterir.',
    coverUrl: IMAGES.ORNATE_MAGICAL_LANTERN,
  },
  {
    key: 'autumn-hedgehog',
    theme: 'Family',
    characterEn: 'Rustle the Autumn Hedgehog',
    characterTr: 'Sonbahar Kirpisi Rustle',
    companionEn: 'Acorn the chipmunk',
    companionTr: 'sincap Acorn',
    placeEn: 'the harvest burrow',
    placeTr: 'hasat ini',
    questEn: 'prepare the family den with warm supplies for winter',
    questTr: 'aile inini kış için sıcak malzemelerle hazırlamak',
    moralEn: 'Family warmth begins with shared preparation.',
    moralTr: 'Aile sıcaklığı, birlikte hazırlıkla başlar.',
    coverUrl: IMAGES.COZY_TREEHOUSE_NIGHT,
  },
  // ===== NEW INTERACTIVE SEEDS (10) =====
  {
    key: 'frost-castle',
    theme: 'Adventure',
    characterEn: 'Frost the Ice Fox',
    characterTr: 'Buz Tilkisi Frost',
    companionEn: 'Snowdrop the white owl',
    companionTr: 'beyaz baykuş Snowdrop',
    placeEn: 'the frozen crystal castle',
    placeTr: 'donmuş kristal kale',
    questEn: 'unlock the winter gate before the last snowflake falls',
    questTr: 'son kar tanesi düşmeden kış kapısını açmak',
    moralEn: 'Every key appears when we search with patience.',
    moralTr: 'Her anahtar, sabırla aradığımızda görünür.',
    coverUrl: IMAGES.FAIRY_CASTLE_MOONLIGHT,
  },
  {
    key: 'spring-bloom',
    theme: 'Friendship',
    characterEn: 'Petal the Spring Butterfly',
    characterTr: 'Bahar Kelebeği Petal',
    companionEn: 'Breeze the hummingbird',
    companionTr: 'sinek kuşu Breeze',
    placeEn: 'the awakening garden',
    placeTr: 'uyanış bahçesi',
    questEn: 'invite all sleeping flowers to the first sunrise',
    questTr: 'tüm uyuyan çiçekleri ilk gün doğumuna davet etmek',
    moralEn: 'Friendship blooms when we invite everyone in.',
    moralTr: 'Dostluk, herkesi dahil ettiğimizde çiçek açar.',
    coverUrl: IMAGES.ENCHANTED_FOREST_GLOW,
  },
  {
    key: 'cosmic-compass',
    theme: 'Wonder',
    characterEn: 'Atlas the Space Bear',
    characterTr: 'Uzay Ayısı Atlas',
    companionEn: 'Pulsar the star guide',
    companionTr: 'yıldız rehberi Pulsar',
    placeEn: 'the spinning galaxy wheel',
    placeTr: 'dönen galaksi çarkı',
    questEn: 'navigate home using only starlight and courage',
    questTr: 'sadece yıldız ışığı ve cesareti kullanarak eve dönmek',
    moralEn: 'Wonder guides us home when we trust the journey.',
    moralTr: 'Hayranlık, yolculuğa güvendiğimizde bizi eve götürür.',
    coverUrl: IMAGES.VINTAGE_MAGIC_COMPASS,
  },
  {
    key: 'deep-trench',
    theme: 'Courage',
    characterEn: 'Marina the Deep Sea Fish',
    characterTr: 'Derin Deniz Balığı Marina',
    companionEn: 'Glow the anglerfish',
    companionTr: 'fener balığı Glow',
    placeEn: 'the midnight ocean trench',
    placeTr: 'gece yarısı okyanus çukuru',
    questEn: 'carry light through the darkest waters to help a friend',
    questTr: 'bir dosta yardım etmek için en karanlık sulardan ışık taşımak',
    moralEn: 'Courage shines brightest in the deepest dark.',
    moralTr: 'Cesaret, en derin karanlıkta en parlak ışıldar.',
    coverUrl: IMAGES.MAGICAL_SEAHORSE_GLOW,
  },
  {
    key: 'shadow-lantern',
    theme: 'Mystery',
    characterEn: 'Shade the Shadow Cat',
    characterTr: 'Gölge Kedisi Shade',
    companionEn: 'Flicker the candle sprite',
    companionTr: 'mum perisi Flicker',
    placeEn: 'the twilight alley',
    placeTr: 'alacakaranlık geçidi',
    questEn: 'find who lit the forgotten street lamps',
    questTr: 'unutulmuş sokak lambalarını kimin yaktığını bulmak',
    moralEn: 'Mysteries unfold gently to those who observe quietly.',
    moralTr: 'Gizemler, sessizce gözlemleyenlere nazikçe açılır.',
    coverUrl: IMAGES.ORNATE_MAGICAL_LANTERN,
  },
  {
    key: 'tide-song',
    theme: 'Kindness',
    characterEn: 'Tide the Singing Whale',
    characterTr: 'Şarkıcı Balina Tide',
    companionEn: 'Shell the hermit crab',
    companionTr: 'ermit yengeci Shell',
    placeEn: 'the echo cove',
    placeTr: 'yankı koyu',
    questEn: 'share healing songs with all who need comfort',
    questTr: 'rahatlığa ihtiyaç duyan herkesle şifa şarkıları paylaşmak',
    moralEn: 'Kind songs ripple far beyond the first note.',
    moralTr: 'İyi şarkılar, ilk notadan çok uzağa dalgalanır.',
    coverUrl: IMAGES.GENTLE_WHALE_NIGHTSKY,
  },
  {
    key: 'elder-story',
    theme: 'Wisdom',
    characterEn: 'Elder the Storytelling Bear',
    characterTr: 'Hikayeci Ayı Elder',
    companionEn: 'Quill the scribe mouse',
    companionTr: 'katip fare Quill',
    placeEn: 'the fireside story den',
    placeTr: 'şömine başı hikaye ini',
    questEn: 'collect and preserve three forgotten village tales',
    questTr: 'üç unutulmuş köy masalını toplamak ve korumak',
    moralEn: 'Wisdom lives in stories shared by firelight.',
    moralTr: 'Bilgelik, şömine ışığında paylaşılan hikayelerde yaşar.',
    coverUrl: IMAGES.ENCHANTED_OLD_TREE,
  },
  {
    key: 'harvest-moon',
    theme: 'Family',
    characterEn: 'Harvest the Autumn Squirrel',
    characterTr: 'Hasat Sincabı Harvest',
    companionEn: 'Berry the field mouse',
    companionTr: 'tarla faresi Berry',
    placeEn: 'the moonlit harvest field',
    placeTr: 'mehtaplı hasat tarlası',
    questEn: 'gather the last crops before the first frost',
    questTr: 'ilk don gelmeden son mahsulleri toplamak',
    moralEn: 'Family bonds grow strongest through shared harvest.',
    moralTr: 'Aile bağları, birlikte hasat yapınca en güçlü olur.',
    coverUrl: IMAGES.SMILING_CRESCENT_MOON_STARS,
  },
  {
    key: 'mirror-lake',
    theme: 'Wonder',
    characterEn: 'Ripple the Lake Spirit',
    characterTr: 'Göl Ruhu Ripple',
    companionEn: 'Lily the water strider',
    companionTr: 'su yüzeyici Lily',
    placeEn: 'the mirror lake',
    placeTr: 'ayna göl',
    questEn: 'reflect every star perfectly for the night ceremony',
    questTr: 'gece töreni için her yıldızı mükemmel yansıtmak',
    moralEn: 'Wonder reflects when we stand perfectly still.',
    moralTr: 'Hayranlık, tamamen hareketsiz durduğumuzda yansır.',
    coverUrl: IMAGES.SERENE_LOTUS_MOONWATER,
  },
  {
    key: 'comet-trail',
    theme: 'Magic',
    characterEn: 'Comet the Star Rider',
    characterTr: 'Yıldız Sürücüsü Comet',
    companionEn: 'Spark the constellation fox',
    companionTr: 'takımyıldız tilkisi Spark',
    placeEn: 'the comet path station',
    placeTr: 'kuyruklu yıldız yolu istasyonu',
    questEn: 'guide lost starlight back to its constellation',
    questTr: 'kayıp yıldız ışığını takımyıldızına geri yönlendirmek',
    moralEn: 'Magic flows when we guide others back to their place.',
    moralTr: 'Sihir, başkalarını yerlerine geri yönlendirdiğimizde akar.',
    coverUrl: IMAGES.SMILING_CRESCENT_MOON_STARS,
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
    companion: seed.companionEn,
    place: seed.placeEn,
    ageRange: minutes <= 7 ? '3-6' : '4-8',
    moral: seed.moralEn,
    moralTr: seed.moralTr,
    content: [
      pickVaultValue([
        `${seed.characterEn} tiptoed into ${seed.placeEn} just as the first stars appeared, ${seed.companionEn} padding softly beside them.`,
        `The evening breeze carried ${seed.characterEn} toward ${seed.placeEn}, where ${seed.companionEn} was already waiting with a curious smile.`,
        `${seed.characterEn} arrived at ${seed.placeEn} one quiet evening, with ${seed.companionEn} close behind.`,
        `Under a violet sky, ${seed.characterEn} and ${seed.companionEn} found their way to ${seed.placeEn}, drawn by a faint golden glow.`,
        `${seed.characterEn} sat down at the edge of ${seed.placeEn}, breathing in the cool night air, while ${seed.companionEn} curled up nearby.`,
        `A gentle hum led ${seed.characterEn} through the twilight to ${seed.placeEn}, with ${seed.companionEn} hopping along the moonlit path.`,
      ], index + 7),
      `Their mission: ${seed.questEn} — and they set off ${toneEn} to make it happen.`,
      pickVaultValue([
        `They split the task into small steps and ticked each one off together.`,
        `An unexpected detour led them to a helpful stranger with just the clue they needed.`,
        `Halfway through, they found something even more valuable than the original goal.`,
        `Every obstacle turned out to be smaller than it looked when faced side by side.`,
        `They moved with care, double-checking each step before moving on.`,
        `A short rest gave them the idea that had been hiding just out of reach.`,
      ], index),
      pickVaultValue([
        `One sticky moment tested their patience — they breathed, thought it through, and found a way.`,
        `${seed.companionEn} spotted a detail ${seed.characterEn} had missed, and together they solved it.`,
        `When the easy path turned tricky, they chose the careful one without hesitation.`,
        `A tired friend needed help; they stopped, helped, and felt the whole mission lift.`,
        `They hit a wall — but ${seed.characterEn} remembered the moral, and it pointed the way.`,
        `Patience was the hardest part, but the right moment came, and they were ready.`,
      ], index + 2),
      `The work was done, ${seed.placeEn} felt warmer, and every small effort had added up.`,
      `By bedtime, they were home — ${endingEn}, and a little wiser.`,
    ],
    contentTr: [
      pickVaultValue([
        `${seed.characterTr}, ilk yıldızlar belirirken ${seed.placeTr}'ye sessizce süzüldü; ${seed.companionTr} yanında usulca ilerliyordu.`,
        `Akşam esintisi ${seed.characterTr}'yı ${seed.placeTr}'ye taşıdı; ${seed.companionTr} meraklı bir gülümsemeyle çoktan oradaydı.`,
        `${seed.characterTr}, sakin bir akşam ${seed.placeTr}'ye ulaştı; ${seed.companionTr} de hemen arkasındaydı.`,
        `Menekşe rengi gökyüzünün altında ${seed.characterTr} ve ${seed.companionTr}, soluk altın bir parıltının peşinde ${seed.placeTr}'ye vardı.`,
        `${seed.characterTr}, ${seed.placeTr}'nin kenarına oturdu ve serin gece havasını içine çekti; ${seed.companionTr} yanı başına kıvrıldı.`,
        `Hafif bir mırıltı, ${seed.characterTr}'yı alacakaranlıkta ${seed.placeTr}'ye götürdü; ${seed.companionTr} ay ışıklı patikada zıplayarak eşlik etti.`,
      ], index + 7),
      `Görevleri: ${seed.questTr} — ve ${toneTr} harekete geçtiler.`,
      pickVaultValue([
        `Görevi küçük adımlara böldüler ve her birini birlikte tamamladılar.`,
        `Beklenmedik bir sapma onları tam ihtiyaçları olan ipucunu bilen yardımsever birine götürdü.`,
        `Yarı yolda asıl hedeften de değerli bir şey buldular.`,
        `Yan yana durulduğunda her engel göründüğünden çok daha küçük çıktı.`,
        `Özenle ilerlediler; bir sonraki adıma geçmeden önce her şeyi iki kez kontrol ettiler.`,
        `Kısa bir mola, tam aradıkları fikri gün yüzüne çıkardı.`,
      ], index),
      pickVaultValue([
        `Zor bir an sabırlarını test etti — derin bir nefes aldılar, düşündüler ve bir yol buldular.`,
        `${seed.companionTr}, ${seed.characterTr}'nın gözden kaçırdığı bir ayrıntı fark etti; birlikte çözdüler.`,
        `Kolay yol zorlaşınca tereddütsüz daha dikkatli olanı seçtiler.`,
        `Yorgun bir dost yardım istedi; durdular, yardım ettiler ve görevin tüm ağırlığının kalktığını hissettiler.`,
        `${seed.characterTr} tıkandı — ama aklına gelen ders doğru yönü gösterdi.`,
        `Sabretmek en zoruydu; ama doğru an geldi ve hazır buldular kendilerini.`,
      ], index + 2),
      `İş tamamlandı, ${seed.placeTr} daha sıcak hissettiriyordu ve her küçük çaba büyük bir anlam taşıyordu.`,
      `Uyku vakti geldiğinde evdeydiler — ${endingTr} ve biraz daha bilge.`,
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
    companion: seed.companionEn,
    place: seed.placeEn,
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

// RECENT_STORIES: derived from VAULT_LINEAR_STORIES (single source of truth)
export const RECENT_STORIES: Story[] = VAULT_LINEAR_STORIES.slice(0, 3);

export const LIBRARY_STORIES: Story[] = [
  // New Stories with Full Content
  {
    id: '14',
    title: 'Detective Mouse',
    titleTr: 'Dedektif Fare',
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
    titleTr: 'Cesur Aslan Yavrusu',
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
    titleTr: 'Uykucu Baykuşun Kütüphanesi',
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
    titleTr: 'Bıyık ve Altın Hazine',
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
    titleTr: 'Bilge Baykuşun Sırrı',
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
    titleTr: 'Bıyık ve Hazine',
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
    titleTr: 'Büyülü Çay Partisi',
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
    titleTr: 'Penny\'nin Büyük Gösterisi',
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
    titleTr: 'Kurt ve Ay Prensesi',
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
    titleTr: 'Dinleyen Fener',
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
    titleTr: 'Bobo ve Bulut Battaniye',
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
    titleTr: 'Kaptan Çakıl\'ın Yıldız Roketi',
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
    titleTr: 'Luna ve Denizatı Şarkısı',
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
    titleTr: 'Ağaç Ev Sözü',
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
    titleTr: 'İyilik Pusulası',
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
    titleTr: 'Uyuyan Vadi Üzerinde Balon',
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
    titleTr: 'Sessiz Taçlar Kalesi',
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
    titleTr: 'Kule ve Düşen Yıldız',
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
    titleTr: 'İyi Geceler, Gülen Ay',
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
    titleTr: 'Küçük Dalgaların Deniz Feneri',
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
    titleTr: 'Yıldız Işığı Taşıyan Balina',
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
    titleTr: 'Ateşböceği Orman Pikniği',
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
    titleTr: 'Yaşlı Ağacın Fener Yaprakları',
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
    titleTr: 'Karahindiba Dileği',
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
    titleTr: 'Nilüfer Gölü Nefesi',
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
  // =====================================================
  // NEW ORIGINAL STORIES (Inspired by classic structures)
  // =====================================================
  {
    id: '41',
    title: 'How the Hedgehog Found His Stars',
    titleTr: 'Kirpi Yıldızlarını Nasıl Buldu',
    subtitle: 'Wonder • Nature',
    duration: '8 min',
    theme: 'Nature',
    coverUrl: '/images/generated/nature/nature-scene-01-opening.jpg',
    character: 'Çıtır the Hedgehog',
    ageRange: '3-7',
    moral: 'Even the smallest creature can carry a light inside.',
    content: [
      "Çıtır was a tiny hedgehog who lived under a mossy log in the Great Garden. Every night, he watched the fireflies dance above him, their golden lights swirling like tiny stars.",
      "\"Why can't I glow like you?\" Çıtır asked the fireflies one evening. They giggled and twirled away without answering.",
      "Feeling sad, Çıtır rolled into a ball. But something strange happened — his quills caught the moonlight and sparkled like a hundred tiny mirrors.",
      "A baby rabbit hopping by stopped and gasped. \"Oh! You're covered in stars!\"",
      "Çıtır unrolled slowly. \"Stars? These are just my prickly quills.\"",
      "\"No, no!\" the rabbit insisted. \"When you curl up under the moon, you shimmer! You're the most beautiful thing in the garden!\"",
      "That night, all the small animals gathered to watch Çıtır's moonlight show. The moles, the field mice, even the shy little snails came out.",
      "Çıtır rolled and unrolled, and each time, his quills caught the light differently — silver, then gold, then soft blue.",
      "The fireflies landed on his back, adding their own glow to his. Together, they made the most wonderful display the garden had ever seen.",
      "\"I spent so long wishing I could be like someone else,\" Çıtır whispered to the moon, \"that I almost missed what made me special.\"",
      "From that night on, Çıtır never felt plain again. He was the hedgehog who carried stars on his back.",
      "And if you ever walk through a garden at night and see something sparkle near the ground — it might just be Çıtır, dancing in the moonlight."
    ]
  },
  {
    id: '42',
    title: 'The Sloth Who Discovered Slowness',
    titleTr: 'Yavaşlığı Keşfeden Tembel Hayvan',
    subtitle: 'Calm • Wisdom',
    duration: '7 min',
    theme: 'Calm',
    coverUrl: '/images/generated/calm/calm-scene-01-opening.jpg',
    character: 'Uyku the Sloth',
    ageRange: '3-6',
    moral: 'Sometimes being slow means you notice things others miss.',
    content: [
      "Uyku the sloth hung upside down from his favorite branch. All the other animals were rushing past him — monkeys swinging, parrots flying, ants marching in a hurry.",
      "\"Uyku, you're so slow!\" laughed the monkey. \"You'll miss everything!\"",
      "But Uyku just smiled his gentle smile. Because from up here, hanging still, he could see things nobody else noticed.",
      "He saw the tiny spider weaving a web that looked like lace. He watched a caterpillar wrap itself in silk, preparing for its big change.",
      "He noticed that the clouds above made shapes — a rabbit, then a ship, then a sleeping dragon.",
      "One day, all the animals lost a baby toucan. They searched everywhere — running, flying, diving — but couldn't find her.",
      "Uyku stayed on his branch and simply watched. And because he was still, he heard a tiny chirping sound from inside a hollow tree trunk.",
      "\"She's in there,\" Uyku said softly, pointing with one slow claw.",
      "The animals found the baby toucan, safe and warm, inside the trunk. \"How did you find her?\" they asked in amazement.",
      "\"I was slow enough to listen,\" Uyku replied.",
      "That evening, as the sun set in orange and pink, the monkey sat beside Uyku on his branch. They hung together in silence, watching the colors change.",
      "\"This is nice,\" the monkey whispered. \"Being slow.\"",
      "Uyku smiled. \"Welcome to my world.\""
    ]
  },
  {
    id: '43',
    title: 'Captain Frog and the Rainy Day Voyage',
    titleTr: 'Kaptan Kurbağa ve Yağmurlu Gün Yolculuğu',
    subtitle: 'Adventure • Friendship',
    duration: '9 min',
    theme: 'Adventure',
    coverUrl: '/images/generated/adventure/adventure-scene-01-opening.jpg',
    character: 'Captain Zıp',
    ageRange: '4-8',
    moral: 'The best adventures happen when plans change.',
    content: [
      "Captain Zıp was the bravest frog in Lily Pad Pond. He wore a leaf hat and carried a twig sword, and every sunny day he sailed his walnut-shell boat across the water.",
      "But today, dark clouds gathered. Rain began to fall — drip, drop, drip — and soon the pond was covered in ripples.",
      "\"My voyage is ruined!\" Captain Zıp groaned, pulling his leaf hat over his eyes.",
      "A small snail named Yavaş slid up beside him. \"Why is it ruined? Rain makes the water rise. You can sail to places you've never reached before!\"",
      "Captain Zıp peeked out from under his hat. The snail was right — the pond had expanded into the meadow, creating tiny rivers between the grass blades.",
      "\"All aboard!\" Captain Zıp shouted, suddenly excited. Yavaş climbed onto the walnut shell, and they sailed into the flooded meadow.",
      "They discovered a miniature waterfall cascading off a rock, a cave made from two fallen leaves, and a whirlpool around a dandelion stem.",
      "\"This is the greatest exploration ever!\" Captain Zıp declared, sketching a map on a flat pebble.",
      "They met a cricket stranded on a mushroom island. \"Help! I can't swim!\" she cried.",
      "Captain Zıp steered close. \"Hop on, sailor! No creature gets left behind on my watch.\"",
      "By evening, the rain stopped and the water slowly retreated. The three friends sat on the pond bank, watching a rainbow stretch across the sky.",
      "\"I was so upset about the rain,\" Captain Zıp admitted. \"But it gave us the best adventure we've ever had.\"",
      "Yavaş smiled. \"Sometimes the best plans are the ones you never made.\"",
      "Captain Zıp tipped his leaf hat. Tomorrow, rain or shine, he'd be ready for whatever came."
    ]
  },
  {
    id: '44',
    title: 'The Bear Who Couldn\'t Sleep',
    titleTr: 'Uyuyamayan Ayı',
    subtitle: 'Bedtime • Calm',
    duration: '7 min',
    theme: 'Calm',
    coverUrl: '/images/generated/calm/calm-scene-08-bedtime-ending.jpg',
    character: 'Tombul the Bear',
    ageRange: '2-5',
    moral: 'A calm heart is the softest pillow.',
    content: [
      "Winter was coming, and every bear in the forest was getting sleepy. One by one, they crawled into their caves, yawned big yawns, and fell fast asleep.",
      "Every bear except Tombul.",
      "Tombul tried lying on his left side. Then his right side. Then his back. Then his tummy. Nothing worked.",
      "\"I can't sleep!\" he announced to the quiet forest. An owl on a branch opened one eye.",
      "\"Have you tried counting acorns?\" the owl suggested.",
      "Tombul counted: one acorn, two acorns, three acorns... but then he got hungry and wanted to eat the acorns.",
      "A deer passing by said, \"Try listening to the snow fall.\" Tombul listened. The snow made the tiniest sound — like someone whispering shhhh.",
      "It was nice, but he still couldn't sleep.",
      "Then a little mouse crept up to his cave. \"Mr. Bear, can I sleep here? My hole is too cold.\"",
      "\"Of course,\" Tombul said, making room. The mouse curled up against his warm belly.",
      "The mouse's tiny breathing was so soft, so steady — in and out, in and out — that Tombul found himself breathing along.",
      "In... and out. In... and out.",
      "His eyelids grew heavy. The sound of the snow and the mouse's gentle breath mixed together into the most perfect lullaby.",
      "\"Goodnight, little mouse,\" Tombul murmured.",
      "And finally — at last — the big bear fell into the deepest, warmest, most wonderful sleep of the whole winter."
    ]
  },
  {
    id: '45',
    title: 'The Ladder to the Moon',
    titleTr: 'Aya Uzanan Merdiven',
    subtitle: 'Wonder • Courage',
    duration: '8 min',
    theme: 'Wonder',
    coverUrl: '/images/generated/wonder/wonder-scene-01-opening.jpg',
    character: 'Elif',
    ageRange: '4-7',
    moral: 'Reaching for the impossible teaches you what you are truly capable of.',
    content: [
      "Elif lived in a small village where the houses had red roofs and the gardens grew sunflowers taller than grown-ups.",
      "Every night, she sat on her roof and stared at the moon. \"It looks so lonely up there,\" she thought. \"I should visit.\"",
      "So Elif decided to build a ladder. She started with two sticks and a piece of rope from her grandmother's garden.",
      "\"You can't build a ladder to the moon!\" her older brother laughed.",
      "\"Maybe not,\" Elif said, \"but I can try.\"",
      "Each day she added more — branches, planks from an old fence, bamboo sticks her neighbor didn't need anymore.",
      "Something magical happened. The village started helping. The carpenter brought extra wood. The baker gave her strong twine. Even her brother held the ladder while she climbed to add new steps.",
      "The ladder grew taller than the sunflowers. Taller than the houses. Taller than the old oak tree on the hill.",
      "Of course, it never reached the moon. But from the very top, Elif could see something she'd never seen before — the entire valley lit by moonlight, silver and shimmering, stretching to the mountains.",
      "\"It's the most beautiful thing I've ever seen,\" she whispered.",
      "She climbed down and told the village. One by one, every person climbed the ladder to see the view. Even her brother, who cried a little because it was so beautiful.",
      "The ladder became the village's favorite place. On clear nights, families would climb up, sit on the top steps, and watch the moon together.",
      "Elif never reached the moon. But she had brought the moon a little closer to everyone.",
      "And sometimes, on very still nights, she swore the moon winked at her — as if to say, \"Thank you for trying.\""
    ]
  },
  {
    id: '46',
    title: 'The Fox Who Collected Words',
    titleTr: 'Kelime Toplayan Tilki',
    subtitle: 'Wisdom • Kindness',
    duration: '8 min',
    theme: 'Wisdom',
    coverUrl: '/images/generated/wisdom/wisdom-scene-01-opening.jpg',
    character: 'Sözcük the Fox',
    ageRange: '4-8',
    moral: 'Kind words, once given, grow into something beautiful.',
    content: [
      "In the Whispering Woods, there lived a fox named Sözcük who collected words. Not just any words — only the beautiful ones.",
      "She kept them in glass jars on her shelf. \"Merhamet\" glowed soft blue. \"Umut\" shimmered like gold dust. \"Sevgi\" was warm pink and hummed quietly.",
      "Other animals thought she was strange. \"Why collect words? You can't eat them!\" the badger scoffed.",
      "But Sözcük knew something the others didn't. Words had power.",
      "One rainy morning, a young deer came to her door, crying. \"Everyone says I'm clumsy because I keep tripping over my long legs.\"",
      "Sözcük opened a jar labeled \"Zarif\" — grace. She whispered the word to the deer, and something changed in his eyes. He stood a little taller.",
      "\"That word is yours now,\" Sözcük said. \"Carry it with you.\"",
      "The deer walked home without tripping once.",
      "A sad old turtle visited next. \"I feel invisible. Nobody notices me anymore.\"",
      "Sözcük gave him \"Değerli\" — precious. The turtle's shell seemed to shine as he carried the word away.",
      "Word spread through the forest. Animals came from everywhere — the anxious rabbit got \"Cesur\" (brave), the lonely crow got \"Arkadaş\" (friend).",
      "One day, Sözcük looked at her shelf. All the jars were empty.",
      "She felt a moment of worry. But then she stepped outside — and the forest was transformed. Animals walked taller, spoke kinder, smiled more.",
      "Her words hadn't disappeared. They had been planted, and now they were growing everywhere.",
      "That night, a jar appeared on her doorstep. Inside was a new word, glowing every color at once: \"Teşekkür\" — thank you.",
      "Sözcük placed it on her shelf and smiled. The most beautiful word of all."
    ]
  },
  {
    id: '47',
    title: 'The Night the Stars Fell',
    titleTr: 'Yıldızların Düştüğü Gece',
    subtitle: 'Magic • Family',
    duration: '9 min',
    theme: 'Magic',
    coverUrl: '/images/generated/magic/magic-scene-01-opening.jpg',
    character: 'Yıldız and Dede',
    ageRange: '3-7',
    moral: 'The people who love us are our brightest stars.',
    content: [
      "Little Yıldız loved staying at her grandfather's house in the mountains. Dede had a wooden porch where they sat every evening and counted stars.",
      "\"Dede, what happens if a star falls?\" Yıldız asked one night.",
      "\"Well,\" Dede said, stroking his white beard, \"fallen stars turn into fireflies. That's why they glow — they still remember being stars.\"",
      "Yıldız's eyes went wide. \"Really?\"",
      "Dede winked. \"Let's find out. Tonight is a special night.\"",
      "They wrapped themselves in a big wool blanket and waited. The sky was clear and endless, filled with more stars than anyone could count.",
      "Then it happened. One star streaked across the sky, leaving a trail of silver dust. Then another. And another!",
      "\"A meteor shower!\" Dede whispered. \"Make a wish for each one!\"",
      "Yıldız wished as fast as she could — a wish for her mother, one for her cat, one for her best friend, one for Dede.",
      "\"What did you wish for me?\" Dede asked.",
      "\"That we can do this every summer, forever and ever.\"",
      "Dede hugged her tight. \"That's the easiest wish to grant.\"",
      "As the shower faded, a single firefly appeared, blinking near the porch. Yıldız gasped.",
      "\"See?\" Dede said softly. \"A fallen star, come to say hello.\"",
      "Yıldız cupped the firefly gently in her hands. Its tiny light was warm against her palms.",
      "She released it into the garden, where it joined other fireflies dancing between the apple trees.",
      "Years later, whenever Yıldız missed her Dede, she would look for fireflies. And every time she found one, she felt his warm hand on hers and heard him whisper: \"The people who love us never really leave. They just become the lights that guide us home.\""
    ]
  },
  {
    id: '48',
    title: 'The Hippo Who Danced at Night',
    titleTr: 'Gece Dans Eden Su Aygırı',
    subtitle: 'Courage • Joy',
    duration: '7 min',
    theme: 'Courage',
    coverUrl: '/images/generated/courage/courage-scene-01-opening.jpg',
    character: 'Dansçı the Hippo',
    ageRange: '3-6',
    moral: 'Do what makes your heart sing, even if others don\'t understand.',
    content: [
      "Dansçı was a hippo with a secret. While all the other hippos slept in the cool river mud at night, Dansçı stayed awake.",
      "Because Dansçı loved to dance.",
      "Under the African moon, she would twirl and spin on the riverbank. Her big feet made soft thumping sounds on the earth — thump, thump, thumpity-thump.",
      "She danced with the crickets' song, with the owl's melody, with the gentle rhythm of the river flowing.",
      "But she always danced alone, because she was embarrassed. \"Hippos don't dance,\" she told herself. \"Everyone would laugh.\"",
      "One night, a baby elephant wandered down to the river and saw Dansçı mid-twirl.",
      "Dansçı froze. \"I was just... stretching,\" she said, her cheeks burning.",
      "\"That was beautiful!\" the baby elephant trumpeted. \"Can you teach me?\"",
      "\"But... hippos don't dance. And elephants definitely don't dance.\"",
      "\"Why not?\" the baby elephant asked. It was such a simple question that Dansçı couldn't find an answer.",
      "So she taught the baby elephant. Thump, thump, thumpity-thump. They stomped and spun under the stars.",
      "The noise woke a family of warthogs. Instead of laughing, they joined in. Then the zebras came. Then the giraffes — who danced very carefully because of their long necks.",
      "By midnight, half the savanna was dancing by the river. The moon seemed to bob along to the rhythm.",
      "Dansçı looked around at all the animals having the time of their lives, and she laughed — a deep, bubbly hippo laugh.",
      "She had spent so long hiding her joy. But joy, it turns out, is contagious.",
      "From that night on, every full moon, the animals gathered by the river for the Great Moonlight Dance. And the star of every show was a twirling, spinning, laughing hippo named Dansçı."
    ]
  },
  {
    id: '49',
    title: 'The Little Cloud Who Was Afraid of Thunder',
    titleTr: 'Gök Gürültüsünden Korkan Küçük Bulut',
    subtitle: 'Courage • Nature',
    duration: '8 min',
    theme: 'Nature',
    coverUrl: '/images/generated/nature/nature-scene-03-journey.jpg',
    character: 'Pamuk the Cloud',
    ageRange: '3-6',
    moral: 'What scares us most can also be part of who we are.',
    content: [
      "High above the world, a small fluffy cloud named Pamuk floated peacefully. She loved making shadow shapes for the children below — a bunny, a boat, a dinosaur.",
      "But Pamuk had a terrible secret: she was afraid of thunder.",
      "\"A cloud afraid of thunder?\" the old storm cloud rumbled. \"That's like a fish afraid of water!\"",
      "Whenever a thunderstorm approached, Pamuk would hide behind the mountains, shaking and dripping little raindrops of fear.",
      "\"I'm supposed to make rain,\" Pamuk whispered, \"but I'm too scared to be part of the storm.\"",
      "One summer day, the valley below was brown and dry. The flowers drooped. The river shrank. The farmers looked up at the sky with worried eyes.",
      "\"We need rain,\" they said. \"Please, clouds, bring us rain.\"",
      "The big storm clouds gathered, but they were too far away. Only little Pamuk was close enough to help.",
      "She looked down at the thirsty flowers, the tired animals, the hoping children. Her heart ached.",
      "\"I'm scared,\" Pamuk said. \"But they need me.\"",
      "She took a deep breath and floated to the center of the sky. She felt the electricity building inside her — crackle, crackle, boom!",
      "Thunder! It came from inside her! And it wasn't scary at all — it was powerful. It was her voice, bigger than she ever imagined.",
      "Rain poured from Pamuk — warm, gentle, life-giving rain. Below, the flowers lifted their heads. Children ran outside, laughing and splashing.",
      "When it was over, a rainbow stretched across the sky, and Pamuk sat right on top of it, exhausted but smiling.",
      "\"I made thunder,\" she said in amazement. \"I'm not afraid of it because... it's me. It was always me.\"",
      "And from that day on, Pamuk was the bravest little cloud in the sky — the one who brought both gentle shade and life-giving storms."
    ]
  },
  {
    id: '50',
    title: 'Grandma\'s Recipe Book',
    titleTr: 'Büyükannenin Tarif Defteri',
    subtitle: 'Family • Love',
    duration: '8 min',
    theme: 'Family',
    coverUrl: '/images/generated/family/family-scene-01-opening.jpg',
    character: 'Zeynep',
    ageRange: '4-8',
    moral: 'Love is passed down in the things we make and share.',
    content: [
      "Zeynep found the old notebook in a drawer that smelled like cinnamon. Its cover was soft from years of flour-dusted hands, and its pages were spotted with drops of olive oil and honey.",
      "\"That's your great-grandmother's tarif defteri,\" her anne said, smiling. \"Her recipe book. Every woman in our family has added to it.\"",
      "Zeynep opened it carefully. The first page, in faded ink, read: 'Fatma's Recipes — 1952. Cook with love, and the food will love you back.'",
      "There were recipes for börek with cheese that melted like clouds, for soup that could cure any cold, for cookies shaped like crescent moons.",
      "But next to every recipe were little notes — not about cooking, but about life.",
      "Next to the lentil soup: 'Made this the night your grandfather proposed. He ate three bowls.'",
      "Next to the cherry jam: 'Picked the cherries with your mother when she was five. She ate more than she put in the basket.'",
      "Next to the bread recipe: 'Bake bread when you're sad. By the time it rises, so will your heart.'",
      "Zeynep read every note, and it was like meeting family she'd never known. She could almost hear their laughter in the kitchen.",
      "\"Can I add a recipe?\" Zeynep asked.",
      "\"Of course. What will you add?\"",
      "Zeynep thought for a moment, then picked up a pencil. She wrote: 'Zeynep's Hot Chocolate — 2026. One cup of milk, two spoons of cocoa, one spoon of honey. Stir slowly. Drink while reading Büyükannenin tarif defteri.'",
      "Her anne read it and laughed with tears in her eyes.",
      "That night, they made hot chocolate together, sitting at the kitchen table with the old notebook between them.",
      "The recipes weren't just recipes. They were letters from the past, and Zeynep was writing the next chapter.",
      "She closed the book gently and whispered, \"Thank you, Büyükanne. I'll keep cooking.\""
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
