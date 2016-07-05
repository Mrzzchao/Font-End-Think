/**
 * 分别表示 3 种购买模式的节点函数，我们约定，如果某个节点不能处理请
 * 求，则返回一个特定的字符串 'nextSuccessor'来表示该请求需要继续往后面传递
 * 优惠函数
 */
var order500 = function(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500 元定金预购，得到 100 优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};
var order200 = function(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200 元定金预购，得到 50 优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
    }
};
var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
};

/**
 * 定义一个构造函数 Chain，在 new Chain 的时候传
 * 递的参数即为需要被包装的函数， 同时它还拥有一个实例属性 this.successor，表示在链中的下
 * 一个节点
 */
var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};
/**
 * 指定在链中的下一个节点
 */
Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
};

/**
 * 传递请求给某个节点
 */
Chain.prototype.passRequest = function() {
    var ret = this.fn.apply(this, arguments);
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor,
            arguments);
    }
    return ret;
};

/**
 * 表示手动传递请求给职责链中的下一个节点
 * 异步请求时调用
 */
Chain.prototype.next = function() {
    return this.successor && this.successor.passRequest.apply(this.successor,
        arguments);
};

/**=====================测试=================**/

/**
 * 把 3 个订单函数分别包装成职责链的节点
 */
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 指定节点在职责链中的顺序：
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500); // 输出： 500 元定金预购，得到 100 优惠券
chainOrder500.passRequest(2, true, 500); // 输出： 200 元定金预购，得到 50 优惠券
chainOrder500.passRequest(3, true, 500); // 输出：普通购买，无优惠券
chainOrder500.passRequest(1, false, 0); // 输出：手机库存不足

// 异步测试
var fn1 = new Chain(function() {
    console.log(1);
    return 'nextSuccessor';
});
var fn2 = new Chain(function() {
    console.log(2);
    var self = this;
    setTimeout(function() {   // 模拟异步
        console.log(3);
    }, 1000);
});
var fn3 = new Chain(function() {
    console.log(3);
});
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
