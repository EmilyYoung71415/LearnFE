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
 *          3. 上传完成后 输出访问链接
 *      思考：
 *          更好的抽象：重构一下 src/config, src/pages/[modulename]/config.js, deploy.js 三者的变量管理 尽量收敛一下
 */
let fs = require('fs');
let path = require('path');
let request = require('request');
// let log = require('log-util');
// let chalk = require('chalk');
const readline = require('readline');
const dir = require('node-dir'); // 匹配指定模式的文件 dir.readFiles


let token = 'zzzz';

const MACHINELIST =  {
    token: token,
    receiver: 'http://xxx/receiver.php',
    staticPath: '/home/work/xxxx1',
    odpPath: '/home/work/xxxx2'
};

/****
 * 上传打包出的
 *    dist: xxx.html => odpPath
 *    dist: 除了 xxhtml => staticPath
 */
const curmodule = '2019guoqing';
const cwd = process.cwd();
const absoluteUploadPath = path.resolve(cwd, 'dist/' + curmodule); // 绝对路径

// 上传文件
getUploadFiles(absoluteUploadPath)
.then(files => {
    files.map(filePath => {
        const relativePath =  path.relative(absoluteUploadPath, filePath).replace(/[\\]/g, '/');
        upload(filePath, relativePath) // 模板页面的存储地址
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
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
                // exclude: /\.tpl$/
            },
            function (err, content, next) {
                if (err) throw err;
                clearWrite(`共读取到 ${++total} 个文件\n`);
                next();
            },
            function (err, files) {
                if (err) return reject(err);
                return resolve(files);
            },
        );
    });
}


function upload(readfilepath, filename, callback) {
    // 根据filename判断 将资源推送到哪里
    // .tpl 结尾 则推到 odppath
    let pushpath = '';
    if (filename.test(/.tpl$/)) {
        pushpath = MACHINELIST.odpPath + '/template/m-activity/page/' + curmodule + '/' + filename;
    } else {
        pushpath = MACHINELIST.staticPath + '/static/m-activity/pkg/' + curmodule + '/' + filename;
    }
    return new Promise((resolve, reject) => {
        request.post({
            url: MACHINELIST.receiver,
            formData: {
                tk: MACHINELIST.token.trim(),
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