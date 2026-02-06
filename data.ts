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
    subtitle: '🎮 Interactive • Adventure',
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