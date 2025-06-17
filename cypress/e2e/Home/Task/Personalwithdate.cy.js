import { login } from '../../../support/login';

describe('MosaicApp Login Test', () => {
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    cy.visit(appDomain);
  });

  const selector = {
    Task: '.react-grid-item',
    TaskDescription: '#task-description-field-0',
    planned:
      '[data-testid="undefined-schedule-schedule"] > .styles__ToggleTextWrapper-sc-1v13ara-2 > .SvgIcon__Svg-sc-vv99ju-0',
    CalanderMonth: '.CalendarMonth',
  };

  it('should log in, create a task, and delete it if possible', () => {
    cy.viewport(1920, 1080);

    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(9000);
    cy.contains('Tasks').click({ force: true });
    cy.wait(5000);

    cy.contains('Type task').click({ force: true });
    cy.get(selector.TaskDescription).click().type('Test perwithdate');
    cy.wait(3000);

    cy.get(selector.planned).first().click();

    cy.get(selector.CalanderMonth)
      .find(
        'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
      )
      .then(($days) => {
        const randomIndex = Math.floor(Math.random() * $days.length);
        cy.wrap($days[randomIndex]).click({ force: true });
      });

    cy.contains('Done').click();
    cy.get(selector.TaskDescription).click().type('{enter}');
    cy.wait(2000);

    const taskText = 'Test perwithdate';

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
      } else {
        cy.contains(taskText).should('not.exist');
      }
    });
  });
});
