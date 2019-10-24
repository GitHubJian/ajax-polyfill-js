const root = process.cwd()
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const v = '1.0.0'

module.exports = {
  target: 'web',
  mode: 'production',
  entry: [
    'webpack-dev-server/client?http://local.sogou.com:8424/',
    './lib/ajax.js'
  ],
  output: {
    filename: `wsajax-${v}.min.js`,
    path: path.resolve(root, './dist'),
    publicPath: '/',
    library: '$',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'template.ejs'),
      chunks: ['main'],
      title: 'Test',
      inject: 'head'
    })
  ],
  devServer: {
    host: 'local.sogou.com',
    contentBase: root,
    compress: false,
    port: 8424,
    hot: true,
    inline: true,
    // proxy: {
    //   '/apis': 'http://localhost:8425'
    // }
  }
}
