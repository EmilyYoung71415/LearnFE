/**
 * 实现一个 LazyMan，可以按照以下方式调用：
 * 方法：
 *      sleep
 *      eat
 *      sleepFisrt
 * 链式调用
 * 如：
 *      LazyMan("Hank")
 *          ===-> Hi! This is Hank!
 *      LazyMan("Hank").sleep(10).eat("dinner")
 *          ===->Hi! This is Hank!\ (等待十秒)Wake up after 10 \ Eat dinner
 *      LazyMan("Hank").sleepFirst(5).eat("supper")
 *          ===->(等待5秒) Wake up after 5 \ Hi This is Hank!\Eat supper
 */


class LazyMan {
    constructor(name) {
        this.name = name
        this.sayName = this.sayName.bind(this)
        this.next = this.next.bind(this)//从消息队列中取出函数 并执行
        this.queue = [this.sayName]
       // setTimeout(this.next, 0)
    }

    // callByOrder(queue) {
    //     let sequence = Promise.resolve()
    //     let track = []
    //     queue.forEach(item => {
    //         sequence = sequence.then(item)
    //     })
    // }

    next() {
        const currTask = this.queue.shift()
        currTask && currTask()
    }

    sayName() {
        console.log(`Hi! this is ${this.name}!`)
        this.next()
    }
    // 将函数外加 settimeout变为延缓执行函数
    holdOn(time) {
        setTimeout(() => {
            console.log(`Wake up after ${time} second`)
            this.next()
        }, time * 1000)
    }

    sleep(time) {
        this.queue.push(this.holdOn(time))
        return this
    }

    eat(meal) {
        this.queue.push(() => {
            console.log(`eat ${meal}`)
            this.next()
        })
        return this
    }
    // 首先插入队列， 第一个执行的函数
    sleepFirst(time) {
        this.queue.unshift(this.holdOn(time))
        return this
    }
}

let a = new LazyMan('xiaoghong')
a
    .eat('面')
    .eat('水饺')
    .sleep(2)
    .sleepFirst(1)


/**
 * 总结：
 *      思路就是：
 *      .eat(xxx) .sleep 等这些动作函数都push到一个函数队列中
 *      每次.eat之后 先负责push该函数进入队列， 其次调用本次的执行this.next
 *      this.next 负责调用每次队首的函数
 * 
 */



/****
 * 参考：
 * https://github.com/fi3ework/blog/issues/36
 * 
 * 联想到sleep函数
 */