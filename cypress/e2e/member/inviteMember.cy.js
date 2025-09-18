  import { login } from "../../support/login";

  // Function to generate a random first and last name
  function getRandomName() {
    const firstNames = ['Alice', 'Bob', 'Charlie'];
    const lastNames = ['Smith', 'Johnson', 'Brown'];
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return { first, last };
  }

  describe('Invite members from Member Modal', () => {

  const selector = {
      sideMenuMembers : '[data-testid="sidemenu-members"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
      inviteMemButton: '.InviteMemberButton__StyledButtonText-sc-6rxm7f-1',
      userAvatar : '.styles__StyledNewIcon-sc-p8dqpg-1',
      orgSettings : '[data-tooltip-id="app-tooltip"] > .Menu__MenuItemPart-sc-6fjgt9-7',
      inviteFname: '[data-testid="N-firstNameInput"]',
      inviteLname:  '[data-testid="N-lastNameInput"]',
      inviteEmail: '[data-testid="N-emailInput"]',
      sendInviteBtn : '[data-testid="H-send-invite-button"]',
      cancelBtn: '.styles__TextButton-sc-1lvufti-0', 
      searchInputMember: '.MemberManagementTableHeader__StyledSearchInput-sc-bf4knh-4'
    }
    // Generate random name
      const { first, last } = getRandomName(); 
      // Generate and use a random email
      
      const email = `${first.toLowerCase()}.${last.toLowerCase()}${Date.now()}@yopmail.com`;
      //cy.get(selector.inviteEmail).type(email)

    it('Invite new members to organization from Member Modal', () => {
      // Perform Login
      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('Button'),
        Cypress.env('LOGIN_PASSWORD')
      );
    

      //Click on Members in side menu
      cy.get(selector.sideMenuMembers).click()

      //Click Invite member button 
      cy.get(selector.inviteMemButton).click()

    
      // Check for existing members in the organization 
      cy.get(selector.inviteEmail).type('kemmy@yopmail.com') 
      cy.wait(2000)


      cy.get(selector.inviteFname).then($input => {
        const extFnameval = $input.val() //get the firstname value of existing user
      

      cy.get(selector.inviteLname).then($input1 => {
        const extLname = $input1.val() //get the lastname value for existing user 

      })

        if (extFnameval || extFnameval.trim() === '' && !extLname || extLname.trim() === '') 
          {
            cy.log("User 's already part of inviter's team")
                     cy.get(selector.sendInviteBtn).then(($btn) => {
    $btn[0].addEventListener('click', (e) => e.preventDefault());
  });
            cy.get(selector.sendInviteBtn).click()
            cy.wait(3000)                
            //Click on invite button to invite new member 
            cy.get(selector.inviteMemButton).click() 

            //Type firstname for new user 
            cy.get(selector.inviteFname).type(first)
            
            //Type lastname for new user 
            cy.get(selector.inviteLname).type(last)

            //Type email for new user
            cy.get(selector.inviteEmail).type(email)
          
          
            // ✅ Prevent form default submission
  cy.get(selector.sendInviteBtn).then(($btn) => {
    $btn[0].addEventListener('click', (e) => e.preventDefault());
  });
    // Send invite button 
            cy.get(selector.sendInviteBtn).click()
          }
      
      //Click on user Avatar 
      cy.get(selector.userAvatar).click() 

      // Click on org settings
      cy.get(selector.orgSettings).click()

      //click on Member from side menu
      cy.get('[data-testid="integration-sidebar-Members"]').click()
            
      //Search for the user invited in the search input
      cy.get(selector.searchInputMember).type(email)

      cy.wait(2000)
      
  })
    });
  });
