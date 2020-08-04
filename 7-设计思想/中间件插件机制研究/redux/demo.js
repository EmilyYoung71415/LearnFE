function compose(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function createStore(reducer, middlewares) {
    let currentState;
    function dispatch(action) {
        currentState = reducer(currentState, action);
    }
    function getState() {
        return currentState;
    }
    dispatch({ type: 'INIT' });
    let enhancedDispatch = dispatch;
    if (middlewares) {
        // [...middlewares] = [middle1, middle2]
        // compose(...middlewares) = compose(middle1, middle2)(args) = middle1(middle2(args)) // 最终函数返回值就是最终传递值
        // args 传递的是 dispatch 这个函数？ 
        // 代表 初始值是一个函数，经过compose处理，得到一个加强的函数

        // TODO：期间加工的值是怎么读取到的？每一个中间件都是得到最新的state吗？
        // 并没传递值，甚至都读不到最新的值。只是在每次值改变的dispatch里，开了个口 可以执行某些东西而已
        // 把 dispatch 这个方法不断用高阶函数包装，最后返回一个强化过后的 dispatch
        enhancedDispatch = compose(...middlewares)(dispatch);
    }
    return {
        dispatch: enhancedDispatch,
        getState,
    };
}
const counterInitial = {
    count: 0,
    message: '',
};
function counterReducer(state = counterInitial, action) {
    switch (action.type) {
        case 'add': {
            return {
                ...state,
                count: state.count + action.payload,
            };
        }
        case 'chat': {
            return {
                ...state,
                message: action.message,
            };
        }
        default: {
            return state;
        }
    }
}

// 接受传入的dispath函数，不调用dispath函数，只是用返回了函数，函数里面调用了dispatch，
// 但是函数里可以做一些别的事，由此得到一个加强版的dispatch
const typeLogMiddleware = dispatch => {
    return ({ type, ...args }) => {
        console.log(`type is ${type}`);
        return dispatch({ type, ...args });
    };
};
const otherDummyMiddleware = dispatch => {
    return action => {
        console.log(`type in dummy is ${action.type}`);
        return dispatch(action);
    };
};
const counterStore = createStore(counterReducer, [typeLogMiddleware, otherDummyMiddleware]);
console.log(counterStore.getState().count);
counterStore.dispatch({ type: 'add', payload: 2 });
console.log(counterStore.getState().count);
