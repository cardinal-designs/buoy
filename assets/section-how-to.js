$( document ).ready(function() {
  (function($){
    var $window = $(window);

    function checkWidth() { 
      var windowsize = $window.width();
      if (windowsize > 768) {
        $(window).scroll(function () { 
          // 600 - 1300 mobile
          // 0 - 900 desktop
          if ($(this).scrollTop() < 450) { 
            $('.page-shop-wholesale .how-to__steps h2 u').html('electrolytes +');
          } else if ($(this).scrollTop() > 850) { 
            $('.page-shop-wholesale .how-to__steps h2 u').html('antioxidants');
          } else if ($(this).scrollTop() > 650) {
            $('.page-shop-wholesale .how-to__steps h2 u').html('trace minerals +');
          } else if ($(this).scrollTop() >= 450) {
            $('.page-shop-wholesale .how-to__steps h2 u').html('vitamins + ');
          }
        });
      } else {
        $(window).scroll(function () {
          // 600 - 1300 mobile
          // 0 - 900 desktop
                    console.log($(this).scrollTop())

          if ($(this).scrollTop() < 1600) { 
            $('.page-shop-wholesale .how-to__steps h2 u').html('electrolytes +');
          } else if ($(this).scrollTop() > 1950) { 
            $('.page-shop-wholesale .how-to__steps h2 u').html('antioxidants');
          } else if ($(this).scrollTop() > 1700) {
            $('.page-shop-wholesale .how-to__steps h2 u').html('trace minerals +');
          } else if ($(this).scrollTop() >= 1600) {
            $('.page-shop-wholesale .how-to__steps h2 u').html('vitamins +');
          }
        });
      }
    }

    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
  })(jQuery);
}); 