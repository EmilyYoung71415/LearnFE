/****
 *  @file 某厂笔试题
    const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
    const log = msg => console.log(msg);
    const subFlow = createFlow([() => delay(1000).then(() => log('c'))]);

    createFlow([
        () => log('a'),
        () => log('b'),
        subFlow,
        [() => delay(1000).then(() => log('d')), () => log('e')],
    ]).run(() => {
        console.log('done');
    });

    # 求实现createFlow函数，使得按顺序打印：a,b,延迟1秒,c,延迟1秒,d,e, done
 */
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const log = msg => console.log(msg);
const subFlow = createFlow([() => delay(1000).then(() => log('c'))]);

createFlow([
    () => log('a'),
    () => log('b'),
    subFlow,
    [() => delay(1000).then(() => log('d')), () => log('e')],
]).run(() => {
    console.log('done');
});
// way1
function createFlow(arr) {
    const taskList = arr.slice().flat();

    function run(callback) {
        let promiseLink = Promise.resolve();
        taskList.push(callback);
        taskList.forEach(func => {
        // promiseLink.then(() => { 
        promiseLink = promiseLink.then(() => {// # 记得更新promiseLink链
            return new Promise((resolve, reject) => {
                // Promise.resolve是对每个传入函数 非 promsie结构的promise包裹一下支持
                Promise.resolve(func()).then(resolve);
                });
            });
        });
    }

    // run2:使用reduce优化版
    function run2(callback) {
        taskList.push(callback);
        taskList.reduce((prevPromise, func) => {
            return new Promise((resolve, reject) => {
                prevPromise.then(() => Promise.resolve(func()).then(resolve));
            });
        }, Promise.resolve());
    }

    // run3: 使用async优化
    async function run3(callback) {
        for (let task of taskList) {
            await Promise.resolve(task()); // == return new Promise xxx task.then(resolve)
        }
        callback && callback();
    }

    taskList.run = run;
    return taskList;
}

// way2
function createFlow(arr) {
    const taskList = arr.slice().flat();
    class Flow {
        constructor(taskList) {
            this.taskList = taskList;
        }
        async run(cb) {
            const taskList = this.taskList;
            // 由于是await执行的异步 所以是阻塞是循环
            for (let task of taskList) {
                if (typeof task === 'function') {
                    await task();
                } else if (task instanceof Flow) { // subFlow
                    await task.run();
                } else if (Array.isArray(task)) {
                    await new Flow(task).run();
                }
            }
            cb && cb();
        }
    }
    return new Flow(taskList); // 返回一个类 类里有run方法
}

// way3
function createFlow(arr) {
    const taskList = arr.slice().flat();
    async function run(callback) {
        for (let task of taskList) { //# 1. 一次执行任务队列
            if (typeof task === 'function') { //# 1.1 如果是正常的任务函数 则执行串行执行
                await task();
            } else {//# 1.2 如果是其他情况（createFlow产生的subflow
              // subFlow 调用createFlow 函数返回的是一个对象 调用run执行
                await task.run(); //# subFlow开辟另一道异步执行链
                // 这里转换的思路是：默认都会调用run，所以run就是拿到任务队列 然后串行依次执行即可
                // 但是遇到了意外：没有调用run 只调用函数的情况：此时就帮他run！此时调用run不是为了凑成数组，而是就地直接执行
            }
        }
        callback && callback();
    }
    return {
        run
    };
}