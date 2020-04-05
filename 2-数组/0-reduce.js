// Array.prototype.reduce(callbackfn[, initialValue])
// callbackfn(acc, cur)
// 如果没有提供 initialValue
    // 第一次调用 callback 函数时，accumulator=arr[0], currentValue=arr[1];
// 如果提供了 initialValue
    // accumulator =  initialValue将使用这个初始值，currentValue 使用原数组中的第一个元素。
// 在没有初始值的空数组上调用 reduce 将报错。

Array.prototype._reduce = function (cb, initialValue) {
    var arr = Array.prototype.slice.call(this);
    // 默认是未传init
    var res = arr[0];
    var starIndex = 0;
    if (initialValue !== undefined) {
        res = initialValue;
        starIndex = 1;
    }

    for (var i = 0; i < arr.length; i++) {
        res = cb.call(null, res, arr[i], starIndex);
    }

    return res;
};

let res = [1, 2, 3]._reduce(function (accur, cur) {
    return accur + cur;
}, -1);

console.log(res);