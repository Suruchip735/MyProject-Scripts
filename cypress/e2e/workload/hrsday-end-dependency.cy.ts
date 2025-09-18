import { login } from '../../support/login';

describe('workload - Create Planner HRSDAY Lock End Date Dependency', () => {
  const selector = {
    workload: '[data-testid="workload-navbutton"]',
    emptyMemberText:
      '.WorkloadPlannerTimelineContainer__TimelineEmptyStateMessage-sc-12ejc0a-3.kjCMex',
    selectMembersText: '[data-text="Select Members"]',
    memberCheckbox: '.Checkbox__OriginalInput-sc-uli8ed-0.cUieaw',
    saveButton: '.SideFilterHeader__StyledSaveButton-sc-7zhanr-4.fohRgr',
    Member:
      '.MemberGroupRenderer__StyledGroupBodyContainer-sc-qgfkme-11.jNQJGI',
    selectProject: '[data-testid="select-project-button"]',
    percent: '.NumberField__NumberInput-sc-197e418-2.gREKTT',
    workday: '[data-testid="workplan-workdays"]',
    Project:
      '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4',
    Phase:
      '.styles__StyledListItem-sc-uz02q-7.gbLwhB.flyout-list-item-container',
    HRSDAY:
      '.styles__FlexContainer-sc-y693c-3 > :nth-child(2) > .NumberField__StyledInputMainContainer-sc-197e418-0 > .NumberField__CellContainer-sc-197e418-7 > .NumberField__InputContainer-sc-197e418-1',
    createbutton: '.WorkPlanModalHeader__StyledSaveButton-sc-f6kiq0-1',
    lockIcon: '.NumberField__EndAdornment-sc-197e418-5.boWnvT',
  };

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function planFirstUnplannedPhase() {
    cy.get('body').then(($body) => {
      const isUnplannedPresent =
        $body.find(
          '.LockWithTooltip__StyledLockWithTooltip-sc-6o5lpa-0.bduagf.lock-text'
        ).length > 0;

      if (isUnplannedPresent) {
        cy.log('🔓 Found unplanned – expanding to plan it');

        cy.get(
          '.CollapseToggle__CollapseIcon-sc-1f2atxa-0.SharedTitleCell__StyledCollapseIcon-sc-1qrqldg-11'
        )
          .first()
          .click({ force: true });

        cy.wait(1500);

        cy.get('[data-testid="plan-date-cell"]')
          .eq(1)
          .then((cell) => {
            cy.wrap(cell).click({ force: true });

            cy.get('.CalendarMonth')
              .find(
                'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
              )
              .then(($days) => {
                const start = $days.eq(0);
                const end = $days.eq(2);
                cy.wrap(start).click({ force: true });
                cy.wrap(end).click({ force: true });

                cy.get('.styles__DoneButton-sc-5z27h7-21.fpeeBn')
                  .should('be.visible')
                  .click({ force: true });
              });
          });

        cy.get(
          '.ProjectScheduleModalHeaderInfo__StyledNewCloseIcon-sc-17126v5-9'
        ).click({ force: true });

        cy.wait(1500);
      }
    });
  }

  it(
    'should log in and create a plan with end date dependency and HRSDAY lock in workload module',
    { tags: ['@TESC-4634'] },
    () => {
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'),
        Cypress.env('LOGIN_PASSWORD')
      );
      cy.wait(2000);

      cy.get(selector.workload).click();
      cy.wait(4000);

      cy.get('body').then(($body) => {
        if ($body.find(selector.emptyMemberText).length > 0) {
          const message = $body.find(selector.emptyMemberText).text().trim();
          if (message.includes('No Members Selected')) {
            cy.log('No members selected – selecting one now');
            cy.get(selector.selectMembersText).first().click({ force: true });
            cy.get(selector.memberCheckbox).first().check({ force: true });
            cy.get(selector.saveButton).contains('Save').click({ force: true });
            cy.wait(2000);
          }
        }
      });

      cy.get(selector.Member).first().click({ force: true });

      // 🔁 Plan any unplanned phase before proceeding
      planFirstUnplannedPhase();

      // 📌 Continue with main logic
      cy.get('.rct-hl.rct-hl-even')
        .eq(1)
        .within(() => {
          cy.get(
            '.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket'
          ).then(($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true });
          });
        });

      cy.get(selector.selectProject).click();
      cy.get(selector.Project).click({ force: true });

      cy.get('body').then(($body) => {
        if (
          $body.find('[data-testid="confirm-modal-confirm-btn"]').length > 0
        ) {
          cy.get('[data-testid="confirm-modal-confirm-btn"]')
            .should('be.visible')
            .click();
        }
      });

      cy.wait(2000);
      cy.get(selector.Phase).then(($phases) => {
        const totalPhases = $phases.length;

        // Case: Two phase elements exist
        if (totalPhases >= 2) {
          const $secondPhase = $phases.eq(1);
          const isSecondNotPlanned =
            $secondPhase.find('.DateRangeTag__NoDates-sc-1bpyqqi-3').length >
              0 && $secondPhase.text().includes('NOT PLANNED');

          if (isSecondNotPlanned) {
            cy.log('🚫 Second phase is NOT PLANNED — opening Manage Phases');

            cy.get(
              '.LockWithTooltip__StyledLockWithTooltip-sc-6o5lpa-0.bduagf.lock-text'
            )
              .contains('Manage Phases')
              .click({ force: true });

            cy.wait(1500);
            cy.get(
              '.CollapseToggle__CollapseIcon-sc-1f2atxa-0.SharedTitleCell__StyledCollapseIcon-sc-1qrqldg-11.hhGICB.dzshDR'
            )
              .first()
              .click({ force: true });

            cy.wait(2000);
            cy.get('[data-testid="plan-date-cell"]')
              .eq(1)
              .then((cell) => {
                cy.wrap(cell).click({ force: true });

                cy.get('.CalendarMonth')
                  .find(
                    'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
                  )
                  .then(($days) => {
                    const start = $days.eq(0);
                    const end = $days.eq(2);
                    cy.wrap(start).click({ force: true });
                    cy.wrap(end).click({ force: true });

                    cy.get('.styles__DoneButton-sc-5z27h7-21.fpeeBn')
                      .should('be.visible')
                      .click({ force: true });
                  });
              });

            cy.wait(2000);
            cy.get(
              '.ProjectScheduleModalHeaderInfo__StyledNewCloseIconContainer-sc-17126v5-8 svg'
            ).click({ force: true });

            cy.wait(1000);
            cy.get(selector.selectProject).click();
            cy.wait(3000);
            cy.get(selector.Project).click({ force: true });

            cy.get('body').then(($body) => {
              if (
                $body.find('[data-testid="confirm-modal-confirm-btn"]').length >
                0
              ) {
                cy.get('[data-testid="confirm-modal-confirm-btn"]')
                  .should('be.visible')
                  .click();
              }
            });

            cy.get(selector.Phase).eq(1).click({ force: true });
            cy.wait(3000);
          } else {
            cy.log('✅ Second phase is PLANNED — selecting it directly');
            cy.wrap($secondPhase).click({ force: true });
            cy.wait(2000);
          }
        }

        // Case: Only one phase
        else if (totalPhases === 1) {
          const $phase = $phases.eq(0);
          const isNotPlanned =
            $phase.find('.DateRangeTag__NoDates-sc-1bpyqqi-3').length > 0 &&
            $phase.text().includes('NOT PLANNED');

          if (isNotPlanned) {
            const isWorkCategory =
              $phase.find(
                '.WorkCategoryItemRow__WorkCategoryIconContainer-sc-1hf7xs0-3.jmUZNS'
              ).length > 0;
            const isPhaseItem =
              $phase.find(
                '.PhaseItemRow__PhaseIconContainer-sc-1jx574o-6.gjGPjn'
              ).length > 0;

            cy.log('🚫 Only one phase is NOT PLANNED — opening Manage Phases');

            cy.get(
              '.LockWithTooltip__StyledLockWithTooltip-sc-6o5lpa-0.bduagf.lock-text'
            )
              .contains('Manage Phases')
              .click({ force: true });

            cy.wait(2000);

            // 👉 For Work Category: Click collapse before selecting 2nd cell
            if (isWorkCategory) {
              cy.log(
                '📂 Work Category detected — clicking collapse before selecting cell'
              );
              cy.get(
                '.CollapseToggle__CollapseIcon-sc-1f2atxa-0.SharedTitleCell__StyledCollapseIcon-sc-1qrqldg-11.hhGICB.dzshDR'
              )
                .first()
                .click({ force: true });

              cy.wait(1500);
            }

            const planCellIndex = isWorkCategory ? 1 : 0;

            cy.log(`📌 Selecting plan-date-cell index: ${planCellIndex}`);

            cy.get('[data-testid="plan-date-cell"]')
              .eq(planCellIndex)
              .then((cell) => {
                cy.wrap(cell).click({ force: true });

                cy.get('.CalendarMonth')
                  .find(
                    'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
                  )
                  .then(($days) => {
                    const start = $days.eq(0);
                    const end = $days.eq(2);
                    cy.wrap(start).click({ force: true });
                    cy.wrap(end).click({ force: true });

                    cy.get('.styles__DoneButton-sc-5z27h7-21.fpeeBn')
                      .should('be.visible')
                      .click({ force: true });
                  });
              });

            cy.wait(2000);
            cy.get(
              '.ProjectScheduleModalHeaderInfo__StyledNewCloseIconContainer-sc-17126v5-8 svg'
            ).click({ force: true });

            cy.wait(1000);
            cy.get(selector.selectProject).click();
            cy.wait(3000);
            cy.get(selector.Project).click({ force: true });

            cy.get('body').then(($body) => {
              if (
                $body.find('[data-testid="confirm-modal-confirm-btn"]').length >
                0
              ) {
                cy.get('[data-testid="confirm-modal-confirm-btn"]')
                  .should('be.visible')
                  .click();
              }
            });

            cy.get(selector.Phase).eq(0).click({ force: true });
            cy.wait(3000);
          } else {
            cy.log('✅ Only phase is PLANNED — selecting it directly');
            cy.wrap($phase).click({ force: true });
            cy.wait(2000);
          }
        }
      });

      // 🔗 Set start/end date dependencies
      cy.get('[data-testid="start-date-dependency-icon-button"]').click({
        force: true,
      });

      cy.wait(2000);

      // ⌨️ Fill % and workday fields
      cy.get(selector.percent).first().click().type('30');
      cy.get(selector.workday).click().type('3');

      // 🔒 Lock the percentage field (second lock icon)
      cy.get('.NumberField__CellContainer-sc-197e418-7.gIiHsD.roundedRight')
        .find('.NumberField__EndAdornment-sc-197e418-5')
        .eq(1)
        .click();

      cy.wait(2000);

      // 💾 Create the work plan
      cy.get(selector.createbutton).click({ force: true });
    }
  );
});