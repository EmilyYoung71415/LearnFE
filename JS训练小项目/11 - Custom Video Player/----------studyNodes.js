/**
 * @desc 利用html5的video自定义播放器
 * video 属性api https://www.w3.org/2010/05/video/mediaevents.html
 * 
 * 目标：
 * 基本样式改写：
 *      暂停键、进度条、音量
 * 功能实现
 *      视频播放/暂停、进度条拖拽、音量加减、播放速度加减、快进快退     
 * api：
 *  播放暂停： play() pause()
 *  音量、速度：video.volume 、 video.playbackRate
 *         技巧：使用input的name属性为volume 、playbackRate 标记该元素
 * 
 *  快进后退：
 *         video.currentTime
 *          技巧：同样使用data-* 自定义属性绑定跳跃值
 *          
 *  进度条
 *      进度条随播放时间而实时更新：
 *          currentTime /   duration 
 *          filled.style.flexBasis
 *      拖进度条视频定位
 *          currentTime               e.offsetX 
 *          ___________   =  ______________________________
 * 
 *            duration          processBar.offsetWidth
 * 
 *  元素与事件
 * 
 * 
 * 
 *  扩展：
 *         播放完之后。重复播放的选择
 *         播放速度 x1 x2 x3 x4
 *         音量百分比显示
 */ 