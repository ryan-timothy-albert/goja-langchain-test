const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: false,
      terserOptions: {
        ecma: 5,
        compress: true,
        output: {
          comments: false,
          beautify: false
        }
      }
    })],
  },
  entry: path.resolve(__dirname, './src/main.ts'),
  experiments: {
    asyncWebAssembly: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env']
        //   }
        // },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
        "path": require.resolve("path-browserify")
    },
  },
  externals: ["fs", "node:path", "node:fs/promises"],
};