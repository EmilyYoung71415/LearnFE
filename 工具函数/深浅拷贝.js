/**
 *  浅拷贝
 *      两个对象仅第一层的引用不相同
 *      我们可以通过 assign 、扩展运算符等方式来实现浅拷贝：
 */

let a = {
    age: 1
}
let b = Object.assign({}, a)
a.age = 2
// console.log(b.age) // 1
b = {...a}
a.age = 3
// console.log(b.age) // 2


// 浅拷贝的问题：当对象里含有对象的时候，修改第一层对象会由于直接修改掉了 第一层的引用而丢失其他
const initOptions = {
    proj: 'proj1',
    conf: {
        title: 'title1',
        options: {
            label: 'label1'
        }
    }
}

// 问题1：为什么需要深拷贝
// -----拷贝后的元素 修改第2层的对象，也会导致拷贝的原数据被修改
//         但是我使用 浅拷贝，修改第二层属性 也没修改到第一层啊。。。 从一开始就是新的对象的啊 {} 在新的对象上 去建立新的obj
// JavaScript 中存在“引用类型“和“值类型“的概念。
// 因为“引用类型“的特殊性，导致我们复制对象不能通过简单的clone = target,
// 所以需要把原对象的属性值一一赋给新对象

// way1：JSON.parse(JSON.stringify(object))
    // 弊端：1.只支持 JSON 支持的类型,并不支持 JS 中的所有类型 2.不能处理循环引用：a: a
// 利用 WeakMap 解决循环引用
let map = new WeakMap()
function deepClone(obj) {
  if (obj instanceof Object) {
    if (map.has(obj)) {
      return map.get(obj)
    }
    let newObj
    if (obj instanceof Array) {
      newObj = []     
    } else if (obj instanceof Function) {
      newObj = function() {
        return obj.apply(this, arguments)
      }
    } else if (obj instanceof RegExp) {
      // 拼接正则
      newobj = new RegExp(obj.source, obj.flags)
    } else if (obj instanceof Date) {
      newobj = new Date(obj)
    } else {
      newObj = {}
    }
    // 克隆一份对象出来
    let desc = Object.getOwnPropertyDescriptors(obj)
    let clone = Object.create(Object.getPrototypeOf(obj), desc)
    map.set(obj, clone)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key])
      }
    }
    return newObj
  }
  return obj
}


    // 递归容易爆栈，遍历解决：层序遍历（BFS）的问题了，通过数组来模拟执行栈就能解决爆栈问题



// 问题2：
// 我只想修改conf下面的title 希望conf下的其他元素不变
// 浅拷贝会导致，conf.options也被丢失
const updateOptions = {
    conf: {
        title: 'title1-update',
    }
}

const newOptions = Object.assign({}, initOptions, updateOptions);
newOptions.conf.title =  1111;

// console.log(initOptions); // { proj: 'proj1', conf: { title: 'title1-update' } }
// 解决方法：合并对象的时候，要逐一对比 原对象，做增量diff修改 or 新增 当删除的时候 以option1为主 而不是option2

// 深拷贝
// const newOptions = Object.assign({}, initOptions, updateOptions);


// 深拷贝的难点 深拷贝的问题 = 浅拷贝+递归
// 循环引用问题：假如目标对象的属性间接或直接的引用了自身，就会形成循环引用，导致在递归的时候爆栈。
// 设置一个Map用于存储已拷贝过的对象，当检测到对象已存在于Map中时，取出该值并返回即可避免爆栈
    // 使用WeakMap做循环检测，比使用Map好在哪儿？
    // 原生的WeakMap持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行。
    // 如果 target 非常庞大，那么使用Map 后如果没有进行手动释放，这块内存就会持续的被占用。而WeakMap则不需要担心这个问题。
