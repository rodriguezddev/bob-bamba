const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:cypress/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    'linebreak-style': RULES.OFF,
    'import/no-extraneous-dependencies': RULES.OFF,
    semi: RULES.OFF,
    'react/function-component-definition': RULES.OFF,
    'jsx-quotes': [RULES.ERROR, 'prefer-single'],
    'import/prefer-default-export': RULES.OFF,
    'react/jsx-props-no-spreading': RULES.OFF,
    'no-unused-expressions': RULES.OFF,
    'no-param-reassign': [RULES.ERROR, { props: false }],
    'class-methods-use-this': [
      RULES.ERROR,
      { exceptMethods: ['handleResponse', 'getHeaders'] },
    ],
  },
}
