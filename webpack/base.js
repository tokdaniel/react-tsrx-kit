const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssNano = require('cssnano');
const cssPreset = require('postcss-preset-env');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },
  resolve: {
    alias: resolveTsconfigPathsToAlias({
      tsconfigPath: '../tsconfig.json',
    }),
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.json',
      '.selectors.ts',
      '.actions.ts',
      '.reducer.ts',
      '.conf.ts',
      '.const.ts',
      '.scss'
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              namedexport: true,
              camelcase: true,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: [
                cssNano(),
                cssPreset(),
              ],
            },
          },
          { loader: 'sass-loader' }
        ]
      },
    ]
  },
  optimization: {
    mergeDuplicateChunks: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../static/html/template.html'),
      filename: 'index.html',
    }),
    new webpack.optimize.SplitChunksPlugin({
      name: 'vendor',
      filename: 'vendor.bundle-[hash].js',
    }),
  ]
};

function resolveTsconfigPathsToAlias(
  {
    tsconfigPath = './tsconfig.json',
    webpackConfigBasePath = './'
  } = {},
) {
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '');
    const value = path.resolve(webpackConfigBasePath, paths[item][0].replace('/*', ''));

    aliases[key] = value;
  });

  return aliases;
}
