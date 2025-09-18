import { login } from '../../support/login';
describe('Projects - Manage Project Members Modal - Add Members(Group by, filter) ', () => {
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
    userAvatarIcon: '.styledComponents__Initials-sc-tmkfvh-26',
    orgSettings:
      '[data-tooltip-id="app-tooltip"] > .Menu__MenuItemPart-sc-6fjgt9-7',
    orgSettingsSideMemOption: '[data-testid="integration-sidebar-Members"]',
    memModalCancelBtn: '[data-testid="cancel-button"]',
    memCollapseIcon: '[data-testid="collapse-all"]',
    orgSettingsBack: '.styles__StyledNavTextNavItem-sc-xxn0d4-0',
  };
  it('Step 1 - Access Member Modal', { tags: ['@TESC-25888'] }, () => {
    // Perform Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('BUTTON'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Click on Projects from the side menu
    cy.get(selector.projectIcon).click();
    // cy.wait(3000);

    // Click on My Projects
    cy.get(selector.myProjects).click({ force: true });

    // Select first project from My Projects
    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    cy.get(selector.projectIcon).click();

    // Click on project member display count to open member modal
    cy.get(selector.memberCountIcon).click();

    // Click on done button
    cy.get(selector.memberModalDOne).click();

    cy.log('Step 1 Completed - Access Memeber Modal');
    //----------------Case:-2 Search for guests and contractor------------------------

    // Click on user avatar icon
    cy.get(selector.userAvatarIcon).click();

    // Go to org Settings
    cy.get(selector.orgSettings).click();

    // Click on Members in the side menu
    cy.get(selector.orgSettingsSideMemOption).click();

    // Click on collapse all icon
    cy.get(selector.memCollapseIcon).click();

    // Expand project guests
    cy.get('.styles__StyledTableRow-sc-bgjgwa-1')
      .contains('PROJECT GUESTS')
      .parents('.styles__StyledTableRow-sc-bgjgwa-1')
      .find('.collapse')
      .click();

    let prjGuest = '';
    // Select a member from the list of guests users
    cy.get('.MemberManagementTable__StyledTableContainer-sc-19gppl4-0.bwvgkM')
      .find('.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.Member.closed')
      .first()
      .find('.BaseCard__StyledInfoContainer-sc-1pc4xsd-1.jLxsPq')
      .invoke('text')
      .then((text) => {
        prjGuest = text.trim();
        cy.log('Guest member selected:', prjGuest);
      });

    // Click to go back on Home
    cy.get(selector.orgSettingsBack).click();
    cy.wait(2000);
    // Click on projects from the side menu
    cy.get(selector.projectIcon).click();

    // Select first project from My Projects
    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    //Click on project icon again to close project sidebar
    cy.get(selector.projectIcon).click();

    // Click on project member display count to open member modal
    cy.get(selector.memberCountIcon).click();

    // Click on + Add member
    cy.get(selector.plusAddMember).click();

    // Loop to check search for guest users
    cy.get('[class^="SharedNonMembershipsTable__StyledTable"]').then(
      ($table) => {
        const rows = $table.find('styles__StyledTableRow');
        cy.get('.search-text').type(prjGuest);

        if (rows.length === 0) {
          cy.log(
            'No guest members displayed.Searching for external contractors '
          );

          cy.wait(2000);
          cy.get('.search-text').clear();
        } else {
          cy.log('Error! Guest users  found.');
          assert.fail('Guest users are also listed. Aborting test.');
        }

        // Click on canel button
        cy.get(selector.memModalCancelBtn).click();

        // Click on done button
        cy.get(selector.memberModalDOne).click();

        // Loop to check search for external contractors

        // Click on user avatar icon
        cy.get(selector.userAvatarIcon).click();

        // Click on org settings
        cy.get(selector.orgSettings).click();

        // Click on members
        cy.get(selector.orgSettingsSideMemOption).click();

        // Click on collapse all icon
        cy.get(selector.memCollapseIcon).click();

        // Expand External Contractors
        cy.get('.styles__StyledTableRow-sc-bgjgwa-1')
          .contains('PROJECT CONTRACTORS')
          .parents('.styles__StyledTableRow-sc-bgjgwa-1')
          .find('.collapse')
          .click();

        // Select external members from Org Settings - Members
        let extMember = '';

        //Code to extract external member's name form Org Settings
        cy.get(
          '.MemberManagementTable__StyledTableContainer-sc-19gppl4-0.bwvgkM'
        )
          .find('.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.Member.closed')
          .first()
          .find('.BaseCard__StyledInfoContainer-sc-1pc4xsd-1.jLxsPq')
          .invoke('text')
          .then((text) => {
            extMember = text.trim();
            cy.log('Extracted member selected:', extMember);

            // Click on back button
            cy.get(selector.orgSettingsBack).click();

            // Click on projects from side menu
            cy.get(selector.projectIcon).click();

            // Select first project from my projects
            cy.get(
              '[data-testid^="row-project"][data-testid$="projects-sidebar"]'
            )
              .first()
              .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
              .click({ force: true });

            cy.wait(3000);
            // Click again on Projects icon to collapse sidebar
            cy.get(selector.projectIcon).click();

            // Click on project member display count to open member modal
            cy.get(selector.memberCountIcon).click();
            cy.wait(2000);

            // Click on + add member
            cy.get(selector.plusAddMember).click();

            // Search for selected external user
            cy.get('.search-text').type(extMember);

            cy.wait(3000);

            // Get name for external contractors in from Org Settings - members list
            cy.get(
              '.SharedNonMembershipsTable__StyledTable-sc-7e2he7-0.ggccVE'
            ).then(($extTable) => {
              const extRows = $extTable.find(
                '.BaseCard__StyledMemberCard-sc-1pc4xsd-0.fWnszT.styles__StyledAddableMember-sc-46ftjj-0.gxcseZ'
              );

              if (extRows.length === 0) {
                cy.log('Error! No external contractors found.');
                assert.fail(
                  'External contractors are not listed. Aborting test.'
                );
              } else {
                cy.log('External contractors found. Proceeding with script...');
                cy.get('.search-text').clear();
              }
              // Click on cancel button
              cy.get('[data-testid="cancel-button"]').click();
            });
          });

        //-------------case :3 - Add a member to project ------------------------------------
        cy.log('Step 3: Add members to project');
        // Click on add members button
        cy.get(selector.plusAddMember).click();

        // Check if users are found or not
        cy.get('.SharedNonMembershipsTable__StyledTable-sc-7e2he7-0.ggccVE')
          .find(
            '.styles__StyledTableRow-sc-bgjgwa-1.dRfxrE.tr.memberRow.closed'
          )
          .then(($rows) => {
            if ($rows.length < 0) {
              cy.log('No Users found');
            } else {
              cy.log('Users found');

              // Click + button on first member shown in the list
              cy.get(selector.firstMemAdd).click();

              // Click on done button
              cy.get(selector.AddMemdoneBtn).click();

              cy.log('Selected member is added to the project');

              //---------Case 4 ---- Open Team Builder and group members by portfolio, member'-----------------------------------
              cy.log('Step 4: Opening Team builder');
              // Click on add members button
              cy.get(selector.plusAddMember).click();

              // Click on team builder
              cy.get(selector.teamBuilderBtn).click();

              // Click on Done to exit
              cy.get(selector.teamBuilderDoneBtn).click();

              // Click to 'Group by portfolio
              cy.get('.group-by-icon-container > div').click();

              cy.get(
                '.GroupBysOptionsDropdown__StyledContainer-sc-1hbrxri-0 > .OptionsDropdownV2__StyledDropdown-sc-179w6dy-1 > .OptionsDropdownV2__StyledDropdownMenu-sc-179w6dy-0 > :nth-child(2)'
              ).click();

              // Click to "Group by member"
              cy.get('.group-by-icon-container > div').click();

              cy.get(
                '.GroupBysOptionsDropdown__StyledContainer-sc-1hbrxri-0 > .OptionsDropdownV2__StyledDropdown-sc-179w6dy-1 > .OptionsDropdownV2__StyledDropdownMenu-sc-179w6dy-0 > :nth-child(1)'
              ).click();

              // Click on cancel button
              cy.get('[data-testid="cancel-button"]').click();

              //---- Case 5: Filter member list'-------------------------------------------------

              // Click on + add members button
              cy.get(selector.plusAddMember).click();

              // Click on filter button
              cy.get(selector.memfilterBtn).click();

              cy.log('Filtering members using department ');

              // Filter using department
              cy.get(selector.departmentFilter).click();

              // Done button
              cy.get(selector.filterDoneBtn).click();

              // Click on Department filter floating
              cy.get(selector.filterFloat).click();

              // Check if departments exists
              cy.get('.popover-inner').then(($list) => {
                const options = $list.find(
                  '.styles__StyledListItem-sc-uz02q-7.ezreBE.flyout-list-item-container.currently-selected'
                );
                if (options.length === 0) {
                  cy.log('No filter options found');
                  console.log('No filter options found');
                } else {
                  cy.log(`Found ${options.length} Departments(s)`);

                  // Search first option  in the filter department dropdown
                  cy.get('.variable-size-list')
                    .find(
                      '.SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2.ilsyxN'
                    )
                    .first()
                    .click({ force: true });
                  cy.wait(2000);

                  // Close filter dropdown
                  cy.get(selector.closeDeptFilterDropDown).click();

                  // Click x to remove filter
                  cy.get(selector.removeFilter).click();

                  // Click on filter button
                  cy.get(selector.memfilterBtn).click();

                  // Filter using Disciplines
                  cy.get(selector.disciplineFilterOption).click();

                  // click to close filter dropdown
                  cy.get(selector.filterDoneBtn).click();

                  // Click on filter float
                  cy.get(selector.filterFloat).click();

                  // Check if Disciplines  exists
                  cy.get('.popover-inner').then(($list) => {
                    const options = $list.find(
                      '.styles__StyledListItem-sc-uz02q-7.ezreBE.flyout-list-item-container.currently-selected'
                    );
                    if (options.length === 0) {
                      cy.log('No filter options found');
                      console.log('No filter options found');
                    } else {
                      cy.log(`Found ${options.length} Departments(s)`);

                      // Search first option  in the filter department dropdown
                      cy.get('.variable-size-list')
                        .find(
                          '.SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2.ilsyxN'
                        )
                        .first()
                        .click({ force: true });

                      // Close filter dropdown
                      cy.get(selector.closeDeptFilterDropDown).click();

                      // Click to remove filter
                      cy.get(selector.removeFilter).click();

                      // Filter using office filter
                      cy.get(selector.memfilterBtn).click();

                      // Click office option
                      cy.get(selector.officeFilterOption).click();

                      // Click to close filter dropdown
                      cy.get(selector.filterFloat).click();

                      // Click on filter float
                      cy.get(selector.filterFloat).click();

                      // Check if offices exists
                      cy.get('.popover-inner').then(($list) => {
                        const options = $list.find(
                          '.styles__StyledListItem-sc-uz02q-7.ezreBE.flyout-list-item-container.currently-selected'
                        );
                        if (options.length === 0) {
                          cy.log('No filter options found');
                          console.log('No filter options found');
                        } else {
                          cy.log(`Found ${options.length} Offices(s)`);

                          cy.get('.variable-size-list')
                            .find(
                              '.SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2.ilsyxN'
                            )
                            .first()
                            .click({ force: true });

                          // Close filter dropdown
                          cy.get(selector.closeDeptFilterDropDown).click();

                          // Click x to remove filter
                          cy.get(selector.removeFilter).click();

                          // Filter using role filter

                          // Click on member filter
                          cy.get(selector.memfilterBtn).click();

                          // Click on role filter optionn
                          cy.get(selector.roleFilterOption).click();

                          // Click on role filter float
                          cy.get(selector.filterFloat).click();
                          cy.wait(3000);

                          // Check if roles exists
                          cy.get('.popover-inner').then(($list) => {
                            const options = $list.find(
                              '.styles__StyledListItem-sc-uz02q-7.ezreBE.flyout-list-item-container.currently-selected'
                            );
                            if (options.length === 0) {
                              cy.log('No filter options found');
                              console.log('No filter options found');
                            } else {
                              cy.log(`Found ${options.length} Roles(s)`);
                              // Select first role
                              cy.get('.variable-size-list')
                                .find(
                                  '.SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2.ilsyxN'
                                )
                                .first()
                                .click({ force: true });

                              cy.get(selector.closeDeptFilterDropDown).click();
                              cy.wait(3500);

                              // Close filter dropdown
                              cy.get(selector.closeDeptFilterDropDown).click();

                              // Click x to remove filter
                              cy.get(selector.removeFilter).click();

                              cy.get('[data-testid="cancel-button"]').click();
                              cy.get(selector.memberModalDOne).click();
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
      }
    );
  });
});
