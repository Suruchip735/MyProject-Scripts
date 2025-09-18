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

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
  });

  it(
    'Delete phases from the project',
    { tags: ['@TESC-001', 'Project', 'Phase', 'Subphase'] },
    () => {
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

      // Click on projects icon again to close
      cy.get(selectors.ProjectIconSideBar).click();

      // Click on project phases icon
      cy.get(selectors.projectPhasesIcon).click();

      cy.get(
        '.SharedTitleCell__IconTitleContainer-sc-1qrqldg-7 > .EllipsisText__Text-sc-1vtmsnz-0'
      ).then(($el) => {
        if ($el.length > 0 && $el.text().includes('Project Schedule')) {
          cy.log('No Phases added to project');

          cy.log('Adding new phase');

          // Click on three-dot menu
          cy.get('[data-testid="threedot-menu-icon"]').last().click();

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

            if (
              $body.find(`${phaseSelector}:contains("${phaseName}")`).length > 0
            ) {
              // Element exists, now scroll into view and check visibility
              cy.get(phaseSelector)
                .contains(phaseName)
                .scrollIntoView()
                .should('be.visible')
                .then(() => {
                  cy.log('✔ Phase is visible: ' + phaseName);
                });
              // Validate if the phase is created or not and if created mention with position number
              cy.get('body').then(($body) => {
                const phaseSelector =
                  '.SharedTitleCell__IconTitleContainer-sc-1qrqldg-7.kwXpAy';

                if (
                  $body.find(`${phaseSelector}:contains("${phaseName}")`)
                    .length > 0
                ) {
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
                          cy.log(
                            'Phase is added ' + subInfoText.trim() + ' position'
                          );
                        });
                    });

                  // Click on three dot menu
                  cy.get('[data-testid="threedot-menu-icon"]').first().click();

                  // Click on Add Schedule Item
                  cy.get('.Menu__Label-sc-6fjgt9-4.humJdT')
                    .contains('Add Schedule Item')
                    .click();

                  // Click on Add Subphase
                  cy.get('.styles__StyledItem-sc-r4qh55-0.jqTgQG')
                    .contains('Add Subphase')
                    .click({ force: true });

                  // Click on add custom phase
                  cy.get(
                    '.LabelWithHelperIndicator__StyledContainer-sc-13rp2ar-0.kMleQj.styles__StickyRowLabel-sc-te9dv3-5.kPCaPM'
                  )
                    .contains('Add Custom Phase')
                    .click({ force: true });

                  // Generating subphase name
                  // Generate phase name
                  const randomInt = faker.number.int({
                    min: 10000,
                    max: 99999,
                  });

                  const sub_phaseName = `SPhase - ${randomInt}`;
                  // Type input in phase name
                  cy.get('[data-testid="phase-name-input"]').type(
                    sub_phaseName
                  );

                  // Click on create button
                  cy.get(
                    '[data-testid="phase-modal-submit-btn-container"]'
                  ).click();

                  // Click on first expand icon
                  cy.get('.SharedTitleCell__Grid-sc-1qrqldg-20.CVgmc')
                    .find('svg.SvgIcon__Svg-sc-vv99ju-0.iNBxYk')
                    .eq(1)
                    .click({ force: true });

                  // Validate if the subphase is created not
                  cy.get('.variable-size-list.scrollbar')
                    .contains(sub_phaseName)
                    .then(($el) => {
                      if ($el.is(':visible')) {
                        cy.log(`✔ Subphase "${sub_phaseName}" is created. `);
                      } else {
                        cy.log(
                          `ℹ Subphase "${sub_phaseName}" is not created.`
                        );
                      }
                    });
                } else {
                  cy.log('❌ Phase not found');
                }
              });
            }
          });
        } else {
          cy.log('Phases found');
          // Click on three dot menu
          cy.get('[data-testid="threedot-menu-icon"]').first().click();

          // Click on Add Schedule Item
          cy.get('.Menu__Label-sc-6fjgt9-4.humJdT')
            .contains('Add Schedule Item')
            .click();

          // Click on Add Subphase
          cy.get('.styles__StyledItem-sc-r4qh55-0.jqTgQG')
            .contains('Add Subphase')
            .click({ force: true });

          cy.get(
            '.LabelWithHelperIndicator__StyledContainer-sc-13rp2ar-0.kMleQj.styles__StickyRowLabel-sc-te9dv3-5.kPCaPM'
          )
            .contains('Add Custom Phase')
            .click({ force: true });

          // Generating subphase name
          // Generate phase name
          const randomInt = faker.number.int({ min: 10000, max: 99999 });

          const sub_phaseName = `SPhase - ${randomInt}`;

          // Type input in phase name
          cy.get('[data-testid="phase-name-input"]').type(sub_phaseName);

          // Click on create button
          cy.get('[data-testid="phase-modal-submit-btn-container"]').click();

          // Click on first expand icon
          cy.get('.SharedTitleCell__Grid-sc-1qrqldg-20.CVgmc')
            .find('svg.SvgIcon__Svg-sc-vv99ju-0.iNBxYk')
            .eq(1)
            .click({ force: true });

          // Validate if the subphase is created not
          cy.get('.variable-size-list.scrollbar')
            .contains(sub_phaseName)
            .then(($el) => {
              if ($el.is(':visible')) {
                cy.log(`✔ Subphase "${sub_phaseName}" is created. `);

                // Plan dates for subphase created
              } else {
                cy.log(`ℹ Subphase "${sub_phaseName}" is not created.`);
              }
            });
        }
      });
    }
  );
});
