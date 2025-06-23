import { login } from '../../support/login';
describe('Validate Login Functionality', () => {
  it('Validate Login with valid Credentials', { tags: ['@TESC-0'] }, () => {
    // Intercept the API call that confirms user login
    login(
      (Cypress.env('LOGIN_USERNAME') as string) || '',
      (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
      (Cypress.env('LOGIN_PASSWORD') as string) || ''
    );

    // cy.contains('Dashboard').should('be.visible'); // or some unique element
    // cy.wait(10000);
  });
});
