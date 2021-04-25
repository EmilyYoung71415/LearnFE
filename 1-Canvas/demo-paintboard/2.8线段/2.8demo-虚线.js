// setDashLine
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'blue';

function drawDashedLine(pattern) {
    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(0, y);
    ctx.lineTo(300, y);
    ctx.stroke();
    y += 20;
}


let y = 15;
drawDashedLine([]); // 实线
drawDashedLine([1, 1]); // 密密麻麻的dash arr: [线段长度， 间距长度]
drawDashedLine([10, 10]); 
drawDashedLine([20, 5]);