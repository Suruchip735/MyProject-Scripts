import { login } from '../../support/login';

describe('Workload - Create Planner Percentage Lock start Date Dependency', () => {
  // 🔽 Selector map with descriptions
  const selector = {
    workload: '[data-testid="workload-navbutton"]',
    Totalavibility: ':nth-child(1) > .styles__TeamMemberCell-sc-3rt6x5-77',
    Member:
      '.MemberGroupRenderer__StyledGroupBodyContainer-sc-qgfkme-11.jNQJGI',
    selectProject: '[data-testid="select-project-button"]',
    Project:
      '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4',
    Phase:
      '.PhaseItemRow__BaseRow-sc-1jx574o-2.PhaseItemRow__MiddleRow-sc-1jx574o-4.diTXPr.fWQxWc',
    percent: '.NumberField__NumberInput-sc-197e418-2.gREKTT',
    workday: '[data-testid="workplan-workdays"]',
    createbutton: '.WorkPlanModalHeader__StyledSaveButton-sc-f6kiq0-1',
    lockIcon: '.NumberField__EndAdornment-sc-197e418-5.boWnvT',
  };

  it(
    'should log in and create a plan with start date dependency and percentage lock in workload Module',
    { tags: ['@TESC-0'] },
    () => {
      // 🖥 Set viewport resolution for consistent rendering

      // 🔐 Perform login using environment variables
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'), // e.g., "Continue"
        Cypress.env('LOGIN_PASSWORD')
      );

      // 📁 Navigate to Workload section
      cy.get(selector.workload).click();

      // 👤 Click on the first team member to assign work
      cy.get(selector.Member).first().click({ force: true });

      // 📆 Select a random availability bucket to assign work
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

      // 📌 Select the first project listed
      cy.get(selector.selectProject).click();

      // 📂 Select a project from the dropdown
      cy.get(selector.Project).click({ force: true });

      // 🗂 Select the first available phase
      cy.get(selector.Phase).first().click({ force: true });

      // ⌨️ Enter 30% as daily effort percentage
      cy.get(selector.percent).first().click().type('30');

      // 🔗 Enable the end-date dependency
      cy.get('[data-testid="start-date-dependency-icon-button"]').click({
        force: true,
      });

      // ⌨️ Enter  workday
      cy.get(selector.workday).click().type('3');

      // 🔒 Click lock icon for percentage per day
      cy.get(selector.lockIcon).first().click({ force: true });

      // ✅ click on create Button
      cy.get(selector.createbutton).click({ force: true });
    }
  );
});
