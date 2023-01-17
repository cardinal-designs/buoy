$( document ).ready(function() {
  (function($){

    var $window = $(window);

    function checkWidth() {
      var windowsize = $window.width();
      if (windowsize > 768) {
        $(window).scroll(function () {
          console.log($(this).scrollTop())
          if ($(this).scrollTop() < 5000) { 
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Fast absorption 🤩');
          } else if ($(this).scrollTop() > 5400) { 
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Made for all day use 🦸🏽‍♀️');
          } else if ($(this).scrollTop() > 5250) {
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Easy on stomach 😌');
          } else if ($(this).scrollTop() >= 5000) {
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('High bioavailability ✨');
          }
        });
      }
    }

    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
  })(jQuery);
}); 
