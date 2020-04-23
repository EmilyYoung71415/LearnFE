// import Dep from './dep'; 在watcher里引用
// import observer from './observer';
// import Watcher from './watcher';
const observer = require('./observer');
const Watcher = require('./watcher');

// step1: data被监听
const data = observer({
    msg: 'test',
    number: 1
});

// step2： 代表update的渲染函数，交给watcher管理，渲染函数依赖了data，所以是data的订阅者
//         watcher负责将该订阅者 添加到 deps 信息调度中心， 所以deps在每次变化 都能通知到 该渲染函数
new Watcher(() => {
    console.log(data.msg);
});

// step3: 改变data.msg的值 都会执行打印函数
data.msg = 'Hello World';
data.msg = 'Hello World2';