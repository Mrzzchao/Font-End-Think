/**
 * 应用场景
 * 避免网速过慢时，图片加载未完成前出现的空白
 */

var myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
});

/**
 * 代理函数
 */
var proxyImage = (function() {
    var img = new Image;
    img.onload = function() {
        myImage.setSrc(this.src); // this 指向proxyImage img对象

        //代理和本体接口的一致性
        // myImage(this.src);  // this 指向proxyImage img对象
    }

    return {
        setSrc: function(src) {
            myImage.setSrc("加载未完成显示的图片");
            img.src = src;
        }

        //代理和本体接口的一致性
        // function(src) {
        //     myImage("加载未完成显示的图片");
        //     img.src = src;
        // }
    }

    //re
    //

});

// 测试
proxyImage.setSrc("需要加载的图片地址");

//代理和本体接口的一致性
//proxyImage(需要加载的图片地址);
