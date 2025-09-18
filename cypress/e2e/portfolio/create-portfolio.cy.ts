import { login } from '../../support/login';

describe('Create New Portfolio - New Project', () => {
  const selector = {
    Addicon: '[data-testid="quick-actions-plus-button"]',
    Portfolio: '[data-testid="quick-actions-new-portfolio"]',
    PortfolioName: '.form-board-name',
    Create:
      '.AddEditBoardForm__StyledButtonRow-sc-9bmej6-4 > div > .ButtonBase-sc-1h8v6sc-0',
  };

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
  it('Crearte New Portfolio - New Project', { tags: ['TESC-0'] }, () => {
    // Set viewport to Full HD resolution

    //Perfom Login
    login(
      (Cypress.env('LOGIN_USERNAME') as string) || '',
      (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
      (Cypress.env('LOGIN_PASSWORD') as string) || ''
    );

    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible'); // or some unique element

    //click on Add Icon
    cy.get(selector.Addicon).click();

    //click new Portfolio
    cy.get(selector.Portfolio).click();

    // Pick a random name
    const randomName =
      names[Math.floor(Math.random() * names.length)] || 'Default Portfolio';

    // Enter Portfolioname
    cy.get(selector.PortfolioName).click().type(randomName);

    //Click on slider Public Private
    cy.get('.slider').click();

    //click on Create Button
    cy.contains('Create').click({ force: true });
  });
});
