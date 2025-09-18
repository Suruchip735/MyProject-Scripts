import { login } from '../../support/login';

describe('Validate Login Functionality', () => {
  // Define used element selectors
  const selector = {
    Planner: '[data-testid="planner-navbutton"]',
    Project:
      '.ProjectGroupRenderer__StyledProjectContainer-sc-1f1xvkz-5.kMnexI',
    Member: '.MemberGroupRenderer__MemberTooltipContainer-sc-qgfkme-18.dhALnX',
    SelectPhase: '[data-testid="select-phase-button"]',
  };

  // Runs before each test in the block

  it('Validate Login with valid Credentials', { tags: ['TESC-0'] }, () => {
    // Set viewport size to mimic full HD screen

    // Perform login using environment variables
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // Assuming this is needed for login button
      Cypress.env('LOGIN_PASSWORD')
    );

    // Wait for page and user data to load

    // Navigate to 'Planner' section
    cy.get(selector.Planner).click({ force: true });

    // Click on the first project in the list
    cy.get(selector.Project).first().click({ force: true });

    // Select the first team member
    cy.get(selector.Member).first().click({ force: true });

    // Try to find existing schedule bars (work plans)
    cy.document().then((doc) => {
      const elements = doc.querySelectorAll(
        '.rct-item.mosaic-project-schedule-bar'
      );

      if (elements.length > 0) {
        // Randomly select one work plan to delete
        const randomIndex = Math.floor(Math.random() * elements.length);
        const randomElement = elements[randomIndex];

        // Wrap the selected DOM element to allow Cypress actions
        cy.wrap(randomElement)
          .find('.ThreeDotMenu__Menu-sc-16rcpkf-0.iYIlVr.three-dot-menu')
          .first()
          .click({ force: true });

        // Click on the 'Delete' option
        cy.contains('Delete').click({ force: true });

        // Confirm the delete action
        cy.contains('button', 'Yes').click({ force: true });
      } else {
        // Log message if no work plans are found
        cy.log('NO work plans for this user');
      }
    });

    // Final wait to ensure actions complete
  });
});
