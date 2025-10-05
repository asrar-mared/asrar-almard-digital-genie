# 🚀 مشروع Node.js احترافي

مشروع Node.js مُعد بشكل احترافي مع Express.js وأفضل الممارسات

## 📋 المميزات

- ✅ **Express.js** - إطار عمل سريع وبسيط
- 🔒 **Security** - Helmet, CORS, Rate Limiting
- 📝 **Logging** - Winston للتسجيل الاحترافي
- ✔️ **Validation** - Joi للتحقق من البيانات
- 🗂️ **Structure** - بنية منظمة وقابلة للتوسع
- 🔄 **Error Handling** - معالجة احترافية للأخطاء
- 📦 **Compression** - ضغط الاستجابات
- 🎯 **RESTful API** - واجهة برمجية متوافقة مع المعايير

## 📁 هيكل المشروع

```
project/
├── src/
│   ├── config/          # ملفات الإعدادات
│   │   └── logger.js    # إعدادات التسجيل
│   ├── controllers/     # Controllers
│   │   └── userController.js
│   ├── middleware/      # Middleware
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── routes/          # المسارات
│   │   ├── index.js
│   │   └── userRoutes.js
│   └── index.js         # نقطة الانطلاق
├── logs/                # ملفات السجلات
├── .env                 # المتغيرات البيئية
├── .env.example         # مثال للمتغيرات
├── package.json
└── README.md
```

## 🛠️ التثبيت

### 1. نسخ المشروع
```bash
git clone <repository-url>
cd project-name
```

### 2. تثبيت الحزم
```bash
npm install
```

### 3. إعداد المتغيرات البيئية
```bash
cp .env.example .env
# قم بتعديل .env حسب احتياجاتك
```

### 4. تشغيل المشروع

#### وضع التطوير (مع التحديث التلقائي)
```bash
npm run dev
```

#### وضع الإنتاج
```bash
npm start
```

## 📡 API Endpoints

### Health Check
```
GET /health
```

### المستخدمين

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/users` | جلب كل المستخدمين (مع pagination) |
| GET | `/api/users/:id` | جلب مستخدم معين |
| POST | `/api/users` | إنشاء مستخدم جديد |
| PUT | `/api/users/:id` | تحديث مستخدم |
| DELETE | `/api/users/:id` | حذف مستخدم |

### مثال على الطلبات

#### إنشاء مستخدم
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "age": 25
  }'
```

#### جلب المستخدمين مع Pagination
```bash
curl http://localhost:3000/api/users?page=1&limit=10
```

#### البحث عن مستخدمين
```bash
curl http://localhost:3000/api/users?search=أحمد
```

## 🧪 الاختبارات

```bash
# تشغيل الاختبارات
npm test

# مع Coverage
npm test -- --coverage
```

## 🎨 Code Quality

```bash
# Linting
npm run lint

# إصلاح المشاكل تلقائياً
npm run lint:fix

# Formatting
npm run format
```

## 📦 البناء للإنتاج

```bash
# بناء المشروع
npm run build

# تنظيف المشروع
npm run clean
```

## 🔧 المتغيرات البيئية

| Variable | الوصف | القيمة الافتراضية |
|----------|-------|-------------------|
| `NODE_ENV` | بيئة التشغيل | `development` |
| `PORT` | منفذ السيرفر | `3000` |
| `LOG_LEVEL` | مستوى التسجيل | `info` |
| `ALLOWED_ORIGINS` | المصادر المسموحة لـ CORS | `*` |

## 🔒 الأمان

المشروع يتضمن:
- **Helmet** - حماية HTTP headers
- **CORS** - إدارة الوصول المتقاطع
- **Rate Limiting** - حماية من الهجمات
- **Input Validation** - التحقق من المدخلات
- **Error Handling** - عدم كشف معلومات حساسة

## 📝 السجلات

السجلات يتم حفظها في مجلد `logs/`:
- `error.log` - الأخطاء فقط
- `combined.log` - جميع السجلات
- `exceptions.log` - الأخطاء الحرجة
- `rejections.log` - Promise rejections

## 🚀 النشر

### على Heroku
```bash
heroku create your-app-name
git push heroku main
```

### على Railway
```bash
railway login
railway init
railway up
```

### على Docker
```bash
docker build -t nodejs-app .
docker run -p 3000:3000 nodejs-app
```

## 📚 الموارد

- [Express.js Documentation](https://expressjs.com/)
- [Winston Logger](https://github.com/winstonjs/winston)
- [Joi Validation](https://joi.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 👨‍💻 المساهمة

المساهمات مرحب بها! يرجى:
1. Fork المشروع
2. إنشاء branch جديد
3. Commit التغييرات
4. Push إلى Branch
5. فتح Pull Request

## 📄 الترخيص

MIT License

##
