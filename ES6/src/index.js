//Symbol的打印
{
var g = Symbol('jspang');
console.log(g);//红色
console.log(g.toString());//黑色
}

//Symbol在对象中的应用
//用Symbol构建对象的Key，并调用和赋值。
{
	var jspang = Symbol();
	var obj={
	    [jspang]:'技术胖'
	}
	console.log(obj[jspang]);
	obj[jspang]='web';
	console.log(obj[jspang]);
}
//Symbol对象元素的保护作用
//在对象中有很多值，但是循环输出时，并不希望全部输出，那我们就可以使用Symbol进行保护。
{//没有进行保护的写法：
	var obj={name:'jspang',skill:'web',age:18};
	for (let item in obj){
	    console.log(obj[item]);
	}
}

{//现在我不想别人知道我的年龄，这时候我就可以使用Symbol来进行循环保护。
	let obj={name:'jspang',skill:'web'};
	let age=Symbol();
	obj[age]=18;//年龄私有化[滑稽]
	for (let item in obj){
	    console.log(obj[item]);
	} 
	console.log(obj);
}