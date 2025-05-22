// backend/redisClusterClient.js

const { createCluster } = require('redis');

// Buat koneksi ke Redis Cluster
const redisCluster = createCluster({
  rootNodes: [
    {
      url: 'redis://localhost:7000'
    },
    {
      url: 'redis://localhost:7001'
    },
    {
      url: 'redis://localhost:7002'
    }
  ],
  defaults: {
    socket: {
      reconnectStrategy: () => 1000 // reconnect setelah 1 detik
    }
  }
});

redisCluster.on('error', (err) => {
  console.error('Redis Cluster Error:', err);
});

redisCluster.connect()
  .then(() => {
    console.log('Connected to Redis Cluster');
  })
  .catch((err) => {
    console.error('Redis Cluster connection failed', err);
});

module.exports = redisCluster;
