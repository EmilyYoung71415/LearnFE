/**
 * @desc 鼠标文字阴影跟随效果
 * 
 *      随着鼠标的移动，鼠标在文字中心点的时候，无阴影
 *      鼠标开始移动生成4段阴影 方向不一
 *      鼠标的hover跟随
 * 
 * 思路：
 *      text-shadow 属性
 *      text-shadow: h-shadow v-shadow blur color
 *      4个阴影(类似渐变效果)
 *      
 *      
 *      截取鼠标的实时移动坐标
 *      更新shadow style
 * 
 *      !important 看着对应的特效，解析动画动作
 *      使用编程语言进行思想转换
 */