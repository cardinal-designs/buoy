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

  // document.querySelector('.rtx_option_selector input:checked').click();
});


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

$('.dropdown-ind__drop .close, .dropdown-ind').click(function() {
  $(this).parent().find('p, img').toggle()
  $(this).parent().find('.close').toggleClass('flip'); 
})


//scrollbar js start
$('.image-slider__img-container, .image-slider__img-container-mobile').scroll(function() {
  let window_width = $( window ).width();
  let img_width =  $(this).find('img').width() + (parseInt($(this).find('img').css("marginRight"),10)*2);
  let scroll_width = img_width - window_width
  let scrollable =  $(this).scrollLeft()

  let scroll_percent = (scrollable / scroll_width)*($('.image-slider__track').width() - 12)
  $( ".image-slider__dot" ).css("left", scroll_percent )
})

$( ".image-slider__dot" ).draggable({ containment: "parent", axis: "x", drag: function( event, ui ) {} });
$( ".image-slider__dot" ).on( "drag", function( event, ui ) {
  let drag_width = $('.image-slider__track').width() - 12;
  let window_width = $( window ).width();
  let img_width =  $('.image-slider__img-container').find('img').width() + (parseInt($('.image-slider__img-container').find('img').css("marginRight"),10)*2);
  let scroll_width = img_width - window_width

  let img_width_mobile =  $('.image-slider__img-container-mobile').find('img').width() + (parseInt($('.image-slider__img-container-mobile').find('img').css("marginRight"),10)*2);
  let scroll_width_mobile = img_width_mobile - window_width
  
  let scroll_percent2 = (ui.position.left / drag_width)*scroll_width
   $('.image-slider__img-container').scrollLeft(scroll_percent2)  

    let scroll_percent3 = (ui.position.left / drag_width)*scroll_width_mobile
  console.log('f',scroll_percent3)
   $('.image-slider__img-container-mobile').scrollLeft(scroll_percent3) 
} );
// scrollbar js end

(function(){
  /* Open Supplement Drawer */
  let selectors = {
      openDrawer: '.js-open-supplement-drawer',
      openDrawerSection: '.js-open-supplement-drawer.supplement-section-link',
      closeDrawer: '.js-close-supplement-drawer',
      openIngredients: '.js-ingredients-open',
      closeContinue: '.mobile-supplement-continue',
      pageOverlay: '.page-overlay'
  }

    var element =  document.getElementsByClassName('js-open-supplement-drawer');

  
  document.querySelector(selectors.openIngredients).addEventListener('click', function(){
    openNav();
  }); 

  document.querySelector(selectors.openDrawerSection).addEventListener('click', function(){
    openNav();
  });

    if (typeof(element) != 'undefined' && element != null)
    {
  
  document.querySelector(selectors.openDrawer).addEventListener('click', function(){
    openNav();
  });
    }
  


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

// (function(){
//   /* Open Supplement Drawer */
//   let selectors = {
//       openDrawer: '.Open_Drawer',
//       closeDrawer: '.js-close-supplement-drawer',
//       pageOverlay: '.page-overlay'
//   }

//   document.querySelector(selectors.Open_Drawer).addEventListener('click', function(){
//     openNavMain();
//     console.log(11);
//   });

//   function openNavMain() {
//     document.getElementByClassNames("Supplement_Side_Drawer").style.right = "0";
//     document.querySelector('.page-overlay').classList.add('is-visible');
//     document.querySelector('body').classList.add('lock-scroll');
//     document.querySelector('.supplement-side-drawer .drawer_header').classList.add('mobile-fixed-header');
//   }
  
//   function closeNavMain() {
//     document.getElementByClassNames("Supplement_Side_Drawer").style.right = "-100%";
//     document.querySelector('.page-overlay').classList.remove('is-visible');
//     document.querySelector('body').classList.remove('lock-scroll');
//     document.querySelector('.supplement-side-drawer .drawer_header').classList.remove('mobile-fixed-header');
//   }

//   setTimeout(function(){
//     $(".okeReviews-starRating--small .okeReviews-a11yText").html(function(){
//       var text= $(this).text().trim().split(" ");
//       var first = text.shift();
//       return (text.length > 0 ? "<span class='rated-text'>"+ first + "</span> " : first) + text.join(" ");
//      });
//    },100);
  
// })();