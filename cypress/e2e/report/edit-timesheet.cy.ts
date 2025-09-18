import { login } from '../../support/login';

/**
 * Report Timesheet - Edit Timesheet
 */
describe('Report Timesheet - Edit Timesheet', () => {
  const selector = {
    Report:
      '[data-testid="sidemenu-reports"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    TimeSheet: '[data-testid="report-Timesheets"]',
    TimesheetHeading: '.styles__StyledLeftOptions-sc-3rt6x5-53',
    DateCells: '.styles__StyledDateContainer-sc-194g64u-31.enaXXf',
    CalendarMonth: '.CalendarMonth',
    MemberItems: '.styles__MemberName-sc-y693c-21.bjSqtm.styled-member-name',
    Member:
      '[style="position: absolute; left: 0px; top: 0px; height: 46px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ListMemberContainer-sc-y693c-25',
    ProjectCell:
      '.styles__StyledProjectTitleContainer-sc-4zqk9v-3.TimesheetProjectCell__StyledProjectTitleContainer-sc-y5evrg-8.iNEsBR.lmVBkU',
    WorkCategoryCell: '.styles__StyledReportCell-sc-194g64u-29 select',
    Project: '.ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1.kKBExG',
    ClickWorkCategory:
      '.TimesheetActivityCell__SkeletonLoaderWrapper-sc-bmpn0d-1.gbIhdo',
    WorkCategory:
      '.styles__StyledItemRowContainer-sc-uz02q-14.cDQChH.flyout-item-row-container',
    Description:
      'div.content-editable-description.required[contenteditable="true"]',
    DayInput:
      '.styles__StyledDayInput-sc-1aiq3g9-5.ffchcM.timesheet-day.enable-hover',
    ConfirmModalBtn: '[data-testid="confirm-modal-confirm-btn"]',
    ProjectPhaseFlyout:
      '.styles__StyledListItem-sc-uz02q-7.gbLwhB.flyout-list-item-container',
  };

  const clickRandom = ($items: any) => {
    if ($items.length > 0) {
      const randomIndex = Math.floor(Math.random() * $items.length);
      cy.wrap($items[randomIndex]).click({ force: true });
    }
  };

  it(
    'should efficiently edit a timesheet entry',
    { tags: ['@TESC-253'] },
    () => {
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'),
        Cypress.env('LOGIN_PASSWORD')
      );

      // Navigate to Reports > Timesheet
      cy.log('🔍 Navigating to Reports > Timesheets');
      cy.get(selector.Report).contains('Reports').click();
      cy.get(selector.TimeSheet).should('be.visible').click({ force: true });

      // Check if no data row is present, apply filter if needed
      cy.get('body').then(($body) => {
        if (
          $body.find(
            '.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.emptyRow.closed'
          ).length === 0
        ) {
          cy.log('⚠️ No timesheet data found. Applying "All Time" filter.');

          // Open filters
          cy.get('.styles__FlexRow-sc-1lvufti-7').click({ force: true });

          // Select "All Time"
          cy.get('[data-testid="options-dropdown-option-All Time"]').click({
            force: true,
          });

          cy.wait(1000); // wait for data to reload
        }

        // Retry finding the timesheet rows
        cy.get('.timesheetRow', { timeout: 10000 }).then(($rows) => {
          if ($rows.length === 0) {
            cy.log('❌ No timesheet rows found even after applying filters.');
            return;
          }

          const $firstTimesheet = $rows.first();
          const isApproved =
            $firstTimesheet.find('svg path[fill="#27AE60"]').length > 0;

          if (isApproved) {
            cy.log('🟢 First timesheet is already approved. Skipping edit.');
            return;
          }

          // Proceed to edit the timesheet
          cy.wrap($firstTimesheet).click({ force: true });

          // Change date
          cy.get(selector.DateCells)
            .should('be.visible')
            .first()
            .click({ force: true });

          cy.get(selector.CalendarMonth)
            .find(
              'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
            )
            .should('have.length.greaterThan', 0)
            .then(clickRandom);

          cy.contains('Save').should('be.visible').click();

          // Select member
          cy.get(selector.MemberItems)
            .should('exist')
            .first()
            .click({ force: true });
          cy.get(selector.Member)
            .should('exist')
            .first()
            .click({ force: true });

          // Change project
          cy.get(selector.ProjectCell)
            .should('exist')
            .first()
            .click({ force: true });
          cy.contains('Change Project').should('be.visible').click();
          cy.get(selector.Project).should('exist').then(clickRandom);

          // Confirm modal if present
          cy.get('body').then(($body) => {
            if ($body.find(selector.ConfirmModalBtn).length > 0) {
              cy.get(selector.ConfirmModalBtn).should('be.visible').click();
            }
          });

          // Select phase if flyout appears
          cy.get('body').then(($body) => {
            if ($body.find(selector.ProjectPhaseFlyout).length > 0) {
              cy.get(selector.ProjectPhaseFlyout).then(clickRandom);
            }
          });

          // Select work category if present
          cy.get('body').then(($body) => {
            if ($body.find(selector.ClickWorkCategory).length > 0) {
              cy.get(selector.ClickWorkCategory).first().click({ force: true });

              cy.get('body').then(($body2) => {
                if ($body2.find(selector.WorkCategory).length > 0) {
                  cy.get(selector.WorkCategory).then(clickRandom);

                  // Update description
                  cy.get(selector.Description)
                    .first()
                    .clear({ force: true })
                    .type('New Test{enter}', { force: true });

                  // Update day input
                  const randomNumber = Math.floor(Math.random() * 100);
                  cy.get(selector.DayInput)
                    .first()
                    .clear({ force: true })
                    .type(`${randomNumber}{enter}`, { force: true });
                } else {
                  cy.log('❌ No Work Category options found.');
                }
              });
            } else {
              cy.log('❌ Work category dropdown not found. Skipping.');
            }
          });
        });
      });
    }
  );
});






