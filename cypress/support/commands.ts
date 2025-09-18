// ***********************************************
// Custom Cypress commands with TypeScript support
// ***********************************************

// TypeScript declarations for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom login command
       * @param email - User email
       * @param continueButtonText - Text for continue button
       * @param password - User password
       */
      login(
        email: string,
        continueButtonText: string,
        password: string
      ): Chainable<void>;
    }
  }
}

// Import login utility
import { login } from './login';

// Add custom commands
Cypress.Commands.add('login', login);

// Export to ensure this file is treated as a module
export {};
