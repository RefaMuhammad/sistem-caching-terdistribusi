# E-Commerce Caching Performance Test (Redis Standalone vs Cluster)

Proyek ini menguji dampak implementasi caching terdistribusi menggunakan **Redis Cluster** dibandingkan dengan **Redis Standalone** pada performa API aplikasi e-commerce.

## 🗂️ Struktur Folder

```
E-Commerce-main/
├─ backend/
│  ├─ index.js              # Entry point Express.js
│  ├─ redisClient.js        # Redis Standalone client
│  ├─ redisClusterClient.js # Redis Cluster client
│  └─ routes/product.js     # Product API routes
├─ docker/
│  └─ docker-compose.yml    # Docker setup untuk Redis Cluster & Standalone
├─ loadtest/
│  └─ k6_test.js            # Script k6 untuk uji performa API
```

---

## 🐳 Langkah 1: Jalankan Redis Cluster & Standalone dengan Docker

Masuk ke folder `docker/`, lalu jalankan:

```bash
cd docker
docker-compose up -d
```

Ini akan menjalankan:
- 3 node Redis Cluster di port 7000, 7001, 7002
- Redis Standalone di port 6379

---

## 🚀 Langkah 2: Install Dependensi Backend

```bash
cd ../backend
npm install
```

---

## 🌐 Langkah 3: Jalankan Server Express

```bash
node index.js
```

Server akan aktif di: `http://localhost:3000`

> 🔧 Pastikan `redisClient.js` digunakan untuk Redis Standalone dan `redisClusterClient.js` untuk Redis Cluster (ubah secara manual di `routes/product.js`).

---

## ✅ Langkah 4: Test API Manual (Opsional)

### Get semua produk
```
GET http://localhost:3000/api/product/all
```

### Get produk by ID
```
GET http://localhost:3000/api/product/1
```

### Search produk
```
GET http://localhost:3000/api/product/search?q=iphone
```

---

## 📊 Langkah 5: Jalankan Pengujian Load dengan k6

### 1. Install k6
Download dari: [https://github.com/grafana/k6/releases](https://github.com/grafana/k6/releases)

Pastikan `k6` dapat diakses dari terminal:

```bash
k6 version
```

### 2. Jalankan Pengujian

```bash
cd ../loadtest
k6 run k6_test.js
```

---

## 📌 Catatan

- Gunakan **Redis Standalone** terlebih dahulu, lalu uji performa.
- Kemudian ganti ke **Redis Cluster** dengan mengubah import Redis client di `routes/product.js`.
- Bandingkan hasil pengujian `k6` dari kedua konfigurasi untuk melihat dampaknya terhadap performa API.

---

## 📬 Kontak

Dibuat oleh: [Refa Muhammad](https://github.com/RefaMuhammad)
