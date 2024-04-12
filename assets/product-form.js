class ProductForm extends HTMLElement {
  constructor() {
    super();   

    this.form = this.querySelector('form');
    this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
    this.cartNotification = document.querySelector('cart-notification');
    this.cartDrawer = document.querySelector('cart-drawer');
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    
    const submitButton = this.querySelector('[type="submit"]');
    let inputMetafield = this.querySelector('#variantMetafield');
    const productVariants = document.querySelector('#productJSON').innerText;
    const productVariantsParsed = JSON.parse(productVariants);
    const parsedForm = JSON.parse(serializeForm(this.form));
    const activeVariantId = parsedForm.id;
   
    for (let key in productVariantsParsed) {
      if ( key == activeVariantId ){
        if (productVariantsParsed[key].includes(':')){
          let name = productVariantsParsed[key].split(':');
          inputMetafield.name = `properties[${name[0].trim()}]`;
          inputMetafield.value = name[1].trim();
        }
      }
    }

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('loading');

    const form = this.form;
    const formData = JSON.parse(serializeForm(form));
    
    // Add or update the specific key in the form data
    let purchaseType = formData['purchaseType'];
    if(purchaseType == 'purchaseTypeOneTime'){
      let properties = formData['properties'];
      console.log("properties", properties)
    }
    
    const body = JSON.stringify({
      ...JSON.parse(serializeForm(this.form)),
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    console.log("body", body)

    fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
      .then((response) => response.json())
      .then((parsedState) => {

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
           document.querySelectorAll('cart-drawer').forEach((cd) => cd.checkProperties());
        }));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        submitButton.classList.remove('loading');
        submitButton.removeAttribute('disabled');
        this.cartDrawer.open();
      });
  }

  getSectionsToRender() {
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

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }
}

customElements.define('product-form', ProductForm);
