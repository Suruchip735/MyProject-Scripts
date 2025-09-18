/// referencee
import { login } from '../../../support/login';
describe('Check if creating existing projects fail', () => {
  const selector = {
    plusBtn: '[data-testid="quick-actions-plus-button"]',
    newProjectOption: '[data-testid="quick-actions-new-project"]',
    //        admPortfolio:'.BoardSelectMenu__StyledBody-sc-aholn7-5 > :nth-child(5)',
    projectNameField:
      '.AddEditProjectForm__ProjectNameContainer-sc-shiuev-0 > .AddEditProjectForm__InputFieldContainer-sc-shiuev-3 > input',
    projectDescField: '.form-project-description',
    projectIDField: '.form-project-number',
    projectClientField: '.client-input',
    createPrjBtn: '.submit-button',
  };

  it(
    'Check if creating existing projects fail',
    { tags: ['@TESC-0', 'TESC-1234', 'Projects', 'Portfolio'] },
    () => {
      // Perform Login
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'),
        Cypress.env('LOGIN_PASSWORD')
      );

      cy.get(selector.plusBtn).click();
      cy.wait(3000);

      //click on new project option
      cy.get(selector.newProjectOption).click();
      //cy.get().click(selector.newProjectOption).click()
      cy.wait(3000);

      //Select "Ädmin Portfolio" from the available portfolios
      cy.get('.BoardSelectMenu__StyledBody-sc-aholn7-5')
        .find('.BoardSelectMenu__BoardItemContents-sc-aholn7-6')
        .contains('Admin Portfolio')
        .click();

      //Type project name
      cy.get(selector.projectNameField).type('Project A1');

      //Type project description
      cy.get(selector.projectDescField).type('testing');

      // Type projct ID / number
      cy.get(selector.projectIDField).type('123');

      //Type client name
      cy.get(selector.projectClientField).type('111');

      //Click on create button
      cy.get(selector.createPrjBtn).click();

      cy.log(
        'You cannot create project with same title and numnber as an existing projects on this board'
      );
      cy.wait(2000);
    }
  );
});
