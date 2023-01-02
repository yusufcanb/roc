module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 60_000,
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  // collectCoverageFrom: [
  //     "src/**/*.{ts,js,jsx}"
  // ],
  coveragePathIgnorePatterns: [
    'jest.config.js',
    '/node_modules/',
    '/dist/',
    '/lib/',
  ],
};
