/***
 * way0.
 *      直接调用 arr.flat(Infinity)
 * way1.
 * 递归思路:
 *     遍历数组,如果当前item是数组,那么就push(flat(item)), 否则push(item)
 * 
 */
function flatten(array) {
    return array.reduce((accurm, cur) =>
        Array.isArray(cur) ? accurm.concat(flatten(cur)) : accurm.concat(cur)
    , []);
}

// 指定深度?
function flatten(array, deep = 1) {
    return array.reduce((target, current) =>
        Array.isArray(current) && deep > 1 ? target.concat(flatten(current, deep - 1)) : target.concat(current)
    , []);
}
