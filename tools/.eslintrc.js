module.exports = {
  extends: '../.eslintrc.js',
  env: {
    node: true
  },
  rules: {
    'no-console': ['off'],
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false
    }],
  }
};
