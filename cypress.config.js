const { defineConfig } = require("cypress");
require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  retries: {
    "runMode": 2,
    "openMode": 0
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Results',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/reports',
  },
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    responseTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
