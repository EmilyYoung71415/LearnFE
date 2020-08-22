/***
 * @file: 根据环境process.env.NODE_ENV引入不同配置
 * @date 2020-8-20
 */
const config = require('./env.' + process.env.VUE_APP_ENV);
module.exports = config;