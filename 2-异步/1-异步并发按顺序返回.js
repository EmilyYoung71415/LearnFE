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

// (function getDataAsync1() {
//     let result = [];
//     let count = 0;
//     for (let i = 0; i < 5; i++) {
//         getInfo(i, function (res) {
//             result[i] = res;
//             count++;
//             if (count === 5) {
//                 for (let j = 0; j < 5; j++) {
//                     console.log(result[j]);
//                 }
//             }
//         });
//     }
// })();


 /****************************************************************
  * 优化1(尤大实现版)
  *        way1的不足之处: 等全部结果返回后才开始打印，期间用户白屏的时间过长
  *                       能否实现既按顺序打印 又即时打印的效果呢
  *        思路：
  *             异步回调里：当前异步是第一个异步 则无条件打印
  *                        elseif 当前为第i个 则判断i-1个是否已返回结果并打印
  *                        （这样解决的是 当前异步主动盘查前一个是否有结果再打印
  *                         还需要 当前异步有结果后 主动盘查后一个是否有结果再打印
  */

(function getDataAsync2() {
    const total = 5;

    let responses = [];
    let displayed = [];

    for (let i = 0; i < total; i++) {
        getInfo(i, function (res) {
            responses[i] = res;
            // only display if
            // - this is the first request
            // or
            // - the previous request has been displayed
            if (i === 0 || displayed[i - 1]) {
                display(i);
            }
        })
    }

    function display (index) {
        console.log(responses[index]);
        displayed[index] = true;

        if (index === total - 1) {
            // all done.
        } else if (responses[index + 1]) {
            // recursively display the next request if it has been received.
            display(index + 1);
        }
    }
})();

 /****************************************************************
  * 优化1(终极版 清晰清爽版)
  *        way1的不足之处: 等全部结果返回后才开始打印，期间用户白屏的时间过长
  *                       能否实现既按顺序打印 又即时打印的效果呢
  *        思路：
  *             异步回调里：当前异步是第一个异步 则无条件打印
  *                        elseif 当前为第i个 则判断i-1个是否已返回结果并打印
  *                        （这样解决的是 当前异步主动盘查前一个是否有结果再打印
  *                         还需要 当前异步有结果后 主动盘查后一个是否有结果再打印（且是递归式盘查 链式的
  * 
  *         优化： 每次cb回调之后 递归式盘查 当前i之后的异步是否已有结果值
  */


 (function getDataAsync3() {
    const total = 5;

    let responses = [];
    let displayedIndex = 0; // 全局维护当前输出结果的index 每次输出后自增1

    for (let i = 0; i < total; i++) {
        getInfo(i, function (res) {
            // responses[i] = res;
            // if (i === 0 || displayed[i - 1]) {
            //     display(i);
            // }
            handleResult(res, i);
        })
    }

    function handleResult (res, index) {
        responses[index] = res;
        // console.log(responses[index]);
        // displayed[index] = true;

        // if (index === total - 1) {
        //     // all done.
        // } else if (responses[index + 1]) {
        //     // recursively display the next request if it has been received.
        //     display(index + 1);
        // }

        // 是否输出 就遍历res数组
        while (responses[displayedIndex]) {
            console.log(responses[displayedIndex]);
            displayedIndex++;
        }
    }
})();