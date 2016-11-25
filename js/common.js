define(function () {
  var currentNav = 1;
  var nav_lis = document.querySelectorAll(".nav_wrapper li");
  var nav_icon = document.querySelector(".nav_icon");
  var nav_wrapper = document.querySelector(".nav_wrapper");
  var nav_common = document.querySelector(".nav");

  function navListener() {
    var i = 0;
    for (; i < nav_lis.length; i++) {
      nav_lis[i].addEventListener("mouseover", function () {
        this.style.background = "rgb(235,245,131)";
      }, false);
      nav_lis[i].addEventListener("mouseout", function () {
        if (this.className === "nav_item_active") {
          this.style.background = "rgb(207, 219, 0)";
        } else {
          this.style.background = "";
        }
      }, false);

      nav_lis[i].addEventListener("click", function () {
        nav_lis[currentNav - 1].style.background = "";
        nav_lis[currentNav - 1].className = "nav_item_normal";
        currentNav = i + 1;
        this.style.background = "";
        this.className = "nav_item_active";
      }, false);
    }
  }

  function addNavIconClickListener() {
    nav_icon.addEventListener("click", function () {
      if (nav_wrapper.style.display === "none" || nav_wrapper.style.display === "") {
        nav_wrapper.style.display = "inline-block";
        nav_common.className = "nav_active";
        nav_icon.className = "nav_icon_active";
      } else {
        nav_wrapper.style.display = "none";
        nav_common.className = "nav";
        nav_icon.className = "nav_icon";
      }
    });
  }

  function addWindowResizeListener() {
    window.addEventListener("resize", function () {
      if (document.documentElement.clientWidth >= 680) {
        nav_wrapper.style.display = "";
        nav_icon.className = "nav_icon";
        nav_common.className = "nav";
      }
    });
  }

  return {
    navListener: navListener,
    addNavIconClickListener: addNavIconClickListener,
    addWindowResizeListener: addWindowResizeListener
  };

});
