// 题目链接：https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/143
// const arr = [{
//     id:'1',
//     name: '广东省',
//     children: [{
//         id:'11',
//         name: '深圳市',
//         children: [{
//             id:'111',
//             name: '南山区',
//         },{
//             id:'112',
//             name: '福田区',
//         }]
//     }]
// }];
// console.log(fn(arr, '112'));
// 实现fn函数 找出链条中所有的父级 id
// const value = '112'
// const fn = (value) => {
// ...
// }
// fn(value) // 输出 [1， 11， 112]

/***
 * 思路：
 *      此题可对应 树-值为x的所有祖先
 *      本质是从根节点遍历到目标节点，记录路径的问题
 * 实现：
 *      后序遍历，弹栈的时候前插根节点
 *      时间复杂度：O(n) 空间O(n) 改为后序遍历的迭代实现的话可降至O(1)
 */
function fn(arr, targetId) {
    let result = [];
    let popRoot = false;
    fnCall(arr);
    return result;

    function fnCall(nodeArr) {
        if (!nodeArr || nodeArr.length === 0) return;

        for (let node of nodeArr) {
            if (node.id === targetId) {
                popRoot = true;
            }
            // 使用popRoot 为了不再继续向下递归 只要在某个结点找到了x值整个递归程序开启回溯模式 所以使用全局flag控制
            !popRoot && node.children && fnCall(node.children);
            popRoot && result.unshift(node.id);
        }
    }
}