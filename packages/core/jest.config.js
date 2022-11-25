module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['./lib'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,js,jsx}'],
  coveragePathIgnorePatterns: [
    'jest.config.js',
    '/node_modules/',
    '/dist/',
    '/lib/',
    'test*.ts'
  ],
  verbose: true,
};
