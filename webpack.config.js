const path = require("path");

module.exports = config = {
    entry: "./main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    resolve: {
        extensions: [".jsx", ".js"]
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"],
                        plugins: [
                            ["transform-react-jsx", {"pragma": "h"}]
                        ]
                    }
                },
                exclude: [/node_modules/]
            }
        ]
    },
}
;