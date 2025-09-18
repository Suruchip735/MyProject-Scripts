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

    cy.wait(10000);

    cy.origin('https://release.party.mosaicapp.com', () => {
      const selector = {
        Task: '.react-grid-item',
        Planner: '[data-testid="planner-button"]',
        TaskDescription: '#task-description-field-0',
        planned:
          '[data-testid="undefined-schedule-schedule"] > .styles__ToggleTextWrapper-sc-1v13ara-2',
        CalanderMonth: '.CalendarMonth',
      };

      const taskNames = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
      // Select a random task name from the array
      const randomTaskName =
        taskNames[Math.floor(Math.random() * taskNames.length)];

      //click on task
      cy.wait(9000);
      cy.contains(selector.Task, 'Tasks').click();
      cy.wait(5000);
      cy.get(selector.Planner).click();

      cy.contains('Type task').click({ force: true });
      cy.get(selector.TaskDescription).click().type(randomTaskName);
      cy.wait(3000);

      //Click on Planner

      // Open the calendar
      cy.get(selector.planned).first().click();

      // Wait for calendar to render, then select a random enabled date
      cy.get(selector.CalanderMonth) // Adjust to your actual calendar container class
        .find(
          'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
        )
        .then(($days) => {
          const randomIndex = Math.floor(Math.random() * $days.length);
          cy.wrap($days[randomIndex]).click({ force: true });
        });
      cy.wait(3000);

      cy.contains('Done').click();
      cy.wait(3000);

      //Enter Task Description
      cy.get(selector.TaskDescription).click().type('{enter}');
    });
  });
});
