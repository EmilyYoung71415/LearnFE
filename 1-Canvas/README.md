参考自：《《HTML5 Canvas核心技术图形动画与游戏开发》.((美)David Geary)》
and：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D

<!-- 
    问题： 
        canvas是顺序执行的，一次性代码，即同步把所有东西画完
        如果是异步的话  则是擦除了整个画布，然后进行画？

        那画笔是如何实现的？难道也是每次新增的画是 重画了之前的么
 -->