// 网页中预加载20张图片资源，分步加载，一次加载10张，两次完成，怎么控制图片请求的并发，怎样感知当前异步请求是否已完成？
/****
 * base版思路：
 *      将20张图片/limit 分成 x组，那么就是分布执行x个promise.all（promise.all 只是个概念，实际可以用自己手写的基于链式的并发
 *      stepArr1.reduce处理完并行的promise后，.then(stepArr2.reduce )
 */
function getData(dataArr, limit, promiseHandler) {
    const _dataArr = dataArr.slice(); // 浅拷贝
    const promises = [];
    let count = 0;

    for (let i = 0; i < limit && i < dataArr.length; i++) {
        promises.push(loadAsync());
    }

    return Promise.all(promises);

    // 递归
    function loadAsync() {
        if (_dataArr.length < 1 || count > limit) return;
        count++;
        console.log(`当前并发数:${count}`);

        return promiseHandler(_dataArr.shift())
            .catch(err => console.error(err))
            .then(() => {
                count--;
                console.log(`当前并发数:${count}`);
            })
            .then(() => loadAsync());
    }
}

getData([1, 2, 3, 4, 5, 6], 3, function (val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val);
        }, val * 1000);
    });
});


/**********
 * 23行代码实现一个带并发数限制的fetch请求函数
 * https://juejin.im/post/5c89d447f265da2dd37c604c
 * 
 * 实现如下函数 批量请求数据
 */
/***
 * @param urls 请求地址数组
 * @param callback 所有请求结束后的回调
 * @param max 控制请求的并发数
 */
function handleFetchQueue(urls, max, callback) {
    let count = 0;
    request();
    function request() {
        count++;
        console.log('start 当前并发数为: ' + count);
        fetch(urls.shift())
            .then(() => {
                count--;
                console.log('end 当前并发数为: ' + count);
                if (urls.length) {
                    request();
                } else if (count === 0) {
                    callback();
                }
            });
        if (count < max) {
            request();
        }
    }

}