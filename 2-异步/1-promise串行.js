/**********
 * 传入异步函数数组
 ********/
// 必须得是一个 返回promise 的函数 而不是直接返回promise
const later1s = val => () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(val);
            resolve(val);
        }, 100);
    });
};

function getData() {
    let tasks = [later1s('a.png'), later1s('b.png'), later1s('c.png')];
    let res = Promise.resolve();

	// tasks.forEach(fn=>{
	// 	res = res.then(()=>fn()) // 关键是 res=res.then... 这个逻辑
    // });
    let arr = [];
    return new Promise(resolve => {
        let count = 0;
        tasks.forEach(fn=>{
            res = res.then(val => {
                count++;
                val && arr.push(val);
                // 这里写  那么最后一个的.then拿值就不行
                if (count === tasks.length) resolve(arr);
                return fn();
            });
            // 关键是 res=res.then... 这个逻辑
        });
    });
};

getData()
.then(arr => {
    // arr = [a.png, b.png];
    console.log(arr);
})


// ================================================================
// 上述是手写迭代 通过.then .then传递的方式
    // 类似 promise = promise.then(task).then(pushValue); 的代码
    // 是通过不断对promise进行处理，不断的覆盖 promise 变量的值，
    // 以达到对promise对象的累积处理效果
// ================================================================

function later1s(val) {
    return function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(val);
                resolve(val);
            }, 1000);
        });
    }
}

let res = taskQueue([
    later1s('a.png'),
    later1s('b.png'),
    later1s('c.png')
]);

function taskQueue(promisesArr) {
    promisesArr.reduce(
        (previousPromise, nextPromise) => previousPromise.then(() => nextPromise()),
        Promise.resolve()
    );
}


/**********
 * 传入参数
 ********/
/***
 * 遍历的不是promise对象 而是val值
 * val值带入异步的函数，在.then里执行 异步函数
 */
function later1s(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(val);
            resolve(val);
        }, 1000);
    });
}

// 迭代的写法
function getData(arr) {
    let promise = Promise.resolve();
    for (let i = 0; i < arr.length; i++) {
        promise = promise.then(() => later1s(arr[i]));
        // .then(console.log);                                                                                                  og('final'));
    }
}


// reduce
function getData1(arr) {
    arr.reduce(function (prev, cur) {
        return prev.then(() => later1s(cur));
    }, Promise.resolve());
}