/***
 * 参考 https://github.com/mqyqingfeng/Blog/issues/51
 * 
 * way1: Math.random
 *      arr.sort(() =>  Math.random() - 0.5)
 *      => 问题:在插入排序的算法中，当待排序元素跟有序元素进行比较时，一旦确定了位置，就不会再跟位置前面的有序元素进行比较，
 *         所以就乱序的不彻底。
 * way2: Fisher–Yates算法
 *      遍历数组元素，然后将当前元素与以后随机位置的元素进行交换
 */

const fisherYates = arr => {
    for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
};