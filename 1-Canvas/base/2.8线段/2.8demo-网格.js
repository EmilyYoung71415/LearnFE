const $canvas = document.getElementById('canvas');
const context = $canvas.getContext('2d');
$canvas.height = 400;
$canvas.width = 400;

// Functions.....................................................
// 10px 一个格子
function drawGrid(context, color, stepx, stepy) {
    const lineWidth = .5;
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    // 竖线
    for (let i = stepx + lineWidth; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }
    // 横线
    for (let i = stepy + lineWidth; i < context.canvas.height; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }
}

// Initialization................................................

drawGrid(context, 'lightgray', 10, 10);