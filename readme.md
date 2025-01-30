# Akgün Mobilya API

Akgün Mobilya için geliştirilen bir RESTful API.

## 🚀 Proje Hakkında

Akgün Mobilya API, firmanın web platformu için içerik yönetimini sağlamak amacıyla geliştirilmiştir. Bu API, kullanıcıların dinamik içerikleri (ana sayfa kartları, slider görselleri, referanslar, hakkımızda, foto galeri ve projeler) kolayca yönetebilmesini sağlar. Proje, **Node.js, Express.js ve MongoDB** teknolojileri kullanılarak oluşturulmuştur ve güvenli, ölçeklenebilir bir mimariye sahiptir. Güvenlik için **token tabanlı kimlik doğrulama** kullanılmıştır, böylece API'ye yapılan her istekte kullanıcıların doğruluğu güvenli bir şekilde kontrol edilmektedir.

## 📦 Kullanılan Teknolojiler

- **Express.js** - Backend framework
- **Mongoose** - MongoDB ODM
- **Multer** - Dosya yükleme
- **CORS** - Cross-origin resource sharing
- **dotenv** - Ortam değişkenleri yönetimi
- **nodemon** - Geliştirme sırasında otomatik yeniden başlatma

## 📌 API Endpointleri

### 🔐 Yetkilendirme (Auth)

| Metod | Endpoint       | Açıklama              |
| ----- | -------------- | --------------------- |
| POST  | `/auth/login`  | Kullanıcı giriş yapar |
| GET   | `/auth/logout` | Kullanıcı çıkış yapar |

### 🏠 Ana Sayfa Kartları (HomeCard)

| Metod  | Endpoint        | Açıklama              |
| ------ | --------------- | --------------------- |
| GET    | `/homecard`     | Tüm kartları getirir  |
| POST   | `/homecard`     | Yeni kart ekler       |
| GET    | `/homecard/:id` | Belirli kartı getirir |
| PUT    | `/homecard/:id` | Kartı günceller       |
| DELETE | `/homecard/:id` | Kartı siler           |

### 🎞️ Slider

| Metod  | Endpoint      | Açıklama                |
| ------ | ------------- | ----------------------- |
| GET    | `/slider`     | Tüm sliderları getirir  |
| POST   | `/slider`     | Yeni slider ekler       |
| GET    | `/slider/:id` | Belirli sliderı getirir |
| PUT    | `/slider/:id` | Sliderı günceller       |
| DELETE | `/slider/:id` | Sliderı siler           |

### 🏢 Referanslar (Reference)

| Metod  | Endpoint         | Açıklama                  |
| ------ | ---------------- | ------------------------- |
| GET    | `/reference`     | Tüm referansları getirir  |
| POST   | `/reference`     | Yeni referans ekler       |
| GET    | `/reference/:id` | Belirli referansı getirir |
| PUT    | `/reference/:id` | Referansı günceller       |
| DELETE | `/reference/:id` | Referansı siler           |

### ℹ️ Hakkımızda (About)

| Metod  | Endpoint     | Açıklama                     |
| ------ | ------------ | ---------------------------- |
| GET    | `/about`     | Hakkımızda bilgisini getirir |
| POST   | `/about`     | Yeni bilgi ekler             |
| GET    | `/about/:id` | Belirli bilgiyi getirir      |
| PUT    | `/about/:id` | Bilgiyi günceller            |
| DELETE | `/about/:id` | Bilgiyi siler                |

### 📸 Foto Galeri (PhotoGallery)

| Metod  | Endpoint            | Açıklama                  |
| ------ | ------------------- | ------------------------- |
| GET    | `/photogallery`     | Tüm fotoğrafları getirir  |
| POST   | `/photogallery`     | Yeni fotoğraf ekler       |
| GET    | `/photogallery/:id` | Belirli fotoğrafı getirir |
| PUT    | `/photogallery/:id` | Fotoğrafı günceller       |
| DELETE | `/photogallery/:id` | Fotoğrafı siler           |

### 🏗️ Projeler (Projects)

| Metod  | Endpoint        | Açıklama                |
| ------ | --------------- | ----------------------- |
| GET    | `/projects`     | Tüm projeleri getirir   |
| POST   | `/projects`     | Yeni proje ekler        |
| GET    | `/projects/:id` | Belirli projeyi getirir |
| PUT    | `/projects/:id` | Projeyi günceller       |
| DELETE | `/projects/:id` | Projeyi siler           |
