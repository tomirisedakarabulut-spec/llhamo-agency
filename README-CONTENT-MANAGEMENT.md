# 📝 LHAMO İçerik Yönetim Sistemi

## 🚀 Genel Bakış

LHAMO sitesi için dosya tabanlı içerik yönetim sistemi kuruldu. Blog yazıları Markdown formatında, site konfigürasyonları JSON dosyalarında tutuluyor.

## 📁 Dizin Yapısı

```
content/
├── blog/                    # Blog yazıları (Markdown)
│   └── 2024-01-15-brutal-branding-secrets.md
├── config/                  # Site konfigürasyonları
│   ├── site.json           # Genel site ayarları
│   └── services.json       # Servis bilgileri
└── portfolio/              # Portfolio öğeleri (gelecekte)

lib/
└── content.js              # İçerik yönetim fonksiyonları

scripts/
└── create-blog-post.js     # Blog yazısı oluşturma scripti
```

## ✍️ Yeni Blog Yazısı Ekleme

### Yöntem 1: Script ile (Önerilen)
```bash
npm run create-post
```

Script size şu soruları soracak:
- Blog post title
- Excerpt (özet)
- Author (varsayılan: LHAMO TEAM)
- Category (BRANDING/AI/SOCIAL/VIDEO/CONVERSION/GROWTH)
- Read time (örn: 5 MIN)
- Tags (virgülle ayrılmış)
- Featured post mu?

### Yöntem 2: Manuel
1. `content/blog/` dizininde yeni `.md` dosyası oluştur
2. Dosya adı formatı: `YYYY-MM-DD-slug.md`
3. Frontmatter ekle:

```markdown
---
title: "BLOG YAZISI BAŞLIĞI"
excerpt: "Kısa açıklama..."
author: "LHAMO TEAM"
date: "2024-01-15"
category: "BRANDING"
readTime: "5 MIN"
featured: true
image: "/portfolio/1.svg"
tags: ["branding", "strategy", "marketing"]
seo:
  metaTitle: "SEO Başlığı"
  metaDescription: "SEO açıklaması"
  keywords: ["anahtar", "kelimeler"]
---

# İÇERİK BURAYA

Markdown formatında yazınızı yazın...
```

## ⚙️ Site Konfigürasyonu Yönetimi

### Genel Site Ayarları
`content/config/site.json` dosyasını düzenleyin:

```json
{
  "site": {
    "name": "LHAMO",
    "title": "LHAMO - Divine Digital Marketing Agency",
    "description": "Site açıklaması...",
    "url": "https://lhamo.agency"
  },
  "contact": {
    "email": "hello@lhamo.agency",
    "phone": "+90 555 BRUTAL",
    "address": "Istanbul, Turkey"
  },
  "social": {
    "instagram": "https://instagram.com/lhamo.co",
    "twitter": "https://twitter.com/lhamoagency"
  }
}
```

### Servis Bilgileri
`content/config/services.json` dosyasını düzenleyin:

```json
{
  "services": [
    {
      "id": "creative",
      "title": "CREATIVE\nCAMPAIGNS",
      "description": "Açıklama...",
      "price": "₺15,000",
      "popular": false,
      "features": ["Özellik 1", "Özellik 2"]
    }
  ]
}
```

## 🛠️ Kullanılabilir Fonksiyonlar

`lib/content.js` dosyasında şu fonksiyonlar mevcut:

### Blog Fonksiyonları
- `getAllBlogPosts()` - Tüm blog yazılarını getir
- `getBlogPostBySlug(slug)` - Belirli yazıyı getir
- `getFeaturedBlogPosts()` - Öne çıkan yazıları getir
- `getBlogPostsByCategory(category)` - Kategoriye göre yazıları getir
- `getBlogCategories()` - Tüm kategorileri getir

### Konfigürasyon Fonksiyonları
- `getSiteConfig()` - Site konfigürasyonunu getir

### Utility Fonksiyonları
- `formatDate(dateString)` - Tarihi formatla
- `calculateReadTime(content)` - Okuma süresini hesapla
- `generateSlug(title)` - Başlıktan slug oluştur

## 🎯 Kullanım Örnekleri

### Sayfalarda İçerik Kullanımı

```javascript
// pages/blog.js
import { getAllBlogPosts, getBlogCategories } from '../lib/content'

export async function getStaticProps() {
  const blogPosts = getAllBlogPosts()
  const categories = getBlogCategories()
  
  return {
    props: { blogPosts, categories }
  }
}
```

### Konfigürasyon Kullanımı

```javascript
// components/Footer.js
import { getSiteConfig } from '../lib/content'

export default function Footer() {
  const config = getSiteConfig()
  
  return (
    <footer>
      <p>{config.contact.email}</p>
    </footer>
  )
}
```

## 📊 İçerik Türleri

### Blog Yazısı Frontmatter
```yaml
title: string          # Başlık
excerpt: string        # Özet
author: string         # Yazar
date: string          # YYYY-MM-DD formatında
category: string      # Kategori
readTime: string      # Okuma süresi
featured: boolean     # Öne çıkan mı?
image: string         # Görsel yolu
tags: array           # Etiketler
seo: object          # SEO bilgileri
```

### Site Konfigürasyonu
- `site` - Genel site bilgileri
- `contact` - İletişim bilgileri
- `social` - Sosyal medya linkleri
- `seo` - SEO varsayılanları
- `theme` - Tema renkleri
- `features` - Özellik açma/kapama

## 🔧 Gelişmiş Kullanım

### Yeni İçerik Türü Ekleme
1. `content/` altında yeni klasör oluştur
2. `lib/content.js`'e yeni fonksiyonlar ekle
3. Sayfalarda kullan

### Özel Alanlar Ekleme
Frontmatter'a yeni alanlar ekleyebilirsiniz:

```markdown
---
title: "Blog Yazısı"
customField: "Özel değer"
relatedPosts: ["slug-1", "slug-2"]
---
```

## 🚀 Performans İpuçları

1. **Static Generation**: Tüm blog yazıları build zamanında işlenir
2. **Caching**: İçerikler otomatik olarak cache'lenir
3. **SEO**: Her yazı için otomatik SEO meta tagları
4. **Images**: Görselleri `public/` klasöründe tutun

## 🐛 Sorun Giderme

### Build Hataları
```bash
# Cache temizle
npm run clean
npm run build
```

### Markdown Render Sorunları
- Frontmatter formatını kontrol edin
- YAML syntax doğru mu?
- Tarih formatı YYYY-MM-DD mi?

### Dosya Bulunamıyor
- Dosya yolu doğru mu?
- Dosya adı slug ile eşleşiyor mu?
- `content/blog/` dizini var mı?

## 📞 Destek

Sorunlar için:
1. `lib/content.js` fonksiyonlarını kontrol edin
2. Console log'ları inceleyin
3. Build error mesajlarını okuyun

---

*Bu sistem LHAMO'nun brutal content management ihtiyaçları için özel olarak tasarlanmıştır. 🔥*
