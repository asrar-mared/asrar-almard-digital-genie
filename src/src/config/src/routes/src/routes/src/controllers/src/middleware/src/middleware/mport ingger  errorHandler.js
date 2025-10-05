import logger from '../config/logger.js';

// معالج للمسارات غير الموجودة
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`المسار غير موجود: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// معالج الأخطاء العام
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'خطأ في السيرفر';
  
  // تسجيل الخطأ
  logger.error(`[${statusCode}] ${message}`, {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    stack: err.stack
  });
  
  // الرد للعميل
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err
    })
  });
};

// معالج الأخطاء غير المتزامنة
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default { notFoundHandler, errorHandler, asyncHandler };
