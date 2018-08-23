/**
 * 梳理思路：
 *      数据劫持、
 *      数据代理、
 *      数据编译
 *      发布订阅 
 *      数据更新视图
 * 
 *  参考资料： 
 *          https://juejin.im/post/5abdd6f6f265da23793c4458
 *          https://github.com/xuqiang521/overwrite/tree/master/my-mvvm
 * 
 * 
 *  简易版实现思路：
 *  vue 传入el：dom 与data; 
 *  1、vue 初始化数据
 *  2、传入 observe 观察者 ， 遍历得到每个观察的对象，传给watcher(dom,property)
 *  3、watcher 实现数据拦截 获得每个需要绑定的v-model. 监听其上的 数据变化
 *     对 obj[proper] = this.value
 *      然后拦截： object.definePro 拦截obj的set。
 *      以此获得 newval/
 *  4、 通知编译： compile：vmodel
 */

class Vue{
    constructor(option={}){
        this.$option = option;
        this.dom = document.querySelector(this.$option.el);
        this.observe(this.dom,this.$option.data);
    }
    observe(dom,obj){
        for(let property in obj){
            this.watcher(dom,property)
        }
    }
    watcher(dom,vModel){// 获得当前dom元素下的绑定了v-model的元素
        let model = dom.querySelectorAll(`[v-model=${vModel}]`)[0];
        let newObj = Object.create(null);
        // 监听model的change变化
        model.addEventListener('change',function(){
            newObj[vModel] = this.value;
        })

        // Object.dedefineProperty 进行对newObj的拦截从而获得新值
        // 为什么不是直接传输 this.value?
        let handler = {
            set:(newVal)=>{
                this.compile(dom,newVal,vModel);
            },
            get:()=>{
                console.log('已重置')
            }
        }
        Object.defineProperty(newObj,vModel,handler);
    }
    compile(dom,value,vModel){
        let modelList = dom.querySelectorAll(`[v-text=${vModel}]`);
        // 依次对其进行更新操作
        modelList.forEach(item=>{
            item.innerHTML = value;
        })
    }
}

new Vue()