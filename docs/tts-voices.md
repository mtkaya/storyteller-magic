# TTS Voice Guide

Sesli hikaye okuma özelliği için ses seçimi ve kullanım kılavuzu.

## Web Speech API Voices

Web Speech API, tarayıcının yerleşik seslerini kullanır. Farklı işletim sistemlerinde farklı sesler mevcuttur.

### Önerilen Türkçe Sesler

macOS/iOS:
- **Yelda** (tr-TR) - Doğal, kadın sesi (Önerilen)
- **Filiz** (tr-TR) - Net, kadın sesi

Android/Chrome:
- **tr-TR-Standard-A** - Google Neural, kadın sesi (Önerilen)
- **tr-TR-Standard-B** - Google Neural, erkek sesi
- **tr-TR-Wavenet-A** - Google Premium, kadın sesi (en yüksek kalite)

Windows:
- **Microsoft Tolga** (tr-TR) - Erkek sesi
- **Microsoft Seda** (tr-TR) - Kadın sesi (Önerilen)

### Önerilen İngilizce Sesler

macOS/iOS:
- **Samantha** (en-US) - Doğal, kadın sesi (Önerilen, çocuk hikayeleri için ideal)
- **Karen** (en-AU) - Avustralya aksanı, kadın sesi
- **Daniel** (en-GB) - İngiliz aksanı, erkek sesi
- **Moira** (en-IE) - İrlanda aksanı, kadın sesi

Android/Chrome:
- **en-US-Neural2-C** - Google Neural, kadın sesi (Önerilen)
- **en-US-Neural2-D** - Google Neural, erkek sesi
- **en-US-Wavenet-C** - Google Premium, kadın sesi (en yüksek kalite)
- **en-GB-Wavenet-F** - Google Premium, İngiliz aksanı, kadın sesi

Windows:
- **Microsoft Zira** (en-US) - Kadın sesi (Önerilen)
- **Microsoft David** (en-US) - Erkek sesi
- **Microsoft Hazel** (en-GB) - İngiliz aksanı, kadın sesi

### Ses Kalitesi Göstergeleri

**Yüksek Kalite İşaretleri:**
- "Neural", "Natural", "Premium", "Enhanced" kelimelerini içeren sesler
- "Wavenet" teknolojisi kullanan sesler (Google)
- macOS/iOS'teki yerleşik "Siri" kaliteli sesler
- Microsoft'un yeni nesil sesleri

**Düşük Kalite İşaretleri:**
- "eSpeak", "Compact", "Default" kelimelerini içeren sesler
- Eski nesil sentetik sesler

## ElevenLabs Premium TTS

ElevenLabs, yüksek kaliteli yapay zeka tabanlı ses sentezi sağlar. API anahtarı gerektir.

### API Kurulumu

1. [ElevenLabs](https://elevenlabs.io) hesabı oluşturun
2. API anahtarınızı alın
3. Proje `.env` dosyasına ekleyin:

```bash
VITE_ELEVENLABS_KEY=your_api_key_here
```

### Önerilen Çocuk Dostu Sesler

#### Adam (pNInz6obpgDQGcFmaJgB) ⭐
- **Tür:** Erkek
- **Dil:** İngilizce (US)
- **Karakter:** Sıcak, samimi, arkadaşça
- **Kullanım:** Macera hikayeleri, pozitif karakterler

#### Bella (EXAVITQu4vr4xnSDxMaL) ⭐
- **Tür:** Kadın
- **Dil:** İngilizce (US)
- **Karakter:** Nazik, yatıştırıcı, yumuşak
- **Kullanım:** Uyku hikayeleri, sakinleştirici anlatım

#### Elli (MF3mGyEYCl7XYWbV9V6O) ⭐
- **Tür:** Kadın
- **Dil:** İngilizce (US)
- **Karakter:** Genç, enerjik, hareketli
- **Kullanım:** Eğlenceli hikayeler, aktif sahneler

#### Antoni (ErXwobaYiN019PkySvjV)
- **Tür:** Erkek
- **Dil:** İngilizce (US)
- **Karakter:** Net, sakin, dengeli
- **Kullanım:** Hikaye anlatımı, eğitici içerik

### ElevenLabs Özellik Ayarları

Hikaye okuma için önerilen parametreler:

```typescript
{
  stability: 0.5,          // Ses tutarlılığı (0.4-0.6 arası ideal)
  similarity_boost: 0.75,  // Ses benzerliği (0.7-0.8 arası ideal)
  style: 0.3,             // İfade yoğunluğu (0.2-0.4 arası sakin)
  use_speaker_boost: true  // Ses netliği artırma
}
```

### Model Seçimi

- **eleven_monolingual_v1** - İngilizce için optimize (Önerilen)
- **eleven_multilingual_v2** - Çok dilli destek (Türkçe için)
- **eleven_turbo_v2** - Daha hızlı, düşük gecikme

## Kullanım Önerileri

### Okuma Hızı Ayarları

**Yaşa Göre Öneriler:**
- **2-4 yaş:** 0.7x - 0.8x (daha yavaş)
- **4-6 yaş:** 0.8x - 0.9x (orta yavaş)
- **6-8 yaş:** 0.9x - 1.0x (normal)
- **8+ yaş:** 1.0x - 1.2x (normal/hızlı)

**Dile Göre Ayarlar:**
- **Türkçe:** 0.7x - 1.0x (daha yavaş, kelime vurguları için)
- **İngilizce:** 0.8x - 1.2x (geniş aralık)

### Ses Tonu Ayarları

```typescript
// Sakin hikayeler için
{
  rate: 0.8,
  pitch: 0.9,
  volume: 0.8
}

// Macera hikayeleri için
{
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0
}

// Uyku hikayeleri için
{
  rate: 0.7,
  pitch: 0.95,
  volume: 0.7
}
```

## Ses Seçim Stratejisi

### Hikaye Temasına Göre Ses Seçimi

**Macera (Adventure):**
- İngilizce: Adam, Antoni
- Türkçe: Erkek sesler tercih edilebilir

**Dostluk (Friendship):**
- İngilizce: Bella, Samantha
- Türkçe: Yelda, Seda

**Sihir/Gizem (Magic/Mystery):**
- İngilizce: Bella, Elli
- Türkçe: Filiz, Yelda

**Uyku/Huzur (Bedtime/Calm):**
- İngilizce: Bella (düşük rate: 0.7x)
- Türkçe: Yelda, Seda (düşük rate: 0.7x)

**Cesaret (Courage):**
- İngilizce: Adam, Elli
- Türkçe: Erkek sesler

**Aile/İyilik (Family/Kindness):**
- İngilizce: Bella, Samantha
- Türkçe: Yelda, Seda

## Teknik Notlar

### Web Speech API Kısıtlamaları

- ⚠️ Server-side rendering (SSR) desteklemez
- ⚠️ `typeof window !== 'undefined'` kontrolü gerekli
- ⚠️ Sesler asenkron yüklenebilir (`voiceschanged` eventi dinle)
- ⚠️ Tarayıcı ve işletim sistemine bağımlı

### ElevenLabs API Kısıtlamaları

- 🔑 API anahtarı gerektirir
- 💰 Kullanıma göre ücretlendirme
- 🌐 İnternet bağlantısı gerekli
- ⏱️ Timeout ayarı: 35 saniye (uzun metinler için bölmeli)

### Fallback Stratejisi

```typescript
// Öncelik sırası:
// 1. Premium TTS (mevcut API varsa)
// 2. ElevenLabs (API key varsa)
// 3. Web Speech API (tarayıcı desteği varsa)
// 4. Sessiz mod (hiçbiri yoksa)
```

## Test Kontrol Listesi

Ses özelliğini test ederken kontrol et:

- [ ] Web Speech API desteği var mı? (`ttsService.isSupported()`)
- [ ] Sesler yüklendi mi? (`ttsService.getVoices()`)
- [ ] Dil doğru seçildi mi? (tr-TR / en-US)
- [ ] Hız ayarı yaşa uygun mu? (0.7 - 1.2x)
- [ ] Kelime highlight çalışıyor mu?
- [ ] Paragraf geçişleri düzgün mü?
- [ ] Sayfa kapanınca ses duruyor mu?
- [ ] Story değişince ses temizleniyor mu?
- [ ] Settings'teki toggle çalışıyor mu?
- [ ] ElevenLabs fallback doğru çalışıyor mu?

## Türkçe Kullanım Notları

### Özel Karakter Desteği

Web Speech API Türkçe özel karakterleri (ğ, ü, ş, ö, ç, ı) destekler. Fakat bazı eski sesler hatalı telaffuz edebilir.

**Öneriler:**
- Modern tarayıcı kullanın (Chrome 90+, Safari 14+, Edge 90+)
- Google Neural veya Wavenet sesleri tercih edin
- macOS'te yerleşik Yelda sesini kullanın

### Metin Temizleme

TTS servisi şu karakterleri otomatik temizler:
- Emoji'ler kaldırılır
- Özel semboller kelimeye çevrilir (%, +, /, @, #, &)
- Çok nokta (...) üç noktaya (…) dönüştürülür
- Tire çizgiler (--) virgüle (,) dönüştürülür

---

## Üretim Hazırlık Kontrol Listesi

TTS özelliğini yayına almadan önce:

- [ ] `.env` dosyasında `VITE_ELEVENLABS_KEY` ayarlandı mı?
- [ ] Tüm tarayıcılarda ses çalışıyor mu? (Chrome, Safari, Firefox, Edge)
- [ ] Mobil cihazlarda test edildi mi? (iOS Safari, Android Chrome)
- [ ] Uyku modu ile uyumlu mu? (Sleep Controller entegrasyonu)
- [ ] Arka plan müziği ile ducking çalışıyor mu?
- [ ] Hata durumlarında fallback devreye giriyor mu?
- [ ] Premium TTS timeout doğru ayarlandı mı? (35s)
- [ ] Kullanıcı ayarları kaydediliyor mu? (localStorage)

## Sorun Giderme

### "TTS not supported" Hatası
- Tarayıcı Web Speech API desteklemiyor
- HTTPS bağlantısı kullanılmıyor (gerekli)
- Çözüm: Modern tarayıcı kullan, HTTPS kullan

### Sesler Yüklenmiyor
- `voiceschanged` eventi henüz tetiklenmedi
- Çözüm: `useEffect` ile event listener ekle

### Kelime Highlight Çalışmıyor
- `onboundary` eventi tarayıcı tarafından desteklenmiyor
- Çözüm: Safari/iOS'ta kısıtlı, Chrome tercih edin

### ElevenLabs Timeout
- Metin çok uzun (>500 karakter)
- Çözüm: Metni chunk'lara böl, sırayla gönder

### Türkçe Telaffuz Hataları
- Düşük kaliteli ses kullanılıyor
- Çözüm: Google Neural/Wavenet veya macOS Yelda kullan
