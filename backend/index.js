// backend/index.js

const express = require('express');
const app = express();
const cors = require('cors');
const productRoutes = require('./routes/product');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/product', productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
