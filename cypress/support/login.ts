// TypeScript login utility functions

export const login = (
  email: string,
  continueButtonText: string,
  password: string
): void => {
  cy.get('input[type="email"]').clear().type(email);
  // cy.get('[data-testid="login-form-submit-button"]',continue).click();
  cy.get('[data-testid="login-form-submit-button"]').click();
  cy.get('input[type="password"]').clear().type(password);
  //cy.get('.sc-hCPjZK > .sc-cwHptR').click();
  // Click Sign In / Login button
  cy.get('[data-testid="login-form-submit-button"]', { timeout: 10000 })
    .should('be.visible')
    .click({ force: true });
};

// Alternative session-based login function (commented out)
// export function sessionLogin(username: string, buttonText: string, password: string): void {
//   cy.session([username], () => {
//     cy.visit(Cypress.env('APP_DOMAIN'));

//     cy.get('[data-testid="email"]').type(username);
//     cy.contains(buttonText).click();

//     cy.get('[data-testid="password"]').type(password);
//     cy.contains('Continue').click();

//     cy.log('Waiting for dashboard redirect');
//     cy.url({ timeout: 60000 }).should('include', '/kemmytest/home/dashboard');

//     cy.log('Checking dashboard header');
//     cy.get('[data-testid="dashboard-header"]', { timeout: 30000 }).should('be.visible');
//   });
// }
