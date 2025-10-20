import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * ESLint configuration for Wildberries SDK
 *
 * Context7 Reference: /typescript-eslint/typescript-eslint
 * - Strict type checking enabled
 * - Zero tolerance for explicit 'any' types
 * - TypeScript-aware linting
 */
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // CRITICAL: Zero tolerance for 'any' types
      '@typescript-eslint/no-explicit-any': 'error',

      // Unused variables detection
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // Prevent console.log in source code
      'no-console': 'warn',

      // TypeScript-specific strictness
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts',
      'coverage/**',
      '.bmad-core/**',
      'docs/**',
      'wildberries_api_doc/**',
      'examples/**',
    ],
  }
);
