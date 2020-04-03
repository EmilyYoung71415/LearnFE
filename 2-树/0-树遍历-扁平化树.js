/**********
* 实现flattenedObj函数 使得传入的对象属性展开
* 
* 常见应用场景：深层次对象属性查找如文章目录里搜索文章
* 解决方案：
*     深层次对象扁平化：多层对象 => 单层对象
*/

// const obj = {
//     foo: 1,
//     bar: {
//         sub1: 2,
//         sub2: {
//             sub3: 3
//         }
//     }
// };
// return => { foo: 1, 'bar.sub1': 2, 'bar.sub2.sub3': 3 }

const obj = {
    foo: 1,
    bar: {
        sub1: 2,
        sub2: {
            sub3: 3
        }
    }
};
// console.log(flattenedObj(obj));
/********************************
 * 思路：
 *      遍历树 记录路径的题型
 *      当遍历到叶节点时，不再递归，将沿途经过记录下的key扁平化挂载在对象上
 */
// console.log(flattenedObj2(obj))
// way1：递归实现
function flattenedObj(options) {
    let result = {};
    iterator(options, '', result);
    return result;

    function iterator(obj, prefix, res) {
        let keys = Object.keys(obj);
        for (let key of keys) {
            let val = obj[key];
            let newprefix = prefix + key;
            // 当前遍历节点是对象的时候 一直迭代 深入递归
            if (isObj(val)) {
                iterator(val, newprefix + '.', res);
            } else {
                res[newprefix] = val;
            }
        }
    }

    function isObj(obj) {
        return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1] === 'Object';
    }
}


// way2: 非递归实现
function flattenedObj2(obj) {
    let leafArr = [];
    let res = {};

    if (isObj(obj)) {
        let rootarr = getRootArr(obj, '');

        while(rootarr.length) {
            let item = rootarr.shift();
            if (isObj(item.children)) {
                let p = item.parent ? item.parent + '.' + item.key : item.key;
                rootarr = getRootArr(item.children, p).concat(rootarr);
            }
            else {
                // arr里存放的都是叶节点
                // [{key:1-1,children:'aa', parent:1}]
                // => 1-1-1:'aa'
                leafArr.push(item);
            }
        }
    }

    leafArr.forEach(({key, children, parent}) => {
        let mixkey = [parent, key].filter(d => d).join('.');
        res[mixkey] =  children;
    });

    return res;

    // 第一层的节点 放入arr
    // [{key:'foo',val:xx, parent:''},{key:'bar',val:xx}]
    function getRootArr(obj, parent) {
        let arr = [];
        for(let key in obj) {
            let children = obj[key];
            arr.push({key, children, parent});
        }
        return arr;
    };

    function isObj(obj) {
        return Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1] === 'Object';
    }
}


/***
 * 应用
 */
const origindata =  {
	'home': 'home page',
	'inner': {
		'oa': 'oa page',
		'jira': 'jira page',
		'wiki': 'wiki page',
		'cw': {
			'cl': 'cl page',
			'rc': {
				'taxi': 'taxi page',
				'tel': 'tel page'
			}
		}
	},
	'login': 'login page',
	'logout': 'logout page',
	'test': {
		'android': 'android page',
		'ios': 'ios page',
		'web': {
			'vue': 'vue page',
			'react': 'react page',
			'jquery': 'jquery page'
		},
		'cpp': {
			'linux': 'linux page',
			'windows': {
				'xp': 'xp page',
				'w7': 'w7 page',
				'w8': 'w8 page',
				'w10': 'w10 page'
			}
		}
	}
}

const transData = flattenedObj2(origindata);
const transKeys = Object.keys(transData);
const inputval = 'react';
// new RegExp(inputval).test(key) or key.indexOf(inputval)
const result = transKeys.filter(key => key.indexOf(inputval) > -1).map(key => {return {key, val:transData[key]}});
console.log(result);