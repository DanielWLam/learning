const Jarvis = require('webpack-jarvis')
const path = require('path')
const resolve = (dir) => {
  return  path.join(__dirname, dir)
}

module.exports = {
  entry: resolve('./index.js'),
  output: {
    path: resolve('dist'),
    filename: 'index.bundle.js'
  },
  module: { // loaders
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {loader: 'babel-loader'}
        ]
      }
    ]
  },
  plugins: [ // plugins
    new Jarvis({
      port: 1337
    })
  ]
}
