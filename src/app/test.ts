// https://github.com/webpack/karma-webpack#alternative-usage

// require all modules ending in "_spec" from the
// current directory and all subdirectories
// to creates a single bundle with all testcases
let testsContext: any = (require as any).context('.', true, /\.spec\.ts$/);
testsContext.keys().forEach((path) => {
  try {
    testsContext(path);
  } catch (err) {
    console.error('[ERROR] WITH SPEC FILE: ', path);
    console.error(err);
  }
});
