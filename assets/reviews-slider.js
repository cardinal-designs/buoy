$(function(){
  function slickOnResize() {
    $(".Reviews_Slider_Container").not('.slick-initialized').slick({
      lazyLoad: 'progressive',
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"></path><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"></path></g></svg></button>',
      nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"></path><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"></path></g></g></svg></button>',
      responsive: [
        {
          breakpoint: 768,
          settings : {
            arrows: false,
          }
        }
      ]
    });
  }
  if (window.innerWidth < 768) {
    slickOnResize();
  }
  $(window).on('load resize',function(){
    var $window_width = window.innerWidth;
    console.log(window.innerWidth);
    if ($window_width < 768) {
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