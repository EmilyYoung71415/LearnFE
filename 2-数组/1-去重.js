/****
 * 去重
 * way1
 *  n^2解法: 变量数组 res 保存结果，遍历需要去重的数组，如果该元素已经存在在 res 中了，则说明是重复的元素
 *           即 将原数组 和 结果数组 比较
 * way2
 *  排序之后遍历去重 nlogn
 * 
 * way3
 *  hash开辟一个外部存储空间用于标示元素是否出现过。n
 *  new Map
 *  new Set
 */

const arr = [1, 1, '1', '2', 1];
console.log(unique(arr));
// way1
function unique(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        let hasFlag = false;
        for (let j = 0; j < res.length; j++) {
            if (arr[i] === res[j]) {
                hasFlag = true;
                break;
            }
        }
        !hasFlag && res.push(arr[i]);
    }
    return res;
}

// 优化
function unique(arr) {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
}

// way2
// 弊端 字符和数字 同在的时候..
// res = [ 1, '1', 1, '2' ];
function unique(arr) {
    let res = [arr[0]];
    arr.sort((a, b) => a - b); // [ 1, 1, '1', 1, '2' ]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] !== arr[i]) {
            res.push(arr[i]);
        }
    }

    return res;
}


// way3
// 弊端 1 和 '1' 是同一个key => 改为map
function unique(arr) {
    let hash = {};
    return arr.filter((item, index) => hash[item] === item ? false : (hash[item] = item));
}

function unique(arr) {
    let hash = new Map();
    return arr.filter((item, index) => hash.get(item) === item ? false : (hash.set(item, item)));
}

// set
function unique(arr) {
    // return Array.from(new Set(arr));
    return [...new Set(arr)];
}