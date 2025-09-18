import { login } from '../../support/login';

describe('Validate Login Functionality', () => {
  // Element selectors
  const selector = {
    Planner: '[data-testid="planner-navbutton"]',
    Project:
      '.ProjectGroupRenderer__StyledProjectContainer-sc-1f1xvkz-5.kMnexI',
    Member: '.MemberGroupRenderer__MemberTooltipContainer-sc-qgfkme-18.dhALnX',
    SelectPhase: '[data-testid="select-phase-button"]',
  };

  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the application domain before each test
    cy.visit(appDomain);
  });

  it('Validate Login with valid Credentials', () => {
    cy.viewport(1920, 1080);

    // Perform login using environment variables
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Wait for login and page load
    cy.wait(10000);

    // Navigate to 'Planner' tab
    cy.contains('Planner').click({ force: true });
    cy.wait(4000);

    // Click the first project from the list
    cy.get(selector.Project).first().click({ force: true });
    cy.wait(4000);

    // Click the first team member from the list
    cy.get(selector.Member).first().click({ force: true });
    cy.wait(5000);

    // Select a bucket inside the second even row
    cy.get('.rct-hl.rct-hl-even')
      .eq(1)
      .within(() => {
        // Find all regular buckets and click one randomly
        cy.get('.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket').then(
          ($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true });
          }
        );
      });

    // Click on the phase selector dropdown
    cy.get(selector.SelectPhase).click({ force: true });
    cy.wait(5000);

    // Filter and select a non-archived phase randomly
    cy.get(
      '[style="position: absolute; left: 0px; top: 0px; height: 64px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1 > .PhaseItemRow__MiddleRow-sc-1jx574o-4'
    )
      .filter((index, element) => {
        const tooltip = element.getAttribute('data-tooltip-content');
        return !tooltip || tooltip !== 'An archived Phase cannot be selected';
      })
      .then(($validItems) => {
        if ($validItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * $validItems.length);
          cy.wrap($validItems[randomIndex]).click({ force: true });
        } else {
          throw new Error(
            'No valid (non-archived) phases available to select.'
          );
        }
      });

    cy.wait(5000);

    // function to generate a random integer within a range
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Fill form inputs with random values
    cy.get('input[name="workday_percent"]')
      .clear()
      .type(getRandomInt(1, 100).toString());
    cy.wait(3000);

    //Enter Daily Hours
    cy.get('input[name="daily_hours"]')
      .clear()
      .type(getRandomInt(1, 10).toString());
    cy.wait(4000);

    //Enter Total Hours
    cy.get('input[name="total_hours"]')
      .clear()
      .type(getRandomInt(1, 50).toString());
    cy.wait(3000);

    //Enter Work day
    cy.get('input[name="work_days"]')
      .clear()
      .type(getRandomInt(1, 20).toString());
    cy.wait(5000);

    //click on the create button
    cy.contains('button', 'Create').click();
  });
});
