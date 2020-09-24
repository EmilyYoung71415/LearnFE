/****************************************************************
 * 1. try catch只能接住符合条件的error
 *      在报错的时候，线程执行已经进入 try catch 代码块，且处在 try catch 里面
 * 
 * 2. promise捕获错误：
 *      1.最佳实践：无需在promise外部 套try...catch，直接使用.catch接住错误
 *      2.promise也不能接住异步的通过throw出的错，所以当promise内部包含三方库函数的时 三分库在异步错误的时千万别使用throw，这样外界找不到
 *        使用throw 代替reject
 *      3.promise链传递错误，那么.then里的异步函数必须使用return 异步函数 来传递更新当前层的错误
 */
// 1. try catch只能接住符合条件的error
try {
    a.
} catch (e) {
    console.log("error", e); // 编译时的错误
} 
// outputUncaught SyntaxError: Unexpected token '}'

try {
    setTimeout(() => {
        console.log(a.b); //# 异步代码 错误发生在未来
    }, 100)
} catch (e) {
    console.log('error', e);
}
console.log(111); 
//output111Uncaught ReferenceError: a is not defined




// 2. promise捕获错误：

    // 2.2 错误在microtask，throw or reject的方式抛错都可以被catch
Promise.resolve(true).then((resolve, reject)=> {
    throw Error('microtask 中的异常')
}).catch(error => {
    console.log('捕获异常', error) // 捕获异常 Error: microtask 中的异常
})
    // 2.2 错误在未来
function fetch(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            throw Error('用户不存在') // 通过throw 未来的错误，是捕获不到的
            // reject(); // 解决：此时reject错误这样在外界可以.catch接住
        })
    })
}

fetch().then(result => {
    console.log('请求处理', result) // 永远不会执行
}).catch(error => {
    console.log('请求处理异常', error) // 永远不会执行
})

// 程序崩溃
// Uncaught Error: 用户不存在


    // 2.3 return传递错误
promiseF.then(result => {
    return Promise.reject('error1') // # promise在链中rejected，错误会被链的catch接住，
                                    // # 期间的所有.then正常的回调都会被忽略
}).then(result => {// # 穿透
    console.log(result) // 永远不会执行
    return Promise.resolve('ok1') // 永远不会执行
}).then(result => {// # 穿透
    console.log(result) // 永远不会执行
}).catch(error => {// # 被接住
    console.log(error) // error1
})



(async function main() {
    try {
        const result1 = await secondFunction() // 如果不抛出异常，后续继续执行
        const result2 = await thirdFunction() // 抛出异常
        const result3 = await thirdFunction() // 永远不会执行
        console.log('请求处理', result) // 永远不会执行
    } catch (error) {
        console.log('异常', error) // 异常
    }
})();

async function main2() {
    // 如果抛出错误 内部reject 
    // 做为调用方的main，可以通过main().catch捕获错误
    const result2 = await thirdFunction() // 抛出异常
}
main2()
.catch(err => console.log(err));


function main() {
    // 一个思考的问题：
    new Promise(async (resolve, reject) => {
        // 错误1：一个未来的错误 reject触发回调
        setTimeout(() => {
            // ..... 业务代码
            reject();
        }, 3000);

        // 错误2：经历一些异步之后，同步throw
        throw new Error('something wrong happened');
    })
    .then(() => {})
    .catch(err => console.log('err', err)); // 怎么能够在全局管控的外部 通过.catch都捕获到错误1 和错误2呢

    // 因为业务代码会在 async里 用await，所以代码结构不能变，意思是async里throw 错误 让外层的promise catch住
    // 然而运行可知，错误并不会被捕获，因为 promise的函数里 参数函数并没有返回值，所以错误没得得到传递
};

function main2() {
    function sleepPromise(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject();
            }, timeout);
        });
    }

    async function fetchData() {// async 返回一个被包裹的promise
        throw new Error('2333');
    }

    Promise.all([// 将两个逻辑独立 拆分为两个promise，
        sleepPromise(1000),
        fetchData()
    ])
    .then(res => console.log(res))
    .catch(err => console.log('my-err',err));
}
main2();



function laterFunc(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
function asyncWrong(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num > 10) {
                reject(new Error('something went wrong'));
            } else {
                resolve();
            }
        }, 1000);
    });
}
/********************************
 * .then第二个参数函数 捕获错误：
 *      1、捕获本层以上的错误（不含本层)
 *      2、捕获到错误后，下一层及以下的.then 还是会被执行
 *      3、链末尾的.catch并不会被触发（错误视为已被捕获过一次了
 */
// demo1();
function demo1() {
    laterFunc(2000)
        .then((result) => {
            console.log('我进行到第一步的');
            return asyncWrong(20) // 大于20 抛错
        })
        .then((result) => {
            console.log('我进行到第二步的');
        }, (_err) => {// 这里捕获到上一层的错误 但是1.下一层的.then还是会继续执行 2.末尾的.catch并不会执行
            console.log('我出错啦，进到这里捕获错误，但是不经过catch了');
        })
        .then((result) => {// 
            console.log('我还是继续执行的！！！！')
        })
        .catch((err) => {
            console.log(err);
        });
}
/**********
 * .then(resolveFuc, rejectFunc)
 * .catch
 *      1、这俩捕获错误的优先级：谁写在链的更前面 那个错误就被谁捕获
 *      2、这俩回调被执行时，都不会中断链，不是break,可以继续执行后续操作不受影响
 *      3、.catch 不会中断，意味着.catch的位置放置顺序可以考量下
 *         重要的程序中间一旦出现错误，会马上跳过其他后续程序的操作直接执行到最近的catch代码块，但不影响catch后续的操作！！！！
 */
// demo2();
function demo2() {
    laterFunc(2000)
        .then((result) => {
            console.log('我进行到第一步的');
            return asyncWrong(20) // 大于20 抛错
        })
        .then((result) => {// 
            console.log('我能执行吗') // 不能 因为上一个的promise reject了 决定当前层走的是.catch而不是.then
        })
        .catch((err) => {// 捕获到错误
            console.log(err);
        })
        .then((result) => {
            console.log('我进行到第二步的');
        }, (_err) => {// 并不会执行，错误在上层就被catch捕获了
            console.log('错误被.catch吃了 俺啥也没有');
        })
        .then((result) => {// 
            console.log('我还是继续执行的！！！！')
        })
}
/**********
 * .then, .catch 回调都不是 break的，
 * 那到底怎么才能跳出 或者 停止 promise链式呢
 * ===> Promise有三种状态：pending，resolve，rejected
 *      return new Promise(()=>{console.log('后续的不会执行')}) 
 *      // 这里返回的一个新的Promise，没有resolve和reject，那么会一直处于pending状态，因为没返回啊，那么这种状态就一直保持着，中断了这个Promise
 * 
 */