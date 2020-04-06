/***
 * 并集 => 扩展运算符
 */

const fruits = ['apple', 'banana', 'orange'];
const meat = ['poultry', 'beef', 'fish'];
const vegetables = ['potato', 'tomato', 'cucumber'];
const food = [...fruits, ...meat, ...vegetables];

/***
 * 交集
 */
const numOne = [0, 2, 4, 6, 8, 8];
const numTwo = [1, 2, 3, 4, 5, 6];
const duplicatedValues = [...new Set(numOne)].filter(item => numTwo.includes(item));
console.log(duplicatedValues); // returns [2, 4, 6]