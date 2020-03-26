/****
 * dom是多叉树 一般采用DFS\BFS
 * api: node.children
 * 
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

// const root = document.querySelector('.wrapper');
// console.log(DFS(root));
// res = [div.wrapper, section.header, div.logo, section.main, div.sidebar, ul.menu, li.li, a#demo, li.li, a, section.footer, div.copyright]
function DFS(root) {
    if (!root) return [];
    let result = [root];
    DFSCall(root);
    return result;

    function DFSCall(root) {
        if (!root || !root.children) return;
        for (let node of root.children) {
            result.push(node);
            DFSCall(node);
        }
    }
}