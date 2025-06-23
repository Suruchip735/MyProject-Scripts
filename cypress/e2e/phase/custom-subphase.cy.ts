import { login } from '../../support/login';

describe('Project schedule - Create Custom subphase', () => {
  const selector = {
    Project:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    SelectProject: '[data-testid="My Projects"]',
    AddPhaseButton: '.CreateButton__Button-sc-1clbypk-0.emFFr',
    AddCustomRow:
      '.styles__StyledListItem-sc-uz02q-7.eBZMfs.flyout-list-item-container.AddCustomRow',
    Input: '[data-testid="phase-name-input"]',
    Submit: '[data-testid="phase-modal-submit-btn-container"]',
    ModalItem: '.Menu__Item-sc-l2d90n-11.fMUOCW',
    SubmenuParent: '.Menu__Item-sc-l2d90n-11.fMUOCW',
    Submenu: 'td.Menu__SubmenuExtension-sc-l2d90n-5.dHgJrl',
    AddSubphase: '[data-testid="add-subphase"]',
    ThreeDotIcon:
      '.SvgIcon__Svg-sc-vv99ju-0.iNBxYk.SharedTitleCell__StyledThreeDotIcon-sc-1qrqldg-18.loEUVY',
  };

  it(
    'should log in and add a Phase and Subphase if needed',
    { tags: ['@TESC-0'] },
    () => {
      // Login step
      login(
        (Cypress.env('LOGIN_USERNAME') as string) || '',
        (Cypress.env('Button') as string) || '',
        (Cypress.env('LOGIN_PASSWORD') as string) || ''
      );

      const uniquePhaseName = `P-${Math.floor(Math.random() * 10000)}`;
      const uniqueSubphaseName = `SP-${Math.floor(Math.random() * 10000)}`;

      // Navigate to project
      cy.get(selector.Project).click({ force: true });
      cy.get(selector.SelectProject).click({ force: true });

      cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
        .first()
        .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
        .click({ force: true });

      // Open Phases section
      cy.get('[data-testid="sidebar-menu-projects-btn"]').click();
      cy.get('.ProjectPhasesButton__NumPhases-sc-evyft6-2').click();

      const openSubphaseMenu = () => {
        cy.get(selector.ThreeDotIcon).first().click({ force: true });
        cy.get('[data-testid="add-schedule"] > :nth-child(2)')
          // .contains('Add Schedule Item')
          .scrollIntoView()
          .trigger('mouseover')
          .invoke('show');
        // cy.get(selector.Submenu).invoke('show');
      };

      openSubphaseMenu();

      // Check if Add Subphase is enabled
      cy.get(selector.AddSubphase).then(($el) => {
        if ($el.is(':disabled') || $el.hasClass('disabled')) {
          cy.log('Add Subphase is disabled. Creating a new phase first...');

          // Create Phase
          cy.get(selector.AddPhaseButton).click();
          cy.get(selector.ModalItem).first().click();
          cy.get(selector.AddCustomRow).click();
          cy.get(selector.Input, { timeout: 10000 })
            .should('be.visible')
            .clear()
            .type(uniquePhaseName)
            .should('have.value', uniquePhaseName);
          cy.get(selector.Submit).should('be.visible').click();

          // Try again to open Subphase menu
          openSubphaseMenu();
        }

        // Click Add Subphase
        cy.contains('Add Subphase').click({ force: true });

        // Create Subphase
        cy.get(selector.AddCustomRow).click();
        cy.get(selector.Input, { timeout: 10000 })
          .should('be.visible')
          .clear()
          .type(uniqueSubphaseName)
          .should('have.value', uniqueSubphaseName);
        cy.get(selector.Submit).should('be.visible').click();

        // Final confirmation
        cy.get('body').then(($body) => {
          if ($body.find(selector.Input).length > 0) {
            cy.log(`Failed to create subphase "${uniqueSubphaseName}".`);
            throw new Error(`Subphase creation failed — input still present.`);
          } else {
            cy.log(`Subphase "${uniqueSubphaseName}" created successfully.`);
          }
        });
      });
    }
  );
});
