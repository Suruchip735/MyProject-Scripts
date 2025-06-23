import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import checkFile from 'eslint-plugin-check-file';
import requireTescTagsField from './eslint-rules/require-tesc-tags-field';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['cypress/**/*.js'],
    ignores: [],
    rules: {
      // This will error on any .js file
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Program',
          message:
            'JavaScript files are not allowed. Use TypeScript (.ts) files only.',
        },
      ],
    },
  },
  {
    files: ['**/*'],
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'cypress/videos/',
      'cypress/screenshots/',
    ],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          '**': 'KEBAB_CASE',
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'cypress/videos/',
      'cypress/screenshots/',
    ],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  {
    files: ['cypress/**/*.ts'],
    plugins: {
      custom: {
        rules: {
          'require-tesc-tags-field': requireTescTagsField,
        },
      },
    },
    rules: {
      'custom/require-tesc-tags-field': 'error',
    },
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
      },
    },
  }
);
