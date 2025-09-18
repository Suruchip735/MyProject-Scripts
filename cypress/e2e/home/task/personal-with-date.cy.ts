import { login } from '../../../support/login';

describe('MosaicApp Login Test', () => {
  const selector = {
    Task: '.react-grid-item',
    TaskDescription: '#task-description-field-0',
    planned:
      '[data-testid="undefined-schedule-schedule"] > .styles__ToggleTextWrapper-sc-1v13ara-2 > .SvgIcon__Svg-sc-vv99ju-0',
    CalanderMonth: '.CalendarMonth',
  };

  it(
    'should log in, create a task, and delete it if possible',
    { tags: ['TESC-0'] },
    () => {
      login(
        (Cypress.env('LOGIN_USERNAME') as string) || '',
        (Cypress.env('Button') as string) || '',
        (Cypress.env('LOGIN_PASSWORD') as string) || ''
      );

      cy.contains('Tasks').click({ force: true });

      cy.contains('Type task').click({ force: true });
      cy.get(selector.TaskDescription).click().type('Test perwithdate');

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

      const taskText = 'Test perwithdate';

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
        } else {
          cy.contains(taskText).should('not.exist');
        }
      });
    }
  );
});
