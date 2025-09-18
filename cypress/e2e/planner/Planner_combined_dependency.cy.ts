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
    //Project:'.ProjectGroupRenderer__StyledProjectContainer-sc-1f1xvkz-5.kMnexI',
    //Member: '.MemberGroupRenderer__MemberTooltipContainer-sc-qgfkme-18.dhALnX',
    workload: '[data-testid="sidemenu-workload"]',
    emptyMemberText:
      '.WorkloadPlannerTimelineContainer__TimelineEmptyStateMessage-sc-12ejc0a-3.kjCMex',
    selectMembersText: '[data-text="Select Members"]',
    memberCheckbox: '.Checkbox__OriginalInput-sc-uli8ed-0',
    saveButton: '.SideFilterHeader__StyledSaveButton-sc-7zhanr-4.fohRgr',
    Member:
      '.MemberGroupRenderer__StyledGroupBodyContainer-sc-qgfkme-11.jNQJGI',
    selectProject: '[data-testid="select-project-butt on"]',
    Project:
      '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4',
    Phase:
      '.styles__StyledItemRowContainer-sc-uz02q-14.cDQChH.flyout-item-row-container',
    HRSDAY:
      '.styles__FlexContainer-sc-y693c-3 > :nth-child(2) > .NumberField__StyledInputMainContainer-sc-197e418-0 > .NumberField__CellContainer-sc-197e418-7 > .NumberField__InputContainer-sc-197e418-1',
    createbutton: '.WorkPlanModalHeader__StyledSaveButton-sc-f6kiq0-1',
    lockIcon: '.NumberField__EndAdornment-sc-197e418-5.boWnvT',
    managePhasesLock:
      '.LockWithTooltip__StyledLockWithTooltip-sc-6o5lpa-0.bduagf.lock-text',
    collapseIcon:
      '.CollapseToggle__CollapseIcon-sc-1f2atxa-0.SharedTitleCell__StyledCollapseIcon-sc-1qrqldg-11',
    planDateCell: '[data-testid="plan-date-cell"]',
    doneBtn: '.styles__DoneButton-sc-5z27h7-21.fpeeBn',
    closeModalIcon:
      '.ProjectScheduleModalHeaderInfo__StyledNewCloseIconContainer-sc-17126v5-8 svg',
    confirmModal: '[data-testid="confirm-modal-confirm-btn"]',
    dependencyStartBtn: '[data-testid="start-date-dependency-icon-button"]',
    dependencyEndBtn: '[data-testid="end-date-dependency-icon-button"]',
  };

  // Utility: Get random number between min and max
  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Utility: Safely click a phase if it exists
  function safeClickPhase(index: number) {
    cy.get('body').then(($body) => {
      if ($body.find(selector.Phase).length > index) {
        cy.get(selector.Phase).eq(index).click({ force: true });
      } else {
        cy.log(`⚠️ Phase at index ${index} not found — skipping`);
      }
    });
  }

  // Select plan dates
  function selectPlanDates(cellIndex = 1) {
    cy.get(selector.planDateCell).eq(cellIndex).click({ force: true });
    cy.get('.CalendarMonth')
      .find(
        'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
      )
      .then(($days) => {
        const start = $days.eq(0);
        const end = $days.eq(2);
        cy.wrap(start).click({ force: true });
        cy.wrap(end).click({ force: true });
        cy.get(selector.doneBtn).click({ force: true });
      });
  }

  // Confirm modal if present
  function confirmIfPresent() {
    cy.get('body').then(($body) => {
      if ($body.find(selector.confirmModal).length > 0) {
        cy.get(selector.confirmModal).should('be.visible').click();
      }
    });
  }

  // Handle unplanned phase
  function planFirstUnplannedPhase() {
    cy.get('body').then(($body) => {
      const found =
        $body.find(`${selector.managePhasesLock}.lock-text`).length > 0;
      if (found) {
        cy.log('🔓 Found unplanned phase – expanding to plan it');
        cy.get(selector.collapseIcon).first().click({ force: true });
        cy.wait(500);
        selectPlanDates();
        cy.get(
          '.ProjectScheduleModalHeaderInfo__StyledNewCloseIcon-sc-17126v5-9'
        ).click({ force: true });
        cy.wait(1500);
      }
    });
  }

  // Select a random workload bucket
  function selectRandomWorkloadBucket(): void {
    cy.get('.rct-hl.rct-hl-even')
      .eq(1)
      .within(() => {
        cy.get('.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket').then(
          ($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true });
          }
        );
      });
  }

  /**
   * Helper: Ensures a project is selected in the planner. If not, selects the second available project.
   */
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
    cy.wait(3000);

    selectRandomWorkloadBucket();
    cy.wait(4000);

    planFirstUnplannedPhase();
    //cy.get(selector.selectProject).should('be.visible').click();
    //cy.wait(1000);
    //cy.get(selector.Project).click({ force: true });
    //cy.wait(1000);

    confirmIfPresent();
    // Handle phase selection safely
    cy.get('body').then(($body) => {
      const $phases = $body.find(selector.Phase);
      const totalPhases = $phases.length;

      if (totalPhases >= 2) {
        const $second = $phases.eq(1);
        const notPlanned =
          $second.find('.DateRangeTag__NoDates-sc-1bpyqqi-3').length > 0 &&
          $second.text().includes('NOT PLANNED');

        if (notPlanned) {
          cy.log('🚫 Second phase is NOT PLANNED — opening Manage Phases');
          cy.get(selector.managePhasesLock)
            .contains('Manage Phases')
            .click({ force: true });
          cy.get(`${selector.collapseIcon}.hhGICB.dzshDR`)
            .first()
            .click({ force: true });
          selectPlanDates();
          cy.get(selector.closeModalIcon).click({ force: true });
          cy.wait(2000);

          cy.get(selector.selectProject).click();
          cy.wait(1000);
          cy.get(selector.Project).click({ force: true });
          cy.wait(1000);

          confirmIfPresent();
          safeClickPhase(1);
        } else {
          cy.log('✅ Second phase is PLANNED — selecting it directly');
          safeClickPhase(1);
        }
      } else if (totalPhases === 1) {
        const $phase = $phases.eq(0);
        const notPlanned =
          $phase.find('.DateRangeTag__NoDates-sc-1bpyqqi-3').length > 0 &&
          $phase.text().includes('NOT PLANNED');

        if (notPlanned) {
          const isWorkCategory =
            $phase.find(
              '.WorkCategoryItemRow__WorkCategoryIconContainer-sc-1hf7xs0-3.jmUZNS'
            ).length > 0;
          const planCellIndex = isWorkCategory ? 1 : 0;

          cy.log('🚫 Only one phase is NOT PLANNED — opening Manage Phases');
          cy.get(selector.managePhasesLock)
            .contains('Manage Phases')
            .click({ force: true });

          if (isWorkCategory) {
            cy.get(`${selector.collapseIcon}.hhGICB.dzshDR`)
              .first()
              .click({ force: true });
          }

          selectPlanDates(planCellIndex);
          cy.get(selector.closeModalIcon).click({ force: true });
          cy.wait(2000);

          cy.get(selector.selectProject).click();
          cy.wait(1000);
          cy.get(selector.Project).click({ force: true });
          cy.wait(1000);

          confirmIfPresent();
          safeClickPhase(0);
        } else {
          cy.log('✅ Only phase is PLANNED — selecting it directly');
          safeClickPhase(0);
        }
      } else {
        cy.log('⚠️ No phases found — skipping phase selection');
      }
    });

    // ✅ Add dependency + HRSDAY lock
    cy.get('input[name="total_hours"]')
      .clear()
      .type(getRandomInt(1, 50).toString());
    cy.get(selector.lockIcon).first().click({ force: true });
    cy.get(selector.HRSDAY).click().type('8');
    cy.wait(1000);

    cy.get(selector.dependencyStartBtn).click({ force: true });
    cy.wait(200);
    cy.get(selector.dependencyEndBtn).click({ force: true });
    cy.wait(1000);

    cy.get(selector.createbutton).click({ force: true });
  });
});

//Unfilled
//cy.get('.BarForm__StyledBarSelectContainer-sc-4mm4xo-1 > :nth-child(2) > .NumberField__StyledInputMainContainer-sc-197e418-0 > .NumberField__CellContainer-sc-197e418-7 > .NumberField__EndAdornment-sc-197e418-5 > .Lock__StyledLockIconContainer-sc-1jdmtln-1')

//Filled
// cy.get('.styles__FlexContainer-sc-y693c-3 > :nth-child(2) > .NumberField__StyledInputMainContainer-sc-197e418-0 > .NumberField__CellContainer-sc-197e418-7 > .NumberField__EndAdornment-sc-197e418-5 > .Lock__StyledLockIconContainer-sc-1jdmtln-1');
