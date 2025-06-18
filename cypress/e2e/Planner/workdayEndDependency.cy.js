import { login } from '../../support/login';

describe('Planner - Create Planner Workday End Date Dependency', () => {
  // Element selectors for reusability and readability
  const selector = {
    planner: '[data-testid="planner-navbutton"]',
    project:
      '.ProjectGroupRenderer__StyledProjectContainer-sc-1f1xvkz-5.kMnexI',
    member: '.MemberGroupRenderer__MemberTooltipContainer-sc-qgfkme-18.dhALnX',
    selectPhase: '[data-testid="select-phase-button"]',
    phaseList:
      '[style="position: absolute; left: 0px; top: 0px; height: 64px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .styles__ItemRowContainer-sc-18itbsl-0 > .styles__ContentContainer-sc-18itbsl-1 > .PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1 > .PhaseItemRow__MiddleRow-sc-1jx574o-4',
    percent: 'input[name="workday_percent"]',
    workday: 'input[name="work_days"]',
    LockIcon: '.NumberField__EndAdornment-sc-197e418-5.boWnvT',
    endDateDependency: '[data-testid="end-date-dependency-icon-button"]',
    createButton: 'button:contains("Create")',
  };

  beforeEach(() => {
    // Load the application URL from environment variable
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);
    cy.visit(appDomain);
  });

  it('should log in and create a plan in Planner with locked Workday and end date dependency', () => {
    cy.viewport(1920, 1080); // Set screen resolution

    // 🔐 Login using credentials from .env
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000); // Wait for login to complete and dashboard to load

    // 📘 Navigate to Planner
    cy.wait(4000);
    cy.get(selector.planner).click({ force: true });

    // 📁 Select a project
    cy.wait(8000);
    cy.get(selector.project).first().click({ force: true });

    // 👤 Select a member
    cy.wait(4000);
    cy.get(selector.member).first().click({ force: true });

    // 📅 Select a random availability bucket
    cy.wait(5000);
    cy.get('.rct-hl.rct-hl-even')
      .eq(1)
      .within(() => {
        cy.get('.styles__BucketValue-sc-3rt6x5-69.bMJFpM.regular-bucket').then(
          ($boxes) => {
            const randomIndex = Math.floor(Math.random() * $boxes.length);
            cy.wrap($boxes[randomIndex]).click({ force: true });
          }
        );
      });

    // 📌 Open phase selector
    cy.wait(3000);
    cy.get(selector.selectPhase).click({ force: true });

    // ✅ Select a non-archived phase
    cy.wait(4000);
    cy.get(selector.phaseList)
      .filter((i, el) => {
        const tooltip = el.getAttribute('data-tooltip-content');
        return !tooltip || tooltip !== 'An archived Phase cannot be selected';
      })
      .then(($valid) => {
        if ($valid.length > 0) {
          const index = Math.floor(Math.random() * $valid.length);
          cy.wrap($valid[index]).click({ force: true });
        } else {
          throw new Error('No valid phases to select');
        }
      });

    // 🔢 Utility to generate random integers
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 🔣 Fill % per day
    cy.wait(3000);
    cy.get(selector.percent).clear().type('30');
    cy.wait(2000);

    // 🕐 Fill Daily Hours with random value
    cy.get('input[name="daily_hours"]')
      .clear()
      .type(getRandomInt(1, 10).toString());

    // 🔒 Lock % per day
    cy.get(selector.LockIcon).eq(2).click({ force: true });
    cy.wait(1000);

    // 📆 Enable End Date Dependency
    cy.get(selector.endDateDependency).click({ force: true });

    // 🗓️ Enter number of workdays
    cy.wait(2000);
    cy.get(selector.workday).clear().type('3');

    // 🔐 Lock Workdays (2nd lock icon)
    cy.get('.NumberField__CellContainer-sc-197e418-7.gIiHsD.roundedRight')
      .find('.NumberField__EndAdornment-sc-197e418-5')
      .eq(1)
      .click();
    cy.wait(2000);

    // ✅ click on create button
    cy.get(selector.createButton).click({ force: true });
    cy.wait(3000);
  });
});
