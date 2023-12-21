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
    const inputMetafield = this.querySelector('#variantMetafield');
    const productVariants = document.querySelector('#productJSON').innerText;
    const obj = JSON.parse(productVariants);
   // let el = JSON.parse(productVariants.innerText);
    inputMetafield.value = 'Test';
    console.dir(obj);
    console.log(serializeForm(this.form));
    

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('loading');
    
    const body = JSON.stringify({
      ...JSON.parse(serializeForm(this.form)),
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
      .then((response) => response.json())
      .then((parsedState) => {

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);

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
        id: 'cart-drawer__content',
        section: document.getElementById('cart-drawer__content').dataset.id,
        selector: '.cart-drawer__content',
      },
      {
        id: 'cart-drawer__header',
        section: document.getElementById('cart-drawer__header').dataset.id,
        selector: '.cart-drawer__header'
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
