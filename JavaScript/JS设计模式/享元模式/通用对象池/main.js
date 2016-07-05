// 在对象池工厂里，把创建对象的具体过程封装起来，实现一个通用的对象池
var objectPoolFactory = function(createObjFn) {
    var objectPool = []; // 对象池
    return {
        create: function() {
            var obj = objectPool.length === 0 ?
                createObjFn.apply(this, arguments) : objectPool.shift();

            return obj;
        },
        recover: function(obj) {
            objectPool.push(obj);
        }
    }
};

// 利用 objectPoolFactory 来创建一个装载一些 iframe 的对象池
var iframeFactory = objectPoolFactory(function() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.onload = function() {
        iframe.onload = null; // 防止 iframe 重复加载的 bug
        iframeFactory.recover(iframe); // iframe 加载完成之后回收节点
    };
    iframe.style.display = "block";
    iframe.style.width = "100%";
    iframe.style.height = "400px";
    return iframe;
});

// 测试
var iframe1 = iframeFactory.create();
iframe1.src = 'http://www.baidu.com';
var iframe2 = iframeFactory.create();
iframe2.src = 'http://www.qq.com';
setTimeout(function() {
    var iframe3 = iframeFactory.create();
    iframe3.src = 'http://www.163.com';
}, 3000);
