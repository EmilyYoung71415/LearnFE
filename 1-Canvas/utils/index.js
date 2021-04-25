/**
 * 鼠标ev.taget.offset 是 相对于window的
 * 而开发者想知道的鼠标位置不是相对于window的，是相对于canvas的
 */
function windowToCanvas(canvas, x, y) {
    const bbox = canvas.getBoundingClientRect(); // 获得相对于window的 left、top、w、h
    return {
        // step1：x: x - bbox.left // clientX - box.left
        // step2：响应了canvas坐标的缩放（当canvas绘图大小与css设置的不同的时候，canvas绘图会缩放
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top  * (canvas.height / bbox.height)
    }
};

function drawGuidelines(context, x, y) {
    context.strokeStyle = 'red';
    context.lineWidth = 0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);

    function drawVerticalLine(clientx) {
        context.beginPath();
        context.moveTo(clientx + 0.5, 0);
        context.lineTo(clientx + 0.5, context.canvas.height);
        context.stroke();
    }

    function drawHorizontalLine(clienty) {
        context.beginPath();
        context.moveTo(0, clienty + 0.5);
        context.lineTo(context.canvas.width, clienty + 0.5);
        context.stroke();
    }
}