/***
 * const root = document.querySelector('.wrapper');
 * res = getElementById(root, 'demo')
 */

// <div class="wrapper">
// <section class="header">
//   <div class="logo"></div>
// </section>
// <section class="main">
//   <div class="sidebar">
//     <ul class="menu">
//       <li class='li'>
//         <!-- 目标节点 -->
//         <a href="" id='demo'>li1-a</a>
//       </li>
//       <li class='li'>
//         <a href="">li2</a>
//       </li>
//     </ul>
//   </div>
// </section>
// <section class="footer">
//   <div class="copyright"></div>
// </section>
// </div>

// 遍历树的每一个结点，目标结点即 node.id === id;
// 错误：递归结构设计错误，这样的递归 之后遍历一层 之后都会return
function getElementById(root, id) {
    if (!root) return null;
    if (root.id === id) return node;

    if (root.children) {
        for (let node of root.children) {
            return getElementById(node, id);
        }
    }
    return null;
}

// 纠正
// 评价： 找到了 target 还在继续往下遍历 
// 优化：设计一个flag
function getElementById(root, id) {
    let target = null;
    getElementByIdCall(root, id);
    return target;

    function getElementByIdCall(root, id) {
        if (!root) return;
        if (root.id === id) {
            target = root;
            return;
        }
        for (let node of root.children) {
            getElementByIdCall(node, id);
            // !target && getElementByIdCall(node, id); 带flag版
        }
    }
}