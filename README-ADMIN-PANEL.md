# 👑 LHAMO Admin Panel - Brutal Control Center

## 🔥 Genel Bakış

LHAMO sitesi için tam özellikli web tabanlı admin paneli. Site üzerinde tüm değişiklikleri yapmak için güçlü ve kullanıcı dostu bir interface.

## 🚀 Admin Panel Özellikleri

### ✅ **Mevcut Özellikler:**

1. **🔐 Güvenli Giriş Sistemi**
   - Kullanıcı adı/şifre ile kimlik doğrulama
   - Session yönetimi
   - Güvenli logout

2. **📊 Dashboard**
   - Site istatistikleri
   - Son blog yazıları
   - Hızlı erişim menüleri
   - Genel bakış

3. **📝 Blog Yönetimi**
   - ✅ Yeni blog yazısı oluşturma
   - ✅ Mevcut yazıları düzenleme
   - ✅ Blog yazılarını silme
   - ✅ Kategori ve etiket yönetimi
   - ✅ SEO optimizasyonu
   - ✅ Öne çıkan yazı işaretleme
   - ✅ Markdown içerik editörü
   - ✅ Canlı önizleme

4. **⚙️ Site Konfigürasyonu**
   - Genel site ayarları
   - İletişim bilgileri
   - Sosyal medya linkleri
   - SEO ayarları
   - Tema renkleri

5. **📁 Medya Kütüphanesi**
   - Dosya yükleme (drag & drop)
   - Görsel yönetimi
   - Dosya silme
   - Path kopyalama
   - Grid/List görünüm

6. **📊 Analytics Dashboard**
   - ✅ Site trafiği analizi
   - ✅ Sayfa görüntüleme istatistikleri
   - ✅ Ziyaretçi demografileri
   - ✅ Cihaz bazlı analizler
   - ✅ Trafik kaynakları
   - ✅ Performans metrikleri

## 🔑 **Giriş Bilgileri**

```
Kullanıcı Adı: lhamo
Şifre: brutal2024
```

## 📱 **Admin Panel Erişimi**

### **URL:** `/admin`

1. Siteye gidin: `http://localhost:3000/admin`
2. Giriş bilgilerini girin
3. Dashboard'a yönlendirileceksiniz

## 🛠️ **Kullanım Kılavuzu**

### **1. Blog Yazısı Oluşturma**

1. Admin panel → **BLOG POSTS**
2. **CREATE POST** butonuna tıklayın
3. Form alanlarını doldurun:
   - **Title**: Yazı başlığı
   - **Excerpt**: Kısa açıklama
   - **Content**: Ana içerik (Markdown destekli)
   - **Category**: Kategori seçin
   - **Tags**: Etiketleri virgülle ayırın
   - **Featured**: Öne çıkan yazı için işaretleyin
   - **SEO Settings**: Meta başlık, açıklama, anahtar kelimeler

4. **PUBLISH** veya **SAVE DRAFT** ile kaydedin

### **2. Site Ayarlarını Değiştirme**

1. Admin panel → **SITE CONFIG**
2. İlgili sekmeyi seçin:
   - **SITE INFO**: Genel bilgiler
   - **CONTACT**: İletişim bilgileri  
   - **SOCIAL MEDIA**: Sosyal medya linkleri
   - **SEO SETTINGS**: SEO ayarları
   - **THEME**: Renk ayarları

3. Değişiklikleri yapın
4. **SAVE CHANGES** ile kaydedin

### **3. Medya Dosyası Yükleme**

1. Admin panel → **MEDIA**
2. Dosyaları sürükle-bırak yapın veya **SELECT FILES**
3. Yüklenen dosyalar otomatik olarak `/public/` klasörüne kaydedilir
4. **Copy Path** ile dosya yolunu kopyalayın

## 🎯 **Önemli Özellikler**

### **📝 Blog Editörü**
- Markdown desteği
- Canlı önizleme
- SEO optimizasyonu
- Otomatik slug oluşturma
- Kategori ve etiket yönetimi

### **⚙️ Konfigürasyon Yönetimi**
- Tüm site ayarları tek yerden
- Gerçek zamanlı değişiklikler
- JSON tabanlı konfigürasyon

### **📁 Medya Yönetimi**
- Drag & drop yükleme
- Grid/List görünümler
- Toplu işlemler
- Dosya boyutu ve boyut bilgisi

## 🔧 **Teknik Detaylar**

### **Dosya Yapısı**
```
pages/admin/
├── index.js          # Giriş sayfası
├── dashboard.js      # Ana dashboard
├── blog/
│   ├── index.js      # Blog listesi
│   └── new.js        # Yeni blog yazısı
├── config.js         # Site ayarları
└── media.js          # Medya kütüphanesi

components/
└── AdminLayout.js    # Admin panel layout

pages/api/admin/
├── blog/
│   └── create.js     # Blog yazısı oluşturma API
└── config/
    └── update.js     # Konfigürasyon güncelleme API
```

### **API Endpoints**

- `POST /api/admin/blog/create` - Yeni blog yazısı
- `POST /api/admin/config/update` - Site ayarları güncelleme
- `POST /api/admin/media/upload` - Dosya yükleme
- `DELETE /api/admin/media/delete` - Dosya silme

### **Güvenlik**

- **Client-side auth**: localStorage tabanlı
- **Session management**: Otomatik logout
- **Protected routes**: Kimlik doğrulama kontrolü
- **CSRF protection**: API endpoint'leri korumalı

## 🎨 **Tasarım Sistemi**

Admin panel, LHAMO'nun neo-brutalist tasarım dilini takip eder:

- **Renkler**: Sarı (#FDE047), Kırmızı (#DC2626), Siyah (#000000)
- **Tipografi**: Space Grotesk font ailesi
- **Bileşenler**: Neo-card, neo-button sistemi
- **Animasyonlar**: Framer Motion ile smooth geçişler

## 🚨 **Önemli Notlar**

### **Güvenlik**
- **Üretim ortamında** mutlaka güçlü şifre kullanın
- JWT tabanlı authentication ekleyin
- Rate limiting uygulayın
- HTTPS kullanın

### **Backup**
- Düzenli olarak `content/` klasörünü yedekleyin
- Database backup sistemi kurun
- Git ile version control yapın

### **Performance**
- Büyük dosya yüklemelerinde progress bar ekleyin
- Image optimization uygulayın
- CDN kullanmayı düşünün

## 🛡️ **Güvenlik Geliştirmeleri**

Üretim için öneriler:

```javascript
// .env.local
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

## 📞 **Destek**

Admin panel ile ilgili sorunlar için:

1. Browser console'unu kontrol edin
2. Network sekmesinde API çağrılarını inceleyin
3. `npm run dev` ile development modda çalıştırın
4. Log dosyalarını kontrol edin

---

## 🎯 **Gelecek Özellikler**

- [ ] Portfolio yönetimi
- [ ] Analytics dashboard
- [ ] User management
- [ ] Email templates
- [ ] Backup/restore sistem
- [ ] Multi-language support

---

*Bu admin panel LHAMO'nun brutal content management ihtiyaçları için özel olarak tasarlanmıştır. 👑*
