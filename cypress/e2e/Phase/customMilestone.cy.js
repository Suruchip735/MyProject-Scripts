import { login } from '../../support/login';

describe('Project schdule - Create Custom Milestone', () => {
  const selector = {
    Project:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    SelectProject: '[data-testid="My Projects"]',
    Phase: '[href="/flagon/members/members/views/member/13064/view/tasks"]',
    AddPhaseButton: '.CreateButton__Button-sc-1clbypk-0.emFFr',
    AddCustomRow:
      '.styles__StyledListItem-sc-uz02q-7.eBZMfs.flyout-list-item-container.AddCustomRow',
    Input: '[data-testid="phase-name-input"]',
    Submit:
      '.styles__TextButton-sc-1lvufti-0.styles__TextButtonWithBorder-sc-1lvufti-1.styles__BlueSubmitButton-sc-1lvufti-2.MilestoneInfoModalFooter__StyledSubmitButton-sc-dfb87o-3.dGTMwD.fgunCm.eapiTK.BFFrF',
  };

  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);
    cy.visit(appDomain);
  });

  it('should log in successfully and create one short unique milestone name', () => {
    cy.viewport(1920, 1080);

    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    // Navigate to the project and open phase section
    cy.get(selector.Project).click({ force: true });
    cy.wait(3000);

    cy.get(selector.SelectProject).click({ force: true });
    cy.wait(3000);

    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    cy.get('[data-testid="sidebar-menu-projects-btn"]').click();
    cy.get('.ProjectPhasesButton__NumPhases-sc-evyft6-2').click();

    // Short unique milestone name
    const uniqueMilestoneName = `M-${Math.floor(Math.random() * 10000)}`;

    // Open Add Phase (Milestone) modal
    cy.get(selector.AddPhaseButton).click();

    //click on the Add Milestone Option
    cy.contains('Add Milestone').click({ force: true });
    cy.get(selector.AddCustomRow).click();

    // Type the short milestone name
    cy.get(selector.Input, { timeout: 10000 })
      .should('exist')
      .clear({ force: true })
      .type(uniqueMilestoneName, { force: true })
      .should('have.value', uniqueMilestoneName);

    // click on Submit
    cy.get(selector.Submit).should('be.visible').click();

    // Verify success
    cy.get('body').then(($body) => {
      if ($body.find(selector.Input).length > 0) {
        cy.log(
          `Failed to create milestone "${uniqueMilestoneName}". Please check for errors.`
        );
        throw new Error(
          `Milestone creation failed — "${uniqueMilestoneName}" input still present.`
        );
      } else {
        cy.log(`Milestone "${uniqueMilestoneName}" created successfully.`);
      }
    });
  });
});
