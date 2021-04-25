/***
 * 1、时机问题导致的绘图渲染
 *      每次必须得全部重绘？====> no 可渐进式渲染 像画图那样
 */
const canvas = document.getElementById('canvas');
const btn = document.getElementById('btn');
const context = canvas.getContext('2d');

function load1(params) {
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.border = '1px solid red';
    context.fillStyle='red';
    context.fillText('endsfdsfsdfsd', 100, 100, 100);

    setTimeout(() => {
        context.fillRect(100, 200, 50, 50);
    }, 1000);


    btn.addEventListener('click', () => {
        context.clearRect(0, 0, 800, 400);
        context.fillStyle='blue';
        context.fillRect(100, 200, 50, 50);
    });
}

/***
 * 2、canvas元素大小 与 canvas绘图面积
 *      
 *    设置元素属性大小：====> 修改元素本身 + 绘图表面大小
 *      $canvas.width = 800;
 *    css设置canvas大小：====> 修改元素本身大小，不影响绘图面积
 *      $canvas.style.width = 'xxpx';
 *  
 *    情况：
 *       情况1.css设置的大小 > 元素设置的属性大小， canvas的大小以css设置的为准
 *       情况2.css设置的大小 < 元素设置的属性大小,  canvas的大小以css设置的为准
 *          ===>  css: 400 * 200
 *                canvas: 800 * 400
 *                画布大小实际为： 400 * 200
 *                但是 你绘制rect等的时候, context.fillRect(0,0,700,400); 以属性宽度计算的坐标
 *                css的作用是起到一个缩放的功能：浏览器会把绘图表面从800*400 压缩到 400*200，
 *                                          元素是400*200像素，坐标系统是800*400像素，即坐标像素的800*400被赛到了400*200的物理画布里
 */

function load2() {
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.border = '1px solid red';
    context.fillStyle='red';
    context.font='24px sans-serif';
    context.fillText('你好啊', 100, 100, 100);
    canvas.style.width = '400px';
    canvas.style.height = '200px';
    context.fillRect(0,0,700,400);
}

// 根据设备像素比dpr 进行高清适配
// 不设置css，统一通过属性修改w,h ===>  属性设置w：dpr * w, 再缩放（使用css缩放 or scale缩放

// 总而言之： canvas属性设置的绘图大小  会随着 css设置的去做适配，最后画布大小还是看css设置的
//          canvas里的坐标系还是以属性设置的绘图大小为参照物
function load() {
    canvas.width = 800;
    canvas.height = 400;
    context.fillStyle='red';
    context.font='24px sans-serif';
    context.fillText('你好啊', 100, 100, 100);
    // const cssText = [
    //     `transform:scale(${1 / 2})`,
    //     'transform-origin:0 0',
    // ].join(';');
    // canvas.style.cssText = cssText;
    canvas.style.border = '1px solid red';
    // canvas.style.width = '400px';
    // canvas.style.height = '200px';
}
