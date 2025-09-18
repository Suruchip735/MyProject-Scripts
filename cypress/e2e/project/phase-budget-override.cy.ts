import { login } from '../../support/login';

describe('Project Budget Override', () => {
  it(
    'Verify that the Budget Table correctly displays overridden values',
    { tags: ['@TESC-4398'] },
    () => {
      // Selectors for overriding project budget
      const selectors = {
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
        projectIcon:
          '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        myProjects: '[data-testid="My Projects"]',
        myProjectsBlock:
          '[data-testid^="row-project"][data-testid$="projects-sidebar"]',
        myProjectsRow: '.ProjectRow__ProjectInfo-sc-17zwnx2-2',
        budgettab: '#budget-tab',
        edtBudgetBtn: '.fEsFcE',
        firstPhaseRow:
          '.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.phaseRow.closed',
      };

      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('BUTTON'),
        Cypress.env('LOGIN_PASSWORD')
      );

      function checkPortfolios() {
        cy.get(selectors.homeBtn).dblclick();
        cy.get(selectors.homeAddBtn).click();
        cy.get(selectors.homeNewProject).click();

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
                } else {
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

      function deleteAllPhases() {
        cy.get('body').then(($body) => {
          const hasPhase =
            $body.find('.Phase__PhaseInfoContainer-sc-1ry0w7e-3.hbpitS')
              .length > 0;
          const hasProjectTotal =
            $body.find('.Phase__TotalText-sc-1ry0w7e-1.jQYOIg').length > 0;

          if (hasProjectTotal) {
            cy.get('.Phase__TotalText-sc-1ry0w7e-1.jQYOIg')
              .should('be.visible')
              .then(() =>
                cy.log('All phases deleted (Project Total is visible).')
              );
          } else if (hasPhase && !hasProjectTotal) {
            cy.get('.Phase__PhaseInfoContainer-sc-1ry0w7e-3.hbpitS')
              .should('be.visible')
              .then(() => {
                cy.get(selectors.phaseInfo).first().click();
                cy.wait(2000);
                cy.log('Clicking on delete');

                cy.get(
                  '.styles__TextButton-sc-1lvufti-0.styles__TextButtonWithBorder-sc-1lvufti-1.styles__DeleteButton-sc-kqk2xw-31'
                ).click({ force: true });

                cy.wait(2000);
                cy.log('Waiting for confirm modal');

                cy.get('.styles__ModalHeaderText-sc-1moexqj-1', {
                  timeout: 10000,
                })
                  .should('be.visible')
                  .then(() => {
                    cy.get('[data-testid="confirm-modal-confirm-btn"]').click({
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

      // ---------------------Case 1---------------------------------------
      cy.log('Testing case 1');
      cy.get(selectors.projectIcon).click();
      cy.wait(3000);

      cy.get(selectors.myProjects).click({ force: true });
      cy.get(selectors.myProjectsBlock)
        .first()
        .find(selectors.myProjectsRow)
        .click({ force: true });

      cy.wait(3000);
      cy.get(selectors.projectIcon).click();
      cy.wait(3000);

      cy.get('body').then(($body) => {
        if ($body.find('#budget-tab').length > 0) {
          cy.log('Public project selected.');

          // Click on budget tab
          cy.get(selectors.budgettab).click();

          // Click on edit budget button
          cy.get(selectors.edtBudgetBtn).click();
          // Check if the project contains phases or create a new phase
          cy.get(selectors.firstPhaseRow).then(($el) => {
            if ($el.text().includes('Project Total')) {
              cy.log('No phases found ');
            } else {
              cy.log('Project contains phases');

              // Check if the phase has budget added or not
              cy.get(selectors.firstPhaseBudget)
                .eq(1)
                .invoke('text')
                .then((text) => {
                  if (text.trim().startsWith('$0')) {
                    cy.log('No budget added');

                    // Click on first phase info
                    cy.get(selectors.phaseInfo).first().click();

                    // Generating a random number between 1000 to 2000
                    const randomValue =
                      Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

                    // Type the random number in the fee input
                    cy.get(selectors.feeInput)
                      .clear()
                      .type(randomValue.toString());

                    // Generating random value for percentage
                    const randomPercentage =
                      Math.floor(Math.random() * (100 - 10 + 1)) + 10;

                    // Click on 'budget with' drop down
                    cy.get(selectors.budgetWithDropDown).click();

                    // Click on use entered budget option
                    cy.get(selectors.useEnteredBgt).click();

                    // Type percentage value
                    cy.get(selectors.percentInput)
                      .should('exist')
                      .clear()
                      .type(randomPercentage.toString());

                    /*cy.get(selectors.percentInput)
                  .clear()
                  .type(randomPercentage.toString());
                  */

                    //Generating random number values between 1000 to 5000 for budget field
                    const randomCost =
                      Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

                    // Type generated value in budget field
                    cy.get(selectors.budgetField)
                      .clear()
                      .type(randomCost.toString());

                    // Click on Save button
                    cy.get(selectors.saveBtn).click();

                    // Update the phase budget / fee for the phase
                    cy.get(selectors.phaseInfo).first().click();

                    // Click on fee input

                    // Generating a random number between 1000 to 2000
                    const randomValue1 =
                      Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

                    // Type the random number in the fee input
                    cy.get(selectors.feeInput)
                      .clear()
                      .type(randomValue1.toString());

                    // Generating random value for percentage
                    const randomPercentage1 =
                      Math.floor(Math.random() * (100 - 10 + 1)) + 10;

                    cy.get(selectors.percentInput)
                      .clear()
                      .type(randomPercentage1.toString());

                    //Generating random number values between 1000 to 5000 for budget field
                    const randomCost1 =
                      Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

                    // Type generated value in budget field
                    cy.get(selectors.budgetField)
                      .clear()
                      .type(randomCost1.toString());

                    // Click on save button
                    cy.get(selectors.saveBtn).click();

                    cy.get('.BudgetCell__StyledFee-sc-w10i05-2.inOhzL')
                      .invoke('text')
                      .then((fee) => {
                        cy.log('💰 Fee: ' + fee);

                        cy.get('.BudgetCell__StyledTarget-sc-w10i05-1.cjLsQI')
                          .invoke('text')
                          .then((budget) => {
                            cy.log('📊 Budget: ' + budget);
                          });
                      });
                    // Calling delete function to delete project phases
                    deleteAllPhases();
                    cy.wait(3500);

                    cy.log(
                      'Checking Project budget values after deleting phases'
                    );
                    cy.get('.BudgetCell__StyledFee-sc-w10i05-2.inOhzL')
                      .invoke('text')
                      .then((fee) => {
                        cy.log('💰 Fee: ' + fee);

                        cy.get('.BudgetCell__StyledTarget-sc-w10i05-1.cjLsQI')
                          .invoke('text')
                          .then((budget) => {
                            cy.log('📊 Budget: ' + budget);
                          });
                      });
                  } else {
                    cy.log('Phase budget is added');

                    // Calling delete function to delete project phases
                    deleteAllPhases();
                  }
                });
            }
          });
        } else {
          cy.log('No public projects available.');
          checkPortfolios();
        }
      });
    }
  );
});
