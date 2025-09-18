import { login } from '../../../support/login';
describe('Creating automation scripts for mosaic project', () => {
  const selectors = {
    projectPageProjectTitle:
      '.ProjectDetailHeader__StyledProjectTitle-sc-83ljzx-3.kwIboI.project-name',
    ProjectIconSideBar:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    projectPhasesIcon: '.ProjectPhasesButton__Container-sc-evyft6-0',
  };

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
  });

  it('Delete phases from the project', () => {
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('BUTTON'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Click on projects icon
    cy.get(selectors.ProjectIconSideBar).click();

    cy.get('.td.table-cell.boardHeaderRow.title')
      .contains('My Projects')
      .should('be.visible')
      .click({ force: true });

    let selectedProjectName = '';

    cy.get('[data-testid="project-title"]')
      .first()
      .then(($el) => {
        selectedProjectName = $el.text().trim();
        cy.log('Selected project: ' + selectedProjectName);

        // Now click the element
        cy.wrap($el).click();
      });

    // Click on projects icon
    cy.get(selectors.ProjectIconSideBar).click();

    // Valiate if the project is created using the project page
    cy.get(selectors.projectPageProjectTitle, { timeout: 10000 }).then(
      ($el) => {
        if ($el.text().includes(selectedProjectName)) {
          cy.log('\u2714 Navigated to project page');
        } else {
          cy.log('\u274C Not navigated to project page');
        }
      }
    );

    // Click on phases
    cy.get(selectors.projectPhasesIcon).click();

    let selectedPhase = '';

    // Get the phase name of the last phase
    cy.get('.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.phaseRow')
      .filter(':visible')
      .last()
      .invoke('text')
      .then((text) => {
        selectedPhase = text.trim();
        cy.log(`Selected phase: ${selectedPhase}`);
      });
    // Click on last phase
    cy.get('.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.phaseRow')
      .filter(':visible')
      .last()
      .find('[data-testid="threedot-menu-icon"]')
      .click();

    // Click on Delete option
    cy.get(
      '.Menu__MenuItemPart-sc-6fjgt9-7.Menu__LabelAndKarat-sc-6fjgt9-10.jXTkIu.hAnFaV'
    )
      .contains('Delete')
      .click();

    // Check if delete phase confirmation is visible and delete the phase
    cy.contains('Delete Phase', { timeout: 10000 })
      .should('be.visible') // retries until visible
      .then(() => {
        cy.log('✔ Delete Phase Confirmation Modal visible');
        cy.get('[data-testid="confirm-modal-confirm-btn"]').click();
      });

    // Validate if the phase is deleted
    cy.get('body', { timeout: 10000 }).then(($body) => {
      const phaseSelector =
        '.SharedTitleCell__IconTitleContainer-sc-1qrqldg-7.kwXpAy';

      const $phase = $body.find(
        `${phaseSelector}:contains("${selectedPhase}")`
      );

      if ($phase.length === 0 || !$phase.is(':visible')) {
        // Phase is either not present or not visible
        cy.log('❌ Phase is not visible: ' + selectedPhase);
      }
    });
  });
});
`

`;
