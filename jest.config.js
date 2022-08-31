/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!src/app/**/*.spec.ts",
    "!src/app/app.module.ts",
    "!src/app/types.ts",
    "!src/environment/*.ts",
    "!src/mocks/*.ts",
    "!jest.global-mocks.ts",
  ],
};
