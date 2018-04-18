/**
 * @desc 
 *  目标描述：
 *      功能：点击任意一张图片，图片展开，同时从图片上下两方分别移入文字。
 *          点击已经展开的图片后，图片被压缩，同时该图片上下两端的文字被挤走。
 *      实际：改为将flex弹性布局 实现页面效果图
 * 
 *  我们有的：
        初始文档的 DOM 结构：以 .panels 为父 div 之下，有 5 个类名为 .panel 的 div，
        这 5 个各含有 3 个子 p 标签。
        
 *  <div class="panels">
        <div class="panel panel1">
            <p>Hey</p>
            <p>Let's</p>
            <p>Dance</p>
        </div>
    </div>
 * 
 *  分析：
 *      0.使用flex完成图示布局
 *      Flex 解构：
 *         `.panels`：使其中的 `.panel` 按横向的 flex 等分排布（此处为五等分）
            `.panel`：使其中的 `<p>` 按纵向的 flex 等分排布（此处为三等分）
            `p` ：借用 flex 相对于主轴及侧轴的对齐方式，使其中的文字垂直水平居中
 *      1.不同状态下的页面布局以及事件监听。
 *          点击放大面板。字会放大缩小。
 *              =====》 用toggle 实现元素动态状态改变，
 *              ===》字放大 font-size
 *              ===》 动画结束 transitionend
 *          但是不能生硬得时生，要动画一下
 *      
 *          .panel {
 *              transition:// 在小提琴是否修好了
                    font-size 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
                    flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11),
                    background 0.2s;
 *          }
        2. 文字飞入飞出效果:
            字变大之后即文字效果稳定，并通过废话(

 * 
 *  回顾———知识点总结：
 */