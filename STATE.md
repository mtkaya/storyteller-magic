# STATE.md

Bu dosya, storyteller-magic icin calisma hafizasidir.

## Current Goal
Storyteller Magic'i library-first, maliyet kontrollu ve urunlesebilir bir bedtime story uygulamasi haline getirmek.

## Verified Completed Changes

### Visual Continuity (✅ TAMAMLANDI)
- Story type'a `companion` ve `place` alanlari eklendi (types.ts)
- 21 vault seed'in tumu companion/place degerleriyle guncellendi
- buildVaultLinearStory ve buildVaultInteractiveStory fonksiyonlari companion/place propagate ediyor
- storyUtils.ts: deriveStoryVisualIdentity helper (companionLabel, placeLabel, colorPalette, icon)
- Reader.tsx: companion ve place badge'leri goruntuluyor (dinamik renk paleti)
- Library.tsx: hikaye kartlarinda companion/place ikonlarla gosteriliyor

### Privacy Policy (✅ TAMAMLANDI)
- pages/PrivacyPolicy.tsx: tam EN + TR icerikli sayfa
- Offline-first, veri toplama yok, COPPA uyumlu
- Settings'te "Privacy Policy" linki eklendi
- App.tsx'te routing tamamlandi

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
- ea95ac1 feat(story): companion/place fields added to Story type
- 532c72a feat(seeds): companion/place mapped from vault seeds
- f01d6a5 feat(utils): deriveStoryVisualIdentity helper (theme palettes + icons)
- e64bf4b feat(reader): visual identity badges (companion, place, dynamic colors)
- b4c1785 feat(library): companion/place shown on story cards
- 505eefe feat(privacy): privacy policy page + Settings link
- 930e971 feat(prompts): 252 per-seed prompt paketi
- 9475fa9 feat(store): App Store + Play Store metadata
- 67ac26f feat(biz): LICENSE + MONETIZATION.md

## Open Issues
- Remote generation (Gemini) ve premium TTS API key olmadan calismiyor (kasitli)
- RevenueCat veya Stripe odeme entegrasyonu henuz entegre degil

## Next Suggested Step
- Smoke test: tum ekranlari telefonda dene (ozellikle visual continuity — Reader ve Library)
- Screenshot'lar cek (store metadata icin)
- RevenueCat veya Stripe entegrasyonu karari
- Gizlilik politikasi URL'ini bir yerde host et (GitHub Pages veya domain)

## Update Rule
Her anlamli adimdan sonra: ne degisti, hangi commit, acik sorunlar, siradaki adim.
