import { login } from '../../support/login';

import { faker } from '@faker-js/faker';

describe('Creating automation scripts for practice', () => {
  const selectors = {
    homePlusIcon: '[data-testid="quick-actions-plus-button"]',
    newProjectOption: '[data-testid="quick-actions-new-project"]',
    projectNameInput: '[placeholder="Project Title"]',
    projectDescInput: '[placeholder="Description"]',
    projectIdInput: '[placeholder="Project ID/Number"]',
    clientNameInput: '[placeholder="Client"]',
    createProjectBtn: 'button[type="submit"]',
    projectPageProjectTitle:
      '.ProjectDetailHeader__StyledProjectTitle-sc-83ljzx-3.kwIboI.project-name',
  };
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  function generateProjectID() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.';
    const length = 10;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  it(
    'Create project from existing portfolio',
    { tags: ['@TESC-0', 'TESC-0', 'Projects', 'Portfolio'] },
    () => {
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('BUTTON'),
        Cypress.env('LOGIN_PASSWORD')
      );

      // Click on plus icon on the home page
      cy.get(selectors.homePlusIcon).click();

      // Click on "New Project option"
      cy.get(selectors.newProjectOption).click();

      // Select portfolio
      cy.get(
        '.BoardSelectMenu__BoardItemContents-sc-aholn7-6.cvVGdF.board-item-contents',
        { timeout: 25000 }
      ).should('be.visible');

      cy.wait(4000);

      // Print selected portfolio name
      let selected_portfolio;
      cy.get(
        '.BoardSelectMenu__BoardItemContents-sc-aholn7-6.cvVGdF.board-item-contents'
      )
        .first()
        .invoke('text')
        .then((text) => {
          selected_portfolio = text.trim();
          cy.log(`Selected Portfolio: ${selected_portfolio}`);
        });

      // Click on first visible portrfolio
      cy.get(
        '.BoardSelectMenu__BoardItemContents-sc-aholn7-6.cvVGdF.board-item-contents',
        { timeout: 6000 }
      )
        .first()
        .click();

      // Generating project name
      const projectName = `${faker.company.name()} Project`;

      // Type project name
      cy.get(selectors.projectNameInput).type(projectName);

      // Type project description
      cy.get(selectors.projectDescInput).type(
        'Sample Test Project Description'
      );

      const projectId = generateProjectID();

      // Type project id
      cy.get(selectors.projectIdInput).type(projectId);

      // Type project client name
      const clientName = `${faker.person.firstName()} ${faker.person.lastName()}`;

      cy.get(selectors.clientNameInput).type(clientName);

      // Click on create button
      cy.get(selectors.createProjectBtn).click();

      cy.wait(7000);

      // Valiate if the project is created using the project page
      cy.get(selectors.projectPageProjectTitle, { timeout: 10000 }).then(
        ($el) => {
          if ($el.text().includes(projectName)) {
            cy.log('\u2714 Project created successfully ');
          } else {
            cy.log('\u274C Project not created');
          }
        }
      );
    }
  );
});
