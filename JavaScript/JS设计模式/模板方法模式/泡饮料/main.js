// 抽象父类 饮料
var Beverage = function() {};
Beverage.prototype.boilWater = function() {
    console.log('把水煮沸');
};
Beverage.prototype.brew = function() {
    throw new Error('子类必须重写 brew 方法');
};
Beverage.prototype.pourInCup = function() {
    throw new Error('子类必须重写 pourInCup 方法');
};
Beverage.prototype.addCondiments = function() {
    throw new Error('子类必须重写 addCondiments 方法');
};
Beverage.prototype.customerWantsCondiments = function() {
    return true; // 默认需要调料
};
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) { // 如果挂钩返回 true，则需要调料
        this.addCondiments();
    }
};

// 茶
var Tea = function() {};
Tea.prototype = new Beverage();
Tea.prototype.brew = function() {
    console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function() {
    console.log('把茶倒进杯子');
};
Tea.prototype.addCondiments = function() {
    console.log('加柠檬');
};
var tea = new Tea();
tea.init();

// 咖啡
var CoffeeWithHook = function() {};
CoffeeWithHook.prototype = new Beverage();
CoffeeWithHook.prototype.brew = function() {
    console.log('用沸水冲泡咖啡');
};
CoffeeWithHook.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子');
};
CoffeeWithHook.prototype.addCondiments = function() {
    console.log('加糖和牛奶');
};
CoffeeWithHook.prototype.customerWantsCondiments = function() {
    return window.confirm('请问需要调料吗？ ');
};
var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();
