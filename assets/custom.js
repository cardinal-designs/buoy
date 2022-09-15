$( document ).ready(function() {
  $('.Testimonials_Slider').slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $( '.radio_rtx' ).click(function() {
    $(this).parents('.Subscribe_Box').addClass('active');
    $(this).parents('.Subscribe_Box').siblings('.Subscribe_Box').removeClass('active');
  });
  
});