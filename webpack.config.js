const path = require('path')

module.exports = {
  name: 'game',
  mode: 'development',
  entry: path.join(__dirname, 'game', 'index.ts'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'public')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [ {
      test: /\.ts$/,
      loader: ['ts-loader']
    } ]
  }
};
