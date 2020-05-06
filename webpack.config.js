const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");

const PAGES_DIR = path.join(__dirname, "src/pug/pages/");
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".pug"));

console.log(PAGES);

module.exports = {
  context: path.join(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.join(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "jquery-ui": "jquery-ui/ui/widgets",
      "jquery-ui-css": "jquery-ui/../../themes/base",
      "jquery-core": "jquery-ui/../",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer()],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer()],
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/,
        use: [
          "html-loader",
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    // }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
    }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, ".html")}`,
        })
    ),
  ],
};
