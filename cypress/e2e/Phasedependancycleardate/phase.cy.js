import { login } from '../../support/Login';

describe('Project schdule - set or clear Phase date with dependency', () => {
  const selector = {
    projectIcon:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    CalanderMonth: '.CalendarMonth',
  };
  function clearAndConfirm($cell) {
    cy.wrap($cell).click({ force: true });
    cy.get('button.styles__CancelButton-sc-5z27h7-22.fBhvcq')
      .should('be.visible')
      .click({ force: true });
    cy.get('[data-testid="confirm-modal-confirm-btn"]')
      .should('be.visible')
      .click({ force: true });
  }

  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);
    cy.visit(appDomain);
  });

  it('should log in, plan date, add dependency or clear it if exists', () => {
    cy.viewport(1920, 1080);

    // Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    // Open project
    cy.get(selector.projectIcon).click();
    cy.wait(5000);
    cy.get('[data-testid="My Projects"]').click({ force: true });

    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    cy.get(selector.projectIcon).click();
    cy.wait(4000);

    // Go to phases
    cy.get('.ProjectPhasesButton__NumPhases-sc-evyft6-2').click();
    cy.wait(3000);

    cy.get('[data-testid="plan-date-cell"]')
      .eq(1)
      .then(($cell) => {
        const classList = $cell.attr('class');

        if (classList.includes('unplanned')) {
          // Plan date
          cy.wrap($cell).click({ force: true });

          cy.get(selector.CalanderMonth)
            .find(
              'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
            )
            .then(($days) => {
              const totalDays = $days.length;
              if (totalDays >= 2) {
                const startIndex = Math.floor(Math.random() * (totalDays - 1));
                const endIndex = Math.min(startIndex + 5, totalDays - 1);

                cy.wrap($days[startIndex]).click({ force: true });
                cy.wait(2000);
                cy.wrap($days[endIndex]).click({ force: true });

                // === Add Dependency ===
                cy.get(
                  '.MultiOptionDependency__BaseTransparentButton-sc-13z66o4-2'
                )
                  .should('be.visible')
                  .click({ force: true });

                cy.wait(2000);

                cy.get(
                  '.DependencyTag__DependencyTagItemContent-sc-87juxu-2.clPMzy'
                )
                  .contains('Select')
                  .click({ force: true });

                cy.get('[data-testid="start"]').click({ force: true });

                cy.get('[data-testid="start"]')
                  .trigger('mouseover')
                  .wait(500)
                  .within(() => {
                    cy.contains('Waiting').click({ force: true });
                  });

                cy.get(
                  '.target > .DependencyTag__DependencyTagItem-sc-87juxu-0 > .DependencyTag__DependencyTagItemContent-sc-87juxu-2'
                ).click();

                cy.get(
                  '.PhaseDependableItemRowRenderer__BaseRow-sc-128gn5t-1.PhaseDependableItemRowRenderer__MiddleRow-sc-128gn5t-3.kZcrjs.gBmweY'
                )
                  .not('[data-tooltip-content="Phase does not have dates"]')
                  .first()
                  .click({ force: true });

                cy.wait(3000);

                cy.get(
                  '.styles__MenuItemContainer-sc-13vjrrx-1.TargetTypeMenuRenderer__StyledMenuItemContainer-sc-f32l49-0.iESmHK.cqaZPi.TargetTypePopover__StyledTargetTypeMenuRenderer-sc-1wvyn8x-1.gLEvPE'
                )
                  .first()
                  .click({ force: true });
                cy.wait(3000);

                // ✅ Click Done AFTER dependency is added
                cy.get('.styles__DoneButton-sc-5z27h7-21.fpeeBn')
                  .should('be.visible')
                  .click({ force: true });

                cy.wait(3000);

                // ✅ Optional: Clear if dependency still exists
                cy.get('body').then(($body) => {
                  if (
                    $body.find(
                      '.SvgIcon__Svg-sc-vv99ju-0.iNBxYk.DateRangeTag__StyledDependencyLinkIcon-sc-1bpyqqi-1.bCzuZb'
                    ).length > 0
                  ) {
                    clearAndConfirm($cell);
                  }
                });
              }
            });
        } else {
          // Already planned, just clear
          cy.wait(3000);
          clearAndConfirm($cell);
        }
      });
  });
});
