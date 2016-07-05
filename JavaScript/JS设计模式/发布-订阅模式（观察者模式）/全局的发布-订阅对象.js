/**
 * 发布—订阅模式可以用一个全局的 Event 对象来实现，订阅者不需要了解消
 * 息来自哪个发布者，发布者也不知道消息会推送给哪些订阅者， Event 作为一个类似“中介者”
 * 的角色，把订阅者和发布者联系起来
 */

var Event = (function() {
    var clientList = {},
        listen,
        trigger,
        remove;

    // 订阅事件
    listen = function(key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };


    // 发布消息
    trigger = function() {
        var key = Array.prototype.shift.call(arguments),
        fns = clientList[key];

        if (!fns || fns.length === 0) {
            return false;
        }

        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    };

    // 取消订阅
    remove = function(key, fn) {
        var fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }

        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();


// 测试
Event.listen('squareMeter88', function(price) { // 小红订阅消息
    console.log('价格= ' + price); // 输出： '价格=2000000'
});
Event.trigger('squareMeter88', 2000000); // 售楼处发布消息
