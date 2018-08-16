/**
 * 观察者模式：
 *   形象化理解： 观察者订阅某个消息，当消息发布(发生改变时)，订阅者自动接收到信息
 *              类似：求职者与职位信息，订报人与报纸，博客订阅者与博客
 *   定义对象的一对多的依赖关系，当某个对象状态发生改变时，
 *   所有依赖于他的对象得到通知并自动更新
 * 
 * 
 *  实现：
 *      由发布职位的平台维护一个依赖列表，当状态改变时，自动通知依赖列表里的求职者
 *                                          [调用求职者的notify方法]
 *      求职者有个notify，自己定义得到消息通知之后干嘛
 * 
 *  表现形式：
 *      const xiaohong = new JobSeeker('xiaohong')
 *      const jobBoard = new JobBoard()
 *      jobBoard.subscribe(xiaohong) // 小红在求职列表的依赖列表里了
 *      jobBoard.addjob({
 *          title:'doctor',
 *          base:'hangzhou',
 *          hc:'1000'
 *      }) // 通知依赖项里的用户，调用用户里的notify方法
 */

 class JobSeeker{
     constructor(name){
         this.name = name;
     }
     notify(jobInfo){
        console.log(this.name+'订阅了'+'\n');
        console.log(jobInfo);
     }
 }

class JobBoard{
    constructor(){
        this.subscriber = [];// 依赖列表
    }
    // 求职者订阅
    subscribe(jobseeker){
        this.subscriber.push(jobseeker)
    }
    addjob(jobInfo){
        // 一旦发布职位 就通知依赖列表里的候选人
        this.subscriber.map(seeker=>{
            seeker.notify(jobInfo)
        })
    }
}

const jobseeker1 = new JobSeeker('one');
const jobseeker2 = new JobSeeker('two');

const jobBoard = new JobBoard();
jobBoard.subscribe(jobseeker1);
jobBoard.subscribe(jobseeker2);

jobBoard.addjob({
    name:'doctor',
    base:'hangzhou'
})

/**
 * 和事件系统的区别？[其实都是观察者模式。。
 * 本质都是一样的， 订阅、触发、取消订阅
 * 只是书写形式不一样
 *      订阅者的信息维护方式
 *      观察者是将订阅者作为对象push到数组里维护
 *      而事件系统是将订阅者的名字作为key存储，作为事件的一部分
 * 
 */




