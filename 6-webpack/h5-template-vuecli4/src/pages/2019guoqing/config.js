/***
 * @file 拼接config里的文件
 *       读取当前环境变量，生成业务环境的api、url 返给 vue.config.js 统一使用
 */
const baseconfig = require('../../config/index');
module.exports = {
    baseUrl: baseconfig.baseUrl + '/2019guoqing', // xxx.com/m-activity/wighet/2019guoqing
    baseApi: baseconfig.baseApi + '/2019guoqing', // xxx.com/ajax/singleactivity/2019guoqing
    // $cdn: 'https://xxx.cdn.cn',
    // template: 'public/index.html',
    title: '国庆2019'
};