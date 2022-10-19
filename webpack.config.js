const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.js'),
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/index.js',
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8000,
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
        test: /\.jpe?g|png|gif$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 8,
            name: 'image/[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: 'media/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8,
              name: 'font/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                  },
                ],
              ],
              cacheDirectory: true,
            },
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
