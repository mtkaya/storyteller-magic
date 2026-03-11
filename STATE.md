# STATE.md

Bu dosya, storyteller-magic icin calisma hafizasidir.
Sohbet gecmisi yerine bu dosya esas alinmalidir.
Sadece dogrulanmis bilgiler yazilmalidir.

## Current Goal
- Storyteller Magic'i `library-first`, maliyet kontrollu ve urunlesebilir bir bedtime story uygulamasi haline getirmek.
- Local story engine'i ana deneyim yapmak.
- Arayuz, gorsel butunluk ve story quality tarafini guclendirmek.

## Product Strategy
- Ana deneyim: curated / local story library
- Opsiyonel katman: remote generation
- Opsiyonel katman: premium narration / TTS
- Kullaniciya canli AI varmis gibi yaniltici mesaj verilmemeli
- Urun kapsami ve out-of-scope sinirlari `BOOTSTRAP.md` icinde yazili hale getirildi

## Verified Completed Changes
- `dev: add single-command local workflow`
- `settings: persist reader preferences`
- `ui: clarify story generation modes`
- `perf: cache repeated tts responses`
- `content: vary fallback story tone and titles`
- `reader: persist playback speed changes`
- `docs: add privacy and security notes`
- `content: tighten interactive branch quality`
- `copy: polish onboarding and subscription messaging`
- `content: make fallback stories more concrete`
- `product: reposition storyteller as library-first`
- `ui: simplify local-first product copy`
- `ui: strengthen story reveal and home hero`
- `ui: polish create screen selection panels`
- `ui: standardize story badges and subtitles`
- `visual: add story identity continuity layer`
- `ui: surface story visual identity cues`
- `ui: tighten home and library card polish`
- `content: reduce generic bedtime phrasing`
- `content: reduce repetitive interactive title patterns`
- `content: sharpen interactive choice motivation`
- `ui: enrich home hero cloud atmosphere`
- `ui: soften hero cloud edge blending`
- `copy: align interactive subtitle labels`
- `content: reduce repetitive interactive title patterns`
- `content: add unique seeds, prevent repeated characters in interactive pool`
- `content: connect interactive branch scenes to each seed context`
- `content: vary linear story midpoints with seed-aware scenes`

## Important Commits
- `5dd9824` dev: add single-command local workflow
- `1865345` settings: persist reader preferences
- `82b4131` ui: clarify story generation modes
- `0952491` perf: cache repeated tts responses
- `0bdff1b` content: vary fallback story tone and titles
- `d953851` reader: persist playback speed changes
- `4decfe7` docs: add privacy and security notes
- `714ee64` content: tighten interactive branch quality
- `d732c8c` copy: polish onboarding and subscription messaging
- `d95208b` content: make fallback stories more concrete
- `fd13c17` product: reposition storyteller as library-first
- `6278b2c` ui: simplify local-first product copy
- `f7bfc31` ui: strengthen story reveal and home hero
- `f1bd4c9` ui: polish create screen selection panels
- `d1749d7` ui: standardize story badges and subtitles
- `200bca0` visual: add story identity continuity layer
- `31e4f9a` ui: surface story visual identity cues
- `6d76294` ui: tighten home and library card polish
- `bced9de` content: reduce generic bedtime phrasing
- `99d0659` content: reduce repetitive interactive title patterns
- `aadda18` content: sharpen interactive choice motivation
- `59a469f` ui: enrich home hero cloud atmosphere
- `e8e3a8d` ui: soften hero cloud edge blending
- `526d208` copy: align interactive subtitle labels
- `99d0659` content: reduce repetitive interactive title patterns
- `a114bd7` content: add unique seeds, prevent repeated characters in interactive pool
- `1f146a9` content: connect interactive branch scenes to each seed context
- `1e7776d` content: vary linear story midpoints with seed-aware scenes

## Current Observations
- Local-only akista uygulama calisiyor.
- Frontend ve API lokal ortamda ayaga kalkabiliyor.
- `GEMINI_API_KEY` ve `OPENAI_API_KEY` yoksa remote generation / premium TTS calismiyor.
- Bu hata degil; local-first strateji ile uyumlu bir durum.
- Story kalitesi icin ikinci narrative pass uygulandi; fallback ve synthetic ending cümleleri daha somut gorev/sonuc diline cekildi.
- UI tarafinda hala polish ihtiyaci var, ancak `Create` ekranindaki secim bloklari ve kart hiyerarsisi bir tur daha toparlandi.
- Gorsel uretim sistemi mevcut ve continuity katmani artik hem prompt hem UI yuzeyine tasinmaya basladi; cover ve scene promptlar ortak story visual identity kullaniyor.

## Open Issues
- Home/Library yuzeyleri bir tur daha toparlandi; kapak overlay, metadata yogunlugu ve spacing daha tutarli hale geldi.
- Result / scene continuity bir tur daha guclendirildi; visual continuity UI'ya da tasinmaya basladi.
- Story quality ucuncu pass tamamlandi: 3 yeni benzersiz seed eklendi (14 seed), her karakter interactive havuzda artik yalnizca bir kez cikiyor, branch sahneleri her seed'in quest/place kontekstine baglanmadi, linear hikaye orta satin da seed'e gore cesitlendi.
- Hero bulut atmosferi iki tur guclendirildi; kenarlara daha dogal yayilan katmanli bulutlar eklendi.
- Profil avatar fallback emoji kaldirildi; material ikon ile degistirildi.
- Interactive subtitle'lardan emoji kaldirildi; yeni standart Secimli Hikaye / Interactive Story.

## Next Suggested Step
- Story quality: `storyGenerator.ts` tarafinda `INTERACTIVE_DETOUR_IDEAS` ve fallback branch cesitliligi kontrol edilsin.
- Home/Create/Result/Library yuzeylerinde son bir smoke test yap.
- Scene prompt / cover continuity: visual direction ayni kontekstle daha guclendirilsin.
- Commercialization model karari (A/B/C) ve LICENSE dosyasi.

## Update Rule
Her anlamli teknik veya urunsel adimdan sonra su alanlar guncellenmeli:
- ne degisti
- hangi commit atildi
- mevcut sorunlar neler
- siradaki somut adim ne
