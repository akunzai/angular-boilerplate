// CJS wrapper for until-async ESM module
// This is a workaround for Jest not being able to handle ESM modules properly
// See: https://github.com/faker-js/faker/issues/3606#issuecomment-3233612736

const untilAsync = {
  until: async function(callback) {
    try {
      return [null, await callback().catch((error) => {
        throw error;
      })];
    } catch (error) {
      return [error, null];
    }
  }
};

module.exports = untilAsync;
