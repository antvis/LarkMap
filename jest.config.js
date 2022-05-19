module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
};
