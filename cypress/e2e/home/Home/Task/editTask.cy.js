import { login } from '../../../../support/login'

describe('MosaicApp Login Test', () => {

  it('should log in successfully with valid credentials and update Home task with date selection', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    // Perform Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

      const selector = {
        Task: '.react-grid-item',
        TaskDescription: '#task-description-field-0',
        planned:
          '[data-testid*="-schedule-schedule"], .styles__TaskCalendarToggle-sc-1v13ara-4.hPjdGs',
        CalanderMonth: '.CalendarMonth',
      };

      const taskNames = [
        'Tasking 1',
        'Tasking 2',
        'Tasking 3',
        'Tasking 4',
        'Tasking 5',
      ];
      const randomTaskName =
        taskNames[Math.floor(Math.random() * taskNames.length)];


      // Click on a section labeled "Tasks"
      cy.contains(selector.Task, 'Tasks').click();

      // Select a random task container
      cy.get('.task-wrapper-draggable-container.app-cues-tasks').then(
        ($items) => {
          const randomIndex = Math.floor(Math.random() * $items.length);
          const randomItem = $items[randomIndex];

          // Click the task to open it (if needed)
          cy.wrap(randomItem).click();

          // Find an editable field inside and type the new name
          cy.wrap(randomItem).within(() => {
            // Adjust this selector based on your actual input field inside the task
            cy.get('input, [contenteditable="true"], textarea')
              .first()
              .clear()
              .type(randomTaskName);
          });

          cy.wrap(randomItem).as('selectedTask');
        }
      );

      // Open calendar
      // Inside the selected task, find and click the schedule button
      cy.get('@selectedTask').within(() => {
        cy.get(selector.planned).first().click();
      });

      // Wait for calendar and pick a date
      cy.get('.CalendarMonth').should('be.visible');

      cy.get('.CalendarMonth')
        .find(
          'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
        )
        .then(($days) => {
          const randomIndex = Math.floor(Math.random() * $days.length);
          const selectedDate = $days[randomIndex];
          cy.log('Selected date:', selectedDate.innerText);

          cy.wrap(selectedDate)
            .scrollIntoView()
            .click({ force: true });
        });

      // Confirm
      cy.contains('Done').should('be.visible').click({ force: true });

      // Submit the updated task name
      cy.get('@selectedTask').click().type('{enter}');
    });
  });
