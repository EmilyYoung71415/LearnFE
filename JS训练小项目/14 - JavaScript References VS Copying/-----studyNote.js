/**
 * @desc 涉及到一些深浅拷贝的习惯
 * 
 * 非基础类型的赋值是引用赋值，共享地址
 * 
 * @func 数组的简单深复制
 *      1.Array.prototype.slice()
 *          const temp2 = arr1.slice()
 *      2.Array.prototype.concat()
 *          [].concat(arr1)
 *      3.ES6扩展
 *          const arr2 = [...arr1];
 *      4.Array.from()
 *          Array.from(arr1)
 * @func 对象Object简单深复制
 *      1.Object.assign(target,...source)
 *      2.Json
 *          JSON.parse(JSON.stringify(wes));
 * 
 * 
 */