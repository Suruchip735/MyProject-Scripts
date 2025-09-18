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
    // env: {
    //   APP_DOMAIN: "https://dashboard.dev.mygrowdash.com",
    //   LOGIN_USERNAME: 'kreative@mygrowdash.com',
    //   LOGIN_PASSWORD: 'noaccess2025',
    //   invalidemail: 'nikita@yopmail.com',
    //   invalidpassword: 'Test@1233',
    //   emailwhitespace: 'kreative@mygrowdash.com ',
    //   Caseemail: 'KREATIVE@mygrowdash.com',
    // },
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