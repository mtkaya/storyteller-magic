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

**Mevcut Durum:** Mock mode — ödeme simülasyonu çalışıyor, gerçek entegrasyon yapılmadı.

**Canlıya Geçiş İçin:** RevenueCat Web SDK + iOS/Android native entegrasyonu gerekir.

---

## RevenueCat Entegrasyonu

### 1. RevenueCat Dashboard Kurulumu

1. [RevenueCat](https://www.revenuecat.com/) hesabı oluştur
2. Yeni proje oluştur: "Storyteller Magic"
3. Platform ekle:
   - **iOS:** Apple App Store Connect entegrasyonu
   - **Android:** Google Play Console entegrasyonu
   - **Web:** Stripe entegrasyonu (opsiyonel)

### 2. App Store Connect Ayarları (iOS)

1. App Store Connect → "My Apps" → Yeni uygulama oluştur
2. "In-App Purchases" → Yeni subscription group oluştur
3. İki abonelik ürünü oluştur:
   - **Product ID:** `monthly_pro` — Pro Plan ($11.99/month veya ₺299,99/month)
   - **Product ID:** `yearly_family` — Family Club ($79.99/year veya ₺2.499,99/year)
4. RevenueCat Dashboard'da:
   - iOS platform ekle
   - Bundle ID gir (örn: `com.storytellermagic.app`)
   - Shared Secret ekle (App Store Connect → Users and Access → Shared Secret)

### 3. Google Play Console Ayarları (Android)

1. Google Play Console → "Create app"
2. "Monetize" → "Subscriptions" → Yeni subscription oluştur
3. İki abonelik ürünü oluştur:
   - **Product ID:** `monthly_pro`
   - **Product ID:** `yearly_family`
4. RevenueCat Dashboard'da:
   - Android platform ekle
   - Package name gir (örn: `com.storytellermagic.app`)
   - Service account JSON key yükle

### 4. Web SDK Kurulumu

**Npm install:**

```bash
npm install @revenuecat/purchases-js
```

**Integration (src/services/purchases.ts):**

```typescript
import Purchases from '@revenuecat/purchases-js';

// Initialize RevenueCat
if (import.meta.env.VITE_REVENUECAT_KEY) {
  await Purchases.configure({
    apiKey: import.meta.env.VITE_REVENUECAT_KEY,
    appUserId: profileId, // optional, user identifier
  });
}

// Get offerings
const offerings = await Purchases.getOfferings();
const packages = offerings.current?.availablePackages || [];

// Purchase
const purchaseResult = await Purchases.purchasePackage(selectedPackage);
if (purchaseResult.customerInfo.entitlements.active['pro']) {
  // User is now Pro
}

// Restore
const restoredInfo = await Purchases.restorePurchases();
```

### 5. Environment Variables

`.env.local` dosyasına ekle:

```bash
# RevenueCat API Key (RevenueCat Dashboard → API Keys)
VITE_REVENUECAT_KEY=your_revenuecat_public_key_here

# iOS specific (optional, for native builds)
REVENUECAT_IOS_KEY=appl_xxxxx

# Android specific (optional, for native builds)
REVENUECAT_ANDROID_KEY=goog_xxxxx
```

### 6. Capacitor iOS/Android Entegrasyonu

**iOS (native):**

```bash
cd ios/App
pod install
```

`AppDelegate.swift` içine ekle:

```swift
import RevenueCat

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    Purchases.configure(withAPIKey: "appl_xxxxx")
    return true
}
```

**Android (native):**

`app/build.gradle`:

```gradle
dependencies {
    implementation 'com.revenuecat.purchases:purchases:7.0.0'
}
```

`MainActivity.java` içine ekle:

```java
import com.revenuecat.purchases.Purchases;

@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Purchases.configure(new PurchasesConfiguration.Builder(this, "goog_xxxxx").build());
}
```

### 7. Entitlement Kurulumu

RevenueCat Dashboard'da "Entitlements" oluştur:

- **Entitlement ID:** `pro`
  - Attached Products: `monthly_pro`, `yearly_family`

Kodda kontrol:

```typescript
const customerInfo = await Purchases.getCustomerInfo();
const isPro = customerInfo.entitlements.active['pro'] !== undefined;
```

---

## ElevenLabs TTS Entegrasyonu

### 1. ElevenLabs API Key Alma

1. [ElevenLabs](https://elevenlabs.io/) hesabı oluştur
2. Dashboard → API Keys → Yeni key oluştur
3. Key'i kopyala

### 2. Environment Variables

`.env.local` dosyasına ekle:

```bash
# ElevenLabs API Key
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Voice IDs (optional, defaults provided)
ELEVENLABS_VOICE_EN=21m00Tcm4TlvDq8ikWAM  # Rachel (female, US)
ELEVENLABS_VOICE_TR=pNInz6obpgDQGcFmaJgB  # Adam (male, deep)
```

### 3. Service Implementation

`src/services/elevenlabsTTS.ts` zaten hazır — sadece API key ayarlanması gerekiyor.

**Mevcut Özellikler:**

- Multi-voice support (EN/TR)
- Streaming audio playback
- Premium narration quality
- Fallback to Web Speech API if quota exceeded

**Kullanım:**

```typescript
import { elevenlabsTTS } from '../services/elevenlabsTTS';

// Check if configured
if (elevenlabsTTS.isConfigured()) {
  // Synthesize speech
  const audioUrl = await elevenlabsTTS.synthesize(text, 'en');

  // Play audio
  const audio = new Audio(audioUrl);
  audio.play();
}
```

### 4. Rate Limiting & Costs

**ElevenLabs Pricing (as of 2025):**

- **Free Tier:** 10,000 characters/month
- **Starter:** $5/month — 30,000 characters
- **Creator:** $22/month — 100,000 characters
- **Pro:** $99/month — 500,000 characters

**Tavsiye:** Starter veya Creator planı yeterli. Average bedtime story ~1,500 characters = ~66-200 story plays/month.

**Cost Optimization:**

- Cache synthesized audio locally (IndexedDB)
- Fallback to browser Speech Synthesis for free users
- Only use ElevenLabs for Pro/Family subscribers

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
