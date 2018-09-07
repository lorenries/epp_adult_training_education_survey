require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const S3Plugin = require("webpack-s3-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = env => {
  //aws s3 sync ./public s3://datadotnewamerica/epp_adult_training_education_survey --exclude '.DS_Store'
  return {
    entry: ["./src/index.js"],
    output: {
      path: path.join(__dirname, "public"),
      filename: `bundle.${env.deploy ? "[contenthash]." : ""}js`
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      redux: "Redux",
      "react-redux": "ReactRedux",
      newamericadotorg: "newamericadotorg"
    },
    plugins: [
      env.deploy === "development" && new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({
        filename: "bundle.css"
      }),
      new HtmlWebpackPlugin({
        title: "",
        chartIDs: [
          "chart_1",
          "chart_2",
          "chart_3",
          "computer_occupations",
          "construction_repair",
          "healthcare",
          "education_library",
          "chart_5",
          "chart_6"
        ],
        inject: false,
        template: path.resolve(__dirname, "src/index.html")
      }),
      env.deploy &&
        new CompressionPlugin({
          test: /\.(js|css)$/,
          asset: "[path].gz[query]",
          algorithm: "gzip",
          deleteOriginalAssets: false
        })
    ].filter(plugin => plugin),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: "babel-loader",
          options: {
            presets: ["es2015", "react"],
            plugins: [
              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        },
        {
          test: /\.s?css/,
          use:
            env.NODE_ENV === "production"
              ? ["style-loader", "css-loader", "sass-loader"]
              : ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ["css-loader", "sass-loader"]
                })
        }
      ]
    }
  };
};
