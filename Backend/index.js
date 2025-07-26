const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const replyRouter = require('./Routes/replyRoute');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// CORS тохиргоо - Vercel serverless functions зориулсан (FIRST MIDDLEWARE)
app.use((req, res, next) => {
  // Set CORS headers for all requests
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).send();
    return;
  }

  next();
});

// MongoDB холболт
mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    serverSelectionTimeoutMS: 30000, // 30 секунд хүлээх
    socketTimeoutMS: 45000, // 45 секунд socket timeout
    bufferMaxEntries: 0, // Buffer-г идэвхгүй болгох
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware-ууд
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Root маршрут - Updated CORS config - 2025-01-26
app.get('/', (req, res) => {
  res.send('running... CORS updated');
});

// API Routes with /api prefix
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', replyRouter);

// Сервер эхлүүлэх
app.listen(port, () => {
  console.log(`App is listening at port:${port}`);
});

// Export for Vercel
module.exports = app;
