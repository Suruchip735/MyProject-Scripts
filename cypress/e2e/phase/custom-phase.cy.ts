import { login } from '../../support/login';

describe('Project schdule - Create Custom Phase', () => {
  const selector = {
    Project:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    SelectProject: '[data-testid="My Projects"]',
    Phase: '[href="/flagon/members/members/views/member/13064/view/tasks"]',
    AddPhaseButton: '.CreateButton__Button-sc-1clbypk-0.emFFr',
    AddCustomRow:
      '.styles__StyledListItem-sc-uz02q-7.eBZMfs.flyout-list-item-container.AddCustomRow',
    Input: '[data-testid="phase-name-input"]',
    Submit: '[data-testid="phase-modal-submit-btn-container"]',
    ModalItem: '.Menu__Item-sc-l2d90n-11.fMUOCW',
  };

  it(
    'should log in successfully and create one short unique phase name',
    { tags: ['TESC-0'] },
    () => {
      login(
        (Cypress.env('LOGIN_USERNAME') as string) || '',
        (Cypress.env('Button') as string) || '',
        (Cypress.env('LOGIN_PASSWORD') as string) || ''
      );

      // Navigate to the project and open phase section
      cy.get(selector.Project).click({ force: true });

      cy.get(selector.SelectProject).click({ force: true });

      cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
        .first()
        .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
        .click({ force: true });

      cy.get('[data-testid="sidebar-menu-projects-btn"]').click();
      cy.get('.ProjectPhasesButton__NumPhases-sc-evyft6-2').click();

      // Short unique name
      const uniquePhaseName = `P-${Math.floor(Math.random() * 10000)}`;

      // Open Add Phase modal
      cy.get(selector.AddPhaseButton).click();
      cy.contains('Add Phase').click({ force: true });
      cy.get(selector.AddCustomRow).click();

      // Type the short name
      cy.get(selector.Input, { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type(uniquePhaseName)
        .should('have.value', uniquePhaseName);

      // Submit
      cy.get(selector.Submit).should('be.visible').click();

      // Verify success
      cy.get('body').then(($body) => {
        if ($body.find(selector.Input).length > 0) {
          cy.log(
            `Failed to create phase "${uniquePhaseName}". Please check for errors.`
          );
          throw new Error(
            `Phase creation failed — "${uniquePhaseName}" input still present.`
          );
        } else {
          cy.log(`Phase "${uniquePhaseName}" created successfully.`);
        }
      });
    }
  );
});
