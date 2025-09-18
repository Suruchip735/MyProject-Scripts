import {login} from '../../../../support/login';
describe('MosaicApp Task Delete Test', () => {


  it('should log in successfully, go to tasks page and delete a random task', () => {
    // Set viewport to Full HD resolution
    cy.viewport(1920, 1080);

    // Perform Login 
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

      const selector = {
        TaskSection: '.react-grid-item', // Element containing "Tasks" text
        TaskModalIcon: // Tasks modal icon on the tasks 
          '.styles__TaskIconsContainer-sc-1x862sm-3.styles__StyledTaskIconsContainer-sc-1x862sm-4',
        TaskMenuIcon: '.styles__StyledTaskMoveMenuContainer-sc-1qh66b5-46', // three dot menu in tasks modal 
        DeleteOptionText: // Delete option in the three dot menu in the task modal 
          'span.TaskMoveMenu__StyledSpanText-sc-yh2hlt-0:contains("Delete")',
        ConfirmDeleteButton: 'button[data-testid="confirm-modal-confirm-btn"]', // Confirm button on the confirmation prompt 
      };
      
      

      // Navigate to "Tasks" page
      cy.contains(selector.TaskSection, 'Tasks').click();

      // Check if any tasks exists 
    cy.get('body').then(($body) => {
      if ($body.find(selector.TaskContainer).length > 0) {
        // === Edit the first existing task ===
        cy.get(selector.TaskContainer).first().as('existingTask');

        cy.get('@existingTask').click();

        // If a tasks exists then clear and type new task name
        cy.get('[contenteditable="true"]')
          .first()
          .clear()
          .type(editTaskName)
          .type('{enter}');
          
      }
    })
      // Loop for selecting a random task
      cy.get(selector.TaskModalIcon).then(($modals) => {
        const randomIndex = Math.floor(Math.random() * $modals.length);
        const selectedModal = $modals[randomIndex];

        // Open tasks modal from the selected task 
        cy.wrap(selectedModal).scrollIntoView().click({ force: true }); 

        // Click the on the three dot menu 
        cy.get(selector.TaskMenuIcon).click({ force: true });

        // Click on "Delete" option from menu 
        cy.contains('span', 'Delete')
          .should('be.visible')
          .click({ force: true });

        // Confirm task deletion from the confirmation modal 
        cy.get(selector.ConfirmDeleteButton)
          .should('be.visible')
          .click({ force: true });
        
        //Print error message in the log if task deletion fails 
        cy.get('body').then(($body) => {
          if ($body.text().includes('Something went wrong')) {
            throw new Error(
              'Task deletion failed: "Something went wrong" appeared.'
            );
          }
        });
      });
    });
  });
