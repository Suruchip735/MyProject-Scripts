import { login } from '../../../support/login';

describe('MosaicApp Login Test', () => {
  it('should log in successfully and update or create Home task with date selection', () => {
    cy.viewport(1920, 1080); //Set screen resolution and orientation 

    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    const selector = {
      Task: '.react-grid-item', 
      TaskDescription: '#task-description-field-0',
      planned:
        '[data-testid*="-schedule-schedule"], .styles__TaskCalendarToggle-sc-1v13ara-4.hPjdGs',
      CalendarMonth: '.CalendarMonth',
      TaskContainer: '.styles__TaskDescriptionSpan-sc-1x862sm-8.fALSQy',
    };
    //Array for task description while adding new task  
    const taskNames = [
      'Tasking 1',
      'Tasking 2',
      'Tasking 3',
      'Tasking 4',
      'Tasking 5',
    ];

    //Array for task description while editing existing tasks   
    const editNames = [
      'Edit Task 1',
      'Edit Task 2',
      'Edit Task 3',
      'Edit Task 4',
      'Edit Task 5',
    ];

    //Loop to select random task name while adding new task 
    const randomTaskName =
      taskNames[Math.floor(Math.random() * taskNames.length)] ||
      'Default Task Name';

      //Loop to select random task name while editing a task 
    const editTaskName =
      editNames[Math.floor(Math.random() * editNames.length)] ||
      'Default Task Name';

    // Go to Tasks section from Home page
    cy.get(selector.Task).click();

    cy.wait(3000); // Wait for tasks to load

    // Check if any tasks exists 
    cy.get('body').then(($body) => {
      if ($body.find(selector.TaskContainer).length > 0) {
        // === Edit the first existing task ===
        cy.get(selector.TaskContainer).first().as('existingTask');

        cy.get('@existingTask').click();

        // If a tasks exists then clear and type new task name
        cy.get('[contenteditable="true"]')
          .first()
          .clear()
          .type(editTaskName)
          .type('{enter}');

        // Open calendar and pick update date
        cy.get(selector.planned).first().click();

        cy.get(selector.CalendarMonth)
          .should('be.visible')
          .find(
            'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
          )
          .then(($days) => {
            const randomDateIndex = Math.floor(Math.random() * $days.length);
            cy.wrap($days[randomDateIndex]).click({ force: true });
            cy.contains('Done').click({ force: true });
          });

        cy.log('Edited first existing task');
      } else {
        // === Create a new task if no tasks exists===
        cy.contains('Type task').click({ force: true });

        // Enter task name
        cy.get(selector.TaskDescription)
          .click()
          .type(randomTaskName)
          .type('{enter}');

        cy.wait(1000); // Wait for task to be added (optional depending on app speed)

        // Now edit the newly created task
        cy.get(selector.TaskContainer).first().as('newTask');
        cy.get('@newTask').click();

        cy.get('[contenteditable="true"]')
          .first()
          .clear()
          .type(randomTaskName)
          .type('{enter}');

        // Open calendar and pick a date
        cy.get(selector.planned).first().click();

        cy.get(selector.CalendarMonth)
          .should('be.visible')
          .find(
            'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
          )
          .then(($days) => {
            const randomDateIndex = Math.floor(Math.random() * $days.length);
            cy.wrap($days[randomDateIndex]).click({ force: true });
            cy.contains('Done').click({ force: true });
          });

        cy.log('Created and edited new task');
      }
    });
  });
});
