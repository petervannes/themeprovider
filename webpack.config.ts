import * as HtmlWebpackPlugin from "html-webpack-plugin"

import * as webpack from "webpack"
import * as path from "path"
import "webpack-dev-server"

const isDevelopment = process.env.NODE_ENV === "production" ? false : true
export const dist = path.join(__dirname, "dist")

// HTML Webpack Plugin
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  minify: isDevelopment
          ? false
          : {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          },
  template: "./src/index.html"
})

const config: webpack.Configuration = {
  mode: isDevelopment ? "development" : "production",
  target: "web",
  entry: "./src/index.tsx",
  output: {
    filename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
    path: dist
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      // Images from src/assets/img to /assets/img
      {
        test: /\.png/,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[name][ext]"
        },
        include: /src\/assets\/img/
      },
      // CSS rules
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              import: false,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: [/\.module\.css$/, /node_modules/]
      }
    ]
  },
  devtool: isDevelopment
          ? "eval-cheap-module-source-map"
          : "nosources-source-map",
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/
        }
      },
      name: false
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    htmlWebpackPlugin,
    ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : [])
  ],
  stats: {
    assetsSort: "!size",
    colors: true,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    groupAssetsByChunk: false,
    groupAssetsByExtension: false,
    groupAssetsByInfo: false,
    groupAssetsByPath: false,
    modules: false,
    relatedAssets: true,
    timings: false,
    version: false
  },
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: true,
    port: 8080
  }
}

export default config

