import { login } from '../../support/login';
// This file is a part of Cypress end-to end tests for Planned Time report module
describe('Planned Time Report - Update Report', () => {
  // This test checks if making a future dated workplan created on workload pagre reflects in Planned Time Report

  it(
    'Creating a future dated workplan on workload page should reflect in Planned Time Report',
    { tags: ['@TESC-4129'] },
    () => {
      // Selectors for planned time report
      const selectors = {
        ReportsIcon:
          '[data-testid="sidemenu-reports"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        plannedTimeReport: '[data-testid="report-Planned Time"]',
      };
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('BUTTON'),
        Cypress.env('LOGIN_PASSWORD')
      );

      // Click on Reports icon on the side menu
      cy.get(selectors.ReportsIcon).click();

      // Click on Planned Time Reports icon
      cy.get(selectors.plannedTimeReport).click();
    }
  );
});
