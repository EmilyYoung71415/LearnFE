/**
 * @desc 控制台调试技巧
 * 
 * console.log
 *  类似 C 语言的字符串替换模式
  
    console.log("输出一个字符串 %s ", "log");
    console.log("输出一个整数是 %d ", 1.23); //1
    console.log("输出一个小数是 %f ", 1.23); //1.23
    console.log("%c不同样式的输出效果", "color: #00fdff; font-size: 2em;");
 * 
 *  不同样式的输出

    // warning!
    console.warn("三角感叹号图标，淡黄色背景")
    // Error :|
    console.error("红叉图标，红字红色背景");
    // Info
    console.info("蓝色圆形感叹号图标");

 *   打印输出 DOM元素

    const p = document.querySelector('p');
    console.log(p);
    console.dir(p);

 *  计时

    console.time
    console.timeEnd

    console.time('fetch my data');
    fetch("https://api.github.com/users/soyaine")
    .then(data => data.json())
    .then(data => {
    console.timeEnd('fetch my data');
    console.log(data);
    });




 */