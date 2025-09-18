import { login } from '../../../support/login';
describe('Calendar Scenarios', () => {
  it('Home Tasks', () => {
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('BUTTON'),
      Cypress.env('LOGIN_PASSWORD')
    );
    cy.wait(3500);

    cy.get('[data-testid^="tasksWidget-personal"]').contains('Tasks').click();

    cy.get('.CreateTask__AddTaskText-sc-1v2w91q-2')
      .contains('Type task')
      .type('Pinkys Task 12311');
  });
});
