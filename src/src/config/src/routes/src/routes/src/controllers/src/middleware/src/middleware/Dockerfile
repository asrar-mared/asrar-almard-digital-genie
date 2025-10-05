# استخدام Node.js LTS
FROM node:18-alpine

# تثبيت dumb-init لمعالجة الإشارات بشكل صحيح
RUN apk add --no-cache dumb-init

# إنشاء مجلد التطبيق
WORKDIR /usr/src/app

# نسخ ملفات package
COPY package*.json ./

# تثبيت dependencies فقط للإنتاج
RUN npm ci --only=production && npm cache clean --force

# نسخ باقي الملفات
COPY . .

# إنشاء مجلد logs
RUN mkdir -p logs

# إنشاء مستخدم غير root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# تغيير الملكية
RUN chown -R nodejs:nodejs /usr/src/app

# التبديل للمستخدم
USER nodejs

# فتح المنفذ
EXPOSE 3000

# متغيرات البيئة
ENV NODE_ENV=production

# الصحة
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# تشغيل التطبيق
CMD ["dumb-init", "node", "src/index.js"]
