import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import productRoutes from './src/routes/product.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());


app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`)
});