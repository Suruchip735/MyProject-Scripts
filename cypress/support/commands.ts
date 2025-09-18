// ***********************************************
// Custom Cypress commands with TypeScript support
// ***********************************************

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      login(
        email: string,
        continueButtonText: string,
        password: string
      ): Chainable<void>;

      selectFirstMemberIfNone(
        selectors: Record<string, string>
      ): Chainable<void>;
    }
  }
}

import { login } from './login';

Cypress.Commands.add('login', login);

Cypress.Commands.add(
  'selectFirstMemberIfNone',
  (selectors: Record<string, string>) => {
    const { emptyMemberText, selectMembersText, memberCheckbox, saveButton } =
      selectors;

    if (
      !emptyMemberText ||
      !selectMembersText ||
      !memberCheckbox ||
      !saveButton
    ) {
      throw new Error(
        "One or more required selector keys are missing in 'selectors' object passed to selectFirstMemberIfNone"
      );
    }

    cy.get('body').then(($body) => {
      if ($body.find(emptyMemberText).length > 0) {
        const message = $body.find(emptyMemberText).text().trim();
        if (message.includes('No Members Selected')) {
          cy.log('No members selected – selecting one now');
          cy.get(selectMembersText).first().click({ force: true });
          cy.get(memberCheckbox).first().check({ force: true });
          cy.get(saveButton).contains('Save').click({ force: true });
          cy.wait(2000);
        }
      }
    });
  }
);

export {};
