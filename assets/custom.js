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

  $('.rtx_option_selector input').select(function() {
    console.log('bbbee')
  })

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

// $('.Testimonials_Slider').slick({
//   dots: true,
//   arrows: true,
//   infinite: false,
//   speed: 300,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   prevArrow: '<button type="button" class="slick-prev"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>',
//   nextArrow: '<button type="button" class="slick-next"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6" transform="rotate(-90)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></svg></button>'
// });

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
  // Close all accordions
  $('.dropdown-ind__drop p, .dropdown-ind__drop img').hide();
  $('.dropdown-ind__drop .close').removeClass('flip');

  // Open the clicked accordion
  $(this).parent().find('p, img').toggle();
  $(this).parent().find('.close').toggleClass('flip');
});

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
  /* Open Clinical Drawer */
  let selectors = {
      openDrawer: '.js-open-supplement-drawer',
      openDrawerSection: '.supplement-section-link',
      closeDrawer: '.js-close-supplement-drawer',
      openIngredients: '.js-ingredients-open',
      openClinical: '.js-clinical-open',
      closeClinical: '.js-clinical-close',
      openHsa: '.js-hsa-open',
      closeHsa: '.js-hsa-close',
      openTest: 'js-open',
      closeContinue: '.drawer__mobile-continue',
      closeContinueDesktop: '.drawer__desktop-continue',
      pageOverlay: '.page-blury-overlay'
  }

  var element =  document.getElementsByClassName('js-open-supplement-drawer');

  if (document.querySelector(selectors.openHsa)) {
    document.querySelectorAll(selectors.openHsa).forEach((item) => {
      item.addEventListener('click', function(){
        openHsa();
      }); 
    });
  }

  if (document.querySelector(selectors.closeHsa)) {
    document.querySelectorAll(selectors.closeHsa).forEach((item) => {
      item.addEventListener('click', function(){
        closeHsa();
      }); 
    });
  }

  if (document.querySelector(selectors.openClinical)) {
    document.querySelectorAll(selectors.openClinical).forEach((item) => {
      item.addEventListener('click', function(e){
        openClinical(e);
      }); 
    });
  }

  if (document.querySelector(selectors.closeClinical)) {
    document.querySelectorAll(selectors.closeClinical).forEach((item) => {
      item.addEventListener('click', function(){
        closeClinical();
      }); 
    });
  }

  if (document.querySelector(selectors.openIngredients)) {
    document.querySelectorAll(selectors.openIngredients).forEach((item) => {
      item.addEventListener('click', function(e){
        openNav(e);
      }); 
    });
  }

  if (document.querySelector(selectors.openTest) != 'undefined' && document.querySelector(selectors.openTest) != null) {
    document.querySelector(selectors.openTest).addEventListener('click', function(){
      openNav();
    }); 
  }

  if (document.querySelector(selectors.openDrawerSection)) {
    document.querySelectorAll(selectors.openDrawerSection).forEach((item) => {
      item.addEventListener('click', function(e){
        openNav(e);
      }); 
    })
  }

  if (document.querySelector(selectors.openDrawer)) {
    document.querySelectorAll(selectors.openDrawer).forEach((item) => {
      item.addEventListener('click', function(e){
        openNav(e);
      }); 
    })
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

  // Open HSA Drawer
  function openHsa() {
    event.stopPropagation();
    if (document.getElementById("hsaSideDrawer")) {
      document.getElementById("hsaSideDrawer").style.right = "0";
      document.getElementById("hsaSideDrawer").scrollTop = 0;
    }
    document.querySelector('.page-blury-overlay').classList.add('is-visible');
    document.querySelector('body').classList.add('lock-scroll');
    document.querySelector('header-container').style.zIndex = 10;
    document.querySelector('.hsa-side-drawer .drawer__header').classList.add('mobile-fixed-header');
  }

   // Close HSA Drawer
  function closeHsa() {
    if (document.getElementById("hsaSideDrawer")) {
      document.getElementById("hsaSideDrawer").style.right = "-100%";
    }
    document.querySelector('.page-blury-overlay').classList.remove('is-visible');
    document.querySelector('body').classList.remove('lock-scroll');
    document.querySelector('header-container').style.zIndex = 3;
    document.querySelector('.hsa-side-drawer .drawer__header').classList.remove('mobile-fixed-header');
  }

  // Open Clinical Drawer
  function openClinical(e) {
    event.stopPropagation();
    const parentItem = !!e.target.closest('.dropdown-container-item__container');
    if (parentItem) {
      const parentEl = e.target.closest('.dropdown-container-item');
      const dataTitle = parentEl.querySelector('.dropdown-container-item__title').dataset.title;
      if (!dataTitle) return;
      const clinicalDrawers = document.querySelectorAll('.clinical-trial-drawer');
      clinicalDrawers.forEach((drawer) => {
        const drawerName = drawer.dataset.productName;
        if (dataTitle === drawerName) {
          showDrawer(drawer);
        }
      });
    } else {
      // For single drawer on PDP
      const clinicalDrawer = document.getElementById("clinicalSideDrawer");
      showDrawer(clinicalDrawer);
    }

    // Show drawer
    function showDrawer(drawer) {
      drawer.scrollTop = 0;
      drawer.style.right = "0";
      document.querySelector('.page-blury-overlay').classList.add('is-visible');
      document.querySelector('body').classList.add('lock-scroll');
      document.querySelector('main').classList.add('main__overlay');
      document.querySelector('header-container').style.zIndex = 10;
      document.querySelector('.clinical-trial-drawer .drawer__header').classList.add('mobile-fixed-header');
    }
  }

  // Close Clinical Drawer
  function closeClinical() {
    if (document.getElementById("clinicalSideDrawer")) {
      document.getElementById("clinicalSideDrawer").style.right = "-100%";
    }
    document.querySelector('.page-blury-overlay').classList.remove('is-visible');
    document.querySelector('body').classList.remove('lock-scroll');
    document.querySelector('main').classList.remove('main__overlay');
    document.querySelector('header-container').style.zIndex = 3;
    document.querySelector('.clinical-trial-drawer .drawer__header').classList.remove('mobile-fixed-header');
  }

  // Open Supplement Drawer
  function openNav(e) {
    event.stopPropagation();
    const parentItemContainer = e.target.closest('.dropdown-container-item__container');
    const parentDropdown = e.target.closest('.image-with-dropdowns__dropdown');
    const supplementDrawer = document.getElementById("supplementSideDrawer");
    const supplementDrawers = document.querySelectorAll('.supplement-side-drawer');
    
    if (parentItemContainer) {
      // For dropdown-container-item__container section
      const parentEl = e.target.closest('.dropdown-container-item');
      const dataTitle = parentEl.querySelector('.dropdown-container-item__title').dataset.title;
      if (!dataTitle) return;
      supplementDrawers.forEach((drawer) => {
        const drawerName = drawer.dataset.productName;
        if (dataTitle === drawerName) {
          showDrawer(drawer);
        }
      });
      // For image with dropdowns section
    } else if (parentDropdown) {
      const allTitles = parentDropdown.querySelectorAll('.image-with-dropdowns__q');
      allTitles.forEach((title) => {
        if (title.classList.contains('active')) {
          const dataTitle = title.querySelector('.image-with-dropdowns__content-text').dataset.title;
          supplementDrawers.forEach((drawer) => {
            const drawerName = drawer.dataset.productName;
            if (dataTitle === drawerName) {
              showDrawer(drawer);
            } else {
              // For bundle PDP
              if(location.href.includes("/products/")){
                if(document.querySelector(`.supplement-side-drawer[data-product-name="${ document.querySelector(".product__title").innerText.trim() }"]`)){
                  showDrawer(document.querySelector(`.supplement-side-drawer[data-product-name="${ document.querySelector(".product__title").innerText.trim() }"]`));
                }
                else{
                  showDrawer(supplementDrawer);
                }
              }
              else{
                showDrawer(supplementDrawer);
              }
            }
          });
        }
      })
    } else {
      // For PDP (not bundle)
      if(location.href.includes("/products/")){
        if(document.querySelector(`.supplement-side-drawer[data-product-name="${ document.querySelector(".product__title").innerText.trim() }"]`)){
          showDrawer(document.querySelector(`.supplement-side-drawer[data-product-name="${ document.querySelector(".product__title").innerText.trim() }"]`));
        }
        else{
          showDrawer(supplementDrawer);
        }
      }
      else{
        showDrawer(supplementDrawer);
      }
    }

    // Show drawer
    function showDrawer(drawer) {
      drawer.scrollTop = 0;
      drawer.style.right = "0";
      document.querySelector('.page-blury-overlay').classList.add('is-visible');
      document.querySelector('body').classList.add('lock-scroll');
      document.querySelector('main').classList.add('main__overlay');
      document.querySelector('header-container').style.zIndex = 10;

      if (document.querySelector('.supplement-side-drawer .drawer__header')) {
        document.querySelector('.supplement-side-drawer .drawer__header').classList.add('mobile-fixed-header');
      }
    }
  }
  
  // Close Supplement Drawer
  // function closeNav() {
  //   if(document.getElementById("supplementSideDrawer"))  document.getElementById("supplementSideDrawer").style.right = "-100%";
  //   document.querySelector('.page-blury-overlay').classList.remove('is-visible');
  //   document.querySelector('body').classList.remove('lock-scroll');
  //   document.querySelector('header-container').style.zIndex = 3;
    
  //   if(document.querySelector('.supplement-side-drawer .drawer__header')) document.querySelector('.supplement-side-drawer .drawer__header').classList.remove('mobile-fixed-header');
  // }

  function closeNav() {
    const supplementDrawer = document.getElementById("supplementSideDrawer");
    if(supplementDrawer) {
      supplementDrawer.style.right = "-100%";
      document.querySelector('.page-blury-overlay').classList.remove('is-visible');
      document.querySelector('body').classList.remove('lock-scroll');
      document.querySelector('main').classList.remove('main__overlay');
      document.querySelector('header-container').style.zIndex = "3";

      if(document.querySelector('.supplement-side-drawer .drawer__header')) {
        document.querySelector('.supplement-side-drawer .drawer__header').classList.remove('mobile-fixed-header');
      }
    }
  }

  // Add event listener to close drawer when clicking outside
  if(!window.location.href?.includes('pages')){
    document.addEventListener('click', function(event) {
      const supplementDrawer = document.getElementById("supplementSideDrawer");
      const isClickInsideDrawer = supplementDrawer && supplementDrawer.contains(event.target);
      const isDrawerVisible = supplementDrawer && supplementDrawer.style.right === "0px";
      if (isDrawerVisible && !isClickInsideDrawer) {
        closeNav();
        document.querySelector('main').classList.remove('main__overlay');
      }
  
      const clinicalSideDrawer = document.getElementById("clinicalSideDrawer");
      const isClickInsideClinicalDrawer = clinicalSideDrawer && clinicalSideDrawer.contains(event.target);
      const isDrawerClinicalVisible = clinicalSideDrawer && clinicalSideDrawer.style.right === "0px";
      if (isDrawerClinicalVisible && !isClickInsideClinicalDrawer) {
        closeClinical();
      }
    });
  }

setTimeout(function(){
 $(".okeReviews-starRating--small .okeReviews-a11yText").html(function(){
    var text= $(this).text().trim().split(" ");
    var first = text.shift();
    return (text.length > 0 ? "<span class='rated-text'>"+ first + "</span> " : first) + text.join(" ");
  });
},100)
  
})();

$('.Open_Drawer').click(function(event){
  let peeClubProduct = $(event.target).parent().parent();
  let productTitle = peeClubProduct.find('.pee-club-product-title').text();
  let dataProductName = $('.supplement-side-drawer');
  if ($(dataProductName).length === 0) return;

  dataProductName.each(function() {
    let itemName = $(this).data('productName');
    if (itemName == productTitle) {
      $(this).css('right', '0');
      $('.page-blury-overlay').addClass('is-visible');
      $('body').addClass('lock-scroll');
      $('.supplement-side-drawer .drawer__header').addClass('mobile-fixed-header');
    }
  });
});

// close supplement drawer (click outside)
$('.page-blury-overlay').click(function(){
console.log("clickedddd");
  $('.supplement-side-drawer').css('right','-100%');
  $('.page-blury-overlay').removeClass('is-visible');
  $('.js-product-quick-view-drawer').removeClass('active');
  $('body').removeClass('lock-scroll open-bundle-info');
  $('.supplement-side-drawer .drawer__header').removeClass('mobile-fixed-header');
});

// close clinical drawer (click outside)
$('.page-blury-overlay').click(function(){
  $('.clinical-trial-drawer').css('right','-100%');
  $('.page-blury-overlay').removeClass('is-visible');
  $('.js-product-quick-view-drawer').removeClass('active');
  $('body').removeClass('lock-scroll open-bundle-info');
  $('.clinical-trial-drawer .drawer__header').removeClass('mobile-fixed-header');
});

// close hsa drawer (click outside)
$('.page-blury-overlay').click(function(){
  $('.hsa-side-drawer').css('right','-100%');
  $('.page-blury-overlay').removeClass('is-visible');
  $('.js-product-quick-view-drawer').removeClass('active');
  $('body').removeClass('lock-scroll open-bundle-info');
  $('.hsa-side-drawer .drawer__header').removeClass('mobile-fixed-header');
});

$('.js-close-supplement-drawer').click(function(){
  $('.supplement-side-drawer').css('right','-100%');
  $('.page-blury-overlay').removeClass('is-visible');
  $('body').removeClass('lock-scroll');
  $('.supplement-side-drawer .drawer__header').removeClass('mobile-fixed-header');
});

$('.js-clinical-close').click(function(){
  $('.clinical-trial-drawer').css('right','-100%');
  $('.page-blury-overlay').removeClass('is-visible');
  $('body').removeClass('lock-scroll');
  $('.clinical-trial-drawer .drawer__header').removeClass('mobile-fixed-header');
});

$('.js-hsa-close').click(function(){
  $('.clinical-trial-drawer').css('right','-100%');
  $('.page-blury-overlay').removeClass('is-visible');
  $('body').removeClass('lock-scroll');
  $('.hsa-side-drawer .drawer__header').removeClass('mobile-fixed-header');
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

$('.text-image-toggle__button').click(function() {
  let id = $(this).data('id')
  $('.text-image-toggle__button').removeClass('active')
  $(this).addClass('active')
  $('.text-image-toggle__image').hide()
  $(`.text-image-toggle__image[data-id='${id}']`).show()
})

$('.dropdown-container-item__title').click(function() {
  var isActive = $(this).hasClass('active');
  // Remove 'active' class from all titles
  $('.dropdown-container-item__title').removeClass('active');
  // Close all dropdowns
  $('.dropdown-container-item__body').slideUp();
  // If the clicked item was not active, make it active and slide down its content
  if (!isActive) {
    $(this).addClass('active');
    $(this).next().slideToggle();
  }
});


// Add Class on body tag
var clickableElement = document.querySelector('.js-mainproduct-submit');
if(clickableElement){
clickableElement.addEventListener('click', function() {
  var bodyElement = document.body;
  bodyElement.classList.add('open-cart-drawer');
});
}

function cartHtml(){
  fetch(window.Shopify.routes.root +'?section_id=cart-drawer')
  .then((response) => response.text())
  .then((responseText) => {
    const cartid = 'cart-drawer';
    const html = new DOMParser().parseFromString(responseText, 'text/html')  
    const destination = document.querySelector('.cart-drawer');
    const source = html.getElementById(cartid);			  
    if (source && destination) destination.innerHTML = source.innerHTML;
    subscriptionListener();
    $(document).find('#cart-drawer-loading').addClass('hidden');
  });

  fetch(window.Shopify.routes.root +'?section_id=main-cart-items')
  .then((response) => response.text())
  .then((responseText) => {			  
    const cartid = 'main-cart-items';
    const html = new DOMParser().parseFromString(responseText, 'text/html');
    const destination = document.querySelector('.main-cart-items');
    const source = html.getElementById(cartid);			  
    if (source && destination) destination.innerHTML = source.innerHTML;
    subscriptionListener();
  });
}

function subscriptionUpgrade(line, qty, selling_plan_id) {
  let updates = {
    id : line,
    quantity: qty,
    selling_plan: selling_plan_id
  };
  if(line && qty && selling_plan_id){
    $(document).find('#cart-drawer-loading').removeClass('hidden');
    fetch(window.Shopify.routes.root + 'cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('response', response)
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      cartHtml();
    });
  }
}
function subscriptionListener () {
  $(document).on('click', '.cart-drawer__item-add-subscription', function (e) {
    e.preventDefault();
    let subscriptionId = Number($(this).attr('data-subscription-id'));
    let datakey = $(this).attr('data-key');
    let dataQty = Number($(this).attr('data-qty'));
    if(subscriptionId && datakey && dataQty){
      subscriptionUpgrade(datakey, dataQty, subscriptionId)
    }
  })
}
//cart drawer js
$( document ).ready(function() {
  subscriptionListener();

  $(document).on('click', function(event) {
      if ($(event.target).closest('.drawer__wrapper-main').length === 0) {
          var $supplementDrawer = $('.supplement-side-drawer');
          $supplementDrawer.each(function() {
              var isClickInsideDrawer = $(this).has(event.target).length > 0;
              var isDrawerVisible = $(this).css('right') == "0px";
               if (isDrawerVisible && !isClickInsideDrawer) {
                  $supplementDrawer.css('right', '-100%');
              }
          });
      }
  });


  let orderDate =  document.querySelector('.Order_Within .autoDay');
  if(!!orderDate){
    let shippingday;
    const dayNum = new Date().getUTCDay();
    dayNum === 5 || dayNum === 6 ? shippingday = 'In stock and ships Monday' : shippingday = 'In stock and ships tomorrow';
    orderDate.innerHTML = shippingday;
  }
});




document.addEventListener("DOMContentLoaded", function () {
  var tabs = document.querySelectorAll(".new__account ul.tabs li");

  tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
          var tab_id = tab.getAttribute("data-tab");

          // Remove 'current' class from all tabs and tab content
          tabs.forEach(function (t) {
              t.classList.remove("current");
          });

          var tabContents = document.querySelectorAll(".new__account .tab-content");
          tabContents.forEach(function (content) {
              content.classList.remove("current");
          });

          // Add 'current' class to the clicked tab and corresponding tab content
          tab.classList.add("current");
          document.getElementById(tab_id).classList.add("current");
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    var formCloses = document.querySelectorAll('.new__account--addresses-form-close');
    var resetButtons = document.querySelectorAll('.address__btn--close');

    if (formCloses.length !== resetButtons.length) {
        console.error('The number of form close buttons does not match the number of reset buttons.');
        return;
    }

    formCloses.forEach((formClose, index) => {
        var resetButton = resetButtons[index];
        formClose.addEventListener('click', function() {
            resetButton.click();
        });
    });
});
