/**********
 * setTimeout 是延迟 xx时间  执行cb
 * setInterval 是每隔 xx时间 执行cb
 * 
 * 那么是不是就是 在 setTimeout cb调用的时候 再调用 setTimeout即可
 */

// setTimeout((...arg)=> {
//     console.log(arg);
// }, 100, 1, 2, 3, 4);
// setInterval((...arg)=> {
//     console.log(arg);
// }, 1000,  1, 2, 3, 4);

 /****************************************************************
  * 版1 基本
  *     那么是不是就是 在 setTimeout cb调用的时候 再调用 setTimeout即可 => 是的
  * 不足的地方：
  *     1、cb() 这样调用 传参肯定丢失 ==> 好像setInterval本身接受的cb不传参？ 都是闭包引用变量
  *     2、setInterval 印象中接受3个参数
  */
function _setInterval(cb, time, ...args) {
    setTimeout((...cbargs) => {
        cb(...cbargs);
        _setInterval(cb, time, ...cbargs);
    }, time, ...args);
}

_setInterval((...args)=> {
    console.log(args);
}, 1000, 1,2, 3, 4);