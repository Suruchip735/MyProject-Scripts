import { login } from '../../../support/login';

describe('MosaicApp Login Test', () => {
  beforeEach(() => {
    const appDomain = (Cypress.env('APP_DOMAIN') as string) || '';
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  const selector = {
    Task: '.react-grid-item',
    TaskDescription: '#task-description-field-0',
    planned:
      '[data-testid="undefined-schedule-schedule"] > .styles__ToggleTextWrapper-sc-1v13ara-2 > .SvgIcon__Svg-sc-vv99ju-0',
    CalanderMonth: '.CalendarMonth',
    delete:
      '[data-rfd-draggable-id="fb4c5edc-9c4c-47c0-a094-05d08ec06e81"] > .styles__Wrapper-sc-1mlfqv9-0 > .styles__TaskLineItem-sc-1qh66b5-18 > [data-testid="task-main-content-panel"] > .styles__TaskColumnsWrapper-sc-1qh66b5-20 > .styles__TaskContentRight-sc-1qh66b5-21 > :nth-child(4) > .styles__TaskColumnBoxHeightWrapper-sc-1qh66b5-7 > .styles__TaskBatchActionTogglePanel-sc-1qh66b5-8 > [data-testid="151377-2025-06-02-Test pubwi-select-task"] > .Checkbox__OriginalInput-sc-uli8ed-0',
  };

  it('should log in successfully with valid credentials Home task personal Project with date select', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      (Cypress.env('LOGIN_USERNAME') as string) || '',
      (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
      (Cypress.env('LOGIN_PASSWORD') as string) || ''
    );

    //click on task
    cy.wait(10000);

    cy.contains('Tasks').click();
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
    cy.get('.flyout-list-item-container').first().click({ force: true });

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
      .type('Test pubwithdate')
      .type('{enter}');

    cy.get('.InfiniteScroller__GroupWrapper-sc-10n31g4-3')
      .first()
      .as('firstTask');

    cy.wait(4000);

    cy.get('@firstTask')
      .find('input[type="checkbox"]')
      .first()
      .check({ force: true });
    cy.wait(1000);

    cy.contains('Delete').click();
    cy.wait(2000);
    cy.contains('Permanently Delete').click();
    cy.wait(2000);
  });
});
