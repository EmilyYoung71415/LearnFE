let person = {
    name: 'hello'
};

function updatePerson(obj) {
    obj.name = '2'; // 1. 对象存储的是引用地址，传来传去、赋值给别人那都是在传递值（存在栈上的那个内容），别人一旦修改对象里的属性，大家都被修改了。
    obj = {};  // 2.这里的修改(对象被重新赋值) 不会把外面的person给修改为{}, 除非是在外面修改person = {}
    return obj;
}
console.log('1', person);
updatePerson(person);
console.log('2', person);