/**
 * @desc 真实时钟滴滴答答
 *       让时钟根据当前事件转起来，并且每秒都在变化
 * 
 * 分析：
 *     获取当前时间--》 确定分针秒针时针转动的正确角度
 *     指针对应的角度，css 旋转
 *     实时的，更新问题 每隔一秒更新一次 
 * 
    // 指针旋转中心不在圆心
        调整指针的初始位置以及旋转的轴点
            transform-oragin: 100%;
        调整时钟指针跳动时的过渡效果
            transition: all .5s;
        设置指针成为回弹的形式
            transition-time-function 滴答滴答

 * 扩展：
 *      初始化到回归正常角度的动画问题 
 *         时针分针三针起点都在一个地方，回归正常的角度即不同针转动不一样    
 *          每个针设置缓入动画 隔500ms再开始执行
 * 
 * bug：
 *      角度的大小变化引起闪现
 *          当秒针旋转一圈之后回到初始位置，开始第二圈旋转，角度值的变化时 444° → 90° → 96° ....
 * 
 *      解决：
 *          将每秒重新 new 一个 Date 对象，改为初次获取时间值，让角度一直在此基础上保持增长
 *          即更改角度值
 * 
 * 回顾我不熟悉的点：
 *     css属性
 *         transform-origin 设置旋转元素的基点位置：
 *              transform-origin: center; 
 *              transform-origin: top left;
 *              transform-origin: 50px 50px;
 *              transform-origin: bottom right 60px; 60px 即z轴离屏幕60px
 *         transition  
 *              作用梗概：
 *                  决定哪些属性发生动画效果
 *                  决定何时开始 (设置 delay）
 *                  决定持续多久 (设置 duration) 
 *                  决定如何动画 (定义timing funtion) 匀速或先快后慢
 *              // 多个属性一起动画
 *                  transition:width 2s, height 2s, background-color 2s, transform 2s;
 *              
 *              // 定义过渡
 *                  transition-property 指定哪个或哪些 CSS 属性用于过渡
 *                  transition-duration  过渡的时长
 *                  transition-timing-function 缓动函数  贝塞尔曲线(类比Ae曲线关键帧)
 *                         cubic-bezier(x1, y1, x2, y2)
 *                  transition-delay 指定延迟
 *              // 检测过渡是否完成 过渡完成时触发的事件
 *                  transitionend
 */