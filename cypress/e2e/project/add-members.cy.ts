import { login } from "../../support/login";
describe('First test suite', () => {
 const selector = {
          projectIcon: '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
          myProjects: '[data-testid="My Projects"]',
          memberCountIcon: '[data-testid="project-member-display-count"]',
          plusAddMember: '.SvgIcon__Svg-sc-vv99ju-0.iNBxYk.icon',
          firstMemAdd: '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 0px; height: 50px; margin: 0px;"] > .add > .SharedAddCell__StyledContainer-sc-9z35hl-0',
          AddMemdoneBtn: '[data-testid="add-done-button"]',
          teamBuilderBtn: '.InviteRow__StyledContainer-sc-19qnagk-0 > .styles__TextButton-sc-1lvufti-0',
          teamBuilderDoneBtn: '.Header__HeaderContainer-sc-kpo3b9-1 > .styles__TextButton-sc-1lvufti-0',
          memfilterBtn: '.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1 > .AddableFilters__StyledAddableFiltersContainer-sc-spe354-2 > .SimpleFilterDropdown__StyledToggleContainer-sc-1pmrt8m-1 > .ButtonBase-sc-19vaecp-0',
          departmentFilter: '[style="position: absolute; left: 0px; top: 0px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3',
          filterDoneBtn: '.styles__StyledHeader-sc-uz02q-1 > .styles__TextButton-sc-1lvufti-0',
          filterFloat: '.filter-dropdown-toggle-label',
          filterDeptInput: '[data-testid="flyout-search-input"]',
         searchfilterInput: '[data-testid="flyout-search-input"]',
         searchFilterResult: '.SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3',
         closeDeptFilterDropDown:'.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1',
         removeFilter: '.AddableFilters__DeleteIconContainer-sc-spe354-3',
         disciplineFilterOption: '[style="position: absolute; left: 0px; top: 48px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2',
         officeFilterOption: '[style="position: absolute; left: 0px; top: 96px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3',
         roleFilterOption: '[style="position: absolute; left: 0px; top: 144px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3',
         memberModalDOne: '[data-testid="close-modal-icon"]'


 };
  it('Step 1 - Access Member Modal',
    { tags: ['@TESC-25888']},
    () => {
    // Perform Login
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('BUTTON'),
      Cypress.env('LOGIN_PASSWORD')
    );

    //Click on Projects from the side menu 
    cy.get(selector.projectIcon).click();
    cy.wait(3000);

    //Click on My Projects 
    cy.get(selector.myProjects).click({ force: true });

    //Select first project from My Projects 
    cy.get('[data-testid^="row-project"][data-testid$="projects-sidebar"]')
      .first()
      .find('.ProjectRow__ProjectInfo-sc-17zwnx2-2')
      .click({ force: true });

    cy.wait(3000);
    cy.get(selector.projectIcon).click();
    cy.wait(3000);

    //Click on project member display count to open member modal 
    cy.get(selector.memberCountIcon).click()
    cy.wait(2000)

    //Click on done button 
    cy.get(selector.memberModalDOne).click()
    
    cy.log("Step 1 Completed - Access Memeber Modal")
  //----------------Case:-2 Search for guests and contractor------------------------

    const guestName_Email = [
      { key: "Praj Guest11", value: "prajguest11@yopmail.com" },
      { key: "pj_guest pGuest", value: "pj_guest@yopmail.com" }
    ];

//    const memberPair = guestName_Email[Math.floor(Math.random() * guestName_Email.length)];
const memberPairObj = guestName_Email[
      Math.floor(Math.random() * guestName_Email.length)
    ] || { key: 'Random', value: 'random@yopmail.com' };
    cy.log ("Case 2 - Search for guests and contractor")
    
    // Click on Member Modal  
    cy.get(selector.memberCountIcon).click();
    
    //Click on + Add member on member modal 
    cy.get(selector.plusAddMember).click();

    //Loop to check search for guest users 
    cy.get('[class^="SharedNonMembershipsTable__StyledTable"]').then(($table) => {
      const rows = $table.find('div');
    cy.get('.search-text').type(memberPairObj.key);

      if (rows.length === 0) {
        cy.log('No guest members displayed.Searching for external contractors ');
        //cy.get('.search-text').type(memberPair.key);
        cy.wait(2000);
        cy.get('.search-text').clear(); 
      }
      else{
            cy.log('Error! Guest users  found.');
            assert.fail('Guest users are also listed. Aborting test.');
      }
    // Loop to check search for external contractors
        const extMember = ['Contractor Project', 'Niki External', 'Praj Ext'];
       
        const extRandom = extMember[Math.floor(Math.random() * extMember.length)] || 'Niki External';
        cy.get('.search-text').type(extRandom);
        cy.wait(3500);

        cy.get('.SharedNonMembershipsTable__StyledTable-sc-7e2he7-0.ggccVE').then(($extTable) => {
          const extRows = $extTable.find('div');

          if (extRows.length === 0) {
            cy.log('Error! No external contractors found.');
            assert.fail('External contractors are not listed. Aborting test.');
          } else { 
            cy.log('External contractors found. Proceeding with script...');
            cy.get('.search-text').clear();
          }
          //Click on cancel button
          cy.get('[data-testid="cancel-button"]').click()
          //cy.get(selector.memberModalDOne).click()
        });
      }
      
     ); 

 //-------------case :3 - Add a member to project ------------------------------------
    cy.log("Step 3: Add members to project")
    //Click on add members button 
    cy.get(selector.plusAddMember).click()
    
    //Click + button on first member shown in the list 
    cy.get(selector.firstMemAdd).click()
    cy.wait(3000)
      
      //Click on done button 
      cy.get(selector.AddMemdoneBtn).click()
      cy.wait(3300);
     cy.log("Selected member is added to the project")

 //---------Case 4 ---- Open Team Builder and group members by portfolio, member'-----------------------------------
cy.log("Step 4: Opening Team builder")
    //Click on add members button 
    cy.get(selector.plusAddMember).click();

     //Click on team builder 
      cy.get(selector.teamBuilderBtn).click()
      cy.wait(6500);

      //Click on Done to exit
      cy.get(selector.teamBuilderDoneBtn).click()

       //Click to 'Group by portfolio
      cy.get('.group-by-icon-container > div').click()
      cy.wait(3000); 
      cy.get('.GroupBysOptionsDropdown__StyledContainer-sc-1hbrxri-0 > .OptionsDropdownV2__StyledDropdown-sc-179w6dy-1 > .OptionsDropdownV2__StyledDropdownMenu-sc-179w6dy-0 > :nth-child(2)').click()
      cy.wait(3500);

      //CLick to "Group by member"
      cy.get('.group-by-icon-container > div').click()
      cy.wait(3000); 
      cy.get('.GroupBysOptionsDropdown__StyledContainer-sc-1hbrxri-0 > .OptionsDropdownV2__StyledDropdown-sc-179w6dy-1 > .OptionsDropdownV2__StyledDropdownMenu-sc-179w6dy-0 > :nth-child(1)').click()
      cy.wait(3500)
     
      //Click on cancel button 
      cy.get('[data-testid="cancel-button"]').click()

 //---- Case 5: Filter member list'-------------------------------------------------
   

    //Click on + add members button 
    cy.get(selector.plusAddMember).click();


  //Click on filter button 
      cy.get(selector.memfilterBtn).click()
      // '.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1 > .AddableFilters__StyledAddableFiltersContainer-sc-spe354-2 > .SimpleFilterDropdown__StyledToggleContainer-sc-1pmrt8m-1 > .ButtonBase-sc-19vaecp-0'

      cy.log("Filtering members using department ")
      //Filter using department 
    cy.get(selector.departmentFilter).click()
      // cy.get('[style="position: absolute; left: 0px; top: 0px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3').click()
      
      //Done button 
      cy.get(selector.filterDoneBtn).click()
      //cy.get('.styles__StyledHeader-sc-uz02q-1 > .styles__TextButton-sc-1lvufti-0').click()

      //Click on Department filter floating 
      cy.get(selector.filterFloat).click()

      cy.log("Filtering members using Sales department ")
      //Search sales in the filter department dropdown  
    cy.get(selector.searchfilterInput).type("Sales")
      //cy.get('[data-testid="flyout-search-input"]').type('Sales')

      // Select Sales options from drop down 
      cy.get(selector.searchFilterResult).click()
      //cy.get('.SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3').click()

      //click to close dropdown 
      cy.get(selector.closeDeptFilterDropDown).click()
      //cy.get('.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1').click()
      cy.wait(4000)

      //Click x to remove filter
      cy.get(selector.removeFilter).click()
      //cy.get('.AddableFilters__DeleteIconContainer-sc-spe354-3').click()

       //Click on filter button 
       cy.get(selector.memfilterBtn).click()
      //cy.get('.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1 > .AddableFilters__StyledAddableFiltersContainer-sc-spe354-2 > .SimpleFilterDropdown__StyledToggleContainer-sc-1pmrt8m-1 > .ButtonBase-sc-19vaecp-0').click()

      cy.log("Filtering members using Discipline filter")
      //Filter using Disciplines
      cy.get(selector.disciplineFilterOption).click()
      //cy.get('[style="position: absolute; left: 0px; top: 48px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2').click()

      //Done button 
      cy.get(selector.filterDoneBtn).click()
      //cy.get('.styles__StyledHeader-sc-uz02q-1 > .styles__TextButton-sc-1lvufti-0').click()

      //Click on Disciplines filter floating 
      cy.get(selector.filterFloat).click() 
      //cy.get('.filter-dropdown-toggle-label').click()

       
      cy.log("Filtering members using Marketing discipline")
      
      //Filter members as per marketing discipline
        cy.get(selector.searchfilterInput).type('Marketing')
      // cy.get('[data-testid="flyout-search-input"]').type('')

      //Click on marketing option 
      cy.get(selector.searchFilterResult).click()
     // cy.get('.SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3').click()
     cy.wait(2000)
    //click to close dropdown 
    cy.get(selector.closeDeptFilterDropDown).click()
    //cy.get('.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1').click()
      cy.wait(4000)

     //Click x to remove filter
     cy.get(selector.removeFilter).click() 
     //cy.get('.AddableFilters__DeleteIconContainer-sc-spe354-3').click()

      //Click on filter button 
      cy.get(selector.memfilterBtn).click()
      //cy.get('.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1 > .AddableFilters__StyledAddableFiltersContainer-sc-spe354-2 > .SimpleFilterDropdown__StyledToggleContainer-sc-1pmrt8m-1 > .ButtonBase-sc-19vaecp-0').click()

      cy.log("FIlter members using office")
      //Filter using offices 
      cy.get(selector.officeFilterOption).click()
      //cy.get('[style="position: absolute; left: 0px; top: 96px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3').click()

     //Done button 
     cy.get(selector.filterDoneBtn).click()
     // cy.get('.styles__StyledHeader-sc-uz02q-1 > .styles__TextButton-sc-1lvufti-0').click()

      //Click on Disciplines filter floating 
      cy.get(selector.filterFloat).click()
      //cy.get('.filter-dropdown-toggle-label').click()

      cy.log("Filter members using Canada - Vancouver office")
       //Filter members as per  office  
      cy.get(selector.searchfilterInput).type('Canada - Vancouver')
       //cy.get('[data-testid="flyout-search-input"]').type('Canada - Vancouver')

      // Click on Canada - Vancouver option 
      cy.get(selector.searchFilterResult).click()
      //cy.get('.SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3').click()

      //click to close dropdown 
      cy.get(selector.closeDeptFilterDropDown).click()
     // cy.get('.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1').click()
      cy.wait(4000)

     //Click x to remove filter
     cy.get(selector.removeFilter).click()
    //cy.get('.AddableFilters__DeleteIconContainer-sc-spe354-3').click()

    //Click on filter button 
    cy.get(selector.memfilterBtn).click()
    //cy.get('.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1 > .AddableFilters__StyledAddableFiltersContainer-sc-spe354-2 > .SimpleFilterDropdown__StyledToggleContainer-sc-1pmrt8m-1 > .ButtonBase-sc-19vaecp-0').click()

     cy.log("Filtering members using roles")

    //CLick to filter by roles 
    cy.get(selector.roleFilterOption).click()
    //cy.get('[style="position: absolute; left: 0px; top: 144px; height: 48px; width: 100%;"] > .styles__StyledItemRowContainer-sc-uz02q-14 > .SimpleFilterDropdown__StyledListItem-sc-1pmrt8m-2 > .SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3').click()

     //Done button 
     cy.get(selector.filterDoneBtn).click()
     // cy.get('.styles__StyledHeader-sc-uz02q-1 > .styles__TextButton-sc-1lvufti-0').click()

      //Click on Roles  filter floating 
      cy.get(selector.filterFloat).click()
      //cy.get('.filter-dropdown-toggle-label').click()

      cy.log("Filtering members as per QA role ")

       //Filter members as per roles   
       cy.get(selector.searchfilterInput).type('QA')
      //cy.get('[data-testid="flyout-search-input"]').type('QA')

      //Click on QA option 
      cy.get(selector.searchFilterResult).click()
      //cy.get('.SimpleFilterDropdown__StyledLabel-sc-1pmrt8m-3').click()

      
      cy.get(selector.removeFilter).click()
      //click to close dropdown 
      cy.get(selector.closeDeptFilterDropDown).click()
      //cy.get('.SharedAddModeHeader__StyledOptionRowContainer-sc-of315d-1').click()
      cy.wait(4000)
  
      cy.get('[data-testid="cancel-button"]').click()
      cy.get(selector.memberModalDOne).click()


    //--------------- Case 6 - Verify suggested members ordering --------------------

    
    //Click on add members button 
   /* cy.get(selector.plusAddMember).click();

    cy.get('.search-text').type('bm');
    */ 
    })
    
  })