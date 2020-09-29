const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const CURRENT_MODULE = process.env.VUE_APP_MODULE;// 当前开发模块
const CURRENT_ENV = process.env.VUE_APP_ENV; // 当前开发环境
const baseSettings = (require('./src/config/index.js') || {})[CURRENT_ENV];
const moduleSettings = (require('./src/pages/' + CURRENT_MODULE + '/config.js') || {});
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
module.exports = {
    publicPath: IS_PROD ? (baseSettings.baseUrl + '/' + CURRENT_MODULE) : './',
    outputDir: 'dist/' + CURRENT_MODULE, //  生产环境构建文件的目录
    indexPath: 'index.html',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@utils', resolve('src/utils'))
            .set('@static', resolve('src/static'));
    },
    pages: {
        'index': {
            entry: './src/pages/' + CURRENT_MODULE + '/index.js', // 配置入口js文件
            template: moduleSettings.template || 'public/index.html', // 模板页面
            filename: 'index.html',
            title: moduleSettings.title || '活动页',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }
};