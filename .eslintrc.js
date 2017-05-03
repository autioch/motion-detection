module.exports = {
  'extends': 'qb',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ['react'],
  rules: {
    // 'id-blacklist': ['off'],
    // 'no-undefined': ['off'],
    'no-unused-vars': ['error', { 'varsIgnorePattern': 'h' }],
    // 'react/jsx-uses-vars': [2]
  }
};
