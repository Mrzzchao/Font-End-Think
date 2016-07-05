/**
 * 应用场景：
 * 适合只需要一个实例，例如webQQ的登录框，点击登录只需要一个登录框
 * @param  {Function} fn 需要成为单例的函数
 * @return {Function}      返回一个所需要构造单例函数的函数
 */
var getSingle = function(fn) {
    var result = null;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};


// 测试
var printInfo1 = function() {
    console.log("hellow I'm One");
    return true;
};

var printInfo2 = function() {
    console.log("hellow I'm Two");
    return true;
};

var bindEvent = getSingle(printInfo1);

bindEvent();   // hellow I'm One
bindEvent();   // 没输出

var bindEvent2 = getSingle(printInfo2);
bindEvent2();  // hellow I'm Two
bindEvent2();  // 没输出