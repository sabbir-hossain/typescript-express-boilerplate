const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const commonConfig = {
  mode: "development", // "production" | "development" | "none"
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      // TypeScript
      { test: /\.ts$/, loader: "ts-loader" },
      { test: /\.js$/i, loader: "ts-loader" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "config.json", to: "config.json" },
      { from: "package.json", to: "package.json" }
    ])
  ]
};

const serverConfig = {
  target: "node",
  entry: "./src/server", // use the entry file of the node server if everything is ts rather than es5
  devtool: "source-map",
  output: {
    // path: root("dist"),
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs"
  },
  externals: [nodeExternals(), renameConfig],
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

// Default config
const defaultConfig = {
  context: __dirname,
  resolve: {
    // root: root("/src")
    extensions: [".ts", ".js", ".json"]
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: "index.js"
  }
};

const webpackMerge = require("webpack-merge");
module.exports = [
  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
];

// Helpers
function renameConfig(context, request, callback) {
  const m = request.match(/(?:^|[\/\\])(config)\.json$/);
  if (m) return callback(null, `./${m[1]}.json`);

  callback();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
