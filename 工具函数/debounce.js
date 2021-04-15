/****
 * 防抖 => input模糊查询
 * 问题：
 *      高频事件的响应，不需要次次响应，我们需要知道他最近确定的那一次改动即可
 *      比如input输入，input事件频繁触发，根据每个人打字快慢不一样，这时肯定不能用节流来暴力隔段事件准确响应一件事
 *          需要引进的改变是：当前输入触发，如果有定时器存在，那么更新定时重新计时
 *                          当这次的触发距离上次更新有一段时间后，确定用户是输入短暂停止了，所以响应
 */

// base版
function _debounce(fn) {
    let timeout = null; // 创建一个标记用来存放定时器的返回值
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(fn, 500);
    };
}


// 未考虑到的case
/****
 * 1.this指向
 * 2.fn函数的传参
 * 3.立即执行
 * 4.时间
 * 5.可以手动取消该事件的防抖控制
 */

function $debounce(fn, wait = 500, immediate = false) {
    let timeid = null;

    function debouncecall() {
        let self = this;
        let args = arguments;

        timeid && clearTimeout(timeid);
        if (immediate) {
            !timeid && fn.apply(self, args);
            timeid = setTimeout(function () {
                timeid = null;
            }, wait);
        }
        else {
            timeid = setTimeout(function () {
                fn.apply(self, args);
                timeid = null;
            }, wait);
        }
    };

    // 取消后当成是“第一次触发”一样
    debouncecall.cancel = function () {
        clearTimeout(timeid);
        timeid = null;
    };

    return debouncecall;
}



// 示例
// var func = debounce(()=>{
//     console.log(print());
// })

// const oInput = document.querySelector('input');
// oInput.oninput = func;


// var count = 0;
// function print() {
//     count++;
//     if (count===5) {
//         func.cancel();
//     }
//     return count;
// }