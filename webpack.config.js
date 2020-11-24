/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackCopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const proxy = require("./proxy.config");

// Webpack config
module.exports = (env, argv) => {
  // variables
  const isDev = argv.mode === "development";
  const sourcePath = path.join(__dirname, "./src");
  const outPath = path.join(__dirname, "./dist");

  return {
    target: "web",
    context: sourcePath,
    entry: {
      app: "./app/bootstrap.tsx",
    },
    output: {
      path: outPath,
      filename: "[name]-[hash].js",
      chunkFilename: "[name]-[chunkhash].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        globals: path.join(sourcePath, "scss/global.scss"),
        variables: path.join(sourcePath, "scss/variables.scss"),
      },
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        },
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader",
          options: {
            configFileName: "tsconfig.app.json",
          },
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader",
          exclude: [path.join(__dirname, "node_modules")],
        },
        {
          test: /\.html$/,
          use: "html-loader",
          exclude: path.join(sourcePath, "index.html"),
        },
        {
          test: /\.(gif|png|jpg)$/,
          loader: "url-loader",
          options: {
            limit: 8192,
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(jpe?g|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            outputPath: "assets",
          },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        PRODUCTION: !isDev,
        KEYCLOAK_URL: JSON.stringify(env.KEYCLOAK_URL),
        APP_BASE_URL: JSON.stringify(env.APP_BASE_URL),
        KEYCLOAK_CLIENT_ID: JSON.stringify(env.KEYCLOAK_CLIENT_ID),
      }),
      !isDev &&
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
        }),
      !isDev && new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        hash: true,
        template: "./index.html",
        favicon: "./favicon.ico",
        meta: {
          charset: { charset: "utf-8" },
          "x-ua-compatible": { "http-equiv": "x-ua-compatible", content: "ie=edge" },
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
          manifest: "./site.webmanifest",
        },
      }),
      new WebpackCopyPlugin({
        patterns: [{ from: "./robots.txt", to: "robots.txt" }],
      }),
    ].filter(Boolean),

    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: 14,
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },

    devServer: {
      port: 4200,
      contentBase: sourcePath,
      https: true,
      inline: true,
      historyApiFallback: {
        disableDotRule: true,
      },
      proxy: proxy,
      stats: "minimal",
      clientLogLevel: "warning",
    },
    devtool: isDev ? "source-map" : false,
  };
};
