$( document ).ready(function() {
  (function($){

    var $window = $(window);

    function checkWidth() {
      var windowsize = $window.width();
      if (windowsize > 768) {
        $(window).scroll(function () {
          // 600 - 1300 mobile
          // 0 - 900 desktop
          /*if ($(this).scrollTop() < 333) { 
            $('.text-image-blocks__content-container h3 u').html('Hydration');
          } else if ($(this).scrollTop() > 666) { 
            $('.text-image-blocks__content-container h3 u').html('Energy');
          } else if ($(this).scrollTop() > 333) {
            $('.text-image-blocks__content-container h3 u').html('Immunity');
          }*/
          

          if ($(this).scrollTop() < 5000) { 
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Fast absorption 🤩');
          } else if ($(this).scrollTop() > 5400) { 
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Made for all day use 🦸🏽‍♀️');
          } else if ($(this).scrollTop() > 5250) {
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Easy on stomach 😌');
          } else if ($(this).scrollTop() >= 5000) {
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('High bioavailability ✨');
          }
          
          
          if($(this).scrollTop() < 1000) {
            $('.flip-images').hide();
            $(`.emoji-swap`).hide()
            $(`.flip-images[data-id=1]`).css('display','inline-block')
            $(`.emoji-swap[data-emoji=1]`).css('display','inline-block')
          } else if($(this).scrollTop() < 1400) {
            $('.flip-images').hide();
            $(`.emoji-swap`).hide()
            $(`.flip-images[data-id=2]`).css('display','inline-block')
            $(`.emoji-swap[data-emoji=2]`).css('display','inline-block')
          } else if($(this).scrollTop() < 1850) {
            $('.flip-images').hide();
            $(`.emoji-swap`).hide()
            $(`.flip-images[data-id=3]`).css('display','inline-block')
            $(`.emoji-swap[data-emoji=3]`).css('display','inline-block')
          } else if($(this).scrollTop() < 2350) {
            $('.flip-images').hide();
            $(`.emoji-swap`).hide()
            $(`.flip-images[data-id=4]`).css('display','inline-block')
            $(`.emoji-swap[data-emoji=4]`).css('display','inline-block')
          } else {
            $('.flip-images').hide();
            $(`.emoji-swap`).hide()
            $(`.flip-images[data-id=5]`).css('display','inline-block')
            $(`.emoji-swap[data-emoji=5]`).css('display','inline-block')
          }
        });
      } else {
        $(window).scroll(function () {

          // 600 - 1300 mobile
          // 0 - 900 desktop
          if ($(this).scrollTop() < 850) { 
            $('.text-image-blocks__content-container h3 u').html('Hydration');
          } else if ($(this).scrollTop() > 1050) { 
            $('.text-image-blocks__content-container h3 u').html('Energy');
          } else if ($(this).scrollTop() > 850) {
            $('.text-image-blocks__content-container h3 u').html('Immunity');
          }
          
          if ($(this).scrollTop() < 4800) { 
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Fast absorption 🤩');
          } else if ($(this).scrollTop() > 5200) { 
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Made for all day use 🦸🏽‍♀️');
          } else if ($(this).scrollTop() > 5000) {
            $('.page-science-efficacy .text-image-blocks__content-container h3 span').html('Easy on stomach 😌');
          } else if ($(this).scrollTop() >= 4800) {
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
