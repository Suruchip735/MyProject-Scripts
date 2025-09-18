import { login } from '../../../support/login';

describe('MosaicApp Login Test', () => {
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });
  it('should log in successfully with valid credentials Home task personal Project with date select', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.origin('https://release.party.mosaicapp.com', () => {
      const selector = {
        Task: '.react-grid-item',
        TaskDescription: '#task-description-field-0',
        planned:
          '[data-testid="undefined-schedule-schedule"] > .styles__ToggleTextWrapper-sc-1v13ara-2 > .SvgIcon__Svg-sc-vv99ju-0',
        CalanderMonth: '.CalendarMonth',
      };

      const taskNames = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
      // Select a random task name from the array
      const randomTaskName =
        taskNames[Math.floor(Math.random() * taskNames.length)];

      //click on task
      cy.wait(10000);

      cy.contains(selector.Task, 'Tasks').click();
      cy.wait(5000);

      cy.contains('Type task').click({ force: true }); // opens/activates the input

      //select Project and Phase
      cy.get(
        '.CreateTaskWrapper__DescriptionColumn-sc-6a5jf0-2 > .styles__TaskDescriptionAndProjectContainer-sc-1qh66b5-19 > .ProjectMenuButton__BlankContainer-sc-37y9ih-4'
      ).click();
      cy.get(
        '[style="position: absolute; left: 0px; top: 0px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4'
      ).click({ force: true });
      // Click on "Select Project" dropdown first (if not already open)
      cy.get('.flyout-list-item-container').first().click({ focus: true });

      //  Open the calendar
      cy.get(selector.planned).first().click();

      // Step 2: Wait for calendar to render, then select a random enabled date
      cy.get(selector.CalanderMonth) // Adjust to your actual calendar container class
        .find(
          'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
        )
        .then(($days) => {
          const randomIndex = Math.floor(Math.random() * $days.length);
          cy.wrap($days[randomIndex]).click({ force: true });
        });
      cy.contains('Done').click();

      //click on task description and enter
      cy.get(selector.TaskDescription)
        .click()
        .type(randomTaskName)
        .type('{enter}');

      cy.get('.InfiniteScroller__GroupWrapper-sc-10n31g4-3')
        .first()
        .as('firstTask');

      cy.wait(1000);

      cy.get('@firstTask')
        .find('input[type="checkbox"]')
        .first()
        .check({ force: true });
      cy.wait(1000);

      cy.contains('Delete').click();
      cy.wait(1000);
      cy.contains('Permanently Delete').click();
      cy.wait(1000);
    });
  });
});
