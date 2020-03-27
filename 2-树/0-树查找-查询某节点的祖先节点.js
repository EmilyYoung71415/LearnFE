// 找出树中某结点的祖先结点，比如输入zhonghuamen 返回jiangsu
// 要求查出祖先链后函数立即返回，不再继续递归遍历后面的节点
const options = [{
        id: 'zhejiang',
        text: 'Zhejiang',
        children: [{
            id: 'hangzhou',
            text: 'Hangzhou',
            children: [{
                id: 'xihu',
                text: 'West Lake'
            }]
        }]
    },
    {
        id: 'jiangsu',
        text: 'Jiangsu',
        children: [{
            id: 'nanjing',
            text: 'Nanjing',
            children: [{
                id: 'zhonghuamen',
                text: 'Zhong Hua Men'
            }]
        }]
    }
];
// findRoot
console.log(recursion(options, 'zhonghuamen'));
function recursion(arr, target, res) {
    if (!arr || arr.length === 0) return res;

    for (let node of arr) {
        if (node.id === target) {
            res = node.id;
        }
        if (!res && node.children) {
            res = recursion(node.children, target, res);
        }
        // 弹栈后 将目标结点 改为 父节点 赋值给res 层层往上则得到祖先结点
        else {
            res = node.id;
        }
    }

    return res;
}