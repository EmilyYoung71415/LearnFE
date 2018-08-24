// 基于promise
class LazyMan {
    constructor(name) {
        this.name = name
        this._preSleepTime = 0
        this.sayName = this.sayName.bind(this)
        this.p = Promise.resolve().then(() => {
            if (this._preSleepTime > 0) {
                return this.holdOn(this._preSleepTime)
            }
        }).then(this.sayName)
    }

    sayName() {
        console.log(`Hi! this is ${this.name}!`)
    }

    holdOn(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`Wake up after ${time} second`)
                resolve()
            }, time * 1000)
        })
    }

    sleep(time) {
        this.p = this.p.then(
            () => this.holdOn(time)
        )
        return this
    }

    eat(meal) {
        this.p = this.p.then(() => {
            console.log(`eat ${meal}`)
        })
        return this
    }

    sleepFirst(time) {
        this._preSleepTime = time
        return this
    }
}

let man = new LazyMan('xiaoming')
man.eat('饭')