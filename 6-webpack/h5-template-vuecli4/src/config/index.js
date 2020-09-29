/***
 * @file 域名、机器地址配置等
 */
const staticPkgPath = '/static/m-activity/pkg';
const ajaxPath = '/activity/ajax';
const receiverPath = '/receiver.php';
const accesslink = '/activity/simpleindexact?p=index&tplName=';
// 静态资源存放地址：xx/lighttpd/htdocs//static/m-activity/pkg
// 模板文件存放地址：xx/template/m-activity/page/
/****
 * @param baseUrl: 静态资源访问域名
 * @param baseApi: 异步请求的接口
 */
const configList = {
    'development': {
        baseUrl: './',
        baseApi: '/'
        // $cdn: ''
    },
    'production': {// 线上编译
        baseUrl: 'http://xxxx.com',
        baseApi: 'http://xxx.com'
        // $cdn: ''
    },
    'otp': { // 推送到自己的otp机器上
        baseUrl: 'http://xxxx.com',
        baseApi: 'http://xxx.com'
    }
};
// 当部署到远程机器时使用 当curEnv=otp 时
const machineList = {
    'otp': {
        host: 'http://xx.143.83.47',
        port: 8310,
        staticPath: '/home/work/static/static.iknow.baidu.com/lighttpd/htdocs',
        odpPath: '/home/work/orp'
    }
};
// 加工处理: 将后缀拼接到域名链接上
Object.keys(configList).forEach(key => {
    // 添加链接后缀： 非开发环境
    if (key !== 'development') {
        configList[key]['accesslink'] = configList[key]['baseApi'] + accesslink;
        configList[key]['baseUrl'] += staticPkgPath;
        configList[key]['baseApi'] += ajaxPath;
    }
    // 补齐机器地址：staging or zdtest
    if (key === 'otp') {
        const machineInfo = machineList[key];
        configList[key] = Object.assign(configList[key], machineInfo);
        configList[key]['receiver'] = machineInfo['host'] + ':' + machineInfo['port'] + receiverPath;
    }
});
module.exports = configList;