'use strict';

require('dotenv').config();
const path = require('path');

const production = process.env.NODE_ENV === 'production'

const { DefinePlugin, EnvironmentPlugin } = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

let plugins = [
  new EnvironmentPlugin(['NODE_ENV']),
  new HTMLPlugin({template: `${__dirname}/src/index.html`}),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    __API_URL__: JSON.stringify(process.env.API_URL),
    __AUTH0_AUDIENCE__: JSON.stringify(process.env.AUTH0_AUDIENCE),
    __AUTH0_CLIENT_ID__: JSON.stringify(process.env.AUTH0_CLIENT_ID),
    __AUTH0_CLIENT_DOMAIN__: JSON.stringify(process.env.AUTH0_CLIENT_DOMAIN),
    __AUTH0_API_TOKEN__: JSON.stringify(process.env.AUTH0_API_TOKEN),
    __AUTH0_SIGNUP__: JSON.stringify(process.env.AUTH0_SIGNUP),
  }),
]

if (production)
  plugins = plugins.concat([new CleanPlugin(), new UglifyPlugin()])


  
// console.log('this is the debug!!!!', __DEBUG__)

module.exports = {
  mode:'production',
  plugins,
  entry: `${__dirname}/src/main.js`,
  devServer: {
    historyApiFallback: true,
  },
  devtool: production ? undefined : 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname,'build'),
    filename: 'bundle-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract({
          use: [
              'style-loader',
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [`${__dirname}/src/style`],
              },
            },
          ],
        }),
      },
      {
        test: /\.icon.svg$/,
        loader: 'raw-loader',
      },
      
    ],
  },
}