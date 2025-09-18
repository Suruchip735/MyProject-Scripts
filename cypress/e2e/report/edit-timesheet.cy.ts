import { login } from '../../support/login';

describe('Report Timesheet - Edit Timesheet', () => {
  const selector = {
    Report: '[data-testid="sidemenu-reports"]',
    TimeSheet: '[data-testid="report-Timesheets"]',
    DateCells: '.styles__StyledDateContainer-sc-194g64u-31.enaXXf',
    CalendarMonth: '.CalendarMonth',
    MemberItems: '.styles__MemberName-sc-y693c-21.bjSqtm.styled-member-name',
    Member:
      '[style="position: absolute; left: 0px; top: 0px; height: 46px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ListMemberContainer-sc-y693c-25',
    ProjectCell:
      '.styles__StyledProjectTitleContainer-sc-4zqk9v-3.TimesheetProjectCell__StyledProjectTitleContainer-sc-y5evrg-8.iNEsBR.lmVBkU',
    WorkCategoryCell: '.styles__StyledReportCell-sc-194g64u-29 select',
    DoneButton: 'button:contains("Done")',
    Project: '.ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1.kKBExG',
    ClickWorkCategory:
      '.TimesheetActivityCell__SkeletonLoaderWrapper-sc-bmpn0d-1.gbIhdo',
    WorkCategory:
      '.styles__StyledItemRowContainer-sc-uz02q-14.cDQChH.flyout-item-row-container',
    Description: '.styles__ReportTimesheetStyledCell-sc-194g64u-61.hFWJAc',
  };

  it('Timesheet-  edit Timesheet', { tags: ['TESC-0'] }, () => {
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.get(selector.Report).click({ force: true });
    cy.get(selector.TimeSheet).click({ force: true });

    cy.get('.timesheetRow', { timeout: 10000 })
      .first()
      .then(($firstTimesheet) => {
        // Check if this timesheet is approved or not by inspecting some element inside it
        if ($firstTimesheet.find('svg path[fill="#27AE60"]').length > 0) {
          cy.log('----------------------------------------');
          cy.log('🟢 First timesheet is already approved with green checkmark');
          cy.log('----------------------------------------');
        } else {
          // Click the first timesheet row to open/edit it
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
            .first()
            .click({ force: true });

          cy.contains('Save').click();

          // Select the first member
          cy.get(selector.MemberItems)
            .should('exist')
            .first()
            .click({ force: true });
          cy.get(selector.Member)
            .should('exist')
            .first()
            .click({ force: true });

          // Select and change the project (first item)
          cy.get(selector.ProjectCell)
            .should('exist')
            .first()
            .click({ force: true });
          cy.contains('Change Project').click();

          cy.get(selector.Project).then(($items) => {
            const count = $items.length;
            if (count > 0) {
              const randomIndex = Math.floor(Math.random() * count);
              cy.wrap($items[randomIndex]).click({ force: true });
            }
          });

          cy.get('body').then(($body) => {
            if (
              $body.find('[data-testid="confirm-modal-confirm-btn"]').length > 0
            ) {
              cy.get('[data-testid="confirm-modal-confirm-btn"]')
                .should('be.visible')
                .click();
            }
          });

          // Select random phase/item
          cy.get('body').then(($body) => {
            const itemSelector =
              '.styles__StyledListItem-sc-uz02q-7.gbLwhB.flyout-list-item-container';
            if ($body.find(itemSelector).length > 0) {
              const items = $body.find(itemSelector);
              const randomIndex = Math.floor(Math.random() * items.length);
              cy.wrap(items[randomIndex]).click({ force: true });
            }
          });

          // Choose random work category
          cy.get(selector.ClickWorkCategory).first().click({ force: true });
          cy.get(selector.WorkCategory).then(($items) => {
            if ($items.length > 0) {
              const randomIndex = Math.floor(Math.random() * $items.length);
              cy.wrap($items[randomIndex]).click({ force: true });
            }
          });

          // Update description
          cy.get(
            'div.content-editable-description.required[contenteditable="true"]'
          )
            .first()
            .clear({ force: true })
            .type('New Test{enter}', { force: true });

          const randomNumber = Math.floor(Math.random() * 100);
          cy.get(
            '.styles__StyledDayInput-sc-1aiq3g9-5.ffchcM.timesheet-day.enable-hover'
          )
            .first()
            .clear({ force: true })
            .type(randomNumber.toString() + '{enter}', { force: true });
        }
      });
  });
});
