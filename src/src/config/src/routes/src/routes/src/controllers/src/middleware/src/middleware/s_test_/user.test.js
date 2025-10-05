import request from 'supertest';
import app from '../index.js';

describe('User API Tests', () => {
  
  // اختبار جلب كل المستخدمين
  describe('GET /api/users', () => {
    test('يجب أن يرجع قائمة المستخدمين', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
    });
    
    test('يجب أن يدعم Pagination', async () => {
      const response = await request(app)
        .get('/api/users?page=1&limit=5')
        .expect(200);
      
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(5);
    });
    
    test('يجب أن يدعم البحث', async () => {
      const response = await request(app)
        .get('/api/users?search=أحمد')
        .expect(200);
      
      expect(response.body.success).toBe(true);
    });
  });
  
  // اختبار جلب مستخدم واحد
  describe('GET /api/users/:id', () => {
    test('يجب أن يرجع مستخدم موجود', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 1);
    });
    
    test('يجب أن يرجع 404 لمستخدم غير موجود', async () => {
      const response = await request(app)
        .get('/api/users/9999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
    });
  });
  
  // اختبار إنشاء مستخدم
  describe('POST /api/users', () => {
    test('يجب أن ينشئ مستخدم جديد بنجاح', async () => {
      const newUser = {
        name: 'محمد علي',
        email: 'mohamed@test.com',
        age: 28
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        name: newUser.name,
        email: newUser.email,
        age: newUser.age
      });
    });
    
    test('يجب أن يرفض بيانات غير صحيحة', async () => {
      const invalidUser = {
        name: 'ab', // أقل من 3 أحرف
        email: 'invalid-email',
        age: 150 // أكبر من 120
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
    
    test('يجب أن يرفض بريد مكرر', async () => {
      const duplicateUser = {
        name: 'مستخدم جديد',
        email: 'ahmed@example.com', // بريد موجود بالفعل
        age: 25
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(duplicateUser)
        .expect(400);
      
      expect(response.body.success).toBe(false);
    });
  });
  
  // اختبار تحديث مستخدم
  describe('PUT /api/users/:id', () => {
    test('يجب أن يحدث مستخدم موجود', async () => {
      const updateData = {
        name: 'أحمد محمد المحدث',
        email: 'ahmed.updated@example.com',
        age: 26
      };
      
      const response = await request(app)
        .put('/api/users/1')
        .send(updateData)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
    });
    
    test('يجب أن يرجع 404 لمستخدم غير موجود', async () => {
      const response = await request(app)
        .put('/api/users/9999')
        .send({ name: 'test', email: 'test@test.com', age: 25 })
        .expect(404);
      
      expect(response.body.success).toBe(false);
    });
  });
  
  // اختبار حذف مستخدم
  describe('DELETE /api/users/:id', () => {
    test('يجب أن يحذف مستخدم موجود', async () => {
      const response = await request(app)
        .delete('/api/users/1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
    });
    
    test('يجب أن يرجع 404 لمستخدم غير موجود', async () => {
      const response = await request(app)
        .delete('/api/users/9999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
    });
  });
  
});

// اختبار Health Check
describe('Health Check', () => {
  test('GET /health يجب أن يعمل بشكل صحيح', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
  });
});
