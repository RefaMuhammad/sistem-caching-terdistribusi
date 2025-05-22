// backend/routes/product.js

const express = require('express');
const router = express.Router();

// Gunakan salah satu: redisClient (single-node) atau redisClusterClient (cluster)
const redis = require('../redisClient'); 
// const redis = require('../redisClusterClient'); // Uncomment ini untuk test Redis Cluster

// Simulasi database produk (bisa diganti dengan DB beneran nanti)
const fakeProductDB = {
  '1': { id: 1, name: 'iPhone 14', price: 1299 },
  '2': { id: 2, name: 'Samsung Galaxy S23', price: 1199 },
  '3': { id: 3, name: 'Google Pixel 8', price: 999 }
};

router.get('/all', async (req, res) => {
  try {
    // Misal dari "database" statis:
    const allProducts = Object.values(fakeProductDB); // atau dari DB asli
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Endpoint: GET /api/product/:id
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const cacheKey = `product:${productId}`;

  try {
    // Cek apakah data produk ada di Redis
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log('Cache hit');
      return res.json(JSON.parse(cachedData));
    }

    console.log('Cache miss');

    // Ambil dari 'database'
    const product = fakeProductDB[productId];

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Simulasi delay (misal: ambil dari database asli)
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simpan ke Redis (expired dalam 60 detik)
    await redis.setEx(cacheKey, 60, JSON.stringify(product));

    return res.json(product);

  } catch (err) {
    console.error('Error in product route:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
