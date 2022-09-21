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

(function(){
let selectors = {
    openDrawer: '.js-open-supplement-drawer',
    closeDrawer: '.js-close-supplement-drawer'

}

  document.querySelector(selectors.openDrawer).addEventListener('click', function(){
    console.log("open")
  })
  
})();