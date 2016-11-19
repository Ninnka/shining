function getStyle(obj, attr) {
  // 第一个参数:具体的元素
  // 第二个参数:具体属性 ,例如width等
  // if (obj.currentStyle) {
  //   return obj.currentStyle[attr];
  // }
  return getComputedStyle(obj, false)[attr];
}

function ElementAni(obj, json, timerInterva,func) {
  // clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var isStop = true;
    // 遍历json中的数据
    for (var attr in json) {
      var icur = 0;
      if (attr === "opacity") {
        icur = parseInt(parseFloat(getStyle(obj, attr), 10) * 100, 10);
      } else {
        icur = parseInt(getStyle(obj, attr), 10);
      }

      //设置速度
      var speed = (json[attr] - icur) / 4;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      // 运动跟停止分开
      // 检测终止,如果没达到就isStop = false
      if (icur !== json[attr]) {
        isStop = false;
      }

      if (attr === "opacity") {
        obj.style[attr] = (icur + speed) / 100;
      } else {
        obj.style[attr] = parseInt(getStyle(obj, attr), 10) + speed + "px";
      }
    }

    // 等所有属性到遍历完之后关闭定时器
    if (isStop) {
      clearInterval(obj.timer);
      // 上一个操作完成立即执行下一个操作
      if (func) {
        //外界有传函数就执行,没有就不执行
        func();
      }
    }

  }, timerInterva);
}
