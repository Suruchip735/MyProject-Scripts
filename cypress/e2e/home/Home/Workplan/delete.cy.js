import { login } from '../../../support/login';

describe('Create Workplan - Home Workplan', () => {
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });

  it('should log in successfully with valid credentials create in Home work Plan Page', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    cy.origin('https://release.party.mosaicapp.com', () => {
      const selector = {
        workplan: '.react-grid-item',
      };

      //click on home work plan
      cy.contains(selector.workplan, 'Work Plan').click();
      cy.wait(5000);

      cy.document().then((doc) => {
        const elements = doc.querySelectorAll(
          '.rct-item.mosaic-project-schedule-bar'
        );

        if (elements.length > 0) {
          // pick a random element
          const randomIndex = Math.floor(Math.random() * elements.length);
          const randomElement = elements[randomIndex];

          // wrap this element so Cypress can act on it
          cy.wrap(randomElement)
            .find('.ThreeDotMenu__Menu-sc-16rcpkf-0.iYIlVr.three-dot-menu')
            .first()
            .click({ force: true });
          cy.wait(2000);

          cy.contains('Delete').click({ force: true });
          cy.wait(3000);

          cy.contains('button', 'Yes').click({ force: true });
          cy.wait(3000);
        } else {
          cy.log('NO work plans for this user');
        }
      });
    });
  });
});
