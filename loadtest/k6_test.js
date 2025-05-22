// loadtest/k6_test.js

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 20 }, // Naik ke 20 pengguna selama 10 detik
    { duration: '30s', target: 20 }, // Tahan di 20 pengguna selama 30 detik
    { duration: '10s', target: 0 },  // Turunkan ke 0
  ],
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  const productIds = [1, 2, 3]; // Sesuaikan dengan ID produk yang ada di backend
  const randomId = productIds[Math.floor(Math.random() * productIds.length)];

  const res = http.get(`${BASE_URL}/api/product/${randomId}`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1); // Simulasi delay antar request user
}
