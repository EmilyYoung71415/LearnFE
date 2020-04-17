/****
 * 节流=> window.onresize事件
 * 问题：频繁地触发一件事发生，当事实上这个事情的响应无需那么频繁
 * 思路: 
 *      拖延者思维，等会再执行，且一次只做一件事，如果新来触发提醒我响应，我会说：正在休息不接客
 */
function throttle(fn, interval) {
    let timer = null;
    let firstTime = true;

    return function () {
        let args = arguments;
        let self = this;

        if (firstTime) {
            fn.apply(self, args);
            return firstTime = false;
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

window.onresize = throttle(function () {
    console.log(1);
}, 500);