// 探索两种优雅的表单验证——策略设计模式和ES6的Proxy代理模式
// 参考: https://github.com/jawil/blog/issues/19
/********************************
 * 思路：
 *     一个完整的策略模式要有两个类：1. 策略类 2.环境类(主要类)
 *         环境类: 接收请求，但不处理请求，负责把请求委托给策略类，让策略类去处理，
 *         策略类: 各种策略的配置
 * 
 *      实际用的时候 可以在dom上定义策略更友好些，然后再解析dom生成格式化后的策略对象
 *      如 <input name='username' required data-valid="{minLength:6}">
 */
function Validator(strategyArr) {
    this.valifyArr = [];
    this.strategies = {
        isNonEmpty(value, cb) {
            return value === '' ? cb() : void 0;
        },
        // minLength(value, length, cb) {
        //     return value.length < length ? cb() : void 0;
        // },
        isMoblie(value, cb) {
            return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? cb() : void 0;
        }
    };
    strategyArr.forEach(strategyItem => {
        let ruleArr = strategyItem.strategy;
        let value = strategyItem.field.value;
        ruleArr.forEach(ruleItem => {
            for (const [rule, cb] of Object.entries(ruleItem)) {
                this.valifyArr.push(() => {
                    return this.strategies[rule](value, cb);
                });
            };
        });
    });
};

Validator.prototype.check = function (cb) {
    for(let validatorFunc of this.valifyArr) {
        let err = validatorFunc();
        if (err) {
            cb(err);
            return;
        }
    }
};

// 使用：
{/* 
<form action="http://xxx.com/register" id="registerForm" method="post">
    <div class="form-group">
        <label for="user">请输入用户名:</label>
        <input type="text" class="form-control" id="user" name="userName">
    </div>
    <div class="form-group">
        <label for="pwd">请输入密码:</label>
        <input type="password" class="form-control" id="pwd" name="passWord">
    </div>
    <div class="form-group">
        <label for="phone">请输入手机号码:</label>
        <input type="tel" class="form-control" id="phone" name="phoneNumber">
    </div>
    <button type="button" class="btn btn-default">Submit</button>
</form> 
*/}
// let registerForm = document.querySelector('#registerForm');
let registerForm = {
    userName: {value: '111'},
    phoneNumber: {value: 111}
};

// 策略类，开放接口给用户使用策略
// 具体什么策略做什么写在类内部 （或开放加策略的接口
let validator = new Validator([
    {
        field: registerForm.userName,
        strategy: [{
            'isNonEmpty': () => '用户名不能为空！'
        }, {
            // 'minLength:6': () => '用户名长度不能小于6位！'
        }]
    },
    {
        field: registerForm.userName,
        strategy: [{
            'isNonEmpty': () => '用户名不能为空！'
        }]
    },
    {
        field: registerForm.phoneNumber,
        strategy: [{
            'isNonEmpty': () => '手机号码不能为空！'
        }, {
            'isMoblie': () => '手机号码格式不正确！'
        }]
    }
]);

validator.check(err => {
    console.log(err);
    return false;
});

// registerForm.addEventListener('submit', function () {
//     validator.check(err => {
//         console.log(err);
//         return false;
//     });
// });