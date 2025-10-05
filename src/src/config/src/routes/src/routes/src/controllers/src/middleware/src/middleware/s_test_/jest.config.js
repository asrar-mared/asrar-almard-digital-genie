export default {
  // بيئة الاختبار
  testEnvironment: 'node',
  
  // مسارات الاختبارات
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // الملفات المستثناة
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  
  // Coverage
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!**/node_modules/**'
  ],
  
  // حد أدنى للتغطية
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // مجلد التقارير
  coverageDirectory: 'coverage',
  
  // تنسيق التقارير
  coverageReporters: [
    'text',
    'lcov',
    'html'
  ],
  
  // Timeout
  testTimeout: 10000,
  
  // إظهار تفاصيل أكثر
  verbose: true,
  
  // Transform
  transform: {},
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
