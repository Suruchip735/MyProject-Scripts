import { login } from '../../support/login';

describe('Member Task - Create Task Private Project without date', () => {
  const selector = {
    Member:
      '[data-testid="sidemenu-members"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    MemberModle: '.team-member-card',
    Task: 'a[href="/flagon/members/members/views/member/26271/view/tasks"]',
    TaskDescription: '#task-description-field-ungrouped',
    planned:
      '.styles__StyledTableRow-sc-bgjgwa-1.active > .schedule_start > .styles__TaskColumnBox-sc-1qh66b5-6 > .styles__TaskColumnBoxHeightWrapper-sc-1qh66b5-7 > .styles__StyledNewDependencyDateRangeCalendar-sc-1qh66b5-4 > [style="width: 100%; height: 100%;"] > .styles__TaskCalendarToggle-sc-1v13ara-4',
    CalanderMonth: '.CalendarMonth',
  };

  const taskNames = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
  // Select a random task name from the array
  const randomTaskName: string =
    taskNames[Math.floor(Math.random() * taskNames.length)] || 'Default Task';
  beforeEach(() => {
    const appDomain = (Cypress.env('APP_DOMAIN') as string) || '';
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });
  it('should log in successfully with valid credentials Member task Private Project without date select', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      (Cypress.env('LOGIN_USERNAME') as string) || '',
      (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
      (Cypress.env('LOGIN_PASSWORD') as string) || ''
    );

    cy.wait(10000);

    //Click on side menu Member option
    cy.get(selector.Member, { timeout: 1000 }).click({ force: true });

    //select member Modle
    cy.get(selector.MemberModle).first().click({ force: true });

    //click on the task
    cy.wait(9000);
    cy.contains('Tasks').click();
    cy.wait(5000);

    cy.contains('Type task').click({ force: true });
    cy.wait(3000);
    //click on the select Project and Phase
    cy.get(
      '.styles__TaskMainContentPanel-sc-1qh66b5-3 > .styles__TaskDescriptionAndProjectContainer-sc-1qh66b5-19 > .ProjectMenuButton__BlankContainer-sc-37y9ih-4'
    ).click({ force: true });
    //click on select project text
    cy.get(
      '[style="position: absolute; left: 0px; top: 0px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4'
    ).click({ force: true });
    //select project in drop down
    cy.get(
      '.PhaseItemRow__BaseRow-sc-1jx574o-2.PhaseItemRow__MiddleRow-sc-1jx574o-4.diTXPr.fWQxWc'
    )
      .first()
      .click({ force: true });
    cy.wait(3000);

    // Open the calendar
    cy.get(selector.planned).first().click();

    // Wait for calendar to render, then select a random enabled date
    // cy.get('td.CalendarDay[role="button"][aria-disabled="false"]') // Only active dates
    //   .should('be.visible')
    //   .then(($dates) => {
    //     const randomIndex = Math.floor(Math.random() * $dates.length);
    //     cy.wrap($dates[randomIndex]).click();
    //   });

    // Step 1: Click the "More Options" button
    cy.get('div.styles__SetRangeButton-sc-5z27h7-26')
      .contains('More Options')
      .click();

    // Wait for the calendar to appear
    cy.get(
      'div.NewDependencyDateRangeCalendar__CalendarInputContainer-sc-si16xr-0',
      { timeout: 10000 }
    ).should('be.visible');

    // Step 3: Select the end date (3 days after today)
    cy.get('td.CalendarDay[role="button"][aria-disabled="false"]')
      .should('be.visible')
      .then(() => {
        // Convert today's date to a format
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 3); // Add 3 days to today

        // Format both the current date and the end date as string to match calendar date format
        const todayString = today.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const endDateString = endDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        let startFound = false;
        let endFound = false;

        // Loop through all calendar days to find the corresponding start and end date
        cy.get('td.CalendarDay[role="button"][aria-label]').each(($el) => {
          const label = $el.attr('aria-label');

          // If it's today's date, select it
          if (label && label.includes(todayString) && !startFound) {
            cy.wrap($el).click();
            startFound = true;
          }

          // If it's the end date (3 days later), select it
          if (label && label.includes(endDateString) && !endFound) {
            cy.wrap($el).click();
            endFound = true;
          }

          // Break out of loop if both dates are found
          if (startFound && endFound) {
            return false;
          }
        });

        // Optionally, you can click "Done" or "Save" if applicable
        cy.get('button.styles__DoneButton-sc-5z27h7-21').click();
        cy.wait(3000);
      });

    //cy.get('#task-description-field-0').click().type('{enter}');

    //click on task Description and Enter
    cy.get(selector.TaskDescription)
      .click({ force: true })
      .type(randomTaskName)
      .type('{enter}');
  });
});
