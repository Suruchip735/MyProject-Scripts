import { login } from '../../../support/login';

describe('Home - Planner - Edit Task ', () => {
  const selector = {
    Task: '.react-grid-item',
    TaskDescription: '.styles__TaskDescription-sc-1x862sm-2.bYaFmO',
    planned: '.styles__ToggleTextWrapper-sc-1v13ara-2',
    CalendarMonth: '.CalendarMonth',
    tasksWidget:
      '[data-testid="tasksWidget-personal-13064"] > .DashboardWidget__WidgetHeader-sc-bc3fh8-1 > .DashboardWidget__StyledHeader-sc-bc3fh8-2',
    plannerBtn: '[data-testid="planner-button"]',
    TaskContainer: '.styles__TaskDescriptionSpan-sc-1x862sm-8.fALSQy',
    taskContainer1:
      '.InfiniteScroller__InfiniteScrollDroppableContainer-sc-10n31g4-5',
  };

  //Define task names for creating and editing tasks
  const taskNames = [
    'Tasking 1',
    'Tasking 2',
    'Tasking 3',
    'Tasking 4',
    'Tasking 5',
  ];

  //Define task names for editing tasks
  const editTasks = [
    'Editing task 1',
    'Editing task 2',
    'Editing task 3',
    'Editing task 4',
    'Editing task 5',
  ];

  //Generate randome task names for creating and editing tasks
  const randomTaskName =
    taskNames[Math.floor(Math.random() * taskNames.length)] ||
    'Default Task Name';

  // Generate random edit task name
  const editTaskName =
    editTasks[Math.floor(Math.random() * editTasks.length)] ||
    'Default Task Name';

  it('Home - Planner - Edit task ', { tags: ['@TESC-3458'] }, () => {
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('BUTTON'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(3500);
    //Click on Task widget
    cy.get(
      '[data-testid="tasksWidget-personal-13064"] > .DashboardWidget__WidgetHeader-sc-bc3fh8-1 > .DashboardWidget__StyledHeader-sc-bc3fh8-2 > .title-container > .title'
    ).click();
    //cy.get(selector.tasksWidget).click();

    //Click on planner button
    cy.wait(3000);
    cy.get(selector.plannerBtn).click();
    cy.wait(3000);

    //Check for existing tasks
    cy.get('body').then(($body) => {
      if ($body.find(selector.taskContainer1).length > 0) {
        //Editing first task in container
        cy.get(selector.taskContainer1)
          .first()
          .as('existingTask')
          .children()
          .first()
          .find(selector.TaskDescription)
          .first();

        cy.get('@existingTask').click({ force: true });

        cy.get('[contenteditable="true"]')
          .first()
          .clear({ force: true })
          .type(editTaskName, { force: true });
        //  .type('{enter}');

        // Open calendar and pick a date
        cy.get(selector.planned).first().click({ force: true });

        cy.get(selector.CalendarMonth)
          .find(
            'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
          )
          .then(($days) => {
            const randomDateIndex = Math.floor(Math.random() * $days.length);
            cy.wrap($days[randomDateIndex]).click({ force: true });
            cy.contains('Done').click({ force: true });
          });
      } else {
        // === Create a new task ===
        cy.contains('Type task').click({ force: true });
      }
    });
  });

  /*
      cy.get('.InfiniteScroller__InfiniteScrollDroppableContainer-sc-10n31g4-5')
        .children()
        .first()
        .find(
          '[data-testid="26692-2024-10-01-Edit Task -task"] > .styles__NoneditTaskDescriptionWrapper-sc-1x862sm-7'
        ) 
        .click();
        */
});
