// import Dep from './dep';
const {Dep} = require('../vue2-响应式/dep');
let data = {
    children:[
        {
            name:'1'
        }
    ]
};
let newData = observer(data);
newData.children[0].name = '2'
// 将对象定义为响应式
function observer(data) {
    let newData = Array.isArray(data) ? [] : {};
    for (let key in data) {
        if (typeof data[key] === 'object') {
            newData[key] = observer(data[key]);
        } 
        else {
            newData[key] = data[key];
        }
    }
    
    const dep = new Dep();
    return new Proxy(newData, {
        get(target, key, receiver) {
            dep.depend();
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            console.log('he');
            dep.notify();
            return Reflect.set(target, key, value, receiver);
        }
    });
}
module.exports = observer;