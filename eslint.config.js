// import { defineConfig } from 'eslint-define-config';

// export default defineConfig([
//   {
//     files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"], // Adjust file patterns as needed
//     languageOptions: {
//       ecmaVersion: "latest",
//       sourceType: "module",
//       globals: {
//         browser: true, // Browser globals
//         node: true,    // Node.js globals
//       },
//     },
//     plugins: {
//       cypress: require("eslint-plugin-cypress"), // Cypress plugin
//     },
//     rules: {
//       "cypress/no-unnecessary-waiting": "error", // Disallow unnecessary waits in Cypress
//       "no-console": "warn", // Warn for console usage
//     },
//   },
//   {
//     files: ["cypress/**/*.js"], // Specific config for Cypress files
//     languageOptions: {
//       globals: {
//         "cypress/globals": true,
//       },
//     },
//   },
//   {
//     ignores: [
//       "node_modules/",
//       "dist/",
//       "cypress/videos/",
//       "cypress/screenshots/",
//     ], // Exclude folders from linting
//   },
// ]);
export default [
  {
    files: ["**/*.js", "**/*.jsx"],
    ignores: ["node_modules/", "dist/", "build/"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      
    },
  },
];