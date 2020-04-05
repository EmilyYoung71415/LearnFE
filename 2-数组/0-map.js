/***
 * Array.prototype.map(callbackfn[, thisArg])
 * 功能:
 *      是把原数组中的每个元素按顺序执行一次 callbackfn 函数，
 *      并且把所有返回的结果组合在一起生成一个新的数组
 * 核心要点:
 *      1. 外界可手动传入this
 *      2. 不改变原数组,返回新数组
 *      3. app.map(xx) 作为map函数得到调用map的arr
 *      4. 回调函数的变量
 *      5. 返回的数组里是调用回调函数里return的那个数
 */
Array.prototype._map = function (cb, ctx) {
    var arr = Array.prototype.slice.call(this);
    var mappedArr = [];
    for (var i = 0; i < arr.length; i++) {
        mappedArr.push(cb.call(ctx, arr[i], i, this));
    }
    return mappedArr;
};

// 使用
[1, 2, 3]._map(function (item, index) {
    item += 1;
    return item;
});