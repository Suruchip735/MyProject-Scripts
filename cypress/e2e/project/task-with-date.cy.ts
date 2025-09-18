import { login } from '../../support/login';

describe('Project Task- Project Create task with date', () => {
  const selector = {
    Project:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    SelectProject: '[data-testid="My Projects"]',
    Task: '[href="/flagon/members/members/views/member/13064/view/tasks"]',
    TaskDescription: '#task-description-field-ungrouped',
    collapseAll: '[data-testid="collapse-all"]',
    planned:
      '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 62px; height: 62px; margin: 0px;"] > .schedule_start > .styles__StyledNewDependencyDateRangeCalendar-sc-1qh66b5-4 > [style="width: 100%; height: 100%;"] > .styles__TaskCalendarToggle-sc-1v13ara-4 > .styles__ToggleTextWrapper-sc-1v13ara-2 > .SvgIcon__Svg-sc-vv99ju-0',
    CalanderMonth: '.CalendarMonth',
    FirstProject:
      '.filter-list-item-container > [style="position: absolute; left: 0px; top: 120px; height: 50px; width: calc(100% + 0px); padding-left: 24px; display: flex; align-items: center; outline: none;"]',
  };

  it('should log in successfully with valid credentials Project Create task with date select', () => {
    // Set viewport to Full HD resolution

    // Perform Login
    login(
      (Cypress.env('LOGIN_USERNAME') as string) || '',
      (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
      (Cypress.env('LOGIN_PASSWORD') as string) || ''
    );

    // Click on the side Menu Project Option
    cy.get(selector.Project).click({ force: true });

    cy.get(selector.SelectProject).click({ force: true });

    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    cy.get("[id='tasks-tab']").click({ force: true });

    // Enter task name
    cy.contains('Type task', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    // Click on Planner
    cy.get(selector.planned).click({ force: true });

    cy.get(selector.CalanderMonth)
      .find(
        'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
      )
      .then(($days) => {
        const randomIndex = Math.floor(Math.random() * $days.length);
        cy.wrap($days[randomIndex]).click({ force: true });
      });

    cy.contains('Done').click();

    cy.get('.styles__ContentEditable-sc-1x862sm-13.cVboZc.creating').as(
      'firstTask'
    );

    // // Generate and type short random task name
    // const randomTaskName = `T${Math.floor(Math.random() * 1000)}`;
    // cy.get('@firstTask').type(randomTaskName, { force: true }, '{enter}');

    // Generate and type short random task name
    const randomTaskName = `T${Math.floor(Math.random() * 1000)}`;
    cy.get('@firstTask').type(`${randomTaskName}{enter}`, { force: true });
  });
});
