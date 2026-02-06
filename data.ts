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
  HERO_BG: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0c5otyOclO2LzJXxKMk0tIek7Px8ZrlYOAkbxGQDnQLVFDWee7hftEYImBsD4yeHxUSGhZaH4PqM8MWvjJPWvDkgpm63uo_qRmHz-1sFjEXHJoQBqJHMeM4zDCerASp8SO8KxQF4j_C01jEhbpArcyFpx-zYtv8ir1RfdD87GRDWuSZ8RPmcBIxDfsAilGX_Dx3TexT-wpEFfz9YdnTikqvRTJH5SOmv0QTxRr9GQR5QXRznS6waVqtEbIUfzUOtZYTRVqqLdXes'
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