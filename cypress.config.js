import { defineConfig } from 'cypress';
//import dotenvPlugin from 'cypress-dotenv';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  pageLoadTimeout: 12000, // 2 minutes
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //config = dotenvPlugin(config); // Load .env variables
      
      return config;
    },
    
    // Timeout configurations - set all blocking actions to minimum 10 seconds
    defaultCommandTimeout: 10000,        // 10 seconds for cy.get(), cy.click(), etc.
    requestTimeout: 10000,               // 10 seconds for cy.request()
    responseTimeout: 10000,              // 10 seconds for cy.intercept() responses
    taskTimeout: 10000,                  // 10 seconds for cy.task()
    execTimeout: 10000,                  // 10 seconds for cy.exec()
    
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    experimentalStudio: true,
    
    env: {
      // Use process.env to access the variables from the .env file
      APP_DOMAIN: process.env.APP_DOMAIN,
      LOGIN_USERNAME: process.env.LOGIN_USERNAME,
      LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,
      invalidemail: process.env.invalidemail,
      invalidpassword: process.env.invalidpassword,
      emailwhitespace: process.env.emailwhitespace,
      Caseemail: process.env.Caseemail,
      Button: process.env.Button,
      Button2: process.env.Button2,
    },
  }
});