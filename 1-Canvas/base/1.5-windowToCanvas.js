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

(function() {
    const $canvas = document.getElementById('canvas');
    const $text = document.getElementById('text');
    const context = canvas.getContext('2d');
    $canvas.width = 800;
    $canvas.height = 400;
    $canvas.style.border = '1px solid red';
    $canvas.style.margin = '0 0 0 300px';

    $canvas.addEventListener('mousemove', (ev) => {
        // 当鼠标在canvas的左上角时：{clientX: 300, clientY: 0}
        const tansformCoord = windowToCanvas($canvas, ev.clientX, ev.clientY);
        const coordobj = {
            widowclientX: ev.clientX,
            windowclientY: ev.clientY,
            canvasclientX: tansformCoord.x,
            canvasclientY: tansformCoord.y,
        };

        $text.innerHTML = JSON.stringify(coordobj);
    })

})();