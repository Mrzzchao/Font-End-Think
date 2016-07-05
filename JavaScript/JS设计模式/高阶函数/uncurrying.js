
/**
 * 应用场景：
 * 需要给函数的this绑定为自定义的对象的时候
 * @return {[Function]} [返回一个由用户自己传入的this对象的运行函数]
 */
Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};

// 测试
var push = Array.prototype.push.uncurrying();
(function() {
    push(arguments, 4);
    var argArr = [].slice.call(arguments);
    console.log(argArr); // [ 1, 2, 3, 4 ]
})(1, 2, 3);
