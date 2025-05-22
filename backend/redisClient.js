// backend/redisClient.js

const { createClient } = require('redis');

// Buat koneksi ke Redis single-node
const redisClient = createClient({
  url: 'redis://localhost:6379' // Sesuaikan jika Redis ada di host berbeda
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

redisClient.connect()
  .then(() => {
    console.log('Connected to Redis (single node)');
  })
  .catch((err) => {
    console.error('Redis connection failed', err);
});

module.exports = redisClient;
