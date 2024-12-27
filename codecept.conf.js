const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
// eslint-disable-next-line no-undef
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
// eslint-disable-next-line no-undef
exports.config = {
  tests: 'e2e/**/*.test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:8080',
      show: true,
    },
  },
  include: {
    I: './steps_file.js',
  },
  name: 'Restau-Run',
  plugins: {
    screenshotOnFail: {
      enabled: false,
    },
  },
};
