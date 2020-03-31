// 输出目录结构， 目录深度最高10层， 输出可折叠的效果， 样式不限制。
const arr = [{
    "path": "src/assets/example.xlsx"
},{
    "path": "src/assets/example.jpg"
},{
    "path": "src/assets/example.png"
},{
    "path": "src/components/File.vue"
},{
    "path": "src/components/Header.vue"
},{
    "path": "src/components/SenderList.vue"
},{
    "path": "src/components/Step.vue"
},{
    "path": "src/components/Uploader.vue"
},{
    "path": "src/App.vue"
}]

/****
 * 难点：
 *      可折叠的树菜单怎么写。。（好友列表、文件目录) 甚至 菜单怎么写。。。
 *      当前数组转换为树
 */


/***
 * 步骤1： 将arr转换为树结构，其中树结构的设计可以
 *  way1: 
    const treeData = [{
        title: 'src',
        children: [{
            title: 'assets',
            children: [{
                title: 'example.jpg'
            },{
                title: 'example.png'
            }]
        }]
    }];
 *  way2:
    const tree = {
        "src": {
            "assets": {
                "example.xlsx": 1,
                "example.jpg": 1
            },
            "components": {
                "File.vue": 1,
                "SenderList.vue": 1
            },
            "App.vue": 1
        },
    }
 */

/****
 * path2tree
 * way1实现方式：
 * children:[]的数组 作为迭代点
 * 
 */
// way1
// console.log(path2tree1(arr));
// 遍历思路是 ： pathArr 从根到叶子
// 生成的[] 也是从根到叶子
// 每遍历一个path 就完善树
// 去重的校验 是通过 在每层的children 里 找到当前pathname 没有才生成 {title, children}, 有的话直接迭代chilren
function path2tree1(arr) {
    let result = [];

    arr.forEach(obj => { 
        // [src, components, Header.vue]
        const pathArr = obj.path.split('/');
        // 利用了引用类型 
        let curArr = result;
        pathArr.forEach((pathname, index) => {
            // 叶子节点
            if (index === pathArr.length - 1) {
                curArr.push({
                    title: pathname
                })
            }
            else {
                let pNode = curArr.find(p => p.title === pathname);
                if (!pNode) {
                    pNode = {
                        title: pathname,
                        children: []
                    };
                    curArr.push(pNode)
                }
                curArr = pNode.children;
            }
        });
    })
    // 所以直接result 就得到了结果值
    return result;
}

// way2
// 遍历的思路是
// path 从 根到叶子
// 根到叶子之前 的每一步 都是 
// 向下迭代 也是依赖于 currentCache = currentCache[current];
console.log(path2tree(arr));
function path2tree(arr) {
    const tree = {};
    arr.map(o => o.path).forEach(p => buildTree(p));
    return tree;

    function buildTree(path) {
        const pathArr = path.split('/');
        const leafname = pathArr.pop();
        let curObj = tree;

        // 从根节点遍历到 叶子节点之前的节点
        pathArr.forEach(pathname => {
            if (!curObj[pathname]) {
                curObj[pathname] = {};
            }

            curObj = curObj[pathname];
        })

        curObj[leafname] = 1;
    }
}