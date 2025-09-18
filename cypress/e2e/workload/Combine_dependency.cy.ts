import { login } from '../../support/login.ts';
import '../../support/commands.ts';

const SELECTORS = {
  workload: '[data-testid="sidemenu-workload"]',
  emptyMemberText:
    '.WorkloadPlannerTimelineContainer__TimelineEmptyStateMessage-sc-12ejc0a-3.kjCMex',
  selectMembersText: '[data-text="Select Members"]',
  memberCheckbox: '.Checkbox__OriginalInput-sc-uli8ed-0',
  saveButton: '.SideFilterHeader__StyledSaveButton-sc-7zhanr-4.fohRgr',
  Member: '.MemberGroupRenderer__StyledGroupBodyContainer-sc-qgfkme-11.jNQJGI',
  selectProject: '[data-testid="select-project-button"]',
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
    if ($body.find(SELECTORS.Phase).length > index) {
      cy.get(SELECTORS.Phase).eq(index).click({ force: true });
    } else {
      cy.log(`⚠️ Phase at index ${index} not found — skipping`);
    }
  });
}

// Select plan dates
function selectPlanDates(cellIndex = 1) {
  cy.get(SELECTORS.planDateCell).eq(cellIndex).click({ force: true });
  cy.get('.CalendarMonth')
    .find(
      'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
    )
    .then(($days) => {
      const start = $days.eq(0);
      const end = $days.eq(2);
      cy.wrap(start).click({ force: true });
      cy.wrap(end).click({ force: true });
      cy.get(SELECTORS.doneBtn).click({ force: true });
    });
}

// Confirm modal if present
function confirmIfPresent() {
  cy.get('body').then(($body) => {
    if ($body.find(SELECTORS.confirmModal).length > 0) {
      cy.get(SELECTORS.confirmModal).should('be.visible').click();
    }
  });
}

// Handle unplanned phase
function planFirstUnplannedPhase() {
  cy.get('body').then(($body) => {
    const found =
      $body.find(`${SELECTORS.managePhasesLock}.lock-text`).length > 0;
    if (found) {
      cy.log('🔓 Found unplanned phase – expanding to plan it');
      cy.get(SELECTORS.collapseIcon).first().click({ force: true });
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

describe('workload - Create Planner HRSDAY Lock END Date Dependency', () => {
  it(
    'should log in and create a plan with end date dependency and HRSDAY lock in workload module',
    { tags: ['@TESC-4634'] },
    () => {
      login(
        (Cypress.env('LOGIN_USERNAME') ?? '') as string,
        (Cypress.env('Button') ?? '') as string,
        (Cypress.env('LOGIN_PASSWORD') ?? '') as string
      );

      cy.get(SELECTORS.workload).should('be.visible').click();
      cy.wait(4000);

      cy.selectFirstMemberIfNone(SELECTORS);
      cy.wait(3000);

      cy.get(SELECTORS.Member).first().click({ force: true });
      cy.wait(3000);

      selectRandomWorkloadBucket();
      cy.wait(4000);

      planFirstUnplannedPhase();

      cy.get(SELECTORS.selectProject).should('be.visible').click();
      cy.wait(1000);
      cy.get(SELECTORS.Project).click({ force: true });
      cy.wait(1000);

      confirmIfPresent();

      // Handle phase selection safely
      cy.get('body').then(($body) => {
        const $phases = $body.find(SELECTORS.Phase);
        const totalPhases = $phases.length;

        if (totalPhases >= 2) {
          const $second = $phases.eq(1);
          const notPlanned =
            $second.find('.DateRangeTag__NoDates-sc-1bpyqqi-3').length > 0 &&
            $second.text().includes('NOT PLANNED');

          if (notPlanned) {
            cy.log('🚫 Second phase is NOT PLANNED — opening Manage Phases');
            cy.get(SELECTORS.managePhasesLock)
              .contains('Manage Phases')
              .click({ force: true });
            cy.get(`${SELECTORS.collapseIcon}.hhGICB.dzshDR`)
              .first()
              .click({ force: true });
            selectPlanDates();
            cy.get(SELECTORS.closeModalIcon).click({ force: true });
            cy.wait(2000);

            cy.get(SELECTORS.selectProject).click();
            cy.wait(1000);
            cy.get(SELECTORS.Project).click({ force: true });
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
            cy.get(SELECTORS.managePhasesLock)
              .contains('Manage Phases')
              .click({ force: true });

            if (isWorkCategory) {
              cy.get(`${SELECTORS.collapseIcon}.hhGICB.dzshDR`)
                .first()
                .click({ force: true });
            }

            selectPlanDates(planCellIndex);
            cy.get(SELECTORS.closeModalIcon).click({ force: true });
            cy.wait(2000);

            cy.get(SELECTORS.selectProject).click();
            cy.wait(1000);
            cy.get(SELECTORS.Project).click({ force: true });
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
      cy.get(SELECTORS.lockIcon).first().click({ force: true });
      cy.get(SELECTORS.HRSDAY).click().type('8');
      cy.wait(1000);

      cy.get(SELECTORS.dependencyStartBtn).click({ force: true });
      cy.wait(200);
      cy.get(SELECTORS.dependencyEndBtn).click({ force: true });
      cy.wait(1000);

      cy.get(SELECTORS.createbutton).click({ force: true });
    }
  );
});
