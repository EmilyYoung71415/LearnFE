// 观察者模式
class Subject {
    constructor() {
        this.observer_list = [];
    }

    add_observer(obj) {
        this.observer_list.push(obj);
    }

    remove_observer(obj) {
        for (let i = 0; i < this.observer_list.length; i++) {
            if (this.observer_list[i] === obj) {
                this.observer_list.splice(i, 1);
            }
        }
    }

    notify() {
        let args = Array.prototype.slice.call(arguments, 0);
        for (let i = 0; i < this.observer_list.length; i++) {
            this.observer_list[i].update(args);
        }
    }
}