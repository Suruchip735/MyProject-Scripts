import { login } from '../../support/login';

describe('Project schdule - set or clear milestone date with dependency', () => {
  const selector = {
    projectIcon:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    CalanderMonth: '.CalendarMonth',
    AddPhaseButton: '[data-testid="add-phase-button"]',
    ModalItem: '[data-testid="add-phase-modal-item"]',
    AddCustomRow: '[data-testid="add-phase-modal-add-custom-row"]',
    Input: 'input[data-testid="editable-phase-title"]',
    Submit: '[data-testid="confirm-modal-confirm-btn"]',
  };
  beforeEach(() => {
    const appDomain = (Cypress.env('APP_DOMAIN') as string) || '';
    cy.log('APP_DOMAIN:', appDomain);
    cy.visit(appDomain);
  });

  it('should log in and set or clear milestone date with dependency', () => {
    cy.viewport(1920, 1080);

    login(
      (Cypress.env('LOGIN_USERNAME') as string) || '',
      (Cypress.env('Button') as string) || '',
      (Cypress.env('LOGIN_PASSWORD') as string) || ''
    );

    cy.wait(10000);

    cy.get(selector.projectIcon).click();
    cy.wait(3000);
    cy.get('[data-testid="My Projects"]').click({ force: true });
    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    cy.wait(3000);
    cy.get(selector.projectIcon).click();
    cy.wait(8000);
    cy.get('.ProjectPhasesButton__NumPhases-sc-evyft6-2').click();
    cy.wait(3000);

    cy.get('body').then(($body) => {
      if (
        $body.find('.milestoneRow > [data-testid="plan-date-cell"]').length > 0
      ) {
        cy.log('Milestone exists, handling it...');
        cy.get('.milestoneRow > [data-testid="plan-date-cell"]')
          .first()
          .then(($cell) => handleMilestone($cell));
      } else {
        cy.log('No milestone found, creating one...');
        const uniqueMilestoneName = `M-${Math.floor(Math.random() * 10000)}`;

        cy.get(selector.AddPhaseButton).click();
        cy.get(selector.ModalItem).eq(1).click();
        cy.get(selector.AddCustomRow).click();

        cy.get(selector.Input, { timeout: 10000 })
          .should('exist')
          .clear({ force: true })
          .type(uniqueMilestoneName, { force: true })
          .should('have.value', uniqueMilestoneName);

        cy.get(selector.Submit).should('be.visible').click();

        cy.wait(3000);

        cy.get('.milestoneRow > [data-testid="plan-date-cell"]', {
          timeout: 10000,
        })
          .should('exist')
          .first()
          .then(($cell) => handleMilestone($cell));
      }
    });

    function handleMilestone($cell: JQuery<any>) {
      const classList = $cell.attr('class');

      function clearMilestoneDate() {
        cy.wrap($cell).click({ force: true });
        cy.wait(5000);

        cy.get('.styles__CancelButton-sc-5z27h7-22.jObGbg').click({
          force: true,
        });

        cy.get('body').then(($body) => {
          if (
            $body.find('[data-testid="confirm-modal-confirm-btn"]').length > 0
          ) {
            cy.get('[data-testid="confirm-modal-confirm-btn"]').click({
              force: true,
            });
          } else {
            cy.log('No confirm modal — skip confirm.');
          }
        });
      }

      if (classList && classList.includes('unplanned')) {
        cy.log('Milestone is unplanned. Planning now...');
        cy.wrap($cell).click({ force: true });

        cy.get(selector.CalanderMonth)
          .find(
            'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
          )
          .then(($days) => {
            const totalDays = $days.length;
            if (totalDays > 0) {
              const randomIndex = Math.floor(Math.random() * totalDays);
              cy.wrap($days[randomIndex]).click({ force: true });
            }
            cy.wait(3000);
          });

        // === Add Dependency ===
        cy.get('.MultiOptionDependency__BaseTransparentButton-sc-13z66o4-2')
          .should('be.visible')
          .click({ force: true });

        cy.wait(2000);

        cy.get('.DependencyTag__DependencyTagItemContent-sc-87juxu-2.clPMzy')
          .contains('Select')
          .click({ force: true });

        cy.get('[data-testid="startwaiting"]').click({ force: true });

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

        // ✅ Done button after adding dependency
        cy.contains('Done').click({ force: true });

        cy.wait(3000);

        // Wait for class change before clearing
        cy.wrap($cell)
          .should('not.have.class', 'unplanned')
          .then(() => {
            clearMilestoneDate();
          });
      } else {
        cy.log('Milestone is already planned. Clearing now...');
        clearMilestoneDate();
      }
    }
  });
});
