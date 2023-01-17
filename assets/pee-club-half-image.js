$( document ).ready(function() {
  (function($){

    var $window = $(window);

    function checkWidth() {
      var windowsize = $window.width();
      if (windowsize > 768) {
        $(window).scroll(function () {
          if ($(this).scrollTop() < 2500) { 
            $('.image-with-dropdowns__image.hide-mobile .aspect-ratio').first().show();
            $('.image-with-dropdowns__image.hide-mobile .aspect-ratio').last().hide();  
          } else {
            $('.image-with-dropdowns__image.hide-mobile .aspect-ratio').last().show();
            $('.image-with-dropdowns__image.hide-mobile .aspect-ratio').first().hide();
          }
        });
      }
    }

    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
  })(jQuery);
}); 
