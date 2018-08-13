/**
 * @desc 网络视频
 * 
 *  1.通过编写javascript代码，请求调用用户的网络摄像头;
    2.在页面上展示来自webcam的数据流信息;
    3.并允许用户保存展示的照片;
    4.及使用滑块来改变图像的色彩(简单滤镜效果
 * 
 * 
 * 相关知识：
 *  1.`window.navigator`对象   
 *  2.`navigator.getUserMedia`方法 
 *      访问网络摄像头或麦克风的权限该方法接受一个对象作为参数，通过该对象即可获得来自多媒体设备的数据
 *  3.`canvas`标签   
 *  4.像素数组
 *      3、4 ===》 canvas获取帧图像，并使用像素数组绘制图片
 * 
 * 思路：
 *  1.调用`navigator.getUserMedia()`方法，若调用成功则返回数据流
 *  ===》将返回的数据对象绑定至video标签的srcObject属性 并当流数据开始传递时，视频自动播放
 * 
 *  2.take photo:
 *      将视频中当前帧的图像绘制在canvas上
 *      `drawImage()`
 * 
 *  3. 简单滤镜：
 *      ===》 静态的可使用 css 的filter、blur等属性
 *       在全局中保存滤色范围的上下限，每次滑块数据发生改变后
 *      使用`canvas`绘图上下文中的`getImageData()`获得画布上指定区域内各像素点的颜色数据
 *      putImageData()`方法将像素点重新绘制在`canvas`
 * 
 *  4.savephoto
 *      调用`canvas`的`toDataUrl()`方法即可获得canvas中的图像数据
 *      生成的图像数据指定给`img.src`时即可预览图片
 * 
 *  5. img`标签外添加`a`标签，并为其添加`download`属性
 * 
 */