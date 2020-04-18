/****
 * 把任务分批进行，如1s创建1000个dom节点 改为 每隔200ms创建8个节点
 */

function timeChunk(arr, fn, count = 1) {
    let timeid = null;

    return function () {
        timeid = setInterval(function () {
            if (arr.length === 0) {
                clearInterval(timeid);
                return;
            }
            build();
        }, 200);
    };

    function build() {
        while (arr.length) {
            let item = arr.shift();
            fn(item);
        }
    }
}

// var arr = Array.from({length: 1000}, (item, index) => index);

// function renderList(arr) {
//     arr.forEach(item => {
//         renderItem(item);
//     });

//     function renderItem(data) {
//         var div = document.createElement( 'div' );
//         div.innerHTML = data;
//         document.body.appendChild(div);
//     }
// }

// 改造后
// var renderList = timeChunk(arr, renderItem, 8);
// renderFriendList();