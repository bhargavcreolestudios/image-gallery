module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
   
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    '@typescript-eslint/no-unused-vars': [0],
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/no-unused-vars': [0],
    '@typescript-eslint/camelcase': [1],
    '@typescript-eslint/no-explicit-any': [2],
    '@typescript-eslint/no-inferrable-types': [0],
    '@typescript-eslint/no-empty-interface': [0],
    '@typescript-eslint/explicit-member-accessibility':[0],
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};