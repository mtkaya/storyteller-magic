# Canva Scene Visual Workflow

Bu dokuman, bir hikayede tek kapak yerine sahne ilerledikce farkli gorseller uretmek icin izlenen akisi tanimlar.

## Nasil calisiyor

- Okuyucu ekrani artik `services/storySceneVisuals.ts` uzerinden sahne gorseli seciyor.
- Secim parametreleri:
  - `story.id`
  - aktif branch (`branchId`)
  - paragraf indeksi (`paragraphIndex`)
  - kullanicinin secim derinligi (`choiceDepth`)
  - sahne fazi (`opening/journey/choice/climax/resolution`)
- Her temanin kendi gorsel havuzu var. Bu sayede:
  - butunluk korunuyor
  - ayni hikayede tekrar eden gorsel oranı dusuyor

## Canva icin prompt uretilmesi

`resolveStorySceneVisual(...)` sonucu icinde `canvaPrompt` doner.

Bu prompt:
- tema
- karakter
- sahne fazi
- branch ipucu
- varyant numarasi
- stil kilidi (fotogercekcilik yok, logo/yazi yok, bedtime ton)

bilgilerini icerir.

Ek olarak `buildCanvaStoryboardScenes(story, language, totalScenes)` fonksiyonu ile tek hikaye icin 4-16 arasi sahne prompt listesi alabilirsiniz.

## Onerilen Canva uretim standardi

- Oran: `3:4` (dikey)
- Stil: cocuk kitabi, painterly, yumusak gece paleti
- Her hikaye icin en az 8 sahne varyanti
- Ayni hikaye icinde renk sicakligi benzer tutulur
- Metin ve watermark kapatilir

## Sonraki adim (opsiyonel)

- `buildCanvaStoryboardScenes` ciktilarini JSON olarak export eden bir admin komutu eklenebilir.
- Uretilen Canva gorselleri `public/images/story-scenes/<story-id>/` altina alinip story bazli kalici esleme yapilabilir.

## Yeni: Uygulama icinden CSV export

- Ayarlar ekranina `Canva Prompt CSV Indir` butonu eklendi.
- Kaynak dosya: `services/canvaPromptExport.ts`
- UI baglantisi: `pages/Settings.tsx`
- Export icerigi:
  - `story_id`
  - `story_title`
  - `theme`
  - `scene_number`
  - `phase`
  - `prompt`

## Ucretsiz urettigin yeni gorselleri baglama

1. Gorselleri tema klasorlerine koy:
   - `public/images/generated/adventure/*.jpg`
   - `public/images/generated/magic/*.jpg`
   - `public/images/generated/calm/*.jpg`
   - vb.
2. Manifesti yenile:
   - `npm run images:refresh-scene-manifest`
3. Uygulamayi build et:
   - `npm run build`

Not:
- Promptlar `docs/illustration-prompts.md` stil kilidi + negatif promptlari ile uyumlu hale getirildi.
- Runtime'da once `generated` klasorundaki gorseller kullanilir, sonra dahili fallback havuzu devreye girer.

## Otomatik ucretsiz gorsel uretimi (yeni)

Direkt repo icinde prompttan gorsel uretmek icin:

1. Varsayilan uretim:
   - `npm run images:generate-free`
2. Mevcut dosyalari da yenileyerek uretim:
   - `npm run images:generate-free:force`
3. Belirli temalar:
   - `node scripts/generate-free-scene-images.mjs --themes=magic,adventure --count=12`

Script:
- `scripts/generate-free-scene-images.mjs`
- Kaynak prompt yapisi: `docs/illustration-prompts.md`
- Uretimden sonra manifest otomatik yenilenir (`data/generatedSceneImages.ts`).
- Ucretsiz endpoint hata verirse script fallback gorsel uretmez; bu sayede istenmeyen stilde sahne karisimi olmaz.
- Yeni stil kilidi: tema bazli `technique lock + tone lock` kullanilir; sahneler arasinda stil drift azaltilir.
- Reader tarafinda generated havuz varsa eski statik havuzla karistirilmaz; boylece hikaye icinde gorsel dili korunur.
