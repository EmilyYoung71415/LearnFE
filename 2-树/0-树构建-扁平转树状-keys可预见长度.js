var data = [
    {
      province: "浙江",
      city: "杭州",
      name: "西湖",
      area: 'A区'
    },
    {
      province: "四川",
      city: "成都",
      name: "锦里",
      area: 'D区'
    },
    {
      province: "四川",
      city: "成都",
      name: "方所",
      area: 'B区'
    },
    {
      province: "四川",
      city: "阿坝",
      name: "九寨沟",
      area: 'C区'
    }
  ];
  

var keys = ['province', 'city', 'name', 'area']

// var res = transObject(data, keys)
// = [{
//     "value": "浙江",
//     "children": [{
//         "value": "杭州",
//         "children": [{
//             "value": "西湖"
//         }]
//     }]
// }, {
//     "value": "四川",
//     "children": [{
//         "value": "成都",
//         "children": [{
//             "value": "锦里"
//         }, {
//             "value": "方所"
//         }]
//     }, {
//         "value": "阿坝",
//         "children": [{
//             "value": "九寨沟"
//         }]
//     }]
// }]

/***
 *  思考：这种关系是 指定了最多会有多少层，且每一层的关系由keys传入指定
 *       求转换
 */
console.log(arrToTree(data, keys));
// 将一个扁平化对象组成的列表，变成树形化的列表
function arrToTree(list=[], keys=[]) {
    return list.reduce(
        (result, obj) => toTreeList(obj, keys, result),
        []
    );

    // 将一个扁平对象的树形化产物，不重复地放到 list 里
    function toTreeList(obj, keys, list = []) {
        let value = obj[keys[0]];
        let target = list.find(item => item.value === value);
        if (target) {
            toTree(obj, keys, target);
        } 
        else {
            list.push(toTree(obj, keys));
        }
        return list;
    }

    // 将一个扁平对象，根据 keys 树形化
    // [key, ...rest] 区别第一个key 和剩余key
    function toTree(obj, [key, ...rest], result = {}) {
        if (result.value == null) {
            result.value = obj[key];
            if (rest.length) {
                result.children = toTreeList(obj, rest);
            }
        }
        // xxx.children 名草有主了，然后新的obj 在xx的children下发芽
        else if (result.value === obj[key] && rest.length) {
            toTreeList(obj, rest, result.children);
        }
        return result;
    }
}



// 还有种解法是 使用字典树