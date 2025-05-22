// backend/routes/product.js

const express = require('express');
const router = express.Router();
// Gunakan salah satu: redisClient (single-node) atau redisClusterClient (cluster)
// const redis = require('../redisClient'); 
const redis = require('../redisClusterClient'); // Uncomment ini untuk test Redis Cluster
const fakeProductDB = require('../fakeProductDB'); // Import the fake product database

router.get('/all', async (req, res) => {
  try {
    // Get all products from the fake database
    const allProducts = Object.values(fakeProductDB);
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint: GET /api/product/search?q=keyword
router.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter "q" is required' });
  }

  try {
    const allProducts = Object.values(fakeProductDB);
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filtered);
  } catch (err) {
    console.error('Error in search route:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint: GET /api/product/:id
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const cacheKey = `product:${productId}`;

  try {
    // Check if the product data is in Redis
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.log('Cache hit');
      return res.json(JSON.parse(cachedData));
    }

    console.log('Cache miss');

    // Get the product from the fake database
    const product = fakeProductDB[productId];

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Simulate delay (e.g., fetching from a real database)
    await new Promise(resolve => setTimeout(resolve, 100));

    // Save to Redis (expires in 60 seconds)
    await redis.setEx(cacheKey, 60, JSON.stringify(product));

    return res.json(product);

  } catch (err) {
    console.error('Error in product route:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
