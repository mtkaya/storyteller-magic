# Storyteller Program Kurgusu v2

Bu dokuman, uygulamanin hem teknik hem urun akisinda "stabil + olceklenebilir" bir yapiyi hedefler.

## 1) Cekirdek Kullanici Akisi

1. Onboarding
2. Profil secimi
3. Home
4. Giris noktasi:
   - Kutuphane (hazir hikaye)
   - Hikaye olustur (AI)
5. Reader (ses + metin + interaktif secimler)
6. Sonuc:
   - Favoriye ekle
   - Yeniden oku
   - Home'a don

## 2) Icerik Katmanlari

1. Curated hikayeler (sabit):
   - `data.ts` icindeki story paketleri
   - lokal gorseller (`/public/images`)
2. AI hikayeler (dinamik):
   - `services/storyGenerator.ts`
   - API timeout veya hata durumunda fallback zorunlu
3. Interaktif hikayeler:
   - branch + choice + ending modeli
   - okuma ve ending analitigi tutulur

## 3) Gorsel Stratejisi

1. Birincil kaynak: yerel gorseller (`/images/...`)
2. Uygulamada kullanilan dosya adlari:
   - kisa, stabil, semantik adlar (or: `friendly_rocket_stars.jpg`)
3. Prompttan gelen uzun adli dosyalar:
   - kaynak olarak kalabilir
   - runtime referanslari kisa adlara maplenir

## 4) Ses Stratejisi

1. Premium TTS (OpenAI) birinci tercih
2. Browser SpeechSynthesis fallback
3. Metin oynatma oncesi:
   - sanitize
   - chunkleme
   - dogal duraklama (punctuation + uzunluk bazli)
4. Reader hicbir durumda "sessiz kilitlenme"ye dusmemeli

## 5) Kalite Kapilari (Release Gate)

`npm run smoke` green olmadan release alinmaz:

1. Typecheck
2. Build
3. `data.ts` gorsel referans butunlugu
4. Story ID butunlugu

Opsiyonel:

- `npm run smoke:full` ile API endpoint smoke

## 6) 2 Haftalik Uygulama Programi

### Hafta 1: Stabilizasyon

1. Smoke komutunun CI'ya alinmasi
2. Reader ses fallback ve hata durum testleri
3. Story/branch veri dogrulama kurallari

### Hafta 2: Kurgu ve Büyüme

1. Tema bazli "story packs" (8-12 hikaye / tema)
2. Yas grubuna gore ses hizi + paragraf uzunlugu profilleri
3. Home icin "devam et", "senin icin secildi", "gece modu" bloklari

## 7) Basari Metrikleri

1. Story completion rate
2. Ortalama session suresi
3. TTS fallback orani (dusuk olmali)
4. Crash-free oturum orani
5. Interaktif hikayede ending cesitliligi
