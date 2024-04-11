require('dotenv').config();

module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config',
    'src/app.js',
    'tests'
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  globalTeardown: './tests/teardown.js',
  //   setupFiles: ['dotenv/config'],
  setupFiles: ['./tests/setupEnvVars.js'],
  testTimeout: 10000
};
