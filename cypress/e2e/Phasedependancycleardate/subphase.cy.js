import { login } from '../../support/Login';

describe('Project schdule - set or clear subphase date with dependency', () => {
  const selector = {
    projectIcon:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    CalanderMonth: '.CalendarMonth',
    ThreeDotIcon:
      '.SvgIcon__Svg-sc-vv99ju-0.iNBxYk.SharedTitleCell__StyledThreeDotIcon-sc-1qrqldg-18.loEUVY',
    SubmenuParent: '.Menu__Item-sc-l2d90n-11.fMUOCW',
    Submenu: 'td.Menu__SubmenuExtension-sc-l2d90n-5.dHgJrl',
    AddSubphase: '[data-testid="add-subphase"]',
    AddPhaseButton: '[data-testid="add-phase-btn"]',
    ModalItem: '.Menu__Item-sc-l2d90n-11.fMUOCW',
    AddCustomRow:
      '.styles__StyledListItem-sc-uz02q-7.eBZMfs.flyout-list-item-container.AddCustomRow',
    Input: '[data-testid="phase-name-input"]',
    Submit: '[data-testid="phase-modal-submit-btn-container"]',
  };
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.visit(appDomain);
  });

  it('should log in, create/expand subphase, plan dates, add dependency or clear it if exists', () => {
    cy.viewport(1920, 1080);

    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000); // Wait for login to complete

    const handlePlanDateAndDependency = () => {
      cy.get('[data-testid="plan-date-cell"]')
        .eq(1)
        .then(($cell) => {
          const classList = $cell.attr('class');

          const clearAndConfirm = () => {
            cy.wrap($cell).click({ force: true });
            cy.get('button.styles__CancelButton-sc-5z27h7-22.fBhvcq')
              .should('be.visible')
              .click({ force: true });
            cy.get('[data-testid="confirm-modal-confirm-btn"]')
              .should('be.visible')
              .click({ force: true });
          };

          if (classList.includes('unplanned')) {
            cy.wrap($cell).click({ force: true });

            cy.get(selector.CalanderMonth)
              .find('td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)')
              .then(($days) => {
                const totalDays = $days.length;
                if (totalDays >= 2) {
                  const startIndex = Math.floor(
                    Math.random() * (totalDays - 1)
                  );
                  const endIndex = Math.min(startIndex + 5, totalDays - 1);

                  cy.wrap($days[startIndex]).click({ force: true });
                  cy.wait(3000);
                  cy.wrap($days[endIndex]).click({ force: true });

                  // === Add Dependency ===
                  cy.get(
                    '.MultiOptionDependency__BaseTransparentButton-sc-13z66o4-2'
                  )
                    .should('be.visible')
                    .click({ force: true });

                  cy.wait(2000);

                  cy.get('.DependencyTag__DependencyTagItemContent-sc-87juxu-2.clPMzy')
                    .contains('Select')
                    .click({ force: true });

                  cy.get('[data-testid="start"]').click({ force: true });

                  cy.get('[data-testid="start"]')
                    .trigger('mouseover')
                    .wait(500)
                    .within(() => {
                      cy.contains('Waiting').click({ force: true });
                    });

                  cy.get('.target > .DependencyTag__DependencyTagItem-sc-87juxu-0 > .DependencyTag__DependencyTagItemContent-sc-87juxu-2' ).click();

                  cy.get('.PhaseDependableItemRowRenderer__BaseRow-sc-128gn5t-1.PhaseDependableItemRowRenderer__MiddleRow-sc-128gn5t-3.kZcrjs.gBmweY')
                    .not('[data-tooltip-content="Phase does not have dates"]')
                    .first()
                    .click({ force: true });

                  cy.wait(3000);

                  cy.get('.styles__MenuItemContainer-sc-13vjrrx-1.TargetTypeMenuRenderer__StyledMenuItemContainer-sc-f32l49-0.iESmHK.cqaZPi.TargetTypePopover__StyledTargetTypeMenuRenderer-sc-1wvyn8x-1.gLEvPE')
                    .first()
                    .click({ force: true });

                  cy.wait(3000);

                  cy.get('.styles__DoneButton-sc-5z27h7-21.fpeeBn')
                    .should('be.visible')
                    .click({ force: true });

                  cy.wait(3000);

                  cy.get('body').then(($body) => {
                    if (
                      $body.find('.SvgIcon__Svg-sc-vv99ju-0.iNBxYk.DateRangeTag__StyledDependencyLinkIcon-sc-1bpyqqi-1.bCzuZb').length > 0
                    ) {
                      clearAndConfirm($cell);
                    }
                  });
                }
              });
          } else {
            cy.wait(3000);
            clearAndConfirm();
          }
        });
    };

    // Navigate to the project
    cy.get(selector.projectIcon).click();
    cy.wait(3000);
    cy.get('[data-testid="My Projects"]').click({ force: true });
    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    cy.get(selector.projectIcon).click();
    cy.wait(3000);
    cy.get('.ProjectPhasesButton__NumPhases-sc-evyft6-2').click();
    cy.wait(3000);

    cy.get('body').then(($body) => {
      const collapseSelector =
        '.CollapseToggle__CollapseIcon-sc-1f2atxa-0.SharedTitleCell__StyledCollapseIcon-sc-1qrqldg-11.hhGICB.dzshDR';

      if (
        $body.find(collapseSelector).length > 0 &&
        $body.find(collapseSelector).is(':visible')
      ) {
        cy.get(collapseSelector).first().click({ force: true });
        handlePlanDateAndDependency(); // Subphase logic
      } else {
        // Create phase + subphase if not present
        const uniquePhaseName = `Phase-${Date.now()}`;
        const uniqueSubphaseName = `Subphase-${Date.now()}`;

        const openSubphaseMenu = () => {
          cy.get(selector.ThreeDotIcon).first().click({ force: true });
          cy.get(selector.SubmenuParent)
            .contains('Add Schedule Item')
            .scrollIntoView()
            .trigger('mouseover')
            .invoke('show');
          cy.get(selector.Submenu).invoke('show');
        };

        openSubphaseMenu();

        cy.get(selector.AddSubphase).then(($el) => {
          if ($el.is(':disabled') || $el.hasClass('disabled')) {
            cy.log('Add Subphase is disabled. Creating a new phase first...');
            cy.get(selector.AddPhaseButton).click();
            cy.get(selector.ModalItem).first().click();
            cy.get(selector.AddCustomRow).click();
            cy.get(selector.Input, { timeout: 10000 })
              .should('be.visible')
              .clear()
              .type(uniquePhaseName)
              .should('have.value', uniquePhaseName);
            cy.get(selector.Submit).should('be.visible').click();
            cy.wait(3000);
            openSubphaseMenu();
          }

          cy.get(selector.AddSubphase)
            .should('be.visible')
            .click({ force: true });
          cy.get(selector.AddCustomRow).click();
          cy.get(selector.Input, { timeout: 10000 })
            .should('be.visible')
            .clear()
            .type(uniqueSubphaseName)
            .should('have.value', uniqueSubphaseName);
          cy.get(selector.Submit).should('be.visible').click();

          cy.get('body').then(($body) => {
            if ($body.find(selector.Input).length > 0) {
              cy.log(`Failed to create subphase "${uniqueSubphaseName}".`);
              throw new Error(
                `Subphase creation failed — input still present.`
              );
            } else {
              cy.log(`Subphase "${uniqueSubphaseName}" created successfully.`);
              cy.wait(3000);

              // Expand and apply logic
              cy.get(collapseSelector).first().click({ force: true });
              handlePlanDateAndDependency();
            }
          });
        });
      }
    });
  });
});
