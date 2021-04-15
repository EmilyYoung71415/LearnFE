/****
 * 节流=> window.onresize事件
 * 问题：频繁地触发一件事发生，当事实上这个事情的响应无需那么频繁
 * 思路: 
 *      拖延者思维，等会再执行，且一次只做一件事，如果新来触发提醒我响应，我会说：正在休息不接客
 *      正经解释:
 *          针对频繁触发但又不希望频繁地次次响应=> 事件被延迟执行，每次触发事件时都判断当前是否有等待执行的延时函数
 *          即 节流通过约束响应窗口的开放 降低了响应频率
 * 
 * 改良版：有头有尾
 *        应用： 滚动加载，想知道最后一次触发滚动是否达到底部
 */
function _throttle(fn, timeing) {
    let trigger = null;
    return function () {
        if (trigger) return;
        trigger = true;
        fn();
        setTimeout(() => {
            trigger = false;
        }, timeing);
    }
}
function _throttle(fn, interval) {
    let timer = null;
    let firstTime = true;

    return function () {
        let args = arguments;
        let self = this;

        if (firstTime) {
            fn.apply(self, args);
            return;
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            fn.apply(self, args);

        }, interval || 500);
    };

};

// window.onresize = throttle(function () {
//     console.log(1);
// }, 500);

/**
 * 节流函数
 * @param {Function} fn - 实际要执行的函数，对其进行节流处理
 * @param {Number} wait - 规定的执行时间间隔
 * @param {Object} option - 用于设置节流的函数的触发时机，
 *                        - 默认是{leading: true, trailing: true}，表示第一次触发监听事件马上执行，停止后最后也执行一次
 *                        - leading为false时，表示第一次触发不马上执行
 *                        - trailing为false时，表示最后停止触发后不执行
 *      leading：false 和 trailing: false 不能同时设置 所以throttle只有三种设置
 * @return {Function} 返回经过节流处理后的函数
 */
function $throttle(fn, wait = 500, option = {}) {
    let timeid = null;
    let lasttime = 0; // 上次触发fn的时间戳
    function throttlecall() {
        let self = this;
        let args = arguments;
        let now = +Date.now();
        !lasttime && option.leading === false && (lasttime = now);
        let remaining = wait - (now - lasttime); // 需要等待的时间 - 已等待的时间
        // 立即执行
        if (remaining <= 0 || remaining > wait) {
            fn.apply(self, args);
            lasttime = now;
            if (timeid) {
                clearTimeout(timeid);
                timeid = null;
            }
        }
        // 未达到规定时间 且 停止后仍需延迟执行
        else if (!timeid && option.trailing === true) {
            timeid = setTimeout(function () {
                timeid = null;
                fn.apply(self, args);
                lasttime = option.leading === false ? 0 : +new Date();
            }, remaining);
        }
    }

    throttlecall.cancel = function () {
        clearTimeout(timeid);
        timeid = null;
        lasttime = 0;
    };

    return throttlecall;
}