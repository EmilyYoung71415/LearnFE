/***
 * 字节跳动面试题：提供一个 VDOM 对象，写一个 render 函数来让他变成一颗 DOM 树
 * 将类似以下JSON表示的树状结构（可以无限层级）
 * 阿里云
 * 通过parseDOM函数（使用document.createElement，document.createTextNode，appendChild等方法），生成一颗DOM树（返回一个element元素）
 */
const JsonTree = {
    "tagName": "ul",
    "props": {
        "className": "list",
        "data-name": "jsontree"
    },
    "children": [{
            "tagName": "li",
            "children": [{
                "tagName": "img",
                "props": {
                    "src": "//img.alicdn.com/tps/TB1HwXxLpXXXXchapXXXXXXXXXX-32-32.ico",
                    "width": "16px"
                }
            }]
        },
        {
            "tagName": "li",
            "children": [{
                "tagName": "a",
                "props": {
                    "href": "https://www.aliyun.com",
                    "target": "_blank"
                },
                "children": "阿里云"
            }]
        }
    ]
};


/****
 * 题目解析：
 *  1、props： 挂在在节点上的各种属性
 *             src、width、target、href等 
 *  2、元素节点
 *          如果有tagName： 就是生成特殊节点
 *          如果没有，默认是文本节点
 *  数据结构与算法知识点:
 *      根据json构造出树 ===> 深度遍历多叉树 根据读取到的节点属性 然后做些翻译的事
 * 
 *  dom知识点：
 *      根据tagName创建节点：   document.createElement，document.createTextNode，
 *      props的翻译：element[_key] = props[_key]; 
 */

function parseDOM(jsontree) {
    const {tagName, children, props}  = jsontree;
    const element = document.createElement(tagName);
    for (let _key in props) {
        element[_key] = props[_key];
    }
    if (children && typeof (children) === "object") {
        for (let vnode of children) {
            element.appendChild(parseDOM(vnode));
        }
    } 
    else if (children) {
        element.appendChild(document.createTextNode(children));
    }
    return element;
}

document.getElementsByTagName("body")[0].appendChild(parseDOM(JsonTree));