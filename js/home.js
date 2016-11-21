window.onload = function () {
  let content_item_wrappers = document.getElementsByClassName("content_item_wrapper");

  navListener();
  addNavIconClickListener();
  
  let nav_icon = document.querySelector(".nav_icon");
  let nav_wrapper = document.querySelector(".nav_wrapper");
  let nav = document.querySelector(".nav");

  for (let i = 0; i < content_item_wrappers.length; i++) {
    let img = content_item_wrappers[i].querySelector("img");
    let desc_title = content_item_wrappers[i].querySelector(".desc_title");
    let desc_main = content_item_wrappers[i].querySelector(".desc_main");
    content_item_wrappers[i].addEventListener("mouseover", function () {
      let img = content_item_wrappers[i].querySelector("img");
      let tmpSrc = img.src;
      let newSrc = tmpSrc.replace("1.jpg", "2.jpg");
      img.src = newSrc;
      img.style["border-color"] = "rgb(207, 219, 0)";
      desc_title.style.color = "rgb(60, 60, 60)";
      desc_main.style.color = "rgb(102, 102, 102)";
    }, false);
    content_item_wrappers[i].addEventListener("mouseout", function () {
      let tmpSrc = img.src;
      let newSrc = tmpSrc.replace("2.jpg", "1.jpg");
      img.src = newSrc;
      img.style["border-color"] = "rgb(225, 225, 225)";
      desc_title.style.color = "";
      desc_main.style.color = "";
    }, false);
  }

  function initContentItemImg() {
    let tmp = content_item_wrappers[0].offsetWidth * 0.02;
    for (let i = 0; i < content_item_wrappers.length; i++) {
      if ((i + 1) % 2 !== 0) {
        content_item_wrappers[i].querySelector("img")
          .style["border-right-width"] = tmp + "px";
      } else {
        content_item_wrappers[i].querySelector("img")
          .style["border-left-width"] = tmp + "px";
      }
    }
  }
  initContentItemImg();

  window.onresize = function () {
    if (document.documentElement.clientWidth > 921) {
      initContentItemImg();
    }
    if (document.documentElement.clientWidth >= 680) {
      nav_wrapper.style.display = "";
      nav_icon.className = "nav_icon";
      nav.className = "nav";
    }
  };
};
