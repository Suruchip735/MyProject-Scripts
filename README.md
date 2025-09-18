# mosaic-e2e-tests

End-to-end testing automation for the Mosaic web application using Cypress with TypeScript and Bun.

## Overview

This repository contains comprehensive E2E test automation for the Mosaic application, featuring:

- **Modern TypeScript-first approach** with full type safety
- **High-performance testing** using Bun as the JavaScript runtime
- **Comprehensive test coverage** across all application modules
- **CI/CD integration** with GitHub Actions
- **Parallel test execution** for faster feedback

## Prerequisites

Before getting started, ensure you have the following installed:

### Required Tools

1. **[mise](https://mise.jdx.dev/)** - Development tool version manager (examples using Linux/macOS)

   ```bash
   # Install mise
   curl https://mise.run | sh
   ```

2. **Verify mise installation**
   ```bash
   mise --version
   ```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mosaic-e2e-tests
```

### 2. Install Development Tools

The project uses mise to manage tool versions. Install all required tools:

```bash
# Install all tools defined in .mise.toml
mise install

# Verify installations
mise list
```

This will automatically install:

- **Bun** (JavaScript runtime and package manager)
- **TypeScript** (for type checking)

### 3. Install Dependencies

```bash
# Install project dependencies using Bun
bun install
```

### 4. Verify Installation

```bash
# Check TypeScript compilation
bun run type-check

# Verify Cypress installation
bun exec cypress verify
```

## Project Structure

```
mosaic-e2e-tests/
├── .github/workflows/          # CI/CD workflows
├── cypress/
│   ├── e2e/                   # Test specifications
│   │   ├── home/
│   │   │   └── task/          # Home task tests
│   │   ├── login/             # Authentication tests
│   │   ├── member/            # Member management tests
│   │   ├── phase/             # Project phase tests
│   │   ├── portfolio/         # Portfolio management tests
│   │   ├── project/           # Project management tests
│   │   └── spec.cy.ts         # Sample specifications
│   ├── fixtures/              # Test data files
│   ├── support/               # Custom commands and utilities
│   │   ├── commands.ts        # Custom Cypress commands
│   │   ├── e2e.ts            # Global test configuration
│   │   └── login.ts          # Login utilities
│   └── videos/               # Test execution videos
├── .mise.toml                # Tool version definitions
├── cypress.config.ts         # Cypress configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Running Tests

### Interactive Development

Open the Cypress Test Runner for interactive test development:

```bash
bun run test:open
```

### Headless Execution

Run all tests in headless chrome:

```bash
bun run test

```

### Running Specific Tests

```bash
# Run a specific test file
bun exec cypress run --spec "cypress/e2e/login/login.cy.ts"

# Run tests in a specific folder
bun exec cypress run --spec "cypress/e2e/portfolio/*.cy.ts"

# Run tests with a specific pattern
bun exec cypress run --spec "cypress/e2e/**/*task*.cy.ts"
```

## Available Scripts

| Command                    | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `bun run cypress:open`     | Open Cypress Test Runner for interactive testing |
| `bun run cypress:run`      | Run Cypress Tests with Chrome                    |
| `bun run cypress`          | Verify Cypress installation                      |
| `bun run type-check`       | Run TypeScript type checking                     |
| `bun run cypress --verify` | Check if Cypress is installed correctly          |
| `bun run prettier:write`   | Format code using Prettier                       |
| `bun run prettier:check`   | Check code formatting with Prettier              |
| `bun run lint`             | Lint code using ESLint                           |

## Environment Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Application settings
APP_DOMAIN=https://mosaic-app-domain
LOGIN_USERNAME=test@example.com
LOGIN_PASSWORD=secure-password
```

### Environment-Specific URLs

The application supports multiple environments:

- **Local**: `http://localhost:3000`
- **Party**: `https://party.mosaicapp.com/`
- **Staging**: `https://release.party.mosaicapp.com/`
- **Production**: `https://mosaicapp.com/`

## Custom Commands

The project includes TypeScript-enabled custom commands:

```typescript
// Login with credentials
cy.loginUser('user@example.com', 'password');

// Navigate to specific sections
cy.navigateToSection('projects');

// Wait for page load
cy.waitForPageLoad();

// Check page titles
cy.checkPageTitle('Expected Title');
```

## CI/CD Integration

The project includes GitHub Actions workflows that:

- ✅ Run on pull requests and main branch pushes
- ✅ Execute tests in parallel across multiple containers
- ✅ Use aggressive caching for faster builds
- ✅ Upload test artifacts (videos, screenshots) to Cypress Cloud
- ✅ Run daily scheduled tests at 8 AM UTC

## Troubleshooting

### mise Issues

```bash
# Verify mise installation
mise doctor

# Reinstall tools
rm -rf ~/.local/share/mise
mise install
```

### Bun Issues

```bash
# Verify bun installation
bun --version

# Clear cache and reinstall
bun install --force
```

### Cypress Issues

```bash
# Verify Cypress
bun exec cypress verify

# Get system info
bun run cypress:info

# Clear Cypress cache
bun exec cypress cache clear
```

### TypeScript Issues

```bash
# Check compilation
bun run type-check

# Verify tsconfig.json
bun exec tsc --showConfig
```

## Best Practices

### Test Organization

- Group related tests in logical folders
- Use descriptive test names
- Keep tests independent and atomic
- Use fixtures for test data

### Code Quality

- Write TypeScript for type safety
- Use custom commands for reusability
- Follow consistent naming conventions
- Add proper error handling

### Performance

- Use data attributes for element selection
- Avoid unnecessary waits and delays
- Leverage Cypress's automatic retry logic
- Run tests in parallel when possible

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [TypeScript with Cypress](https://docs.cypress.io/guides/tooling/typescript-support)
- [Bun Documentation](https://bun.sh/docs)
- [mise Documentation](https://mise.jdx.dev/)
- [GitHub Actions](https://docs.github.com/en/actions)

**Happy Testing! 🚀**
