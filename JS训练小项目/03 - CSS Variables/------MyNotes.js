/**
 *  @desc 要求；
 *  用 JavaScript 和 CSS3 实现拖动滑块时，
 *  实时调整图片的内边距、模糊度、背景颜色，同时标题中JS两字的颜色也随图片背景颜色而变化。
 * 
 *  实现关键点：
 *      range拖动实施改变图片：
 *          内边距 padding
 *          模糊度：filter：blur
 *          颜色背景 background    
 *  分析阶段：
 *      事件
 *          range :mousemove ----px
 *          input: change ---color
 *      获取页面中input元素，监听change 和 mousemove
 *      一旦触发则更新，更新即获取用户设定的值，将该值作用于目标对象
 *          单位用data-size 自定义化了，即单位设定下方到元素本身  
 *          依据标签的name属性，与全局变量挂钩，即
 *              以name属性作为标识识别，修改全局属性，将实时的值赋予全局变量，而img、h1等均是受全局变量影响
 *  回顾我不太熟悉的点：
 *      1-css变量
 *          全局（`:root`）的 CSS 变量  即`<html>` 标签
 *          定义：
 *              :root{
 *                  --basebg:#fff
 *              }
 *          使用：
 *              img{background:var(--basebg)}
 *      2-用 JavaScript 改变 CSS 属性值:
 *          `document.documentElement` 即代表文档根元素,改变全局的 CSS 变量
 *          document.documentElement.style
 * 
 *      3-css3滤镜：
 *          高斯模糊、毛玻璃效果等
 *      4-data-*自定义属性
 *          不难，但是胜在灵活运用
 */
