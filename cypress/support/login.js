// export const login = (email, password) => {
//   cy.get('#portal-root > div.sc-kpDqfm.ijmgKS > div.auth-page > div.sc-dhKdcB.iERwvv.input-login > div > div.sc-jEACwC.sc-gFAWRd.hrQzXm.foSTmz > input').clear().type(email);
//   cy.get('input[name="password"]').clear().type(password);
//   //cy.get('button[type="submit"]').click();
// };
export const login = (email, continueButtonText,password) => {
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

// export function login(username, buttonText, password) {
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
