import { login } from '../../support/login';

describe('Planner - Create Planner HRSDAY Lock End Date Dependency', () => {
  // Define all required selectors in one place for reusability and clarity
  const selector = {
    Planner: '[data-testid="planner-navbutton"]',
    Project:
      '.ProjectGroupRenderer__StyledProjectContainer-sc-1f1xvkz-5.kMnexI',
    Member: '.MemberGroupRenderer__MemberTooltipContainer-sc-qgfkme-18.dhALnX',
    SelectPhase: '[data-testid="select-phase-button"]',
    EndDateDependency: '[data-testid="end-date-dependency-icon-button"]',
    LockIcon: '.NumberField__EndAdornment-sc-197e418-5.boWnvT',
  };

  // This block runs before each test
  beforeEach(() => {
    // Get app domain from environment variable
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);
    cy.visit(appDomain);
  });

  it('should log in and create a plan with end date dependency and HRSDAY lock', () => {
    // Set screen resolution
    cy.viewport(1920, 1080);

    // Login using custom function and environment credentials
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    cy.wait(4000);

    // Click on the Planner tab
    cy.get(selector.Planner).click({ force: true });
    cy.wait(4000);

    // Select the first project in the list
    cy.get(selector.Project).first().click({ force: true });
    cy.wait(4000);

    // Select the first team member
    cy.get(selector.Member).first().click({ force: true });

    cy.wait(5000);

    // Get the first even row
    cy.get('.rct-hl.rct-hl-even')
      .eq(1)
      .within(() => {
        // Step 2: Get all the .regular-bucket inside it
        cy.get('.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket').then(
          ($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true });
          }
        );
      });

    // Open phase selector
    cy.get(selector.SelectPhase).click({ force: true });
    cy.wait(5000);

    // Filter and select only non-archived phases
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

    // Helper to generate random number
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Enter Workday Percentage
    cy.get('input[name="workday_percent"]')
      .clear()
      .type(getRandomInt(1, 100).toString());

    //Enter Total Hours
    cy.get('input[name="total_hours"]')
      .clear()
      .type(getRandomInt(1, 50).toString());

    //Enter Daily Hours
    cy.get('input[name="daily_hours"]')
      .clear()
      .type(getRandomInt(1, 10).toString());

    cy.wait(3000);

    // ✅ Add End Date Dependency
    cy.get(selector.EndDateDependency).click({ force: true });
    cy.wait(2000);

    // Optional 🔒 Lock icon for % per day
    cy.get(selector.LockIcon).first().click({ force: true });
    cy.wait(1000);
    cy.get('input[name="work_days"]')
      .clear()
      .type(getRandomInt(1, 20).toString());
    cy.wait(2000);

    // click on create button
    cy.contains('button', 'Create').click();
  });
});
