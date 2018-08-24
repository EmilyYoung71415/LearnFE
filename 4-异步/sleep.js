// 利用for 暴力版
function sleep(sleepTime) {
    for(var start = new Date(); new Date() - start <= sleepTime;) {

    }
}
var t1 = new Date()
sleep(1000)
var t2 = new Date()
console.log(t2 - t1)    


// promise
/**
 * 实际上利用了settimeout 没有进程阻塞 不会性能及负载问题
 */
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}
  
const t1 = +new Date()
sleep(3000).then(() => {
    const t2 = +new Date()
    console.log(t2 - t1)
})


// gernerator
function sleep(delay) {
    return function(cb) {
      setTimeout(cb.bind(this), delay)
    };
  }
  
  function* genSleep() {
    const t1 = +new Date()
    yield sleep(3000)
    const t2 = +new Date()
    console.log(t2 - t1)
  }
  
  async(genSleep)
  
  function async(gen) {
    const iter = gen()
    function nextStep(it) {
      if (it.done) return
      if (typeof it.value === "function") {
        it.value(function(ret) {
          nextStep(iter.next(ret))
        })
      } else {
        nextStep(iter.next(it.value))
      }
    }
    nextStep(iter.next())
  }


  // Async/Await 版本
function sleep(delay) {
    return new Promise(reslove => {
      setTimeout(reslove, delay)
    })
}
  
!async function test() {
    const t1 = +new Date()
    await sleep(3000)
    const t2 = +new Date()
    console.log(t2 - t1)
  }()




  /**
   * 参考
   * https://github.com/jawil/blog/issues/30
   * 
   * 
   */