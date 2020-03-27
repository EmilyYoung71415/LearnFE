// 递归函数查询
// 要求查出祖先链后函数立即返回，不再继续递归遍历后面的节点
// 函数要有一个参数来指定tree的节点的主键名
// 使用示例代码中的options作为tree结构的参考


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

function recursion(_primary, _options) {
    var _parent = null;
    for (var i = 0; i < _options.length; i++) {
        if (_options[i].id !== _primary) {
            if (!_options[i].children) {
                return null;
            }
            _parent = recursion(_primary, _options[i].children);
            if (_parent) {
                _parent = _options[i];
                return _p
            }
        }
    }
}