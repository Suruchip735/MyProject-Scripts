import { login } from '../../support/login';

describe('Report Timesheet - Approve Multiple Time sheet using modify', () => {
  const selector = {
    Timesheet: '[data-testid="report-Timesheets"]',
    Modify: '.styles__StyledDropdownToggle-sc-194g64u-50',
    Approve:
      '.styles__StyledDropdownMenu-sc-194g64u-45 > :nth-child(1) > .styles__StyledInnerDropdownItem-sc-194g64u-55',
  };

  it(
    'Timesheet Report approve Multiple Time sheet',
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

      //select multiple
      cy.get('.styles__StyledSelectCell-sc-194g64u-39') // assuming each checkbox is inside this class
        .each(($cell, index) => {
          if (index < 5) {
            // check the first 3 checkboxes for example
            cy.wrap($cell).click({ force: true });
          }
        });

      //click on modify
      cy.get(selector.Modify).click();

      cy.get(selector.Approve).click();
    }
  );
});
