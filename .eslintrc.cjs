module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "space-infix-ops": ["warn", {"int32Hint": false}],
    "space-unary-ops": ["warn", {"words": true, "nonwords": false}],
    "key-spacing": ["warn", {
      "beforeColon": false,
      "afterColon": true
    }],
    "eqeqeq": "warn",
    "indent": ["warn", 2]
  },
}
