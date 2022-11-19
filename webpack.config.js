const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './src/index.ts'),
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
  output: {
    path: path.join(__dirname, './dist'),
    filename: process.env.NODE_ENV === 'development' ? 'js/[name].js' : 'js/[name].[hash].js',
    clean: true,
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8000,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.wasm'],
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
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: process.env.NODE_ENV === 'development' ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
      threads: true,
    }),
    new StylelintWebpackPlugin({
      extensions: ['css', 'scss', 'sass', 'less', 'styl', 'vue', 'html'],
      fix: true,
      threads: true,
    }),
    process.env.NODE_ENV === 'development' ? () => {} : new BundleAnalyzerPlugin({
      include: path.resolve(__dirname,'./src/*'),
      exclude: /node_modules/,
      threshold: 8 * 1024,
    }),
    process.env.NODE_ENV === 'development' ? () => {} : new CompressionWebpackPlugin({
      test: /\.m?js(\?.*)?$/i,
      include: path.resolve(__dirname,'./src/*'),
      exclude: /node_modules/,
    }),
  ],
  optimization: {
    minimizer: [
      process.env.NODE_ENV === 'development' ? () => {} : new CssMinimizerWebpackPlugin(),
      process.env.NODE_ENV === 'development' ? () => {} : new TerserWebpackPlugin({
        include: path.resolve(__dirname,'./src/*'),
        exclude: /node_modules/,
      }),
      '...',
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
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
            name: process.env.NODE_ENV === 'development' ? 'image/[name].[ext]' : 'image/[name].[hash].[ext]',
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
              name: process.env.NODE_ENV === 'development' ? 'media/[name].[ext]' : 'media/[name].[hash].[ext]',
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
              name: process.env.NODE_ENV === 'development' ? 'font/[name].[ext]' : 'font/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
