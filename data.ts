import { Story, Badge, SubscriptionPlan, Language } from './types';

// Centralized Image Repository
export const IMAGES = {
  // Characters & Scenes
  FOX: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR7_7i5goCMwYsjVS_VpKbj7HAKjQ7VHx-mxoLr1eVv5b4rEl-kYQUcVraKrv0_VEmIkMi8FCtXyhl6hgupH8jfqIxl33-xeWB-QuKPcijyDMwutbI1S4atVbvXIsv245ZaO1xviZDxWB3cWhfdaDsZStanim74OAz2es5dYtTbGKTfrPM8P6ZWE-YCR5oIeuI6xyRH8Rh7qFrWVML_O6gFc816dJUzR9BVefhttyWdUhMJCp77oQyeV-9LbUD2Q0CQTEV0dNXIY4',
  BEAR_COOKIES: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO1FpOWBs-BcLBUktNKuI8DB72vNJiGDXuL5a1nCswLegpDIgCV_8AWdahCvVCR1J925FBYsSXOj2v9XTBUbKf1cMkCNDan-1T0J2dnZwRArLn-x5Jc0CLUfPBKnp3ekDN9JVlOaP-jmXw4785gHZl-o2_T__jxkiyb4rLwTPTCmNlAG0FtV5IHHmtCQECEVSMPzEjhpGy8mVwXRT77aT0SOzM4saYExVcJ8gS8okKcMElA-K-zSf3mrtpabwXNF-zPaAx1ZVt9bY',
  MAGIC_FOREST: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd5H0PqZdqcrzVZpX4YRAX_SwYSh-ExO7py59jqNbolYB5z0yGTRZMu52gT37hDxG-ke4GeGjlccbaxxwXirHfxhI8GvxyNKVb5N26WRDOwfs2WIvvGajFn08eDOp0xPQqg1HI4NBDWaavHdIDja2G4tJ-PuEaUTAXKwk3IHsBAAq8t-s5jrRV0la_p0b5pgDNlResYx4NI0KVtaQbcRiBJ4Vxz7SrlG_uPUwtYIZ6PZ0UAt4DJPCZmpEsjYpa3LC2Sb8q8n2hQ6w',
  FLYING_CARPET: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFO2BBa6UTwHJ4ab8PaAZfnsihHozW4z0ixZVpn5sT25NOCoHxpWK0AOlWHOUj82ALm7CsKlVwn8ezrjW7LC0o7Cn5S37Pyqrq87N-v06ZA8xwuSzFuwuLj2aEJIz6O2ryk-7If587YGJhDvynLCPDf--rW4EfLj1G1bENc32NNNE5_4aildVwv5KBcFyQCs7kvYYFhoITOjNUzqAGJZxRP_xPwfcaoBBUF6jtns7xO-Sqpeg2o3aOjxdaqROD9G_dQMt_2CE0wOg',
  SLEEPING_CLOUD: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6t8elbomxKg_ELOTSlMq1dDidacFUipowj3blKoKYMgxz6hzPqjvwyaJQARx44U4OVxsNrOxWHKei1mAmB2mfwxgARlhiMkJh24-JkZIIHUxioFkJSvutnuzJWV4XnLUZn2RH3XrvHFk1bNT7vJwwb7oqOijry5x2hfDy09ZtOyeqh4jDzHut--TDoCm0zjRWLv_nOb3-iZYsUotIZaNraEDXa4_HBD0CF2G9F8MRfa3NNT1MTjbqqBlcSVWFNxHHcnkmzgmGweE',
  LIGHTHOUSE: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYNZAZbmmckdBkXq4-eRk-1YTFd4NiHcUDLzpST__lc9MQVMlK8LWTeySi8ll9jQfE40c9a6wQ3IATBK5Xo7V4A5aPU2i4EjHgcCKUJO6dPIoBBEuzGnMltMIlZwBn3f3W8RR7NpEpbtK2pQ-GWgT33CNMXxvnbH9fhrzva-w9onfMGV5nYnv4hkEkfF8Lr5yHSd6JJpBtcmafmIuBA2-oCkAT31t72xTHM05bhs51uQnizQQWqpaZjqK0PmOro9MXZ0lI_f-AL94',
  DEEP_SEA: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChsJ_3EnAHQ3r4HYN0DbXe-Mlu4XOdJoqU5bwwWxmbkrD8tbF1YPaJFWK00I8oTg98qcDH745UDyYhLf_30dTnKoc5NU0mxr7YBONEIT2QLaDtcDBAPWd10C1ffty_K-3tT1L3PILG78d9ig60Sq9kD0N_HaqTPS72DI5qZNo3D1NwW_IYbGciXWpkE527VBmeQNws4eTPbCo2v4Ft5tjtLi-rLix8UhBM5XO6AGGynnXco6G1w_6xgVi-QOiuqiXX8S1VxK6lqjw',
  MOUNTAIN: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaPQVlBaPu00p6RdyK8IpuZ0zj5f8YRBWijhl2hePQT8miW-BbtO8cdwg2KrW2f2iW6yDCZ5FXqgTZkDvWT_xfoYwuT8Dx2qVTuSyCzpdcYD4Paavj8DzNbWD9adwXNTzxchQoQEUu34hx50ITdLhNAo-U2yusxNXVKiR7C77bqfXDzOfjROfykCY6yoNLvseue-GWbzCvffcP4rKZA0XR-vDVffLgRERRGxvsBS9JFSGaYE5rR_b0vVO2iG-5klzR3YRBzSDGifw',

  // New Themes from Visuals
  LION_MOON: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6oPelGRvj9mbz6WBZ5NbstzLABXjFMtlz00BFn_seDp-9049iEpFBwXHx9YumzZojzeZcp3pRMpiUkZpl3owPSY8E4Gn6t_krobLE9mTPk0nWit5rVEIXe7-1aIGHpehqwOn_mBeeBD1XFarmUMkLRs7doEvZ-UyAF71wnhCSvhkmhqgSgFLSZKBKiIdO6JeuFwZ_e3qGA3pjHUvjiiqBy62ivcRKhObIHO8aVOoM4gtuAvlHr7tLRiBLlpQN1IML0O8BO8VX84o',
  PILLOW_FIGHT: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr7UuD5WiFpEXUsoVN7anoEN4TaBSNCRDMczt2uVpeiyqh8b2c9suivkB933veWtiJpIHwTPUKDfR4jBw0nbZXn-jAfnEd9cO59mtzyLFxfpZsYZ_OK8_tzbLn6Y4rxh0uDFGQzDce02BOhnVajy1h0FMdg80lLmHbMU2YFHk2WTgTnFGHY_KufXyAxaKc95NSq0ga8KPi796gAo5HJNX_g4LmlQeBbGWkAAvMKl3GNLDzwt59ayAfP0f_VO-TfSrpm14C2Se_5sc',
  MAGIC_CHEST: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7UdM2YYNzJsED0HIha_-OQQSik36jucYkXrVvi_qgTlR0JI7yHsd_oHkn7bOTcKYv5Iqn2VNyo5BMNmhvAmb1ErEBtzPTk7v7GwmbBPNC3Ls59elnJZzJ8JIzv73vrSi9Cw4TSNLPQ2IStz6kgzrl0bS-GP4WEwGHxmNgMGnITZNwxMPWZaDGNztLaZ5Zfe3h0Hmr0SQ9bGEtrrNeg9PBK-gsMiUYi2XvcPl3KkHhNJmeTqmM4tbEKwzBE8HrHyZRpNx3izD5ZsE',
  TURTLE_RABBIT: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRlLfANuCi22aVIVW7qAZ0FGFyFr009VYx5_YT2bjbuhxmYPiAVl387B4qJGH_uMmBSlRktIwnViGrFVCbkBQfojnrn8YuT4z8J0rehnwLx_hroMuKKwBgGvgxuA_0nrLSAGvzcgnPqtLeNJ5gfT72tioaTMTZI9oT6KbOrgZaL0t1cVFf7v7CwlOXjLCywDCn1TA5_tshketLKeLXFXg2m8CTU1JZ2S9eleQ6HF28kH7qpIKzsLFRd-6s61CLcLbddh5x-xVBNv0',

  // UI Assets
  WAND_UI: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9aVTljm4HweuirPj0-So74BzTdnBdr4YrUP6vsXlX4uA1o1c3xhTvnxaX5qJUf0fIcs7nO2COnpP_1Cuoetuv2aUJ6Cu4Z53Ggimbvujp_KhTY1C1nzvlcHBitSH5zr0hA99ytJxn0Rz41X1nRpPUtW6lavXrftzcJV4VarjXOWbCpxODYj_yKxPiw1EQNCTNCLvwEKU5elE2JxOhT3G8azI3s8ZiB79JYJgadYNkOxa3yuI4FwWrhho3TjzZfzyYrvElhnh5A7I',
  MOON_RESULT: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSzMb_SiJ5QNUE4m2AVLCCfvWE3OI5N5r5D6KhEeO5JKvdWLLoC42cLwobg2xbtTQejRR6BfNio4WelYk91BUg9XvHRhUqsciWa2A72c8vQGoSOIRR09x_Jejb1OT-1EHAaLyP1G3hluHUdC67AEWwR1uGpyq-gEDGzGLGD56vQNMY5zQTJxXAD2f1_DqFrdFXGDsVrW6nQkW_0jMUmt3lk4hSbSueSpWpeb342ww26Xlj8o-CAJXxzT0yVPnvbPE_SnKaaYiWyf0',
  FOREST_HEADER: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoAQfpj8ojEkC-5s7oGsuJz_6nwwvmMYPnYA2ik1XdhjyDRO9QN1KDuk_CXWiZPdWp4aEqNtfLvTpDtl27JIe0xODMZSycACKP9HTicf6Ufavn94CcJ-4JnhWgVqKkimwR1cZmyUyBzZfcyrXTlcg_oO0Te9eVxeTYtTsxbnp3Lmxz5dTzxhxVHoe88vcEMmRaRz0B94fm8X7S4-vfr9wgtI6gOCMXzRIJ7278UCakWRuNncsIQurkDVyuiLk-yXM0eiKvlaNFVGQ',
  PROFILE: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdY0EA5Zg7L74lj4l6wZXiG-H2chvenqhGw4Xa4ZDHRE-XGsBJwpPi-b6B-bP4c5hQQ4w6LP-GJWwYrb__XvStNGRwZ2FzUBR-w9g3ZL_oX9ibLUnsauRIRgXBRPAwaEljqvIhyE0biQsISzi2bMRUrYp6KtzxGN0kzyBVLb4InDLI7iJeA9ZGxa3Cb6oCTiY42y6EFa_NPW6qDGU7aprKYdCEUohTGO4oRYssAVeglx2LiCKw3TFBGneF4UQ-xzEptg-INLeVWSw',
  HERO_BG: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0c5otyOclO2LzJXxKMk0tIek7Px8ZrlYOAkbxGQDnQLVFDWee7hftEYImBsD4yeHxUSGhZaH4PqM8MWvjJPWvDkgpm63uo_qRmHz-1sFjEXHJoQBqJHMeM4zDCerASp8SO8KxQF4j_C01jEhbpArcyFpx-zYtv8ir1RfdD87GRDWuSZ8RPmcBIxDfsAilGX_Dx3TexT-wpEFfz9YdnTikqvRTJH5SOmv0QTxRr9GQR5QXRznS6waVqtEbIUfzUOtZYTRVqqLdXes',

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

  // Fallback URLs for stories (using existing URLs until images are added)
  MOONLIGHT_LION: '/images/brave_lion_cub.jpg',
  SLEEPY_OWL_BOOKSHELF: '/images/sleepy_owl_bookshelf.jpg',
  WISE_OWL_LIBRARY: '/images/wise_owl_library.jpg'
};

export const RECENT_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Brave Lion Cub',
    titleTr: 'Cesur Aslan Yavrusu',
    subtitle: '10 min listen',
    subtitleTr: '10 dk dinle',
    duration: '10 min',
    theme: 'Courage',
    coverUrl: IMAGES.LION_MOON
  },
  {
    id: '2',
    title: 'Space Voyager',
    titleTr: 'Uzay Yolcusu',
    subtitle: '15 min listen',
    subtitleTr: '15 dk dinle',
    duration: '15 min',
    theme: 'Adventure',
    coverUrl: IMAGES.FLYING_CARPET
  },
  {
    id: '3',
    title: 'The Magic Forest',
    titleTr: 'Sihirli Orman',
    subtitle: '8 min listen',
    subtitleTr: '8 dk dinle',
    duration: '8 min',
    theme: 'Nature',
    coverUrl: IMAGES.MAGIC_FOREST
  }
];

export const LIBRARY_STORIES: Story[] = [
  {
    id: '4',
    title: 'The Cookie Mystery',
    titleTr: 'Kurabiye Gizemi',
    subtitle: 'Friendship • Funny',
    subtitleTr: 'Dostluk • Komik',
    duration: '7 min',
    theme: 'Friendship',
    coverUrl: IMAGES.BEAR_COOKIES
  },
  {
    id: '5',
    title: 'Deep Sea Dreams',
    titleTr: 'Derin Deniz Rüyaları',
    subtitle: 'Wonder • Ocean',
    subtitleTr: 'Hayranlık • Okyanus',
    duration: '9 min',
    theme: 'Nature',
    coverUrl: IMAGES.DEEP_SEA
  },
  {
    id: '6',
    title: 'Cloud Castle',
    titleTr: 'Bulut Kalesi',
    subtitle: 'Sleep • Calm',
    subtitleTr: 'Uyku • Huzur',
    duration: '12 min',
    theme: 'Calm',
    coverUrl: IMAGES.SLEEPING_CLOUD
  },
  {
    id: '7',
    title: 'Lighthouse Keeper',
    titleTr: 'Deniz Feneri Bekçisi',
    subtitle: 'Safety • Home',
    subtitleTr: 'Güvenlik • Yuva',
    duration: '11 min',
    theme: 'Family',
    coverUrl: IMAGES.LIGHTHOUSE
  },
  {
    id: '8',
    title: 'The Feather Storm',
    titleTr: 'Tüy Fırtınası',
    subtitle: 'Fun • Play',
    subtitleTr: 'Eğlence • Oyun',
    duration: '5 min',
    theme: 'Friendship',
    coverUrl: IMAGES.PILLOW_FIGHT
  },
  {
    id: '9',
    title: 'The Secret Attic',
    titleTr: 'Gizli Çatı Katı',
    subtitle: 'Mystery • Discovery',
    subtitleTr: 'Gizem • Keşif',
    duration: '14 min',
    theme: 'Wonder',
    coverUrl: IMAGES.MAGIC_CHEST
  },
  {
    id: '10',
    title: 'Slow & Steady',
    titleTr: 'Yavaş ve Kararlı',
    subtitle: 'Wisdom • Patience',
    subtitleTr: 'Bilgelik • Sabır',
    duration: '8 min',
    theme: 'Nature',
    coverUrl: IMAGES.TURTLE_RABBIT
  },
  {
    id: '11',
    title: 'The Wizard\'s Quill',
    titleTr: 'Büyücünün Tüy Kalemi',
    subtitle: 'Magic • Creation',
    subtitleTr: 'Sihir • Yaratıcılık',
    duration: '10 min',
    theme: 'Magic',
    coverUrl: IMAGES.WAND_UI
  },
  {
    id: '12',
    title: 'Goodnight Moon',
    titleTr: 'İyi Geceler Ay',
    subtitle: 'Sleep • Dreams',
    subtitleTr: 'Uyku • Rüyalar',
    duration: '6 min',
    theme: 'Calm',
    coverUrl: IMAGES.MOON_RESULT
  },
  {
    id: '13',
    title: 'The Autumn Fox',
    titleTr: 'Sonbahar Tilkisi',
    subtitle: 'Seasons • Change',
    subtitleTr: 'Mevsimler • Değişim',
    duration: '9 min',
    theme: 'Nature',
    coverUrl: IMAGES.FOX
  },
  // New Stories with Full Content
  {
    id: '14',
    title: 'Detective Mouse',
    titleTr: 'Dedektif Fare',
    subtitle: 'Mystery • Curiosity',
    subtitleTr: 'Gizem • Merak',
    duration: '8 min',
    theme: 'Mystery',
    coverUrl: IMAGES.DETECTIVE_MOUSE,
    character: 'Milo the Mouse',
    ageRange: '4-7',
    moral: 'Curiosity and careful observation can solve any mystery.',
    moralTr: 'Merak ve dikkatli gözlem her gizemi çözebilir.',
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
    ],
    contentTr: [
      "Yaşlı meşe ağacının altındaki rahat küçük bir kovukta, Milo adında zeki bir fare yaşardı. Diğer farelerden farklı olarak sadece peynir düşünmezdi; Milo gizemleri çözmenin hayalini kurardı.",
      "Güneşli bir sabah, Milo en sevdiği kahverengi paltosunu giydi ve özel dedektif şapkasını taktı. Büyükannesinden hediye olan güvenilir büyüteç'ini aldı.",
      "\"Bugün tam bir gizem günü!\" diye heyecanla cıyakladı Milo, dışarı adım atarken.",
      "Tam o sırada arkadaşı Rosie Kızılgerdan yakına kondu. \"Milo! Birisi parlak mavi düğmemi almış! Yuvamın üzerindeydi, şimdi yok olmuş!\"",
      "Milo'nun bıyıkları heyecanla seğirdi. \"Merak etme Rosie! Dedektif Milo göreve hazır!\"",
      "Rosie'nin yuvasını büyüteciyle dikkatlice inceledi. \"Aha! Bu dalda minik çizikler görüyorum... ve bakın — pırıl pırıl bir toz izi!\"",
      "Işıltılı izi takip ederek Milo bahçeden geçti, ayçiçeklerinin arasından süzüldü ve eski taş duvarın etrafını dolandı.",
      "İz, küçük bir yuvaya çıktı. Milo içeri baktığında genç bir saksağanı gördü; etrafı parlak nesnelerle — düğmeler, bozuk paralar ve güzel taşlarla — doluydu!",
      "\"Aman!\" diye cıvıldadı saksağan. \"Özür dilerim! Parlak şeyler o kadar güzel ki, kendimi tutamadım.\"",
      "Milo nazikçe gülümsedi. \"Güzel şeyleri sevdiğini anlıyorum ama bunlar başkalarına ait. Onları geri vermeye ne dersin? Ben de sana kimseye ait olmayan parlak şeyler bulmana yardım ederim!\"",
      "Saksağanın gözleri parladı. Birlikte Rosie'nin düğmesini ve tüm diğer hazineleri sahiplerine geri verdiler.",
      "O akşam, ateşböcekleri alacakaranlıkta dans ederken, Milo saksağana derenin kenarında güzel çakıl taşları bulmayı öğretti.",
      "\"Teşekkür ederim Dedektif Milo,\" dedi saksağan. \"Sen sadece gizemi çözmedin — daha iyi bir yol bulmama da yardım ettin.\"",
      "Milo şapkasını kaldırıp gülümsedi. Bir gizem daha çözülmüş, bir arkadaş daha edinilmişti. Ne mükemmel bir gün!"
    ]
  },
  {
    id: '15',
    title: 'The Brave Lion Cub',
    titleTr: 'Cesur Aslan Yavrusu',
    subtitle: 'Courage • Dreams',
    subtitleTr: 'Cesaret • Hayaller',
    duration: '10 min',
    theme: 'Courage',
    coverUrl: IMAGES.MOONLIGHT_LION,
    character: 'Leo the Lion Cub',
    ageRange: '3-6',
    moral: 'True bravery is not about being fearless, but about facing your fears with a kind heart.',
    moralTr: 'Gerçek cesaret korkusuz olmak değil, korkularınla iyi bir kalple yüzleşmektir.',
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
    ],
    contentTr: [
      "Çimenli bir tepenin üzerinde, ışıl ışıl yıldızlarla dolu bir gökyüzünün altında, Leo adında küçük bir aslan yavrusu ayın doğuşunu izliyordu.",
      "Leo ailesindeki en küçük yavru, en yumuşak altın rengi tüylere ve en büyük, en hayalperest gözlere sahipti.",
      "\"Bir gün,\" diye fısıldadı Leo aya, \"hikayelerdeki büyük aslanlar kadar cesur olmak istiyorum.\"",
      "Annesi sessizce tepeye çıkıp yanına oturdu. \"Sence neden şimdiden cesur değilsin ki, küçüğüm?\"",
      "\"Gök gürültüsünden korkuyorum,\" diye itiraf etti Leo. \"Şelalenin yanındaki karanlık mağaradan da. Ve bazen... çok küçük olduğumdan korkuyorum.\"",
      "Annesi onu nazikçe okşadı. \"Sana bir sır vereyim. Büyükbaban, tanıdığım en cesur aslan, senin yaşında fırtınalardan o da korkarmış.\"",
      "\"Gerçekten mi?\" Leo'nun gözleri kocaman açıldı.",
      "\"Gerçekten. Ama o, cesur olmanın hiç korkmamak demek olmadığını öğrendi. Korksan bile yoluna devam etmek demek.\"",
      "Tam o sırada tepenin altından minicik bir ağlama sesi yankılandı. Leo'nun kulakları dikildi. \"O da neydi?\"",
      "Titreyen ve kaybolmuş, ailesinden ayrılmış bir yavru tavşan buldular.",
      "Leo'nun kalbi güm güm atıyordu. Tavşan karanlık mağaranın yakınındaydı — onu en çok korkutan yer.",
      "Ama korkmuş küçük tavşana bakınca, Leo göğsünde sıcacık bir şeyin büyüdüğünü hissetti. Bu küçücük canlının yardıma ihtiyacı vardı.",
      "\"Merak etme,\" dedi Leo, sesi biraz titreyerek. \"Sana yardım edeceğim.\"",
      "Adım adım Leo, tavşanı gölgeli mağaranın önünden geçirdi. Patileri titriyordu ama yürümeye devam etti.",
      "Tavşanın ailesini bulduklarında, anne tavşan gözleri dolarak teşekkür etti Leo'ya. \"Ne kadar cesursun, küçük aslan!\"",
      "Tepeye geri dönerken Leo bir şekilde kendini daha uzun hissetti. Ay ona gülümsüyor gibiydi.",
      "\"Başardın,\" dedi annesi gururla. \"Başka birine yardım etmek için korkunu yendin. En gerçek cesaret budur.\"",
      "Leo annesinin yanına kıvrılıp uyudu, yıldızlar tepelerinde dans ediyordu. Bu gece kendini artık o kadar küçük hissetmiyordu.",
      "Ve rüyalarının bir yerinde kükredi — yüksek, korkutucu bir kükreme değil, ay ışığıyla aydınlanan savanada yankılanan bir iyilik kükreyişi."
    ]
  },
  {
    id: '16',
    title: 'The Sleepy Owl\'s Library',
    titleTr: 'Uykucu Baykuşun Kütüphanesi',
    subtitle: 'Dreams • Bedtime',
    subtitleTr: 'Rüyalar • Uyku Vakti',
    duration: '7 min',
    theme: 'Calm',
    coverUrl: IMAGES.SLEEPY_OWL_BOOKSHELF,
    character: 'Oliver the Owl',
    ageRange: '2-5',
    moral: 'Dreams are the stories our hearts tell when we sleep.',
    moralTr: 'Rüyalar, uyurken kalbimizin anlattığı hikayelerdir.',
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
    ],
    contentTr: [
      "Eski ahşap bir kitaplığın rahat köşesinde, tozlu kitapların ve unutulmuş hazinelerin arasına sığınmış, Oliver adında tüylü küçük bir baykuş yaşardı.",
      "Oliver bütün gece uyanık kalan diğer baykuşlara benzemezdi. Uyumayı çok severdi — özellikle ay mor gökyüzünde yükseldiğinde.",
      "Her akşam, güneş gökyüzünü lavanta ve altın tonlarına boyarken, Oliver kocaman, kabarık bir esneme yapardı.",
      "\"Rüya zamanı,\" diye yumuşakça mırıldanırdı, tüylerini küçük bir bulut gibi kabartarak.",
      "Pencereden ay içeri bakardı, odaya hafif gümüşi bir ışık yayarak.",
      "\"İyi geceler ay,\" diye fısıldardı Oliver. \"Bu gece rüyalarıma göz kulak ol.\"",
      "Ve ay, o kadar yuvarlak ve sevecen, fısıldıyor gibiydi: \"Her zaman, küçük baykuş. Her zaman.\"",
      "Oliver'ın gözleri ağırlaşırken, tüm harika şeyleri düşünürdü — eski kitapların kokusu, yuvasının sıcaklığı, gecenin yumuşak sesleri.",
      "Rüyalarında Oliver yastıklardan dağların ve yıldız ışığından denizlerin üzerinde uçardı.",
      "Uzak diyarların ve dans eden kuzey ışıklarının hikayelerini anlatan dost canlısı bulutlarla karşılaşırdı.",
      "Bazen gökyüzünde devasa bir kütüphane hayal ederdi; şimdiye kadar yazılmış her kitap hafif esintilerde süzülürdü.",
      "Ama en sevdiği rüyalar basit olanlardı — rahat köşesinde sımsıcak kıvrılmak, dünya huzurla uyurken güvende olmak.",
      "\"Rüyalar sihirdir,\" diye düşündü Oliver, uyku onu yumuşak bir battaniye gibi sararken.",
      "\"Gözlerimiz kapandığında kalbimizin anlattığı hikayelerdir onlar.\"",
      "Ve böylece, ay nöbet tutarken ve yıldızlar ninnilerini kırpıştırırken, Oliver en tatlı, en yumuşak uykuya daldı.",
      "İyi geceler küçük baykuş. İyi geceler küçüğüm. Umarım bu gece rüyaların Oliver'ın kitaplığı kadar rahat olur."
    ]
  },
  {
    id: '17',
    title: 'Whiskers and the Golden Treasure',
    titleTr: 'Bıyık ve Altın Hazine',
    subtitle: 'Adventure • Kindness',
    subtitleTr: 'Macera • İyilik',
    duration: '9 min',
    theme: 'Adventure',
    coverUrl: IMAGES.TREASURE_KITTEN,
    character: 'Whiskers the Kitten',
    ageRange: '4-7',
    moral: 'The greatest treasures are the friends we make along the way.',
    moralTr: 'En büyük hazineler yol boyunca edindiğimiz arkadaşlardır.',
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
    ],
    contentTr: [
      "Büyülü Ormanın kalbinde, çiçeklerin ışıldadığı ve derelerin ninni söylediği yerde, Bıyık adında meraklı küçük bir kedi yavrusu büyülü bir şey keşfetti.",
      "Bıyık'ın en yumuşak gri tüyleri, minik çizgileri ve şimdiye kadar gördüğünüz en büyük, en yeşil gözleri vardı.",
      "Sisli bir sabah, altın rengi bir kelebeği kovalarken sarmaşıklardan oluşan bir perdeden yuvarlanıp gizli bir koruluğun içine düştü.",
      "Orada, kökleri gümüş gibi parlayan kadim bir ağacın altında, sıcak altın ışığıyla parlayan eski bir hazine sandığı duruyordu.",
      "\"Vay!\" diye nefesi kesildi Bıyık'ın, küçük kuyruğu heyecandan kabararak. \"Gerçek bir hazine sandığı!\"",
      "Yosunlu zeminde neredeyse hiç ses çıkarmadan yaklaştı.",
      "Ama tam kapağa uzandığında minicik bir ses cıyakladı: \"Lütfen onu alma!\"",
      "Bıyık etrafına bakındı ve pençesinden büyük olmayan, çiy damlası gibi kanatları olan küçük bir orman perisi gördü.",
      "\"Bu sandık,\" diye açıkladı peri, \"ormanın son sihirini barındırıyor. Açgözlü bir kalp tarafından açılırsa, sihir sonsuza dek kaybolacak.\"",
      "Bıyık geri oturdu ve dikkatlice düşündü. Sandık çok güzeldi ve içinde ne hazineler olabileceğini merak etti.",
      "Ama sonra perinin minik gözlerindeki endişeli bakışı gördü ve annesinin hep söylediğini hatırladı: \"İyi ol küçüğüm. İyilik en büyük hediyedir.\"",
      "\"Hazineye ihtiyacım yok,\" dedi Bıyık yumuşakça. \"İhtiyacım olan her şeye sahibim — sıcak bir yuva, karnımda yiyecek ve beni seven arkadaşlar.\"",
      "Perinin yüzü sevinçle aydınlandı. \"Oh, teşekkür ederim! Saf bir kalbin var, küçük kedi!\"",
      "Teşekkür olarak peri, minik parmağıyla Bıyık'ın burnuna dokundu. Sıcak, karıncalanan bir his tüm vücuduna yayıldı.",
      "\"Sana orman yaratıklarıyla konuşma hediyesi verdim,\" dedi peri. \"Artık nereye gidersen git hep arkadaşların olacak.\"",
      "O günden sonra Bıyık kuşların şarkılarını, tavşanların fısıltılarını ve kadim ağaçların hikayelerini anlayabiliyordu.",
      "Ve perinin haklı olduğunu anladı — gerçek hazine altın ya da mücevher değildi. Onu bekleyen sonsuz maceralar ve dostluklardı.",
      "Altın sandık mı? Kadim ağacın altında güvende kaldı, sihri tüm ormanın en büyük, en yeşil gözlerine sahip küçük gri kedinin iyiliğiyle korunarak."
    ]
  },
  {
    id: '18',
    title: 'The Wise Owl\'s Secret',
    titleTr: 'Bilge Baykuşun Sırrı',
    subtitle: 'Wisdom • Learning',
    subtitleTr: 'Bilgelik • Öğrenme',
    duration: '8 min',
    theme: 'Wisdom',
    coverUrl: IMAGES.WISE_OWL_LIBRARY,
    character: 'Professor Hoot',
    ageRange: '5-8',
    moral: 'The wisest thing of all is to keep learning and to share what you know with others.',
    moralTr: 'En bilgece şey öğrenmeye devam etmek ve bildiklerini başkalarıyla paylaşmaktır.',
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
    ],
    contentTr: [
      "Muhteşem bir ağaç ev kütüphanesinde, fenerlerin sıcak kehribar ışığıyla parladığı ve her dalın kitaplarla kaplı olduğu yerde, tüm diyarların en bilge baykuşu yaşardı — Profesör Hu.",
      "Profesör Hu'nun kabarık kahverengi tüyleri, kocaman yuvarlak gözlükleri ve binlerce kitap sayfasına dokunmuş kanatları vardı.",
      "Hayvanlar her yerden gelip ona sorular sorardı. \"Profesör Hu, gökyüzü neden mavi?\" \"Profesör Hu, balıklar su altında nasıl nefes alıyor?\" \"Profesör Hu, güneş nerede uyuyor?\"",
      "Profesör Hu her zaman cevabı bilirdi çünkü muhteşem kütüphanesindeki her kitabı okumuştu.",
      "Bir gün minik bir serçe içeri süzüldü, gözleri yaşlıydı. \"Profesör Hu, herkes benim çok küçük ve çok genç olduğumu düşünüyor, önemli bir şey bilemeyeceğimi söylüyorlar.\"",
      "Profesör Hu gözlüklerini düzeltti ve nazikçe gülümsedi. \"Gel küçüğüm. Yanıma otur.\"",
      "Onu özel bir rafa götürdü, tozlu ve diğerlerinin arkasına gizlenmiş. \"En değerli kitaplarımı burada saklıyorum.\"",
      "Serçe şaşkın görünüyordu. \"Ama bunlar çok küçük! Ve bazıları... el yapımı gibi?\"",
      "\"Bunlar,\" diye açıkladı Profesör Hu, \"tıpkı senin gibi genç hayvanlar tarafından yazılmış kitaplar. Hikayeler, çizimler, sorular, fikirler. Ve bir sır biliyor musun?\"",
      "Serçe yaklaşıp kulak kesildi.",
      "\"Şimdiye kadar öğrendiğim en önemli şeylerden bazıları bu küçük kitaplardan geldi. Çünkü genç zihinler dünyayı, yaşlı zihinlerin bazen unuttuğu şekillerde görür.\"",
      "Serçenin gözleri kocaman açıldı. \"Gerçekten mi? Ama ben daha çok fazla şey bilmiyorum ki...\"",
      "Profesör Hu kıkırdadı, sıcak bir kahkaha attı. \"Ah, ama bilgeliğin harika yanı da bu. Her şeyi bilmekle ilgili değil. Her zaman meraklı olmak, her zaman soru sormak ve her zaman öğrenmeye istekli olmakla ilgili.\"",
      "Ona minik boş bir kitap ve bir tüy kalem uzattı. \"Al. Sorularınla başla. Meraklarınla. Hayallerinle. Bir gün bu küçük kitap birine harika bir şey öğretebilir.\"",
      "Serçe o gece en büyük gülümsemesiyle eve uçtu, minik kitabını bir hazine gibi sımsıkı tutarak.",
      "Profesör Hu onu giderken izledi, kalbi doluydu. Çünkü tüm bilge yaratıkların bildiği sırrı biliyordu:",
      "En bilgece şey tüm cevaplara sahip olmak değil, soru sormaya devam etmek ve keşfettiklerini açık kanatlarla ve açık bir kalple paylaşmaktır.",
      "Ağaç ev kütüphanesinde o gece fenerler biraz daha parlak yanıyordu, sanki kitapların kendileri gülümsüyor gibiydi."
    ]
  },
  // 🎮 INTERACTIVE STORY - Choose Your Own Adventure!
  {
    id: '20',
    title: 'Whiskers and the Treasure',
    titleTr: 'Bıyık ve Hazine',
    subtitle: '🎮 Interactive • Adventure',
    subtitleTr: '🎮 İnteraktif • Macera',
    duration: '10+ min',
    theme: 'Adventure',
    coverUrl: IMAGES.TREASURE_KITTEN,
    character: 'Whiskers the Kitten',
    ageRange: '4-8',
    moral: 'Every choice leads to a new adventure. There is no wrong path when you follow your heart.',
    moralTr: 'Her seçim yeni bir maceraya götürür. Kalbini takip ettiğinde yanlış yol yoktur.',
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
        paragraphsTr: [
          "Büyülü Ormanın derinliklerinde, meraklı küçük kedi Bıyık yaşlı söğüt ağacının yanında keşfe çıkmıştı.",
          "Yumuşak gri tüyleri sabah ışığında parıldıyordu ve parlak yeşil gözleri merakla doluydu.",
          "Birden Bıyık bir çalının arkasında parıldayan bir şey fark etti — muhteşem altın bir hazine sandığı!",
          "Sandık gizemli sembollerle kaplıydı ve üzerinde minik bir not vardı: 'En cesur kaşif için. Cesaretiniz varsa açın!'",
          "Bıyık'ın kalbi heyecanla hızla çarptı. Ne yapmalıydı?"
        ],
        choices: [
          {
            id: 'choice_open',
            text: "Open the treasure chest!",
            textTr: "Hazine sandığını aç!",
            emoji: "🔓",
            nextBranchId: 'open_chest',
            consequence: "What magical treasures await inside?",
            consequenceTr: "İçinde ne sihirli hazineler var?"
          },
          {
            id: 'choice_friend',
            text: "Find a friend to share the adventure",
            textTr: "Maceraya bir arkadaş bul",
            emoji: "🐰",
            nextBranchId: 'find_friend',
            consequence: "Adventures are better with friends!",
            consequenceTr: "Maceralar arkadaşlarla daha güzel!"
          },
          {
            id: 'choice_hide',
            text: "Hide and watch the chest first",
            textTr: "Saklan ve sandığı izle",
            emoji: "👀",
            nextBranchId: 'watch_chest',
            consequence: "Sometimes patience reveals secrets...",
            consequenceTr: "Bazen sabır sırları ortaya çıkarır..."
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
        paragraphsTr: [
          "Titreyen patileriyle Bıyık altın kapağı dikkatlice kaldırdı.",
          "VUUUŞ! İçeriden bir parıltı ve yıldız patlaması fışkırdı!",
          "Sandığın içinde üç sihirli nesne vardı: parlayan bir harita, her zaman maceraya işaret eden minik bir pusula ve güzel mavi bir tüy.",
          "Sandıktan yumuşak bir ses yankılandı: 'Bir hediye seç, cesur kaşif. Her biri seni özel bir yere götürecek.'"
        ],
        choices: [
          {
            id: 'choose_map',
            text: "Take the glowing map",
            textTr: "Parlayan haritayı al",
            emoji: "🗺️",
            nextBranchId: 'map_adventure',
            consequence: "Where will it lead?",
            consequenceTr: "Nereye götürecek?"
          },
          {
            id: 'choose_compass',
            text: "Take the adventure compass",
            textTr: "Macera pusulasını al",
            emoji: "🧭",
            nextBranchId: 'compass_adventure',
            consequence: "Follow where adventure calls!",
            consequenceTr: "Maceranın çağrısını takip et!"
          },
          {
            id: 'choose_feather',
            text: "Take the blue feather",
            textTr: "Mavi tüyü al",
            emoji: "🪶",
            nextBranchId: 'feather_adventure',
            consequence: "It seems to whisper secrets...",
            consequenceTr: "Sırlar fısıldıyor gibi..."
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
        paragraphsTr: [
          "Bıyık ormanda koşarak en iyi arkadaşı Bal Tavşanı'nı çağırdı.",
          "'Bal! Bal! Harika bir şey buldum!' diye heyecanla bağırdı Bıyık.",
          "Bal hemen zıplayarak geldi, sarkık kulakları zıplarken. 'Nedir o, Bıyık?'",
          "Birlikte hazine sandığının yanına döndüler. 'Hadi birlikte açalım,' dedi Bal, Bıyık'ın pençesini tutarak.",
          "Sandığı birlikte açtıklarında sihirli bir şey oldu — İKİ parıltı patlaması çıktı!",
          "Üç nesne yerine, bir not ile özel altın bir anahtar vardı: 'İki arkadaş için bir anahtar. Dostluk Bahçesini açmak için kullanın.'"
        ],
        choices: [
          {
            id: 'find_garden',
            text: "Search for the Friendship Garden!",
            textTr: "Dostluk Bahçesini ara!",
            emoji: "🌸",
            nextBranchId: 'friendship_ending',
            consequence: "A special place for special friends!",
            consequenceTr: "Özel arkadaşlar için özel bir yer!"
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
        paragraphsTr: [
          "Bıyık bir mantarın arkasına saklanıp sandığı dikkatlice izledi.",
          "Birkaç dakika sonra minik mavi bir peri belirdi! Bıyık'ın pençesinden büyük değildi.",
          "Peri sandığın etrafında dans ederek yakındaki çiçeklere yıldız tozu serpti.",
          "'Orada olduğunu biliyorum, küçük kedi,' diye kıkırdadı peri. 'Sadece en sabırlı kaşifler beni bulur!'",
          "Peri Bıyık'a süzülerek yaklaştı. 'Beklemeyi bildiğin için sana özel bir dilek hakkı vereceğim.'"
        ],
        choices: [
          {
            id: 'wish_fly',
            text: "I wish I could fly!",
            textTr: "Uçabilmeyi diliyorum!",
            emoji: "✨",
            nextBranchId: 'flying_ending',
            consequence: "Up, up, and away!",
            consequenceTr: "Yukarı, yukarı ve öteye!"
          },
          {
            id: 'wish_friend',
            text: "I wish for a new friend",
            textTr: "Yeni bir arkadaş diliyorum",
            emoji: "💕",
            nextBranchId: 'fairy_friend_ending',
            consequence: "The best gift of all!",
            consequenceTr: "En güzel hediye!"
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
        paragraphsTr: [
          "Harita Bıyık'ın patilerinde sihirli bir şekilde açıldı. Tüm Büyülü Ormanı gösteriyordu!",
          "Altın noktalı bir çizgi belirdi, 'Uykulu Dağ Zirvesi' olarak işaretlenmiş bir yere götürüyordu.",
          "Bıyık haritayı takip ederek pırıl pırıl derelerden geçti ve el sallayan sevimli sincapları selamladı.",
          "Uykulu Dağın tepesinde şimdiye kadar gördüğü en güzel gün batımını buldu.",
          "Tüm orman turuncu, pembe ve mor tonlara boyanmıştı. Bıyık sıcak ve huzurlu hissetti.",
          "Zirvedeki bir taşta şu sözler kazılıydı: 'En büyük hazine dünyanın güzelliğini görmektir.'",
          "Bıyık kıvrılıp yıldızların çıkışını izledi, kalbi hayranlıkla doluydu."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Beautiful View',
        endingTitleTr: 'Muhteşem Manzara'
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
        paragraphsTr: [
          "Pusula çılgınca döndü ve sonra DÜMDÜZ YUKARIYA işaret etti!",
          "Bıyık bunun ne anlama geldiğini merak etmeden önce gökyüzünde bir gökkuşağı merdiveni belirdi!",
          "Adım adım Bıyık renkli basamakları tırmandı, her biri müzikal bir ses çıkarıyordu.",
          "Tepede bulut kedilerinin yaşadığı bir bulut kalesi vardı! Tüylü ve beyazdılar, pamuk gibi zıplıyorlardı.",
          "'Hoş geldin, cesur kaşif!' diye sevindiler Bulut Kedileri. 'Gizli evimizi buldun!'",
          "Bulut Kedileri Bıyık'a gökkuşağından kayarak inmeyi ve bulutlarda zıplamayı öğretti.",
          "Şimdiye kadar yaşadığı en eğlenceli maceraydı!"
        ],
        isEnding: true,
        endingType: 'adventure',
        endingTitle: 'Cloud Castle Discovery',
        endingTitleTr: 'Bulut Kalesi Keşfi'
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
        paragraphsTr: [
          "Bıyık mavi tüye dokunduğunda yumuşak bir ses duydu.",
          "'Ben Azura, Bilge Rüzgar Kuşuyum. Bu benim çağrı tüyüm.'",
          "Parıldayan kanatlarıyla muhteşem mavi bir kuş bulutlardan indi.",
          "'Sen nazik ve yumuşak kalplisin,' dedi Azura. 'Sana kuşların dilini öğreteceğim.'",
          "O günden sonra Bıyık ormandaki her cıvıltıyı, ötüşü ve şarkıyı anlayabiliyordu.",
          "Kuşlardan muhteşem hikayeler öğrendi — uzak diyarlar, okyanus kıyıları ve dağ tepeleri hakkında.",
          "Bıyık artık Kuşlarla Konuşan Kedi olarak tanınıyordu!"
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The Gift of Understanding',
        endingTitleTr: 'Anlayış Hediyesi'
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
        paragraphsTr: [
          "Anahtardan çıkan kelebekleri takip ederek Bıyık ve Bal gizli Dostluk Bahçesini buldular.",
          "Şimdiye kadar gördükleri en sihirli yerdi! Her renkte çiçek açmıştı.",
          "Ortada yan yana iki salıncaklı bir ağaç vardı.",
          "'Bu bahçe sadece gerçek arkadaşlar için belirir,' diye açıkladı sevimli bir Bahçe Cücesi.",
          "Bıyık ve Bal her hafta özel bahçelerine gelmeye söz verdiler.",
          "Ne zaman biri üzgün hissetse, diğeri 'Hadi BİZİM bahçeye gidelim!' derdi.",
          "Çünkü bazı hazineler altın ya da mücevher değildir — maceralarını paylaştığın arkadaşlardır."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'Our Friendship Garden',
        endingTitleTr: 'Dostluk Bahçemiz'
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
        paragraphsTr: [
          "Peri Bıyık'ın sırtına sihirli yıldız tozu serpti.",
          "Omuzlarından güzel, saydam kanatlar çıktı — sabah çiyi gibi parıldıyordu!",
          "'Bu kanatlar gerçekten ihtiyacın olduğunda belirecek,' diye açıkladı peri.",
          "Bıyık havaya sıçradı ve UÇTU! Ağaçların tepelerinde süzüldü, bulutlara dokundu.",
          "Aşağıdaki tüm ormanı görebiliyordu — evini, arkadaşlarının evlerini, nehri, her şeyi!",
          "'Her şeyin nasıl birbirine bağlı olduğunu görebiliyorum,' diye hayranlıkla fısıldadı Bıyık.",
          "Büyülü Ormanın Koruyucu Kedisi oldu!"
        ],
        isEnding: true,
        endingType: 'adventure',
        endingTitle: 'Wings of Wonder',
        endingTitleTr: 'Harika Kanatlar'
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
        paragraphsTr: [
          "Perinin gözleri sevinçle parladı. 'Bu en güzel dilek!'",
          "Minik asasını döndürdü ve PUF! Bıyık'la aynı boyda oldu!",
          "'Bu ormanda o kadar uzun süredir yalnızdım,' dedi peri. 'Gerçekten arkadaşım olur musun?'",
          "'Tabii ki!' Bıyık yeni arkadaşına sarıldı. 'Hadi birlikte maceralara atılalım!'",
          "Ve böylece Bıyık ile Yıldız Tozu perisi en iyi arkadaş oldular.",
          "Birlikte ormanı keşfettiler ve mantar tepelerinde çay partileri verdiler.",
          "Bıyık en iyi hazinenin bulunmadığını öğrendi — kalbini yeni arkadaşlara açtığında yaratılır."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'A Friend Like Stardust',
        endingTitleTr: 'Yıldız Tozu Gibi Bir Arkadaş'
      }
    ]
  },
  // 🎮 INTERACTIVE STORY 2 - Flying Carpet Adventure
  {
    id: '21',
    title: 'The Magic Carpet Ride',
    titleTr: 'Sihirli Halı Yolculuğu',
    subtitle: '🎮 Interactive • Magic',
    subtitleTr: '🎮 İnteraktif • Sihir',
    duration: '8+ min',
    theme: 'Magic',
    coverUrl: IMAGES.MAGIC_CARPET,
    character: 'Luna & the Magic Carpet',
    ageRange: '4-8',
    moral: 'The best adventures are the ones where you help others along the way.',
    moralTr: 'En güzel maceralar yol boyunca başkalarına yardım ettiklerindir.',
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
          "Tozlu eski bir çatı katında, Luna adında genç bir kız köşede sarılmış güzel bir halı buldu.",
          "Halıyı açtığında altın ipliklerle parıldadı ve HAVADA SÜZÜLMEYE başladı!",
          "'Merhaba Luna!' dedi halı sıcak, dostça bir sesle. 'Ben Zefir, Sihirli Halıyım.'",
          "'Seni istediğin her yere götürebilirim. Ama akıllıca seç — her yolculuğun kendine has sihri var.'",
          "Luna'nın gözleri heyecanla parladı. Önce nereye gitmeliydi?"
        ],
        choices: [
          { id: 'go_clouds', text: "Fly to the clouds!", textTr: "Bulutlara uç!", emoji: "☁️", nextBranchId: 'cloud_kingdom', consequence: "What's hiding above the clouds?", consequenceTr: "Bulutların üstünde ne gizli?" },
          { id: 'go_desert', text: "Visit the golden desert", textTr: "Altın çöle git", emoji: "🏜️", nextBranchId: 'desert_palace', consequence: "Ancient mysteries await...", consequenceTr: "Antik gizemler bekliyor..." },
          { id: 'go_ocean', text: "Soar over the sparkling ocean", textTr: "Parlayan okyanusun üzerinde süzül", emoji: "🌊", nextBranchId: 'ocean_adventure', consequence: "The sea holds many secrets!", consequenceTr: "Deniz birçok sır barındırır!" }
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
          "Zefir yukarı, yukarı, daha yukarı, kabarık beyaz bulutların arasından fırladı!",
          "Bulutların üzerinde tamamen pamuk şekerden ve gökkuşağından yapılmış sihirli bir krallık vardı!",
          "Bulut Kralı onlara yaklaştı. 'Hoş geldiniz yolcular! Ama bir sorunumuz var.'",
          "'Gökkuşağı makinemiz bozuldu ve o olmadan yeryüzündeki çocuklar yağmurdan sonra gökkuşağı göremez.'",
          "Luna Zefir'e baktı. Ne yapmalılardı?"
        ],
        choices: [
          { id: 'fix_rainbow', text: "Help fix the rainbow machine!", textTr: "Gökkuşağı makinesini tamir et!", emoji: "🌈", nextBranchId: 'rainbow_ending', consequence: "Be the hero!", consequenceTr: "Kahraman ol!" },
          { id: 'find_parts', text: "Search for missing parts", textTr: "Eksik parçaları ara", emoji: "🔍", nextBranchId: 'search_ending', consequence: "Every piece matters...", consequenceTr: "Her parça önemli..." }
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
          "Hazine gibi parlayan altın kum tepelerinin üzerinden uçtular.",
          "Uzakta kumlardan yükselen muhteşem bir saray göründü!",
          "Nazik bir Sultan onları karşıladı. 'Tam zamanında geldiniz! Bu gece Yıldız Festivali var.'",
          "'Ama sihirli fenerlerimiz hep söndü. Işık olmadan yıldızlar dans etmez.'",
          "Luna nasıl yardım edebilirdi?"
        ],
        choices: [
          { id: 'share_light', text: "Share Zephyr's magic glow", textTr: "Zefir'in sihirli ışığını paylaş", emoji: "✨", nextBranchId: 'lantern_ending', consequence: "Light up the night!", consequenceTr: "Geceyi aydınlat!" },
          { id: 'call_fireflies', text: "Call the desert fireflies", textTr: "Çöl ateşböceklerini çağır", emoji: "🪲", nextBranchId: 'firefly_ending', consequence: "Nature's little helpers!", consequenceTr: "Doğanın küçük yardımcıları!" }
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
          "Kristal mavi suların üzerinde alçaktan süzüldüler, dalgalar aşağıda parıldıyordu.",
          "Birden minik bir ses duydular: 'Yardım edin! Yardım edin!'",
          "Ailesinden ayrılmış bir yavru yunustu!",
          "'Lütfen,' diye ağladı yunus, 'eve giden yolu bulamıyorum!'",
          "Luna tam ne yapacağını biliyordu."
        ],
        choices: [
          { id: 'guide_dolphin', text: "Guide the dolphin home", textTr: "Yunusu eve götür", emoji: "🐬", nextBranchId: 'dolphin_ending', consequence: "Lead the way!", consequenceTr: "Yolu göster!" },
          { id: 'sing_song', text: "Sing a dolphin family song", textTr: "Yunus ailesi şarkısı söyle", emoji: "🎵", nextBranchId: 'song_ending', consequence: "Music brings families together!", consequenceTr: "Müzik aileleri birleştirir!" }
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
          "Luna ve Zefir birlikte gökkuşağı makinesini tamir ettiler.",
          "Açtıklarında şimdiye kadar görülen en güzel gökkuşağı gökyüzüne yayıldı!",
          "Dünyanın dört bir yanındaki çocuklar yukarı bakıp gülümsedi.",
          "Bulut Kralı Luna'ya minik bir gökkuşağı kristali verdi. 'Sihre ihtiyacın olduğunda bunu yakınında tut.'",
          "Eve dönerken Luna içinde sıcaklık hissetti. Pek çok çocuğa neşe getirmişti.",
          "'Bu şimdiye kadarki en güzel maceraydı,' diye fısıldadı Luna Zefir'e. Ve öyleydi."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Rainbow Maker',
        endingTitleTr: 'Gökkuşağı Yapımcısı'
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
          "Luna bulut krallığının her yerini aradı.",
          "En beklenmedik yerlerde gökkuşağı parçaları buldu — bir gül bahçesinde kırmızı parça, bir su birikintisinde mavi, dört yapraklı yoncada gizlenen yeşil!",
          "Hepsini bir araya getirdiğinde gökkuşağı eskisinden daha da GÜZEL oldu!",
          "'Bize önemli bir şey öğrettin,' dedi Bulut Kralı. 'Bazen kırık şeyler özenle yeniden yapıldığında daha da güzel olur.'",
          "Luna gülümsedi. Dikkatle bakmak ve asla pes etmemenin kendi başına sihir yapabileceğini öğrenmişti."
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The Piece Finder',
        endingTitleTr: 'Parça Bulucu'
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
          "Zefir tüm sihirli ışığıyla parladı ve Luna onu nazikçe her fenere yaydı.",
          "Fenerler birer birer canlandı, saray duvarlarına güzel desenler yansıttı.",
          "Gece çöktüğünde yıldızlar gökyüzünde dans etmeye başladı, aşağıdaki ışıkları yansıtarak!",
          "Sultanın halkı sevindi ve kutlama yaptı. 'Burada her zaman hoş gelirsin, Luna Işık Getiren!'",
          "Eve dönerken Luna yıldızların dansını izledi ve bu sihri her zaman kalbinde taşıyacağını bildi."
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
          "Luna ateşböceklerinin müziği sevdiğini hatırladı. Yumuşak, tatlı bir melodi mırıldanmaya başladı.",
          "Her kum tepesinin arkasından binlerce ateşböceği havaya yükseldi!",
          "Sarayın etrafında döndüler, herhangi bir fenerden daha güzel bir ışık gösterisi yarattılar!",
          "Yıldız Festivali Ateşböceği Festivaline dönüştü ve şimdiye kadarki en sihirli geceydi.",
          "Luna bazen en iyi çözümlerin doğayla uyum içinde çalışmaktan geldiğini öğrendi."
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The Firefly Whisperer',
        endingTitleTr: 'Ateşböceği Fısıldayan'
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
          "Luna ve Zefir alçak ve yavaş uçarak yavru yunusun sihirli izlerini takip etmesini sağladılar.",
          "Mercan mağaralarından ve sevimli deniz kaplumbağalarının yanından geçerek harika bir yolculuktan sonra yunus ailesini buldular!",
          "Yunuslar sevinçle zıplayıp sıçradı, havaya gökkuşağı damlacıkları saçtılar.",
          "'Teşekkür ederiz nazik gökyüzü yolcuları!' diye şarkı söylediler. 'Ailemizi bize geri verdiniz!'",
          "Luna en büyük hediyenin hazine ya da sihir olmadığını öğrendi — sevdiklerini bir araya getirmektir."
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
          "Luna Zefir'in öğrettiği kadim yunus ailesi şarkısını söyledi.",
          "Melodi dalgaların üzerinde taşındı ve çok geçmeden uzaklardan karşılık veren şarkılar geldi!",
          "Yavru yunusun anne babası güzel müziğin rehberliğinde onları buldu!",
          "Yunuslar Luna'yı birlikte yüzmeye davet etti ve Zefir onu sihirle sıcak ve kuru tuttu.",
          "O gece yıldızların altında Luna yunuslarla dans etti ve müziğin tüm kalpleri birleştirdiğini öğrendi."
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
    subtitle: '🎮 Interactive • Friendship',
    subtitleTr: '🎮 İnteraktif • Dostluk',
    duration: '7+ min',
    theme: 'Friendship',
    coverUrl: IMAGES.TEA_PARTY,
    character: 'Flora the Fox',
    ageRange: '3-6',
    moral: 'True friends make even the simplest moments magical.',
    moralTr: 'Gerçek arkadaşlar en basit anları bile sihirli yapar.',
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
        paragraphsTr: [
          "Tilki Flora, Fısıltı Ormanı’ndaki en özel çay partisini hazırlıyordu!",
          "Yaşlı meşe ağacının altına minik masasını kurdu; en iyi meşe palamudu fincanları ve mantar tabureleriyle.",
          "Ama eyvah! Masaya sadece üç misafir sığabilirdi ve BEŞ arkadaşı gelmek istiyordu!",
          "Davetiye göndermesi gerekiyordu. Kimi davet etmeliydi?"
        ],
        choices: [
          { id: 'invite_old', text: "Invite the oldest friends", textTr: "En eski arkadaşları davet et", emoji: "🦔🐰🦌", nextBranchId: 'old_friends', consequence: "Loyalty is precious...", consequenceTr: "Sadakat değerlidir..." },
          { id: 'invite_new', text: "Invite the newest friend and others", textTr: "En yeni arkadaşı ve diğerlerini davet et", emoji: "🐿️🦋🐦", nextBranchId: 'new_friends', consequence: "New friendships blossom!", consequenceTr: "Yeni dostluklar çiçek açar!" },
          { id: 'think_harder', text: "Think of a creative solution", textTr: "Yaratıcı bir çözüm düşün", emoji: "💡", nextBranchId: 'creative_solution', consequence: "There might be another way...", consequenceTr: "Başka bir yol olabilir..." }
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
        paragraphsTr: [
          "Flora en eski arkadaşlarını davet etti — Kirpi Hedgie, Tavşan Rosie ve Geyik Dotty.",
          "Bal kekleri ve papatya çayı paylaşarak harika vakit geçirdiler!",
          "Ama sonra Flora, Sincap, Kelebek ve Kuşun bir çalının arkasından üzgün üzgün izlediğini gördü.",
          "Flora’nın kalbi ağırlaştı. Ne yapmalıydı?"
        ],
        choices: [
          { id: 'apologize', text: "Invite them for dessert!", textTr: "Onları tatlıya davet et!", emoji: "🍰", nextBranchId: 'everyone_ending', consequence: "There's always room for more!", consequenceTr: "Her zaman yer vardır!" }
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
        paragraphsTr: [
          "Flora en yeni arkadaşı Sincap Sammy, Kelebek Bella ve Kuş Billy’yi davet etti.",
          "ÇOK heyecanlıydılar! Sammy daha önce hiç süslü bir çay partisine gelmemişti.",
          "‘Bu hayatımın en güzel günü!’ diye cıyakladı Sammy, gözleri sevinçle parlayarak.",
          "Flora yeni arkadaşlarını bu kadar özel ve hoş karşılanmış hissettirdiği için mutlu oldu.",
          "Partiden sonra Flora’nın eski arkadaşları anladıklarını söylediler — yeni arkadaşları hoş karşılamak önemlidir!"
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Welcoming Host',
        endingTitleTr: 'Misafirperver Ev Sahibi'
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
        paragraphsTr: [
          "Flora’nın bir fikri vardı! ‘Ya partiyi DAHA BÜYÜK yaparsak?’",
          "Daha fazla mantar tabure topladı ve Bay Kunduz’dan daha uzun bir masa yapmasına yardım etmesini istedi.",
          "Öğleden sonra HERKES için yer vardı!",
          "Beş arkadaşının hepsi geldi ve ormanın gördüğü en büyük, en mutlu çay partisi oldu!",
          "Flora bazen en iyi çözümün daha az değil, daha fazla yer açmak olduğunu öğrendi."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'Room for Everyone',
        endingTitleTr: 'Herkese Yer Var'
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
        paragraphsTr: [
          "Flora diğer arkadaşlarının yanına koştu. ‘Lütfen tatlı için bize katılın!’",
          "Masanın etrafında kütüklere ve battaniyelere sıkışarak oturdular.",
          "Biraz kalabalıktı ama herkes gülüyor ve ikram paylaşıyordu.",
          "‘Bu şimdiye kadarki en güzel çay partisi!’ diye hepsi hemfikir oldu.",
          "Flora gülümsedi. En iyi partilerin mükemmel olmadığını öğrendi — sadece sevgiyle dolu olduklarını."
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'The More The Merrier',
        endingTitleTr: 'Ne Kadar Kalabalık O Kadar Keyifli'
      }
    ]
  },
  // 🎮 INTERACTIVE STORY 4 - Penguin's Big Show
  {
    id: '23',
    title: "Penny's Big Show",
    titleTr: "Penny'nin Büyük Gösterisi",
    subtitle: '🎮 Interactive • Courage',
    subtitleTr: '🎮 İnteraktif • Cesaret',
    duration: '8+ min',
    theme: 'Courage',
    coverUrl: IMAGES.PENGUIN_SHOW,
    character: 'Penny the Penguin',
    ageRange: '4-7',
    moral: 'Being brave means trying even when you are afraid.',
    moralTr: 'Cesur olmak, korksan bile denemek demektir.',
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
        paragraphsTr: [
          "Bu gece geceydi! Penguen Penny Büyük Buz Gösterisinde sahneye çıkacaktı!",
          "Haftalardır dansını prova etmişti, buzda dönerek ve kayarak.",
          "Ama perdenin arkasından KOCAMAN seyirciyi görünce kanatları titremeye başladı!",
          "Karnı zıplayan balıklarla doluymuş gibi hissetti. Penny ne yapmalıydı?"
        ],
        choices: [
          { id: 'deep_breath', text: "Take deep breaths and try", textTr: "Derin nefes al ve dene", emoji: "🌬️", nextBranchId: 'brave_try', consequence: "Courage begins with one breath...", consequenceTr: "Cesaret bir nefesle başlar..." },
          { id: 'find_friend', text: "Find a friend backstage", textTr: "Sahne arkasında bir arkadaş bul", emoji: "🐧", nextBranchId: 'friend_help', consequence: "Friends make everything easier!", consequenceTr: "Arkadaşlar her şeyi kolaylaştırır!" },
          { id: 'practice_more', text: "Practice one more time", textTr: "Bir kez daha prova yap", emoji: "🩰", nextBranchId: 'extra_practice', consequence: "One more try can't hurt...", consequenceTr: "Bir deneme daha zarar vermez..." }
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
        paragraphsTr: [
          "Penny gözlerini kapattı ve üç derin nefes aldı. Bir... iki... üç...",
          "Büyükannesinin söylediğini hatırladı: ‘Cesur olmak korkmamak değildir. Korksan bile denemektir.’",
          "Penny sahneye yürüdü. Spot ışığı parlak ve sıcaktı.",
          "Dans etmeye başladı ve harika bir şey oldu — korkmayı unuttu!",
          "Seyirciler tezahürat etti ve Penny buzda uçuyormuş gibi hissetti!"
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Brave Dancer',
        endingTitleTr: 'Cesur Dansçı'
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
        paragraphsTr: [
          "Penny sahne arkasında en iyi arkadaşı Pip’i buldu.",
          "‘Çok korkuyorum!’ diye fısıldadı Penny. ‘Ya düşersem?’",
          "Pip onun kanadını tuttu. ‘O zaman tekrar kalkarsin! Ve ben tam burada seni destekliyorum.’",
          "Pip’in orada olduğunu bilmek bile Penny’yi daha cesur yaptı.",
          "Sahneye çıktı ve güzelce dans etti. Ne zaman sahne arkasına baksa Pip gülümsüyor ve el sallıyordu!"
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'Friends Give Courage',
        endingTitleTr: 'Arkadaşlar Cesaret Verir'
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
        paragraphsTr: [
          "Penny köşede bir kez daha provayı tekrarladı.",
          "Dön, kay, zıpla, eğil! Her hareketi mükemmel biliyordu.",
          "‘Bunu YAPABİLİRİM!’ dedi kendi kendine.",
          "Sahneye çıktığında kasları her hareketi hatırladı. Olduğu yıldız gibi dans etti!",
          "Seyirciler ayakta alkışladı ve Penny hazırlığın güven verdiğini öğrendi!"
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'Practice Makes Perfect',
        endingTitleTr: 'Pratik Mükemmelleştirir'
      }
    ]
  },
  // 🎮 INTERACTIVE STORY 5 - Wolf Princess
  {
    id: '24',
    title: 'The Wolf and the Moon Princess',
    titleTr: 'Kurt ve Ay Prensesi',
    subtitle: '🎮 Interactive • Kindness',
    subtitleTr: '🎮 İnteraktif • İyilik',
    duration: '10+ min',
    theme: 'Kindness',
    coverUrl: IMAGES.WOLF_PRINCESS,
    character: 'Shadow the Wolf',
    ageRange: '5-9',
    moral: 'Kindness can change hearts and break old fears.',
    moralTr: 'İyilik kalpleri değiştirebilir ve eski korkuları yenebilir.',
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
        paragraphsTr: [
          "Ay Işığı Krallığında, Gölge adında nazik bir kurt ormanda yalnız yaşardı.",
          "Köylüler kurtlardan korkardı, bu yüzden Gölge’nin hiç arkadaşı olmamıştı.",
          "Bir gece kaledeki yüksek kuleden ağlama sesi duydu. Ay Prensesi hapsedilmişti!",
          "Kötü bir büyü onu kilitli tutuyordu ve sadece saf bir iyilik eylemi büyüyü bozabilirdi.",
          "Gölge yardım etmek istiyordu ama köylüler onu kovacaktı. Ne yapmalıydı?"
        ],
        choices: [
          { id: 'sneak', text: "Sneak to the tower at night", textTr: "Gece gizlice kuleye git", emoji: "🌙", nextBranchId: 'night_journey', consequence: "Under the cover of darkness...", consequenceTr: "Karanlığın örtüsü altında..." },
          { id: 'ask_animals', text: "Ask the forest animals for help", textTr: "Orman hayvanlarından yardım iste", emoji: "🦊🐰", nextBranchId: 'animal_help', consequence: "Friends come in all forms!", consequenceTr: "Arkadaşlar her şekilde gelir!" },
          { id: 'approach_village', text: "Bravely approach the village", textTr: "Cesurca köye yaklaş", emoji: "🏘️", nextBranchId: 'village_approach', consequence: "Face your fears...", consequenceTr: "Korkularınla yüzleş..." }
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
        paragraphsTr: [
          "Gölge uyuyan köyden gizlice geçti, yumuşak patileri hiç ses çıkarmıyordu.",
          "Duvarlarında büyüyen sarmaşıkları kullanarak kuleye tırmandı.",
          "Prenses şaşırdı ama korkmadı. ‘Bir kurt mu? Ama... çok iyi görünüyorsun!’",
          "‘Sana yardım etmek istiyorum,’ dedi Gölge yumuşakça. ‘Büyüyü ne bozabilir?’",
          "Prenses gülümsedi. ‘Büyü ancak karşılığında hiçbir şey beklemeyen birinin iyiliğiyle bozulabilir.’",
          "Gölge’nin düşünmesine gerek yoktu. Nazikçe elini tuttu ve hiçbir şey istemeden kuleden aşağı indirdi."
        ],
        choices: [
          { id: 'spell_breaks', text: "Watch the magic happen", textTr: "Sihrin gerçekleşmesini izle", emoji: "✨", nextBranchId: 'spell_ending', consequence: "Pure kindness works wonders!", consequenceTr: "Saf iyilik harikalar yaratır!" }
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
        paragraphsTr: [
          "Gölge tüm orman hayvanlarını bir araya çağırdı — tilkiler, tavşanlar, geyikler ve kuşlar.",
          "‘Sen prensesi kurtarirken biz muhafızların dikkatini dağıtabiliriz!’ dedi cesur küçük bir fare.",
          "Hayvanlar birlikte çalıştı. Kuşlar ağaçlarda şarkı söyledi, tavşanlar bahçelerde zıpladı ve tilkiler komik numaralar yaptı!",
          "Herkes hayvanları izlerken Gölge fark edilmeden kuleye süzüldü.",
          "Prensesi buldu ve birlikte farelerin keşfettiği gizli bir geçitten kaçtılar!"
        ],
        isEnding: true,
        endingType: 'adventure',
        endingTitle: 'The Forest Alliance',
        endingTitleTr: 'Orman İttifakı'
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
        paragraphsTr: [
          "Gölge derin bir nefes aldı ve güpegündüz köye yürüdü.",
          "İnsanlar çığlık atıp kaçtı! Ama Gölge hırlamadı ya da kimseyi korkutmadı.",
          "Sadece oturdu ve bekledi.",
          "Yaşlı bir kadın onu dikkatlice inceledi. ‘Bu kurt... tehlikeli değil. Gözlerine bakın — nazikler!’",
          "Yavaş yavaş köylüler kurtlar hakkında yanıldıklarını anladılar. Gölge’ye teşekkür ettiler ve yardımını istediler.",
          "Birlikte kuleye yürüdüler ve Prensesi kurtardılar; Prenses kurtlarla köylülerin sonsuza dek arkadaş olacağını ilan etti."
        ],
        isEnding: true,
        endingType: 'lesson',
        endingTitle: 'Breaking Old Fears',
        endingTitleTr: 'Eski Korkuları Yenmek'
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
        paragraphsTr: [
          "Gölge ödül düşünmeden Prensese yardım ettiği an, kule gümüş ışıkla parladı!",
          "Büyü ilkbaharda eriyen buz gibi paramparça oldu!",
          "Köylüler her şeyi gördü ve kurtlar hakkında yanıldıklarını anladılar.",
          "‘Prensesimizi kurtardın!’ diye sevindiler. ‘Sen bir kahramansın!’",
          "Kral Gölge’yi Kraliyet Koruyucusu ilan etti. İlk kez Gölge’nin bir evi ve ailesi oldu.",
          "Ay Prensesi en iyi arkadaşı oldu ve sık sık birlikte ayın doğuşunu izlediler — artık yalnız değillerdi."
        ],
        isEnding: true,
        endingType: 'happy',
        endingTitle: 'The Gentle Guardian',
        endingTitleTr: 'Nazik Koruyucu'
      }
    ]
  }
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
    features: ['3 Free AI Stories/mo', 'Access to Public Library', 'Ads included'],
    color: 'bg-white/10',
    buttonText: 'Current Plan'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    features: ['Unlimited AI Stories', 'No Ads', 'Exclusive Themes', 'HD Audio'],
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