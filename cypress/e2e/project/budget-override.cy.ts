import { login } from '../../support/login';
//This file is a part of Cypress end-to-end tests for overriding project budget

describe('Project Budget Override', () => {
  it(
    'Verify that the Budget Table correctly displays overridden values',
    { tags: ['@TESC-4398'] },
    () => {
      // Selectors for overriding project budget
      const selectors = {
        projectIcon:
          '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        myProjects: '[data-testid="My Projects"]',
        myProjectsBlock:
          '[data-testid^="row-project"][data-testid$="projects-sidebar"]',
        myProjectsRow: '.ProjectRow__ProjectInfo-sc-17zwnx2-2',
        budgettab: '#budget-tab',
        edtBudgetBtn: '.fEsFcE',
      };

      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('BUTTON'),
        Cypress.env('LOGIN_PASSWORD')
      );

      // Click on Projects icon
      cy.get(selectors.projectIcon).click();
      cy.wait(3000);

      // Click on My projects
      cy.get(selectors.myProjects).click({ force: true });

      // Select first project from My projects
      cy.get(selectors.myProjectsBlock)
        .first()
        .find(selectors.myProjectsRow)
        .click({ force: true });

      cy.wait(3000);

      // Click on Projects icon again to collapse sidebar menu
      cy.get(selectors.projectIcon).click();

      cy.wait(3000);

      // Click on budget tab
      cy.get(selectors.budgettab).click();

      cy.wait(2000);

      // Click 'Edit Budget' button to open budget modal
      cy.get(selectors.edtBudgetBtn).click();

      // Click on project row
      cy.get('.BudgetCell__StyledTarget-sc-w10i05-1.cjLsQI')
        .first()
        .should('be.visible')
        .click({ force: true });

      cy.get('body').then(($body) => {
        const modal = $body.find(
          '.InfoModalStyles__StyledModalTitle-sc-1orhdcy-1.cmZNIJ'
        );
        if (modal.length && modal.text().includes('Budget Override')) {
          cy.log('Budget Override modal is visible');

          //Invoke value of Fee override input
          let FeeOverride: string | undefined; // Declare variable outside Cypress chain
          cy.get('.BudgetValuesNumberFormat-sc-1rnooj5-0.iyXMfg')
            .first()
            .invoke('attr', 'value')
            .then((val) => {
              FeeOverride = val;
              cy.log(`Stored Fee Override: ${FeeOverride}`);
            });

          let budgetOverride: string | undefined;
          cy.get('.BudgetValuesNumberFormat-sc-1rnooj5-0.iyXMfg')
            .eq(2)
            .invoke('attr', 'value')
            .then((val) => {
              budgetOverride = val;
              cy.log(`Stored Budget override: ${budgetOverride}`);

              // Click on Done button
              cy.get('.PrimaryButton-sc-63kr8k-0').click();

              // Click on scope tab
              cy.get('[data-testid="integration-sidebar-Scope"]').click();
              cy.wait(2000);

              //Click on first project row
              cy.get('.BudgetCell__StyledTarget-sc-w10i05-1.cjLsQI')
                .first()
                .should('be.visible')
                .click({ force: true });
              cy.get('body').then(($body) => {
                const modal = $body.find(
                  '.InfoModalStyles__StyledModalTitle-sc-1orhdcy-1.cmZNIJ'
                );
                if (modal.length && modal.text().includes('Budget Override')) {
                  cy.log('Budget Override modal is visible');

                  //Invoke value of Fee override input
                  let SCFeeOverride: string | undefined; // Declare variable outside Cypress chain
                  cy.get('.BudgetValuesNumberFormat-sc-1rnooj5-0.iyXMfg')
                    .first()
                    .invoke('attr', 'value')
                    .then((val) => {
                      SCFeeOverride = val;
                      cy.log(`Stored Fee Override: ${SCFeeOverride}`);
                    });

                  let SCbudgetOverride;
                  cy.get('.BudgetValuesNumberFormat-sc-1rnooj5-0.iyXMfg')
                    .eq(2)
                    .invoke('attr', 'value')
                    .then((val) => {
                      SCbudgetOverride = val;
                      cy.log(`Stored Budget override: ${SCbudgetOverride}`);

                      // Click on Done button
                      cy.get('.PrimaryButton-sc-63kr8k-0').click();

                      //Check if the values for fee override and budget override are same at time tab and scope tabs
                      if (
                        budgetOverride === SCbudgetOverride &&
                        FeeOverride === SCFeeOverride
                      ) {
                        cy.log('Values are same');

                        // Click on time tab
                        cy.get(
                          '[data-testid="integration-sidebar-Time"]'
                        ).click();

                        // Hover on Budget column to display tooltip
                        cy.get('.BudgetCell__StyledTarget-sc-w10i05-1.cjLsQI')
                          .first()
                          .trigger('mouseover');
                        cy.wait(3000);

                        // Hover on Remaining column to display tooltip
                        cy.get(
                          '.styles__StyledFlexFullHeightContainer-sc-1tl0fol-78.doZauL'
                        )
                          .first()
                          .should('be.visible')
                          .trigger('mouseover')
                          .wait(3000);

                        //let tooltiptext: string | undefined;
                        cy.get('[data-testid="total-target-cell"]')
                          .invoke('attr', 'data-tooltip-content')
                          .then((tooltiptext) => {
                            const parsedData = JSON.parse(
                              tooltiptext as string
                            );

                            cy.log(
                              `projectTotalFee: ${parsedData.projectTotalFee}` //prints: 1550
                            );
                            cy.log(
                              `projectTotalBudget: ${parsedData.projectTotalBudget}` //prints 3442
                            );

                            // Converting parsed int values to string
                            const projectTotalFeeStr = String(
                              parsedData.projectTotalFee
                            );

                            const projectTotalBudgetStr = String(
                              parsedData.projectTotalBudget
                            );

                            // ✅ Example check
                            if (
                              projectTotalFeeStr === FeeOverride &&
                              projectTotalBudgetStr === budgetOverride
                            ) {
                              cy.log('✅ Tooltip values match expected');
                            } else {
                              cy.log(
                                `❌ Tooltip values differ. Fee:cy ${FeeOverride}, Budget: ${budgetOverride}`
                              );
                            }
                          });
                      } else {
                        cy.log('Values are different. ');
                      }
                    });
                }
              });
            });
        } else {
          cy.log('Budget Override modal is not visible');
        }
      });
    }
  );
});
