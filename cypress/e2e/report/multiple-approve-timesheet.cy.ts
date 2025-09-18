import { login } from '../../support/login';

describe('Report Timesheet - Approve Multiple Time sheet using modify', () => {
  const selector = {
    Timesheet: '[data-testid="report-Timesheets"]',
    Modify: '.styles__StyledDropdownToggle-sc-194g64u-50',
    Approve:
      '.styles__StyledDropdownMenu-sc-194g64u-45 > :nth-child(1) > .styles__StyledInnerDropdownItem-sc-194g64u-55',
  };
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  it('Timesheet Report approve Multiple Time sheet', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    //click on home work plan
    cy.contains('Report').click();
    cy.wait(5000);

    //click on time sheet
    cy.get(selector.Timesheet).click();
    cy.wait(5000);

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
    cy.wait(3000);

    cy.get(selector.Approve).click();
    cy.wait(3000);
  });
});
