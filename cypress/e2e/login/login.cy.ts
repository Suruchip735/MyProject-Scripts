import { login } from '../../support/login';
describe('Validate Login Functionality', () => {
  beforeEach(() => {
    const appDomain = (Cypress.env('APP_DOMAIN') as string) || '';
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  it('Validate Login with valid Credentials', () => {
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
