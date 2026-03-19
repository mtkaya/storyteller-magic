# Storyteller Magic — Claude Hafıza Dosyası

## Proje Özeti
2-8 yaş çocuklar için uyku hikayesi uygulaması. React 19 + Capacitor 8 + TypeScript + Tailwind CSS + Vite 6.
160+ offline hikaye, TTS, AI hikaye üretimi, abonelik sistemi.

**Proje yolu:** `/Users/tugrulkaya/Software_Project/Mobile_App/Mobile_1/storyteller-magic`
**GitHub:** `https://github.com/mtkaya/storyteller-magic.git`
**Bundle ID:** `com.storytellermagic.app`

## Tamamlanan İşler

### Faz 1: Temel Doğrulama ✅
- [x] `src/services/` → `services/` birleştirildi (commit: ca43a04)
- [x] Privacy Policy Netlify'da yayınlandı: https://rad-raindrop-8b1b74.netlify.app
- [x] `metadata.json` privacy URL güncellendi (commit: 0b3e497)
- [x] `npm run smoke` geçiyor
- [x] Gemini/OpenAI key'ler şimdilik gereksiz — offline fallback yeterli

### Faz 2: RevenueCat ⏸️ SONRAYA BIRAKILDI
- `services/purchases.ts` zaten RevenueCat SDK entegre (mock modda)
- `VITE_REVENUECAT_KEY` verilince gerçek moda geçer
- RevenueCat hesabı henüz açılmadı
- Apple Developer ✅ ve Google Play Developer ✅ hesapları var

### Faz 3: Mobil Build ✅
- [x] `npm run build:mobile` başarılı
- [x] iOS ve Android cihazda çalışıyor
- [x] Capacitor 8 + 5 plugin (app, haptics, keyboard, splash-screen, status-bar)

### Faz 4: Store Metadata ✅
- [x] Tüm metadata dosyalarında privacy URL güncellendi
- [x] Play Store TR lokalizasyonu eklendi (`metadata/play-store-tr.md`)
- [x] Marketing URL eklendi (commit: 59a02d5)

### Faz 5: CI/CD ✅
- [x] `ci-quality.yml` güçlendirildi (artifact upload)
- [x] `deploy-web.yml` Netlify deploy workflow eklendi
- [x] ⚠️ GitHub Actions çalışmıyor — billing lock sorunu

### Hikaye Kalitesi ✅
- [x] Story 13 (boş stub) kaldırıldı
- [x] Vault açılışları 6 farklı şablonla çeşitlendirildi
- [x] 25 hikayeye Türkçe başlık eklendi (IDs 14-40)
- [x] Light mode metin görünürlük fix'i yapıldı (commit: 56ccc93)

### Görsel Üretim ✅
- [x] `scripts/generate-scene-prompts.mjs` oluşturuldu
- [x] 96 prompt (12 tema × 8 sahne) — CSV, JSON, TXT formatlarında
- [x] Gemini 2.5 Flash Image + Imagen 4 fallback ile otomatik üretim
- [x] Mevcut görseller: `public/images/generated/` altında tema bazlı

## Bilinen Sorunlar
- GitHub billing lock — Actions çalışmıyor, billing güncellenmeli
- RevenueCat henüz kurulmadı — mock modda
- El yapımı hikayelerin (14-40) içerik çevirileri (contentTr) eksik — sadece titleTr eklendi
- iOS ikon seti eksik (sadece 1024x1024 var, tüm boyutlar lazım)
- Android keystore henüz oluşturulmadı

## Yapılacaklar (Kalan)
- [ ] Faz 2: RevenueCat hesap + ürün kurulumu
- [ ] Faz 6: App Store + Play Store gönderimi
- [ ] Faz 7: Lansman sonrası (analytics, ASO)
- [ ] GitHub billing düzelt
- [ ] iOS ikon seti tamamla
- [ ] Android keystore oluştur
- [ ] El yapımı hikayelerin tam Türkçe içerik çevirisi

## Teknik Notlar

### Dizin Yapısı
- `services/` — Tüm servisler burada (TTS, purchases, background music, story generation vb.)
- `pages/` — Sayfa bileşenleri (Reader, Library, Home, Settings, Subscription vb.)
- `components/` — Yeniden kullanılabilir bileşenler
- `context/` — React Context (AppState, Language)
- `server/` — Backend proxy (`story-api.mjs` — Gemini + OpenAI TTS)
- `scripts/` — Build/utility scriptleri
- `metadata/` — Store listing dosyaları
- `docs/` — Dokümantasyon (illustration-prompts.md, privacy-policy vb.)

### Görsel Standartları
- **ASLA** `docs/illustration-prompts.md` standartlarından çıkma
- Style lock: children's book illustration, hand-painted digital art
- Teknik presetler: watercolor, gouache, flat-storybook, cut-paper
- Tema-teknik eşleşmesi: adventure/courage→gouache, friendship/nature→watercolor, magic/mystery→cut-paper, wonder/wisdom→flat-storybook
- Oran: 3:4 dikey

### Abonelik Modeli
- Free: 3 hikaye/gün, 1 profil
- Pro: ₺299,99/ay — 20 hikaye/gün, 2 profil
- Family: ₺2.499,99/yıl — 60 hikaye/gün, 5 profil

### Önemli Komutlar
```bash
npm run dev          # Vite dev server (port 3000)
npm run dev:all      # Frontend + backend birlikte
npm run smoke        # Typecheck + build + data integrity
npm run build:mobile # Web build + Capacitor sync
npm run typecheck    # TypeScript kontrolü
```

### Docker / OpenClaw
- OpenClaw Docker'da çalışıyor: `openclaw-gateway` container
- Claude Code Docker'da kurulu (npm global)
- Projeler `/app/projects/` altında mount edilmiş
- `docker-compose.yml`: `/Users/tugrulkaya/openclaw-docker/docker-compose.yml`

### Her Push Öncesi
1. `npm run typecheck` geçmeli
2. `npm run smoke` geçmeli
3. Commit mesajı conventional format: `feat:`, `fix:`, `chore:`, `refactor:`
4. Aşama aşama push — her mantıklı değişiklik ayrı commit
