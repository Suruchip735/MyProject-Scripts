import { login } from '../../support/login';

describe('Create work plan - Workload module', () => {
  // 🔽 Selectors for commonly used UI elements
  const selector = {
    workload: '[data-testid="workload-navbutton"]',
    Totalavibility: ':nth-child(1) > .styles__TeamMemberCell-sc-3rt6x5-77',
    Member:
      '.MemberGroupRenderer__StyledGroupBodyContainer-sc-qgfkme-11.jNQJGI',
  };

  it('should log in successfully and delete an existing work plan in Workload Page', () => {
    // Set the viewport size for full screen view

    // 🔐 Log in using custom command with env credentials
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // Usually "Continue"
      Cypress.env('LOGIN_PASSWORD')
    );

    // 📘 Click on the "Workload" tab in the sidebar
    cy.get(selector.workload).click();

    // 👤 Select the first member from the list
    cy.get(selector.Member).first().click({ force: true });

    // 🗂️ Try to find existing work plans (bars) for the selected user
    cy.document().then((doc) => {
      const elements = doc.querySelectorAll(
        '.rct-item.mosaic-project-schedule-bar'
      );

      if (elements.length > 0) {
        // 🎯 Pick a random work plan element
        const randomIndex = Math.floor(Math.random() * elements.length);
        const randomElement = elements[randomIndex];

        // ⚙️ Open the three-dot menu for that plan
        cy.wrap(randomElement)
          .find('.ThreeDotMenu__Menu-sc-16rcpkf-0.iYIlVr.three-dot-menu')
          .first()
          .click({ force: true });

        // 🗑️ Click on "Delete" option
        cy.contains('Delete').click({ force: true });

        // ✅ Confirm deletion by clicking "Yes"
        cy.contains('button', 'Yes').click({ force: true });
      } else {
        // ℹ️ Log if no work plans were found for the selected user
        cy.log('NO work plans for this user');
      }
    });
  });
});
