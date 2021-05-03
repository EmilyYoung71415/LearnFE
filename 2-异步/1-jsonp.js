/***
 * jsonp
 * 1、动态创建js文件
 * 2、构建js的src（拼接url&params
 * 3、js载入成功的回调
 *      将callback的函数挂在window上
 */
// 用例：
// xx.api.com?id=xxx&name=xx&callback=functionname
// jsonp({
//     url: 'xx.api.com',
//     params: 'id=xxx&name=xx',
//     callback: 'functionname'
// }).then(res => {
//     console.log(res);
// })

function jsonp({url = '', params = '', callback = ''}) {
    return new Promise((resolve, reject) => {
        const $js = document.createElement('script');
        $js.src = `${url}?${params}&callback=${callback}`;
        document.body.appendChild($js);
        // $js.onload = function() {
            window[callback] = function(res) {
                resolve(res);
                document.body.removeChild($js);
            }
        // }
    });
}