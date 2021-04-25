// import {windowToCanvas, drawGuidewires} from '../utils';
/***
 * 通过getImageData、putImageData保存与恢复绘图表面来绘制辅助线
 */
const $canvas = document.querySelector('#canvas'),
    readout = document.querySelector('#text'),
    context = $canvas.getContext('2d');
    
let gDragging = false,
    gSurfaceImageData = null;

function load() {
    initRender();
    initEvent();
}

const initRender =  function(params) {
    context.save();
    context.fillStyle = 'lightgray';
    context.lineWidth = 0.5;
    context.fillRect(0, 0, $canvas.width, $canvas.height);
    context.restore();
};

const initEvent = function(params) {
    $canvas.addEventListener('mousedown', ev => {
        gDragging = true;
        saveDrawingSurface();
    });
    
    $canvas.addEventListener('mousemove', e => {
        const loc = windowToCanvas($canvas, e.clientX, e.clientY);
        if (gDragging) {
            restoreDrawingSurface(); //  重置canvas底层
            // ...
            // if (guidewires) {
                // 画一个以x、y为中心点的十字
                drawGuidelines(context, loc.x, loc.y); // 辅助线 方法同
            // }
        }
    });
    
    $canvas.addEventListener('mouseup', ev => {
        gDragging = false;
        restoreDrawingSurface();
    });
};



function saveDrawingSurface(params) {
    gSurfaceImageData = context.getImageData(0, 0, $canvas.width, $canvas.height);
    console.log(gSurfaceImageData);
}

function restoreDrawingSurface(params) {
    context.putImageData(gSurfaceImageData, 0, 0);
}