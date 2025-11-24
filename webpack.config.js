const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './entry.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-app.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json',
            transpileOnly: true,
            compilerOptions: {
              jsx: 'react',
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'react-app.css',
    }),
    // Ensure React is available globally
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    // Define process.env for browser compatibility
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env': JSON.stringify({}),
    }),
    // Inject process polyfill at the top of the bundle
    new webpack.BannerPlugin({
      banner: `
        if (typeof window !== 'undefined' && typeof process === 'undefined') {
          window.process = { env: { NODE_ENV: 'production' } };
        }
        if (typeof globalThis !== 'undefined' && typeof globalThis.process === 'undefined') {
          globalThis.process = { env: { NODE_ENV: 'production' } };
        }
        if (typeof global !== 'undefined' && typeof global.process === 'undefined') {
          global.process = { env: { NODE_ENV: 'production' } };
        }
      `,
      raw: true,
      entryOnly: true,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  // Ensure React is bundled (not external)
  externals: {},
  // Ensure proper module resolution
  resolveLoader: {
    modules: ['node_modules'],
  },
}

