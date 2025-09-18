import { login } from '../../support/Login';

describe('Project Task - Project Create task without date', () => {
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

  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  it('should log in successfully with valid credentials Project Create task without date', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    // Perform Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    // Click on the side Menu Project Option
    cy.get(selector.Project).click({ force: true });

    // Select Project "PlayBox"
    cy.get(selector.SelectProject).should('be.visible').click({ force: true });

    cy.wait(3000);

    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    cy.wait(3000);

    // Generate short random task name like "T783"
    const randomTaskName = `T${Math.floor(Math.random() * 1000)}`;

    // Click and create task
    cy.contains('Type task', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.focused().type(`${randomTaskName}{enter}`, { force: true });
  });
});
