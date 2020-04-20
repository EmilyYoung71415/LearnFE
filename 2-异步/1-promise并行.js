
/**********
 * 并行
 ********/

function later1s(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(val);

            if (val === 2) {
                reject(val);
            }
            else {
                resolve(val);
            }
        }, val * 1000);
    });
}

function getData() {
    // promise同时发出 即总共用时1s
    const promises = [1, 3, 2].map(item => later1s(item));
    Promise.all(promises)
        .then(resArr => {
            console.log(resArr); // 如果全部成功 则会输出 [1,2,3]
        })
        .catch(err => console.log(err));
}

 
/**********
 * 并行优化
 ********/


/********************************
 * 优化：
 *     promise.all 的问题： 当有一个失败了全部都失败 无法在统一出口得到顺序值
 *     所以不适用promise.all 手写并发 实现按顺序处理结果
 *     way1: 失败的时候 也resolve 约定特殊码识别
 *     way2: 手写基于.then 循环调用
 * 
 *     如下代码技能实现并发请求，又能顺序响应加载完成的事件
 */

function getData1() {
    const promises = [1, 3, 2].map(item => later1s(item));

    // let task = Promise.resolve();
    // for (let i = 0; i < promises.length; i++) {
    //     task = task.then(() => promises[i])
    //                 .then(res => console.log(res))
    //                 .catch(err => console.error('err:' + err));
    // }

    // reduce版优化
    promises.reduce((prevPromise, nextPromise) => {
        return prevPromise.then(() => nextPromise).then(res => console.log(res)).catch(err => console.error('err:' + err));
    }, Promise.resolve());
}