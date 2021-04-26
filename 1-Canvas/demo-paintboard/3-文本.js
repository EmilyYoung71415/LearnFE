/***
 * canvas里文本的话题：
 *      1、 如何绘制文本
 *              ctx.fillText(text, x, y, [maxWidth]) // 常用
 *                      maxWidth： 当输入的文字宽度渲染宽度会 > maxWidth时，canvas会将文本(小号字体等)进行缩放以使用最大宽度
 *              ctx.strokeText()      // 描边文字（镂空
 *              ctx.measureText(text) // 返回被测量文本的宽度
 * 
 *          延伸：
 *              字号字体等
 *              对齐方式
 *              沿着某圆弧绘制文本
 *      2、 如何接收文本的输入？
 *              基于html的input与contenteditables属性结合使用
 *              canvas里自己控制光标等实现一套文本编辑，有开放这样的能力，
 *              但需要自己解决的： 复制粘贴、拖放、文本选择、文本滚动
 *                  1.实现用于插入文本的光标
 *                  2.如何实现可以编辑的文本行
 *                  3.如何实现文本段的编辑  
 */

// 1. 设置字体、字号
// ctx.font = '10px sans-serif' // 通过拼接str的形式改变笔触的字号（没有单独开放font-family等属性
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/font


// 2. 文本对齐
// textAlign、textBaseline


var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    fontHeight = 24,
    alignValues = ['start', 'center', 'end'],
    baselineValues = ['top', 'middle', 'bottom',
                      'alphabetic', 'ideographic', 'hanging'],
    x, y;
    canvas.height = 800;
    canvas.width = 1200;
// Functions..........................................................

function drawGrid(color, stepx, stepy) {
   context.save()

   context.strokeStyle = color;
   context.fillStyle = '#ffffff';
   context.lineWidth = 0.5;
   context.fillRect(0, 0, context.canvas.width, context.canvas.height);

   for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
     context.beginPath();
     context.moveTo(i, 0);
     context.lineTo(i, context.canvas.height);
     context.stroke();
   }

   for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
     context.beginPath();
     context.moveTo(0, i);
     context.lineTo(context.canvas.width, i);
     context.stroke();
   }

   context.restore();
}

function drawTextMarker() {
   context.fillStyle = 'yellow';
   context.fillRect  (x, y, 7, 7);
   context.strokeRect(x, y, 7, 7);
}

function drawText(text, textAlign, textBaseline) {
   if(textAlign) context.textAlign = textAlign;
   if(textBaseline) context.textBaseline = textBaseline;

   context.fillStyle = 'cornflowerblue';
   context.fillText(text, x, y);
}

function drawTextLine() {
   context.strokeStyle = 'gray';

   context.beginPath();
   context.moveTo(x, y);
   context.lineTo(x + 738, y);
   context.stroke();
}

function load1() {
    // textAlign、textBaseline 使用
    context.font = 'oblique normal bold 24px palatino';

    drawGrid('lightgray', 10, 10);

    for (var align=0; align < alignValues.length; ++align) {
        for (var baseline=0; baseline < baselineValues.length; ++baseline) {
            x = 20 + align*fontHeight*15;
            y = 20 + baseline*fontHeight*3;
            
            drawText(alignValues[align] + '/' + baselineValues[baseline],
                    alignValues[align], baselineValues[baseline]);

            drawTextMarker();
            drawTextLine();
        }
    }
}


// 将文本居中
function drawText(params) {
    context.fillStyle = 'blue';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width/2, canvas.height/2);
}
