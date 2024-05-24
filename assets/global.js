function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  ); 
}

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();
}

function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach((video) => {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach((video) => video.pause());
  document.querySelectorAll('product-model').forEach((model) => model.modelViewerUI?.pause());
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}

customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

const serializeForm = form => {
  const obj = {};
  const formData = new FormData(form);
  let properties = {};
  for (const key of formData.keys()) {
    (key.includes('properties')) ? properties[key.replace('properties[','').replace(']','')] =  formData.get(key) : obj[key] = formData.get(key);
  }
  if(Object.keys(properties).length != 0) obj.properties = properties;
  return JSON.stringify(obj);
};

function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}`,'X-Requested-With': 'XMLHttpRequest' }
  };
}

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
  return function() {
    return fn.apply(scope, arguments);
  }
};

Shopify.setSelectorByValue = function(selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function(target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.postLink = function(path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function(country_domid, province_domid, options) {
  this.countryEl         = document.getElementById(country_domid);
  this.provinceEl        = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler,this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function(e) {
    var opt       = this.countryEl.options[this.countryEl.selectedIndex];
    var raw       = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');
    const summaryElements = this.querySelectorAll('summary');
    this.addAccessibilityAttributes(summaryElements);

    if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
    this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
  }

  addAccessibilityAttributes(summaryElements) {
    summaryElements.forEach(element => {
      element.setAttribute('role', 'button');
      element.setAttribute('aria-expanded', false);
      element.setAttribute('aria-controls', element.nextElementSibling.id);
    });
  }

  onKeyUp(event) {
    if(event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if(!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const isOpen = detailsElement.hasAttribute('open');

    if (detailsElement === this.mainDetailsToggle) {
      if(isOpen) event.preventDefault();
      isOpen ? this.closeMenuDrawer(summaryElement) : this.openMenuDrawer(summaryElement);
    } else {
      trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));

      setTimeout(() => {
        detailsElement.classList.add('menu-opening');
      });
    }
  }

  openMenuDrawer(summaryElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event !== undefined) {
      this.mainDetailsToggle.classList.remove('menu-opening');
      this.mainDetailsToggle.querySelectorAll('details').forEach(details =>  {
        details.removeAttribute('open');
        details.classList.remove('menu-opening');
      });
      this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
      document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
      removeTrapFocus(elementToFocus);
      this.closeAnimation(this.mainDetailsToggle);
    }
  }

  onFocusOut(event) {
    setTimeout(() => {
      if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest('details');
    this.closeSubmenu(detailsElement);
  }

  closeSubmenu(detailsElement) {
    detailsElement.classList.remove('menu-opening');
    removeTrapFocus();
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
        }
      }
    }

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define('menu-drawer', MenuDrawer);

class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement) {
    this.header = this.header || document.getElementById('shopify-section-header');
    this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    document.documentElement.style.setProperty('--header-bottom-position', parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset) + 'px');

    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });

    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }
}

customElements.define('header-drawer', HeaderDrawer);

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]').addEventListener(
      'click',
      this.hide.bind(this)
    );
    this.addEventListener('click', (event) => {
      if (event.target.nodeName === 'MODAL-DIALOG') this.hide();
    });
    this.addEventListener('keyup', () => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });
  }

  show(opener) {
    this.openedBy = opener;
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    this.querySelector('.template-popup')?.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);

class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');
    button?.addEventListener('click', () => {
      document.querySelector(this.getAttribute('data-modal'))?.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);

class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="Deferred-Poster-"]')?.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent() {
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      window.pauseAllMedia();
      this.appendChild(content.querySelector('video, model-viewer, iframe')).focus();
    }
  }
}

customElements.define('deferred-media', DeferredMedia);

class SliderComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('ul');
    this.sliderItems = this.querySelectorAll('li');
    this.pageCount = this.querySelector('.slider-counter--current');
    this.pageTotal = this.querySelector('.slider-counter--total');
    this.prevButton = this.querySelector('button[name="previous"]');
    this.nextButton = this.querySelector('button[name="next"]');

    if (!this.slider || !this.nextButton) return;

    const resizeObserver = new ResizeObserver(entries => this.initPages());
    resizeObserver.observe(this.slider);

    this.slider.addEventListener('scroll', this.update.bind(this));
    this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
    this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
  }

  initPages() {
    const sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
    this.sliderLastItem = sliderItemsToShow[sliderItemsToShow.length - 1];
    if (sliderItemsToShow.length === 0) return;
    this.slidesPerPage = Math.floor(this.slider.clientWidth / sliderItemsToShow[0].clientWidth);
    this.totalPages = sliderItemsToShow.length - this.slidesPerPage + 1;
    this.update();
  }

  update() {
    if (!this.pageCount || !this.pageTotal) return;
    this.currentPage = Math.round(this.slider.scrollLeft / this.sliderLastItem.clientWidth) + 1;

    if (this.currentPage === 1) {
      this.prevButton.setAttribute('disabled', true);
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.currentPage === this.totalPages) {
      this.nextButton.setAttribute('disabled', true);
    } else {
      this.nextButton.removeAttribute('disabled');
    }

    this.pageCount.textContent = this.currentPage;
    this.pageTotal.textContent = this.totalPages;
  }

  onButtonClick(event) {
    event.preventDefault();
    const slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + this.sliderLastItem.clientWidth : this.slider.scrollLeft - this.sliderLastItem.clientWidth;
    this.slider.scrollTo({
      left: slideScrollPosition
    });
  }
}

customElements.define('slider-component', SliderComponent);

class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(false, '', false, this.currentVariant.price);
    this.updatePickupAvailability();
    this.updateMetafieldText();


    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true, this.currentVariant.price);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
    }

    this.updateSticky();
  }

  updateSticky(){
    this.currentVariant.options.forEach(function (option,index) {
      document.querySelector(`.js-sticky-variants[data-option="option-${index}"]`).value = option;
    });
  }
  
  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMetafieldText(){
    let selectOption = this.querySelector('.js-variant-metafield'),
        currentVar = this.currentVariant,
        hiddenOption = Array.from(selectOption.options).filter(option => {
          return (option.getAttribute('value') == currentVar.id);
        })[0];
    document.querySelectorAll('.js-label-text').forEach(element => {
      element.innerHTML = (element.classList.contains('js-subscription')) ? 
        ((hiddenOption.dataset.subscription_text != "") ? hiddenOption.dataset.subscription_text : element.dataset.cmsText) :
        ((hiddenOption.dataset.otpText != "") ? hiddenOption.dataset.otpText : element.dataset.cmsText) ;
    });
  }
  
  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateMedia() {
    if (!this.currentVariant || !this.currentVariant?.featured_media) return;
    const newMedia = document.querySelector(
      `[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
    );

    if (!newMedia) return;
    const modalContent = document.querySelector('#ProductModal-' + this.dataset.section + ' .product-media-modal__content');
    const parent = newMedia.parentElement;
    if (parent.firstChild == newMedia) return;
    // parent.prepend(newMedia);
    this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
    this.stickyHeader &&  this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
    if(parent.querySelector('li.product__media-item')){
      window.setTimeout(() => { parent.querySelector('li.product__media-item').scrollIntoView({behavior: "smooth"}); });
    }
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant?.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  renderProductInfo() {
    fetch(this.dataset.url + '?variant=' + this.currentVariant.id + '&section_id=' + this.dataset.section)
      .then((response) => response.text())
      .then((responseText) => {
        const id = 'price-' + this.dataset.section;
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById(id);
        const source = html.getElementById(id);

        if (source && destination) destination.innerHTML = source.innerHTML;

        document.querySelector('#current_variant_price').replaceWith(html.querySelector('#current_variant_price'));

        document.getElementById('price-' + this.dataset.section)?.classList.remove('visibility-hidden');
        this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut, this.currentVariant.price);
      });
  }

  toggleAddButton(disable = true, text, modifyClass = true, price) {
    const addButton = document.getElementById('product-form-' + this.dataset.section)?.querySelector('[name="add"]'),
          stickyButton = document.querySelector('.js-sticky-add-to-cart');

    if (!addButton) return;
    let variantJson = JSON.parse(document.querySelector("#js-product-variant-json").innerText);

    let subscriptionOption = document.querySelector('[name="purchaseType"]:checked');
    // let addToCartText = 'Add to Cart' + '— $' + (this.currentVariant.price / 100 );
    let addToCartText = `Add to Cart — ${(this.currentVariant.compare_at_price != null) ? `&nbsp;<s>${variantJson[this.currentVariant.id].compare_price}</s>&nbsp;` : ``}${variantJson[this.currentVariant.id].price}`;
    // let addToCartText = `Add to Cart — ${variantJson[this.currentVariant.id].price}`;
    if(subscriptionOption){
      if(subscriptionOption.value == "purchaseTypeSubscription"){
         addToCartText = `Add to Cart — &nbsp;<s>${variantJson[this.currentVariant.id].price}</s>&nbsp;${variantJson[this.currentVariant.id].subscription_price}`;
        //addToCartText = `Add to Cart — ${variantJson[this.currentVariant.id].subscription_price}`;

      }
    }
 
    document.querySelectorAll('.js-rtx_one_time_price, .js-subscription-price, .js-main-compare-price').forEach(element => {
      element.innerText = (element.classList.contains("js-rtx_one_time_price")) ? variantJson[this.currentVariant.id].price : (element.classList.contains("js-main-compare-price")) ? variantJson[this.currentVariant.id].compare_price : variantJson[this.currentVariant.id].subscription_price;
    });

    

    addButton.dataset.available = (!disable);

    if (disable) {
      addButton.setAttribute('disabled', true);
      if (text) addButton.innerHTML = text;
      
      stickyButton.setAttribute('disabled', true);
      if (text) stickyButton.innerHTML = text;
    } else {
      addButton.removeAttribute('disabled');
      addButton.innerHTML = addToCartText; 
      
      stickyButton.removeAttribute('disabled');
      stickyButton.innerHTML = addToCartText;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const addButton = document.getElementById('product-form-' + this.dataset.section)?.querySelector('[name="add"]');
    if (!addButton) return;
    addButton.textContent = window.variantStrings.unavailable;
    document.getElementById('price-' + this.dataset.section)?.classList.add('visibility-hidden');
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}

customElements.define('variant-radios', VariantRadios);

/* Header On Scroll */
class HeaderContainer extends HTMLElement {
  constructor() {
    super();
    this.onScrollHandler = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScrollHandler, false);

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 45) {
      if (!this.classList.contains('header--scrolled')) {
        this.classList.add('header--scrolled');
      }
    }
  }

  onScroll() {
    if (this.classList.contains('header--transparent')) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 45) {
        if (!this.classList.contains('header--scrolled')) {
          this.classList.add('header--scrolled');
        }
      } else {
        if (this.classList.contains('header--scrolled')) {
          this.classList.remove('header--scrolled');
        }
      }

      this.currentScrollTop = scrollTop;
    }
  }
}

customElements.define('header-container', HeaderContainer);

/* Announcement Bar On Scroll */
class AnnouncementBar extends HTMLElement {
  constructor() {
    super();
    this.onScrollHandler = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScrollHandler, false);

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 10) {
      if (!this.classList.contains('announcement--scrolled')) {
        this.classList.add('announcement--scrolled');
      }
    }
  }

  onScroll() {
    if (this.classList.contains('announcement--transparent')) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 10) {
        if (!this.classList.contains('announcement--scrolled')) {
          this.classList.add('announcement--scrolled');
        }
      } else{
        if (this.classList.contains('announcement--scrolled')) {
          this.classList.remove('announcement--scrolled');
        }
      }

      this.currentScrollTop = scrollTop;
    }
  }
}

customElements.define('announcement-container', AnnouncementBar);


/* ---------- FUNCTIONS ---------- */
// Cookies
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

function setCookie(name, value, days) {
  var d = new Date;
  d.setTime(d.getTime() + 24*60*60*1000*days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

// Announcement bar
// if (getCookie('legalCookie')){
//   $('.legal-popup').fadeOut(400);
// } else{
//   $('.legal-popup').fadeIn(400);
// }

// $('.legal-popup__close').click(function () {
//   var day = $('.legal-popup').attr('data-day');

//   $('.legal-popup').fadeOut(400);
//   setCookie('legalCookie', true, day)
// });

// Drag to scroll
const dragScroll = document.querySelectorAll('.drag-scroll');

dragScroll.forEach(ele => {
  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
          left: ele.scrollLeft,
          top: ele.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
  };

  // Attach the handler

  ele.addEventListener('mousedown', mouseDownHandler);
});

var animatedText = document.querySelectorAll('.animated-text, .animated-text-delay1, .animated-text-delay2, .animated-text-delay3');

function animate(element){
  var textArray = element.innerText.split('');
  element.firstChild.remove();
  
  var elArray = textArray.map(
    (letter,index)=>{
      if(letter==' ') letter = '&nbsp;';
      var el = document.createElement('span');
      el.className = 'letter';
      el.innerHTML = letter;
      el.style.animationDelay = index/(textArray.length)+'s';
      element.appendChild(el);
      return el;
    }
  );
  element.innerHtml = elArray;
}

Array.from(animatedText).map(animate)

// Slick on mobile
function slickOnMobile(slider, settings){
  $(window).on('load resize', function() {
    if ($(window).width() > 768) {
      if (slider.hasClass('slick-initialized')) {
        slider.slick('unslick');
      }
      return
    }
    if (!slider.hasClass('slick-initialized')) {
      return slider.slick(settings);
    }
  });
};

function slickOnDesktop(slider, settings){
  $(window).on('load resize', function() {
    if ($(window).width() < 769) {
      if (slider.hasClass('slick-initialized')) {
        slider.slick('unslick');
      }
      return
    }
    if (!slider.hasClass('slick-initialized')) {
      return slider.slick(settings);
    }
  });
};

// FAQ
$('body').on('click','.faq__header', function() {
  $(this).parent('.faq__item').siblings('.faq__item').children('.faq__header').removeClass('active');
  $(this).parent('.faq__item').siblings('.faq__item').children('.faq__header').siblings('.faq__content').slideUp(300);
  $(this).toggleClass('active');
  $(this).siblings('.faq__content').slideToggle(300);

  if (window.matchMedia('(max-width: 767px)').matches){
    setTimeout(() => {
      $('body, html').animate({
        scrollTop: $(this).offset().top - 50
       }, 500)
    }, 400)
  }

});


/* ---------- SLIDERS ---------- */
// Product Slider
$('.product-slider__slides').slick({
  slidesToShow: 3,
  infinite: true,
  variableWidth: true,
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></g></svg></button>',
  appendArrows: '.product-slider__arrows',
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: false,
        variableWidth: false
      }
    }
  ]
});
    
// Text Slider
$('.text-slider__slides').slick({
  slidesToShow: 1,
  infinite: false,
  centerMode: true,
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></g></svg></button>',
  appendArrows: '.text-slider__arrows'
});

// Testimonials Slider Images
$('.testimonials-slider__img-slider').slick({
    arrows: false,
    autoplay: false,
  	fade: true,
    cssEase: 'linear'
});
    
    
$('.to-be-seen-testimonials').slick({
  arrows: true,
  autoplay: false,
  dots: true,
  appendArrows: ".to-be-seen-testimonials__arrows",
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#FFF" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#FFF" stroke-width="1.5"/></g></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#FFF" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#FFF" stroke-width="1.5"/></g></g></svg></button>'
});
    
    
// $('.testimonial-slider-new').slick({
//     arrows: false,
//     autoplay: false,
//     infinite: true
// });

// Value Props Slider
// $('.text-image-props__props-slider').slick({
//   slidesToShow: 5,
//   arrows: false,
//   responsive: [
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 1,
//         infinite: false,
//         variableWidth: true,
//         centerMode: true
//       }
//     }
//   ]
// });
    
// Lifetime slider mobile
$lifetimeSlider = $('.testimonial-slider');
var lifetimeSlider = {
  slidesToShow: 1,
  dots: true,
  arrows: false
}

slickOnMobile($lifetimeSlider, lifetimeSlider);


$('.chronic-multicolumn__slider').slick({
  slidesToShow: 1,
  dots: true,
  arrows: false
})


// PDP main slider
$(document).ready(function () {
  $('.product__media-list').slick({
    infinite: false,
    prevArrow: '<button type="button" class="slick-prev slider-arrow-disable"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" fill="none"><path stroke="#1F2322" d="M1.467 10.557H23M10.223 20l-9.5-9.5 9.5-9.5"/></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" fill="none"><g stroke="#1F2322"><path d="M21.533 10.443H0M12.777 1l9.5 9.5-9.5 9.5"/></g></svg></button>',
    appendArrows: '.product__media-arrows',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '194px',
          variableWidth: true,
        }
      }
    ]
  });
  // disable/enable arrows
	$(".product__media-list").on("afterChange", function (slick) {
    if ($(".slick-prev").hasClass("slick-disabled")) {
      $(".slick-prev").addClass("slider-arrow-disable");
    } else {
      $(".slick-prev").removeClass("slider-arrow-disable");
    }

    if ($(".slick-next").hasClass("slick-disabled")) {
      $(".slick-next").addClass("slider-arrow-disable");
    } else {
      $(".slick-next").removeClass("slider-arrow-disable");
    }
	});
});


// People
$('.people-slider__drink-slider--1').slick({
  asNavFor: '.people-slider__people-slider--1',
  fade: true,
  arrows: false
});

$('.people-slider__people-slider--1').slick({
  asNavFor: '.people-slider__drink-slider--1',
  slidesToShow: 3,
  variableWidth: true,
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></g></svg></button>',
  appendArrows: '.people-slider__arrows--1',
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        variableWidth: false,
        infinite: false
      }
    }
  ]
});


$('.people-slider__drink-slider--2').slick({
  asNavFor: '.people-slider__people-slider--2',
  fade: true,
  arrows: true
});

$('.people-slider__people-slider--2').slick({
  asNavFor: '.people-slider__drink-slider--2',
  slidesToShow: 3,
  variableWidth: true,
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></g></svg></button>',
  appendArrows: '.people-slider__arrows--2',
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        variableWidth: false,
        infinite: false
      }
    }
  ]
});
    
    
$('.people-slider__drink-slider--3').slick({
  asNavFor: '.people-slider__people-slider--3',
  fade: true,
  arrows: false
});
    
$('.people-slider__people-slider--3').on('init', function(event, slick){
  $('.people-slider__arrows--3 .slick-prev').hide()
});
    
$('.people-slider__people-slider--3').slick({
  asNavFor: '.people-slider__drink-slider--3',
  slidesToShow: 3,
  rtl: true,
  variableWidth: true,
  arrows: true,
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></g></svg></button>',
  appendArrows: '.people-slider__arrows--3',
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
        arrows: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        variableWidth: false,
        infinite: false,
        arrows: true
      }
    }
  ]
});
    
$('.people-slider__people-slider--3').on('afterChange', function(event, slick, currentSlide, nextSlide){
  if (currentSlide == 0) {
    $('.people-slider__arrows--3 .slick-prev').hide()
  } else if(currentSlide == slick.slideCount -1) {
    $('.people-slider__arrows--3 .slick-next').hide()
  } else {
    $('.people-slider__arrows--3 .slick-next, .people-slider__arrows--3 .slick-prev').show()
  }
});
    
$('.yellow-toilets__content').slick({
  arrows: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: true
      }
    }
  ]
});

$('.pr-slider__container').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></g></svg></button>',
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }
  ]
});

$('.yellow-toilets__content').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  var slide = nextSlide + 1;

  if (slide == 1) {
    $('.yellow-toilets').css('background', 'linear-gradient(90deg, #fff 0%, #FEFAED 100%) 0% 0% no-repeat padding-box')
  } else if (slide == 2) {
    $('.yellow-toilets').css('background', 'linear-gradient(90deg, #FEFAED 0%, #FDF2D3 100%) 0% 0% no-repeat padding-box')
  } else if (slide == 3) {
    $('.yellow-toilets').css('background', 'linear-gradient(90deg, #FDF2D3 0%, #FBE6A8 100%) 0% 0% no-repeat padding-box')
  } else if (slide == 4) {
    $('.yellow-toilets').css('background', 'linear-gradient(90deg, #FBE6A8 0%, #F9D87B 100%) 0% 0% no-repeat padding-box')
  } else if (slide == 5) {
    $('.yellow-toilets').css('background', 'linear-gradient(90deg, #F9D87B 0%, #FBCA45 100%) 0% 0% no-repeat padding-box')
  } else if (slide == 6) {
    $('.yellow-toilets').css('background', 'linear-gradient(90deg, #FBCA45 0%, #EEB826 100%) 0% 0% no-repeat padding-box')
  } else if (slide == 7) {
    $('.yellow-toilets').css('background', 'linear-gradient(90deg, #EEB826 0%, #E59223 100%) 0% 0% no-repeat padding-box')
  }
});
    
    
$("details-disclosure>details").click(function(){
  $('.menu-fixed').fadeIn(200).addClass('active');
});    
    
$('.menu-fixed .bg, .menu-fixed .back').on('click', function() {
  $('.menu-fixed').fadeOut(200).removeClass('active');
})


function getSectionInnerHTML(html, selector) {
  return new DOMParser()
    .parseFromString(html, 'text/html')
    .querySelector(selector).innerHTML;
}

// Add to cart
$('body').on('click', '.js-add-to-cart', function(e) {
  e.preventDefault();
  document.querySelector('cart-drawer').enableLoading();
  
  let add_items;
  let id = Number($(this).data('id'));
  let metafield = $(this).data('metafield');
  let metafieldHasValue = false;
  let metafieldArray;
  let metafieldKey;
  let metafieldValue;
  if (metafield){
      if (metafield.indexOf(':') != '' || metafield.indexOf(':') != null){
      metafieldHasValue = true;
      metafieldArray = metafield.split(':');
      metafieldKey = metafieldArray[0].trim();
      metafieldValue = metafieldArray[1].trim();
      } else {
        metafieldHasValue = false;
      }
  } else {
     metafieldHasValue = false;
  }
  let subid = Number($(this).data('subid'));
  let checked_type = $(this).parent().find('input:checked').val()
  let checked_type_sub = Number($(this).parent().find('input:checked').data('subid'))
  
  $.getJSON('/cart', function (results) {
    if(Number(results.item_count) > 0) {
      $('.cart-count-bubble').text(`${results.item_count}`)
    } else {
      $('.cart-count-bubble').text('')
    }
  })
  
  if (!!subid) {
    if (metafieldHasValue){
      add_items = [{id: id, quantity: 1, selling_plan: subid, properties: {
      [metafieldKey]: metafieldValue}}]
    } else {
      add_items = [{id: id, quantity: 1, selling_plan: subid}]
    }
    
  } else if (checked_type == 'subscription') {
    if (metafieldHasValue){
      add_items = [{id: id, quantity: 1, selling_plan: checked_type_sub, properties: {
      [metafieldKey]: metafieldValue}}]
    } else {
      add_items = [{id: id, quantity: 1, selling_plan: checked_type_sub}]
    }
    
  } else {
    if (metafieldHasValue){
       add_items = [{id: id, quantity: 1, properties: {
      [metafieldKey]: metafieldValue}}]
    } else {
       add_items = [{id: id, quantity: 1}]
    }
   
  }
  
  const body = JSON.stringify({
    items: add_items,
    sections: atcGetSectionsToRender().map((section) => section.section),
    sections_url: window.location.pathname
  });

  fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
    .then((response) => response.json())
    .then((parsedState) => {
      atcGetSectionsToRender().forEach((section => {
        const elementToReplace =
          document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

        elementToReplace.innerHTML =
          getSectionInnerHTML(parsedState.sections[section.section], section.selector);
      }));
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      document.querySelector('cart-drawer').disableLoading();
      document.querySelector('cart-drawer').open();
    });
});

$('body').on('click', '.pee-club-add-to-cart', function(e) {
  e.preventDefault();
  let add_items;
  let id = Number($(this).data('id'));
  let subid = Number($(this).data('subid'));
  let metafield = $(this).data('metafield');
  let metafieldHasValue = false;
  let metafieldArray;
  let metafieldKey;
  let metafieldValue;
  if (metafield){
      if (metafield.indexOf(':') != '' || metafield.indexOf(':') != null){
      metafieldHasValue = true;
      metafieldArray = metafield.split(':');
      metafieldKey = metafieldArray[0].trim();
      metafieldValue = metafieldArray[1].trim();
      } else {
        metafieldHasValue = false;
      }
  } else {
     metafieldHasValue = false;
  }
  
  $.getJSON('/cart', function (results) {
    if(Number(results.item_count) > 0) {
      $('.cart-count-bubble').text(`${results.item_count}`)
    } else {
      $('.cart-count-bubble').text('')
    }
  })
  if (metafieldHasValue){
    add_items = [{id: id, quantity: 1, selling_plan: subid, discount: 'BUOYTESTEST', properties: {
      [metafieldKey]: metafieldValue}}]
  } else {
    add_items = [{id: id, quantity: 1, selling_plan: subid, discount: 'BUOYTESTEST'}]
  }

  
  const body = JSON.stringify({
    items: add_items,
    sections: atcGetSectionsToRender().map((section) => section.section),
    sections_url: window.location.pathname
  });

  fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
    .then((response) => response.json())
    .then((parsedState) => {
      atcGetSectionsToRender().forEach((section => {
        const elementToReplace =
          document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

        elementToReplace.innerHTML =
          getSectionInnerHTML(parsedState.sections[section.section], section.selector);
      }));
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      document.querySelector('cart-drawer').open();
    });
});

function atcGetSectionsToRender() {
  return [
    {
      id: 'cart-drawer__inner',
      section: document.getElementById('cart-drawer__inner').dataset.id,
      selector: '.cart-drawer__inner',
    },
    {
      id: 'cart-icon-bubble',
      section: document.getElementById('cart-icon-bubble').dataset.id,
      selector: '.cart-icon-bubble'
    }
  ];
}


$(document).on('click', '.has-second-slide' , function() {
  $('.cart-drawer__second-slide').addClass('show-second');
});

$(document).on('click', '.shop-slide-out__second-back' , function() {
  $('.cart-drawer__second-slide').removeClass('show-second');
});

$(document).on('click', '.cart-drawer__radio-container label' , function() {
  let price = $(this).data('price')
  $('.slideout-button span').text(price);
})

// $(document).on('change', '.product-quick-add__form-item input' , function() {
//   let price = $(this).data('price')
//   $('.button-money').text(price)
// })



$(document).on('click', '.slideout-button' , function(e) {
  e.preventDefault();
  let add_items;
  let id = $('.cart-drawer__radio-container input:checked').parent().data('id')
  let subid = $('.cart-drawer__radio-container input:checked').parent().data('subid')

  if (!!subid) {
    add_items = [{id: id, quantity: 1, selling_plan: subid}]
  } else {
    add_items = [{id: id, quantity: 1}]
  }

  const body = JSON.stringify({
    items: add_items,
    sections: atcGetSectionsToRender().map((section) => section.section),
    sections_url: window.location.pathname
  });

  fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
  .then((response) => response.json())
  .then((parsedState) => {
    atcGetSectionsToRender().forEach((section => {
      const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

      elementToReplace.innerHTML =
        getSectionInnerHTML(parsedState.sections[section.section], section.selector);
    }));
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    $('.cart-drawer__second-slide').removeClass('show-second');

    $.getJSON('/cart', function (results) {
      if(Number(results.item_count) > 0) {
        $('.cart-count-bubble').text(`${results.item_count}`)
      } else {
        $('.cart-count-bubble').text('')
      }
    })
});
})



$.fn.isInViewport = function() {
  if (!!$(this).offset()) {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
};

$(window).on('resize scroll', function() {
    if ($('.info-grid__container').isInViewport()) {
        $('.info-grid__container').addClass('shake')
    } else {
        $('.info-grid__container').removeClass('shake')
    }
  
    if ($('.polaroid-slider__content').isInViewport()) {
        $('.polaroid-slider__content').addClass('shake')
    } else {
        $('.polaroid-slider__content').removeClass('shake')
    }
  
});

$('.image-with-dropdowns__q').click(function () {
  // Check if the clicked accordion item is already active
  var isActive = $(this).hasClass('active');

  // Close all accordion items
  $('.image-with-dropdowns__a').slideUp();

  // Remove active class from all elements except the clicked one
  $('.image-with-dropdowns__content-point').not($(this).next()).removeClass('active');
  $('.image-with-dropdowns__q').not(this).removeClass('active');

  if (!isActive) {
    // If the accordion item is not active, open it and scroll to the content
    $(this).next().slideToggle(function() {
      if ($(this).is(':visible')) {
        // Scroll to the top of the content when it becomes visible
        var offsetTop = $(this).offset().top;
        // scroll only on mobile
        var mediaQuery = '(max-width: 768px)';
        var mediaQueryList = window.matchMedia(mediaQuery);
        // listen for screen size change
        mediaQueryList.addEventListener('change', (event) => {
          if (event.matches) {
            $('html, body').animate({
              scrollTop: offsetTop - 150
            }, 300);
          }
        });
        // run on page load on mobile
        if (window.innerWidth < 768) {
          $('html, body').animate({
            scrollTop: offsetTop - 150
          }, 300);
        }
      }
    });
    $(this).addClass('active');
    $(this).parent().addClass('active');
  } else {
    $(this).removeClass('active');
    $(this).parent().removeClass('active');
  }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
if(anchor.getAttribute('href') !== '#recover' && anchor.getAttribute('href') !== '#login' ){
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const element = document.querySelector(this.getAttribute('href'));
        if (!element) return;
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          behavior: 'smooth',
          top: offsetPosition
        });
    });
}
});

if(document.querySelector('.js-recover-password')){
  document.querySelector('.js-recover-password').addEventListener('click',function(ele){
    window.location.href = '#recover'
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  });
}

if(document.querySelector('.js-cancle-password')){
  document.querySelector('.js-cancle-password').addEventListener('click',function(ele){
    window.location.href = '#login'
    window.scrollTo({
          behavior: 'smooth',
          top: 0
      });
  });
}

// Close supplement drawer on page-overlay click
$('.js-open-supplement-drawer').click(function() {
  $('.page-overlay').click(function() {
    $('.js-close-supplement-drawer').click();
  });
});

$('.mobile-pee-club-toggle div').click(function() {
  let num = $(this).data('id')
  $('.mobile-pee-club-toggle div').removeClass('active')
  $(this).addClass('active')

  $('.pee-club-half-image__container .image-with-dropdowns__dropdown-mobile .month-list').hide()
  $(`.pee-club-half-image__container .image-with-dropdowns__dropdown-mobile .month-list[data-id="${num}"]`).show()

  if(num == 1) {
    $('.image-with-dropdowns__image.hide-desktop .aspect-ratio').first().show();
    $('.image-with-dropdowns__image.hide-desktop .aspect-ratio').last().hide();
  } else {
    $('.image-with-dropdowns__image.hide-desktop .aspect-ratio').last().show();
    $('.image-with-dropdowns__image.hide-desktop .aspect-ratio').first().hide();
  }
});



$('.pee-club-product-bar-dropdown-selected').click(function() {
  $('.pee-club-product-bar-dropdown').toggle()
})

$('.pee-club-product-bar-dropdown li').click(function() {
  let id = $(this).data("id")
  let title = $(this).data('title')
  let text = $(this).data('text')
  $(`.pee-club-product-bar button`).hide()
  $(`.pee-club-product-bar button[data-button="${id}"`).show()
  $('.pee-club-dropdown-text .title-text').text(`${title}`)
  $('.pee-club-dropdown-text .subtext').text(`${text}`)
  
  $('.pee-club-product-bar-dropdown').toggle()
})

$('.pee-club-product').click(function() {
  $(this).find('.pee-club-product-info').slideDown()
  $(this).find('.pee-club-product-arrow').hide()
})

$('.Featured_Blog_Hero').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></svg></button>',
  nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></g></svg></button>'
});


const loadmore = document.querySelector('#Load_More');

if(loadmore){
  if (window.matchMedia('(min-width: 769px)').matches){
    let currentItems = 6;
    loadmore.addEventListener('click', (e) => {
      const elementList = [...document.querySelectorAll('.blog-articles .blog-articles__article')];
      for (let i = currentItems; i < currentItems + 3; i++) {
          if (elementList[i]) {
              elementList[i].style.display = 'block';
          }
      }
      currentItems += 3;
  
      // Load more button will be hidden after list fully loaded
      if (currentItems >= elementList.length) {
          event.target.style.display = 'none';
      }
    })
  }
  
  if (window.matchMedia('(max-width: 768px)').matches){
    let currentItems = 3;
    loadmore.addEventListener('click', (e) => {
      const elementList = [...document.querySelectorAll('.blog-articles .blog-articles__article')];
      for (let i = currentItems; i < currentItems + 3; i++) {
          if (elementList[i]) {
              elementList[i].style.display = 'block';
          }
      }
      currentItems += 3;
  
      // Load more button will be hidden after list fully loaded
      if (currentItems >= elementList.length) {
          event.target.style.display = 'none';
      }
    })
  }
}

$('.benefits__item').click(function() {
  $('.benefits__item h4.active').removeClass('active')
  $(this).find('h4').addClass('active')
   let num = $('.benefits__item h4.active').parent().data("id")
  $('.benefits__info-item').hide()
  $(`.benefits__info-item[data-id="${num}"]`).fadeIn() 
})

$('.select-faq__container .benefits__item').click(function() {
  $('.benefits__item h3.active').removeClass('active')
  $(this).find('h3').addClass('active')
   let num = $('.benefits__item h3.active').parent().data("id")
  $('.benefits__info-item').hide()
  $(`.benefits__info-item[data-id="${num}"]`).fadeIn() 
})

$('.benefits__item-mobile:not(.select-faq__item-mobile)').click(function() {
  $('.benefits__item-mobile h4.active').removeClass('active')
  $(this).find('h4').addClass('active')
   let num = $('.benefits__item-mobile h4.active').parent().data("id")
  $('.mobile-benefits-info').slideUp()
  $(`.mobile-benefits-info[data-id="${num}"]`).slideDown() 
})

// Benefits accordion, sets first accordion item open on mobile
var firstAccordion = $('.select-faq__item-mobile.benefits__item-mobile:first');
firstAccordion.find('.light').addClass('active');
firstAccordion.addClass('active');
firstAccordion.find('.select-faq__x').addClass('minus');
firstAccordion.next().slideDown();

// Mobile Benefits accordion
$('.select-faq__item-mobile.benefits__item-mobile').click(function() {
  var isActive = $(this).hasClass('active');
  // close all 
  $('.select-faq__container .mobile-benefits-info').slideUp()
  $('.select-faq__x').removeClass('minus')

  // Remove active class from all elements except the clicked one
  $('.benefits__item-mobile select-faq__item-mobile').not($(this).next()).removeClass('active');
  $('.select-faq__item-mobile.benefits__item-mobile').not(this).removeClass('active');
  $('.select-faq__item-mobile.benefits__item-mobile .light').removeClass('active');

  if (!isActive) {
    // If the accordion item is not active, open it and scroll to the content
    $(this).next().slideToggle(function() {
      if ($(this).is(':visible')) {
        // Scroll to the top of the content when it becomes visible
        var offsetTop = $(this).offset().top;
        $('html, body').animate({
          scrollTop: offsetTop - 140
        }, 300);
      }
    });
    $(this).addClass('active');
    $(this).parent().addClass('active');
    $(this).find('.select-faq__x').addClass('minus') 
    $(this).find('.light').addClass('active');
  } else {
    $(this).removeClass('active');
    $(this).parent().removeClass('active');
    $('.select-faq__container .benefits__item-mobile h4.active').removeClass('active')
    $(this).find('.light').removeClass('active')
  }
})

$('.reviews_button').click(function(){
  if (!$(this).hasClass("active")){
    $(this).next().get(0).play();
    $(this).toggleClass("active");
  } else {
    $(this).next().get(0).pause()
    $(this).toggleClass("active");
  }
});



// Main menu open
$('[href="#menu"]').click(function() {
  var announcementBar = $('.Show_Announcement_Bar');
  if(document.querySelector('header-container').classList.contains('header--scrolled') && announcementBar.length !== 0 ) {
    $('.main-menu').css('top', '40px');
    if ($(window).width() <= 768) { 
      if(document.querySelector('announcement-container').classList.contains('Fixed_Bar') && document.querySelector('header-container').classList.contains('header--scrolled')) {
        $('.Show_Announcement_Bar.Fixed_Bar + header-container').attr('style', `top: ${announcementBar.height() + 10}px !important`); 
      } else {
        $('header-container').attr('style', `top: 10px !important`); 
      }
    } else {
      $('header-container').attr('style', 'top: 10px !important');
    }
  } else if ((announcementBar.length === 0 || announcementBar.hasClass('not-active')) ) {
    $('.main-menu').css('top', '40px');
    $('header-container').attr('style', 'top: 10px !important');
  } else if (document.querySelector('announcement-container').classList.contains('announcement--scrolled') && !document.querySelector('announcement-container').classList.contains('Fixed_Bar')) {
     $('header-container').attr('style', `top: 10px !important`);
  } else if (document.querySelector('announcement-container').classList.contains('announcement--scrolled')) {
    $('header-container').attr('style', `top: ${announcementBar.height() + 10}px !important`)
  } else {
    $('header-container').attr('style', `top: ${announcementBar.height() + 10}px !important`);
  }
  // $('#shopify-section-announcement-bar').hide();
  $('.main-menu').attr('aria-hidden', false);
  $('.page-overlay').addClass('is-visible Menu_Overlay');
  $('body').addClass('Overflow_Hidden');
  $('.Mobile_Menu_Close').show();
  $('.Hamburger_New').hide();
  $('.header-wrapper').addClass('active');
  $(this).addClass('active');
  $('.header .header-icon--logo').addClass('menu-open');
  $('.header-wrapper').addClass('menu-open');
  $('.header').addClass('menu-open');
  $('.main-menu').addClass('active');
  $('header-container').addClass('mobile-active');
  $('.page-blury-overlay').addClass('is-visible-mobile');
  document.querySelector('body').classList.add('lock-scroll-mobile');
  
});

// Main menu close
$('.main-menu__close').click(function() {
  $('.main-menu').attr('aria-hidden', true);
  $('.page-overlay').removeClass('is-visible Menu_Overlay');
  $('.Mobile_Menu_Close').hide();
  $('body').removeClass('Overflow_Hidden');
  $('.Hamburger_New').show();
  $('.header-wrapper').removeClass('active');
  $('.header-wrapper').removeClass('menu-open');
  $('[href="#menu"]').removeClass('active');
  $('.header .header-icon--logo').removeClass('menu-open');
  $('.header').removeClass('menu-open');
  $('.main-menu').removeClass('active');
  $('header-container').removeClass('active');
  $('header-container').removeClass('mobile-active');
  $('.page-blury-overlay').removeClass('is-visible-mobile');
  document.querySelector('body').classList.remove('lock-scroll-mobile');

  var announcementBar = $('.Show_Announcement_Bar');
  if (announcementBar.length === 0 || announcementBar.hasClass('not-active')) {
    $('header-container').attr('style', 'top: 0px !important');
  } else {
    $('header-container').attr('style', `top: 0px !important`); 
    $('.Show_Announcement_Bar.Fixed_Bar + header-container').attr('style', `top: ${announcementBar.height()}px !important`);
  }
}); 



// Sticky ATC

document.addEventListener("click", function(event) {
  if (event.target.classList.contains("custom__input--active")) {
    if (event.target.classList.contains("opened")) {
      event.target.classList.remove("opened");
      event.target.closest('.custom__input--dropdown').querySelector(".options__dropdown").classList.remove("dropdown-open");
    } else {
      var variantWrapperBlock = event.target.closest('.custom__input--dropdown');
      if(variantWrapperBlock != null){
        variantWrapperBlock.querySelector(".options__dropdown").classList.remove("dropdown-open");
        variantWrapperBlock.querySelector(".custom__input--active").classList.remove("opened");
        event.target.classList.add("opened");
        event.target.closest('.custom__input--dropdown').querySelector(".options__dropdown").classList.add("dropdown-open");
      }
    }
  }
});

var optionList = document.querySelectorAll('.options__dropdown--li');

if(optionList.length > 0){
  optionList.forEach(function(element) {
    element.addEventListener("click", function() {
      var text = this.innerHTML;
      var data = this.getAttribute('data-value');
      this.classList.add('variant-active');
      var siblings = this.parentElement.children;
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] !== this) {
          siblings[i].classList.remove('variant-active');
        }
      }
      
      if (data !== "") {
        var variantWrapperDropdown = this.closest('.main__variant--wrap');
        variantWrapperDropdown.querySelector('.custom__input--active').innerHTML = text;

        var selectDropdown = variantWrapperDropdown.querySelector('.product-form__input--dropdown');
        if(selectDropdown != null) {
          selectDropdown.value = data;
          selectDropdown.dispatchEvent(new Event('change'));
        }
        var dataId = this.closest('.options__dropdown').getAttribute('data-selectid');
        var element = document.getElementsByClassName(dataId)[0];
        element.dispatchEvent(new Event('change'));
      }
  
      var variantWrapperDropdown = this.closest('.custom__input--dropdown');
      variantWrapperDropdown.querySelector('.custom__input--active').classList.remove("opened");
      variantWrapperDropdown.querySelector(".options__dropdown").classList.remove("dropdown-open");
    });
  });
}

$(window).on('resize', function(){
    let announceHeight = $('.Show_Announcement_Bar').height()
    if(announceHeight && document.querySelector('announcement-container').classList.contains('Fixed_Bar')) {
      if ($('.header-wrapper').hasClass('active-dropdown') || $('.header-wrapper').hasClass('menu-open')) {
        $('header-container').attr('style', `top: ${announceHeight + 10}px !important`);
      } else {
        $('header-container').attr('style', `top: ${announceHeight}px !important`);
      }
    } else {
      $('header-container').attr('style', `top: 0px !important`);
    }
});

// Nav Menu Dropdown Desktop
function navDropDownMenu() {
  const dropdownTrigger = document.querySelector('.js-dropdown-trigger');
  const dropDownClose = document.querySelector('.js-dropdown-close');
  const dropdownMenu = document.querySelector('.header__dropdown');
  const pageBlurOverlay = document.querySelector('.page-blury-overlay');
  const headerContainer = document.querySelector('header-container');
  const headerBorder = document.querySelector('.header--transparent'); 
  const headerWrapper = document.querySelector('.header-wrapper');

  // open dropdown
  dropdownTrigger.addEventListener('click', () => {
    if (!dropdownMenu.classList.contains('active')) {
      dropdownMenu.classList.add('active');
      if(dropDownClose) {
        dropDownClose.classList.add('active');
      }
      pageBlurOverlay.classList.add('is-visible');
      document.querySelector('body').classList.add('lock-scroll');
      headerContainer.style.zIndex = 10;
      
      if(document.querySelector('.Show_Announcement_Bar.not-active') || !document.querySelector('.Show_Announcement_Bar')) {
        headerContainer.setAttribute('style', 'top: 10px !important');
      } else if (document.querySelector('announcement-container').classList.contains('announcement--scrolled') && !document.querySelector('announcement-container').classList.contains('Fixed_Bar')) {
        headerContainer.setAttribute('style', 'top: 10px !important');
      } else {
        headerContainer.setAttribute('style', 'top: 55px !important');
      }
      headerContainer.classList.add('active');
      headerWrapper.classList.add('active-dropdown');

      if (!headerBorder.classList.contains('header--scrolled')) {
        headerBorder.classList.add('header--scrolled');
      }
    } else {
      dropdownMenu.classList.remove('active');
      pageBlurOverlay.classList.remove('is-visible');
      document.querySelector('body').classList.remove('lock-scroll');
      headerBorder.classList.remove('header--scrolled');
      headerContainer.classList.remove('active');
      headerWrapper.classList.remove('active-dropdown');
      if(dropDownClose) {
        dropDownClose.classList.remove('active');
      }
      if(document.querySelector('.Show_Announcement_Bar.not-active') || !document.querySelector('.Show_Announcement_Bar')) {
        headerContainer.setAttribute('style', 'top: 0px !important');
      } else if (document.querySelector('announcement-container').classList.contains('announcement--scrolled') && !document.querySelector('announcement-container').classList.contains('Fixed_Bar')) {
        headerContainer.setAttribute('style', 'top: 0px !important');
      } else if (!document.querySelector('announcement-container').classList.contains('announcement--scrolled') && !document.querySelector('announcement-container').classList.contains('Fixed_Bar')) {
        headerContainer.setAttribute('style', 'top: 0px !important');
      } else {
       let announceHeight = $('.Show_Announcement_Bar').height()
       headerContainer.setAttribute('style', `top: ${announceHeight}px`);
      }
    }
  });

  // close dropdown
  if(dropDownClose) {
    dropDownClose.addEventListener('click', () => {
      dropdownMenu.classList.remove('active');
      pageBlurOverlay.classList.remove('is-visible');
      document.querySelector('body').classList.remove('lock-scroll');
      
      headerContainer.classList.remove('active');
      headerWrapper.classList.remove('active-dropdown');
      if((document.querySelector('.Show_Announcement_Bar.not-active') || !document.querySelector('.Show_Announcement_Bar')) && !headerBorder.classList.contains('header--scrolled')) {
        headerContainer.setAttribute('style', 'top: 0px !important');
      } else if (headerBorder.classList.contains('header--scrolled')) {
        headerContainer.setAttribute('style', 'top: 0px !important');
      } else {
        headerContainer.setAttribute('style', 'top: 39px');  
      }
      headerBorder.classList.remove('header--scrolled');
    })
  }

  // check outside click
  document.addEventListener('click', (e) => {
    const $isOutside = !e.target.closest('.header__dropdown');
    const $btnIsOutside = !e.target.closest('.js-dropdown-trigger')
    const $btnAnnounce = !e.target.closest('.announcement-bar__close')
    if ($isOutside && $btnIsOutside && $btnAnnounce) {
      dropdownMenu.classList.remove('active');
      if(dropDownClose) {
        dropDownClose.classList.remove('active');
      }
      document.querySelector('body').classList.remove('lock-scroll');
      pageBlurOverlay.classList.remove('is-visible');
      headerContainer.classList.remove('active');
      headerWrapper.classList.remove('active-dropdown');
      if ($(window).width() > 768) {
        if((document.querySelector('.Show_Announcement_Bar.not-active') || !document.querySelector('.Show_Announcement_Bar'))) {
          headerContainer.setAttribute('style', 'top: 0px !important');
        } else if (document.querySelector('announcement-container').classList.contains('announcement--scrolled') && !document.querySelector('announcement-container').classList.contains('Fixed_Bar')) {
          headerContainer.setAttribute('style', 'top: 0px !important');
        } else if (!document.querySelector('announcement-container').classList.contains('announcement--scrolled') && !document.querySelector('announcement-container').classList.contains('Fixed_Bar')){
          headerContainer.setAttribute('style', 'top: 0px');
        } else {
          headerContainer.setAttribute('style', 'top: 39px');
        }
      }
      headerBorder.classList.remove('header--scrolled');
    }
  });
}
navDropDownMenu();


// Announcement bar
$('.announcement-bar__close').click(function() {
  $('#shopify-section-announcement-bar').hide()
  if ($('.header-wrapper.active.menu-open').length === 0 ) {
    $('.Show_Announcement_Bar.Fixed_Bar + header-container').attr('style', 'top: 0px !important');
  } else {
    $('.Show_Announcement_Bar.Fixed_Bar + header-container').attr('style', 'top: 10px !important');
  }
  $('.main-menu').css('top','40px');
  $('.Show_Announcement_Bar').addClass('not-active');
  // remove page blur and lock scroll if nav dropdown is open
  if ($('.header__dropdown').hasClass('active')) {
    $('.page-blury-overlay').removeClass('is-visible');
    $('body').removeClass('lock-scroll');
  }
})

