/**
 * moveTo(),  lineTo(x, y); x 直线终点的 x 轴坐标。 y 直线终点的 y 轴坐标
 * 创建完路径后，要调用 stroke()
 * 
 */

context.beginPath();
context.moveTo(x, y); // 移动到x, y起点
context.lineTo(x, y); // 画一段路径
context.stroke();