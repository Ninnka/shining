window.onload = function () {
  navListener();

  let back_to_top = document.querySelector("#backtotop");
  let to_top_timer;
  let inScroll = false;

  function moveAnimation(obj, attr, target, func) {
    clearInterval(to_top_timer);
    let speed = 10;
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

  back_to_top.addEventListener("click", function () {
    if (!inScroll) {
      inScroll = true;
      moveAnimation(document.documentElement, "scrollTop", 0);
    }
  }, false);
};
