import { login } from '../../../support/login';

describe('MosaicApp Login Test', () => {
  const selector = {
    Task: '.react-grid-item',
    TaskDescription: '#task-description-field-0',
    planned:
      '[data-testid="undefined-schedule-schedule"] > .styles__ToggleTextWrapper-sc-1v13ara-2 > .SvgIcon__Svg-sc-vv99ju-0',
    CalanderMonth: '.CalendarMonth',
  };
  it(
    'should log in successfully with valid credentials Home task personal Project with date select',
    { tags: ['TESC-0'] },
    () => {
      // Set viewport to Full HD resolution

      //Perfom Login
      login(
        (Cypress.env('LOGIN_USERNAME') as string) || '',
        (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
        (Cypress.env('LOGIN_PASSWORD') as string) || ''
      );

      // cy.contains('Dashboard',{ timeout: 10000 }).should('be.visible'); // or some unique element

      cy.contains('Tasks').click();

      cy.contains('Type task').click({ force: true }); // opens/activates the input

      //Select Project and Phase
      cy.get(
        '.CreateTaskWrapper__DescriptionColumn-sc-6a5jf0-2 > .styles__TaskDescriptionAndProjectContainer-sc-1qh66b5-19 > .ProjectMenuButton__BlankContainer-sc-37y9ih-4'
      ).click();
      cy.get(
        '[style="position: absolute; left: 0px; top: 0px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4'
      ).click({ force: true });

      cy.get('.flyout-list-item-container').first().click({ force: true });

      //Click on the Task Description and click on Enter
      cy.get(selector.TaskDescription)
        .click()
        .type('Test pubwithoutdate')
        .type('{enter}');

      cy.get('.InfiniteScroller__GroupWrapper-sc-10n31g4-3')
        .first()
        .as('firstTask');

      //click on checkBox
      cy.get('@firstTask').find('input[type="checkbox"]').first().check();

      //Click on the Delete Button
      cy.contains('Delete').click();
      cy.contains('Permanently Delete').click();
    }
  );
});
