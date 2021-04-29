/***
 * 1、串行执行，按调用顺序依次输出结果 // 4 3 2 1
 * 2、并发执行，只管打印即可
 * 3、并发执行，但是按调用顺序依次输出结果
 *      - 缓存，再最后一刻全部输出
 *      - 优化：输出体验
 * 4、并发执行，带limit并发限制数
 * 
 * 5、计算函数分片化，异步分治思想 （20个数据，每5个为一组，一组一组并发计算(4个并发丢在4个异步任务里执行，最后拿数据)）
 *    - 计算函数分片化
 * 6、设计题： 设计一个满足异步链的函数，链的节点可以支持嵌套异步
 */

// 输入：
const promiseArr = [
    () => asyncGetData(1),
    () => asyncGetData(3),
    () => asyncGetData(2),
    () => asyncGetData(6),
    () => asyncGetData(4),
    () => asyncGetData(8),
];

function asyncGetData(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(i);
        }, i * 100);
    });
}
// flow1(promiseArr);
// 1、串行执行，按调用顺序依次输出结果 // 4 3 2 1
function flow1(promisearr, cb) {
    const resarr = [];
    // 基于promise.then(res1=>).then(res2);
    const len = promisearr.length;
    // for(let curpromise of promisearr) {
        // FIXME: 这样是错误的。是顺序调用异步 而不是串行执行
        // promise = curpromise().then(res => {
        //     resarr.push(res);
        //     console.log(resarr);
        //     // i === len && cb && cb(resarr);
        // });
        
    // }

    // 串行应该是基于这样的实现： 在then里调用函数
    // promise.then((res0) => {
    //     promisearr[0]().then((res1) => {
    //         promisearr[1]().then((res2) => {
    //             console.log(res0, res1, res2)
    //         })
    //     })
    // })
    // promise.then((res0) => promisearr[0]())
    //        .then((res1) => promisearr[1]())
    //        .then((res2) => promisearr[2]())
    //        .then((res3) => promisearr[3]());
    
    // let promise = Promise.resolve();
    // 如果是执行，那么i<len即可，如果是在下游的then里拿到res结果，那么需要i<len+1
    // for(let i = 0; i < len + 1; i++) {
    //     let promisefunc = promisearr[i];
    //     promise = promise.then((res) => {
    //         console.log(res);
    //         return !!promisefunc && promisefunc();
    //     });
    // }
    promisearr.reduce((previousPromise, nextPromise) => {
        previousPromise = previousPromise.then((res) => {
            return nextPromise();
        });
        return previousPromise;
    }, Promise.resolve());
}

// flow2(promiseArr)
// .then(resarr => {
//     console.log(resarr);
// })
// 2、并发
function flow2(promisefuncArr) {
    // 那就是顺序调用呗
    // 执行完所有函数后 拿一个结果
    const resArr = [];
    return new Promise(resolve => {
        promisefuncArr.forEach(promisefunc => {
            promisefunc()
            .then(res => {
                resArr.push(res);
                resArr.length === promisefuncArr.length && resolve(resArr);
            });
        });
    });
}

// 评估：
// 特点：顺序执行了异步的代码，实现了并发
// 弊端：返回的结果无序的，即结果的resArr顺序依赖于 异步执行结果的返回时间，能不能按执行顺序并发，并且按执行顺序返回结果？
// ===> 维护一个index变量，resArr.push() 变为resArr[idx] = xx;
// flow2_1(promiseArr)
// .then(resarr => {
//     console.log(resarr);
// })
function flow2_1(promisefuncArr) {
    // 那就是顺序调用呗
    // 执行完所有函数后 拿一个结果
    const resArr = [];
    let count = 0;
    return new Promise(resolve => {
        promisefuncArr.forEach((promisefunc, idx) => {
            promisefunc()
            .then(res => {
                resArr[idx] = res;
                count++;
                // 当arr=[], 设置arr[4] = xxx; 时候 arr.len = 5; 所以需要外部维护一个count变量
                // resArr.length === promisefuncArr.length && resolve(resArr);
                count === promisefuncArr.length && resolve(resArr);
            });
        });
    });
}

// 还是不够好，现在是所有结果返回了之后才会输出返回结果，（用了一个全局的arr变量控制）
// 现在能不能，按顺序返回异步结果，但是是有一个就输出一个？
// ===> 思路：res = []维护结果数据，每次有结果了就往这个数组里放
//           与此同时，输出的时机变化一下：
//               res[idx]=xx，输不输出自己? 要看res[idx-1]是否有结果
//               那当res[idx-1]输出时，res[idx]也有结果了，也可以输出
// 综上：res[idx]有结果了， 判断res[idx-1]是否有结果，有了则输出res[idx-1] ~ res[idx] ~ 以后的有数据的
//      即向前遍历一个，再往后依次遍历
//      可能会有重复的情况，所以需要有个display[] 记录已输出的数据
// flow2_2(promiseArr);
function flow2_2(promisefuncArr) {// 3、并发执行，但是按调用顺序依次输出结果 - 输出优化
    const resArr = [];
    const displayArr = [];

    promisefuncArr.forEach((promisefunc, idx) => {
        promisefunc()
        .then(res => {
            resArr[idx] = res;
            disPlay(idx);
        });
    });

    function disPlay_wrong(idx) {
        // 是否输出数据: 
        // 1. res[0]直接输出， + 往后遍历
        // 2. res[i]本可以直接输出 + 往后遍历
        //    但多了约束条件：res[i]不能输出，唯一的阻塞是res[i-1]还没有数据，所以要等待res[i-1]
        // display是必须的？
        // res = [4,2,3,1]
        // 但是返回顺序是: res = [,,,1] [,2,,1] [,2,3,1] [4,2,3,1]
        // if (idx === 0 || resArr[idx-1]) {
            // FIXME:  没有考虑到 等前面好几个的情况。。[,2,3,1] 3前面的2虽然有了 但是2前面的1还没有。。
            // ===> res[i]的输出 取决于 0~i-1的数据是否有结果了
            // 所以本质是 i 可以无条件往后遍历，但是i-1需要判断
        //     for(let i = idx; i < resArr.length && resArr[i] !== undefined; i++) {
        //         if (!displayArr[i]) {
        //             console.log(resArr[i]);
        //             displayArr[i] = 1;
        //         }
        //     }
        // }
    }

    // 这个方法display变量也不需要了
    // 每次是idx排查他之前的，决定idx以后的是否输出
    // 所以不会出现重复输出的情况
    // [2,'',3,'',''] [2,4,3,'','']
    // 4来决定输出4,3
    // 而不是3第一次出现的时候就输出了3
    function disPlay_1(idx) {
        // 判断是否可以输出
        if (idx > 0) {
            let curindex = idx;
            // 不满足 则直接return
            while(curindex--) {
                if (resArr[curindex] === undefined) return;
            }
        }
        // idx=0 && idx>0且满足的情况

        // 开始往后遍历输出
        while(
            idx < resArr.length 
            && resArr[idx] !== undefined
            // && !displayArr[idx]
        ) {
            console.log(resArr[idx]);
            // displayArr[idx] = 1;
            idx++;
        }
    }

    let displayIdx = 0;// 当前输出指针
    // 代码稍微更清晰点的
    // 不用idx
    // 思路是 每次有新结果了就直接从res里遍历
    // 太聪明了惹
    function disPlay() {
        while(resArr[displayIdx] !== undefined) {
            console.log(resArr[displayIdx]);
            displayIdx++;
        }
    }
}

// 4、并发执行，带limit并发限制数
// 首次，并发limit个，当有结果之后 马上有触发新的函数
