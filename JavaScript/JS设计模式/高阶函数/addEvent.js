/**
 * 原理：
 * 在第一次进入条件分支之后，在函数内部会重写这个函
 * 数，重写之后的函数就是我们期望的 addEvent 函数，在下一次进入 addEvent 函数的时候， addEvent
 * 函数里不再存在条件分支语句
 *
 * 应用场景：
 * 兼容各种浏览器
 * @param  {dom元素} elem       待绑定事件的元素
 * @param  {string} type        绑定事件的类型
 * @param  {Function} handler   绑定事件的方法
 */
var addEvent = function(elem, type, handler) {
    if(window.addEvnetListener) {
        addEvent = function(elem, type, handler) {
            elem.addEvnetListener(type, handler, false);
        }
    } else if(window.attachEvent) {
        addEvent = function(elem, type, handler) {
            elem.attachEvent('on' + type, handler);
        }
    } else {
        addEvent = function(elem, type, handler) {
            elem['on' + type] = handler;
        }
    }
    addEvent(elem, type, handler);
}
