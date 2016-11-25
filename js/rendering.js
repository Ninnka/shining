require(["common"], function (common) {
  common.navListener();
  common.addNavIconClickListener();
  common.addWindowResizeListener();

  var imgs_wrapper = document.querySelector(".banner_wrapper");
  var imgs = document.querySelectorAll(".banner_wrapper li");
  var indexes = document.querySelectorAll(".banner_navigator li");
  var content = document.querySelector(".content");
  var nav_icon = document.querySelector(".nav_icon");
  var nav_wrapper = document.querySelector(".nav_wrapper");
  var nav_common = document.querySelector(".nav");
  var currentImg = 0;

  var imgs_wrapper_timer;

  var isScroll = false;

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
        if (func) {
          func();
        }
      }

    }, 16);
  }

  function changeIndexBackground(i) {
    for (var j = 0; j < indexes.length; j++) {
      if (j !== i) indexes[j].style.background = "blue";
    }
  }

  // index点击事件
  for (var i = 0; i < indexes.length; i++) {
    indexes[i].addEventListener("click", function (i) {
      // console.log(i);
      return function () {
        // console.log(i);
        clearTimeout(indexes.timer);
        clearInterval(imgs_wrapper_timer);
        var currentWidth = imgs_wrapper.offsetWidth;
        startMove(imgs_wrapper, {
          left: i * -currentWidth
        });
        currentImg = i;
        // console.log(currentImg);
        indexes[currentImg].style.background = "red";
        changeIndexBackground(currentImg);
        indexes.timer = setTimeout(function () {
          autoScroll();
        }, 2300);
      };
    }(i), false);
  }

  // 滚动
  function scroll() {
    isScroll = true;
    if (currentImg !== imgs.length - 1) {
      var currentleft = imgs_wrapper.offsetLeft;
      var currentWidth = imgs_wrapper.offsetWidth;
      startMove(imgs_wrapper, {
        left: currentleft - currentWidth
      }, undefined, function () {
        isScroll = false;
      });
      currentImg++;
      indexes[currentImg].style.background = "red";
      changeIndexBackground(currentImg);
    } else {
      startMove(imgs_wrapper, {
        left: 0
      }, undefined, function () {
        isScroll = false;
      });
      currentImg = 0;
      indexes[currentImg].style.background = "red";
      changeIndexBackground(currentImg);
    }
  }

  // banner自动滚动事件
  function autoScroll() {
    clearTimeout(indexes.timer);
    imgs_wrapper_timer = setInterval(function () {
      scroll();
    }, 2500);
  }
  autoScroll();

  var resize_timeout;
  // 调整banner的偏移值
  window.addEventListener("resize", function () {
    clearTimeout(resize_timeout);
    clearInterval(imgs_wrapper_timer);
    if (isScroll === false) {
      var tmp = imgs_wrapper.offsetWidth;
      // console.log("currentImg:" + currentImg);
      imgs_wrapper.style.left = -currentImg * tmp + "px";
    }
    resize_timeout = setTimeout(function () {
      autoScroll();
    }, 2500);
    if (document.documentElement.clientWidth >= 680) {
      nav_wrapper.style.display = "";
      nav_icon.className = "nav_icon";
      nav_common.className = "nav";
    }
  });

  var srcStrPrefix = "../public/imgs/P_";
  var srcStrAfter = ".jpg";
  var currentFDImgIndex = 0;
  var tmpImgSrc;
  var falldown_wrapper = document.querySelector(".falldown_wrapper");
  var falldownLis = document.querySelectorAll(".falldown_wrapper li");

  // function createImg() {
  //   var tmpLi = document.createElement("li");
  //   tmpLi.className = "tmp_li";
  //   for (var i = 0; i < 15; i++) {
  //     tmpImgSrc = srcStrPrefix + "0" + i + srcStrAfter;
  //     var tmpDiv = document.createElement("div");
  //     tmpDiv.className = "tmp_div";
  //
  //     var tmpImg = new Image();
  //     tmpImg.className = "falldown_img";
  //     tmpImg.onload = function () {
  //       // console.log("onload");
  //     };
  //     tmpImg.src = tmpImgSrc;
  //
  //     tmpDiv.appendChild(tmpImg);
  //     var search_layout = document.createElement("div");
  //     search_layout.className = "search_layout";
  //     var search_button = new Image();
  //     search_button.className = "search_button";
  //     search_button.src = "../public/imgs/magnifier.png";
  //
  //     search_layout.appendChild(search_button);
  //     var img_title = document.createElement("p");
  //     img_title.className = "img_title";
  //     img_title.innerHTML = "图片标题";
  //     search_layout.appendChild(img_title);
  //     tmpDiv.appendChild(search_layout);
  //
  //     tmpDiv.addEventListener("mouseover", function () {
  //       tmpDiv.querySelector(".search_layout")
  //         .style.display = "block";
  //     });
  //     tmpDiv.addEventListener("mouseout", function () {
  //       tmpDiv.querySelector(".search_layout")
  //         .style.display = "none";
  //     });
  //     if (i % 3 === 0 && i !== 0) {
  //       falldown_wrapper.appendChild(tmpLi);
  //       tmpLi = document.createElement("li");
  //       tmpLi.className = "tmp_li";
  //     }
  //     tmpLi.appendChild(tmpDiv);
  //     if (i === 14) {
  //       falldown_wrapper.appendChild(tmpLi);
  //     }
  //   }
  //   // 调整宽度
  //   var fd_img_wrappers = document.querySelectorAll(".tmp_div");
  // }
  // createImg();

  var heightArr = [];
  var total = 0;
  var marginBottom = parseInt((falldown_wrapper.offsetWidth * 0.01)
    .toFixed(0));

  function insertToFallDown(i) {
    tmpImgSrc = srcStrPrefix + "0" + i % 16 + srcStrAfter;
    var tmpDiv = document.createElement("div");
    tmpDiv.className = "falldown_img_wrapper";
    var tmpImg = new Image();
    tmpImg.className = "falldown_img";
    tmpDiv.appendChild(tmpImg);
    var search_layout = document.createElement("div");
    search_layout.className = "search_layout";
    var search_button = new Image();
    search_button.className = "search_button";
    search_button.src = "../public/imgs/magnifier.png";
    search_layout.appendChild(search_button);
    var img_title = document.createElement("p");
    img_title.className = "img_title";
    img_title.innerHTML = "图片标题";
    search_layout.appendChild(img_title);
    tmpDiv.appendChild(search_layout);
    tmpDiv.addEventListener("mouseover", function () {
      this.querySelector(".search_layout")
        .style.display = "block";
    });
    tmpDiv.addEventListener("mouseout", function () {
      this.querySelector(".search_layout")
        .style.display = "none";
    });
    if (i < 3) {
      tmpImg.onload = function (i) {
        return function () {
          falldownLis[i].appendChild(tmpDiv);
          var tmpH = falldownLis[i].offsetHeight + marginBottom;
          heightArr.push(tmpH);
        };
      }(i);
      tmpImg.src = tmpImgSrc;
    } else {
      tmpImg.onload = function (i) {
        return function () {
          var minH = Math.min.apply(null, heightArr);
          var index = heightArr.indexOf(minH);
          falldownLis[index].appendChild(tmpDiv);
          heightArr[index] = falldownLis[index].offsetHeight + marginBottom;
        };
      }(i);
      tmpImg.src = tmpImgSrc;
    }
  }

  function createFallDown() {
    var tmpTotal = total;
    for (var i = total; i < tmpTotal + 16; i++) {
      insertToFallDown(i);
      total++;
    }
  }
  createFallDown();

  var back_to_top = document.querySelector("#backtotop");
  var to_top_timer;
  var inScroll = false;

  back_to_top.addEventListener("click", function () {
    if (!inScroll) {
      inScroll = true;
      moveAnimation(document.documentElement, "scrollTop", 0);
    }
  }, false);

  function getStyle(obj, attr) {
    // 第一个参数:具体的元素
    // 第二个参数:具体属性 ,例如width等
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    }
    return getComputedStyle(obj, false)[attr];
  }

  function moveAnimation(obj, attr, target, func) {
    clearInterval(to_top_timer);
    var speed = 40;
    var currentScrollTop;
    to_top_timer = setInterval(function () {
      currentScrollTop = obj[attr];
      if (currentScrollTop <= target) {
        clearInterval(to_top_timer);
        obj[attr] = 0;
        inScroll = false;
        return;
      }
      currentScrollTop -= speed;
      obj[attr] = currentScrollTop;
    }, 1);
  }

  function getElementFullOffsetTop(obj) {
    var offsetTop = obj.offsetTop;
    var p = obj.offsetParent;
    while (p !== null) {
      offsetTop += p.offsetTop;
      p = p.offsetParent;
    }
    return offsetTop;
  }

  // 懒加载
  var load_more_flag = 0;
  window.addEventListener("scroll", function () {
    if (getElementFullOffsetTop(falldown_wrapper) + falldown_wrapper.offsetHeight - document.documentElement.scrollTop < document.documentElement.clientHeight) {
      if (load_more_flag <= 1) {
        createFallDown();
        load_more_flag++;
      }
    }
  });
});
