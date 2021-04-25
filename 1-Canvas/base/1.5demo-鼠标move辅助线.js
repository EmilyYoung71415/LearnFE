// import {drawGuidelines} from '../utils';
const $canvas = document.querySelector('#canvas'),
    readout = document.querySelector('#text'),
    context = canvas.getContext('2d'),
    spritesheet = new Image();

// Functions.....................................................
function drawBackground() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.fillStyle = 'lightgray';
    context.lineWidth = 0.5;
    context.fillRect(0, 0, $canvas.width, $canvas.height);
    context.restore();

    // while (i > VERTICAL_LINE_SPACING * 4) {
    //     context.beginPath();
    //     context.moveTo(0, i);
    //     context.lineTo(context.canvas.width, i);
    //     context.stroke();
    //     i -= VERTICAL_LINE_SPACING;
    // }
}

// function drawSpritesheet() {
//     context.drawImage(spritesheet, 0, 0);
// }

// function updateReadout(x, y) {
//     readout.innerHTML = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
// }


// Event handlers.....................................................

// 每次鼠标mousemove的时候，要擦除背景：之前绘制的辅助线
// 而擦除是相对困难的，需要记住上次操作的 反向操作：比如花了条线，擦除则是在那条线上再画一笔掩盖 or 裁剪擦除
// 可见擦除是相对困难的，所以还不如直接全部重画
$canvas.onmousemove = function (e) {
    const loc = windowToCanvas($canvas, e.clientX, e.clientY);

    drawBackground();
    // drawSpritesheet();
    drawGuidelines(context, loc.x, loc.y);
    // updateReadout(loc.x, loc.y);
};

// Initialization.....................................................
// spritesheet.src = 'https://avatars.githubusercontent.com/u/16984550?v=4';
// spritesheet.onload = function (e) {
//     drawSpritesheet();
// };


function load(params) {
    drawBackground();
}