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

// CORS тохиргоо - Production-д зориулсан
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://bodol-last.vercel.app',
  'https://bodol-last-baljirs-projects.vercel.app',
  'https://bodol-last-git-main-baljirs-projects.vercel.app',
  'https://bodol-last-d1cbkicyv-baljirs-projects.vercel.app',
  'https://*.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list or is a vercel app
      if (
        allowedOrigins.some(
          (allowed) =>
            allowed === origin ||
            (allowed.includes('*.vercel.app') && origin.endsWith('.vercel.app'))
        )
      ) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware-ууд
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Root маршрут
app.get('/', (req, res) => {
  res.send('running...');
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
