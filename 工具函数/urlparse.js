/***
 * 
 * 解析url的请求
 * http://www.baidu.com/?name=%E5%BC%A0%E4%B8%89&age=12
 * return {name: '张三', age:12}
 */
const url = 'http://www.baidu.com/?name=%E5%BC%A0%E4%B8%89&age=12';
console.log(parseUrl(url));
function parseUrl(url) {
    // http://www.baidu.com/?name=%E5%BC%A0%E4%B8%89&age=12
    const [urlRoot, param] = url.split('?');
    const params = param.split('&');
    // const res = {};
    // params.forEach(item => {
    //     const [key, val] = item.split('=');
    //     res[key] = decodeURI(val); // decodeUri
    // });
    // return res;
    const res = params.reduce((cur, item) =>{
        const [key, val] = item.split('=');
        cur[key] = decodeURI(val);
        return cur;
    }, {});
    return res;
}