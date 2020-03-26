// 阿里实习笔试遇到的：点击元素，返回所经过的元素名称
// 比如点击菜单1.1 返回 [li.menu2,ul,li.menu#active,ul.nav,div#app]

// <div id="app">
//     <ul class="nav">
//         <li class="menu" id="active">
//             <span>导航1</span>
//             <ul>
//                 <li class="menu2">菜单1.1</li>
//                 <li>菜单1.2</li>
//             </ul>
//         </li>
//     </ul>
// </div>
// return [ li.menu2, ul, li.menu#active, ul.nav, div#app ]


/****
 * 题意：点击这个动作：得到当前结点，然后往上追溯记录经过的结点（冒泡的足迹
 * 思路：
 *      node.parentNode
 *      node.tagName\ node.id \ node.className
 */

function bubbleDom(node) {
    let result = [];

    while (node) {
        if (node.tagName === 'BODY') break;
        let str = node.tagName;
        node.className && (str += `#${node.className}`);
        node.id && (str += `#${node.id}`);
        result.push(str);
        node = node.parentNode;
    }

    return result;
}