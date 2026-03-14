# STATE.md

Bu dosya, storyteller-magic icin calisma hafizasidir.

## Current Goal
Storyteller Magic'i library-first, maliyet kontrollu ve urunlesebilir bir bedtime story uygulamasi haline getirmek.

## Verified Completed Changes

### Onboarding
- 4 feature slide + dil secimi + cocuk adi adimi (5. adim)
- Adi girince buton kisisellesir: "Zeynep'in Masallarına Başla ✨"
- Tamamlaninca App.tsx default profile adi guncelleniyor

### Data tekli kaynak
- RECENT_STORIES artik VAULT_LINEAR_STORIES.slice(0,3) ile turetiliyor
- 9 metadata-only shell card (ID 4-12) LIBRARY_STORIES'den kaldirildi

### Settings
- Dil, uyku timer, okuma hizi, volume slider'lari, tema toggle, bildirimler
- Ebeveyn kontrolleri, parent report, Canva CSV export — tamamen calisir

### Commercialization
- MONETIZATION.md: Freemium model (Free / Pro ₺299,99/ay / Aile ₺2.499,99/yil)
- LICENSE: Proprietary / All rights reserved
- Odeme entegrasyonu yok — RevenueCat veya Stripe gerekir

### Store Metadata
- metadata/app-store-en.md, metadata/app-store-tr.md
- metadata/play-store-en.md
- Ekran goruntusu kilavuzu ve anahtar kelimeler hazir

### Prompt Kutuphanesi
- docs/illustration-prompts.md: tema kapak promptlari, teknik presetler, TR sablonlar, kontrol listesi
- docs/seed-prompts.md: 21 seed × 12 prompt = 252 hazir gorsel promptu
  (her seed icin cover + 8 sahne + 3 branch — EN)

## Important Commits
- 930e971 feat(prompts): 252 per-seed prompt paketi
- 9475fa9 feat(store): App Store + Play Store metadata
- 67ac26f feat(biz): LICENSE + MONETIZATION.md
- 70091e0 feat(onboarding): cocuk adi adimi
- 4ee629c refactor(data): RECENT_STORIES tek kaynak

## Open Issues
- Visual continuity (4. madde): companion/place Story tipine eklenmedi — sonraki oturuma birakildi
- Remote generation (Gemini) ve premium TTS API key olmadan calismiyor (kasitli)
- App Store / Play Store gonderimi icin: gizlilik politikasi URL'i barindirmak gerekiyor

## Next Suggested Step
- Story type'a companion/place alanlari ekle, vault builder'lara gec, deriveStoryVisualIdentity'i guncelle
- Smoke test: tum ekranlari telefonda dene
- Screenshot'lar cek (store metadata icin)
- RevenueCat veya Stripe entegrasyonu karari

## Update Rule
Her anlamli adimdan sonra: ne degisti, hangi commit, acik sorunlar, siradaki adim.
