import { login } from '../../../support/login';
describe('Validate Login Functionality', () => {
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  it('Validate Login with valid Credentials', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);
    // Intercept the API call that confirms user login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    cy.origin('https://release.party.mosaicapp.com', () => {
      const selector = {
        Timesheet: '.react-grid-item',
        ThreeDot:
          '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 60px; height: 60px; margin: 0px;"] > .project > .styles__TimesheetStyledCell-sc-1aiq3g9-4 > .TimesheetProjectCell__Container-sc-y5evrg-0 > .TimesheetProjectCell__ProjectNameRow-sc-y5evrg-7 > .TimesheetProjectCell__StyledHoverButton-sc-y5evrg-3 > .styles__MenuContainer-sc-icb7ss-3 > [data-testid="three-dot-menu"] > .ProjectThreeDotMenuTrigger__IconContainer-sc-vzzwtq-0 > .ThreeDotButton__ThreeDotContainer-sc-1lp0cq5-0 > .SvgIcon__Svg-sc-vv99ju-0',
        Deleteoption:
          '.styles__DeleteTimeEntryMenuItem-sc-icb7ss-4 > .Menu__LabelAndKarat-sc-l2d90n-10',
        DeleteButton: '.background-red',
      };
      // //click on time sheet
      cy.contains(selector.Timesheet, 'Timesheet').click();
      cy.wait(3000);

      cy.get('.styles__AddEntryRow-sc-i6o7be-0').click({ force: true });
      cy.wait(5000);

      cy.get(
        '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4'
      ).click({ force: true });
      cy.wait(3000);

      cy.get(
        '[style="position: absolute; left: 0px; top: 0px; height: 64px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1'
      ).click({ force: true });
      cy.wait(3000);

      //select work category
      cy.get(
        '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 60px; height: 60px; margin: 0px;"] > .activity > .styles__TimesheetStyledCell-sc-1aiq3g9-4'
      ).click({ force: true });
      cy.wait(3000);

      //select work category
      cy.get(
        '[style="position: absolute; left: 0px; top: 54px; height: 54px; width: 100%;"]'
      ).click({ force: true });
      cy.wait(3000);

      //Add description
      cy.get(
        '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 60px; height: 60px; margin: 0px;"] > .description > .styles__TimesheetStyledCell-sc-1aiq3g9-4'
      )
        .click({ force: true })
        .type('This is for testing');

      cy.wait(3000);

      cy.get(
        '.styles__StyledDayInput-sc-1aiq3g9-5.ffchcM.timesheet-day'
      )
        .first()
        .click({ force: true })
        .type('8')
        .type('{enter}');

      // cy.get(selector.Deleteoption).click();
      // cy.wait(3000);

      // //click Delete button
      // cy.get(selector.DeleteButton).click();
      // cy.wait(3000);
    });
  });
});
