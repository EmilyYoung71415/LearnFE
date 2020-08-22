const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const defaultSettings = require('./src/config/index.js');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = {
    publicPath: IS_PROD ? defaultSettings.baseUrl : './', // index.html里的静态资源src 前缀
    outputDir: 'dist', //  生产环境构建文件的目录
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    devServer: {
        overlay: {
            // 当编译出现错误时 错误展示在全屏覆盖层
            warnings: false,
            errors: true
        },
        open: true, // 是否打开浏览器
        // 指定打开的页面uri
        // host: 'localhost', // 为了解决资源跨域问题，必要时可配置成成xxx.com 然后在本地的host将该域名映射成localhost
        // port: '8123', // 代理断就
        // https: false,
        // hotOnly: false, // 热更新
        proxy: {
            '/api': {
                target: IS_PROD ? defaultSettings.baseUrl : './',
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                // ws: true, // 是否启用websockets
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@api', resolve('src/api'))
            .set('@views', resolve('src/views'))
            .set('@components', resolve('src/components'));
    }
}