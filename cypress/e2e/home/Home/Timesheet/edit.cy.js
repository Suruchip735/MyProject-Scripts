import { login } from '../../../support/login';

describe('Validate Login Functionality', () => {
  beforeEach(() => {
    const appDomain = Cypress.env('APP_DOMAIN');
    cy.visit(appDomain);
  });

  it('Validate Login with valid Credentials', () => {
    cy.viewport(1920, 1080);

    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    cy.wait(10000);

    cy.origin('https://release.party.mosaicapp.com', () => {
      const selectors = {
        Timesheet: '.react-grid-item',
        ProjectRow:
          '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 60px; height: 60px; margin: 0px;"] > .project > .styles__TimesheetStyledCell-sc-1aiq3g9-4 > .TimesheetProjectCell__Container-sc-y5evrg-0 > .TimesheetProjectCell__ProjectNameRow-sc-y5evrg-7 > .styles__StyledProjectTitleContainer-sc-4zqk9v-3',
        ProjectDropdownOptions:
          '[style="position: absolute; left: 0px; top: 76px; height: 76px; width: 100%;"] .ProjectItemRow__MiddleRow-sc-1t6ma3s-4',
        PhaseDropdownOptions:
          '[style="position: absolute; left: 0px; top: 0px; height: 64px; width: 100%;"] .PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1',
        ActivityCells:
          '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 60px; height: 60px; margin: 0px;"] > .activity > .styles__TimesheetStyledCell-sc-1aiq3g9-4',
        WorkCategoryDropdownOptions: '.scrollbar variable-size-list',
        DescriptionCell:
          '[style="display: flex; width: 100%; position: absolute; left: 0px; top: 60px; height: 60px; margin: 0px;"] > .description > .styles__TimesheetStyledCell-sc-1aiq3g9-4',
        HoursCell:
          '.styles__StyledDayInput-sc-1aiq3g9-5.ffchcM.timesheet-day',
      };

      const descriptions = [
        'Worked on UI updates',
        'Backend API integration',
        'Bug fixes and code review',
        'Team meeting & planning',
        'Client call and notes',
        'Testing and QA tasks',
      ];

      cy.contains(selectors.Timesheet, 'Timesheet').click();
      cy.wait(3000);

      // Step 1: Click the specific editable row
      cy.get(selectors.ProjectRow).click({ force: true });
      cy.wait(2000);

      // Step 2: Randomly select a project
      cy.get('.styles__ItemRowContainer-sc-18itbsl-0.jHEvWE')
        .should('have.length.greaterThan', 1)
        .then(($projects) => {
          const itemsArray = Cypress._.toArray($projects); // convert jQuery to array
          const randomProject = Cypress._.sample(itemsArray); // pick random
          const index = itemsArray.indexOf(randomProject);
          cy.log(`✅ Random Project index: ${index}`);
          cy.wrap(randomProject).click({ force: true });
        });

      cy.wait(2000);

      // Step 3: Randomly select a phase
      cy.get('body').then(($body) => {
        if (
          $body.find('.PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1.ieZXqB')
            .length > 0
        ) {
          cy.get('.PhaseItemRow__PhaseInfoContainer-sc-1jx574o-1.ieZXqB').then(
            ($phases) => {
              const itemsArray = Cypress._.toArray($phases);
              const randomPhase = Cypress._.sample(itemsArray);
              const index = itemsArray.indexOf(randomPhase);
              cy.log(`✅ Random Phase index: ${index}`);
              cy.wrap(randomPhase).click({ force: true });
            }
          );
        } else {
          cy.log(
            '⚠️ No phases visible for this project, skipping phase selection'
          );
        }
      });

      cy.wait(2000);

      // Step 4: Randomly click activity cell
      cy.get(selectors.ActivityCells)
        .should('be.visible')
        .then(($activities) => {
          const index = Math.floor(Math.random() * $activities.length);
          cy.wrap($activities).eq(index).click({ force: true });
        });

      cy.wait(2000);

      cy.get(
        '.styles__StyledListItem-sc-uz02q-7.eBZMfs.flyout-list-item-container'
      )
        .should('have.length.greaterThan', 1)
        .then(($categories) => {
          const itemsArray = Cypress._.toArray($categories); // convert to array
          const randomItem = Cypress._.sample(itemsArray); // pick a random one
          const index = itemsArray.indexOf(randomItem); // log index if you want
          cy.log(`✅ Random Work Category index: ${index}`);
          cy.wrap(randomItem).click({ force: true });
        });

      cy.wait(2000);

      // Step 6: Enter random description
      const randomDesc =
        descriptions[Math.floor(Math.random() * descriptions.length)];
      cy.get(selectors.DescriptionCell)
        .click({ force: true })
        .clear()
        .type(randomDesc);

      cy.wait(2000);

      // Step 7: Enter random hours (1 to 8)
      const randomHours = Math.floor(Math.random() * 8) + 1;
      cy.get(selectors.HoursCell)
        .first()
        .click({ force: true })
        .clear()
        .type(randomHours.toString())
        .type('{enter}');
    });
  });
});
