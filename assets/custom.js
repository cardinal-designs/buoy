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
    if(document.querySelector('.rtx_option_selector input:checked')) document.querySelector('.rtx_option_selector input:checked').click();
  });

  if(document.querySelector('.rtx_option_selector input:checked')) document.querySelector('.rtx_option_selector input:checked').click();
});

$('.related-blog-wrapper .article-card__title').matchHeight();

$('.supplement-facts-form-image').slick({
  dots: false,
  arrows: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(-90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>'
});

$('.Testimonials_Slider').slick({
  dots: true,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(-90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>'
});

$('.Featured_product__media-list').slick({
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
      closeContinue: '.drawer__mobile-continue',
      closeContinueDesktop: '.drawer__desktop-continue',
      pageOverlay: '.page-blury-overlay'
  }

  var element =  document.getElementsByClassName('js-open-supplement-drawer');

  if (document.querySelector(selectors.openIngredients) != 'undefined' && document.querySelector(selectors.openIngredients) != null) {
    document.querySelector(selectors.openIngredients).addEventListener('click', function(){
      openNav();
    }); 
  }

  if (document.querySelector(selectors.openDrawerSection) != 'undefined' && document.querySelector(selectors.openDrawerSection) != null) {
    document.querySelector(selectors.openDrawerSection).addEventListener('click', function(){
      openNav();
    });
  }

  if (document.querySelector(selectors.openDrawer) != 'undefined' && document.querySelector(selectors.openDrawer) != null) {
    document.querySelector(selectors.openDrawer).addEventListener('click', function(){
      openNav();
    });
  }

  if (document.querySelector(selectors.closeDrawer) != 'undefined' && document.querySelector(selectors.closeDrawer) != null) {
    document.querySelector(selectors.closeDrawer).addEventListener('click', function(){
      closeNav();
    });
  }

  if (document.querySelector(selectors.pageOverlay) != 'undefined' && document.querySelector(selectors.pageOverlay) != null) {
    document.querySelector(selectors.pageOverlay).addEventListener('click', function(){
      closeNav();
    });
  }

  if (document.querySelector(selectors.closeContinue) != 'undefined' && document.querySelector(selectors.closeContinue) != null) {
    document.querySelector(selectors.closeContinue).addEventListener('click', function(){
      closeNav();
    });
  }

    if (document.querySelector(selectors.closeContinueDesktop) != 'undefined' && document.querySelector(selectors.closeContinueDesktop) != null) {
    document.querySelector(selectors.closeContinueDesktop).addEventListener('click', function(){
      closeNav();
    });
  }

  function openNav() {
    if(document.getElementById("supplementSideDrawer")) document.getElementById("supplementSideDrawer").style.right = "0";
    document.querySelector('.page-blury-overlay').classList.add('is-visible');
    document.querySelector('body').classList.add('lock-scroll');
    document.querySelector('header-container').style.zIndex = 10;

    if(document.querySelector('.supplement-side-drawer .drawer__header')) document.querySelector('.supplement-side-drawer .drawer__header').classList.add('mobile-fixed-header');
  }
  
  function closeNav() {
    if(document.getElementById("supplementSideDrawer"))  document.getElementById("supplementSideDrawer").style.right = "-100%";
    document.querySelector('.page-blury-overlay').classList.remove('is-visible');
    document.querySelector('body').classList.remove('lock-scroll');
    document.querySelector('header-container').style.zIndex = 3;
    
    if(document.querySelector('.supplement-side-drawer .drawer__header')) document.querySelector('.supplement-side-drawer .drawer__header').classList.remove('mobile-fixed-header');
  }

setTimeout(function(){
 $(".okeReviews-starRating--small .okeReviews-a11yText").html(function(){
    var text= $(this).text().trim().split(" ");
    var first = text.shift();
    return (text.length > 0 ? "<span class='rated-text'>"+ first + "</span> " : first) + text.join(" ");
  });
},100)
  
})();

$('.Open_Drawer').click(function(){
  $(this).parent('.pee-club-product-info').siblings('.Supplement_Side_Drawer').css('right','0');
  $('.page-overlay').addClass('is-visible');
  $('body').addClass('lock-scroll');
  $('.Supplement_Side_Drawer .drawer_header').addClass('mobile-fixed-header');
});

$('.page-overlay').click(function(){
  $('.Supplement_Side_Drawer').css('right','-100%');
  $('.page-overlay').removeClass('is-visible');
  $('.js-product-quick-view-drawer').removeClass('active');
  $('body').removeClass('lock-scroll open-bundle-info');
  $('.Supplement_Side_Drawer .drawer_header').removeClass('mobile-fixed-header');
});

$('.Supplement_Side_Drawer .js-close-supplement-drawer').click(function(){
  $('.Supplement_Side_Drawer').css('right','-100%');
  $('.page-overlay').removeClass('is-visible');
  $('body').removeClass('lock-scroll');
  $('.Supplement_Side_Drawer .drawer_header').removeClass('mobile-fixed-header');
});

$(window).on("orientationchange, resize", function(event) {
  $('.related-blog-wrapper .article-card__title').matchHeight();
});

/* okendo review replce string on PDP */

var ratingCount = document.querySelector('.okeReviews-starRating.okeReviews-starRating--small .okeReviews-a11yText');
if(ratingCount){
  document.querySelector('.okeReviews-starRating.okeReviews-starRating--small .okeReviews-a11yText').innerText = ratingCount.innerText.replace('out of', '/'); 
}

let myInterval = setInterval(timer, 1000);
function timer() {
  if(document.querySelector('.product__info-container .okeReviews-reviewsSummary.js-okeReviews-reviewsSummary .okeReviews-reviewsSummary-ratingCount span')){
    let ratingText = document.querySelector('.product__info-container .okeReviews-reviewsSummary.js-okeReviews-reviewsSummary .okeReviews-reviewsSummary-ratingCount span').innerText
    document.querySelector('.product__info-container .okeReviews-reviewsSummary.js-okeReviews-reviewsSummary .okeReviews-reviewsSummary-ratingCount span').innerText = `out of ${ratingText}`;
     clearInterval(myInterval);
  }
}
/* end okendo review replce string on PDP */
document.querySelector('.page-blury-overlay').onclick = function() {
  if(document.querySelector('.mobile-toggle-btn--wrapper')) document.querySelector('.mobile-toggle-btn--wrapper').click();
  document.body.classList.remove('overflow-hidden');
}