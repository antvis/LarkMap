module.exports = {
  root: true,
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-unresolved': 'warn',
    'import/order': 'warn',
  },
  env: {
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
