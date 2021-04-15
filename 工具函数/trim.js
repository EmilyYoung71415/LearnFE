/***
 * // 调用字符串两端去掉空白的新字符串。
 *  '   a bv a   ' = 'a bv a'
 */
const str = '   a bv a   '
console.log(trim(str) == str.trim());
// 方法1：
function trim1(str) {
    let flag = false;
    let newstr = '';
    let temp = '';
    for(let i = 0; i < str.length; i++) {
        const s = str[i];
        if (s === ' ' && !flag) continue;
        if (s != ' ') {
            flag = true;
            if (temp.length) {
                newstr += temp;
                temp = '';
            }
            newstr += s;
        } else {
            temp += ' ';
        }
    }
    return newstr;
}

// 方法2：正向遍历之后，再逆向遍历
// ===> 双指针
function trim2(str) {
    let lIdx = 0;
    let rIdx = str.length-1;
    let newstr = '';
    while(str[lIdx] === ' ') {
        lIdx++;
    }
    while(str[rIdx] === ' ') {
        rIdx--;
    }
    for (let i = lIdx; i <= rIdx; i++) {
        newstr += str[i];
    }
    return newstr;
}

// 方法3: 正则
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}