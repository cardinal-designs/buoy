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
  /* Open Supplement Drawer */
  let selectors = {
      openDrawer: '.js-open-supplement-drawer',
      closeDrawer: '.js-close-supplement-drawer'
  }

  document.querySelector(selectors.openDrawer).addEventListener('click', function(){
    openNav();
  });

  document.querySelector(selectors.closeDrawer).addEventListener('click', function(){
    closeNav();
  });

  function openNav() {
        if (window.innerWidth <= 992) {
            document.getElementById("supplementSideDrawer").style.width = "70%";
        }else if (window.innerWidth <= 640 && window.innerWidth <= 992) {
            document.getElementById("supplementSideDrawer").style.width = "100%";
        }else{
            document.getElementById("supplementSideDrawer").style.width = "50%";
        }
    
      document.getElementById("supplementSideDrawer").style.width = "50%";
      document.querySelector('.js-main-drawer-suppliment').classList.add('js-open-drawer');
  }
  
  function closeNav() {
    document.getElementById("supplementSideDrawer").style.width = "0";
    document.querySelector('.js-main-drawer-suppliment').classList.remove('js-open-drawer');
  }

  
setTimeout(function(){
 $(".okeReviews-starRating--small .okeReviews-a11yText").html(function(){
    var text= $(this).text().trim().split(" ");
    var first = text.shift();
    return (text.length > 0 ? "<span class='rated-text'>"+ first + "</span> " : first) + text.join(" ");
  });
},500)
  
})();