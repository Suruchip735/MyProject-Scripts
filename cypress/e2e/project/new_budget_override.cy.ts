import { login } from '../../support/login';

// This file is a part of the CYpress end-to-end tests for overriding project budget
describe('Project Budget Override', () => {
  it(
    'Verify that the Budget Table correctly displays overridden values',
    { tags: ['@TESC-4398'] },
    () => {
      const selectors = {
        projectIcon:
          '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        myProjects: '[data-testid="My Projects"]',
        myProjectsBlock:
          '[data-testid^="row-project"][data-testid$="projects-sidebar"]',
        myProjectsRow: '.ProjectRow__ProjectInfo-sc-17zwnx2-2',
        budgettab: '#budget-tab',
        edtBudgetBtn: '.fEsFcE',
        homeBtn:
          '[data-testid="sidemenu-home"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        homeAddBtn: '[data-testid="quick-actions-plus-button"]',
        homeNewProject: '[data-testid="quick-actions-new-project"]',
        createPortfolio:
          '.BoardCreateButton__StyledBoardCreateButton-sc-11v1r1o-1',
        newPortfolioInput: '.form-board-name',
        newPrjTitleInp:
          '.AddEditProjectForm__ProjectNameContainer-sc-shiuev-0 > .AddEditProjectForm__InputFieldContainer-sc-shiuev-4 > input',
        createPrjBtn: '.PrimaryButton-sc-63kr8k-0',
        createPortfolioBtn:
          '.ButtonBase-sc-19vaecp-0.PrimaryButton-sc-63kr8k-0.AddEditBoardForm__SaveButton-sc-9bmej6-2',
        phaseDeleteConfirm: '[data-testid="confirm-modal-confirm-btn"]',
        phaseInfo: '.td.table-cell.phaseRow.target',
        firstPhaseBudget: '.BudgetCell__StyledTarget-sc-w10i05-1',
        feeInput: '[data-testid="phase-modal-fee-input"]',
        budgetWithDropDown:
          '.PhaseBudgetWithDropdown__BudgetWithDropdownToggle-sc-qfoibz-2',
        useEnteredBgt:
          '[data-testid="phase_estimate"] > .PhaseBudgetWithDropdown__BudgetWithDropdownItem-sc-qfoibz-0 > .PhaseBudgetWithDropdown__StyledLabel-sc-qfoibz-4',
        percentInput: '[data-testid="phase-modal-est-percentage-input"]',
        budgetField: '[data-testid="phase-modal-est-cost-input"]',
        saveBtn: '[data-testid="phase-modal-submit-btn"]',
        phaseDeleteBtn:
          '.styles__TextButton-sc-1lvufti-0.styles__TextButtonWithBorder-sc-1lvufti-1.styles__DeleteButton-sc-kqk2xw-31',
        phaseDelConfModal: '.styles__ModalHeaderText-sc-1moexqj-1',
        phaseDelBtnModal: '[data-testid="confirm-modal-confirm-btn"]',
      };

      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('BUTTON'),
        Cypress.env('LOGIN_PASSWORD')
      );

      // Function to check if portfolio exists or not otherwise create a new portfolio and project

      function checkPortfolios() {
        // Click on home button
        cy.get(selectors.homeBtn).dblclick();

        // Click on Add button
        cy.get(selectors.homeAddBtn).click();

        // Click on New project option
        cy.get(selectors.homeNewProject).click();

        // Check if public portfolio exists
        cy.get('body').then(($body) => {
          const selector =
            '.BoardSelectMenu__BoardItemContents-sc-aholn7-6.cvVGdF.board-item-contents';

          if ($body.find(selector).length > 0) {
            let found = false;

            cy.get(selector)
              .each(($el) => {
                const text = $el.text().trim();
                if (
                  text !== 'New Portfolio' &&
                  text !== 'Home (Personal Project)'
                ) {
                  found = true;
                }
              })
              .then(() => {
                if (found) {
                  cy.log('✅ Public Portfolios exists. Creating project ');
                  cy.get(selector)
                    .filter((index, el) => {
                      const text = Cypress.$(el).text().trim();
                      return (
                        text !== 'New Portfolio' &&
                        text !== 'Home (Personal Project)'
                      );
                    })
                    .filter(':visible')
                    .first()
                    .click();

                  const randomNumber = Math.floor(
                    1000000 + Math.random() * 9000000
                  );
                  cy.get(selectors.newPrjTitleInp).type(
                    `QA Project - ${randomNumber}`
                  );
                  cy.get(selectors.createPrjBtn).click();
                }
                // Creating new portfolio as no public portfolios found
                else {
                  cy.log(
                    'ℹ️ Only New Portfolio and Home (Personal Projects) found. Creating public portfolio'
                  );
                  cy.get(selectors.createPortfolio).click();

                  const randomNumber1 = Math.floor(
                    1000000 + Math.random() * 9000000
                  );
                  cy.get(selectors.newPortfolioInput).type(
                    `QA Project - ${randomNumber1}`
                  );
                  cy.contains(selectors.createPortfolioBtn)
                    .contains('Create')
                    .click();

                  cy.get(selector)
                    .filter((index, el) => {
                      const text = Cypress.$(el).text().trim();
                      return (
                        text !== 'New Portfolio' &&
                        text !== 'Home (Personal Project)'
                      );
                    })
                    .filter(':visible')
                    .first()
                    .click();

                  const randomNumber = Math.floor(
                    1000000 + Math.random() * 9000000
                  );
                  cy.get(selectors.newPrjTitleInp).type(
                    `QA Project - ${randomNumber}`
                  );
                  cy.get(selectors.createPrjBtn).click();
                }
              });
          } else {
            cy.log('❌ No project elements found at all');
          }
        });
      }

      // Function to delete all phases till the default phase is found

      function deleteAllPhases() {
        cy.get('body').then(($body) => {
          const hasPhase =
            $body.find('.Phase__PhaseInfoContainer-sc-1ry0w7e-3.hbpitS')
              .length > 0;
          const hasProjectTotal =
            $body.find('.Phase__TotalText-sc-1ry0w7e-1.jQYOIg').length > 0;

          // If Project Total is displayed then consider all phases are deleted
          if (hasProjectTotal) {
            cy.get('.Phase__TotalText-sc-1ry0w7e-1.jQYOIg')
              .should('be.visible')
              .then(() =>
                cy.log('All phases deleted (Project Total is visible).')
              );
            // If phases exists then delete all phase till default phase appears
          } else if (hasPhase && !hasProjectTotal) {
            cy.get('.Phase__PhaseInfoContainer-sc-1ry0w7e-3.hbpitS')
              .should('be.visible')
              .then(() => {
                // Click on phase info for first phase
                cy.get(selectors.phaseInfo).first().click();
                cy.wait(2000);
                cy.log('Clicking on delete');

                // Click on delete button
                cy.get(selectors.phaseDeleteBtn).click({ force: true });

                cy.wait(2000);
                cy.log('Waiting for confirm modal');

                // Check if the delete confirmation modal is displayed
                cy.get(selectors.phaseDelConfModal, {
                  timeout: 10000,
                })
                  .should('be.visible')
                  .then(() => {
                    // Click on confirm delete button
                    cy.get(selectors.phaseDelBtnModal).click({
                      force: true,
                    });
                    cy.log('Deleted one phase. Checking for more...');
                    cy.wait(5000).then(() => deleteAllPhases());
                  });
              });
          } else {
            cy.log('No more phases found.');
          }
        });
      }

      // ---------- Main Test Flow ----------
      cy.log('Testing case 1');

      // Click on Project icon
      cy.get(selectors.projectIcon).click();
      cy.wait(3000);

      // Click on My Projects
      cy.get(selectors.myProjects).click({ force: true });

      // Click on first project from My Projects
      cy.get(selectors.myProjectsBlock)
        .first()
        .find(selectors.myProjectsRow)
        .click({ force: true });
      cy.wait(3000);

      // Click again on project icon to close the projects sidebar
      cy.get(selectors.projectIcon).click();
      cy.wait(3000);

      // Check if public project is selected
      cy.get('body').then(($body) => {
        if ($body.find('#budget-tab').length > 0) {
          cy.log('Public project selected.');
          cy.get(selectors.budgettab).click();
          cy.get(selectors.edtBudgetBtn).click();
          cy.wait(2500);

          // Check if phases exists or not
          cy.get('body').then(($body) => {
            if (
              $body.find('.Phase__PhaseInfoContainer-sc-1ry0w7e-3.hbpitS')
                .length > 0
            ) {
              cy.log('✅ Phases exist');

              // Check if the phase contains budget or not
              cy.get(selectors.firstPhaseBudget)
                .eq(1)
                .invoke('text')
                .then((text) => {
                  if (text.trim().startsWith('$0')) {
                    cy.log('No budget added');
                    cy.get(selectors.phaseInfo).first().click();

                    // Generating random integer value for Fee input  between  1000 to 2000
                    const randomValue =
                      Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
                    cy.get(selectors.feeInput)
                      .clear()
                      .type(randomValue.toString());

                    // Generating random integer value for percentage input betweeen 10 to 100
                    const randomPercentage =
                      Math.floor(Math.random() * (100 - 10 + 1)) + 10;

                    // Click on Budeget with dropdown
                    cy.get(selectors.budgetWithDropDown).click();

                    // Click on use Entered budget option
                    cy.get(selectors.useEnteredBgt).click();

                    // Type generated value for percentage field
                    cy.get(selectors.percentInput)
                      .should('exist')
                      .clear()
                      .type(randomPercentage.toString());

                    // Generating random integer value between 1000 to 500 for budget field
                    const randomCost =
                      Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

                    // Type this generated value in budget field input
                    cy.get(selectors.budgetField)
                      .clear()
                      .type(randomCost.toString());

                    // Click on Save button
                    cy.get(selectors.saveBtn).click();

                    // Click on phase info modal for first phase
                    cy.get(selectors.phaseInfo).first().click();

                    // Generating random values between 1000 to 2000 for fee input
                    const randomValue1 =
                      Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
                    cy.get(selectors.feeInput)
                      .clear()
                      .type(randomValue1.toString());

                    // Generating random values between 1 to 100 for percentage  input

                    const randomPercentage1 =
                      Math.floor(Math.random() * (100 - 10 + 1)) + 10;
                    cy.get(selectors.percentInput)
                      .clear()
                      .type(randomPercentage1.toString());

                    // Generating random values between 1000 to 5000 for budget field input

                    const randomCost1 =
                      Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

                    // Type generated value in budget field input
                    cy.get(selectors.budgetField)
                      .clear()
                      .type(randomCost1.toString());

                    // Click on save button
                    cy.get(selectors.saveBtn).click();

                    // Calling function to delete all phases till the default phase is found
                    deleteAllPhases();
                  } else {
                    cy.log('❌ No phases found');
                  }
                });
            } else {
              cy.log(
                'No public projects available. Creating new public project'
              );

              // Calling function to create new project
              checkPortfolios();

              // Click on Budget tab
              cy.get(selectors.budgettab).click();

              // Click on edit budget button
              cy.get(selectors.edtBudgetBtn).click();

              // Calling function to delete phases till the default phase is found
              deleteAllPhases();
            }
          });
        }
      });
    }
  );
});
