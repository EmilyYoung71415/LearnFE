/****
 * 相等性判断
 * way1： == 问题：会发生类型转换 如 '1' == 1 (true)
 * way2: === 问题：NaN === NaN (false) +0 === 0 (true)
 * way3：规避了way1 way2的缺点
 */

//  false +0, -0, 0 被视为三个不一样的元素
// Object.is(0,-0)
// Object.is(0,+0)
// Object.is(-0,+0)


Object.is = function (x, y) {
    if (x === y) {
        // +0 != -0
        return x !== 0 || 1 / x === 1 / y;
    }
    // NaN === NaN
    else {
        return x !== x && y !== y;
    }
};