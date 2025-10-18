const { defineConfig } = require("cypress");
require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  retries: {
    "runMode": 2,
    "openMode": 0
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'report',
    overwrite: true,
    html: true,
    json: true
  },
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    responseTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
