/**
 * 获取不同上传对象的方法被隔离在各自的函数里互不干扰，
 * try、 catch 和 if 分支不再纠缠在一起，使得我们可以很方便地的维护和扩展代码。比如，后来
 * 我们又给上传项目增加了 Webkit 控件上传和 HTML5 上传，我们要做的仅仅是下面一些工作
 */

/************************** 迭代的元素（函数） ***************************/
var getActiveUploadObj = function() {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
    } catch (e) {
        return false;
    }
};
var getFlashUploadObj = function() {
    if (supportFlash()) { // supportFlash 函数未提供
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $(str).appendTo($('body'));
    }
    return false;
};
var getFormUpladObj = function() {
    var str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
    return $(str).appendTo($('body'));
};
/************************** 迭代的元素（函数） ***************************/


// 迭代器
var iteratorUploadObj = function() {
    for (var i = 0, fn; fn = arguments[i++];) {
        var uploadObj = fn();
        if (uploadObj !== false) {
            return uploadObj;
        }
    }
};

// 测试
var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj,
    getFormUpladObj);
