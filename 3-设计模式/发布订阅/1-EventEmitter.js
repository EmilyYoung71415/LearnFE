// 事件发布订阅系统

// 思路：将订阅的方法按分类存在一个数组中，当发布时取出执行
class EventEmitter {
    constructor() {
        this._events = Object.create(null);
    }

    on(type, handler) {
        (this._events[type] || (this._events[type] = [])).push(handler);
    }

    off(type, handler) {
        if (this._events[type]) {
            this._events[type].splice(this._events[type].indexOf(handler) >>> 0, 1);
        }
    }

    once(type, handler) {
        let fired = false;
        function magic() {
            this.off(type, magic);
            if (!fired) {
                fired = true;
                handler.apply(this, arguments);
            };
        }
        this.on(type, magic);
    }

    emit(type) {
        let args = [].slice.call(arguments, 1);

        let array = this._events[type] || [];
        for (let i = 0; i < array.length; i++) {
            let handler = this._events[type][i];
            handler.apply(this, args);
        }
    }
}

const eventBus =  new EventEmitter();
eventBus.on('bookA', ()=> console.log('小明 订阅了 bookA'));
eventBus.on('bookA', ()=> console.log('小红 订阅了 bookA'));
eventBus.on('bookB', ()=> console.log('小明 订阅了 bookB'));
eventBus.once('bookB', ()=> console.log('小红 订阅了 bookB 但只订一次尝尝鲜'));

eventBus.emit('bookB');
console.log('======================')
eventBus.emit('bookB');