const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/main.js'),
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/main.js',
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.sass|scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader'],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'stylus-loader'],
      },
      {
        test: /\.jpg|png|gif$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 8,
            outputPath: 'img',
          },
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }]
            ],
            cacheDirectory: true,
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
};
