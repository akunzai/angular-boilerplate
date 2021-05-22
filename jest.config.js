/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  // Use html coverage report for CI output, use text reports for console.
  coverageReporters: ["html", "text", "text-summary"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
