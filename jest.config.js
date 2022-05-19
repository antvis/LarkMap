module.exports = {
  preset: 'ts-jest',
  collectCoverage: false,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '\\.(less|css)$': 'jest-less-loader',
  },
};
