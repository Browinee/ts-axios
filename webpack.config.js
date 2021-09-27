const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");

const htmlPlugin = fs.readdirSync(__dirname + "/demo").map((dir) => {
    return new HTMLPlugin({
        template: `./demo/${dir}/index.html`,
        filename: `${dir}/index.html`,
        chunks:[`${dir}`], //引入的js
    })
    // if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    //     entries[dir] = entry;
    // }
    // console.log("entries", entries)
    // return entries;
})

module.exports = {
    entry: fs.readdirSync(__dirname + "/demo").reduce((entries, dir) => {
        const fullDir = path.join(__dirname + "/demo", dir);
        const entry = path.join(fullDir, "app.ts");
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[`${dir}`] = entry;
        }
        console.log("entries", entries)
        return entries;
    }, {}),
    output: {
        path: path.join(__dirname, "__build__"),
        filename: 'demo/[name].js',
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
        open: true,
        hot: true,
        proxy: {
            "/api/": {
                target: "http://localhost:3005",
                ws: true,
                changOrigin: true
            }
        }
    },
    plugins: [
        new HTMLPlugin({
            template: "./index.html",
            filename: "index.html",
            chunks: []
        }),
    ]
};
