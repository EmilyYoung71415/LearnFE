/***
 * 绘制表面的保存与恢复， 可以让开发者在绘图表面做一些临时性的绘制动作
 * 如：
 *      橡皮擦带线条、辅助线guidewire、注解annotation
 * 
 * api：
 *      drawImage()：  将图像的全部or某部分从一个地方赋值到canvas上  context.drawImage(图片实例, 0, 0);
 *      getImageData() 将现有的canvas数据存储到imgdata里
 *      putImageData() 每次做辅助线的动作时无需重绘整个grid图，将之前保存的grid的数据put进canvas即可
 *      即：数据缓存的功能
 * 实现图像滤镜: 先获取图像数据，然后处理，最后将其恢复到canvas上
 * 
 * 
 * canvas是立即模式绘图，即 将指定内容放在canvas上后，会立刻忘记刚才绘制的内容（除非你自己开个空间去手动记录）
 * 
 * 
 * 
 */