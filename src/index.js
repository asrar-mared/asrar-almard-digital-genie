import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from './config/logger.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// تحميل المتغيرات البيئية
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ====================================
// Middleware الأمان
// ====================================
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// ====================================
// Middleware العام
// ====================================
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// تسجيل الطلبات
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: { write: message => logger.info(message.trim()) }
  }));
}

// ====================================
// Rate Limiting
// ====================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // حد أقصى 100 طلب
  message: 'تم تجاوز الحد الأقصى للطلبات. حاول مرة أخرى لاحقاً',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// ====================================
// Health Check
// ====================================
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});

// ====================================
// API Routes
// ====================================
app.use('/api', routes);

// ====================================
// Error Handling
// ====================================
app.use(notFoundHandler);
app.use(errorHandler);

// ====================================
// بدء السيرفر
// ====================================
const server = app.listen(PORT, () => {
  logger.info(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
  logger.info(`📍 البيئة: ${NODE_ENV}`);
  logger.info(`🔗 الرابط: http://localhost:${PORT}`);
});

// معالجة الإغلاق السلس
process.on('SIGTERM', () => {
  logger.info('⚠️ تم استلام إشارة SIGTERM، إغلاق السيرفر بشكل سلس...');
  server.close(() => {
    logger.info('✅ السيرفر تم إغلاقه بنجاح');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err) => {
  logger.error('❌ خطأ غير معالج:', err);
  server.close(() => process.exit(1));
});

export default app;
