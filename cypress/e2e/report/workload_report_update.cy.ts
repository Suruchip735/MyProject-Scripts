import { login } from '../../support/login';
// This file is a part of the Cypress end-to end tests for Workload Report module
describe('Workload Report - Update Report', () => {
  // This test checks if making a member’s workplan updates their workload metrics in member and project views on workload page
  it(
    'creating worklplans for a user should update in project and member views',
    { tags: ['@TESC-2655'] },
    () => {
      // Selectors for the workload report page
      const selectors = {
        ReportsIcon:
          '[data-testid="sidemenu-reports"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        WorkloadReport: '[data-testid="report-Workload"]',
      };
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('BUTTON'),
        Cypress.env('LOGIN_PASSWORD')
      );

      // Click on Reports icon from the side menu
      cy.get(selectors.ReportsIcon).click();

      // Click on Workload on the Reports page
      cy.get(selectors.WorkloadReport).click();
    }
  );
});
