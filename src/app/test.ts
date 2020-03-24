// https://github.com/webpack/karma-webpack#alternative-usage

// require all modules ending in "_test" from the
// current directory and all subdirectories
const testsContext: __WebpackModuleApi.RequireContext = require.context(
  '.',
  true,
  /\.spec\.ts$/
);

testsContext.keys().forEach(testsContext);
