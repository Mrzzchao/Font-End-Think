
/**
 * 应用场景：
 * 对于调用函数时不需要立即求值，而是等到需要求值时，把前几次调用传入的参数一次调用处理
 * @param  {Function} fn [传入的参数处理函数]
 * @return {[Function]}      [返回一个代理函数]
 */
var currying = function(fn) {
    var args = [];
    return function() {
        if(arguments.length === 0) {
            fn.apply(this, args);
        }
        else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
}


// 测试
var test = function() {
    var result = 0;
    for(var i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    console.log(result);
};

var test = currying(test);
test(100);  // 没输出
test(200);  // 没输出
test();     // 300
