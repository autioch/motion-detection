/* Sets up entry files. */
module.exports = function input(webpackConfig, setup) {
  webpackConfig.module.loaders.push({
    test: /\.jsx$/,
    include: [setup.sourcePath],
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      presets: [ ['es2015', {
        loose: true
      }] ],
      plugins: [
        'transform-object-rest-spread',
        ['transform-react-jsx', {
          pragma: 'h'
        }]
      ]
    }
  });

  webpackConfig.module.loaders.push({
    test: /\.js$/,
    include: [setup.sourcePath],
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      presets: [ ['es2015', {
        loose: true
      }] ],
      plugins: ['transform-object-rest-spread']
    }
  });
};
