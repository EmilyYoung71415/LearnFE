/**
 * @desc 
 *      初始文件index-start.html中提供了一个包含多个列表项的无序列表元素，
 *      每一个列表项均添加了data-time属性，
 *      该属性用分和秒表示了时间。
 *      要求将所有的时间累加在一起，并用时:分:秒来表示计算的结果
 * 
 * 取得所有`li`中`data-time`属性的值,计算得到总共费时
 * 计算总费时：
 *      将时间换算为秒并累加求得总时间（单位：秒）   
 *      将总时间转化为新的格式“XX小时XX分XX秒”;
 * for( var i = 0, len = oLi.length; i < len; i++){
      var timeItem = oLi[i].dataset['time'].split(':');
      //将时间转换为秒
      times.push(parseInt(timeItem[0],10)*60+parseInt(timeItem[1],10));
    }


    `times`中各项累加————reduce
*    

    总时间格式转换
        //总时间对60取余即为不足1分钟的秒数
        var sec = seconds % 60;
        //总时间除以3600并向下取整为小时数
        var hour = Math.floor(seconds/3600);
        //总时间减去前两项即可获得分钟数
        var min = (seconds - 3600*hour - sec)/60;
 */