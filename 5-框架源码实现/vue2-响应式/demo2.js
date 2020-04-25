const observer = require('./observer');
const Watcher = require('./watcher');
const computed = require('./computed');

// step1: data被监听
const data = observer({
    msg: 'test',
    number: 1
});


const computedNum = computed(() => data.number + 3);

new Watcher(() => {
    console.log('computedNum.value' + computedNum.value);
});

data.number = 10;