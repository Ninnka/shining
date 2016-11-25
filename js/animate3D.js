require(["common"], function (common) {
  common.navListener();
  common.addNavIconClickListener();
  common.addWindowResizeListener();

  var back_to_top = document.querySelector("#backtotop");
  var to_top_timer;
  var inScroll = false;

  function moveAnimation(obj, attr, target, func) {
    clearInterval(to_top_timer);
    var speed = 10;
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

  back_to_top.addEventListener("click", function () {
    if (!inScroll) {
      inScroll = true;
      moveAnimation(document.documentElement, "scrollTop", 0);
    }
  }, false);
});
