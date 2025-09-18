import { login } from '../../support/login';

describe('MosaicApp Login Test', () => {
  it('should log in successfully and create dashboard', () => {
    cy.viewport(1920, 1080);

    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Step 2: Now you're redirected to the main app domain
    // You must use cy.origin again for the app
      const Title = [
        'FedEx',
        'UPS',
        'DHL Express',
        'Maersk Line',
        'DB Schenker',
        'XPO Logistics',
        'C.H. Robinson',
        'J.B. Hunt Transport Services',
        'Kuehne Nagel',
        'Ryder System, Inc.',
      ];

      const Description = [
        'This is for testing',
        'Final Dashboard',
        'Lorem Ipsum has been the industry',
        'It is a long established fact that a reader will be distracted by',
        'Various versions have evolved over the years...',
      ];

      const randomTitle = Title[Math.floor(Math.random() * Title.length)]|| 'Random';
      const randomDescription =
        Description[Math.floor(Math.random() * Description.length)]|| 'Random';

      // Wait for the page to fully load
      cy.contains('Dashboard').should('be.visible');
      

      cy.get(
        '[data-testid="sidemenu-dashboard"] > .styledComponents__ImageContainer-sc-tmkfvh-20'
      ).click();

      cy.get('div.options-dropdown').click();

      cy.get(
        'div.options-dropdown.show > div > button:nth-child(1) > div'
      ).click();

      cy.get('[data-testid="dashboard-title-input"]').type(randomTitle);
      cy.get('[data-testid="dashboard-description-input"]').type(
        randomDescription
      );
      cy.get('[data-testid="edit-dashboard-submit-button"]').click();
    });
  });
