import presets from 'jest-preset-angular/presets';

export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!src/app/**/*.spec.js",
    "!src/app/app.module.ts",
    "!src/app/types.ts",
    "!src/environment/*.ts",
    "!src/mocks/*.js",
  ],
  testEnvironment: "./jest.environment.js",
  testEnvironmentOptions: {
    customExportConditions: [''],
  }
}
