/****
 * @file 原题链接: https://coolshell.cn/t.html
 */

function getInfo(i, cb) {
    const time = 5 - i;
    setTimeout(() => {
        const result = 'success_' + i;
        cb(result);
    }, 1 * time);// i越大 延长时间越短
}

// (function getDataAsync() {
//     for (let i = 0; i < 5; i++) {
//         getInfo(i, function (res) {
//             console.log(res);
//         });
//     }
// })();
/****************************************************************
 *  getDataAsync: 使用for循环一次性并发getInfo的10次调用 (getInfo 是一个异步函数 执行一定时间后 通过cb回调的方式返回结果值)
 *                期望 能按照调用顺序 依次打印出结果
 *  但是现在问题：
 *      打印效果:success_4 success_3 success_2 success_1 success_0
 *      即 打印结果依赖于 异步结果的返回时间长短 异步结果返回的快就先打印
 *      期望按顺序依次打印: success_0 success_1 success_2 success_3 success_4
 *  求 改造函数getDataAsync (getInfo 不能改)
 */


 /****************************************************************
  * way1
  *     每一异步维护一个index，第i位执行的 那么他的结果值就对应放在 result数组的第i位
  *     这样就可以按顺序返回了
  */

(function getDataAsync1() {
    let result = [];
    let count = 0;
    for (let i = 0; i < 5; i++) {
        getInfo(i, function (res) {
            result[i] = res;
            count++;
            if (count === 5) {
                for (let j = 0; j < 5; j++) {
                    console.log(result[j]);
                }
            }
        });
    }
})();