import { login } from '../../support/login';

describe('Create New Project - New Portfolio ', () => {
  const selector = {
    Addicon: '[data-testid="quick-actions-plus-button"]',
    Project: '[data-testid="quick-actions-new-project"]',
    NewPortfolio:
      '.BoardCreateButton__StyledBoardCreateButton-sc-11v1r1o-1.kvJKLg.add-board-button',
    PortfolioName: '.form-board-name',
    ProjectName: '.form-board-name',
    Create:
      '.ButtonBase-sc-19vaecp-0.PrimaryButton-sc-63kr8k-0.AddEditBoardForm__SaveButton-sc-9bmej6-2.bJfwPS.iJyKdB',
    SelectPortfolio:
      '.BoardSelectMenu__BoardItemContents-sc-aholn7-6.cvVGdF.board-item-contents',
  };

  it('Create a New Project - New Portfolio', { tags: ['TESC-0'] }, () => {
    login(
      Cypress.env('LOGIN_USERNAME'),
      Cypress.env('Button'),
      Cypress.env('LOGIN_PASSWORD')
    );

    // Use timestamp for uniqueness
    const timestamp = Date.now();
    const portfolioName = `PA-${timestamp}`;
    const projectName = `PB${timestamp}`;
    const projectNumber = `ID-${timestamp}`;

    cy.get(selector.Addicon).click();

    cy.get(selector.Project).click();

    cy.get(selector.NewPortfolio).then(($el) => {
      const isTooltipHidden = $el.attr('data-tooltip-hidden');

      if (isTooltipHidden === 'false') {
        cy.log('You do not have permission to create the new portfolio');
        return;
      }

      cy.wrap($el).click();

      cy.get(selector.PortfolioName).click().type(portfolioName);

      cy.contains('Create').click();

      cy.get(selector.SelectPortfolio).first().click();

      cy.get('.form-project-title').click().type(projectName);
      cy.get('.form-project-description').click().type('This is for testing');
      cy.get('.form-project-number').click().type(projectNumber);
      cy.get('.client-input').click().type('55555').type('{enter}');
      cy.get('.Checkbox__OriginalInput-sc-uli8ed-0.cUieaw').first().click();
      cy.get('button.submit-button').click();
    });
  });
});
