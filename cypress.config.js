const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    viewportHeight: 768,
    viewportWidth: 1366,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 0,
      openMode: 1,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
