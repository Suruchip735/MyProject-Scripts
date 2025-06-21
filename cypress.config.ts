import { defineConfig } from 'cypress';
//import dotenvPlugin from 'cypress-dotenv';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  pageLoadTimeout: 120000, // 2 minutes
  e2e: {
    baseUrl: process.env.APP_DOMAIN,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //config = dotenvPlugin(config); // Load .env variables

      return config;
    },

    // Timeout configurations - set all blocking actions to minimum 15 seconds
    defaultCommandTimeout: 30000, // 30 seconds for cy.get(), cy.click(), etc.
    requestTimeout: 30000, // 30 seconds for cy.request()
    responseTimeout: 30000, // 30 seconds for cy.intercept() responses
    taskTimeout: 30000, // 30 seconds for cy.task()
    execTimeout: 30000, // 30 seconds for cy.exec()

    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    experimentalStudio: true,

    env: {
      // Use process.env to access the variables from the .env file
      LOGIN_USERNAME: process.env.LOGIN_USERNAME,
      LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,
      invalidemail: process.env.invalidemail,
      invalidpassword: process.env.invalidpassword,
      emailwhitespace: process.env.emailwhitespace,
      Caseemail: process.env.Caseemail,
      Button: process.env.Button,
      Button2: process.env.Button2,
    },
  },
});
