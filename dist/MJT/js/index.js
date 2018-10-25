//IIFE
(function () {
  "use strict";
  var menuId;
  function init () {
    menuId = document.getElementById("menu");
    document.addEventListener("scroll",scrollMenu,false);
  }
  function scrollMenu () {
    if (document.documentElement.scrollTop > 50) {
      menuId.classList.add("scroll");
      console.log('scroll');
    }
    else {
      menuId.classList.remove("scroll");
      console.log('no-scroll');
    }
  }
  document.addEventListener("DOMContentLoaded",init,false);
})();

(function (){
  "use strict";
  var mobBtn, topMenu;
  
  function init() {
    mobBtn = document.getElementById("mobile-btn");
  topMenu = document.getElementById("top-menu");
    mobBtn.addEventListener("click",mobileMenu,false);
    topMenu.addEventListener("click",mobileMenu,false);
  }
  
  function mobileMenu() {
    if(topMenu.classList.contains("mobile-open")) {
       topMenu.classList.remove("mobile-open");
       }else{
        topMenu.classList.add("mobile-open");
       }
    if (mobBtn.classList.contains("hamburger-cross")) {
			mobBtn.classList.remove("hamburger-cross");
		}
		else {
			mobBtn.classList.add("hamburger-cross");
		}
  }
  
  document.addEventListener("DOMContentLoaded",init);
  
})();

//IIFE
(function () {

  $(".box-click-container").click(function () {

    $header = $(this);
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(500, function () {
       if ($(this).is(':visible'))
        $(this).css('display','inline-block');
       
    });

});

})();

