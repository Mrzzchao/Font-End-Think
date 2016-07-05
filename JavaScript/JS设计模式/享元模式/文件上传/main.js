/**
 * 插件类型 uploadType 是内部状态
 */
var Upload = function(uploadType) {
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function(id) {
    uploadManager.setExternalState(id, this); // 外部状态管理，将外部属性添加到这个共享的内部对象
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
};

/**
 * 如果某种内部状态对应的共享对象已经被创建过，
 * 那么直接返回这个对象，否则创建一个新的对象
 */
var UploadFactory = (function() {
    var createdFlyWeightObjs = {};
    return {
        create: function(uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            }
            return createdFlyWeightObjs[uploadType] = new Upload(
                uploadType);
        }
    }
})();

/**
 *负责向 UploadFactory 提交创建对象的请
 *求，并用一个 uploadDatabase 对象保存所有 upload 对象的外部状态，以便在程序运行过程中给
 *upload 共享对象设置外部状态
 */
var uploadManager = (function() {
    var uploadDatabase = {};
    return {
        add: function(id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);
            var dom = document.createElement('div');
            dom.innerHTML =
                '<span>文件名称:' + fileName + ', 文件大小: ' + fileSize +
                '</span>' +
                '<button class="delFile">删除</button>';
            dom.querySelector('.delFile').onclick = function() {
                flyWeightObj.delFile(id);
            }
            document.body.appendChild(dom);
            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };
            return flyWeightObj;
        },
        setExternalState: function(id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();

// 触发上传动作的 startUpload 函数
var id = 0;
window.startUpload = function(uploadType, files) {
    for (var i = 0, file; file = files[i++];) {
        var uploadObj = uploadManager.add(++id, uploadType, file.fileName,
            file.fileSize);
    }
};

// 测试
var fileArr = [];
for (var i = 0; i < 10000; i++) {
    fileArr.push({
        fileName: i + ".txt",
        fileSize: 2500 + i
    });
}
startUpload('plugin', fileArr);

// startUpload('plugin', [{
//     fileName: '1.txt',
//     fileSize: 1000
// }, {
//     fileName: '2.html',
//     fileSize: 3000
// }, {
//     fileName: '3.txt',
//     fileSize: 5000
// }]);
// startUpload('flash', [{
//     fileName: '4.txt',
//     fileSize: 1000
// }, {
//     fileName: '5.html',
//     fileSize: 3000
// }, {
//     fileName: '6.txt',
//     fileSize: 5000
// }]);
