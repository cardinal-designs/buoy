$( document ).ready(function() {
  $('.Testimonials_Slider').slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $( '.radio_rtx' ).parents('.Subscribe_Box').click(function() {
    $(this).addClass('active');
    $('.rtx_option_selector input').prop( "checked", false );
    $(this).find('input').prop( "checked", true );
    $(this).siblings('.Subscribe_Box').removeClass('active');
    document.querySelector('.rtx_option_selector input:checked').click();
  });

  document.querySelector('.rtx_option_selector input:checked').click();
});




(function(){
  /* Open Supplement Drawer */
  let selectors = {
      openDrawer: '.js-open-supplement-drawer',
      closeDrawer: '.js-close-supplement-drawer',
      openIngredients: '.js-ingredients-open',
      closeContinue: '.mobile-supplement-continue',
      pageOverlay: '.page-overlay'
  }

  document.querySelector(selectors.openIngredients).addEventListener('click', function(){
    openNav();
  });

  document.querySelector(selectors.openDrawer).addEventListener('click', function(){
    openNav();
  });

  document.querySelector(selectors.closeDrawer).addEventListener('click', function(){
    closeNav();
  });

  document.querySelector(selectors.pageOverlay).addEventListener('click', function(){
    closeNav();
  });

  document.querySelector(selectors.closeContinue).addEventListener('click', function(){
    closeNav();
  });

  function openNav() {
    document.getElementById("supplementSideDrawer").style.right = "0";
    document.querySelector('.page-overlay').classList.add('is-visible');
    document.querySelector('body').classList.add('lock-scroll');
    document.querySelector('.supplement-side-drawer .drawer_header').classList.add('mobile-fixed-header');
  }
  
  function closeNav() {
    document.getElementById("supplementSideDrawer").style.right = "-100%";
    document.querySelector('.page-overlay').classList.remove('is-visible');
    document.querySelector('body').classList.remove('lock-scroll');
    document.querySelector('.supplement-side-drawer .drawer_header').classList.remove('mobile-fixed-header');
  }

  
setTimeout(function(){
 $(".okeReviews-starRating--small .okeReviews-a11yText").html(function(){
    var text= $(this).text().trim().split(" ");
    var first = text.shift();
    return (text.length > 0 ? "<span class='rated-text'>"+ first + "</span> " : first) + text.join(" ");
  });
},100)
  
})();