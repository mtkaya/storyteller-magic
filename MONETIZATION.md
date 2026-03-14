# MONETIZATION.md — Storyteller Magic

## Karar: Freemium + Abonelik

Seçilen model: **Freemium + Subscription (B modeli)**

---

## Katmanlar

### 🆓 Serbest (Free)
- Günlük 3 yapay zeka üretimi
- 1 çocuk profili
- Yerel hikaye havuzuna tam erişim (offline)
- Temel ses ve müzik desteği
- İnteraktif hikayelerde sınırlı derinlik

### ⭐ Pro — ₺299,99 / ay
- Günlük 20 yapay zeka üretimi
- 2 çocuk profili
- Gelişmiş interaktif dallanma
- Öncelikli hikaye havuzu rotasyonu
- Tam ses/müzik paketleri
- Gelişmiş ebeveyn analizi

### 👨‍👩‍👧‍👦 Aile Kulübü — ₺2.499,99 / yıl (~₺208/ay)
- Günlük 60 yapay zeka üretimi
- 5 çocuk profili
- Pro özelliklerin tamamı
- Öncelikli müşteri desteği
- Yıllık ödeme avantajı

---

## Teknik Altyapı

Abonelik katmanları `context/AppStateContext.tsx` içindeki `PLAN_RULES` ile yönetiliyor:
- `dailyGeneratedStories`: Günlük AI üretim kotası
- `maxProfiles`: İzin verilen çocuk profili sayısı

Gerçek ödeme entegrasyonu **yapılmadı** — mevcut Subscription ekranı plan seçimini simüle eder.
Canlıya geçiş için: RevenueCat (iOS/Android) veya Stripe (web) entegrasyonu gerekir.

---

## Gelir Modeli Özeti

| Metrik | Değer |
|--------|-------|
| Hedef pazar | Türkçe/İngilizce konuşan ebeveynler, 2-8 yaş arası çocuklar |
| Ana gelir kaynağı | Pro ve Aile abonelikleri |
| Yardımcı gelir | Premium TTS narration paketi (gelecekte) |
| Dönüşüm hedefi | Free → Pro: %5-8 |
| Ödeme platformları | App Store IAP + Google Play Billing |

---

## Out of Scope (şimdilik)

- Tek seferlik satın alımlar (one-time unlock)
- Reklam destekli katman
- B2B / okul lisansları
- NFT veya dijital koleksiyon
