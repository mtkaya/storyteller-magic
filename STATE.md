# STATE.md

Bu dosya, storyteller-magic icin calisma hafizasidir.
Sohbet gecmisi yerine bu dosya esas alinmalidir.
Sadece dogrulanmis bilgiler yazilmalidir.

## Current Goal
- Storyteller Magic'i `library-first`, maliyet kontrollu ve urunlesebilir bir bedtime story uygulamasi haline getirmek.
- Local story engine'i ana deneyim yapmak.

## Product Strategy
- Ana deneyim: curated / local story library
- Opsiyonel katman: remote generation
- Opsiyonel katman: premium narration / TTS
- Kullaniciya canli AI varmis gibi yaniltici mesaj verilmemeli

## Verified Completed Changes
- `feat(onboarding): add child name step before app entry`
  - Onboarding akisina 5. adim olarak cocuk adi sorulmaktadir
  - App.tsx handleOnboardingComplete: verilen isim default profile'a yaziliyor
  - localStorage: onboarding_child_name key ile kaydediliyor
- `refactor(data): derive RECENT_STORIES from VAULT_LINEAR_STORIES`
  - RECENT_STORIES artik VAULT_LINEAR_STORIES.slice(0,3) ile turetiliyor
  - 9 metadata-only shell card (ID 4-12) LIBRARY_STORIES'den kaldirildi
  - Tek kaynak: VAULT_SEEDS → VAULT_LINEAR/INTERACTIVE_STORIES
- Settings sayfasi tamamen fonksiyonel:
  - Dil secimi (EN/TR), uyku timer, okuma hizi, ses seviyeleri, tema toggle, bildirimler
  - Ebeveyn kontrolleri, parent report, Canva export
- Local-only akista uygulama calisiyor
- 96 linear + N interactive vault story, hepsi VAULT_SEEDS'den turetiliyor

## Important Commits
- `70091e0` feat(onboarding): add child name step before app entry
- `4ee629c` refactor(data): derive RECENT_STORIES from VAULT_LINEAR_STORIES
- `9f4586f` feat: story map unlocks, 10 new seeds, UI polish, settings, parent report, audio

## Open Issues
- Remote generation (Gemini) ve premium TTS API key olmadan calismiyor (kasitli, local-first)
- Commercialization model karari alinmamis
- Scene/cover visual continuity tam oturmamis

## Next Suggested Step
- Smoke test: onboarding akisi → isim gir → hikaye sec → oku → secim yap → badge kazan
- Commercialization model karari (A/B/C) ve LICENSE dosyasi guncellemesi
- App Store / Play Store metadata hazirligi

## Update Rule
Her anlamli teknik veya urunsel adimdan sonra su alanlar guncellenmeli:
- ne degisti, hangi commit, acik sorunlar, siradaki somut adim
