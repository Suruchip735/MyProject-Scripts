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
        selectProject: '[data-testid="select-project-button"]',
        Project:
          '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .ProjectItemRow__ProjectInfoContainer-sc-1t6ma3s-1 > .ProjectItemRow__MiddleRow-sc-1t6ma3s-4',
        Phase:
          '.PhaseItemRow__BaseRow-sc-1jx574o-2.PhaseItemRow__MiddleRow-sc-1jx574o-4.diTXPr.fWQxWc',
      };

      //click on home work plan
      cy.contains(selector.workplan, 'Work Plan').click();
      cy.wait(3000);

      // Click a random date cell inside the selected user's planner row
      cy.get('.workload-row-renderer')
        .eq(1)
        .within(() => {
          // Step 2: Get all the .regular-bucket inside it
          cy.get(
            '.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket'
          ).then(($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click();
          });
        });

      //select Project
      cy.get(selector.selectProject).click();
      cy.wait(3000);

      //select Time off project
      cy.get(selector.Project).click({ force: true });
      cy.wait(3000);

      //select phase
      cy.get(selector.Phase).first().click({ force: true });
      cy.wait(3000);

      // Helper to generate random number
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // Fill form inputs with random values
      cy.get('input[name="workday_percent"]')
        .clear()
        .type(getRandomInt(1, 100).toString());

      cy.get('input[name="daily_hours"]')
        .clear()
        .type(getRandomInt(1, 10).toString());

      cy.get('input[name="total_hours"]')
        .clear()
        .type(getRandomInt(1, 50).toString());

      cy.get('input[name="work_days"]')
        .clear()
        .type(getRandomInt(1, 20).toString());

      cy.wait(5000);

      //click on creat button
      cy.contains('Create').click();
      cy.wait(3000);
    });
  });
});
