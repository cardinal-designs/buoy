document.addEventListener('DOMContentLoaded', ()=>{

  document.querySelectorAll('[js-expand__layout]').forEach((elm)=>{
    elm.addEventListener('click',(target)=>{
      target.preventDefault();
      let source = target.currentTarget.getAttribute('href');
       fetch(`/pages/${source}?section_id=popup-initiate`)
      .then( response => { return response.text(); })
      .then( data =>{  
        document.querySelector('.Html__HighlightedWylyt').innerHTML = data;
        document.querySelector('.LearnMoreLayout__container').classList.add('is-visible-popup');
        document.body.classList.add('learn__more_masked');
        document.documentElement.style.setProperty('--clinical-trial-padding-top', '0px');
        document.documentElement.style.setProperty('--clinical-trial-top', '84px');         
      })  
      .catch( error => { console.log('error'); })
      .finally( () =>{
         document.querySelector('#shopify-section-popup-initiate .Closed__drawer_learnMore').addEventListener('click',(target)=>{
            target.preventDefault();
            document.querySelector('.LearnMoreLayout__container').classList.remove('is-visible-popup');document.body.classList.remove('learn__more_masked');
            document.querySelector('.Html__HighlightedWylyt').innerHTML = '';
            document.documentElement.style.setProperty('--clinical-trial-padding-top', '');
            document.documentElement.style.setProperty('--clinical-trial-top', '');           
          })  

        var swiperImages = new Swiper(document.querySelector('#shopify-section-popup-initiate .learn__more_images_bk'), {
          slidesPerView: 1.1,
          spaceBetween: 10,
          allowTouchMove: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            768: {
              slidesPerView: 2.1,
            },
            1024: {
              slidesPerView: 2.1,
            },
          }
        })

        var ingredientSwiper = new Swiper(document.querySelector('#shopify-section-popup-initiate .wp_inredients__conatiner'), {
            allowTouchMove: true,
            breakpoints: {
              320: {
                slidesPerView: 1.2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 2.32,
                spaceBetween: 12
              },
            }          
        })

        document.querySelectorAll('.image-with-dropdowns__q').forEach((elm)=>{
          elm.addEventListener('click', (target)=>{
            target.preventDefault();
            target.target.closest('.image-with-dropdowns__content-point').classList.toggle('active');
          })
        })

        var reviewsSlider = new Swiper(document.querySelector('#shopify-section-popup-initiate .swiper-container_ts_cv'), {
          spaceBetween: 12,
          allowTouchMove: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            0: {
              slidesPerView: 1.9,
            },
            768: {
              slidesPerView: 3.3,
            }
          }
        })     

        document.querySelectorAll('.btnTextDrWER a').forEach((elm)=>{
          elm.addEventListener('click',(target)=>{
            target.preventDefault();
            let textbutton = target.currentTarget.textContent;
            textbutton = textbutton.trim().toLowerCase();
            if( textbutton == 'supplement facts' ){

              if( target.target.closest('.append_htmlbody').classList.contains('kit_product')){
                let supllymnt = target.target.closest('.innerDivMORE').querySelector('.product-listblock__container_cv').children[0].querySelector('.pro_list_title').textContent;
                // document.querySelector('.LearnMoreLayout__container').classList.remove('is-visible-popup');document.body.classList.remove('learn__more_masked');
                // document.querySelector('.Html__HighlightedWylyt').innerHTML = '';
                let Selector$SupplymentUnq = document.querySelector(`[data-product-name="${supllymnt}"]`)
                document.documentElement.style.setProperty('--clinical-trial-padding-top', '0px');
                document.documentElement.style.setProperty('--clinical-trial-top', '84px');              
                if (window.innerWidth <= 768) {
                  Selector$SupplymentUnq.style.bottom = '0px';
                } else {
                  Selector$SupplymentUnq.style.right = '0px';
                }          
                document.querySelector('.drawer__header').classList.add('mobile-fixed-header');
                document.body.classList.add('wp_popup_drawer');
                document.querySelector('.page-blury-overlay').classList.add('is-visibles');                
              }else{
                let supllymnt = target.target.closest('.product-name').querySelector('h2').textContent;
                // document.querySelector('.LearnMoreLayout__container').classList.remove('is-visible-popup');document.body.classList.remove('learn__more_masked');
                // document.querySelector('.Html__HighlightedWylyt').innerHTML = '';
                let Selector$SupplymentUnq = document.querySelector(`[data-product-name="${supllymnt}"]`)
                document.documentElement.style.setProperty('--clinical-trial-padding-top', '0px');
                document.documentElement.style.setProperty('--clinical-trial-top', '84px');              
                if (window.innerWidth <= 768) {
                  Selector$SupplymentUnq.style.bottom = '0px';
                } else {
                  Selector$SupplymentUnq.style.right = '0px';
                }          
                document.querySelector('.drawer__header').classList.add('mobile-fixed-header');
                document.body.classList.add('wp_popup_drawer');
                document.querySelector('.page-blury-overlay').classList.add('is-visibles');
              }

              
            }else if( textbutton == 'view clinical study' ){
              // document.querySelector('.LearnMoreLayout__container').classList.remove('is-visible-popup');document.body.classList.remove('learn__more_masked');
              // document.querySelector('.Html__HighlightedWylyt').innerHTML = '';
              const clinicalDrawerXt = document.getElementById('clinicalSideDrawer');
              document.documentElement.style.setProperty('--clinical-trial-padding-top', '0px');
              document.documentElement.style.setProperty('--clinical-trial-top', '84px');              
              if (window.innerWidth <= 768) {
                clinicalDrawerXt.style.bottom = '0px';
              } else {
                clinicalDrawerXt.style.right = '0px';
              }          
              document.querySelector('.drawer__header').classList.add('mobile-fixed-header');
              document.body.classList.add('wp_popup_drawer');
              document.querySelector('.page-blury-overlay').classList.add('is-visibles');            
            }
          })
        })

        document.querySelector('.Continuebtn').addEventListener('click', (target)=>{
          target.preventDefault();
          document.querySelector('.LearnMoreLayout__container').classList.remove('is-visible-popup');document.body.classList.remove('learn__more_masked');
          document.querySelector('.Html__HighlightedWylyt').innerHTML = '';          
        })

        document.querySelectorAll('.pro_list_popup_title').forEach((elm)=>{
          elm.addEventListener('click', (target)=>{
            target.preventDefault();
            let DrawerSupplyment = target.target.closest('.content').querySelector('.pro_list_title').textContent;
            DrawerSupplyment = DrawerSupplyment.trim();
            let Selector$Supplyment = document.querySelector(`[data-product-name="${DrawerSupplyment}"]#supplementSideDrawer`)
            if ( Selector$Supplyment ){
              document.querySelector('.LearnMoreLayout__container').classList.remove('is-visible-popup');document.body.classList.remove('learn__more_masked');
              document.querySelector('.Html__HighlightedWylyt').innerHTML = '';              
              document.documentElement.style.setProperty('--clinical-trial-padding-top', '0px');
              document.documentElement.style.setProperty('--clinical-trial-top', '84px');              
              if (window.innerWidth <= 768) {
                Selector$Supplyment.style.bottom = '0px';
              } else {
                Selector$Supplyment.style.right = '0px';
              }          
              document.querySelector('.drawer__header').classList.add('mobile-fixed-header');
              document.body.classList.add('wp_popup_drawer');
              document.querySelector('.page-blury-overlay').classList.add('is-visibles');               
            }
          })
        })

        document.querySelectorAll('.js-close-supplement-drawer').forEach((target)=>{
            target.addEventListener('click', function (elm) {
            const supplementSideDrawerXtRmv = elm.target.closest('.supplement-side-drawer');
            supplementSideDrawerXtRmv.style.bottom = '';
            supplementSideDrawerXtRmv.style.right = '-100%';  // Removed the semicolon here
            document.querySelector('.drawer__header').classList.remove('mobile-fixed-header');
            document.body.classList.remove('wp_popup_drawer');
            document.querySelector('.page-blury-overlay').classList.remove('is-visibles');
            document.documentElement.style.setProperty('--clinical-trial-padding-top', '');
            document.documentElement.style.setProperty('--clinical-trial-top', '');
          })     
        })

        document.querySelectorAll('.perchasebtn').forEach((elm)=>{
          elm.addEventListener('click',(target)=>{
            target.preventDefault();
            document.querySelector('.LearnMoreLayout__container').classList.remove('is-visible-popup');document.body.classList.remove('learn__more_masked');
            document.querySelector('.Html__HighlightedWylyt').innerHTML = ''; 
            let Target$QuickAdd = target.target.closest('.product-name').querySelector('h2').textContent;
            Target$QuickAdd = Target$QuickAdd.trim().toLowerCase();
            if ( target.target.closest('.append_htmlbody').classList.contains('kit_product') ){
              if( document.querySelector('.outerDivSlider').querySelector(`[data-product-map-add="${Target$QuickAdd}"]`).closest('.quick-add__container').getAttribute('data-open') == true){
              }else{
                document.querySelector('.outerDivSlider').querySelector(`[data-product-map-add="${Target$QuickAdd}"]`).click();
              }
            }else{
              if( document.querySelector('.Collection__Gridwrap_single').querySelector(`[data-product-map-add="${Target$QuickAdd}"]`).closest('.quick-add__container').getAttribute('data-open') == true){
              }else{              
                document.querySelector('.Collection__Gridwrap_single').querySelector(`[data-product-map-add="${Target$QuickAdd}"]`).click();
              }
            }
            
          })
        })
        
      })
    })
  })
  
  document.querySelector('.cv_btnscroll .scroll-to-product').addEventListener('click', (target)=>{
    target.preventDefault();
    var targetElement = document.querySelector('.outerFeatureddiv');
    window.scrollTo({
      top: targetElement.offsetTop - document.querySelector('#shopify-section-header').clientHeight,
      behavior: 'smooth'
    });
  });

  document.querySelector('.page-blury-overlay').addEventListener('click', (elm)=>{
    document.body.classList.remove('learn__more_masked','wp_popup_drawer');
    document.querySelector('.LearnMoreLayout__container').classList.remove('is-visible-popup');
    elm.currentTarget.classList.remove('is-visibles');
    document.querySelector('.drawer__header').classList.remove('mobile-fixed-header');
    document.documentElement.style.setProperty('--clinical-trial-padding-top', '');
    document.documentElement.style.setProperty('--clinical-trial-top', ''); 
    document.querySelectorAll('.popup-drawer[data-product-name]').forEach((elm)=>{elm.style.right = '-100%'; elm.style.bottom = '';})
    document.querySelectorAll('.popup-drawer').forEach((elm)=>{elm.style.right = '-100%'; elm.style.bottom = '';})
  })

  document.querySelectorAll('.outerDivSlider .quick-add__button').forEach((elm)=>{
    elm.addEventListener('click', (target)=>{
      target.preventDefault();
      document.body.classList.add('active_slider_quick');
      var ua = navigator?.userAgent?.toLowerCase(); 
      ua.indexOf('safari') != -1 ? ( ua.indexOf('chrome') > -1 ? '' : document?.body?.classList.add('SafariBrowserObserver') ) : '';      
      target.target.closest('.quick-add__container').classList.add('activated');
    })
  })

  document.querySelectorAll('.outerDivSlider .quick-add__close').forEach((elm)=>{
    elm.addEventListener('click', (target)=>{
      target.preventDefault();
      document.body.classList.remove('active_slider_quick');
      target.target.closest('.quick-add__container').classList.remove('activated');
    })
  })  

  var swiper = new Swiper(".grid__swiper_products", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.22,
        spaceBetween: 18,
      },      
      768: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 18,
      }
    }    
  });

  $(document).on("click",".reviews_button",function() {  
    if (!$(this).hasClass("active")) {
      $(this).next().get(0).play();
      $(this).toggleClass("active");
    } else {
      $(this).next().get(0).pause();
      $(this).toggleClass("active");
    }
  });
});