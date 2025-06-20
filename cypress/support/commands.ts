// ***********************************************
// Custom Cypress commands with TypeScript support
// ***********************************************

// TypeScript declarations for custom commands
// The @typescript-eslint/prefer-namespace-keyword rule is disabled here because
// the `namespace` keyword is used within a `declare global` block, which is a valid
// and standard TypeScript practice for extending global types.
/* eslint-disable @typescript-eslint/no-namespace */
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
/* eslint-enable @typescript-eslint/no-namespace */

// Import login utility
import { login } from './login';

// Add custom commands
Cypress.Commands.add('login', login);

// Export to ensure this file is treated as a module
export {};
