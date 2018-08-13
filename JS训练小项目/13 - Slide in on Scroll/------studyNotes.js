/**
 * @desc 图片滚动定点显示的动画
 *      图片离开可视区域 图片又向两侧滑出
 *  
 *  拆分
 *      移动：
 *          css 
 *              translateX 来控制左右移动
 *              scale 来控制缩放
 *      滚轮滚动
 *          window.scrollY  文档从顶部开始滚动过的像素值
 *          window.innerHeight viewport 部分的高度
 *          ele.height  元素的高度
 *          ele.offsetTop   当前元素顶部相对于其 offsetParent 元素的顶部的距离
 * 
 *      性能方面
 *          既然涉及滚动监听，那么debounce函数降低事件监听的频率
 * 
 *      
 *  过程：
 *      获取所有涉及到的图片
 *          const slideImages = document.querySelectorAll('.slide-in');
 *      滚动事件监听
 *          window.addEventListener('scroll', debounce(checkSlide));
 * 
 *      每次监听到的滚动事件，遍历所有图片元素，判断是否图片显示或隐藏
 *      
 *      图片显示策略
 *          当滑过了图片一半并且未完全滑过图片 显示图片
 * 
 *      语义化：
 *          add\remove class标签表示具体的动作
 *          class标签内含动画\css属性
 */