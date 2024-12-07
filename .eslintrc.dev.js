// Phase 1: Initial Development (.eslintrc.mts)
// Focus: Catch critical bugs while maintaining development speed
// https://docs.expo.dev/guides/using-eslint/

// this file has strict-type-checked plugin unlike recommended on in .eslintrc.js
// ******** this file have issues please resolve those *********
module.exports = {
  root: true,
  extends: [
    'expo',
    'universe',
    '@react-native-community',
    'plugin:@typescript-eslint/strict-type-checked',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'jest'],
  env: {
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 'latest', // This allows modern JavaScript features
    sourceType: 'module', // This is crucial - it tells ESLint you're using ES modules
    project: './tsconfig.json', // Point to your TypeScript config
  },
  rules: {
    // Critical rules only
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',

    // Disabled rules for faster development
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react/jsx-props-no-spreading': 'off',
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
    {
      // Lint non-TypeScript files without "parserOptions.project"
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // Example: Allow 'require' in JavaScript files
      },
    },
  ],
};
