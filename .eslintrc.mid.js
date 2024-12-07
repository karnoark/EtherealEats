// Phase 2: Mid Development (.eslintrc.mts)
// Focus: Add structure and best practices
// ******** this file have issues please resolve those *********

module.exports = {
  root: true,
  extends: [
    'expo',
    'universe',
    'universe/shared/typescript-analysis',
    '@react-native-community',
    'plugin:@typescript-eslint/strict-type-checked',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'react-native'],
  env: {
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // This allows modern JavaScript features
    sourceType: 'module', // This is crucial - it tells ESLint you're using ES modules
    project: './tsconfig.json', // Point to your TypeScript config
  },
  rules: {
    // Previous rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error', // Upgraded to error
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error', // Upgraded to error

    // New rules for better code structure
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/split-platform-components': 'error',
    '@typescript-eslint/consistent-type-imports': 'warn',
    'react/jsx-no-bind': [
      'warn',
      {
        allowArrowFunctions: true,
        allowBind: false,
        ignoreRefs: true,
      },
    ],

    // Still disabled for flexibility
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/require-default-props': 'off',

    //god known what this ban types is, disabling it for time being
    '@typescript-eslint/ban-types': 'off',
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
