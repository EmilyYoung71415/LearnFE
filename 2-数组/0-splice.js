// splice(position, count) 
// splice(position, 0, ele1, ele2, ...) 
// splice(postion, count, ele1, ele2, ...) 
// 需要返回删除的元素

/****
 * 由于删除后要在posi位置插入元素 所以判断删除元素个数  与 插入元素个数
 * 参考: https://juejin.im/post/5dbebbfa51882524c507fddb#heading-29
 */

Array.prototype._splice = function (startIndex, deleteCount, ...addElements) {
    let argumentsLen = arguments.length;
    let array = Object(this);
    let len = array.length >>> 0;
    let addLen = addElements.length;
    let deleteArr = new Array(deleteCount);
    // 当用户传来非法的 startIndex 和 deleteCount 或者负索引的时候
    startIndex = computeStartIndex(startIndex, len);
    deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen);

    // 判断 sealed 对象和 frozen 对象, 即 密封对象 和 冻结对象
    if (Object.isSealed(array) && deleteCount !== addLen) {
        throw new TypeError('the object is a sealed object!');
    } else if (Object.isFrozen(array) && (deleteCount > 0 || addLen > 0)) {
        throw new TypeError('the object is a frozen object!');
    }

    // 拷贝删除的元素
    sliceDeleteElements(array, startIndex, deleteCount, deleteArr);
    // 移动删除元素后面的元素
    movePostElements(array, startIndex, len, deleteCount, addElements);

    // 插入新元素
    for (let i = 0; i < addLen; i++) {
        array[startIndex + i] = addElements[i];
    }

    array.length = len - deleteCount + addLen;

    return deleteArr;

    function sliceDeleteElements(array, startIndex, deleteCount, deleteArr) {
        for (let i = 0; i < deleteCount; i++) {
            let index = startIndex + i;
            if (index in array) {
                deleteArr[i] = array[index];
            }
        }
    };

    // 添加的元素和删除的元素个数相等
    // 添加的元素个数小于删除的元素
    // 添加的元素个数大于删除的元素
    function movePostElements(array, startIndex, len, deleteCount, addElements) {
        let addLen = addElements.length;
        if (deleteCount === addLen) return;
        // 删除<新增 向后移动
        if (deleteCount < addLen) {
            for (let i = len - 1; i >= startIndex + deleteCount; i--) {
                let fromIndex = i;
                // 将要挪动到的目标位置
                let toIndex = i + (addLen - deleteCount);
                if (fromIndex in array) {
                    array[toIndex] = array[fromIndex];
                } else {
                    delete array[toIndex];
                }
            }
        }
        // 删除>新增 向前移动
        else {
            for (let i = startIndex + deleteCount; i < len; i++) {
                let fromIndex = i;
                // 将要挪动到的目标位置
                let toIndex = i - (deleteCount - addElements.length);
                if (fromIndex in array) {
                    array[toIndex] = array[fromIndex];
                } else {
                    delete array[toIndex];
                }
            }
        }
    }

    function computeStartIndex(startIndex, len) {
        // 处理索引负数的情况
        if (startIndex < 0) {
            return startIndex + len > 0 ? startIndex + len : 0;
        }
        return startIndex >= len ? len : startIndex;
    }

    function computeDeleteCount(startIndex, len, deleteCount, argumentsLen) {
        if (argumentsLen === 1) return len - startIndex;
        if (deleteCount < 0) return 0;
        if (deleteCount > len - startIndex) return len - startIndex;
        return deleteCount;
    }
}

let arr = [1,2,3];
console.log(arr._splice(1, 0, 'hahha'))
console.log(arr);