import { login } from '../../support/login';

describe('Create work plan - Workload module', () => {
  // Selectors for page elements
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
    HRSDAY:
      '.styles__FlexContainer-sc-y693c-3 > :nth-child(2) > .NumberField__StyledInputMainContainer-sc-197e418-0 > .NumberField__CellContainer-sc-197e418-7 > .NumberField__InputContainer-sc-197e418-1',
    workday: '[data-testid="workplan-workdays"]',
    createbutton: '.WorkPlanModalHeader__StyledSaveButton-sc-f6kiq0-1',
  };

  it('should log in successfully with valid credentials and create a work plan in Workload Page', () => {
    // 🔐 Login with credentials from environment
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // 📘 Navigate to Workload module
    cy.get(selector.workload).click();

    // 👤 Select the first team member
    cy.get(selector.Member).first().click({ force: true });

    // 📅 Select a random availability bucket for that member
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

    // 📂 Select a project
    cy.get(selector.selectProject).click();

    // ✅ Click on the first available project
    cy.get(selector.Project).click({ force: true });

    // 🔽 Select a phase
    cy.get('[data-testid="confirm-modal-confirm-btn"]').click({ force: true });
    cy.get(selector.Phase).first().click({ force: true });

    // 💯 Enter % per day
    cy.get(selector.percent).first().click().type('30');

    // 🕐 Enter Hours per Day
    cy.get(selector.HRSDAY).click().type('8');

    // 🗓️ Enter Work Days
    cy.get(selector.workday).click().type('3');

    // ✅ click on create button
    cy.get(selector.createbutton).click({ force: true });
  });
});
