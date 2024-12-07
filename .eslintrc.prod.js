// Phase 3: Production Preparation (.eslintrc.mts)
// Focus: Strict rules for production-ready code
// ******** this file have issues please resolve those *********

module.exports = {
  root: true,
  extends: [
    'expo',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'universe',
    'universe/shared/typescript-analysis',
    '@react-native-community',
    'plugin:@typescript-eslint/strict-type-checked',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
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
    // Previous rules with stricter enforcement
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',

    // Style and optimization rules enforced
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'react-native/no-raw-text': [
      'error',
      {
        skip: ['CustomText'],
      },
    ],

    // TypeScript strictness increased
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',

    // Performance rules
    'react/jsx-no-bind': [
      'error',
      {
        allowArrowFunctions: true,
        allowBind: false,
        ignoreRefs: true,
      },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/no-array-index-key': 'error',

    // Airbnb customization for React Native
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/extensions': ['error', 'never'],
    'react/require-default-props': 'error',
    'react/style-prop-object': 'off',

    //god known what this ban types is, disabling it for time being
    '@typescript-eslint/ban-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
