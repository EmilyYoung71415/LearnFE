/**
 * Promise + 队列
 * 
 * 在对象内部维护一个队列，让所有的事件都变成异步的，
 * 然后在内部通过 Promise.resolve.then() 来将队列的执行启动推迟到下一个 eventloop，
 * 这样做逻辑更清楚，所有事件都由队列来管理。
 */

class LazyMan {
    constructor(name) {
      this.name = name
      this.sayName = this.sayName.bind(this)
      this.queue = [this.sayName]
      Promise.resolve().then(() => this.callByOrder(this.queue))
    }
  
    callByOrder(queue) {
      let sequence = Promise.resolve()
      let track = []
      queue.forEach(item => {
        //sequence = 
        sequence.then(item)
      })
    }
  
    sayName() {
      return new Promise((resolve) => {
        console.log(`Hi! this is ${this.name}!`)
        resolve()
      })
    }
  
    holdOn(time) {
      return () => new Promise(resolve => {
        setTimeout(() => {
          console.log(`Wake up after ${time} second`)
          resolve()
        }, time * 1000)
      })
    }
  
    sleep(time) {
      this.queue.push(this.holdOn(time))
      return this
    }
  
    eat(meal) {
      this.queue.push(() => {
        console.log(`eat ${meal}`)
      })
      return this
    }
  
    sleepFirst(time) {
      this.queue.unshift(this.holdOn(time))
      return this
    }
  }

  let man = new LazyMan('xiaoming3')
  man.eat('饭')
    .sleep(0.2)
    .eat('ahahha')