import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50, // virtual users
  duration: '30s', // lama pengujian
};

const BASE_URL = 'http://localhost:3000/api/product';

export default function () {
  // 1. Test ambil semua produk
  let resAll = http.get(`${BASE_URL}/all`);
  check(resAll, {
    'GET /all status is 200': (r) => r.status === 200,
    'GET /all returns array': (r) => Array.isArray(r.json()),
  });

  // 2. Test pencarian
  let resSearch = http.get(`${BASE_URL}/search?q=iphone`);
  check(resSearch, {
    'GET /search status is 200': (r) => r.status === 200,
    'GET /search returns some data': (r) => r.json().length >= 0,
  });

  // 3. Test ambil produk berdasarkan ID
  let resById = http.get(`${BASE_URL}/1`);
  check(resById, {
    'GET /:id status is 200': (r) => r.status === 200,
    'GET /:id returns correct product': (r) => r.json().id === 1,
  });

  sleep(1); // delay antar request
}
