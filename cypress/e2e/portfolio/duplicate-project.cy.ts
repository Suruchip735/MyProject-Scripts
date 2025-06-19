import { login } from '../../support/login';

describe('Project Creation Test Suite', () => {
  const selectors = {
    plusButton: '[data-testid="quick-actions-plus-button"]',
    newProjectOption: '[data-testid="quick-actions-new-project"]',
    portfolioDropdown:
      ':nth-child(4) > .BoardSelectMenu__TitleInput-sc-aholn7-3',
    projectNameInput:
      '.AddEditProjectForm__ProjectNameContainer-sc-shiuev-0 > .AddEditProjectForm__InputFieldContainer-sc-shiuev-3 > input',
    projectIdInput: '.form-project-number',
    submitButton: '.submit-button',
  };

  // Sample project name and ID pairs
  const projectNameID = [
    { key: 'Elite Arms', value: 23427.0922 },
    { key: 'test planner', value: 4522.0193 },
    { key: 'Project AB', value: 118362.091 },
    { key: 'test planner', value: 34535 },
    { key: 'Project1', value: 9340.091 },
    { key: 'Elite Arms', value: 3459.094 },
    { key: 'Copy 1 - test planner', value: 34535 },
  ];

  const randomPair = projectNameID[
    Math.floor(Math.random() * projectNameID.length)
  ] || { key: 'Default Project', value: 'default-id' };

  beforeEach(() => {
    const appDomain = (Cypress.env('APP_DOMAIN') as string) || '';
    cy.visit(appDomain);
  });
  it('Create a project with a duplicate name within the same portfolio should show error', () => {
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      (Cypress.env('LOGIN_USERNAME') as string) || '',
      (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
      (Cypress.env('LOGIN_PASSWORD') as string) || ''
    );

    // Start creating new project
    cy.wait(3500);
    cy.get(selectors.plusButton).click();

    cy.wait(3000);
    cy.get(selectors.newProjectOption).click();

    cy.wait(3000);
    cy.get(selectors.portfolioDropdown).click();

    // Enter project name and ID
    cy.get(selectors.projectNameInput).type(
      randomPair?.key || 'Default Project'
    );
    cy.get(selectors.projectIdInput).type(
      String(randomPair?.value || 'default-id')
    );

    // Submit the form
    cy.get(selectors.submitButton).click();
  });
});
