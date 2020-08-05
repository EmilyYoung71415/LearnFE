import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const muplugin = createWebsocketPlugin(socket);
function createWebsocketPlugin(socket) {
    return store => {
        socket.on('data', data => {
            store.commit('xxx', data);
        });

        // 订阅action前后变化
        store.subscribeAction({
            before: (action, state) => {
                // action.type
            },
            after: (action, state) => {
                // action.type
            }
        });
    }
}
const store = new Vuex.Store({
    plugins: [muplugin],
    state: {
        num: 1
    },
    mutations: {
        change(state, payload) {
            state = getData(payload); // mutation是唯一改变state的地方
        }
    },
    actions: {// dispatch 触发的动作 dispath -> action (commit) -> mutation
        changeasync(ctx, payload) {// ctx 表示当前store
            setTimeout(() => {
                ctx.commit('change', payload);
            });
        }
    }
});