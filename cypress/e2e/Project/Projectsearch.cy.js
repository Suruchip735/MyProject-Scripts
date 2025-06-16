import { login } from '../../support/Login';

describe('Search Project - Redirect Detail Page', () => {
  const selector = {
    Project:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    SelectProject:
      '#root > div > div.home-side > div > div > div > div > div.ProjectFilter__FilterStyles-sc-byoj1v-0.bzTZoR > div > div.variable-size-list > div > div:nth-child(3) > div > div.styles__InnerDropdownOption-sc-3rt6x5-28.ProjectRow__RowInfo-sc-17zwnx2-5.cfVYtZ.gHxOQM > div.ProjectRow__ProjectInfo-sc-17zwnx2-2.jmJJxM > div.styles__StyledProjectTitle-sc-194g64u-4.ProjectRow__ProjectTitle-sc-17zwnx2-8.fYivGv.caRCFM', //PlayBox Project name
    Task: '[href="/flagon/members/members/views/member/13064/view/tasks"]',
    TaskDescription: '#task-description-field-ungrouped',
    collapseAll: '[data-testid="collapse-all"]',
    SearchInput:
      '#root > div > div.home-side > div > div > div > div > div.ProjectsSidebar__CustomHeaderContainer-sc-hzelzc-3.bUJpsJ > div.ProjectsSidebar__StyledSearchContainer-sc-hzelzc-6.cmysdn > input',
    ProjectListItem: '.ProjectRow__ProjectTitle-sc-17zwnx2-8', // Generic project name selector
  };

  const ProjectList = ['SwiftNote', 'PlayBox', 'myCookApp', 'Frost Echo'];

  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.log('APP_DOMAIN:', appDomain);

    // Visit the site
    cy.visit(appDomain);
  });
  it('should log in successfully with valid credentials and search project redirect to Project detail Page', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    //Perfom Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'), // This should be the text on the Continue button (e.g., "Continue")
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible'); // or some unique element
    cy.wait(10000);

    //Click on the side Menu Project Option
    cy.get(selector.Project).click({ force: true });

    // cy.get('#root > div > div.home-side > div > div > div > div > div.ProjectsSidebar__CustomHeaderContainer-sc-hzelzc-3.bUJpsJ > div.ProjectsSidebar__StyledSearchContainer-sc-hzelzc-6.cmysdn > input').click().type('Po');
    // cy.wait(3000);

    // Pick a random project from the list
    const randomIndex = Math.floor(Math.random() * ProjectList.length);
    const selectedProject = ProjectList[randomIndex];
    cy.log(`Selected Project: ${selectedProject}`);

    // Type selected project in search box
    cy.get(selector.SearchInput).click().clear().type(selectedProject);
    cy.wait(2000);

    // Click on the matched project in the dropdown/list
    cy.get(selector.ProjectListItem)
      .contains(selectedProject)
      .should('be.visible')
      .click({ force: true });

    cy.get('[data-testid="sidebar-menu-projects-btn"]').click();
  });
});
