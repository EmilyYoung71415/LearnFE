/**
 * 使用canvas、dom搭配做一些事
 * 下面一个demo：实现canvas点击选区某个区间实现局部放大
 * 
 * 设计思路：
 *      1、选区：dom的div绘制，鼠标点击的位置，div的left、top
 *      2、mousemove： div不断改变width、height
 *      3、如何实现的div 选区， 能捕获到canvas的选区内的信息？
 *         context.drawImage(x, y, w, h, wrapperx, wrappery, wrapperw, wrapperh)
 *         将选择的区域的选区，绘制在底图的canvas上
 * ====>
 *      可以用来干嘛？
 *      复制粘贴
 *          将当前选中的区域像素信息，直接赋给另一个选区 => 即使得到响应， => 修改viewdata， 这样修改、render分离了
 */

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    rubberbandDiv = document.getElementById('rubberbandDiv'),
    resetButton = document.getElementById('resetButton'),
    image = new Image(),
    mousedown = {},
    rubberbandRectangle = {},
    dragging = false;

// Functions.....................................................

function rubberbandStart(x, y) {
    mousedown.x = x;
    mousedown.y = y;

    rubberbandRectangle.left = mousedown.x;
    rubberbandRectangle.top = mousedown.y;

    moveRubberbandDiv();
    showRubberbandDiv();

    dragging = true;
}

function rubberbandStretch(x, y) {
    rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
    rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;

    rubberbandRectangle.width = Math.abs(x - mousedown.x),
        rubberbandRectangle.height = Math.abs(y - mousedown.y);

    moveRubberbandDiv();
    resizeRubberbandDiv();
};

function rubberbandEnd() {
    var bbox = canvas.getBoundingClientRect();

    try {
        context.drawImage(canvas,
            rubberbandRectangle.left - bbox.left,
            rubberbandRectangle.top - bbox.top,
            rubberbandRectangle.width,
            rubberbandRectangle.height,
            0, 0, canvas.width, canvas.height);
    } catch (e) {
        // suppress error message when mouse is released
        // outside the canvas
    }

    resetRubberbandRectangle();

    rubberbandDiv.style.width = 0;
    rubberbandDiv.style.height = 0;

    hideRubberbandDiv();

    dragging = false;
}

function moveRubberbandDiv() {
    rubberbandDiv.style.top = rubberbandRectangle.top + 'px';
    rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
}

function resizeRubberbandDiv() {
    rubberbandDiv.style.width = rubberbandRectangle.width + 'px';
    rubberbandDiv.style.height = rubberbandRectangle.height + 'px';
}

function showRubberbandDiv() {
    rubberbandDiv.style.display = 'inline';
}

function hideRubberbandDiv() {
    rubberbandDiv.style.display = 'none';
}

function resetRubberbandRectangle() {
    rubberbandRectangle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    };
}

// Event handlers...............................................

canvas.onmousedown = function (e) {
    var x = e.x || e.clientX,
        y = e.y || e.clientY;

    e.preventDefault();
    rubberbandStart(x, y);
};

window.onmousemove = function (e) {
    var x = e.x || e.clientX,
        y = e.y || e.clientY;

    e.preventDefault();
    if (dragging) {
        rubberbandStretch(x, y);
    }
}

window.onmouseup = function (e) {
    e.preventDefault();
    rubberbandEnd();
}

// Event handlers..............................................

image.onload = function () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

resetButton.onclick = function (e) {
    context.clearRect(0, 0, context.canvas.width,
        context.canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

// Initialization..............................................

image.src = 'https://avatars.githubusercontent.com/u/16984550?v=4';