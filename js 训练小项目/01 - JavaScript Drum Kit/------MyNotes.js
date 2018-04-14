/**
 * @desc 模拟打鼓页面
 *      用户键盘按下ASDFGHJKL这几个键时，页面上与字母对应的按钮变大变亮，对应的鼓点声音响起来。
 * 
 * 实现关键点：
 *      键盘事件
 *      播放声音
 *      改变样式
 * 
 * 事件拆分阶段：
 *      1.响应用户操作，并锁定页面标签:
 *          按下键盘=》监听=》根据键盘码锁定对应div标签 + 音频
 *              怎么锁定？注意 data-key 绑定同一个键盘码
 *                  div
 *                  音频
 *      2.锁定标签，让标签干活
 *          音频：
 *              播放
 *          标签：
 *              添加playing class样式 注意，是添加样式而不是替换样式哦
 *      3. 事件发生完，优雅收场(==>恢复原状
 *          标签：
 *              去掉playing样式，[可监听动画消失]。
 *              【亦可，css动画设置，关键帧出现一秒后消失。。】
 *          ===》 监听动画结束：transitionend
 *                监听到每个发生动画的对象上去
 *          
 *          
 *      4. 细节处理：
 *          键被按住不放时，响起连续鼓点声 / 第二次第三次间隔时间很少的点击，期望每次都是新鲜的
 *          ===》 播放之前重置currentTime  = 0;
 *              
 *          非预期输入情况
 *          ===》 若键入非理想键值 ，提前退出
 * 
 * 
 * 回顾我不太熟悉的点：
 *      html相关
 *      1.data-* 还可以用来匹配。。好机智！
 *          扩展： data-* 自定义属性
 *      
 *      2.音频标签相关属性
 *          .play()
 *          currentTime
 *      css相关
 *      3.CSS transitions [https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions]
 *          
 *          transitionened动画结束事件
 *          propertyName 指示已完成过渡的属性
 * 
 *          动画结束，虽是监听的对象的动画但是 该对象不一定只发生transform动画。
 *                   参考：哪些css属性可以"动画"
 *      
 *      web api相关：
 *      4. document：
 *          document.querySelector()  
 *              匹配指定的选择器组的第一个元素
 *              强大的选择模式...var el = document.querySelector("div.user-panel.main input[name=login]");
 * 
 *          document.querySelectorAll 
 *              返回所有匹配的元素
 *      5. element: ===》 js动态添加元素样式
 *          element.classList 类属性集合
 *              add /  remove / toggle 
 *  
 */