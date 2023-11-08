module.exports = {
  root: true,
  globals: {
    __DEV__: true
  },
  env: {
    commonjs: true,
    // 'es2021': true
    browser: true,
    es2020: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {

    // '@typescript-eslint/indent': ['error', 2, {
    //   // 'SwitchCase': 1,
    //   'MemberExpression': 1,
    //   'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 2 },
    //   'flatTernaryExpressions': true,
    //   'StaticBlock': { 'body': 2 },
    //   'FunctionExpression': { 'body': 2, 'parameters': 2 },
    //   'FunctionDeclaration': { 'body': 4, 'parameters': 2 },
    //   'ArrayExpression': 1,
    //   'CallExpression': { 'arguments': 2 }
    // }],
    'no-unused-expressions': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': false
      }
    }],

    'camelcase': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': ['off', { functions: true, classes: true }],
    '@typescript-eslint/indent': 'off',
    "@typescript-eslint/no-explicit-any": 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    // '@typescript-eslint/naming-convention': ['off', { selector: 'interface', format: ['camelCase'] }]
  },
}
