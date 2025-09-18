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
        WorkPlan: '.react-grid-item',
        UserWorkPlan:
          '.styles__StyledHiddenBoxes-sc-3rt6x5-92.gyZqvv.hidden-boxes.zeroCapacity.isPast',
        SelectProjectDropdown: '[data-testid="select-project-button"]',
        SelectPhase:
          '.styles__ItemRowContainer-sc-18itbsl-0.styles__StyledItemRowContainer-sc-18itbsl-3.jHEvWE',
      };
      cy.wait(5000);

      cy.contains(selector.WorkPlan, 'Work Plan').click();
      cy.wait(5000);

      cy.get(selector.UserWorkPlan, { timeout: 15000 })
        .first()
        .click({ force: true });

      cy.get(selector.SelectProjectDropdown).click({ force: true });
      cy.get(
        '.styles__StyledListItem-sc-uz02q-7.gbLwhB.flyout-list-item-container'
      )
        .contains('Time Off')
        .click({ force: true });

      cy.get(selector.SelectPhase, { timeout: 3000 })
        .first()
        .click({ force: true });

      cy.wait(3000);

      cy.contains('button.styles__TextButton-sc-1lvufti-0', 'Create').click();
    });
  });
});
