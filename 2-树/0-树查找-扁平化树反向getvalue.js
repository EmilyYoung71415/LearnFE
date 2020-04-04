/***
 * 实现一个get函数，使得下面的调用可以输出正确的结果
 * 参考链接: https://juejin.im/post/5bf769e0518825773a2ebfe5
 *          https://github.com/jonschlinkert/get-value
 */
// 栗子：
// const obj = { selector: { to: { toutiao: "FE Coder"} }, target: [1, 2, { name: 'byted'}]};
// get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name');
// // [ 'FE Coder', 1, 'byted']


/********************************
 * 思路：
 *      selector.to.toutiao => obj[selector][to][toutiao]
 *      target[0] => target[0]
 *      target[2].name => target[2][name]
 *  将传入的keys => 以.分割，然后不断迭代直至得到最深处的值
 *  不是.的情况：
 *      [] => 怎么把[]匹配到 然后
 * 思路2：
 *      为什么要转换一下？ [key]得到这样的值？
 *      obj.selector.to.toutiao 不是可以直接读到值么？
 *  ===> 字符串直接转代码： new Function \ eval
 */

let obj = {
    selector: { to: { toutiao: "FE Coder"} }, target: [1, 2, { name: 'byted'}]
};
let obj2 = {time : new Date(), a : "this is a", b : 30};
console.log(getValInFlattenedObj2(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name', 'name.data.e'));
// console.log(getValInFlattenedObj2(obj2, 'time', 'a'));
// way1
function getValInFlattenedObj(obj, ...rest) {
    let result = [];
    rest.forEach(str => {
        // str 将 含有[]的 [ 替换为 . ]替换为空 => target[0] => target.0
        str = str.replace(/\[/g, ".").replace(/\]/g, "");
        let curval;
        try {
            curval = str.split('.').reduce((prev, curr) => {
                return prev[curr];
            }, obj);
        }
        catch (err) {
            console.error(err);
        }
        result.push(curval);
    });
    return result;
}


// 健壮性测试： 输入 'name.data': 加个try catch


// way2
function getValInFlattenedObj2(obj, ...rest) {
    const res = JSON.stringify(obj);
    return rest.map(item => {
        return new Function(`try {return ${res}.${item} } catch(e) {}`)();
    });
    // return rest.map((item) => (new Function(`try {return ${res}.${item} } catch(e) {}`))());
}

// JSON.stringfy后，Date、Function和RegExp类型的变量都会失效
// let obj = {time : new Date(), a : "this is a", b : 30};
// 所以优化为
function getValInFlattenedObj2(obj, ...rest) {
    // const res = JSON.stringify(obj);
    return rest.map(item => {
        return new Function('obj',`try {return obj.${item} } catch(e) {}`)(obj);
    });
}

// 同样 eval 
function getValInFlattenedObj2(obj, ...rest) {
    return rest.map(item => {
        try {
            return eval(`obj.${item}`);
        } catch {
            return;
        }
    });
}