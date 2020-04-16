/****
 * Object.create(proto[, propertiesObject])
 * 创建新对象，指定其原型对象为proto
 * Object.create(null) => {}
 * 
 * Chinese 可以访问到 Asian.prototype 上的属性和方法
 * 
 * => 
 *      Chinese.prototype = Asian.prototype
 *      改进版：
 *          var F = function() {}
 *          F.prototype = Asian.prototype;
 *          Chinese.prototype = new F();
 * 
 * =>   等价于 Chinese.prototype = Objecy.create(Asian.prototype);
 * 所以 请实现Object.create() 方法
 */
Object.create = function (proto) {
    var F  = function () {};
    F.prototype = proto;
    return new F();
}