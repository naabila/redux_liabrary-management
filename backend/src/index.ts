import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';
import borrowRoutes from './routes/borrowRoutes';
import errorHandler from './middleware/errorHandler';
import { connectDB } from './config/db';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes); // Mount book routes
app.use('/api/borrows', borrowRoutes); // Mount borrow routes

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});