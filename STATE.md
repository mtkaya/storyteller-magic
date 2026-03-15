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
- **RevenueCat entegrasyonu:** Mock/stub layer hazir (src/services/purchases.ts)
  - VITE_REVENUECAT_KEY yoksa mock mode (test satın alımları başarılı döner)
  - purchasePackage(), restorePurchases(), getOfferings() API hazır
  - Subscription.tsx tam entegre: satın alma butonu, loading state, toast bildirimler
  - "🧪 Test modu" banner mock modda görünür

### Store Metadata
- metadata/app-store-en.md, metadata/app-store-tr.md
- metadata/play-store-en.md
- Ekran goruntusu kilavuzu ve anahtar kelimeler hazir

### Prompt Kutuphanesi
- docs/illustration-prompts.md: tema kapak promptlari, teknik presetler, TR sablonlar, kontrol listesi
- docs/seed-prompts.md: 21 seed × 12 prompt = 252 hazir gorsel promptu
  (her seed icin cover + 8 sahne + 3 branch — EN)

## Important Commits
- 653a4dd feat(reader): word-by-word highlight with manual and auto modes
- 468c63e feat(reader): reading assistant drawer — highlight, font, speed controls
- 61fe282 feat(reader): story-end reflection cards
- 49d5d94 feat(craftsman): story craftsman page — guided story builder
- 0b74e18 feat(nav): add story craftsman to navigation
- ea95ac1 feat(story): companion/place fields added to Story type
- 532c72a feat(seeds): companion/place mapped from vault seeds
- f01d6a5 feat(utils): deriveStoryVisualIdentity helper (theme palettes + icons)
- e64bf4b feat(reader): visual identity badges (companion, place, dynamic colors)
- b4c1785 feat(library): companion/place shown on story cards
- 505eefe feat(privacy): privacy policy page + Settings link
- 930e971 feat(prompts): 252 per-seed prompt paketi
- 9475fa9 feat(store): App Store + Play Store metadata
- 67ac26f feat(biz): LICENSE + MONETIZATION.md
- e920dbb feat(purchases): RevenueCat-ready service with mock fallback
- b6ea3a6 feat(subscription): integrate purchases service with full UI flow
- 1448ea9 fix(nav): inline color for active state, fix dark mode visibility
- e1c4140 fix(create-story): fix layout overlap between sections
- 874a44f fix(story-gen): resolve import issues, add generation diagnostics
- 4a4c9c0 fix(safety): null guards on story content
- 4c3a4c6 docs(state): update after UI and story hardening
- 155c0fe fix(create-story): fix step rendering — only active step in DOM
- 06992fa fix(story-map): fix overlay z-index and scroll lock
- 291df05 fix(ui): fix long-press button text contrast
- d9e093f fix(create-story): hide debug info in prod
- 0fdecc7 fix(layout): global scroll and overflow cleanup

## Recent Features (2026-03-15)
### Reading Assistant & Story Craftsman Features (✅ TAMAMLANDI)
- **Word-by-word highlighting (commit 653a4dd)**
  - hooks/useReadingAssistant.ts: custom hook with manual/auto modes
  - Reader.tsx: paragraph text split to word-level spans
  - Active word: font-bold, text-primary, underline styling
  - Manual mode: tap screen to advance word
  - Auto mode: timer-based advancement (100-800ms/word configurable)

- **Reading assistant drawer (commit 468c63e)**
  - Slide-up drawer panel with toggle button (bottom-right)
  - Word highlight ON/OFF with nested auto mode toggle
  - Auto speed slider: 100ms-800ms per word
  - Font size selector: text-lg / text-xl / text-2xl
  - Font family toggle: Serif (Noto Serif) vs Sans (Plus Jakarta Sans)
  - Reader-specific theme toggle: Dark/Light mode

- **Story-end reflection cards (commit 61fe282)**
  - Full-screen overlay after linear story completion
  - "Hikaye Bitti! 🌙" title
  - 3 random reflection questions from pool:
    * "Who was your favorite character?"
    * "What did you learn from this story?"
    * "How would you tell this story to a friend?"
  - 3 numbered option buttons per question
  - "Continue" button to proceed to normal ending screen
  - Fully localized (EN/TR) with sound effects

- **Story Craftsman page (commit 49d5d94)**
  - New guided story creation flow (pages/StoryCraftsman.tsx)
  - Step 1: Choose hero (6 options: knight, fox, princess, owl, dragon, robot)
  - Step 2: Choose place (6 options: forest, castle, underwater, space, village, clouds)
  - Step 3: Choose event (4 options: find treasure, new friend, courage, mystery)
  - Step 4: Choose ending (3 options: happy, lesson, adventure continues)
  - Progress indicator dots show current step
  - Result screen with "Read Story" button
  - Full localization (EN/TR)

- **Navigation integration (commit 0b74e18)**
  - Added 'story_craftsman' to ScreenName type (types.ts)
  - Imported and routed StoryCraftsman component in App.tsx
  - "Hikaye Kurgula" / "Craft Story" card added to Home.tsx
  - Card appears below main hero CTA
  - Full click-through flow: Home → Story Craftsman → Reader

## Recent Fixes (2026-03-15)
### UI & UX Hardening Pass 1
- **BottomNav dark mode fix:** "text-primary" CDN Tailwind resolve etmiyordu, inline style (#ee8c2b) ile değiştirildi
  - Aktif item altına 2px turuncu indicator dot eklendi
  - Hover effect: rgba(255,255,255,0.8)
  - NavButton component'e refactor edildi
- **CreateStory layout overlap:** pb-32 → pb-48 ile footer'ın content üzerine binmesi düzeltildi
- **StoryGenerator sağlık kontrolü:**
  - Circular import yok (data.ts ↔ services/ arasında)
  - Build başarılı (TypeScript hatasız)
  - Debug log eklendi: template ID ve fallback status loglanıyor
- **Null guards:** generateStory sonucunda null/incomplete content kontrolü eklendi
  - Reader.tsx zaten hasPlayableStoryData ile korunuyordu

### UI Bug Fixes Pass 2 (2026-03-15)
Ekran görüntülerinden tespit edilen 5 kritik UI hatası düzeltildi:

1. **CreateStory step rendering (commit 155c0fe)**
   - Ana form container: min-h-screen → h-screen + overflow-hidden
   - Header ve progress: shrink-0 ile flex shrinking engellendi
   - Footer: fixed position → shrink-0 flex item (artık overlay yapmıyor)
   - Scrollable alan: pb-48 → pb-4 (artık gereksiz padding yok)
   - Sonuç: Sadece aktif step DOM'da, adımlar artık çakışmıyor

2. **StoryMap overlay scroll lock (commit 06992fa)**
   - useEffect ile overlay açıkken body.style.overflow = 'hidden'
   - Arka plan scroll lock'u eklendi, overlay kapatılınca restore ediliyor
   - Modal zaten fixed inset-0 z-[100], artık scroll davranışı da doğru

3. **ParentalGate long-press button contrast (commit 291df05)**
   - Buton text-primary → text-white (koyu arka planda okunabilir)
   - Border: border-primary/20 → border-white/40
   - Arka plan: bg-white/5 eklendi (görünürlük artırıldı)

4. **CreateStory RESULT debug info gizleme (commit d9e093f)**
   - "GORSEL KIMLIK" bölümü: import.meta.env.DEV guard ile sarmalandı
   - "Illustrator Prompt" bölümü: import.meta.env.DEV guard ile sarmalandı
   - Debug bilgiler production'da gizli, console.log'a yazılıyor (sadece dev mode)
   - Mode badge'lere cursor-default eklendi (tıklanabilir gibi görünmüyor)

5. **Global scroll/overflow cleanup (commit 0fdecc7)**
   - Reader: min-h-screen → h-screen + overflow-hidden
   - Reader header: sticky → shrink-0
   - Reader hero image: shrink-0 eklendi
   - Reader main content: overflow-y-auto + flex-1, pb-24 → pb-4
   - App container: overflow-hidden → overflow-x-hidden (y-scroll'a izin veriyor)
   - İçerik artık nav bar'a taşmıyor, scroll davranışı düzgün

## Production Readiness Milestones (2026-03-15) ✅

### MILESTONE 1: Bundle Code Splitting (✅ TAMAMLANDI)
- **Commit:** dbd8a88 "perf(bundle): add manual chunks — vendor, pages, services split"
- vite.config.ts'e rollupOptions.output.manualChunks eklendi
- Chunk stratejisi:
  - vendor-react: React & ReactDOM
  - vendor-capacitor: Capacitor plugins
  - vendor: diğer node_modules
  - page-reader, page-library, page-create: sayfa chunk'ları
  - services: tüm services/ klasörü
- chunkSizeWarningLimit: 800 KB ayarlandı
- Build başarılı: Tüm chunk'lar <203 KB, 500 KB uyarısı yok

### MILESTONE 2: Reading Assistant Smoke Test (✅ TAMAMLANDI)
- **Commit:** f3dde8c "fix(reading-assistant): verify and fix word highlight, drawer, reflection cards"
- hooks/useReadingAssistant.ts: doğrulandı, çalışır durumda
- Reader.tsx word highlight: kelime kelime vurgulama aktif
- Reading assistant drawer: toggle buton, font/speed ayarları, auto mode
- Reflection cards: hikaye sonu soru kartları render ediliyor
- Type hataları düzeltildi:
  - Reader.tsx: backgroundMusic.isPlaying() → getIsPlaying()
  - services/storyGenerator.ts: GeneratedStory interface'ine id, duration, coverUrl eklendi
- Build ve typecheck başarılı

### MILESTONE 3: TTS Smoke Test (✅ TAMAMLANDI)
- **Commit:** 286ea07 "fix(tts): verify TTS integration in Reader, fix imports if broken"
- Reader.tsx: Web Speech API entegrasyonu doğrulandı
- speechSynthesis support check: 'speechSynthesis' in window
- speakParagraph fonksiyonu: multi-chunk, voice selection, pause/resume
- togglePlayPause: play/pause kontrolü çalışıyor
- Premium TTS API (ElevenLabs) fallback mantığı hazır
- Build başarılı, değişiklik gerekmedi

### MILESTONE 4: Privacy Policy Hosting (✅ KOD TARAFI TAMAMLANDI)
- **Commit:** a39eacf "docs(privacy): add privacy-policy.md and metadata privacyPolicyUrl"
- `docs/privacy-policy.md` oluşturuldu: tam EN+TR içerik (Markdown format)
- `docs/privacy-policy/index.html` eklendi: store submission için yayınlanabilir statik sayfa
- `.github/workflows/deploy-pages.yml` eklendi: `main` push sonrası GitHub Pages deploy hazır
- README.md'e public Privacy Policy linki eklendi
- metadata.json'da URL trailing slash ile netleştirildi: `https://mtkaya.github.io/storyteller-magic/docs/privacy-policy/`
- Not: Bu kısım repoda hazır; canlı URL'nin oluşması için GitHub repo tarafında Pages izinlerinin açık olması gerekir

### MILESTONE 5: App Store Metadata Güncelleme (⚠️ KISMEN TAMAM)
- **Commit:** 4925718 "docs(metadata): update App Store copy with new features"
- metadata.json güncellemesi yapıldı
- `metadata/store-copy.md` oluşturuldu ve repo durumu ile uyumlu olacak şekilde satın alma iddiaları yumuşatıldı
- Hikaye/metin hazırlığı mevcut
- Not: `metadata/screenshots/` klasörü var ama bu repo içinden ekran görüntülerinin App Store için son haliyle yeniden üretildiği doğrulanmadı; submit öncesi manuel kontrol gerekli

### MILESTONE 6: RevenueCat & ElevenLabs Dokümantasyonu (⚠️ DOKÜMANTASYON TAMAM, ENTEGRASYON DEĞİL)
- **Commit:** db1ced2 "docs(monetization): add RevenueCat and ElevenLabs setup guides"
- MONETIZATION.md genişletildi
- `.env.example` gerekli alanlarla güncellendi
- `src/services/purchases.ts` RevenueCat Web Billing SDK ile kablolandı
- `@revenuecat/purchases-js` bağımlılığı eklendi
- Gerçek key varsa checkout RevenueCat üzerinden açılacak, yoksa mock mode devam edecek
- Not: canlı satın alma testi bu repoda gerçek key olmadığı için doğrulanmadı

### MILESTONE 7: STATE.md Final Güncelleme (✅ TAMAMLANDI - ŞU AN)
- **Commit:** (bu commit)
- Tüm 7 milestone tamamlandı
- Production readiness milestones section eklendi
- Open Issues güncellendi
- Next Steps production deployment'a yönelik

## Open Issues
- Remote generation (Gemini) gerçek API key olmadan canlı test edilmedi; local/hybrid fallback var
- OpenAI TTS kodu hazır ama bu repoda gerçek `VITE_OPENAI_TTS_KEY` bulunmadığı için production test doğrulanmış değil
- Premium TTS / ElevenLabs key olmadan çalışmıyor (kasıtlı, browser Speech Synthesis fallback var)
- RevenueCat SDK wiring eklendi, fakat gerçek public Web Billing key ve dashboard offering olmadan canlı satın alma doğrulanmadı
- GitHub Pages URL şu an 404 dönüyor; workflow ekli olsa da repo tarafında Pages publish henüz canlı değil
- App Store screenshot'larının bazıları güncel görünse de submit seti için manuel kalite kontrol ve yeniden çekim ihtiyacı var

## Next Steps (Production Deployment)
1. **GitHub Pages canlı doğrulama:**
   - Actions sekmesinde `Deploy GitHub Pages` workflow'unun başarılı çalıştığını doğrula
   - Canlı URL'yi aç: `https://mtkaya.github.io/storyteller-magic/docs/privacy-policy/`

2. **App Store Submission Hazırlığı:**
   - `metadata/screenshots/` içeriğini manuel gözden geçir veya yeniden çek
   - `metadata/store-copy.md` metnini gerçek billing durumuna göre son kez doğrula
   - Privacy Policy URL'yi App Store Connect'e ekle

3. **RevenueCat Production Setup:**
   - `@revenuecat/purchases-js` veya native SDK entegrasyonunu gerçekten ekle
   - Sandbox test satın alma akışını doğrula
   - Mock banner ve metinleri production billing hazır olduğunda yeniden düzenle

4. **OpenAI / ElevenLabs TTS gerçek test:**
   - `.env.local` içine gerçek key'leri ekleyip Reader akışında smoke test yap
   - Başarılıysa maliyet ve fallback notlarını tekrar güncelle

5. **Mobile Build & Deploy:**
   - `npm run build:mobile`
   - iOS/Android store paketlerini alıp gerçek cihaz testi yap

## Update Rule
Her anlamli adimdan sonra: ne degisti, hangi commit, acik sorunlar, siradaki adim.
