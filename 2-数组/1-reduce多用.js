// reduce实现map
Array.prototype._map = function(cb, ctx) {
    let arr = Array.prototype.slice.call(this);
    return arr.reduce((accurm, cur, index) => {
        accurm.push(cb.call(ctx, cur, index));  
        return accurm;
    }, []);
}
// reduce实现filter
Array.prototype._filter = function(cb, ctx) {
    let arr = Array.prototype.slice.call(this);
    return arr.reduce((accurm, cur, index) => {
        if (cb.call(ctx, cur, index)) {
            accurm.push(cur);
        }
        return accurm;
    }, []);
}
// flat扁平化
// const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
// Flat(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
function flat(arr = []) {
    return arr.reduce((accurm, cur) => accurm.concat(Array.isArray(cur) ? flat(cur) : cur), []);
}

// 数组最大最小值
function max(arr = []) {
    return arr.reduce((accurm, cur) => accurm > cur ? accurm : cur);
}

// 数组去重
function Uniq(arr = []) {
    return arr.reduce((accurm, cur) => accurm.includes(cur) ? accurm : [...accurm, cur], []);
}