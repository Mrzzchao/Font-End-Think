/**
 * 避免重复请求服务器
 * 应用场景
 * 分页
 */

/**************** 计算乘积 *****************/
var mult = function() {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};
/**************** 计算加和 *****************/
var plus = function() {
    var a = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a + arguments[i];
    }
    return a;
};

/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function(fn) {
    var cache = {};
    return function() {
        var arg = Array.prototype.join.call(arguments, ',');
        if (arg in cache) {
            return cache[arg];
        }
        return cache[arg] = fn.apply(this, arguments);
    }
}

//测试
var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus);
alert(proxyMult(1, 2, 3, 4)); // 输出： 24
alert(proxyMult(1, 2, 3, 4)); // 输出： 24
alert(proxyPlus(1, 2, 3, 4)); // 输出： 10
alert(proxyPlus(1, 2, 3, 4)); // 输出： 10
