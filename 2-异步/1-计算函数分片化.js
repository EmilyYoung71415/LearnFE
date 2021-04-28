/**
 * repeat('aaa', 3) // aaaaaaaa repeat用户输入的str，count次
 * 
 */

// Promise.resolve();
const respromise = repeat('aaa', 10000*1000);
console.log(respromise.then(res => console.log(res)));






// 版本1： 实现了代码
function repeat1(str, count) {
    let res = '';
    while(count--) {
        res += str;
    }
    return res;
}


// 版本2： 鲁棒性： 考虑str、count的数据类型
function repeat2(str, count) {
    if (typeof str !== 'string') {
        throw new Error('str must be string')
    }

    if (typeof count !== 'number') {
        throw new Error('count must be number')
    }
    // 不能无限大
    if (count === Infinity) {
        throw new RangeError('repeat count must be less than infinity');
    }

    // 也不能<0
    if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
    }

    // 等于0直接返回结果
    if (str.length == 0 || count == 0) {
        return '';
    }

    // >=0的整数
    // 或者是 浮点数的时候，帮用户向下取整
    // if (!(count == Math.ceil(count) && count === Math.floor(count)) ) {
    if (count%1 !== 0) {
        throw new Error('count must be integer')
    }

    // str最大的长度  内存爆栈的情景\number 最大的情况
    // count is a 31-bit integer allows us to heavily
    // 但浏览器实际最多支持28bit
    if (str.length * count >= 1 << 28) {
        throw new RangeError('repeat count must not overflow maximum string size');
    }

    let res = '';
    while(count--) {
        res += str;
    }
    return res;
}

// 版本3： 性能优化
// 向下取整 则loop的时 curmax=maxloopcount
function repeat2(str, count) {
    const maxcountperloop = 4; // 16ms一帧里 最多计算的count数
    let timeloop =  ~~(count / maxcountperloop); // 未满则循环一次
    let plus = count % maxcountperloop;
    let res = '';

    while (timeloop--) {
        let curmax = maxcountperloop;
        while(curmax--) {
            res += str + '-';
        }
    }
    while(plus--) {
        res += str + '-';
    }
    return res;
}

// 优化：向上取整
// 用一个while
function repeat3(str, count) {
    const maxcountperloop = 4; // 16ms一帧里 最多计算的count数
    let timeloop =  Math.ceil(count / maxcountperloop); // 未满则循环一次
    let res = '';

    while (timeloop--) {
        // let curmax = count > maxcountperloop ? maxcountperloop : count;
        let curmax = Math.min(count, maxcountperloop);
        while(curmax--) {
            res += str;
        }
        count -= maxcountperloop;
    }
    return res;
}

// 优化： 把每一次的loop放进异步里 异步化
function repeat(str, count) {
    const maxcountperloop = 1000000; // 16ms一帧里 最多计算的count数
    let timeloop =  Math.ceil(count / maxcountperloop); // 未满则循环一次
    let res = '';
    return new Promise(resolve => {
        while (timeloop--) {
            requestAnimationFrame(() => {
                let curmax = Math.min(count, maxcountperloop);
                while(curmax--) {
                    res += str;
                }
                count -= maxcountperloop;
                count <= 0 && resolve(res);
            });
        }
    });
    
}