/**
 * @desc Fetch 结合 filter 实现快速匹配古诗
 * 实现目标：
 *      从远程获取数据源，在输入框中输入一个词，迅速匹配，展示含有这个词的诗句
 *      
涉及知识点：
涉及的事件：
    input => change 
            keyup
- Promise
    - `fetch()`
            返回值是一个 Promise 对象。若请求成功，这个对象包含了（对应 Request 的）Response
	- `then()`
	- `json()`
- Array
	- `filter()`
	- `map()`
	- `push()`
	- `join()`
	- Spread syntax 扩展语句
- RegExp—————匹配
	- `match()`
	- `replace()`
 *      
 * 
 * 
 */

 // fetch 
 var myImage = document.querySelector('img');
 
 fetch('flowers.jpg')
 .then(function(response) {
   //  `blob()` 方法来获取图片的内容
   // `blob()`、`text()`、`arrayBuffer()`、`formData()` `.json`
   return response.blob();
 })
 .then(function(myBlob) {
   var objectURL = URL.createObjectURL(myBlob);
   myImage.src = objectURL;
 });