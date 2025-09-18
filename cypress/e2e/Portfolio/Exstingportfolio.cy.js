import { login } from '../../support/Login';

describe('Exsting Portfolio - Create New Project', () => {
  const selector = {
    Addicon: '[data-testid="quick-actions-plus-button"]',
    Project: '[data-testid="quick-actions-new-project"]',
    SelectPortfolio:
      '.BoardSelectMenu__BoardItemContents-sc-aholn7-6.cvVGdF.board-item-contents',
  };

  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  it('Create New Project Exsting Portfolio ', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    // Perform Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // Button text like "Continue"
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    // Dynamically generate prefixes PA to PZ
    const prefixes = Array.from(
      { length: 26 },
      (_, i) => `P${String.fromCharCode(65 + i)}`
    );
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNumber = Math.floor(100 + Math.random() * 900); // 3-digit number

    const shortName = `${randomPrefix}-${randomNumber}`; // Example: "PR-457"

    // Click on Add Icon
    cy.get(selector.Addicon).click();
    cy.wait(3000);

    cy.get(selector.Project).click();
    cy.wait(3000);

    // Fill the form
    cy.get(selector.SelectPortfolio).first().click();
    cy.wait(3000);

    cy.get('.form-project-title').click().type(shortName); // Using as project name
    cy.get('.form-project-description').click().type('This is for testing');
    cy.get('.form-project-number').click().type(shortName); // Using same as project number
    cy.get('.client-input').click().type('55555').type('{enter}');
    cy.get('.Checkbox__OriginalInput-sc-uli8ed-0.cUieaw').first().click();
    cy.get('button.submit-button').click();
    cy.wait(5000);
  });
});
