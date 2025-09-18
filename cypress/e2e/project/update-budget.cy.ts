import { login } from '../../support/login';
//  This file is a part of the Cypress end-to end tests for updating phase budget / fee on budget modal

describe('Edit phase budget/fee on budget modal', () => {
  // This test verifies if user can modify the contract type, Fee amount, Budget with option and budget values in phase info modal
  it(
    'Updating phase budget / fee for a project should be saved and reflected correctly',
    { tags: ['@TESC-401'] },
    () => {
      // Selectors updating phase budget / fee
      const selectors = {
        projectIcon:
          '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        myProjects: '[data-testid="My Projects"]',
        myProjectsBlock:
          '[data-testid^="row-project"][data-testid$="projects-sidebar"]',
        myProjectsRow: '.ProjectRow__ProjectInfo-sc-17zwnx2-2',
        phasesIcon: '.ProjectPhasesButton__Container-sc-evyft6-0',
        firstPhaseRow:
          '.styles__StyledTableRow-sc-bgjgwa-1.jvuWvU.tr.phaseRow.closed',
        phaseCreateBtn: '.styles__AddEditPhaseButton-sc-q74l4s-104',
        addMenu:
          '.Menu__MenuItemPart-sc-6fjgt9-7.Menu__LabelAndKarat-sc-6fjgt9-10.jXTkIu.hAnFaV',
        customRowLabel: '.AddCustomRow',
        custPhaseName: '[data-testid="phase-name-input"]',
        createCtPhaseBtn: '[data-testid="phase-modal-submit-btn-container"]',
        closeProjectSchedule:
          '.SvgIcon__Svg-sc-vv99ju-0.iNBxYk.ProjectScheduleModalHeaderInfo__StyledNewCloseIcon-sc-17126v5-9.dbRayH',
        budgettab: '#budget-tab',
        edtBudgetBtn: '.fEsFcE',
        phaseInfo: '.td.table-cell.phaseRow.target',
        contractDropdown: '.styles__StyledDropdownToggleDiv-sc-kqk2xw-3',
        fixedfirstLevel:
          '.Menu__Item-sc-6fjgt9-11.styles__StyledMenuItem-sc-kqk2xw-32',
        fixedsecondLevel:
          '.Menu__Item-sc-6fjgt9-11.styles__StyledMenuItem-sc-kqk2xw-32',
        feeInput: '[data-testid="phase-modal-fee-input"]',
        subphaseBudget:
          '[data-testid="work_category_estimates"] > .PhaseBudgetWithDropdown__BudgetWithDropdownItem-sc-qfoibz-0 > .PhaseBudgetWithDropdown__StyledLabel-sc-qfoibz-4',
        submitBtn: '[data-testid="phase-modal-submit-btn"]',
        firstPhaseBudget: '.BudgetCell__StyledTarget-sc-w10i05-1',
        budgetWithDropDown:
          '.PhaseBudgetWithDropdown__BudgetWithDropdownToggle-sc-qfoibz-2',
        useEnteredBgt:
          '[data-testid="phase_estimate"] > .PhaseBudgetWithDropdown__BudgetWithDropdownItem-sc-qfoibz-0 > .PhaseBudgetWithDropdown__StyledLabel-sc-qfoibz-4',
        percentInput: '[data-testid="phase-modal-est-percentage-input"]',
        budgetField: '[data-testid="phase-modal-est-cost-input"]',
        saveBtn: '[data-testid="phase-modal-submit-btn"]',
        doneBtn: '.BudgetModalHeader__StyledDoneButton-sc-1nkd35q-8',
        workloadIcon: '[data-testid="workload-navbutton"]',
        workloadProject:
          '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        workloadmyProjects: '[data-testid="My Projects"]',
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

      // Check if the project contains phases or create a new phase
      cy.get(selectors.firstPhaseRow).then(($el) => {
        if ($el.text().includes('Project Total')) {
          cy.log('No phases found. Creating new phase');

          // Click on create phase button
          cy.get(selectors.phaseCreateBtn).click();

          // Click on custom phase option
          cy.get(selectors.customRowLabel).click();

          // Click on custom phase name
          cy.get(selectors.custPhaseName).type('Phase A');

          // Click on create phase button
          cy.get(selectors.createCtPhaseBtn).click();

          // Click on phase info
          cy.get(selectors.phaseInfo).first().click();

          // Generating a random number between 1000 to 2000
          const randomValue =
            Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

          // Type the random number in the fee input
          cy.get(selectors.feeInput).clear().type(randomValue.toString());

          // Generating random value for percentage
          const randomPercentage =
            Math.floor(Math.random() * (100 - 10 + 1)) + 10;

          // Click on 'budget with' drop down
          cy.get(selectors.budgetWithDropDown).click();

          // Click on use entered budget option
          cy.get(selectors.useEnteredBgt).click();

          // Type percentage value
          cy.get(selectors.percentInput)
            .clear()
            .type(randomPercentage.toString());

          //Generating random number values between 1000 to 5000 for budget field
          const randomCost =
            Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

          // Type generated value in budget field
          cy.get(selectors.budgetField).clear().type(randomCost.toString());

          // Click on Save button
          cy.get(selectors.saveBtn).click();

          // Update the phase budget / fee for the phase
          cy.get(selectors.phaseInfo).first().click();

          // Generating a random number between 1000 to 2000
          const randomValue1 =
            Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

          // Type the random number in the fee input
          cy.get(selectors.feeInput).clear().type(randomValue1.toString());

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
          cy.get(selectors.budgetField).clear().type(randomCost1.toString());

          // Click on save button
          cy.get(selectors.saveBtn).click();

          //Click on Done button
          cy.get(selectors.doneBtn).click();

          //Click on Workload icon
          cy.get(selectors.workloadIcon).click();

          cy.wait(2000);
          // Click on Projects icon
          cy.get(selectors.workloadProject).click({ force: true });
          //cy.get(selectors.projectIcon).click();
          cy.wait(3000);

          // Click on My projects
          cy.get(selectors.workloadmyProjects)
            .click({ force: true })
            .first()
            .click({ force: true });
          //.find(selectors.myProjectsRow)
          //.click({ force: true })

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
        } else {
          cy.log('Project contains Phases');

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
                cy.get(selectors.feeInput).clear().type(randomValue.toString());

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

                //Click on Done button
                cy.get(selectors.doneBtn).click();

                //Click on Workload icon
                cy.get(selectors.workloadIcon).click();
                cy.wait(2000);

                // Click on Projects icon
                cy.get(selectors.workloadProject).click({ force: true });
                //cy.get(selectors.projectIcon).click();
                cy.wait(3000);

                // Click on My projects
                cy.get(selectors.workloadmyProjects)
                  .click({ force: true })
                  .first()
                  .click({ force: true });
                //.find(selectors.myProjectsRow)
                //.click({ force: true })

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
              } else {
                cy.log('Budget added');

                //Open phase info
                cy.get(selectors.phaseInfo).first().click();

                // Generating a random number between 1000 to 2000
                const randomValue =
                  Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

                // Type the random number in the fee input
                cy.get(selectors.feeInput).clear().type(randomValue.toString());

                // Generating random value for percentage
                const randomPercentage =
                  Math.floor(Math.random() * (100 - 10 + 1)) + 10;

                // Click on contract type dropdown
                cy.get(selectors.contractDropdown).click();

                // Hover over the first-level menu item (Fixed)
                cy.get(selectors.fixedfirstLevel)
                  .eq(0) // "Fixed"
                  .scrollIntoView()
                  .trigger('mouseover');

                cy.wait(2000);

                // Click on the second-level submenu item (Billable or Non-Billable)
                cy.get(selectors.fixedsecondLevel)
                  .contains('Non-Billable') // or .eq(0) for Billable, .eq(1) for Non-Billable
                  .click({ force: true });

                //Type value in percentage field
                cy.get(selectors.percentInput)
                  .clear()
                  .type(randomPercentage.toString());

                // Click on save button
                cy.get(selectors.saveBtn).click();

                //Click on Done button
                cy.get(selectors.doneBtn).click();

                // Click on workload icon
                cy.get(selectors.workloadIcon).click();

                cy.wait(2000);

                // Click on projects icon
                cy.get(selectors.workloadProject).click({ force: true });
                cy.wait(3000);

                cy.get(selectors.workloadmyProjects)
                  .click({ force: true })
                  .first()
                  .click({ force: true });
                //.find(selectors.myProjectsRow)
                //.click({ force: true })

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
              }
            });
        }
      });
    }
  );
});
