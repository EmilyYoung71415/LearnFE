// 长轮询
let ajax = function* () {
    yield new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve({
                code: 0
            })
        }, 200);
    })
}

let pull = function () {
    let genertaor = ajax();
    let step = genertaor.next();
    step.value.then(function (d) {
        if (d.code != 0) {
            setTimeout(function () {
                console.info('wait');
                pull()
            }, 1000);
        } else {
            console.info(d);
        }
    })
}

pull();