import { login } from '../../support/login';

describe('Workload - Create Planner Percentage Lock End Date Dependency', () => {
  // 🔽 Define all selectors used in the test with descriptive comments
  const selector = {
    workload: '[data-testid="workload-navbutton"]', // Navigation button for Workload page (sidebar)

    Member:
      '.MemberGroupRenderer__StyledGroupBodyContainer-sc-qgfkme-11.jNQJGI',
    // Container for each team member row (used to assign work)

    selectProject: '[data-testid="select-project-button"]',
    // Button to open the project selection modal

    Project:
      '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4',
    // Selector for the first project in the dropdown list

    Phase:
      '.PhaseItemRow__BaseRow-sc-1jx574o-2.PhaseItemRow__MiddleRow-sc-1jx574o-4.diTXPr.fWQxWc',
    // Selector for the first phase row available for selection

    percent: '.NumberField__NumberInput-sc-197e418-2.gREKTT',
    // Input field for entering percentage per day effort

    createbutton: '.WorkPlanModalHeader__StyledSaveButton-sc-f6kiq0-1',
    // Button to save and create the work plan

    lockIcon: '.NumberField__EndAdornment-sc-197e418-5.boWnvT',
    // Lock icon to lock the percentage field
  };

  it(
    'should log in and create a plan with end date dependency and percentage lock in workload Module',
    { tags: ['@TESC-0'] },
    () => {
      // 🖥 Set browser resolution for consistent test view

      // 🔐 Log in using custom login function and env variables
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'), // e.g., "Continue"
        Cypress.env('LOGIN_PASSWORD')
      );

      // ⏳ Wait for dashboard to load after login

      // 📁 Navigate to Workload page
      cy.get(selector.workload).click();

      // 👤 Click on the first member to start assigning work
      cy.get(selector.Member).first().click({ force: true });

      // 📅 Select a random availability bucket from second row (week row)
      cy.get('.rct-hl.rct-hl-even')
        .eq(1)
        .within(() => {
          cy.get(
            '.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket'
          ).then(($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true });
          });
        });

      // 🔽 Open the project dropdown modal
      cy.get(selector.selectProject).click();

      // 📌 Select the first project listed
      cy.get(selector.Project).click({ force: true });

      // 🗂 Select the first phase of the project
      cy.get(selector.Phase).first().click({ force: true });

      // ⌨️ Enter 30% as daily effort percentage
      cy.get(selector.percent).first().click().type('30');

      // 🔗 Enable the end-date dependency
      cy.get('[data-testid="end-date-dependency-icon-button"]').click({
        force: true,
      });

      // 🔒 Lock the percent field to keep effort fixed
      cy.get(selector.lockIcon).first().click({ force: true });

      // ✅ click on create Button
      cy.get(selector.createbutton).click({ force: true });
    }
  );
});
