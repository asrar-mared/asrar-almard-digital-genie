import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

// صفحة API الرئيسية
router.get('/', (req, res) => {
  res.json({
    message: 'مرحباً بك في API الاحترافي',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/api/users',
      docs: '/api/docs'
    }
  });
});

// مسارات المستخدمين
router.use('/users', userRoutes);

export default router;
