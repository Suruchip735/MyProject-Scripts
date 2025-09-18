import { login } from '../../support/login';

describe('Search Project - Redirect Detail Page', () => {
  const selector = {
    projectIcon:
      '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
    myProjects: '[data-testid="My Projects"]',
    memberCountIcon: '[data-testid="project-member-display-count"]',
    plusAddMember: '.SvgIcon__Svg-sc-vv99ju-0.iNBxYk.icon',
    firstMemAdd:
      '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 0px; height: 50px; margin: 0px;"] > .add > .SharedAddCell__StyledContainer-sc-9z35hl-0',
    AddMemdoneBtn: '[data-testid="add-done-button"]',
    teamBuilderBtn: 
      '.InviteRow__StyledContainer-sc-19qnagk-0 > .styles__TextButton-sc-1lvufti-0',
    teamBuilderDoneBtn:
      '.Header__HeaderContainer-sc-kpo3b9-1 > .styles__TextButton-sc-1lvufti-0',
    memfilterBtn:
      '.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1 > .AddableFilters__StyledAddableFiltersContainer-sc-spe354-2 > .SimpleFilterDropdown__StyledToggleContainer-sc-1pmrt8m-1 > .ButtonBase-sc-19vaecp-0',
    departmentFilter:
      '[style="position: absolute; left: 0px; top: 0px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3',
    filterDoneBtn:
      '.styles__StyledHeader-sc-uz02q-1 > .styles__TextButton-sc-1lvufti-0',
    filterFloat: '.filter-dropdown-toggle-label',
    filterDeptInput: '[data-testid="flyout-search-input"]',
    searchfilterInput: '[data-testid="flyout-search-input"]',
    searchFilterResult: '.SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3',
    closeDeptFilterDropDown:
      '.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1',
    removeFilter: '.AddableFilters__DeleteIconContainer-sc-spe354-3',
    disciplineFilterOption:
      '[style="position: absolute; left: 0px; top: 48px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2',
    officeFilterOption:
      '[style="position: absolute; left: 0px; top: 96px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3',
    roleFilterOption:
      '[style="position: absolute; left: 0px; top: 144px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3',
    memberModalDOne: '[data-testid="close-modal-icon"]',
    orgSettings:
      '[data-tooltip-id="app-tooltip"] > .Menu__MenuItemPart-sc-6fjgt9-7',
    userAvatarIcon: '.styledComponents__Initials-sc-tmkfvh-26',
  };

  it(
    'should log in successfully with valid credentials and search project redirect to Project detail Page',
    { tags: ['@TESC-0'] },
    () => {
      // Set viewport to Full HD resolution

      //Perfom Login
      login(
        (Cypress.env('LOGIN_USERNAME') as string) || '',
        (Cypress.env('Button') as string) || '', // This should be the text on the Continue button (e.g., "Continue")
        (Cypress.env('LOGIN_PASSWORD') as string) || ''
      );

      cy.get(selector.userAvatarIcon).click();

      cy.get(selector.orgSettings).click();

      cy.get('[data-testid="integration-sidebar-Members"]').click();

      cy.get('[data-testid="collapse-all"]').click();

      cy.get('.styles__StyledTableRow-sc-bgjgwa-1')
        .contains('PROJECT GUESTS')
        .parents('.styles__StyledTableRow-sc-bgjgwa-1')
        .find('.collapse')
        .click();

      /*  cy.get('.MemberManagementTable__StyledTableContainer-sc-19gppl4-0.bwvgkM')
        .find('.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.Member.closed')
        .first()
        .click();
*/ let extMember = '';

      cy.get('.MemberManagementTable__StyledTableContainer-sc-19gppl4-0.bwvgkM')
        .find('.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.Member.closed')
        .first()
        .find('.BaseCard__StyledInfoContainer-sc-1pc4xsd-1.jLxsPq')
        .invoke('text')
        .then((text) => {
          extMember = text.trim();
          cy.log('Extracted member selected:', extMember);

          //Org Settings back button
          cy.get('.styles__StyledNavTextNavItem-sc-xxn0d4-0').click();
          
          cy.get(selector.projectIcon).click();

          cy.get(selector.myProjects).click();

          //Select first project from My Projects
          cy.get(
            '[data-testid^="row-project"][data-testid$="projects-sidebar"]'
          )
            .first()
            .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
            .click({ force: true });

          cy.wait(3000);
          cy.get(selector.projectIcon).click();
          cy.wait(3000);

          //Click on project member display count to open member modal
          cy.get(selector.memberCountIcon).click();
          cy.wait(2000);

          cy.get(selector.plusAddMember).click();

          cy.get('.search-text').type(extMember);
        });
    }
  );
});

//projects
/* cy.get(selector.projectIcon).click();

      //my projects
      cy.get(selector.myProjects).click();

      //Select first project from My Projects
      cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
        .first()
        .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
        .click({ force: true });

      cy.wait(3000);
      cy.get(selector.projectIcon).click();
      cy.wait(3000);
      cy.get(selector.memberCountIcon).click();

      //plus button
      cy.get(selector.plusAddMember).click();


      /*
      //Check if users are found
      cy.get('.SharedNonMembershipsTable__StyledTable-sc-7e2he7-0.ggccVE')
        .find('.styles__StyledTableRow-sc-bgjgwa-1.dRfxrE.tr.memberRow.closed')
        .then(($rows) => {
          if ($rows.length < 0) {
            cy.log('No Users found');
          } else {
            cy.log('Users found');
            //Click + button on first member shown in the list
            cy.get(selector.firstMemAdd).click();
            cy.wait(3000);

            //Click on done button
            cy.get(selector.AddMemdoneBtn).click();
            cy.wait(3300);
            cy.log('Selected member is added to the project');
*/
/*  cy.get(selector.memfilterBtn).click();
      cy.get(selector.departmentFilter).click();
      cy.get(selector.filterDoneBtn).click();
      cy.get(selector.filterFloat).click();

      cy.get('.popover-inner').then(($list) => {
        const options = $list.find(
          '.styles__StyledListItem-sc-uz02q-7.ezreBE.flyout-list-item-container.currently-selected'
        );
        if (options.length === 0) {
          cy.log('No filter options found');
          console.log('No filter options found');
        } else {
          cy.log(`Found ${options.length} filter option(s)`);
          console.log(`Found ${options.length} filter option(s)`);
          */
