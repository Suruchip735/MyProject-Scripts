import { login } from '../../../support/login';
import { faker } from '@faker-js/faker';

describe('Creating automation scripts for mosaic project', () => {
  const selectors = {
    projectPageProjectTitle:
      '.ProjectDetailHeader__StyledProjectTitle-sc-83ljzx-3.kwIboI.project-name',
    ProjectIconSideBar:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    projectPhasesIcon: '.ProjectPhasesButton__Container-sc-evyft6-0',
  };
  it.only('Add new custom phase to a project', () => {
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

    // Click on Add button
    cy.get('.CreateButton__Button-sc-1clbypk-0').click();

    // Select Add phase option
    cy.get(
      '.Menu__MenuItemPart-sc-6fjgt9-7.Menu__LabelAndKarat-sc-6fjgt9-10.jXTkIu.hAnFaV'
    )
      .contains('Add Phase')
      .click();

    // Click on "Add Custom Phase "
    cy.get(
      '.LabelWithHelperIndicator__StyledContainer-sc-13rp2ar-0.kMleQj.styles__StickyRowLabel-sc-te9dv3-5.kPCaPM'
    )
      .contains('Add Custom Phase')
      .click({ force: true });

    // Generate phase name
    const randomInt = faker.number.int({ min: 10000, max: 99999 });

    const phaseName = `Phase - ${randomInt}`;

    // Click on phase name input
    cy.get('[data-testid="phase-name-input"]').type(phaseName);

    // Generate phase reference number
    const refNumber = String(faker.number.int({ min: 100, max: 999 }));

    // Click on reference number input
    cy.get('[data-testid="phase-modal-number-input"]').type(refNumber);

    // Click on create button
    cy.get('[data-testid="phase-modal-submit-btn"]').click();

    cy.wait(6500);
    // Validate if the phase is created or not and if created mention with position number
    cy.get('body').then(($body) => {
      const phaseSelector =
        '.SharedTitleCell__IconTitleContainer-sc-1qrqldg-7.kwXpAy';

      if ($body.find(`${phaseSelector}:contains("${phaseName}")`).length > 0) {
        // Element exists, now scroll into view and check visibility
        cy.get(phaseSelector)
          .contains(phaseName)
          .scrollIntoView()
          .should('be.visible')
          .then(() => {
            cy.log('✔ Phase is visible: ' + phaseName);

            // Now get the phase position text and log it
            cy.get(
              '.EllipsisText__Text-sc-1vtmsnz-0.exEqzi.PhasePosition__Container-sc-1b45qeq-0.eGdZhH.SharedTitleCell__StyledPhasePosition-sc-1qrqldg-16.HNxlO.dark'
            )
              .last()
              .invoke('text')
              .then((subInfoText) => {
                cy.log('Phase is added ' + subInfoText.trim() + ' position');

                // Plan phase dates

                // Click on plan button
                cy.get('.DateRangeTag__Base-sc-1bpyqqi-4')
                  .last()
                  .click({ force: true });

                const startDate = new Date();
                startDate.setDate(startDate.getDate() + 0);

                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 2);

                const date1 = new Date();

                function formatDateToLongUS(dateInput: string | number | Date) {
                  const date = new Date(dateInput);
                  return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                }

                const startDate_formated = formatDateToLongUS(startDate);

                const endDate_formated = formatDateToLongUS(endDate);
                cy.get('.CalendarDay__today > div').click();

                cy.log(`End Date: ${endDate_formated}`);

                cy.get(`[aria-label*="${endDate_formated}"]`).click();

                //cy.get(`td[aria-label="${startDate_formated}"]`).click();
                //cy.get(`td[aria-label="${endDate_formated}"]`).click();
              });
          });
      } else {
        cy.log('❌ Phase not found');
      }
    });
  });
});
