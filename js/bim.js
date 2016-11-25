require(["common"], function (common) {
  common.navListener();
  common.addNavIconClickListener();
  common.addWindowResizeListener();

  var currentPage = 0;
  var maxPages = 6;

  var wrapper = document.querySelector(".wrapper");
  var contents = document.querySelectorAll(".content_bg");

  var doc_clientHeight;

  var nav = document.querySelector("#head");
  var content_maintitle_wrapper = document.querySelector(".content_maintitle_wrapper");
  var contact_wrapper = document.querySelector(".contact");
  var yl = document.querySelector(".yl");
  var copyright_wrapper = document.querySelector(".copyright");
  var footer_height = contact_wrapper.offsetHeight + yl.offsetHeight + copyright_wrapper.offsetHeight;
  var top_height = nav.offsetHeight + content_maintitle_wrapper.offsetHeight;
  // console.log("top_height: " + top_height);

  var back_to_top = document.querySelector("#backtotop");

  // 调整宽度
  function adjustHeightAndBg() {
    var bgStrPrefix = "../public/imgs/BIM-bg";
    var bgStrAfter = ".png";
    doc_clientHeight = document.documentElement.clientHeight;
    for (var i = 0; i < contents.length; i++) {
      contents[i].style.height = doc_clientHeight + "px";
      contents[i].style.background = "url(" + bgStrPrefix + (i + 1) + bgStrAfter + ")";
    }
  }
  adjustHeightAndBg();

  function resetHeight() {
    doc_clientHeight = document.documentElement.clientHeight;
    for (var i = 0; i < contents.length; i++) {
      contents[i].style.height = doc_clientHeight + "px";
    }
  }

  function adjustMarginTop() {
    doc_clientHeight = document.documentElement.clientHeight;
    top_height = nav.offsetHeight + content_maintitle_wrapper.offsetHeight;
    var tmpMarginTop;
    if (currentPage >= 1 && currentPage <= maxPages) {
      tmpMarginTop = (currentPage - 1) * doc_clientHeight + top_height;
      wrapper.style["margin-top"] = -tmpMarginTop + "px";
    }
  }

  function getStyle(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    }
    return getComputedStyle(obj, false)[attr];
  }

  function startMove(obj, json, timerInterva, func) {
    clearInterval(obj.timer);
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
        var speed = (json[attr] - icur) / 8;
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
    }, 16);
  }

  window.addEventListener("resize", function () {
    resetHeight();
    adjustMarginTop();
    top_height = nav.offsetHeight + content_maintitle_wrapper.offsetHeight;
    // console.log("top_height: " + top_height);
  });

  var isWheel = false;
  document.addEventListener("wheel", function (event) {
    var tmpTop;
    var currentMT;
    if (event.deltaY > 0 && !isWheel && currentPage <= 5) {
      isWheel = true;
      // var tmpTop;
      // var currentMT = wrapper.style["margin-top"];
      currentMT = wrapper.style["margin-top"];

      currentMT = currentMT === "" ? 0 : parseInt(currentMT, 10);
      if (currentPage === 0) {
        tmpTop = top_height;
      } else if (currentPage === 5) {
        tmpTop = footer_height + parseInt(getStyle(contact_wrapper, "margin-top"), 10);
      } else {
        tmpTop = document.documentElement.clientHeight;
      }
      startMove(wrapper, {
        "margin-top": -tmpTop + currentMT
      }, undefined, function () {
        isWheel = false;
      });
      if (currentPage >= 1 && currentPage <= contents.length - 2) {
        startMove(contents[currentPage].querySelector(".presentation"), {
          opacity: 100
        });
        startMove(contents[currentPage - 1].querySelector(".presentation"), {
          opacity: 30
        });
      } else if (currentPage === 0) {
        startMove(contents[0].querySelector(".presentation"), {
          opacity: 100
        });
      } else if (currentPage === contents.length - 1) {
        startMove(contents[contents.length - 1].querySelector(".presentation"), {
          opacity: 100
        });
      }
      if (currentPage <= 5) {
        currentPage++;
      }
    }
    if (event.deltaY < 0 && !isWheel && currentPage >= 1) {
      isWheel = true;
      // var tmpTop;
      // var currentMT = wrapper.style["margin-top"];
      currentMT = wrapper.style["margin-top"];

      currentMT = currentMT === "" ? 0 : parseInt(currentMT, 10);
      // console.log("currentMT: " + currentMT);
      if (currentPage === 1) {
        // tmpTop = 314;
        tmpTop = top_height;
      } else if (currentPage === 6) {
        // console.log("getStyle(contact_wrapper, 'margin-top'): " + getStyle(contact_wrapper, "margin-top"));
        tmpTop = footer_height + parseInt(getStyle(contact_wrapper, "margin-top"), 10);
      } else {
        tmpTop = document.documentElement.clientHeight;
      }
      startMove(wrapper, {
        "margin-top": tmpTop + currentMT
      }, undefined, function () {
        isWheel = false;
      });
      if (currentPage <= 5 && currentPage >= 2) {
        startMove(contents[currentPage - 1].querySelector(".presentation"), {
          opacity: 30
        });
        startMove(contents[currentPage - 2].querySelector(".presentation"), {
          opacity: 100
        });
      } else if (currentPage === 6) {
        startMove(contents[contents.length - 1].querySelector(".presentation"), {
          opacity: 100
        });
      } else if (currentPage === 1) {
        startMove(contents[0].querySelector(".presentation"), {
          opacity: 30
        });
      }
      currentPage--;
    }
  });

  back_to_top.addEventListener("click", function () {
    if (!isWheel) {
      isWheel = true;
      startMove(wrapper, {
        "margin-top": 0
      }, undefined, function () {
        isWheel = false;
        currentPage = 0;
      });
    }
  }, false);

  function getElementFullOffsetTop(obj) {
    var offsetTop = obj.offsetTop;
    var p = obj.offsetParent;
    while (p !== null) {
      offsetTop += p.offsetTop;
      p = p.offsetParent;
    }
    return offsetTop;
  }

  nav_icon.addEventListener("click", function () {
    top_height = nav.offsetHeight + content_maintitle_wrapper.offsetHeight;
  });


});
