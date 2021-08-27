const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
module.exports = {

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);
    const entry = path.join(fullDir, "app.ts");
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry;
    }
    console.log("entries", entries)
    return entries;
  }, {}),
  output: {
    path: path.join(__dirname, "__build__"),
    filename: "[name].js",
    publicPath: "/__build__/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: "pre",
        use: "tslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    noInfo: true,
    overlay: true,
    open: true,
    proxy: {
      "/api/": {
        target: "http://localhost:3005",
        ws: true,
        changOrigin: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
