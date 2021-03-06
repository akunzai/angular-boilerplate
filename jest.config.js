/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!src/app/app.module.ts",
    "!src/app/todo.service.xhr.ts",
    "!src/environment/*.ts",
    "!src/mocks/*.ts",
    "!jest.global-mocks.ts",
  ],
};
