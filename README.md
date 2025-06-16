# qa-automation
Frontend QA Automation for testing web applications efficiently using Cypress.



## Scope of the Repository

This repository includes:
- Automated end-to-end (E2E) test scripts for the frontend application.
- Reusable functions and custom commands for common actions.
- Test cases for various module Ads, discounts, and filters ,Login,Economic,calendar,Budget.
- Configurable environment settings for flexibility in testing.


## Project Structure

- **cypress/**
  - **e2e/**: Test cases for different modules, such as:
    - `addsfilter.cy.js`
    - `adscreatedeliveroo.cy.js`
    - `AddBudget.cy.js`
    - `Addcampaingn.cy.js`
    - `DiscountclassicAllcustomer.cy.js`
    - `ItembasedNewcustomer.cy.js`
  - **fixtures/**: Test data for the scripts.
  - **support/**: Reusable commands and helpers.
- **cypress.config.js**: Cypress configuration file.
- **README.md**: Documentation for the project.


## How to Install

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
     cd AutomationGrowdash

3. Install project dependencies: 
    npm install

## How to Run Tests

**Running Tests in Cypress**

1. Open the Cypress Test Runner 
    npx cypress open

**Running Specific Test Cases**
To run a specific test case, use the --spec flag:

npx cypress run --spec cypress/e2e/DiscountclassicAllcustomer.cy.js //DiscountclassicAllcustomer is file name you will replace file name


**Running with Environment Variables**
If the project requires specific environment variables, pass them during runtime:

npx cypress run --env APP_DOMAIN=https://your-app-domain.com




