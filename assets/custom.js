$( document ).ready(function() {
  // $('.Testimonials_Slider').slick({
  //   dots: true,
  //   arrows: true,
  //   infinite: false,
  //   speed: 300,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>',
  //   nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(-90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>',
  //     responsive: [
  //       {
  //         breakpoint: 768,
  //         settings: {
  //           arrows: false
  //         }
  //       }
  //     ]
  // });

  $( '.radio_rtx' ).parents('.Subscribe_Box').click(function() {
    $(this).addClass('active');
    $('.rtx_option_selector input').prop( "checked", false );
    $(this).find('input').prop( "checked", true );
    $(this).siblings('.Subscribe_Box').removeClass('active');
    document.querySelector('.rtx_option_selector input:checked').click();
  });

  document.querySelector('.rtx_option_selector input:checked').click();
});

function AnimateRotate(angle) {
    // caching the object for performance reasons
    var $elem = $('#MyDiv2');

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: 0}).animate({deg: angle}, {
        duration: 2000,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}

$('.faq__item.Shipping_Tab .faq__header').click(function() {
    $('.Testimonials_Slider').slick({
    dots: true,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(-90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false
          }
        }
      ]
  });
})

$('.dropdown-ind__drop .close').click(function() {
  $(this).parent().find('p, img').toggle()

  $({deg: 0}).animate({deg: angle}, {
    duration: 2000,
    step: function(45) {
        $(this).css({
            transform: 'rotate(' + now + 'deg)'
        });
      }
  });
  
})


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