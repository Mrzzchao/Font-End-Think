/******************************* Folder ******************************/
var Folder = function(name) {
    this.name = name;
    this.parent = null; //增加 this.parent 属性
    this.files = [];
};
Folder.prototype.add = function(file) {
    file.parent = this; //设置父对象
    this.files.push(file);
};
Folder.prototype.scan = function() {
    console.log('开始扫描文件夹: ' + this.name);
    for (var i = 0, file, files = this.files; file = files[i++];) {
        file.scan();
    }
};
Folder.prototype.remove = function() {
    if (!this.parent) { //根节点或者树外的游离节点
        return;
    }
    for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        var file = files[l];
        if (file === this) {
            files.splice(l, 1);
        }
    }
};

/******************************* File ******************************/
var File = function(name) {
    this.name = name;
    this.parent = null;
};
File.prototype.add = function() {
    throw new Error('不能添加在文件下面');
};
File.prototype.scan = function() {
    console.log('开始扫描文件: ' + this.name);
};
File.prototype.remove = function() {
    if (!this.parent) { //根节点或者树外的游离节点
        return;
    }
    for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
        var file = files[l];
        if (file === this) {
            files.splice(l, 1);
        }
    }
};

// 扫描测试
console.log("扫描测试：");
var root1 = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var folder2 = new Folder('jQuery');
var file1 = new File('JavaScript 设计模式与开发实践');
var file2 = new File('精通 jQuery');
var file3 = new File('重构与模式')
folder1.add(file1);
folder2.add(file2);
root1.add(folder1);
root1.add(folder2);
root1.add(file3);
root1.scan();

console.log("\n删除测试：");
// 删除测试
var root2 = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var file1 = new Folder('深入浅出 Node.js');
folder1.add(new File('JavaScript 设计模式与开发实践'));
root2.add(folder1);
root2.add(file1);
folder1.remove(); //移除文件夹
root2.scan();
