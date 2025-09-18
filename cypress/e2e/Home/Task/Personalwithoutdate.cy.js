import { login } from '../../../support/login';

describe('MosaicApp Login Test', () => {
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  it('should log in successfully with valid credentials Home task personal Project without date select', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    // cy.contains('Dashboard', { timeout: 10000 }).should('be.visible'); // or some unique element
    cy.wait(10000);

    const selector = {
      Task: '.react-grid-item',
      TaskDescription: '#task-description-field-0',
      planned:
        '[data-testid="undefined-schedule-schedule"] > .styles__ToggleTextWrapper-sc-1v13ara-2 > .SvgIcon__Svg-sc-vv99ju-0',
      CalanderMonth: '.CalendarMonth',
    };

    //click on task
    cy.wait(9000);
    cy.contains('Tasks').click();
    cy.wait(5000);

    // opens/activates the input
    cy.contains('Type task').click({ force: true });

    //Enter task name
    cy.get(selector.TaskDescription)
      .click()
      .type('Test perwithoutdate')
      .type('{enter}');
    cy.wait(2000);

    cy.get('.InfiniteScroller__GroupWrapper-sc-10n31g4-3')
      .first()
      .as('firstTask');

    cy.get('@firstTask')
      .find('input[type="checkbox"]')
      .first()
      .check({ force: true });

    cy.contains('Delete').click();
    cy.wait(3000);
    cy.contains('Permanently Delete').click();
    cy.wait(3000);

    // ✅ Check if an error message is shown
    cy.get('body').then(($body) => {
      if ($body.text().includes('Something went wrong')) {
        throw new Error(
          'Task deletion failed: "Something went wrong" appeared.'
        );
      }
    });
  });
});
