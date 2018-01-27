const path = require('path')

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.jsx$/,
        use: [{loader: 'babel-loader'}]
      },
      {
        test: /\.less/,
        use: [
          {loader: 'style-loader'},
          {loader: 'less-loader'}
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    index: path.resolve(__dirname, 'index.html'),
    publicPath: "/dist/"
  }
}