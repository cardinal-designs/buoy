$(window).on('load', function (){
  $('.reviews-slider__slider').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 24,
    prevArrow: '<button type="button" class="slick-prev"><svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="2.19116" y1="10.5566" x2="23.7245" y2="10.5566" stroke="#1F2322"/><path d="M10.9489 20L1.44886 10.5L10.9489 1.00002" stroke="#1F2322"/></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="22.2577" y1="10.4434" x2="0.724379" y2="10.4434" stroke="#1F2322"/><path d="M13.5 1L23 10.5L13.5 20" stroke="#1F2322"/></svg></button>',
    appendArrows: '.reviews-slider__arrows',
    responsive: [
      {
        breakpoint: 1125,
        settings : {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings : {
          arrows: false,
          slidesToShow: 1,
        }
      }
    ]
  });
});