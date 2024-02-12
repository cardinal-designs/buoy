class CartDrawerRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      if(this.closest('[data-bundle-items]')){
        this.closest('cart-drawer').updateQuantity(
          this.dataset.index,
          0,
          '',
          this.closest('[data-bundle-items]').dataset.bundleItems,
          'bundle',
          this.closest('[data-bundle-items]').querySelector('.item-data').innerText
        );
      }else{
        this.closest('cart-drawer').updateQuantity(this.dataset.index, 0);
      }
    });
  }
}

customElements.define('cart-drawer-remove-button', CartDrawerRemoveButton);

class CartDrawer extends HTMLElement {
  constructor() {
    super();

    // Elements
    this.drawer = document.getElementById('cart-drawer');
    
    this.cartButton = document.querySelector('.js-open-cart');
    this.cartButton.addEventListener('click', this.handleCartClick.bind(this));

    this.closeIcon = document.getElementById('cart-drawer__close');
    var this_2 = this;
    $('body').on('click', '.cart-drawer__close', function(event) {
      this_2.close();
    });
    
    this.onBodyClick = this.handleBodyClick.bind(this);
    this.drawer.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());

    this.pageOverlayElement = document.querySelector('.page-overlay');

    // Functionality
    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));
    this.checkProperties();
  }
  async checkProperties() {
    const updates = [];
    const sections = this.getSectionsToRender().map((section) => section.section);
    const sections_url = window.location.pathname;

    this.querySelectorAll('[data-set-msrp]').forEach((item) => {
      const MSRP = item.dataset.setMsrp.split(':')[1];
      const id = item.dataset.itemKey;
      const propertiesArr = JSON.parse(item.dataset.itemProperties || '[]');
      const properties = {};
      propertiesArr.forEach(([key, value]) => {
        properties[key] = value;
      });
      updates.push({id, properties: { MSRP, ...properties }, sections, sections_url});
    });
    
    if (!updates.length) return;

    let response;

    for (const update of updates) {
      response = await fetch(routes.cart_change_url, {...fetchConfig(), ...{ body: JSON.stringify(update) }});
    }

    const json = await response.json();

    this.renderContent(json.sections);

  }
  open() {
    this.drawer.setAttribute('aria-hidden', false); 
    this.drawer.setAttribute('aria-expanded', true);

    this.pageOverlayElement.classList.add('is-visible');
    this.pageOverlayElement.addEventListener('click', this.onBodyClick);
    
    fetch('/cart.js')
    .then(response => response.json())
    .then(data => {  $('.cart-count-bubble').text(data.item_count)});
    this.hideShowText()
  }

  close() {
    this.drawer.setAttribute('aria-hidden', true);
    this.drawer.removeAttribute('aria-expanded', true);

    this.pageOverlayElement.classList.remove('is-visible');
    this.pageOverlayElement.removeEventListener('click', this.onBodyClick);
  }

  onChange(event) {
    if(event.target.value !== 'on') {
      if(event.target.closest('[data-bundle-items]')){
        this.updateQuantity(
          event.target.dataset.index,
          event.target.value,
          document.activeElement.getAttribute('name'),
          event.target.closest('[data-bundle-items]').dataset.bundleItems,
          'bundle',
          event.target.closest('[data-bundle-items]').querySelector('.item-data').innerText
        );
      }else{
        this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
      }
    }
  }

  async bundleUpdateAction(mainProductData,updates){

    for (let item of updates) {
      let body = JSON.stringify(item);
      const response = await fetch(routes.cart_change_url,{...fetchConfig(), ...{ body }});
      const data = await response.json();
      // console.log(data); 
    }
    this.fetchAction(routes.cart_change_url,JSON.stringify(mainProductData));
  }
  
  updateQuantity(line, quantity, name,updateData = null,action = null,itemData = null) {
    this.enableLoading(line);

    let body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    let fetchUrl = routes.cart_change_url;
    if(updateData != null && action == 'bundle'){
      
      let updates = [],
          keyQty = {},
          mainProductData = {
            sections: this.getSectionsToRender().map((section) => section.section),
            sections_url: window.location.pathname
          },
          splitData = updateData.split('=='),
          keys = splitData[0].split(','),
          mainProduct = splitData[1].split('|'),
          jsonItemData = JSON.parse(itemData);

      for (let key of keys) {
        let data = key.split('|'),
            tmp = {};
        tmp.id = data[0];
        tmp.quantity = (parseInt(data[1]) * quantity);
        updates.push(tmp);
        keyQty[data[0]] = (parseInt(data[1]) * quantity);
      }

      // console.log(updates,mainProductData,jsonItemData,splitData[0].split(','))

      // return;
      mainProductData.id = mainProduct[0];
      mainProductData.quantity = parseInt(quantity);
      mainProductData.properties = jsonItemData.properties;

      for (let index = 0; index < keys.length ; index++) {
        let splitData = keys[index].split('|');
        mainProductData.properties[`Product_${index + 1}`] = `${splitData[2]} | ${keyQty[splitData[0]]}`
      }

      this.bundleUpdateAction(mainProductData,updates);
      
    }else{
     this.fetchAction(fetchUrl,body); 
    }
  }

  fetchAction(fetchUrl,body){
    fetch(`${fetchUrl}`, {...fetchConfig(), ...{ body }})
    .then((response) => {
      return response.text();
    })
    .then((state) => {
      const parsedState = JSON.parse(state);
      this.getSectionsToRender().forEach((section => {
        const elementToReplace =
          document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          
        elementToReplace.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);

      }));
      this.checkProperties();
      this.disableLoading();  
    }).catch(() => {
      this.disableLoading();
    });
  }
  
  
  removeAll() {
    const body = JSON.stringify({
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    // fetch('/cart/clear.js', {...fetchConfig(), ...{ body }})
    //   .then((response) => {
    //     return response.text();
    //   })
    //   .then((state) => {
    //     const parsedState = JSON.parse(state);
    //     this.renderContent(parsedState.sections);
    //   })
  }

  getSectionsToRender() {

    return [
      {
        id: 'cart-drawer__header',
        section: document.getElementById('cart-drawer__header').dataset.id,
        selector: '.cart-drawer__header',
      },
      {
        id: 'cart-drawer__content',
        section: document.getElementById('cart-drawer__content').dataset.id,
        selector: '.cart-drawer__content',
      },
      {
        id: 'cart-icon-bubble',
        section: document.getElementById('cart-icon-bubble').dataset.id,
        selector: '.cart-icon-bubble'
      }
    ];
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  enableLoading() {
    console.log(document.getElementById('cart-drawer-loading'));
    if (!!document.getElementById('cart-drawer-loading')) {
     document.getElementById('cart-drawer-loading').classList.remove('hidden');
    }  
  }

  disableLoading() {
    if (!!document.getElementById('cart-drawer-loading')) {
     document.getElementById('cart-drawer-loading').classList.add('hidden');
    }
    this.hideShowText();
  }

  hideShowText() {
    fetch('/cart.js').then(response => response.json()).then(data => { 
      let sub_products = false;
	  let only_singles = true;
      
      for (let i=0;i<data.items.length;i++) {
        if(!!data.items[i].selling_plan_allocation == true) {
		  sub_products = true;
          break;
        }
      }

      for (let i=0;i<data.items.length;i++) {
        if (data.items[i].product_type != 'Sample' && data.items[i].properties._bundle_id != undefined) {
          only_singles = false;
          break;
        }
      }
      
      // if (!!sub_products) {
      //   $('.sub-products__text.no-sub').hide()
      //   $('.sub-products__text.sub').show()

      // } else {
      //   $('.sub-products__text.no-sub').show()
      //   $('.sub-products__text.sub').hide()
      // }

      if(only_singles) {
//         for(let i=0;i<data.items.length;i++) {
// 		this.closest('cart-drawer').updateQuantity(i+1, 0);
//         }
        
        this.removeAll()
      }
    });
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if ($(target).hasClass('page-overlay')) {
      this.close();
      this.pageOverlayElement.classList.remove('is-visible');
    }
  }

  handleCartClick(evt) {
    evt.preventDefault();
    this.open();
  }

  renderContent(sections){
    this.getSectionsToRender().forEach((section => {
      const elementToReplace =  document.getElementById(section.id);
      elementToReplace.innerHTML =
        this.getSectionInnerHTML(sections[section.section], section.selector);
      
    }));
    this.checkProperties();
  }
  
}

/* cart button on click - add class to the body - Start */

var classNameToggle = "open-cart-drawer";
document.querySelector("#cart-icon-bubble").onclick = function() {
  document.body.classList.add(classNameToggle);
};
document.querySelector("#cart-drawer__close").onclick = function() {
  document.body.classList.remove(classNameToggle);
};
document.querySelector('.page-overlay').onclick = function() {
  document.body.classList.remove(classNameToggle);
};

/* cart button on click - add class to the body - End */



customElements.define('cart-drawer', CartDrawer);
