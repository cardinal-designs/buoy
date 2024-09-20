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
    // const productVariants = if(this.querySelector('#productJSON')){this.querySelector('#productJSON').innerText};
    // const productVariantsParsed = if(productVariants){JSON.parse(productVariants)};

    let productVariants = null;

    // Check if the element with the ID 'productJSON' exists
    if (this.querySelector('#productJSON')) {
      productVariants = this.querySelector('#productJSON').innerText;
    }
    
    let productVariantsParsed = null;
    
    // If productVariants is not null or undefined, parse it as JSON
    if (productVariants) {
      productVariantsParsed = JSON.parse(productVariants);
    }
    const parsedForm = JSON.parse(serializeForm(this.form));
    const activeVariantId = parsedForm.id;

    for (let key in productVariantsParsed) {
      if ( key == activeVariantId ){
        if (productVariantsParsed[key].includes(':')){
          let name = productVariantsParsed[key].split(':');

          if (inputMetafield) inputMetafield.name = `properties[${name[0].trim()}]`;
          if (inputMetafield) inputMetafield.value = name[1].trim();
        }
      }
    }

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('loading');

    const form = this.form;
    const formData = JSON.parse(serializeForm(form));

    // Add or update the specific key in the form data
    let purchaseType = formData['purchaseType'];
    let defaultSellingPlanId = formData['selling_plan_id'];
    if(purchaseType == 'purchaseTypeOneTime'){
      if(formData['selling_plan']) delete formData['selling_plan']
      let properties = formData['properties']
      if (properties) {
        properties['_selling_plan_id'] = defaultSellingPlanId;
      } else {
        formData['properties'] = {
          '_selling_plan_id': defaultSellingPlanId
        }
      }
    }
  
    const body = JSON.stringify({
      ...formData,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
      .then((response) => response.json())
      .then((parsedState) => {
        console.log(parsedState);
if ($(".rtx-subscription-box").hasClass("is-visible")) {
  var selling_option_plan = $(".rtx-subscription-box select[name=selling_plan] option:selected").text();
   fbq('track', 'Add To cart', {content_category: parsedState.product_type,content_subscription: selling_option_plan,content_ids:parsedState.product_id,content_name:parsedState.title,currency:"USD",num_items:"1",value:parsedState.final_price/100});
}else{
   fbq('track', 'Add To cart', {content_category: parsedState.product_type,content_subscription: "One-Time Purchase",content_ids:parsedState.product_id,content_name:parsedState.title,currency:"USD",num_items:"1",value:parsedState.final_price/100});
}
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
        subscriptionListener();
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
