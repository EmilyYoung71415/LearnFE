/***
 * 比如写个时钟：
 *      每秒时钟绘制到离屏canvas上，然后将该canvas的数据地址赋给img的src上。即img变化
 */

// dom:
// <img id="snapshotimg">
// <canvas id="canvas" style="display:none"></canvas>
//      ==> 或者是js创建个canvas的node，但是不append到body里即可


const $offscreen = document.createElement('canvas');
const context = offscreen.getContext('2d');
const $img = document.getElementById('snapshotimg');


const loop = setInterval(drawClock, 1000);

function drawClock() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();   // 圆盘
    drawCenter();   // 中心指针原点
    drawHands();    // 指针
    drawNumerals(); // 绘制数字

    updateClockImage(); // 将canvas的数据绘制到img上 实现视图更新
}
 
function updateClockImage() {
    $img.src = $offscreen.toDataURL();
}