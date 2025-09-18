import { faker } from '@faker-js/faker';
import { login } from '../../../support/login';

describe('Creating automation scripts for practice', () => {
  const selectors = {
    homePlusIcon: '[data-testid="quick-actions-plus-button"]',
    newProjectOption: '[data-testid="quick-actions-new-project"]',
    newPortfolioOption:
      '.BoardCreateButton__StyledBoardCreateButton-sc-11v1r1o-1',
    newPortfolionameInput: '.form-board-name',
    createPortfolioBtn:
      '.AddEditBoardForm__StyledButtonRow-sc-9bmej6-4 > div > .ButtonBase-sc-19vaecp-0',
    portfoliosListClass:
      '.BoardSelectMenu__BoardItemContents-sc-aholn7-6.cvVGdF.board-item-contents',
    projectNameInput: '[placeholder="Project Title"]',
    projectDescInput: '[placeholder="Description"]',
    projectIdInput: '[placeholder="Project ID/Number"]',
    clientNameInput: '[placeholder="Client"]',
    createProjectBtn: 'button[type="submit"]',
    projectPageProjectTitle:
      '.ProjectDetailHeader__StyledProjectTitle-sc-83ljzx-3.kwIboI.project-name',
  };

  function generateProjectID() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.';
    const length = 10;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  it('Create a new project in new portfolio using the plus icon', () => {
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('BUTTON'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Click on plus icon on the home page
    cy.get(selectors.homePlusIcon).click();

    // Click on new project
    cy.get(selectors.newProjectOption).click();

    // Click on new portfolio
    cy.get(selectors.newPortfolioOption).click();

    // Generating new portfolio name
    const newPortfolio = faker.company.name();
    const newPortfolioName = `${newPortfolio} Portfolio`;

    // Generating new Project Name
    const newProjectName = `${newPortfolio} Project`;

    // Type new portfolio name
    cy.get(selectors.newPortfolionameInput).type(newPortfolioName);

    // Click on create button
    cy.get(selectors.createPortfolioBtn).click();

    cy.wait(1);
    cy.get('.BoardSelectMenu__StyledHeader-sc-aholn7-4').should('be.visible', {
      timeout: 20000,
    }); // waits up to 20 seconds

    cy.wait(18000);

    // Select the entered portfolio
    cy.get(selectors.portfoliosListClass).first().click();

    // Type project name
    cy.get(selectors.projectNameInput).type(newProjectName);

    // Type Project description
    cy.get(selectors.projectDescInput).type('Sample project description');

    const projectId = generateProjectID();

    // Type Project ID
    cy.get(selectors.projectIdInput).type(projectId);

    // Type project lient name
    const clientName = `${faker.person.firstName()} ${faker.person.lastName()}`;

    cy.get(selectors.clientNameInput).type(clientName);

    // Click on Create button
    cy.get(selectors.createProjectBtn).click();

    cy.wait(7000);

    // Validate if the project is created using the project page
    cy.get(selectors.projectPageProjectTitle, { timeout: 10000 }).then(
      ($el) => {
        if ($el.text().includes(newProjectName)) {
          cy.log('\u2714 Project created successfully ');
        } else {
          cy.log('\u274C Project not created');
        }
      }
    );
  });
});
