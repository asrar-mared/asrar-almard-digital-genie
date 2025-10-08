import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/userController.js';
import { validateUser } from '../middleware/validation.js';

const router = express.Router();

// GET /api/users - جلب كل المستخدمين
router.get('/', getAllUsers);

// GET /api/users/:id - جلب مستخدم معين
router.get('/:id', getUserById);

// POST /api/users - إنشاء مستخدم جديد
router.post('/', validateUser, createUser);

// PUT /api/users/:id - تحديث مستخدم
router.put('/:id', validateUser, updateUser);

// DELETE /api/users/:id - حذف مستخدم
router.delete('/:id', deleteUser);

export default router;
