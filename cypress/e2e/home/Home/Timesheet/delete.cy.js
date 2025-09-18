import { login } from '../../../support/login';
describe('Validate Login Functionality', () => {
  const selector = {
    Timesheet: '[data-testid="timesheetWidget-personal-13064"]',
    ThreeDot:
      '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 60px; height: 60px; margin: 0px;"] > .project > .styles__TimesheetStyledCell-sc-1aiq3g9-4 > .TimesheetProjectCell__Container-sc-y5evrg-0 > .TimesheetProjectCell__ProjectNameRow-sc-y5evrg-7 > .TimesheetProjectCell__StyledHoverButton-sc-y5evrg-3 > .styles__MenuContainer-sc-icb7ss-3 > [data-testid="three-dot-menu"] > .ProjectThreeDotMenuTrigger__IconContainer-sc-vzzwtq-0 > .ThreeDotButton__ThreeDotContainer-sc-1lp0cq5-0 > .SvgIcon__Svg-sc-vv99ju-0',
    Deleteoption:
      '.styles__DeleteTimeEntryMenuItem-sc-icb7ss-4 > .Menu__LabelAndKarat-sc-l2d90n-10',
    DeleteButton: '.background-red',
  };
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
          '.ThreeDotButton__ThreeDotContainer-sc-1lp0cq5-0.fCCqxR.vertical.default',
        Deleteoption:
          '.Menu__MenuItemPart-sc-6fjgt9-7.Menu__LabelAndKarat-sc-6fjgt9-10.jXTkIu.hAnFaV',
        DeleteButton: '.background-red',
      };

      cy.contains(selector.Timesheet, 'Timesheet').click();
      cy.wait(8000);

      //click three dot
      cy.get('[data-testid="three-dot-menu"]')
        .should('have.length.greaterThan', 0)
        .then(($elements) => {
          const randomIndex = Math.floor(Math.random() * $elements.length);
          cy.wrap($elements[randomIndex]).click();
        });

      cy.wait(3000);

      // Click on delete
      cy.get(selector.Deleteoption).contains('Delete Time Entry').click();

      cy.wait(3000);

      // Click delete confirmation button
      cy.get(selector.DeleteButton).click();
      cy.wait(3000);
    });
  });
});
