# Illustration Prompt Pack

Use these prompts when generating story covers so outputs stay in an illustrated style.

## Global Style Lock

Always include this in every prompt:

```text
children's book illustration, hand-painted digital art, soft painterly shapes, clean composition, bedtime-friendly mood, whimsical but calm, no photorealism
```

Always include this negative prompt:

```text
no photorealism, no realistic camera lens, no real photo texture, no harsh shadows, no horror, no violence, no text watermark, no logo
```

## Theme Prompt Starters

### Adventure

```text
children's book cover, brave but gentle adventure, winding path, glowing horizon, cozy color grading, expressive friendly character
```

### Friendship

```text
children's book cover, warm friendship moment, soft lantern lights, cozy meadow, inviting facial expressions, pastel highlights
```

### Magic

```text
children's book cover, enchanted forest clearing, floating sparkles, magical artifacts, dreamy atmosphere, playful wonder
```

### Nature

```text
children's book cover, moonlit forest with calm animals, soft leaves, gentle night sky, peaceful bedtime energy
```

### Space

```text
children's book cover, dreamy cosmos, friendly planets and stars, soft nebula clouds, imaginative exploration mood
```

### Underwater

```text
children's book cover, calm underwater world, glowing corals, bubbles, friendly sea creatures, bedtime serenity
```

### Seasons (Autumn)

```text
children's book cover, golden autumn forest, falling colorful leaves, warm orange and red palette, cozy harvest mood, gentle twilight
```

### Seasons (Winter)

```text
children's book cover, snowy pine forest, soft snowflakes, silvery moonlight, peaceful winter night, warm lantern glow
```

### Seasons (Spring)

```text
children's book cover, blooming meadow, fresh green grass, budding flowers, soft morning light, gentle awakening mood
```

### Seasons (Summer)

```text
children's book cover, warm twilight field, fireflies glowing, starry night, peaceful summer evening, gentle warm breeze atmosphere
```

### Folklore

```text
children's book cover, ancient forest clearing, mystical moonlight, old stone circles, folk tale atmosphere, gentle magical heritage
```

## Technique Presets

### Watercolor

```text
watercolor wash edges, airy blends, soft dreamy transitions, gentle pigment bloom
```

### Gouache

```text
bold gouache brush strokes, rich matte color blocks, confident silhouettes, clean edge control
```

### Flat Storybook

```text
flat storybook geometry, crisp layered shapes, editorial clarity, simplified perspective
```

### Cut-Paper

```text
cut-paper collage layers, tactile overlaps, handcrafted depth, subtle paper shadow separation
```

## Age Direction Profiles

### Ages 2-4

```text
very simple forms, large focal character, low visual noise, high readability
```

### Ages 4-6

```text
clear emotions, simple environment cues, medium detail, friendly rhythm
```

### Ages 6-8

```text
richer environment details, layered storytelling props, balanced complexity
```

### Ages 8+

```text
cinematic framing, nuanced lighting, deeper world detail, stronger atmosphere
```

## Full Prompt Template

```text
Children's book cover illustration for "{TITLE}".
Theme: {THEME}.
Main character: {CHARACTER}.
Mood: {TONE}.
Scene: {SCENE_DESCRIPTION}.
Technique preset: {TECHNIQUE}.
Age direction: {AGE_PROFILE}.
Style: children's book illustration, hand-painted digital art, soft painterly shapes, clean composition, bedtime-friendly mood, whimsical but calm.
Color direction: rich but gentle palette, warm highlights, soft contrast.
Framing: vertical 3:4, centered focal character, readable cover composition.
Negative prompt: no photorealism, no realistic camera lens, no real photo texture, no harsh shadows, no horror, no violence, no text watermark, no logo.
```

## App Defaults

- Theme-based technique auto-selection:
  - `adventure`, `courage`: `gouache`
  - `friendship`, `nature`, `bedtime`, `kindness`, `family`: `watercolor`
  - `space`, `calm`: `flat-storybook`
  - `magic`, `underwater`: `cut-paper`
- Age range auto-adjusts composition density and text hierarchy.
- Optional override: `VITE_ILLUSTRATION_STYLE_OVERRIDE=watercolor|gouache|flat-storybook|cut-paper`

## Quick Try

1. Create a story in the app.
2. Open the result screen.
3. Use `Copy Prompt`.
4. Paste into your image model.
5. Keep image ratio at `3:4`.

## Production Prompt Library (Cover + Story Sequence)

Use this section when you want many consistent images for one story.

### Continuity Lock (append to every scene prompt)

```text
same main character design as previous scene, same costume palette, same world art direction, same brush language, no style drift, no text, no logo, vertical 3:4
```

### Cover Prompts (All Core Themes)

#### Adventure Cover

```text
children's book cover, brave but gentle adventure, winding path, glowing horizon, cozy color grading, expressive friendly character, hand-painted digital illustration, bedtime-friendly mood
```

#### Friendship Cover

```text
children's book cover, warm friendship moment, soft lantern lights, cozy meadow, inviting facial expressions, pastel highlights, hand-painted digital illustration, bedtime-friendly mood
```

#### Magic Cover

```text
children's book cover, enchanted forest clearing, floating sparkles, magical artifacts, dreamy atmosphere, playful wonder, hand-painted digital illustration, bedtime-friendly mood
```

#### Nature Cover

```text
children's book cover, moonlit forest with calm animals, soft leaves, gentle night sky, peaceful bedtime energy, hand-painted digital illustration
```

#### Space Cover

```text
children's book cover, dreamy cosmos, friendly planets and stars, soft nebula clouds, imaginative exploration mood, hand-painted digital illustration
```

#### Underwater Cover

```text
children's book cover, calm underwater world, glowing corals, bubbles, friendly sea creatures, bedtime serenity, hand-painted digital illustration
```

#### Calm Cover

```text
children's book cover, quiet bedtime room, moon glow, sleepy clouds, soft transitions, soothing low-stimulation palette, hand-painted digital illustration
```

#### Bedtime Cover

```text
children's book cover, sleepy village at night, warm window lights, crescent moon, cozy atmosphere, lullaby mood, hand-painted digital illustration
```

#### Courage Cover

```text
children's book cover, tiny hero facing a gentle challenge, warm beam of light, hopeful expressions, comforting heroic framing, hand-painted digital illustration
```

#### Mystery Cover

```text
children's book cover, gentle mystery scene, hidden clues, magical attic corner, glowing dust particles, curious but safe atmosphere, hand-painted digital illustration
```

#### Family Cover

```text
children's book cover, cozy family moment, warm hearth light, caring expressions, safe home mood, bedtime-friendly composition, hand-painted digital illustration
```

#### Kindness Cover

```text
children's book cover, heartwarming helping moment, soft glow, welcoming gestures, gentle pastel warmth, hand-painted digital illustration
```

#### Wonder Cover

```text
children's book cover, twinkling sky discovery, magical awe, soft radiant highlights, curious joyful mood, hand-painted digital illustration
```

#### Wisdom Cover

```text
children's book cover, thoughtful library scene, lantern-lit reading nook, gentle mentor character, calm intellectual warmth, hand-painted digital illustration
```

#### Autumn Cover

```text
children's book cover, golden autumn forest, falling leaves, harvest baskets, cozy orange and red palette, gentle twilight mood, hand-painted digital illustration
```

#### Winter Cover

```text
children's book cover, snowy pine forest, soft snowflakes, warm lantern glow, peaceful winter night, silvery moonlight, hand-painted digital illustration
```

#### Spring Cover

```text
children's book cover, blooming meadow, fresh flowers, morning dew, gentle awakening atmosphere, soft pastel greens and pinks, hand-painted digital illustration
```

#### Summer Cover

```text
children's book cover, firefly-lit twilight field, starry summer evening, warm gentle breeze, peaceful nighttime meadow, hand-painted digital illustration
```

#### Folklore Cover

```text
children's book cover, ancient forest clearing, mystical stone circle, moonlit folk tale scene, timeless heritage mood, hand-painted digital illustration
```

### Sequential Story Prompts (8 Scenes)

Use one set per story. Replace placeholders:
- `{THEME_FLAVOR}`
- `{MAIN_CHARACTER}`
- `{COMPANION}`
- `{LOCATION}`

#### Scene 1 - Opening

```text
children's book scene, opening moment, {MAIN_CHARACTER} arrives at {LOCATION}, gentle curiosity, readable focal composition, {THEME_FLAVOR}, hand-painted digital illustration, soft bedtime palette
```

#### Scene 2 - Invitation

```text
children's book scene, {COMPANION} presents a small quest to {MAIN_CHARACTER}, warm expressions, story setup, {THEME_FLAVOR}, hand-painted digital illustration, cozy night lighting
```

#### Scene 3 - Journey Begins

```text
children's book scene, first steps into the journey, path details and small magical clues, hopeful movement, {THEME_FLAVOR}, hand-painted digital illustration
```

#### Scene 4 - Choice Point

```text
children's book scene, clear decision moment with two or three safe path options, visual branching, curious pause, {THEME_FLAVOR}, hand-painted digital illustration
```

#### Scene 5 - Mid Adventure

```text
children's book scene, exploration in progress, helpful interaction with a small friend, emotional warmth, {THEME_FLAVOR}, hand-painted digital illustration
```

#### Scene 6 - Climax

```text
children's book scene, gentle emotional peak, challenge resolved through kindness and courage, focused lighting, {THEME_FLAVOR}, hand-painted digital illustration
```

#### Scene 7 - Resolution

```text
children's book scene, peaceful return, calm smiles, world feels safer and brighter, {THEME_FLAVOR}, hand-painted digital illustration, lullaby mood
```

#### Scene 8 - Bedtime Ending

```text
children's book scene, bedtime closure, stars and moon, comforting final frame, sleepy calm atmosphere, {THEME_FLAVOR}, hand-painted digital illustration
```

### Theme Flavor Snippets (for {THEME_FLAVOR})

#### Adventure Flavor

```text
winding path, glowing horizon, brave but gentle momentum
```

#### Friendship Flavor

```text
warm lantern lights, shared smiles, cozy meadow togetherness
```

#### Magic Flavor

```text
enchanted clearing, floating sparkles, playful magical artifacts
```

#### Nature Flavor

```text
moonlit forest, soft leaves, peaceful wildlife presence
```

#### Space Flavor

```text
friendly planets and stars, dreamy nebula clouds, soft cosmic glow
```

#### Underwater Flavor

```text
glowing corals, calm bubbles, friendly sea creatures
```

#### Calm Flavor

```text
quiet room energy, soft gradients, soothing low-contrast composition
```

#### Bedtime Flavor

```text
moonlight lullaby mood, sleepy clouds, warm nighttime comfort
```

#### Courage Flavor

```text
small hero, gentle challenge, hopeful beam of light
```

#### Mystery Flavor

```text
safe hidden clues, curious observation, magical attic atmosphere
```

#### Family Flavor

```text
home warmth, protective togetherness, caring gestures
```

#### Kindness Flavor

```text
helping hands, welcoming expressions, soft glowing empathy
```

#### Wonder Flavor

```text
twinkling discovery, awe and curiosity, radiant magical atmosphere
```

#### Wisdom Flavor

```text
lantern-lit learning, thoughtful calm, gentle mentor presence
```

#### Autumn Flavor

```text
golden falling leaves, harvest warmth, cozy twilight preparation
```

#### Winter Flavor

```text
soft snowflakes, silvery moonlight, peaceful winter stillness
```

#### Spring Flavor

```text
blooming flowers, fresh green awakening, gentle morning renewal
```

#### Summer Flavor

```text
firefly glow, starlit fields, warm evening comfort
```

#### Folklore Flavor

```text
ancient stone circles, mystical moonlight, timeless folk wisdom
```

### Single-Cover-Only Story Mode

Use this when one story uses one main cover image only:

```text
children's book cover for "{TITLE}", {THEME_FLAVOR}, {MAIN_CHARACTER} centered, clear readable silhouette, hand-painted digital illustration, bedtime-friendly mood, rich but gentle palette, vertical 3:4, no text, no logo, no photorealism
```

### Interactive Story Branch Mode

Use these as extra prompts when the story has choices:

```text
children's book scene, choice branch A, optimistic path, safe adventure tone, {THEME_FLAVOR}, same main character design as previous scene, vertical 3:4
```

```text
children's book scene, choice branch B, calm clever path, gentle mystery cues, {THEME_FLAVOR}, same main character design as previous scene, vertical 3:4
```

```text
children's book scene, choice branch C, kindness-first path, warm social interaction, {THEME_FLAVOR}, same main character design as previous scene, vertical 3:4
```

---

## Türkçe Prompt Şablonları

### Global Stil Kilidi (TR)
```text
çocuk kitabı illüstrasyonu, el yapımı dijital sanat, yumuşak painterly şekiller, uyku dostu atmosfer, fantastik ama sakin, fotorealizm yok
```

### Negatif Prompt (TR)
```text
fotorealizm yok, gerçekçi kamera lensi yok, gerçek fotoğraf dokusu yok, sert gölge yok, korku yok, şiddet yok, metin filigranı yok, logo yok
```

### Tema Kapak Promptları (TR)

#### Macera
```text
çocuk kitabı kapağı, nazik macera, kıvrımlı yol, parlayan ufuk, sıcak renk gradasyonu, ifadeli dost karakter, el yapımı dijital illüstrasyon, uyku dostu atmosfer
```

#### Dostluk
```text
çocuk kitabı kapağı, sıcak dostluk anı, yumuşak fener ışıkları, rahat çayır, davet edici yüz ifadeleri, pastel vurgular, el yapımı dijital illüstrasyon
```

#### Sihir
```text
çocuk kitabı kapağı, büyülü orman açıklığı, uçuşan kıvılcımlar, sihirli nesneler, rüyamsı atmosfer, neşeli merak, el yapımı dijital illüstrasyon
```

#### Doğa
```text
çocuk kitabı kapağı, sakin hayvanlı mehtaplı orman, yumuşak yapraklar, nazik gece gökyüzü, huzurlu uyku öncesi enerji, el yapımı dijital illüstrasyon
```

#### Cesaret
```text
çocuk kitabı kapağı, küçük ama cesur kahraman, nazik bir meydan okuma, umut veren ışık huzmesi, teselli edici kahramanca çerçeveleme, el yapımı dijital illüstrasyon
```

#### Huzur
```text
çocuk kitabı kapağı, sessiz gece odası, ay ışığı, uykulu bulutlar, yumuşak geçişler, sakinleştirici düşük uyarı paleti, el yapımı dijital illüstrasyon
```

#### Uyku
```text
çocuk kitabı kapağı, geceleri uyuyan köy, sıcak pencere ışıkları, hilal ay, rahat atmosfer, ninni havası, el yapımı dijital illüstrasyon
```

#### Aile
```text
çocuk kitabı kapağı, rahat aile anı, sıcak şömine ışığı, ilgili ifadeler, güvenli ev havası, uyku dostu kompozisyon, el yapımı dijital illüstrasyon
```

#### Gizem
```text
çocuk kitabı kapağı, nazik gizem sahnesi, gizli ipuçları, sihirli tavan arası köşesi, parlayan toz parçacıkları, meraklı ama güvenli atmosfer, el yapımı dijital illüstrasyon
```

#### İyilik
```text
çocuk kitabı kapağı, yürek ısıtan yardım anı, yumuşak parıltı, davet edici jestler, nazik pastel sıcaklık, el yapımı dijital illüstrasyon
```

#### Merak
```text
çocuk kitabı kapağı, yıldızlı gökyüzü keşfi, büyülü hayranlık, yumuşak radyan vurgular, meraklı neşeli atmosfer, el yapımı dijital illüstrasyon
```

#### Bilgelik
```text
çocuk kitabı kapağı, düşünceli kütüphane sahnesi, fenerle aydınlatılmış okuma köşesi, nazik mentor karakter, sakin entelektüel sıcaklık, el yapımı dijital illüstrasyon
```

#### Sonbahar
```text
çocuk kitabı kapağı, altın sonbahar ormanı, düşen yapraklar, hasat sepetleri, rahat turuncu ve kırmızı palet, nazik alacakaranlık atmosfer, el yapımı dijital illüstrasyon
```

#### Kış
```text
çocuk kitabı kapağı, karlı çam ormanı, yumuşak kar taneleri, sıcak fener ışığı, huzurlu kış gecesi, gümüşi ay ışığı, el yapımı dijital illüstrasyon
```

#### Bahar
```text
çocuk kitabı kapağı, çiçek açan çayır, taze çiçekler, sabah çiyi, nazik uyanış atmosferi, yumuşak pastel yeşil ve pembeler, el yapımı dijital illüstrasyon
```

#### Yaz
```text
çocuk kitabı kapağı, ateşböceği ışıklı alacakaranlık tarlası, yıldızlı yaz akşamı, sıcak nazik esinti, huzurlu gece çayırı, el yapımı dijital illüstrasyon
```

#### Folklor
```text
çocuk kitabı kapağı, antik orman açıklığı, mistik taş çember, mehtaplı halk masalı sahnesi, zamansız miras atmosferi, el yapımı dijital illüstrasyon
```

### 8 Sahne Şablonu (TR)

Değiştirilecekler: `{TEMA_AROMASI}`, `{ANA_KARAKTER}`, `{YARDIMCI_KARAKTER}`, `{KONUM}`

#### Sahne 1 — Açılış (TR)
```text
çocuk kitabı sahnesi, açılış anı, {ANA_KARAKTER} {KONUM}'a ulaşıyor, nazik merak, okunabilir odak kompozisyonu, {TEMA_AROMASI}, el yapımı dijital illüstrasyon, yumuşak uyku paleti
```

#### Sahne 2 — Davet (TR)
```text
çocuk kitabı sahnesi, {YARDIMCI_KARAKTER} {ANA_KARAKTER}'a küçük bir görev sunuyor, sıcak ifadeler, hikaye kurulumu, {TEMA_AROMASI}, el yapımı dijital illüstrasyon, rahat gece aydınlatması
```

#### Sahne 3 — Yolculuk Başlar (TR)
```text
çocuk kitabı sahnesi, yolculuğa ilk adımlar, yol detayları ve küçük sihirli ipuçları, umutlu hareket, {TEMA_AROMASI}, el yapımı dijital illüstrasyon
```

#### Sahne 4 — Seçim Noktası (TR)
```text
çocuk kitabı sahnesi, iki veya üç güvenli yol seçeneğiyle net karar anı, görsel dallanma, meraklı duraklama, {TEMA_AROMASI}, el yapımı dijital illüstrasyon
```

#### Sahne 5 — Orta Macera (TR)
```text
çocuk kitabı sahnesi, keşif devam ediyor, küçük bir dostla yardımcı etkileşim, duygusal sıcaklık, {TEMA_AROMASI}, el yapımı dijital illüstrasyon
```

#### Sahne 6 — Doruk (TR)
```text
çocuk kitabı sahnesi, nazik duygusal zirve, iyilik ve cesaretle aşılan engel, odaklanmış aydınlatma, {TEMA_AROMASI}, el yapımı dijital illüstrasyon
```

#### Sahne 7 — Çözüm (TR)
```text
çocuk kitabı sahnesi, huzurlu dönüş, sakin gülümsemeler, dünya daha güvenli ve parlak hissettiriyor, {TEMA_AROMASI}, el yapımı dijital illüstrasyon, ninni havası
```

#### Sahne 8 — Uyku Kapanışı (TR)
```text
çocuk kitabı sahnesi, uyku kapanışı, yıldızlar ve ay, teselli edici son kare, uyuşuk sakin atmosfer, {TEMA_AROMASI}, el yapımı dijital illüstrasyon
```

### Tema Aroması Parçacıkları (TR)

```text
Macera: kıvrımlı yol, parlayan ufuk, nazik ama cesur ivme
Dostluk: sıcak fener ışıkları, paylaşılan gülümsemeler, rahat çayır birlikteliği
Sihir: büyülü açıklık, uçuşan kıvılcımlar, neşeli sihirli nesneler
Doğa: mehtaplı orman, yumuşak yapraklar, sakin vahşi hayat varlığı
Huzur: sessiz oda enerjisi, yumuşak geçişler, sakinleştirici düşük kontrast kompozisyon
Uyku: mehtap ninni havası, uykulu bulutlar, sıcak gece konforu
Cesaret: küçük kahraman, nazik meydan okuma, umutlu ışık huzmesi
Gizem: güvenli gizli ipuçları, meraklı gözlem, sihirli tavan arası atmosferi
Aile: ev sıcaklığı, koruyucu birliktelik, ilgili jestler
İyilik: yardım eden eller, davet edici ifadeler, yumuşak parlayan empati
Merak: yıldızlı keşif, hayranlık ve merak, radyan sihirli atmosfer
Bilgelik: fenerle aydınlatılmış öğrenme, düşünceli huzur, nazik mentor varlığı
Sonbahar: altın düşen yapraklar, hasat sıcaklığı, rahat alacakaranlık hazırlığı
Kış: yumuşak kar taneleri, gümüşi ay ışığı, huzurlu kış sessizliği
Bahar: çiçek açan çiçekler, taze yeşil uyanış, nazik sabah yenilenmesi
Yaz: ateşböceği parıltısı, yıldızlı tarlalar, sıcak akşam konforu
Folklor: antik taş çemberler, mistik ay ışığı, zamansız halk bilgeliği
```

---

## Üretim Kontrol Listesi

Görsel üretmeden önce kontrol et:

- [ ] Global stil kilidi prompt'a eklendi
- [ ] Negatif prompt eklendi
- [ ] Oran `3:4` (dikey) olarak ayarlandı
- [ ] Aynı hikayenin sahneleri tek oturumda üretildi
- [ ] Teknik preset tema ile eşleşiyor (Adventure/Courage → gouache, Friendship/Nature → watercolor, Magic/Mystery → cut-paper, Wonder/Wisdom → flat-storybook)
- [ ] Continuity lock (aynı karakter tasarımı) sahneler için eklendi
- [ ] Metin/logo/watermark kapatıldı
