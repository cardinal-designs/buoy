$(window).on("load resize orientationchange", function(){
  var t = $("body").width(),
    i = 1440,
    s = t - i,
    a = s / 2;
    if(a < 100) {
      var f_a = 100;
    } 
    else {
      var f_a = a;      
    }
  $(".Trusted_Reviews_List").css("padding-left", f_a);
});

$('.Trusted_Reviews_Wrapper_1 .Trusted_Reviews_Slider').slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  loop: true,
  responsive: [
    {
      breakpoint: 1440, 
      settings: {
         slidesToShow: 1
      }
    }
  ]
});

$('.Trusted_Reviews_Wrapper_2 .Trusted_Reviews_Slider').slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  loop: true,
  responsive: [
    {
      breakpoint: 768, 
      settings: {
         slidesToShow: 1
      }
    }
  ]
});

var $slider = $('.Trusted_Reviews_Slider');

// Next slide button
$('.Arrow_Next').click(function() {
    $slider.slick('slickNext');
});

// Prev slide button
$('.Arrow_Previous').click(function() {
    $slider.slick('slickPrev');
});