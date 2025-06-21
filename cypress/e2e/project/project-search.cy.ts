import { login } from '../../support/login';

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

  it('should log in successfully with valid credentials and search project redirect to Project detail Page', () => {
    // Set viewport to Full HD resolution

    //Perfom Login
    login(
      (Cypress.env('LOGIN_USERNAME') as string) || '',
      (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
      (Cypress.env('LOGIN_PASSWORD') as string) || ''
    );

    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible'); // or some unique element

    //Click on the side Menu Project Option
    cy.get(selector.Project).click({ force: true });

    // cy.get('#root > div > div.home-side > div > div > div > div > div.ProjectsSidebar__CustomHeaderContainer-sc-hzelzc-3.bUJpsJ > div.ProjectsSidebar__StyledSearchContainer-sc-hzelzc-6.cmysdn > input').click().type('Po');

    // Pick a random project from the list
    cy.get("[data-testid*='row-board-']").eq(2).click({ force: true });
    cy.get("[class*='ProjectRow__ProjectTitle']")
      .eq(0)
      .invoke('text')
      .then((text) => {
        const selectedProject = text.trim();
        cy.log(`Selected Project: ${selectedProject}`);

        // Type selected project in search box
        cy.get(selector.SearchInput).click().clear().type(selectedProject);

        // Click on the matched project in the dropdown/list
        cy.get(selector.ProjectListItem)
          .contains(selectedProject)
          .should('be.visible')
          .click({ force: true });

        cy.get('[data-testid="sidebar-menu-projects-btn"]').click();
      });
  });
});
