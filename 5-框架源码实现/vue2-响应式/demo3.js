const observer = require('./observer');
const watch = require('./watch');

// step1: data被监听
const data = observer({
    msg: 'test',
    number: 1
});

watch(
    () => data.msg,
    (prev, cur) => {
        console.log('prev', prev);
        console.log('cur', cur);      
    }
);


// step3: 改变data.msg的值 都会执行打印函数
data.msg = 'Hello World';
// data.msg = 'Hello World2';


