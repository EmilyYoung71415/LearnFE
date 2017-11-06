/*神秘的_proto_链接 */

//monkey 对象做原型的human对象构造器
var monkey = {
    feeds:'bananas',
    breathes:'air'
}
function Human(){}
Human.prototype = monkey;

//创建一个developer 对象
var developer = new Human();
developer.feeds = 'pizza';
developer.hacks = 'JavaScripts';

print(developer.hacks);//JavaScripts
print(developer.breathes);//air

//尝试自己从developer对象中获得相关的原型对象
developer.constructor = 'junk';
print(developer.constructor);//junk

print(typeof developer.constructor.prototype)//undefined
 
//修改了中转站的constructor 仍然可以访问developer.breathe
//即证明了神秘链接的存在 该链接指向相关原型
print(developer._pro_);//在firefox 存在 IE下没有这个属性