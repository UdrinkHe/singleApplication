const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: "./src/js/main.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 匹配所有的 CSS 文件
                use: [
                    MiniCssExtractPlugin.loader, // 提取 CSS 到单独文件
                    'css-loader' // 解析 CSS 文件
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css' // 输出的 CSS 文件名
        })
    ]
}