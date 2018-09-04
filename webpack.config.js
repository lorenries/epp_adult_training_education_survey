require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const S3Plugin = require("webpack-s3-plugin");

module.exports = env => {
  console.log(env);
  return {
    entry: ["./src/index.js"],
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js"
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      redux: "Redux",
      "react-redux": "ReactRedux",
      newamericadotorg: "newamericadotorg"
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({ filename: "bundle.css" }),
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
          deleteOriginalAssets: true
        }),
      env.deploy &&
        new S3Plugin({
          s3Options: {
            accessKeyId: process.env.AWS_ACCESS_KEY, // Your AWS access key
            secretAccessKey: process.env.AWS_SECRET_KEY, // Your AWS secret key
            region: "us-east-1" // The region of your S3 bucket
          },
          s3UploadOptions: {
            Bucket: "datadotnewamerica", // Your bucket name
            // Here we set the Content-Encoding header for all the gzipped files to 'gzip'
            ContentEncoding(fileName) {
              if (/\.gz/.test(fileName)) {
                return "gzip";
              }
            },
            // Here we set the Content-Type header for the gzipped files to their appropriate values, so the browser can interpret them properly
            ContentType(fileName) {
              if (/\.css/.test(fileName)) {
                return "text/css";
              }
              if (/\.js/.test(fileName)) {
                return "text/javascript";
              }
            }
          },
          basePath: path.basename(__dirname), // This is the name the uploaded directory will be given
          directory: "public" // This is the directory you want to upload
        })
    ].filter(plugin => plugin !== false),
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
