import Joi from 'joi';

// Schema للتحقق من بيانات المستخدم
const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'الاسم يجب أن يكون نصاً',
      'string.empty': 'الاسم مطلوب',
      'string.min': 'الاسم يجب أن يكون 3 أحرف على الأقل',
      'string.max': 'الاسم يجب ألا يزيد عن 50 حرفاً'
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'البريد الإلكتروني غير صحيح',
      'string.empty': 'البريد الإلكتروني مطلوب'
    }),
  
  age: Joi.number()
    .integer()
    .min(1)
    .max(120)
    .required()
    .messages({
      'number.base': 'العمر يجب أن يكون رقماً',
      'number.min': 'العمر يجب أن يكون 1 على الأقل',
      'number.max': 'العمر يجب ألا يزيد عن 120'
    })
});

// Middleware للتحقق
export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'خطأ في البيانات المدخلة',
      errors
    });
  }
  
  next();
};

export default { validateUser };
