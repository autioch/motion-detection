module.exports = {
  'extends': 'qb',
  root: true,
  parserOptions: {
    ecmaFeatures: {
      // jsx: true
    }
  },
  // plugins: ['react'],
  rules: {
    'no-inline-comments': ['off'],
    'line-comment-position': ['off'],
    // 'id-length': ['error', {min: 2, exceptions: ['h']}],
    // 'no-unused-vars': ['error', { 'varsIgnorePattern': 'h' }],
    // 'react/jsx-uses-vars': [2]
  }
};
