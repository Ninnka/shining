window.onload = function () {
  navListener();
  addNavIconClickListener();
  addWindowResizeListener();


  let imgs_wrapper = document.querySelector(".banner_wrapper");
  let imgs = document.querySelectorAll(".banner_wrapper li");
  let indexes = document.querySelectorAll(".banner_navigator li");
  let content = document.querySelector(".content");
  let nav_icon = document.querySelector(".nav_icon");
  let nav_wrapper = document.querySelector(".nav_wrapper");
  let nav_common = document.querySelector(".nav");
  let currentImg = 0;

  let imgs_wrapper_timer;

  let isScroll = false;

  function getStyle(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    }
    return getComputedStyle(obj, false)[attr];
  }

  function startMove(obj, json, timerInterva, func) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      let isStop = true;
      // 遍历json中的数据
      for (let attr in json) {
        let icur = 0;
        if (attr === "opacity") {
          icur = parseInt(parseFloat(getStyle(obj, attr), 10) * 100, 10);
        } else {
          icur = parseInt(getStyle(obj, attr), 10);
        }

        //设置速度
        let speed = (json[attr] - icur) / 8;
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
    for (let j = 0; j < indexes.length; j++) {
      if (j !== i) indexes[j].style.background = "blue";
    }
  }

  // index点击事件
  for (let i = 0; i < indexes.length; i++) {
    indexes[i].addEventListener("click", function () {
      clearTimeout(indexes.timer);
      clearInterval(imgs_wrapper_timer);
      let currentWidth = imgs_wrapper.offsetWidth;
      startMove(imgs_wrapper, {
        left: i * -currentWidth
      });
      currentImg = i;
      indexes[currentImg].style.background = "red";
      changeIndexBackground(currentImg);
      indexes.timer = setTimeout(function () {
        autoScroll();
      }, 2300);
    }, false);
  }

  // 滚动
  function scroll() {
    isScroll = true;
    if (currentImg !== imgs.length - 1) {
      let currentleft = imgs_wrapper.offsetLeft;
      let currentWidth = imgs_wrapper.offsetWidth;
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

  let resize_timeout;
  // 调整banner的偏移值
  window.onresize = function () {
    clearTimeout(resize_timeout);
    clearInterval(imgs_wrapper_timer);
    if (isScroll === false) {
      let tmp = imgs_wrapper.offsetWidth;
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
  };

  let srcStrPrefix = "../public/imgs/P_";
  let srcStrAfter = ".jpg";
  let currentFDImgIndex = 0;
  let tmpImgSrc;
  let falldown_wrapper = document.querySelector(".falldown_wrapper");

  function createImg() {
    let tmpLi = document.createElement("li");
    tmpLi.className = "tmp_li";
    for (let i = 0; i < 15; i++) {
      tmpImgSrc = srcStrPrefix + "0" + i + srcStrAfter;
      let tmpDiv = document.createElement("div");
      tmpDiv.className = "tmp_div";

      let tmpImg = new Image();
      tmpImg.className = "falldown_img";
      tmpImg.onload = function () {
        // console.log("onload");
      };
      tmpImg.src = tmpImgSrc;

      tmpDiv.appendChild(tmpImg);
      let search_layout = document.createElement("div");
      search_layout.className = "search_layout";
      let search_button = new Image();
      search_button.className = "search_button";
      search_button.src = "../public/imgs/magnifier.png";

      search_layout.appendChild(search_button);
      let img_title = document.createElement("p");
      img_title.className = "img_title";
      img_title.innerHTML = "图片标题";
      search_layout.appendChild(img_title);
      tmpDiv.appendChild(search_layout);

      tmpDiv.addEventListener("mouseover", function () {
        tmpDiv.querySelector(".search_layout")
          .style.display = "block";
      });
      tmpDiv.addEventListener("mouseout", function () {
        tmpDiv.querySelector(".search_layout")
          .style.display = "none";
      });
      if (i % 3 === 0 && i !== 0) {
        falldown_wrapper.appendChild(tmpLi);
        tmpLi = document.createElement("li");
        tmpLi.className = "tmp_li";
      }
      tmpLi.appendChild(tmpDiv);
      if (i === 14) {
        falldown_wrapper.appendChild(tmpLi);
      }
    }
    // 调整宽度
    let fd_img_wrappers = document.querySelectorAll(".tmp_div");
  }
  createImg();

  let back_to_top = document.querySelector("#backtotop");
  let to_top_timer;
  let inScroll = false;

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
    let speed = 40;
    let currentScrollTop;
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
    let offsetTop = obj.offsetTop;
    let p = obj.offsetParent;
    while (p !== null) {
      offsetTop += p.offsetTop;
      p = p.offsetParent;
    }
    return offsetTop;
  }

  // 懒加载
  let load_more_flag = 0;
  window.onscroll = function () {
    if (getElementFullOffsetTop(content) + content.offsetHeight - document.documentElement.scrollTop < document.documentElement.clientHeight) {
      if (load_more_flag <= 1) {
        createImg();
        load_more_flag++;
      }
    }
  };


  back_to_top.addEventListener("click", function () {
    if (!inScroll) {
      inScroll = true;
      moveAnimation(document.documentElement, "scrollTop", 0);
    }
  }, false);

};
