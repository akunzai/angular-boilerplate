// https://jestjs.io/docs/en/configuration
module.exports = {
  // https://kulshekhar.github.io/ts-jest/user/config/
  preset: 'ts-jest',
  // https://jestjs.io/docs/en/configuration.html#testenvironment-string
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(html)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
