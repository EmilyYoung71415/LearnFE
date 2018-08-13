/**
 * @desc 利用写一个类似TODOlist菜单功能，且实现本地存储
 * 
 * 事件:
 *      1.点击submit提交事件条
 *          按钮，submit，禁止默认行为
 * 
 *      2. //addItem 
 *         收集数据push到预渲染列表
 *         local一下
 *      3.//内容更新
 *          return  ``
 *           plateslist.innerHTML = plates.map((plate, i) => {
                return `
                  <li>
                      <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} >
                      <label for="item${i}">${plate.text}</label>
                  </li>
                `;
            }).join('');

        4.localstorage 更新
        5.数据与渲染分离，第一现场专注处理数据。统一render涉及数据与更新的对应
 * 
 */