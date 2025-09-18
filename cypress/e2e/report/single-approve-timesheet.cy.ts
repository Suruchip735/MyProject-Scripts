import { login } from '../../support/login';

describe('Report Timesheet - Approve Single Time sheet', () => {
  const selector = {
    Timesheet: '[data-testid="report-Timesheets"]',
    Modify: '.styles__StyledDropdownToggle-sc-194g64u-50',
    Approve:
      '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 372px; height: 62px; margin: 0px;"] > .approver > .styles__StatusContainer-sc-194g64u-37 > .dropdown > .ApproverCell__StyledDropdownMenu-sc-1rdtvyr-2 > :nth-child(1) > .ApproverCell__DropdownOption-sc-1rdtvyr-3',
  };

  it(
    'Timesheet Report approve single Time sheet',
    { tags: ['@TESC-0'] },
    () => {
      // Set viewport to Full HD resolution

      //Perfom Login
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
        Cypress.env('LOGIN_PASSWORD')
      );

      //click on home work plan
      cy.contains('Report').click();

      //click on time sheet
      cy.get(selector.Timesheet).click();

      //scroll Table
      cy.get('.styles__StyledTimesheetTableWrapper-sc-194g64u-79') // scrollable table container
        .scrollTo('right', { duration: 1000 }); // smooth scroll

      //click random Approve button
      cy.get('.styles__StyledTimesheetTableWrapper-sc-194g64u-79')
        .find('button')
        .contains('Approve')
        .then(($buttons) => {
          const randomIndex = Math.floor(Math.random() * $buttons.length);
          cy.wrap($buttons[randomIndex]).click({ force: true });
        });

      //click on Approve
      cy.get(selector.Approve).click({ force: true });
    }
  );
});
