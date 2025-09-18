import { login } from '../../../support/login';

describe('Create task without dates in private project', () => {
  it(
    'should log in successfully with valid credentials Home task personal Project without date select',
    { tags: ['@TESC-5341'] },
    () => {
      // Set viewport to Full HD resolution

      //Perfom Login
     login(
           Cypress.env('LOGIN_USERNAME'),
           Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
           Cypress.env('LOGIN_PASSWORD')
         );

      // cy.contains('Dashboard', { timeout: 10000 }).should('be.visible'); // or some unique element

      const selector = {
        Task: '.react-grid-item',
        TaskDescription: '#task-description-field-0',
        planned:
          '[data-testid="undefined-schedule-schedule"] > .styles__ToggleTextWrapper-sc-1v13ara-2 > .SvgIcon__Svg-sc-vv99ju-0',
        CalanderMonth: '.CalendarMonth',
      };

      //click on task
      cy.contains('Tasks').click();

      // opens/activates the input
      cy.contains('Type task').click({ force: true });

      //Enter task name
      cy.get(selector.TaskDescription)
        .click()
        .type('Test perwithoutdate')
        .type('{enter}');

      cy.get('.InfiniteScroller__GroupWrapper-sc-10n31g4-3')
        .first()
        .as('firstTask');

      cy.get('@firstTask').find('input[type="checkbox"]').first().check();

      cy.contains('Delete').click();
      cy.contains('Permanently Delete').click();

      // ✅ Check if an error message is shown
      cy.get('body').then(($body) => {
        if ($body.text().includes('Something went wrong')) {
          throw new Error(
            'Task deletion failed: "Something went wrong" appeared.'
          );
        }
      });
    }
  );
});






