// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan("Hank")输出:
// Hi! This is Hank!
//  
// LazyMan("Hank").sleep(10).eat("dinner")输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
//  
// LazyMan("Hank").eat("dinner").eat("supper")输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
//  
// LazyMan("Hank").sleepFirst(5).eat("supper")输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

/*******************************
 * 总结lazyman开放的接口：
 * 1、constructor
 * 2、sleepFirst
 * 3、sleep
 * 4、eat
 * 
 * 如果注册了sleepFirst 则优先执行sleepFirst的函数
 * constructor
 * sleep 暂停x秒
 * eat 执行的是同步函数 但是是链式调用 必须等上一个动作完毕后才能执行
 */

/********************************
 * 一看链式调用，上一个执行完了下一个才能执行的
 * contructor的执行 可能晚于某个函数的，
 *      即回调的注册是在constructor调用之前 且 调用时判定回调队列里某些应该提前执行的函数
 * ==> promise
 * 将sleepFirst函数 比作 微任务 宏任务
 * 1、微任务里 的所有任务 （串行执行
 * 2、constructor 绑定执行
 * 3、微任务执行完之后，宏任务开始串行执行
 */

class LazyMan {
    constructor(name) {
        this.name = name;
        this.microTaskList = []; // 微任务
        this.macroTaskList = []; // 宏任务

        // 引入微任务使得先注册回调 再执行constructor
        Promise.resolve()
        .then(() => this.runInOrder(this.microTaskList))
        .then(() => this.sayHello())
        .then(() => this.runInOrder(this.macroTaskList));
    }
    sleepFirst(time) {
        this.taskListAdd({type: 'micro', funcType: 'sleepFirst', params: {time}});
        return this;
    }
    sleep(time) {
        this.taskListAdd({type: 'macro', funcType: 'sleep', params: {time}});
        return this;
    }
    eat(food) {
        this.taskListAdd({type: 'macro', funcType: 'eat', params: {food}});
        return this;
    }
    sayHello() {
        console.log(`Hi This is ${this.name}`);
    }
    runInOrder(promiseArr) {
        return promiseArr.reduce(
            (prevPromise, nextPromise) => prevPromise.then(() => nextPromise()),
            Promise.resolve()
        );
    }
    taskListAdd({type, funcType, params}) {
        // let promise = {};
        let func = () => {};
        switch (funcType) {
            case 'sleep':
            case 'sleepFirst':
                func = () => new Promise(resolve => {
                    setTimeout(() => {
                        console.log(`Wake up after ${params.time}`);
                        resolve();
                    }, params.time * 1000);
                });
                break;
            case 'eat':
                func = () => new Promise(resolve => {
                    console.log(`Eat ${params.food}~`);
                    resolve();
                });
                break;
            default:
                break;
        }

        this[`${type}TaskList`].push(func);
    }
}

// new LazyMan("Hank").sleep(2).eat("dinner");
// new LazyMan("Hank").eat("dinner").eat("supper");
// new LazyMan("Hank").sleepFirst(2).eat("supper")