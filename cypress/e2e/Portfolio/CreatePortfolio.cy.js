import { login } from '../../support/login';

describe('Crearte New Portfolio - New Project', () => {
  const selector = {
    Addicon: '[data-testid="quick-actions-plus-button"]',
    Portfolio: '[data-testid="quick-actions-new-portfolio"]',
    PortfolioName: '.form-board-name',
    Create:
      '.AddEditBoardForm__StyledButtonRow-sc-9bmej6-4 > div > .ButtonBase-sc-1h8v6sc-0',
  };

  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  // Define an array of names
  const names = [
    'FedEx',
    'UPS',
    'DHL Express',
    'Maersk Line',
    'DB Schenker',
    'XPO Logistics',
    'C.H. Robinson',
    'J.B. Hunt Transport Services',
    'Kuehne Nagel',
    'Ryder System, Inc.',
  ];
  it('Crearte New Portfolio - New Project', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible'); // or some unique element
    cy.wait(10000);

    //click on Add Icon
    cy.get(selector.Addicon).click();

    //click new Portfolio
    cy.get(selector.Portfolio).click();

    // Pick a random name
    const randomName = names[Math.floor(Math.random() * names.length)];

    // Enter Portfolioname
    cy.get(selector.PortfolioName).click().type(randomName);

    //Click on slider Public Private
    cy.get('.slider').click();
    cy.wait(3000);

    //click on Create Button
    cy.contains('Create').click({ force: true });
    cy.wait(3000);
  });
});
