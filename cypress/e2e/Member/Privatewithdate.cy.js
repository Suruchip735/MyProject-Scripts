import { login } from '../../support/login';

describe('Member Task - Create Task Private Project with date', () => {
  const selector = {
    Member:
      '[data-testid="sidemenu-members"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    MemberModle:
      '[style="position: absolute; left: 0px; top: 0px; height: 220px; width: 100%;"] > .List__Measurer-sc-a4fq5c-0 > .styles__MemberCardsSection-sc-19kekps-2 > :nth-child(1) > .TeamMemberCard__StyledMemberInfoContainer-sc-5z8fu4-1',
    Task: '[href="/flagon/members/members/views/member/13064/view/tasks"]',
    TaskDescription: '#task-description-field-ungrouped',
    planned:
      '.styles__StyledTableRow-sc-bgjgwa-1.active > .schedule_start > .styles__TaskColumnBox-sc-1qh66b5-6 > .styles__TaskColumnBoxHeightWrapper-sc-1qh66b5-7 > .styles__StyledNewDependencyDateRangeCalendar-sc-1qh66b5-4 > [style="width: 100%; height: 100%;"] > .styles__TaskCalendarToggle-sc-1v13ara-4',
    CalanderMonth: '.CalendarMonth',
  };

  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });
  it('should log in successfully with valid credentials member create task Private Project with date select', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible'); // or some unique element
    cy.wait(10000);

    //Click on side menu Member option
    cy.get(selector.Member, { timeout: 15000 })
      .should('be.visible')
      .click({ force: true });

    //select member Modle
    cy.get(selector.MemberModle).click({ force: true });

    //click on the task
    cy.get(selector.Task, { timeout: 10000 }).click();
    cy.contains('Type task').click({ force: true }); // opens/activates the input

    //click on the select Project and Phase
    cy.get(
      '.styles__TaskMainContentPanel-sc-1qh66b5-3 > .styles__TaskDescriptionAndProjectContainer-sc-1qh66b5-19 > .ProjectMenuButton__BlankContainer-sc-37y9ih-4'
    ).click();
    //click on select project text
    cy.get(
      '[style="position: absolute; left: 0px; top: 0px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4'
    ).click({ force: true });
    //select project in drop down
    //cy.get('[style="position: absolute; left: 0px; top: 0px; height: 64px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1 > .PhaseItemRow__MiddleRow-sc-1jx574o-4 > .EllipsisText__Text-sc-uxsaoy-0').click({Force:true});
    //cy.get('[style="position: absolute; left: 0px; top: 0px; height: 64px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1 > .PhaseItemRow__MiddleRow-sc-1jx574o-4')
    cy.contains('P-6334').click({ force: true });
    // Open the calendar
    cy.get(selector.planned).first().click({ force: true });

    // Wait for calendar to render, then select a random enabled date
    cy.get(selector.CalanderMonth) // Adjust to your actual calendar container class
      .find(
        'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
      )
      .then(($days) => {
        const randomIndex = Math.floor(Math.random() * $days.length);
        cy.wrap($days[randomIndex]).click({ force: true });
      });
    cy.contains('Done').click();
    // cy.get('#task-description-field-0').click().type('{enter}');

    //click on task Description and Enter
    cy.get(selector.TaskDescription)
      .click({ force: true })
      .type('Test org')
      .type('{enter}');
  });
});
