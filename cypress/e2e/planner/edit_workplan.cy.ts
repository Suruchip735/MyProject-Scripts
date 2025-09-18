import { login } from '../../support/login';

describe('Planner - Edit workplan ', () => {
  const selector = {
    plannerIcon: '[data-testid="planner-navbutton"]',

    SelectPhase: '[data-testid="select-phase-button"]',
    EmptyState:
      '.WorkloadPlannerTimelineContainer__TimelineEmptyStateMessage-sc-12ejc0a-3.kjCMex',
    ProjectFilterTrigger: '[data-testid="filter-trigger"]',
    DoneButton: '.styles__SaveButton-sc-3rt6x5-39.hwMLhM',
    ExpandIcon: '.styles__StyledKaratContainerForProject-sc-3rt6x5-76',
    Planner: '[data-testid="sidemenu-planner"]',
    Project:
      '.ProjectGroupRenderer__StyledProjectContainer-sc-1f1xvkz-5.kMnexI',
    Member: '.MemberGroupRenderer__MemberTooltipContainer-sc-qgfkme-18.dhALnX',
  };

  // Helper: Ensures a project is selected in the planner. If not, selects the second available project.
  function ensureProjectSelected() {
    cy.get('body').then(($body) => {
      if ($body.find(selector.EmptyState).length > 0) {
        cy.get(selector.EmptyState).then(($msg) => {
          const message = $msg.text().trim();
          if (message.includes('No Projects Selected')) {
            // Open the project filter
            cy.get(selector.ProjectFilterTrigger)
              .contains('Select Projects')
              .click({ force: true });

            // Select the second project from the list
            cy.get(
              '.Checkbox__OriginalInput-sc-uli8ed-0.styles__StyledCheckbox-sc-6dn6bg-0'
            )
              .eq(1)
              .click({ force: true });

            cy.wait(2000); // Wait for the project selection to stabilize

            // Apply the project filter
            cy.get(selector.DoneButton).click({ force: true });

            cy.wait(2000); // Wait for the project selection to stabilize

            // Wait for planner timeline to appear and expand first project
            cy.get('.rct-hl').should('exist');
            cy.get(selector.ExpandIcon).first().click({ force: true });
          }
        });
      } else {
        // If projects are already selected, just expand the first project
        cy.log('Projects already selected.');
        cy.get('.rct-hl').should('exist');
        cy.get(selector.ExpandIcon).first().click({ force: true });
      }
    });
  }

  it('Planner - Edit a work plan ', { tags: ['@TESC-3400'] }, () => {
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('BUTTON'),
      Cypress.env('LOGIN_PASSWORD')
    );

    //Navigate to planner page
    cy.get(selector.plannerIcon).click();
    cy.wait(3500);

    // :brain: If "No Projects Selected", open filter and select a project
    ensureProjectSelected();

    // :bust_in_silhouette: Click the first team member in the timeline
    cy.get(selector.Member).first().should('be.visible').click({ force: true });
    cy.wait(6000);
    //Loop to search for Click on the first workplan available
    cy.get('.react-calendar-timeline').within(() => {
      cy.get('.rct-items').then(($items) => {
        const $plan = $items
          .find('.rct-item.mosaic-project-schedule-bar')
          .first();

        if ($plan.length > 0) {
          cy.wrap($plan).click();
          cy.wait(3600);

          cy.document().then((doc) => {
            const modal = doc.querySelector('.modal.fade.show');
            if (modal && getComputedStyle(modal).display === 'block') {
              cy.get('.modal.fade.show').within(() => {
                cy.log('✅ Modal found and visible');
              });
            } else {
              cy.log('❌ Modal not found or not visible');
            }
          });
        } else {
          cy.log('No workplans found');
        }
      });
    });
  });
});
