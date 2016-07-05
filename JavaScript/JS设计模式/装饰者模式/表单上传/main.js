/**
 * AOP函数，为函数对象添加在执行前需要执行的方法，形成函数链（需判断上个函数是否返回真）
 * @param  {先执行的方法} beforefn 函数执行需要该参数的方法执行后返回true
 * @return {原方法或无返回}
 */
Function.prototype.before = function(beforefn) {
    var __self = this;
    return function() {
        if (beforefn.apply(this, arguments) === false) {
            // beforefn 返回 false 的情况直接 return，不再执行后面的原函数
            return;
        }
        return __self.apply(this, arguments);
    }
}

// 验证函数
var validata = function() {
    if (username.value === '') {
        alert('用户名不能为空');
        return false;
    }
    if (password.value === '') {
        alert('密码不能为空');
        return false;
    }
}

// 表单提交函数
var formSubmit = function() {
    var param = {
        username: username.value,
        password: password.value
    }
    ajax('http:// xxx.com/login', param);
}

formSubmit = formSubmit.before(validata);
submitBtn.onclick = function() {
    formSubmit();
}
