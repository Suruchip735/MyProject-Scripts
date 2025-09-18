import { getEffectiveTypeRoots } from 'typescript';
import { login } from '../../support/login';
// This file is part of the Cypress end-to-end tests for updating phase info in the budget modal

describe('Edit phase budget/fee on budget modal', () => {
  it(
    'Updating phase Info for a project should be saved and reflected correctly',
    { tags: ['@TESC-5963'] },
    () => {
      // Define all selectors used in the test
      const selectors = {
        projectIcon:
          '[data-testid="sidebar-menu-projects-btn"] > .styledComponents__ImageContainer-sc-tmkfvh-20',
        myProjects: '[data-testid="My Projects"]',
        myProjectsBlock:
          '[data-testid^="row-project"][data-testid$="projects-sidebar"]',
        myProjectsRow: '.ProjectRow__ProjectInfo-sc-17zwnx2-2',
        firstPhaseRow: '.styles__StyledTableRow-sc-bgjgwa-1.tr.phaseRow',
        phaseCreateBtn: '.styles__AddEditPhaseButton-sc-q74l4s-104',
        customRowLabel: '.AddCustomRow',
        custPhaseName: '[data-testid="phase-name-input"]',
        createCtPhaseBtn: '[data-testid="phase-modal-submit-btn-container"]',
        budgettab: '#budget-tab',
        edtBudgetBtn:
          '.styles__EditBudgetButton-sc-la84w4-1.InfoCell__StyledEditBudgetButton-sc-1xkk4ro-2',
        phaseInfo: '.td.table-cell.phaseRow.target',
        contractDropdown: '.styles__StyledDropdownToggleDiv-sc-kqk2xw-3',
        fixedfirstLevel:
          '.Menu__Item-sc-6fjgt9-11.styles__StyledMenuItem-sc-kqk2xw-32',
        fixedsecondLevel:
          '.Menu__Item-sc-6fjgt9-11.styles__StyledMenuItem-sc-kqk2xw-32',
        feeInput: '[data-testid="phase-modal-fee-input"]',
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
        stdPhaseDrpDownArrow: '.styles__DropdownArrow-sc-kqk2xw-25.hocARP',
        stdPhaseFirst: '.styles__DropdownArrow-sc-kqk2xw-25.hocARP',
        phaseRefInp: '[data-testid="phase-modal-number-input"]',
      };

      login(
        Cypress.env('LOGIN_USERNAME'),
        Cypress.env('BUTTON'),
        Cypress.env('LOGIN_PASSWORD')
      );

      // Click on the "Projects" icon in the sidebar
      cy.get(selectors.projectIcon).click();
      cy.wait(2000); // Wait for project panel to open

      // Click on "My Projects" section
      cy.get(selectors.myProjects).click({ force: true });

      // Click on the first project row in "My Projects"
      cy.get(selectors.myProjectsBlock)
        .first()
        .find(selectors.myProjectsRow)
        .click({ force: true });

      cy.wait(3000); // Wait for project to load

      // Collapse the sidebar by clicking the project icon again
      cy.get(selectors.projectIcon).click();
      cy.wait(2000);

      // Open the "Budget" tab
      cy.get(selectors.budgettab).click();
      cy.wait(2000);

      // Click on "Edit Budget" to open the modal
      cy.get(selectors.edtBudgetBtn).click();

      // Check if phases exist or not
      cy.get(selectors.firstPhaseRow).then(($el ) => {
        // If there are no phases (only Project Total exists), create one
        if ($el.text().includes('Project Total')) {
          cy.log('No phases found. Creating new phase');

          // Click the "Create Phase" button
          cy.get(selectors.phaseCreateBtn).click();

          // Choose the custom phase option
          cy.get(selectors.customRowLabel).click();

          // Generate random 7-digit integer
          const randomNumber1 = Math.floor(1000000 + Math.random() * 9000000);
          const phaseName1 = `Phase - ${randomNumber1}`;

          // Type into the Phase of Work input
          cy.get(selectors.custPhaseName).clear().type(phaseName1);

          const newPhaseCreated = phaseName1;

          cy.log(`Typed new phase name: ${phaseName1}`);

          // Click "Create" to save the phase
          cy.get(selectors.createCtPhaseBtn).click();

          // Click on Save button
          //cy.get(selectors.saveBtn).click();

          // Open the phase info modal for the first phase
          cy.get(selectors.phaseInfo).first().click();

          // Generate random 7-digit integer
          const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
          const phaseName = `Phase - ${randomNumber}`;

          // Type into the Phase of Work input
          cy.get(
            '.styles__StyledPhaseOfWorkInput-sc-q74l4s-46.clpvp.styles__StyledPhaseTitleField-sc-kqk2xw-20.dmDqhY.hiding-border-right-radius'
          )
            .clear()
            .type(phaseName);

          // Store the entered phase name in a variable
          const newPhaseold = phaseName;

          cy.log(`Typed new phase name: ${phaseName}`);

          // Check if Phase Reference number is added or not
          cy.get(selectors.phaseRefInp)
            .invoke('val')
            .then((value) => {
              const valStr = String(value || ''); // convert to string, handle null
              if (valStr.trim() !== '') {
                cy.log('Phase reference number is added:', valStr);
                cy.get(selectors.phaseRefInp).clear();

                // Generating random number between 1 to 500
                const updateNumber = Math.floor(Math.random() * 500) + 1;
                console.log(updateNumber);
                cy.get(selectors.phaseRefInp).type(String(updateNumber));

                cy.wrap(updateNumber).as('updatedPhaseRef');

                // Store value of updated reference number in variable
                //const newPhaseRefold = updateNumber;

                cy.log(`Adding new phase reference number: ${updateNumber}`);
              } else {
                cy.log('No phase reference number added');

                // Generating random number between 1 to 500
                const updateNumber1 = Math.floor(Math.random() * 500) + 1;
                console.log(updateNumber1);
                cy.get(selectors.phaseRefInp).type(String(updateNumber1));

                cy.wrap(updateNumber1).as('updatedPhaseRef1');
                console.log('Added new phase reference number 908491');
                // Store value of updated reference number in variable
              }
            });

          // Creating variable to store select value in the Planning Time on phase dropdown
          let timeTrackingText = '';
          let newtrackingoptionold = '';

          cy.get(
            '[data-testid="time-tracking-dropdown-toggle"] > .EllipsisText__Text-sc-1vtmsnz-0'
          )
            .invoke('text')
            .then((text) => {
              timeTrackingText = text.trim(); // store in variable
              cy.log('Time Tracking Dropdown Text:', timeTrackingText);
            });

          // Step 1: Get current dropdown value
          cy.get(
            '[data-testid="time-tracking-dropdown-toggle"] > .EllipsisText__Text-sc-1vtmsnz-0'
          )
            .invoke('text')
            .then((currentText) => {
              const timeTrackingText = currentText.trim();
              cy.log('Current Time Tracking Dropdown Text:', timeTrackingText);

              // Step 2: Open the dropdown
              cy.get('[data-testid="time-tracking-dropdown-toggle"]').click();

              // Step 3: Find all options and pick one that's different
              cy.get(
                '.Menu__MenuItemPart-sc-6fjgt9-7.Menu__LabelAndKarat-sc-6fjgt9-10.jXTkIu.hAnFaV'
              )
                .filter(
                  (index, el) =>
                    Cypress.$(el).text().trim() !== timeTrackingText
                )
                .first()
                .then(($option) => {
                  const newOptionText = $option.text().trim();
                  cy.wrap($option).click();
                  cy.log(`Selected new time tracking option: ${newOptionText}`);
                  cy.wait(2000);

                  // Storing values as cypress alias for later use
                  cy.wrap(newtrackingoptionold).as('newtrackingoptionold');

                  // Storing value of newly selected tracking option in variable
                  //const newtrackingoptionold = newOptionText;

                  // Only click confirm if modal is visible
                  cy.get('body').then(($body) => {
                    const confirmBtn =
                      '[data-testid="confirm-modal-confirm-btn"]';

                    if (
                      $body.find(confirmBtn).length > 0 &&
                      $body.find(confirmBtn).is(':visible')
                    ) {
                      cy.get(confirmBtn).click({ force: true });
                      cy.log('Clicked confirm button');
                    } else {
                      cy.log('Confirm button not visible — no click performed');
                    }
                  });
                  // Optionally open the dropdown first
                  cy.log('Changing phase parent');
                  // Click on phase parent dropdown
                  cy.get(
                    ':nth-child(1) > :nth-child(2) > .styles__PermissionStyleWrapper-sc-1m4gcds-0 > .styles__StyledInputContainer-sc-kqk2xw-18 > .SelectInput__Container-sc-1styi16-0'
                  ).click();

                  // Select any phase from the dropdown
                  cy.get('[style="overflow: visible;"] > .scrollbar')
                    .children()
                    .then(($options) => {
                      const randomIndex = Math.floor(
                        Math.random() * $options.length
                      );

                      // Storing value of selected phase parent in variable
                      const newparentold = $options
                        .eq(randomIndex)
                        .text()
                        .trim();

                      cy.wrap($options[randomIndex]).click();

                      cy.log(`New phase parent to : ${newparentold} `);
                    });

                  // Click on save button
                  cy.get('[data-testid="phase-modal-submit-btn"]').click();

                  // Click "Done" to close the modal
                  cy.get(selectors.doneBtn).click();

                  cy.wait(3000); // Wait for the modal to close

                  // Click on workload icon
                  cy.get(selectors.workloadIcon).click();

                  cy.wait(2000); // Wait for workload to load

                  // Click on projects icon
                  cy.get(selectors.workloadProject).click({ force: true });
                  cy.wait(3000);

                  // Click on My Projects in Workload sidebar
                  cy.get(selectors.workloadmyProjects)
                    .click({ force: true })
                    .first()
                    .click({ force: true });

                  // Select first project from My projects
                  cy.get(selectors.myProjectsBlock)
                    .first()
                    .find(selectors.myProjectsRow)
                    .click({ force: true });

                  cy.wait(3000); // Wait for project to load

                  // Click on Projects icon again to collapse sidebar menu
                  cy.get(selectors.projectIcon).click();

                  cy.wait(3000); // Wait for sidebar to collapse

                  // Click on budget tab
                  cy.get(selectors.budgettab).click();

                  cy.wait(2000); // Wait for budget tab to load

                  // Click 'Edit Budget' button to open budget modal
                  cy.get(selectors.edtBudgetBtn).click();

                  cy.wait(2000);

                  // Reopen phase modal to verify saved values
                  cy.get(selectors.phaseInfo).first().click();

                  // Invoke values for updated phase name and compare with old value
                  cy.get(selectors.custPhaseName)
                    .invoke('val')
                    .then((val) => {
                      const phaseNameNow = String(val).replace(/,/g, '');
                      expect(phaseNameNow).to.eq(newPhaseold.toString());
                      cy.log('Phase name values matched');

                      cy.get('@updatedPhaseRef').then((updatedNumber) => {
                        cy.log(
                          `Reused updated phase reference: ${updatedNumber}`
                        );

                        cy.get(selectors.phaseRefInp)
                          .invoke('val')
                          .then((val) => {
                            const phaseRefNow = String(val || '').replace(
                              /,/g,
                              ''
                            );
                            expect(phaseRefNow).to.eq(updatedNumber.toString());
                            cy.log('Phase Ref values matched ');
                          });

                        // Check for phase tracking value
                        cy.get('@newtrackingoptionold').then(
                          (updatedtrackingoption) => {
                            cy.log(
                              `Reused updated phase level tracking: ${updatedtrackingoption}`
                            );

                            // Invoke value for selected option in the dropdown
                            cy.get(
                              '[data-testid="time-tracking-dropdown-toggle"] > .EllipsisText__Text-sc-1vtmsnz-0'
                            )
                              .invoke('text')
                              .then((currentText) => {
                                const TrackingTextNow = currentText.trim();
                                expect(TrackingTextNow).to.eq(
                                  updatedtrackingoption
                                );
                                cy.log('Phase tracking level values matched ');
                              });
                          }
                        );
                      });
                    });
                });
            });
        } else {
          // Open the phase info modal for the first phase
          cy.get(selectors.phaseInfo).first().click();

          // Check if the project's phase is a standard phase or custom phase
          cy.get('body').then(($body) => {
            if ($body.find(selectors.stdPhaseDrpDownArrow).length > 0) {
              cy.log('Standard phase selected');

              // Click on standard phase dropdown
              cy.get(selectors.stdPhaseDrpDownArrow).click();

              // Select first element from the phase dropdown
              cy.get(
                '.styles__StyledListItem-sc-uz02q-7.eBZMfs.flyout-list-item-container'
              )
                .filter(':visible')
                .first()
                .click();

              // Storing selected phase value from the dropdown
              cy.get(
                '.styles__StyledListItem-sc-uz02q-7.eBZMfs.flyout-list-item-container'
              )
                .filter(':visible')
                .first()
                .then(($el) => {
                  const stdPhaseold = $el.text().trim();
                  cy.log('Phase Name updated to: ', stdPhaseold);
                  cy.wrap($el).click();
                });

              // Check if Phase Reference number is added or not
              cy.get(selectors.phaseRefInp)
                .invoke('val')
                .then((value) => {
                  const valStr = String(value || ''); // convert to string, handle null
                  if (valStr.trim() !== '') {
                    cy.log('Phase reference number is added:', valStr);
                    cy.get(selectors.phaseRefInp).clear();

                    // Generating random number between 1 to 500
                    const updateNumber = Math.floor(Math.random() * 500) + 1;
                    console.log(updateNumber);
                    cy.get(selectors.phaseRefInp).type(String(updateNumber));
                    cy.log(
                      `Adding new phase reference number: ${updateNumber}`
                    );

                    // Storing reference number to variable
                    const stdPhaseRef = updateNumber;
                  } else {
                    cy.log('No phase reference number added');
                    cy.get(selectors.phaseRefInp).type('908491');
                    console.log('Added new phase reference number 908491');

                    // Storing reference number to variable
                    const stdPhaseRefold = 908491;
                  }
                });

              // Creating variable to store select value in the Planning Time on phase dropdown
              let timeTrackingText = '';

              cy.get(
                '[data-testid="time-tracking-dropdown-toggle"] > .EllipsisText__Text-sc-1vtmsnz-0'
              )
                .invoke('text')
                .then((text) => {
                  timeTrackingText = text.trim(); // store in variable
                  cy.log('Time Tracking Dropdown Text:', timeTrackingText);
                });

              // Step 1: Get current dropdown value
              cy.get(
                '[data-testid="time-tracking-dropdown-toggle"] > .EllipsisText__Text-sc-1vtmsnz-0'
              )
                .invoke('text')
                .then((currentText) => {
                  const timeTrackingText = currentText.trim();
                  cy.log(
                    'Current Time Tracking Dropdown Text:',
                    timeTrackingText
                  );

                  // Step 2: Open the dropdown
                  cy.get(
                    '[data-testid="time-tracking-dropdown-toggle"]'
                  ).click();

                  // Step 3: Find all options and pick one that's different
                  cy.get(
                    '.Menu__MenuItemPart-sc-6fjgt9-7.Menu__LabelAndKarat-sc-6fjgt9-10.jXTkIu.hAnFaV'
                  )
                    .filter(
                      (index, el) =>
                        Cypress.$(el).text().trim() !== timeTrackingText
                    )
                    .first()
                    .then(($option) => {
                      const newOptionText = $option.text().trim();
                      cy.wrap($option).click();
                      cy.log(
                        `Selected new time tracking option: ${newOptionText}`
                      );
                      cy.wait(2000);

                      // Storing value of selected option in variable
                      const stdtimetrackingold = newOptionText;
                      // Only click confirm if modal is visible
                      cy.get('body').then(($body) => {
                        const confirmBtn =
                          '[data-testid="confirm-modal-confirm-btn"]';

                        if (
                          $body.find(confirmBtn).length > 0 &&
                          $body.find(confirmBtn).is(':visible')
                        ) {
                          cy.get(confirmBtn).click({ force: true });
                          cy.log('Clicked confirm button');
                        } else {
                          cy.log(
                            'Confirm button not visible — no click performed'
                          );
                        }
                      });

                      // Optionally open the dropdown first
                      cy.log('Changing phase parent');
                      // Click on phase parent dropdown
                      cy.get(
                        ':nth-child(1) > :nth-child(2) > .styles__PermissionStyleWrapper-sc-1m4gcds-0 > .styles__StyledInputContainer-sc-kqk2xw-18 > .SelectInput__Container-sc-1styi16-0'
                      ).click();

                      // Select any phase from the dropdown
                      cy.get('[style="overflow: visible;"] > .scrollbar')
                        .children()
                        .then(($options) => {
                          const randomIndex = Math.floor(
                            Math.random() * $options.length
                          );
                          const stdparentold = $options
                            .eq(randomIndex)
                            .text()
                            .trim();
                          cy.log(`Phase parent updated to: ${stdparentold}`);
                          cy.wrap($options[randomIndex]).click();
                        });

                      // Click on save button
                      cy.get('[data-testid="phase-modal-submit-btn"]').click();

                      // Click "Done" to close the modal
                      cy.get(selectors.doneBtn).click();

                      cy.wait(3000); // Wait for the modal to close

                      // Click on workload icon
                      cy.get(selectors.workloadIcon).click();

                      cy.wait(2000); // Wait for workload to load

                      // Click on projects icon
                      cy.get(selectors.workloadProject).click({ force: true });
                      cy.wait(3000);

                      // Click on My Projects in Workload sidebar
                      cy.get(selectors.workloadmyProjects)
                        .click({ force: true })
                        .first()
                        .click({ force: true });

                      // Select first project from My projects
                      cy.get(selectors.myProjectsBlock)
                        .first()
                        .find(selectors.myProjectsRow)
                        .click({ force: true });

                      cy.wait(3000); // Wait for project to load

                      // Click on Projects icon again to collapse sidebar menu
                      cy.get(selectors.projectIcon).click();

                      cy.wait(3000); // Wait for sidebar to collapse

                      // Click on budget tab
                      cy.get(selectors.budgettab).click();

                      cy.wait(2000); // Wait for budget tab to load

                      // Click 'Edit Budget' button to open budget modal
                      cy.get(selectors.edtBudgetBtn).click();
                      cy.wait(2000);

                      // Reopen phase modal to verify saved values
                      cy.get(selectors.phaseInfo).first().click();

                      //Invoke values and check if values match
                      cy.get(selectors.stdPhaseDrpDownArrow)
                        .invoke('val')
                        .then((val) => {
                          const phaseNow = String(val).replace(/,/g, '');
                          // expect(phaseNow).to.eq(stdPhaseold);
                        });
                    });
                });
            } else if (
              $body.find(
                '.styles__StyledPhaseOfWorkInput-sc-q74l4s-46.clpvp.styles__StyledPhaseTitleField-sc-kqk2xw-20.dmDqhY.hiding-border-right-radius'
              ).length > 0
            ) {
              cy.log('Custom phase selected');

              // Generate random 7-digit integer
              const randomNumber = Math.floor(
                1000000 + Math.random() * 9000000
              );
              const phaseName = `Phase - ${randomNumber}`;

              // Type into the Phase of Work input
              cy.get(
                '.styles__StyledPhaseOfWorkInput-sc-q74l4s-46.clpvp.styles__StyledPhaseTitleField-sc-kqk2xw-20.dmDqhY.hiding-border-right-radius'
              )
                .clear()
                .type(phaseName);

              cy.log(`Typed new phase name: ${phaseName}`);

              // Check if Phase Reference number is added or not
              cy.get(selectors.phaseRefInp)
                .invoke('val')
                .then((value) => {
                  const valStr = String(value || ''); // convert to string, handle null
                  if (valStr.trim() !== '') {
                    cy.log('Phase reference number is added:', valStr);
                    cy.get(selectors.phaseRefInp).clear();

                    // Generating random number between 1 to 500
                    const updateNumber = Math.floor(Math.random() * 500) + 1;
                    console.log(updateNumber);
                    cy.get(selectors.phaseRefInp).type(String(updateNumber));
                    cy.log(
                      `Adding new phase reference number: ${updateNumber}`
                    );
                  } else {
                    cy.log('No phase reference number added');
                    cy.get(selectors.phaseRefInp).type('908491');
                    console.log('Added new phase reference number 908491');
                  }
                });

              // Creating variable to store select value in the Planning Time on phase dropdown
              let timeTrackingText = '';

              cy.get(
                '[data-testid="time-tracking-dropdown-toggle"] > .EllipsisText__Text-sc-1vtmsnz-0'
              )
                .invoke('text')
                .then((text) => {
                  timeTrackingText = text.trim(); // store in variable
                  cy.log('Time Tracking Dropdown Text:', timeTrackingText);
                });

              // Step 1: Get current dropdown value
              cy.get(
                '[data-testid="time-tracking-dropdown-toggle"] > .EllipsisText__Text-sc-1vtmsnz-0'
              )
                .invoke('text')
                .then((currentText) => {
                  const timeTrackingText = currentText.trim();
                  cy.log(
                    'Current Time Tracking Dropdown Text:',
                    timeTrackingText
                  );

                  // Step 2: Open the dropdown
                  cy.get(
                    '[data-testid="time-tracking-dropdown-toggle"]'
                  ).click();

                  // Step 3: Find all options and pick one that's different
                  cy.get(
                    '.Menu__MenuItemPart-sc-6fjgt9-7.Menu__LabelAndKarat-sc-6fjgt9-10.jXTkIu.hAnFaV'
                  )
                    .filter(
                      (index, el) =>
                        Cypress.$(el).text().trim() !== timeTrackingText
                    )
                    .first()
                    .then(($option) => {
                      const newOptionText = $option.text().trim();
                      cy.wrap($option).click();
                      cy.log(
                        `Selected new time tracking option: ${newOptionText}`
                      );
                      cy.wait(2000);

                      // Only click confirm if modal is visible
                      cy.get('body').then(($body) => {
                        const confirmBtn =
                          '[data-testid="confirm-modal-confirm-btn"]';

                        if (
                          $body.find(confirmBtn).length > 0 &&
                          $body.find(confirmBtn).is(':visible')
                        ) {
                          cy.get(confirmBtn).click({ force: true });
                          cy.log('Clicked confirm button');
                        } else {
                          cy.log(
                            'Confirm button not visible — no click performed'
                          );
                        }
                      });
                      // Optionally open the dropdown first
                      cy.log('Changing phase parent');
                      // Click on phase parent dropdown
                      cy.get(
                        ':nth-child(1) > :nth-child(2) > .styles__PermissionStyleWrapper-sc-1m4gcds-0 > .styles__StyledInputContainer-sc-kqk2xw-18 > .SelectInput__Container-sc-1styi16-0'
                      ).click();

                      // Select any phase from the dropdown
                      cy.get('[style="overflow: visible;"] > .scrollbar')
                        .children()
                        .then(($options) => {
                          const randomIndex = Math.floor(
                            Math.random() * $options.length
                          );
                          cy.wrap($options[randomIndex]).click();
                        });

                      // Click on save button
                      cy.get('[data-testid="phase-modal-submit-btn"]').click();

                      // Click "Done" to close the modal
                      cy.get(selectors.doneBtn).click();

                      cy.wait(3000); // Wait for the modal to close

                      // Click on workload icon
                      cy.get(selectors.workloadIcon).click();

                      cy.wait(2000); // Wait for workload to load

                      // Click on projects icon
                      cy.get(selectors.workloadProject).click({ force: true });
                      cy.wait(3000);

                      // Click on My Projects in Workload sidebar
                      cy.get(selectors.workloadmyProjects)
                        .click({ force: true })
                        .first()
                        .click({ force: true });

                      // Select first project from My projects
                      cy.get(selectors.myProjectsBlock)
                        .first()
                        .find(selectors.myProjectsRow)
                        .click({ force: true });

                      cy.wait(3000); // Wait for project to load

                      // Click on Projects icon again to collapse sidebar menu
                      cy.get(selectors.projectIcon).click();

                      cy.wait(3000); // Wait for sidebar to collapse

                      // Click on budget tab
                      cy.get(selectors.budgettab).click();

                      cy.wait(2000); // Wait for budget tab to load

                      // Click 'Edit Budget' button to open budget modal
                      cy.get(selectors.edtBudgetBtn).click();

                      cy.wait(2000);

                      // Reopen phase modal to verify saved values
                      cy.get(selectors.phaseInfo).first().click();
                    });
                });
            } else {
              cy.log('No phase type detected');
            }
          });
        }
      });
    }
  );
});
