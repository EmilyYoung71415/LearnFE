/****
 * @file 将打包出的文件dist 分html 与 静态资源 传到 机器上
 * 开发模式：
 *      0、npm run stage 打包某模块 生成dist/[modulename]的文件
 *      1、修改 curmodule 当前指定的模块，推送到远程机器
 *      2、修改 MACHINELIST 配置为自己的机器地址
 *      3、执行脚本: node deploy.js 即可将资源推送到远程机器
 *      4、优化的点：
 *          1. 加个loading
 *          2. 实时更新上传文件的进度
 */
const fs = require('fs');
const path = require('path');
const request = require('request');
const readline = require('readline');
const dir = require('node-dir'); // 匹配指定模式的文件 dir.readFile
const cwd = process.cwd();
const CURRENT_MODULE = '2019guoqing';
const CURRENT_ENV = 'otp';
const BASE_SETTINGS = (require('./src/config/index.js') || {})[CURRENT_ENV];
const absoluteUploadPath = path.resolve(cwd, 'dist/' + CURRENT_MODULE);
// 拿到token
let token = '';
try {
    token = (fs.readFileSync(path.resolve(process.env.HOME, './.iknow-token')) || '').toString();
} catch (err) {
}
// 上传文件
getUploadFiles(absoluteUploadPath)
.then(files => {
    const total = files.length - 1;
    let index = 0;
    files.map(filePath => {
        const relativePath =  path.relative(absoluteUploadPath, filePath).replace(/[\\]/g, '/');
        upload(filePath, relativePath) // 模板页面的存储地址
            .then(res => {
                console.log('upload successful');
            })
            .catch(err => {
                // console.log('出错了');
            })
            .finally(() => {
                if (index++ === total) {
                    console.log(`🎉 🎉  upload complete 🎉 🎉: ${BASE_SETTINGS.accesslink}${CURRENT_MODULE}`);
                }
            });
    });
});
function getUploadFiles(UploadDir, options) {
    function clearWrite(text) { // 读完了再一次性输出
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(text);
    }
    return new Promise((resolve, reject) => {
        let total = 0;
        dir.readFiles(
            UploadDir,
            // options,
            {
                // match: /.tpl$/,
                // exclude: /^\./
                exclude: /\.map$/
            },
            function (err, content, next) {
                if (err) throw err;
                // clearWrite(`共读取到 ${++total} 个文件\n`);
                next();
            },
            function (err, files) {
                if (err) return reject(err);
                return resolve(files);
            },
        );
    });
}
function upload(readfilepath, filename = '', callback) {
    // 根据filename判断 将资源推送到哪里
    let pushpath = '';
    if (/.html$/.test(filename)) {
        filename = filename.replace(/.html$/, '.tpl');
        pushpath = BASE_SETTINGS.odpPath + '/template/m-activity/page/' + CURRENT_MODULE + '/' + filename;
    } else {
        pushpath = BASE_SETTINGS.staticPath + '/static/m-activity/pkg/' + CURRENT_MODULE + '/' + filename;
    }
    return new Promise((resolve, reject) => {
        request.post({
            url: BASE_SETTINGS.receiver,
            formData: {
                tk: token.trim(),
                to: pushpath,
                file: fs.createReadStream(readfilepath)
            }
        }, function (err, res, body) {
            if (err) {
                return reject(err);
            }
            let result = JSON.parse(body || '{}');
            if (result) {
                return resolve(result);
            }
            return reject(res);
        });
    });
}