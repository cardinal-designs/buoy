$( document ).ready(function() {
  (function($){

    var $window = $(window);

    function checkWidth() {
      var windowsize = $window.width();
      if (windowsize > 768) {
        $(window).scroll(function () {
          if ($(this).scrollTop() < 2300) { 
            $('.image-with-dropdowns__image.hide-desktop .aspect-ratio').first().show();
            $('.image-with-dropdowns__image.hide-desktop .aspect-ratio').last().hide();  
          } else {
            $('.image-with-dropdowns__image.hide-desktop .aspect-ratio').last().show();
            $('.image-with-dropdowns__image.hide-desktop .aspect-ratio').first().hide();
          }
        });
      }
    }

    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
  })(jQuery);
}); 
