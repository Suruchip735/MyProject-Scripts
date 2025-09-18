import { login } from '../../support/login';

describe('Planner - Create Planner Percentage Lock End Date Dependency', () => {
  // Define reusable element selectors
  const selector = {
    Planner: '[data-testid="planner-navbutton"]',
    Project:
      '.ProjectGroupRenderer__StyledProjectContainer-sc-1f1xvkz-5.kMnexI',
    Member: '.MemberGroupRenderer__MemberTooltipContainer-sc-qgfkme-18.dhALnX',
    SelectPhase: '[data-testid="select-phase-button"]',
    PhaseList:
      '[style="position: absolute; left: 0px; top: 0px; height: 64px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1 > .PhaseItemRow__MiddleRow-sc-1jx574o-4',
    EndDateDependency: '[data-testid="end-date-dependency-icon-button"]',
    LockIcon: '.NumberField__EndAdornment-sc-197e418-5.boWnvT',
    CreateButton: 'button:contains("Create")',
  };

  it(
    'should log in and create a plan with end date dependency and percentage lock',
    { tags: ['TESC-0'] },
    () => {
      // Set screen size to full HD

      // Perform login with credentials from environment variables
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'), // Optional parameter, depends on your login function
        Cypress.env('LOGIN_PASSWORD')
      );

      // Wait for the dashboard to load

      // Navigate to the "Planner" section
      cy.get(selector.Planner).click({ force: true });

      // Select the first project in the list
      cy.get(selector.Project).first().click({ force: true });

      // Select the first member in the list
      cy.get(selector.Member).first().click({ force: true });

      // Select a random availability bucket in the schedule timeline
      cy.get('.rct-hl.rct-hl-even')
        .eq(1)
        .within(() => {
          cy.get(
            '.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket'
          ).then(($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true });
          });
        });

      // Open the phase selection popup
      cy.get(selector.SelectPhase).click({ force: true });

      // Select a non-archived phase from the list
      cy.get(selector.PhaseList)
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

      // Utility function to get a random integer within a range
      function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      //Enter Daily Hrs
      cy.get('input[name="daily_hours"]')
        .clear()
        .type(getRandomInt(1, 10).toString());

      //Enter Workday
      cy.get('input[name="work_days"]')
        .clear()
        .type(getRandomInt(1, 20).toString());

      // Fill in % per day and enable "Lock" and "End Date Dependency"
      cy.get('input[name="workday_percent"]')
        .clear()
        .type(getRandomInt(1, 100).toString());

      // Click the lock icon to lock percentage per day
      cy.get(selector.LockIcon).first().click({ force: true });

      // Click the end date dependency icon
      cy.get(selector.EndDateDependency).click({ force: true });

      // clicking "Create" button
      cy.contains('button', 'Create').click();
    }
  );
});
