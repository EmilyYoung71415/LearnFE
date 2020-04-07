function loadImg(input) {
    if (typeof input === 'string') {
        const image = new Image();
        image.src = input;
        return loadOneImg(image);
    }
    else if (input instanceof HTMLImageElement) {
        return loadOneImg(input);
    }
    // 类数组： 有可能是 html选中了一堆img 标签
    else if (isArrayLike(input)) {
        const reflect = img => loadImg(img).catch(error => console.error(error));
        const reflected = [].map.call(input, reflect);
        return Promise.all(reflected).then(res => {
            const loaded = res.filter(x => x.naturalWidth);
            if (loaded.length === res.length) {
                return loaded;
            };
            return Promise.reject({
                loaded,
                errored: res.filter(x => !x.naturalWidth)
            });
        });
    }
    return Promise.reject(new TypeError('input is not an image, a URL string, or an array of them.'));

    function loadOneImg(image) {
        const promise  =  new Promise((resolve, reject) => {
            if (image.naturalWidth) {
                resolve(image);
            }
            else if (image.complete) {
                reject(image);
            }
            else {
                image.addEventListener('load', fulfill);
                image.addEventListener('error', fulfill);
            }

            function fulfill() {
                if (image.naturalWidth) {
                    resolve(image);
                } else {
                    reject(image);
                }
    
                image.removeEventListener('load', fulfill);
                image.removeEventListener('error', fulfill);
            }
        });

        return Object.assign(promise, {image});
    }

    function isArrayLike(input) {
        return input.length !== undefined;
    }
}
// 使用方法
loadImage(document.querySelector('img.my-image')).then()
loadImage(['./asstes/img.jpg','./asstes/img2.jpg']).then()
loadImage('https//xx.banner.png').then()