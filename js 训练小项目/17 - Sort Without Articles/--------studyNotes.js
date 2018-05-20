/**
 * @desc 数组去前缀排序
 * 
 *      为这些字符串排序，要求去除字符串中的`The`，`A`以及`An`的前缀后再进行排序，
 *      并把排序后的结果作为列表项展示在无序列表中
 *      const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil']
 * 思路
 * 
 *      1.基本的编程任务有两个要点，即排序和展示;
        2.数组排序部分最外层即为`Array.sort(arr)`函数，内层实现具体排序规则;<br>
        3.render展示部分即将排列好的新数组拼接成带有标签的HTML元素，然后一次性插入到列表中。
 *      
 * 
 * 
 *      去前缀函数 正则替换
 *      arr.join('</li><li>') 太有才
 */