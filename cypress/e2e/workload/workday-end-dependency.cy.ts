import { login } from '../../support/login';

describe('Workload - Create Planner Workday Lock End Date Dependency', () => {
  // 🔽 Selector map for elements reused throughout the test
  const selector = {
    workload: '[data-testid="workload-navbutton"]', // Sidebar navigation button for Workload module

    Member:
      '.MemberGroupRenderer__StyledGroupBodyContainer-sc-qgfkme-11.jNQJGI',
    // Container for list of team members

    selectProject: '[data-testid="select-project-button"]',
    // Button to open project selection dropdown

    Project:
      '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4',
    // First project listed in the dropdown

    Phase:
      '.PhaseItemRow__BaseRow-sc-1jx574o-2.PhaseItemRow__MiddleRow-sc-1jx574o-4.diTXPr.fWQxWc',
    // First available phase under the selected project

    percent: '.NumberField__NumberInput-sc-197e418-2.gREKTT',
    // Input box for entering percentage per day

    workday: '[data-testid="workplan-workdays"]',
    // Input field for number of workdays

    createbutton: '.WorkPlanModalHeader__StyledSaveButton-sc-f6kiq0-1',
    // Save button to confirm workplan creation
  };

  it(
    'should log in and create a plan in Workload with locked Workday and end date dependency',
    { tags: ['TESC-0'] },
    () => {
      // 🖥 Set screen size for consistency

      // 🔐 Perform login using custom command and env variables
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'), // e.g., "Continue"
        Cypress.env('LOGIN_PASSWORD')
      );

      // ⏳ Wait for dashboard to load after login

      // 📁 Open the Workload module from the sidebar
      cy.get(selector.workload).click();

      // 👤 Click on the first team member to assign work
      cy.get(selector.Member).first().click({ force: true });

      // 📆 Select a random availability bucket in the second row (week row)
      cy.get('.rct-hl.rct-hl-even')
        .eq(1)
        .within(() => {
          cy.get(
            '.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket'
          ).then(($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true }); // Randomly select one cell
          });
        });

      // 📌 Open the project selection dropdown
      cy.get(selector.selectProject).click();

      // ✅ Select the first project in the list
      cy.get(selector.Project).click({ force: true });

      // 📂 Choose the first phase under the selected project
      cy.get(selector.Phase).first().click({ force: true });

      // ✍️ Enter "30" in the % per day field
      cy.get(selector.percent).first().click().type('30');

      // 🔗 Enable the end date dependency toggle
      cy.get('[data-testid="end-date-dependency-icon-button"]').click({
        force: true,
      });

      // 🕒 Enter number of workdays as "3"
      cy.get(selector.workday).click().type('3');

      // 🔒 Lock the % per day input field to fix effort
      cy.get('.NumberField__CellContainer-sc-197e418-7.gIiHsD.roundedRight')
        .find('.NumberField__EndAdornment-sc-197e418-5')
        .eq(1) // Second lock icon refers to the % field
        .click();

      // 💾 click on create Button
      cy.get(selector.createbutton).click({ force: true });
    }
  );
});
