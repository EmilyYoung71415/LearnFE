// 完整的结构是 Array.prototype.filter(callbackfn[, thisArg])
// callbackfn 执行结果如果是 true 就返回当前元素，false 则不返回

Array.prototype._filter = function (cb, ctx) {
    var arr = Array.prototype.slice.call(this);
    let filterArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        if (cb.call(ctx, arr[i], i, this)) {
            filterArr.push(arr[i]);
        }
    }
    return filterArr;
};

console.log([1, 2, 3]._filter(item => item > 2));

