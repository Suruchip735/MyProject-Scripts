import { login } from '../../support/login';

describe('Workload - Create Planner Workday Lock start Date Dependency', () => {
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
  };
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    cy.visit(appDomain);
  });

  it('should log in and create a plan in Workload with locked Workday and start date dependency', () => {
    // 🖥 Set screen size for consistency
    cy.viewport(1920, 1080);

    // 🔐 Perform login using custom command and env variables
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // e.g., "Continue"
      Cypress.env('LOGIN_PASSWORD')
    );

    // ⏳ Wait for dashboard to load after login
    cy.wait(10000);

    // 📁 Open the Workload module from the sidebar
    cy.get(selector.workload).click();
    cy.wait(3000);

    // 👤 Click on the first team member to assign work
    cy.get(selector.Member).first().click({ force: true });
    cy.wait(5000);

    // 📆 Select a random availability bucket in the second row (week row)
    cy.get('.rct-hl.rct-hl-even')
      .eq(1)
      .within(() => {
        cy.get('.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket').then(
          ($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true });
          }
        );
      });

    cy.wait(3000);

    // 📌 Open the project selection dropdown
    cy.get(selector.selectProject).click();
    cy.wait(3000);

    // ✅ Select the first project in the list
    cy.get(selector.Project).click({ force: true });
    cy.wait(3000);

    // 📂 Choose the first phase under the selected project
    cy.get(selector.Phase).first().click({ force: true });
    cy.wait(3000);

    // ✍️ Enter "30" in the % per day field
    cy.get(selector.percent).first().click().type('30');
    cy.wait(3000);

    // 🔗 Enable the end date dependency toggle
    cy.get('[data-testid="start-date-dependency-icon-button"]').click({
      force: true,
    });
    cy.wait(3000);

    // 🕒 Enter number of workdays as "3"
    cy.get(selector.workday).click().type('3');
    cy.wait(3000);

    // 🔒 Click lock icon for percentage per day
    cy.get('.NumberField__CellContainer-sc-197e418-7.gIiHsD.roundedRight')
      .find('.NumberField__EndAdornment-sc-197e418-5')
      .eq(1)
      .click();

    cy.wait(1000);

    // 💾 click on create Button
    cy.get(selector.createbutton).click({ force: true });
    cy.wait(3000);
  });
});
