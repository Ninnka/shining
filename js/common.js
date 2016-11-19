// window.onload = function () {
//   let currentNav = 1;
//   let nav_lis = document.querySelectorAll(".nav_wrapper li");
//   console.log(nav_lis.length);
//   // 导航栏点击和悬浮事件
//
// }
let currentNav = 1;
let nav_lis = document.querySelectorAll(".nav_wrapper li");

function navListener() {
  for (let i = 0; i < nav_lis.length; i++) {
    nav_lis[i].addEventListener("mouseover", function () {
      nav_lis[i].style.background = "rgb(235,245,131)";
    }, false);
    nav_lis[i].addEventListener("mouseout", function () {
      if (nav_lis[i].className === "nav_item_active") {
        nav_lis[i].style.background = "rgb(207, 219, 0)";
      } else {
        nav_lis[i].style.background = "";
      }
    }, false);

    nav_lis[i].addEventListener("click", function () {
      nav_lis[currentNav - 1].style.background = "";
      nav_lis[currentNav - 1].className = "nav_item_normal";
      currentNav = i + 1;
      nav_lis[i].style.background = "";
      nav_lis[i].className = "nav_item_active";
    }, false);
  }
}
