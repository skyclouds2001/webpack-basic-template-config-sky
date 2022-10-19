const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.js'),
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
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
    new WebpackBar(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: process.env.NODE_ENV === 'development' ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    process.env.NODE_ENV === 'development' ? () => {} : new BundleAnalyzerPlugin(),
    process.env.NODE_ENV === 'development' ? () => {} : new CompressionWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      process.env.NODE_ENV === 'development' ? () => {} : new CssMinimizerWebpackPlugin(),
      process.env.NODE_ENV === 'development' ? () => {} : new TerserWebpackPlugin(),
      '...',
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.sass|scss$/,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'less-loader'],
      },
      {
        test: /\.styl$/,
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader','postcss-loader', 'stylus-loader'],
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
        include: path.resolve(__dirname,'./src/*'),
        exclude: /node_modules/,
      },
    ],
  },
};
