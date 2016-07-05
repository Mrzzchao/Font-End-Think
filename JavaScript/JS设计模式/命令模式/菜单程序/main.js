/**
 * 定义 setCommand 函数， setCommand 函数负责往按钮上面安装命令。可以肯定的是，点
 * 击按钮会执行某个 command 命令，执行命令的动作被约定为调用 command 对象的 execute()方法。
 * 虽然还不知道这些命令究竟代表什么操作，但负责绘制按钮的程序员不关心这些事情，他只需要
 * 预留好安装命令的接口， command 对象自然知道如何和正确的对象沟通
 */
var setCommand = function(button, command) {
    button.onclick = function() {
        command.execute();
    }
};

// 具体需要执行的对象方法
var MenuBar = {
    refresh: function() {
        console.log('刷新菜单目录');
    }
};
var SubMenu = {
    add: function() {
        console.log('增加子菜单');
    },
    del: function() {
        console.log('删除子菜单');
    }
};

// 将对象封装在命令类
var RefreshMenuBarCommand = function(receiver) {
    this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function() {
    this.receiver.refresh();
};
var AddSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function() {
    this.receiver.add();
};
var DelSubMenuCommand = function(receiver) {
    this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function() {
    this.receiver.del();
};

// 测试
var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);
