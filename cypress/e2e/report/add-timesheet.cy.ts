import { login } from '../../support/login';
describe('Report Timesheet - Create Timesheet', () => {
  const selector = {
    Report:
      '[data-testid="sidemenu-reports"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    TimeSheet: '[data-testid="report-Timesheets"]',
    SelectDate: '.styles__StyledDateCell-sc-194g64u-30.dSpGRg',
    CalanderMonth: '.CalendarMonth',
    SelectMember:
      '.styles__SelectContainer-sc-y693c-4.MemberSelector__StyledSelectContainer-sc-10ybiul-0.goFjHr.kOsNNq',
    SelectProject: '.styles__SelectContainer-sc-y693c-4.goFjHr',
    Project: '.ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1.kKBExG',
    ClickWorkCategory:
      '.TimesheetActivityCell__SkeletonLoaderWrapper-sc-bmpn0d-1.gbIhdo',
    WorkCategory:
      '.styles__StyledItemRowContainer-sc-uz02q-14.cDQChH.flyout-item-row-container',
    Description: '.styles__ReportTimesheetStyledCell-sc-194g64u-61.gtbTPi',
  };

  it('Create Time sheet', () => {
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.get(selector.Report).click({ force: true });
    cy.get(selector.TimeSheet).click({ force: true });

    cy.get(
      '.SvgIcon__Svg-sc-vv99ju-0.iNBxYk.styles__StyledAddPlusIcon-sc-194g64u-0.fKhZDW'
    ).click();

    cy.contains('Select Date').click({ force: true });

    cy.get(selector.CalanderMonth)
      .find(
        'td:not(.CalendarDay__blocked_out_of_range):not(.CalendarDay__blocked_calendar)'
      )
      .then(($days) => {
        const randomIndex = Math.floor(Math.random() * $days.length);
        cy.wrap($days[randomIndex]).click({ force: true });
      });

    cy.contains('Save').click();

    cy.get(selector.SelectMember).click({ force: true });

    cy.get('.flyout-list-item-container').then(($items) => {
      const randomIndex = Math.floor(Math.random() * $items.length);
      cy.wrap($items[randomIndex]).click({ force: true });
    });

    cy.contains(selector.SelectProject, 'Select Project').click({
      force: true,
    });

    cy.get(selector.Project).then(($items) => {
      const count = $items.length;
      if (count > 0) {
        const randomIndex = Math.floor(Math.random() * count);
        cy.wrap($items[randomIndex]).click({ force: true });
      }
    });

    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="confirm-modal-confirm-btn"]').length > 0) {
        cy.get('[data-testid="confirm-modal-confirm-btn"]')
          .should('be.visible')
          .click();
      }
    });

    cy.get('body').then(($body) => {
      if (
        $body.find(
          '.styles__StyledListItem-sc-uz02q-7.gbLwhB.flyout-list-item-container'
        ).length > 0
      ) {
        cy.get(
          '.styles__StyledListItem-sc-uz02q-7.gbLwhB.flyout-list-item-container'
        ).then(($items) => {
          const count = $items.length;
          const randomIndex = Math.floor(Math.random() * count);
          cy.wrap($items.eq(randomIndex)).click({ force: true });
        });
      }
    });
    cy.contains(selector.ClickWorkCategory, 'Select Work Category').then(
      ($items) => {
        const count = $items.length;
        if (count > 0) {
          const randomIndex = Math.floor(Math.random() * count);
          cy.wrap($items[randomIndex]).click({ force: true });
        }
      }
    );

    cy.get(selector.WorkCategory).then(($items) => {
      const count = $items.length;
      if (count > 1) {
        // at least 2 items so we can exclude the first
        const itemsExceptFirst = $items.slice(1);
        const randomIndex = Math.floor(Math.random() * itemsExceptFirst.length);
        cy.wrap(itemsExceptFirst[randomIndex]).click({ force: true });
      }
    });

    cy.get(selector.Description)
      .first()
      .click({ force: true })
      .type('Testing{enter}');

    const randomNumber = Math.floor(Math.random() * 50) + 1;

    cy.get(
      '.styles__StyledDayInput-sc-1aiq3g9-5.ffchcM.timesheet-day.enable-hover'
    )
      .first()
      .type(randomNumber.toString() + '{enter}');

    cy.contains('Add').click();
  });
});
