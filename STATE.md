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

## TTS Feature (✅ TAMAMLANDI - 2026-03-15)
### Sesli Hikaye Okuma Özelliği
- **src/services/ttsService.ts:** Web Speech API wrapper
  - speak(text, options): Promise<void> — tekst okuma
  - speakParagraphs(paragraphs[], onWord?, onParagraphEnd?) — paragraf bazlı okuma
  - stop(), pause(), resume() kontrolleri
  - isSupported(), getVoices() — tarayıcı desteği kontrolü
  - Kelime bazlı callback (word highlight için)
  - Paragraf sonu callback (otomatik ilerleme için)

- **pages/Reader.tsx entegrasyonu:**
  - TTS buton: play/pause toggle (header'da 🔊 ikonu)
  - Aktif paragraf: hafif bg-white/10 highlight
  - Aktif kelime: bold + text-primary highlight (kelime bazlı tracking)
  - Hız slider: 0.7x - 1.2x (Settings'teki varsayılan değer)
  - Dil: story.sourceLanguage'den otomatik seçilir (tr-TR / en-US)
  - Cleanup: sayfa kapanınca/story değişince tts.stop() çağrılır
  - Premium TTS fallback destekleniyor (mevcut kod korundu)

- **pages/Settings.tsx:**
  - "Sesli Okuma" toggle (AppStateContext.settings.ttsEnabled)
  - Varsayılan ses hızı slider (Reading Speed section)
  - Ses seçici dropdown (availableVoices listesi, tr/en filtrelenmiş)
  - TTS toggle kapalıyken ayarlar gizleniyor

- **context/AppStateContext.tsx:**
  - settings.ttsEnabled: boolean (varsayılan: true)
  - localStorage'a kaydediliyor

- **src/services/elevenlabsTTS.ts:** ElevenLabs stub (API key hazırlığı)
  - isElevenLabsConfigured(): VITE_ELEVENLABS_KEY kontrolü
  - speakWithElevenLabs(text, voiceId): AudioBuffer — stub implementation
  - ELEVENLABS_VOICES: 4 çocuk dostu ses (Adam, Bella, Elli, Antoni)
  - getRecommendedVoice(language): dil bazlı ses önerisi
  - Fallback: API key yoksa Web Speech API kullanılır

- **docs/tts-voices.md:** Ses kullanım kılavuzu
  - Web Speech API önerilen sesler (tr-TR / en-US)
  - ElevenLabs premium ses önerileri ve API kurulumu
  - Okuma hızı yaş bazlı öneriler (2-4 yaş: 0.7x, 8+ yaş: 1.2x)
  - Tema bazlı ses seçim stratejileri
  - Teknik notlar: SSR kısıtları, fallback stratejisi
  - Test kontrol listesi

Commits:
- 7982df8 feat(tts): Web Speech API service with paragraph and word callbacks
- a50fb90 feat(reader): TTS integration — play/pause, word highlight, speed control
- 1e11be9 feat(settings): TTS preferences — enable toggle, speed, voice picker
- 6da8ce0 feat(tts): ElevenLabs stub — ready for API key integration
- a13348b docs(tts): voice guide and ElevenLabs voice recommendations

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

## Open Issues
- Remote generation (Gemini) ve premium TTS API key olmadan calismiyor (kasitli)
- RevenueCat SDK (@revenuecat/purchases-js) henüz kurulmadı — purchases.ts TODO placeholders ile hazır
- ElevenLabs TTS API key entegrasyonu stub — VITE_ELEVENLABS_KEY ile aktif hale gelecek

## Next Suggested Step
- TTS özelliğini test et (Web Speech API, kelime highlight, paragraf geçişleri)
- ElevenLabs API key ekle ve premium TTS test et (optional)
- Screenshot'lar cek (store metadata icin — TTS özelliği dahil)
- RevenueCat SDK kurulumu ve gerçek API key entegrasyonu (optional)
- Gizlilik politikasi URL'ini bir yerde host et (GitHub Pages veya domain)

## Update Rule
Her anlamli adimdan sonra: ne degisti, hangi commit, acik sorunlar, siradaki adim.
