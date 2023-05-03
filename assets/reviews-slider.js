$(function(){
  function slickOnResize() {
    $(".Reviews_Slider_Container").not('.slick-initialized').slick({
      lazyLoad: 'progressive',
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 768,
          settings : {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
  if (window.innerWidth < 1200) {
    slickOnResize();
  }
  $(window).on('load resize',function(){
    var $window_width = window.innerWidth;
    console.log(window.innerWidth);
    if ($window_width < 1200) {
      if($(".Reviews_Slider_Container").hasClass('slick-initialized')){
        $(".Reviews_Slider_Container").slick("resize");
      }
      else{
        slickOnResize();
      }
    }
    else{
      if($(".Reviews_Slider_Container").hasClass('slick-initialized')){
        $(".Reviews_Slider_Container").slick('unslick');
      }
    }
  });
});