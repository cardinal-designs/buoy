class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      if(this.closest('[data-bundle-items]')){
        this.closest('cart-items').updateQuantity(
          this.dataset.index,
          0,
          '',
          this.closest('[data-bundle-items]').dataset.bundleItems,
          'bundle',
          this.closest('[data-bundle-items]').querySelector('.item-data').innerText
        );
      }else{
        this.closest('cart-items').updateQuantity(this.dataset.index, 0);
      }
      
    });
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();

    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status');

    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }

  onChange(event) {
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

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      }
    ];
  }

  async bundleUpdateAction(mainProductData,updates){

    for (let item of updates) {
      let body = JSON.stringify(item);
      const response = await fetch(routes.cart_change_url,{...fetchConfig(), ...{ body }});
      const data = await response.json();
    }
    this.fetchAction(routes.cart_change_url,JSON.stringify(mainProductData));
  }

  updateQuantity(line, quantity, name,updateData = null,action = null,itemData = null) {
    this.enableLoading(line);

    const body = JSON.stringify({
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
      this.classList.toggle('is-empty', parsedState.item_count === 0);
      document.getElementById('main-cart-footer')?.classList.toggle('is-empty', parsedState.item_count === 0);

      this.getSectionsToRender().forEach((section => {
        const elementToReplace =
          document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

        elementToReplace.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
      }));

      this.updateLiveRegions(line, parsedState.item_count);
      document.getElementById(`CartItem-${line}`)?.querySelector(`[name="${name}"]`)?.focus();
      this.disableLoading();
    }).catch(() => {
      this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
      document.getElementById('cart-errors').textContent = window.cartStrings.error;
      this.disableLoading();
    });
  }

  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      document.getElementById(`Line-item-error-${line}`)
        .querySelector('.cart-item__error-text')
        .innerHTML = window.cartStrings.quantityError.replace(
          '[quantity]',
          document.getElementById(`Quantity-${line}`).value
        );
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    document.getElementById('main-cart-items').classList.add('cart__items--disabled');
    // this.querySelectorAll('.loading-overlay')[line - 1].classList.remove('hidden');
    this.querySelector(`#CartItem-${line}`).querySelector('.loading-overlay').classList.remove('hidden');
    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    document.getElementById('main-cart-items').classList.remove('cart__items--disabled');
  }
}

customElements.define('cart-items', CartItems);
