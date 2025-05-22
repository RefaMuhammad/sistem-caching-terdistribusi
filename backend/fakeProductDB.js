// backend/fakeProductDB.js

const baseProductNames = [
  'Wireless Headphones',
  'Smart Watch',
  'DSLR Camera',
  'Gaming Laptop',
  'Bluetooth Speaker',
  'Fitness Tracker',
  'Smartphone Case',
  'Portable Charger',
  'LED Monitor',
  'Mechanical Keyboard',
  'Digital Camera',
  'Action Camera',
  'VR Headset',
  'Wireless Mouse',
  'Noise Cancelling Earbuds',
  'Smart Thermostat',
  'Robot Vacuum',
  'Electric Toothbrush',
  'Waterproof Speaker',
  'Smart Light Bulb'
];

const baseDescriptions = [
  'High-quality and durable product for everyday use.',
  'Latest model with advanced features.',
  'Compact and stylish design with excellent performance.',
  'Energy efficient and long-lasting battery.',
  'Made from premium materials for great comfort.',
  'Perfect for home and office use.',
  'Easy to use and maintain.',
  'Offers exceptional value for the price.',
  'Compact size with powerful features.',
  'Ideal gift for friends and family.'
];

const baseImages = [
  'https://images.unsplash.com/photo-1512499617640-c2f9990516e8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517336714731-5549e8bb5c3f?auto=format&fit=crop&w=600&q=80'
];

const fakeProductDB = {};

const totalProducts = 1000;

for (let i = 1; i <= totalProducts; i++) {
  const id = i.toString();
  const baseNameIndex = (i - 1) % baseProductNames.length;
  const baseDescIndex = (i - 1) % baseDescriptions.length;
  const baseImageIndex = (i - 1) % baseImages.length;

  // To make names unique, append a suffix except for the first cycle
  const suffix = Math.floor((i - 1) / baseProductNames.length);
  const name = suffix === 0 ? baseProductNames[baseNameIndex]
    : `${baseProductNames[baseNameIndex]} ${suffix + 1}`;

  // Price range from 10000 to ~100000 incremented roughly with suffix
  const basePrice = 10000 + suffix * 9000;
  // Small random variation up to 999
  const price = basePrice + Math.floor(Math.random() * 1000);

  fakeProductDB[id] = {
    id: id,
    name: name,
    description: baseDescriptions[baseDescIndex],
    price: price,
    image: baseImages[baseImageIndex]
  };
}

module.exports = fakeProductDB;
