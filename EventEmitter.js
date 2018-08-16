/**
 * Node的事件机制中的
 * 对象可以注册事件、订阅事件、销毁事件、触发事件
 * 触发之后，订阅者能得到消息
 * 
 *  表现形式：
 * var blog = new Blog(); // 假设已有一个Blog类实现on、emit、off方法
 * const reader1 = (blogcontent) => console.log('我订阅了``blogcontent`')
 * 
 * reader2 ===-> 我订阅了搜狐网
 * 
 * blog.on("南方周末",reader1); //注册南方周末事件，对应有订阅者reader1
 * 
 * blog.on("搜狐网", reader2);
 * 
 * blog.emit("南方周末", "This is blog content.");
 * // 我订阅了 this is blog content
 * 
 * blog.off('搜狐网',reader2) // reader2不再订阅事件搜狐网
 * 
 * 
 * 
 * 实现思路：
 *      每个事件名对应一个函数数组，每次on某个事件就把函数压入对应函数数组里，
 *      每次emit就把对应函数数组进行遍历 off进行剔除
 */

 class EventEmitter{
    constructor(){
        this.eventObj = {};
    }
    on(name,reader){
        if(this.eventObj[name]){
            this.eventObj[name].push(reader);
        }else{
            this.eventObj[name] = [reader];
        }                
    }
    emit(name,/*content*/){
        // 将name事件的所有订阅者都取出来 一一执行
        let handlers = this.eventObj[name];
        let args = Array.prototype.slice.call(arguments,1);//类数组转数组
        if(handlers){
            for(let i=0,len = handlers.length;i<len;i++){
                // 依次执行handler  并将参数传给handler
                handlers[i].apply(handlers[i],args);
            }
        }
    }
    off(name,reader){
        //将name属性对应的数组下的元素handler 删除
        let handlers = this.eventObj[name];
        if(handlers&&reader){
            // 遍历找到 数组下的特定读者reader
            for(let i=0,len=reader.length;i<len;i++){
                if(handlers[i]==reader){
                    handlers.splice(i,1);
                }
            }
        }
    }
 }


let blog = new EventEmitter()

const reader1 = (...cont) => console.log(...cont);
const reader2 = (cont) => console.log(`我是读者2，我订阅的内容是${cont}`)

blog.on('haha',reader1);
blog.on('hehe',reader2);
blog.on('haha',reader2);
blog.emit('haha','haha播报第一期','附送一篇牛奶');
blog.emit('hehe','hehe播报第一期')