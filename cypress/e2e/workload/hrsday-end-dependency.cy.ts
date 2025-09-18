import { login } from '../../support/login';

describe('workload - Create Planner HRSDAY Lock End Date Dependency', () => {
  // 🔽 Selector map with descriptions
  const selector = {
    workload: '[data-testid="workload-navbutton"]', // Sidebar navigation to Workload page

    Totalavibility: ':nth-child(1) > .styles__TeamMemberCell-sc-3rt6x5-77', // Availability cell (not used in this flow)

    Member:
      '.MemberGroupRenderer__StyledGroupBodyContainer-sc-qgfkme-11.jNQJGI', // Member container (click to assign work)

    selectProject: '[data-testid="select-project-button"]', // Button to select project

    Project:
      '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4',
    // First available project row

    Phase:
      '[style="position: absolute; left: 0px; top: 0px; height: 64px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1 > .PhaseItemRow__MiddleRow-sc-1jx574o-4',
    // First phase under the selected project

    HRSDAY:
      '.styles__FlexContainer-sc-y693c-3 > :nth-child(2) > .NumberField__StyledInputMainContainer-sc-197e418-0 > .NumberField__CellContainer-sc-197e418-7 > .NumberField__InputContainer-sc-197e418-1',
    // Input field for Hours/Day

    createbutton: '.WorkPlanModalHeader__StyledSaveButton-sc-f6kiq0-1', // Button to save work plan

    lockIcon: '.NumberField__EndAdornment-sc-197e418-5.boWnvT', // Lock icon next to % input
  };

  beforeEach(() => {
    // 🌐 Visit application before each test
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);
    cy.visit(appDomain);
  });

  it('should log in and create a plan with end date dependency and HRSDAY lock in workload module', () => {
    // 🖥 Set viewport resolution for consistent rendering
    cy.viewport(1920, 1080);

    // 🔐 Perform login using environment variables
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // Continue button text
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000); // Wait for app to load post-login

    // 📁 Navigate to Workload section
    cy.get(selector.workload).click();
    cy.wait(3000);

    // 👤 Click on the first team member to assign work
    cy.get(selector.Member).first().click({ force: true });
    cy.wait(5000);

    // 📆 Select a random availability bucket to assign work
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

    // 📌 Click to open project selection modal
    cy.get(selector.selectProject).click();
    cy.wait(3000);

    // 📂 Select a project from the dropdown
    cy.get(selector.Project).click({ force: true });
    cy.wait(3000);

    // 🗂 Select the first available phase
    cy.get(selector.Phase).first().click({ force: true });
    cy.wait(3000);

    // ⌨️ Enter 8 hours/day in HRSDAY field
    cy.get(selector.HRSDAY).click().type('8');
    cy.wait(3000);

    // 🔗 Enable end date dependency by clicking on the chain icon
    cy.get('[data-testid="end-date-dependency-icon-button"]').click({
      force: true,
    });
    cy.wait(3000);

    // 🔒 Lock the percentage value using the lock icon
    cy.get(selector.lockIcon).first().click({ force: true });
    cy.wait(1000);

    // ✅ click on create button
    cy.get(selector.createbutton).click({ force: true });
    cy.wait(3000);
  });
});
