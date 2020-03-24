// 原始数据
// var menuArr = [
//     { id: 1, pid: 0, value: "china" },
//     { id: 2, pid: 1, value: "guangdong" },
//     { id: 3, pid: 2, value: "shenzhen" },
//     { id: 4, pid: 2, value: "guangzhou" },
//     { id: 5, pid: 0, value: "USA" },
//     { id: 6, pid: 5, value: "AK" }
// ];
// 转换后 buidTree(menuArr)
// buidTree(menuArr) = [{
//     "id": 1,
//     "pid": 0,
//     "value": "china",
//     "children": [{
//         "id": 2,
//         "pid": 1,
//         "value": "guangdong",
//         "children": [{
//                 "id": 3,
//                 "pid": 2,
//                 "value": "shenzhen"
//             },
//             {
//                 "id": 4,
//                 "pid": 2,
//                 "value": "guangzhou"
//             }
//         ]
//     }]
// }]
/***
 * 思路：
 *      根据id能找到pid对应的对象信息
 *      ===> 构建以id为key的map
 *      找到第一层的元素，然后深入层根据pid指向
 *      => 第一层：pid=0
 */
// 第一版
// 首先确定第一层，得到[root1，roo2]
// 然后进入递归 children 遍历children的每个结点，找到以当前结点为父节点的结点作为children，以此确定children二代
// 递归出口：children.length===0
// O(N)
function ArrToTree(menuArr) {
    let tree = menuArr.filter(item => item.pid === 0);;
    return arrToTreeCall(tree);

    function arrToTreeCall(children) {
        if (!children.length) return [];
        // 多叉树的DFS
        for (let node of children) {
            const curres = menuArr.filter(item => item.pid === node.id);
            if (curres.length) {
                node.children = curres;
                arrToTreeCall(node.children);
            }
        }
        return children;
    }
}

// 第二版 优化
// 使用hash 索引结点
// O(1)
function arrToTree(
    arr,
    id = 'id',
    pid = 'pid',
    children = 'children'
) {
    const res = [];
    const hash = {};

    arr.forEach(item => {
        hash[item[id]] = item;
    });

    for (let key in hash) {
        const curpid = hash[key][pid];
        if (!hash[curpid]) {
            res.push(hash[key]);
        } else {
            !hash[curpid][children] && (hash[curpid][children] = []);
            hash[curpid][children].push(hash[key]);
        }
    }
    // 利用的是js的 引用类型
    return res;
}


// 进阶：0-树构建-扁平转树状-keys可预见长度.js