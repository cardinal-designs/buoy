
let productSelectionButtonClicked = false,
    productSelectionIndex,
    selectedProducts = [];
document.querySelectorAll('.lsg-bundle-block').forEach(() => {
    selectedProducts.push([]);
})

const buildSelectedProductArray = (trigger) => {
    const method = (trigger.classList.contains('lsg-bundle-product-select-quantity-minus') ? 'minus' : (trigger.classList.contains('lsg-bundle-product-select-quantity-plus') ? 'plus' : 'err'));
    const triggeredProductWrapper = trigger.closest('.lsg-bundle-product-select-wrapper') || trigger.closest('.js-bundle-product-card--wrapper');
    const variantID = triggeredProductWrapper.getAttribute('data-lsg-bundle-variant-select-id');
    const productTitle = triggeredProductWrapper.querySelector('.lsg-bundle-product-select-title').innerHTML;
    const bundleBlock = getBundleBlock(trigger);
    const bundleIndex0 = Array.from(bundleBlock.parentNode.children).indexOf(bundleBlock);
    
    switch(method) {
        case 'minus':
            if (productSelectionButtonClicked == true) {
                selectedProducts[bundleIndex0].splice(productSelectionIndex, 1);
                productSelectionButtonClicked = false
            }
            else {
                productSelectionIndex = selectedProducts[bundleIndex0].findLastIndex(p => p.selectedVariantId == variantID);
                selectedProducts[bundleIndex0].splice(productSelectionIndex, 1);    
            }
            break;
        case 'plus':
            const productImageUrl = triggeredProductWrapper.querySelector('img').src;
            const productImageAlt = triggeredProductWrapper.querySelector('img').alt;
            let selectedProductData = {
                selectedProductImageUrl: productImageUrl,
                selectedVariantId: variantID,
                selectedProductTitle: productTitle,
                selectedProductImageAlt: productImageAlt,
            };
            selectedProducts[bundleIndex0].push(selectedProductData);
            break;
    }
    updateSelectedProductGUI(trigger);
}

const updateSelectedProductGUI = (trigger) => {
    const bundleBlock = getBundleBlock(trigger);
    const bundleIndex0 = Array.from(bundleBlock.parentNode.children).indexOf(bundleBlock);
    const bundleSummaryWrapper = bundleBlock.querySelector('.lsg-bundle-summary-block--wrapper');
    if (selectedProducts[bundleIndex0].length > 0) {
        bundleBlock.classList.add('has-selected-product');
        if(window.matchMedia('(max-width: 768px)').matches == true){
          if(selectedProducts[bundleIndex0].length == 1){
            // document.querySelector('.page-blury-overlay').classList.add('is-visible');
            bundleSummaryWrapper.classList.add('open');
          }
        }else{
          // document.querySelector('.page-blury-overlay').classList.add('is-visible');
          bundleSummaryWrapper.classList.add('open');
        }
    } else {
        bundleBlock.classList.remove('has-selected-product');
        bundleSummaryWrapper.classList.remove('open');
      document.querySelector('.page-blury-overlay').classList.remove('is-visible');
    }

    const selectedProductsWrappers = bundleBlock.querySelectorAll('[data-bundle-builder-selected-products]');
    selectedProductsWrappers.forEach((selectedProductsWrapper) => {
        const selectedProductWrappers = selectedProductsWrapper.querySelectorAll('[data-bundle-builder-selected-variant-id]');
    
        selectedProductWrappers.forEach((productWrapper, i) => {
            const selectedProductData = selectedProducts[bundleIndex0][i];
    
            const productWrapperImage = productWrapper.querySelector('[data-bundle-builder-selected-product-image]');
            const productWrapperTitle = productWrapper.querySelector('[data-bundle-builder-selected-product-title]');
    
            if (typeof selectedProductData !== 'undefined') {
                
                productWrapper.setAttribute('data-bundle-builder-selected-variant-id', selectedProductData.selectedVariantId);
    
                productWrapperImage.src = selectedProductData.selectedProductImageUrl;
                productWrapperImage.alt = selectedProductData.selectedProductImageAlt;
    
                productWrapperTitle.innerHTML = selectedProductData.selectedProductTitle;
    
                productWrapper.classList.add('active');
            } else {
                
                productWrapper.setAttribute('data-bundle-builder-selected-variant-id', '');
                
                productWrapperImage.src = '';
                productWrapperImage.alt = '';
    
                productWrapperTitle.innerHTML = '';
    
                productWrapper.classList.remove('active');
                
            }
        });
    });
    
}

function setActiveBundle(trigger) {
    //sets different bundle blocks active
    const bundleIndex = trigger.dataset.bundleIndex;
    const bundleWrapper = trigger.closest('.lsg-bundle-wrapper');
    const bundleBlocks = bundleWrapper.querySelectorAll('.lsg-bundle-block');
    const targetBundle = bundleWrapper.querySelector('[data-bundle-index="' + bundleIndex + '"].lsg-bundle-block');
    if(targetBundle) {
        bundleBlocks.forEach(function(bundleBlock){
            if(bundleBlock.dataset.bundleIndex != bundleIndex) {
                bundleBlock.classList.remove('lsg-bundle-block-active');
            } else {
                bundleBlock.classList.add('lsg-bundle-block-active');
            }
        });
        updateSelectedProductGUI(trigger);
        setUrl(targetBundle.querySelector('form'));
    }
}

function checkParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const bundleBlocks = document.querySelectorAll('.lsg-bundle-block');
    const queryString = window.location.search;
    const bundles = urlParams.getAll('bundle');
    let bundle_index = urlParams.getAll('bundle_index');
    const bundle_interval = urlParams.getAll('bundle_interval');
    const bundle_interval_frequency = urlParams.getAll('bundle_interval_frequency');
    if (bundles.length > 0 || urlParams.has('bundle_index') || urlParams.has('bundle_interval') || urlParams.has('bundle_interval_frequency')) {
        if (bundle_index.length > 0) {
            bundle_index = bundle_index[0]
        } else {
            bundle_index = 0;
        }
        if (isNaN(bundle_index)) {
            bundle_index = 0;
        }
        if (bundleBlocks.length < bundle_index) {
            bundle_index = 0;
        }
        const bundleBlock = bundleBlocks[bundle_index]
        if (bundle_index > 0) {
            const bundleBlockSelects = document.querySelectorAll('.lsg-bundle-size-select .lsg-bundle-size-select-el');
            bundleBlockSelects[bundle_index].click()
        }

        bundles.forEach(el => {
            const item = el.split('_')
            const id = item[0];
            const quantity = item[1];
            const quantityInput = bundleBlock.querySelector(`.lsg-bundle-product-select-quantity-input[data-product="${id}"]`);

            if (quantityInput != null) {
                quantityInput.value = parseInt(quantity, 10) - 1;
                const quantityInputPlus = quantityInput.closest('.lsg-bundle-product-select-quantity-wrap').querySelector(`.lsg-bundle-product-select-quantity-plus`);

                for (let i = 0; i < quantity; i++) {
                    quantityInput.value = i;
                    incrementSubProduct(quantityInputPlus);
                    buildSelectedProductArray(quantityInputPlus);
                    incrementEnableValidation(quantityInputPlus);
                    checkoutEnableValidation(quantityInputPlus);
                }
                // selectedProductsPlaceholderManager();
            }
        });
        bundle_interval.forEach(el => {
            const packSizeSelectorItem = bundleBlock.querySelector(`.lsg-bundle-interval-select input[name^="bundle_interval_select_"][value="${bundle_interval}"]`);
            if (packSizeSelectorItem != null) {
                packSizeSelectorItem.checked = true;
                updateInterval(packSizeSelectorItem);
                checkoutEnableValidation(packSizeSelectorItem);
            }
        });
        bundle_interval_frequency.forEach(el => {
            const bundleIntervalFrequencySelect = bundleBlock.querySelector('.lsg-bundle-interval-frequency-select');
            if (bundleIntervalFrequencySelect != null) {
                bundleIntervalFrequencySelect.value = bundle_interval_frequency;
                updateFrequency(bundleIntervalFrequencySelect);
            }
        });
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryString;
            window.history.pushState({path: newurl}, '', newurl);
        }
    }
}

function setUrl(trigger) {
    const bundleBlockWrapper = trigger.closest('.lsg-bundle-wrapper');
    if (bundleBlockWrapper && !bundleBlockWrapper.hasAttribute('data-lsg-bundle-set-url')) {
        return false;
    }
    const bundleBlock = getBundleBlock(trigger);
    const quantityInput = bundleBlock.querySelectorAll('.lsg-bundle-product-select-quantity-input');
    let url = '?';
    let paramName = 'bundle';
    quantityInput.forEach((el) => {
        const value = el.value;
        if (value > 0) {
            url += (url == '?') ? '' : '&';
            url += `${paramName}=${el.getAttribute('data-product')}_${value}`;
        }
    });
    const selectedBundle = bundleBlock.closest('.lsg-bundle-wrapper').querySelector('.lsg-bundle-block.lsg-bundle-block-active');
    if (selectedBundle != null) {
        paramName = 'bundle_index';
        url += (url == '?') ? '' : '&';
        url += `${paramName}=${Array.from(selectedBundle.parentNode.children).indexOf(selectedBundle)}`;
    }
    const bundleIntervalOption = bundleBlock.querySelector('.lsg-bundle-interval-select input[type="radio"]:checked');
    if (bundleIntervalOption != null) {
        paramName = 'bundle_interval';
        url += (url == '?') ? '' : '&';
        url += `${paramName}=${bundleIntervalOption.value}`;
        if (bundleIntervalOption.value == 'sub') {
            paramName = 'bundle_interval_frequency';
            url += (url == '?') ? '' : '&';
            const bundleIntervalFrequencySelect = bundleBlock.querySelector('.lsg-bundle-interval-frequency-select');
            if (bundleIntervalFrequencySelect != null) {
                url += `${paramName}=${bundleIntervalFrequencySelect.value}`;
            }
        }
    }
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + url;
        window.history.pushState({path: newurl}, '', newurl);
    }
}

function incrementEnableValidation(trigger) {
    //trigger is input or increment buttons
    const productSetList = trigger.closest('.lsg-bundle-product-set-list');
    const quantityIncrementButtons = productSetList.querySelectorAll('.lsg-bundle-product-select-quantity-increment');
    const bundleQuantity = getBundleQuantityByChild(trigger);
    const bundleMax = productSetList.dataset.bundleMax;

    //increment button enable/disable
    quantityIncrementButtons.forEach(function(quantityIncrementButton){
        const method = (quantityIncrementButton.classList.contains('lsg-bundle-product-select-quantity-minus') ? 'minus' : (quantityIncrementButton.classList.contains('lsg-bundle-product-select-quantity-plus') ? 'plus' : 'err'));
        const input = quantityIncrementButton.closest('.lsg-bundle-product-select-quantity-wrap').querySelector('.lsg-bundle-product-select-quantity-input');
        const quantity = input.value;
        switch(method) {
            case 'minus':
                quantityIncrementButton.disabled = false;
                if(quantity <= 0) {
                    quantityIncrementButton.disabled = true;
                }
                if(quantity <= parseInt(input.min)) {
                    quantityIncrementButton.disabled = true;
                }
                break;
            case 'plus':
                quantityIncrementButton.disabled = false;
                if(quantity >= parseInt(input.max)) {
                    quantityIncrementButton.disabled = true;
                }
                if(parseInt(bundleMax) > 0) {
                    if(bundleQuantity >= parseInt(bundleMax)) {
                        quantityIncrementButton.disabled = true;
                    }
                }
                break;
        }
    });
}

function checkoutEnableValidation(trigger) {
  const bundleBlock = getBundleBlock(trigger);
  const addToCartButtons = bundleBlock.querySelectorAll('[data-lsg-bundle-atc]');
  const ContainueButtons = bundleBlock.querySelectorAll('[data-lsg-bundle-containue-btn]');
  const bundleQuantity = getBundleQuantity(trigger);
  const interval = getBundleInterval(trigger);
  const bundleMin = parseInt((interval == 'otp' ? bundleBlock.dataset.otpBundleMin : bundleBlock.dataset.subBundleMin));
  const bundleMax = parseInt((interval == 'otp' ? bundleBlock.dataset.otpBundleMax : bundleBlock.dataset.subBundleMax));
  const quantityToAdd = bundleMin - bundleQuantity;
  const titleWrapper = bundleBlock.querySelectorAll('.title--wrapper');
  const itemCountBadge = bundleBlock.querySelector('.js-item-count-badge');

  itemCountBadge.innerText = bundleQuantity;

  titleWrapper.forEach((wrapper) => {
    const titleDiscountBadge = wrapper.querySelector('[title-discount-badge]');
    const minInfoText = wrapper.querySelector('[data-min-info-text]');

    wrapper.classList.toggle('hide-info',(bundleQuantity > bundleMin && interval == "otp")); 
    if(interval == "otp"){
      wrapper.classList.remove('show-discount-widget');
    }else{
      wrapper.classList.toggle('show-discount-widget',(bundleQuantity > bundleMin)); 
    }

    titleDiscountBadge.innerHTML = (bundleQuantity >= (bundleMin + 3)) ? `You’ve Reached 25% Off` :  `You’ve Reached 20% Off`;

    //&& bundleQuantity < (bundleMin + 1)
    if(bundleQuantity >= bundleMin){
      minInfoText.innerHTML = (bundleQuantity < bundleMax) ? "Keep Adding For Discounts" : "";
    }else{
      minInfoText.innerHTML = minInfoText.dataset.cmsText;
    }
  });

  bundleBlock.querySelector('.lsg-bundle-interval-name .discount-badge').innerText = (bundleQuantity >= (bundleMin + 3)) ? "Save 25%" : (bundleQuantity > bundleMin) ? "Save 20%" : "";

  ContainueButtons.forEach(function(button) {
    if(bundleQuantity >= bundleMin && (bundleQuantity <= bundleMax || bundleMax < bundleMin)) {
      button.classList.remove('disabled');
      button.disabled = false;
    } else {
      button.classList.add('disabled');
      button.disabled = true;
    }
    button.onclick = () => {
      bundleBlock.classList.toggle('make-add-to-cart-action');
    }
  });
  
  //checkout button enable/disable
  addToCartButtons.forEach(function(addToCartButton){
    const addToCartText = addToCartButton.querySelector('[data-lsg-bundle-submit-button-atc-text]'); 
    const addMoreText = addToCartButton.querySelector('[data-lsg-bundle-submit-button-add-more-text]');
    const addMoreQuantity = addToCartButton.querySelector('[data-lsg-bundle-submit-button-add-more-quantity]');
    const addMoreLabel = bundleBlock.querySelector('[data-add-more-label]');
    const bundleSubText = bundleBlock.querySelector('.lsg-bundle-sub-atc');

    const checkPurchaseType = bundleBlock.querySelector('.lsg-bundle-interval-select-inner [type="radio"]:checked'),
          congText_20 = (checkPurchaseType.value == "sub") ? "Congratulation, you have <span>20% off.</span><br />" : "",
          congText_25 = (checkPurchaseType.value == "sub") ? "Congratulation, you have <span>25% off.</span><br />" : "";
    console.log(checkPurchaseType.value)
    
    if(bundleQuantity >= bundleMin && (bundleQuantity <= bundleMax || bundleMax < bundleMin)) {
      addToCartButton.classList.remove('disabled');
      addToCartButton.disabled = false;
      addMoreLabel.innerHTML = (bundleQuantity == bundleMin) ? `Add <span>1 more</span> item to <span>20% off</span>` : 
        (bundleQuantity == (bundleMin + 1)) ? `${congText_20}Add <span>2 more</span> item to <span>25% off</span>` : 
        (bundleQuantity == (bundleMin + 2)) ? `${congText_20}Add <span>1 more</span> item to <span>25% off</span>` : `${congText_25}Click Continue to make checkout` ;
      
    } else {
      addToCartButton.classList.add('disabled');
      addToCartButton.disabled = true;
      addMoreQuantity.innerHTML = quantityToAdd;
      addMoreLabel.innerHTML = (quantityToAdd == 1) ? `Add <b>${quantityToAdd} more</b> item to continue` : `Add <b>${quantityToAdd} more</b> items to continue`;
    }

    if(bundleQuantity >= bundleMin && (bundleQuantity <= bundleMax || bundleMax < bundleMin)) {
      addToCartButton.classList.add('subscription-enabled');
      bundleBlock.classList.add('bundle-checkout-enabled','make-add-to-cart-action');
      addToCartText.classList.remove('hidden');
      addMoreText.classList.add('hidden');
      // bundleSubText.classList.remove('hidden');
    }else{
      addToCartButton.classList.remove('subscription-enabled');
      bundleBlock.classList.remove('bundle-checkout-enabled','make-add-to-cart-action');
      addToCartText.classList.add('hidden');
      addMoreText.classList.remove('hidden');
      // bundleSubText.classList.add('hidden');
    }
    
  });
}

function addToCart(trigger) {
    const bundleID = getGuid();
    const uniqID = new Date().getTime().toString();
    const bundleBlock = getBundleBlock(trigger);
    const bundleForm = bundleBlock.querySelector('.lsg-bundle-form');
    const bundleProductID = bundleForm.querySelector('input[name="id"]').value;
    const bundleSellingPlan = bundleForm.querySelector('input[name="selling_plan"]').value;
    const interval = (bundleBlock.classList.contains('lsg-bundle--otp-selected')) ? 'otp' : 'sub';
    const bundleMin = (interval == 'otp' ? bundleBlock.dataset.otpBundleMin : bundleBlock.dataset.subBundleMin);
    const bundleMax = (interval == 'otp' ? bundleBlock.dataset.otpBundleMax : bundleBlock.dataset.subBundleMax);
    const bundleProductList = bundleBlock.querySelector('.lsg-bundle-product-set-list');
    const bundleProductListInputs = bundleProductList.querySelectorAll('.lsg-bundle-product-select-quantity-input');
    const button = trigger;
    button.disabled = true;
    button.classList.add('disabled');
    let bundleCart = {
        'items': []
    };
    let bundleProductQuantity = 0;
    bundleProductList.querySelectorAll('.js-bundle-product-card--wrapper.js-added .lsg-bundle-product-select-quantity-input').forEach(ele => {
      bundleProductQuantity += parseInt(ele.value);
    });

    let mainProperties = {
        _bundle_id: bundleID,
        _bundle_parent: "true",
        _uniq_id:uniqID
      },
      count = 0;
  
    bundleProductListInputs.forEach(function(bundleProductInput){
        // bundleProductQuantity = bundleProductQuantity + parseInt(bundleProductInput.value);
        if(parseInt(bundleProductInput.value) > 0) {
          count++;
          
          let sellingSelectElement = document.querySelector(`.lsg-bundle-interval-select-pod-bottom [data-product="${bundleProductInput.dataset.productId}"]`);
          let discount = (bundleProductQuantity <= parseInt(bundleMin)) ? 0 : (bundleProductQuantity >=( parseInt(bundleMin) + 3)) ? 25 : 20;
          let sellingId = Array.from(sellingSelectElement.options).filter(option => {
            return (parseInt(option.getAttribute('value')) == discount && option.dataset.variantId == bundleProductInput.dataset.product);
          })[0].dataset.sellingId;

          mainProperties[`Product_${count}`] = `${bundleProductInput.dataset.title} | ${bundleProductInput.value}`;
          
          let cartItem = {
              id: bundleProductInput.dataset.product,
              quantity: parseInt(bundleProductInput.value),
              properties: {
                _bundle_id: bundleID,
                _original_qty: bundleProductInput.value,
                _uniq_id:uniqID
              },
          };
          // console.log(interval);
          if (interval == 'sub') {
              if(sellingId) cartItem["selling_plan"] = sellingId;
          }
          bundleCart.items.push(cartItem);
        }
    });

    {
      let cartItem = {
          id: bundleProductID,
          quantity: 1,
          properties:mainProperties
      };
      
      // if (interval == 'sub') {
      //     cartItem["selling_plan"] = bundleSellingPlan;
      // }
      bundleCart.items.push(cartItem);
    }

  console.log('222',bundleCart)
  
    // if(bundleProductQuantity > bundleMax || bundleProductQuantity < bundleMin) {
    //     //quantity is not within bundle size
    //     return false;
    // }


  let drawer = document.querySelector('cart-drawer');

  bundleCart.sections = drawer.getSectionsToRender().map((section) => section.section);
  bundleCart.sections_url = window.location.pathname

    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(bundleCart),
        credentials: 'same-origin'
    }).then((response) => {
        if(response.status == 200) {
            // window.location.href = "/cart";
            // lsgSlideCartOpen();
          button.disabled = false;
          button.classList.remove('disabled');
        }
      return response.json();
    }).then(cart => {
      console.log(cart)
      drawer.renderContent(cart.sections);
      drawer.open();
    })
    .catch((error) => {
        console.error(error);
    });
}

function updateFrequency(trigger) {
    //Render price and assign selling_plan in the form
    updateBundlePrice(trigger);
    updateSellingPlan(trigger);
}

function updateInterval(trigger) {
    //updates bundle block classes, resets displayed prices, and sets the selling_plan input value
    const bundleBlock = getBundleBlock(trigger);
    const sellingPlanInput = bundleBlock.querySelector('.lsg-bundle-form input[name="selling_plan"]');
    const frequencySelect = bundleBlock.querySelector('.lsg-bundle-interval-frequency-select:not(.is-duplicate)');

    switch(trigger.value) {
        case 'otp':
            bundleBlock.classList.remove('lsg-bundle--sub-selected');
            bundleBlock.classList.add('lsg-bundle--otp-selected');
            break;
        case 'sub':
            bundleBlock.classList.remove('lsg-bundle--otp-selected');
            bundleBlock.classList.add('lsg-bundle--sub-selected');
            break;
    }
  updateBundlePrice(trigger);
  updateSellingPlan(trigger);
}

function updateSellingPlan(trigger) {
    //set form selling_plan based on selected state
    const bundleBlock = getBundleBlock(trigger);
    const selling_plan = bundleBlock.querySelector('.lsg-bundle-form input[name="selling_plan"]');
    if(selling_plan) {
        if(bundleBlock.classList.contains('lsg-bundle--sub-selected') || bundleBlock.classList.contains('lsg-bundle--only-sub')) {
            const frequencySelect = bundleBlock.querySelector('.lsg-bundle-interval-frequency-select:not(.is-duplicate)');
            if(frequencySelect) {
                selling_plan.value = frequencySelect.value;
            } else {
                selling_plan.value = '';
            }
        } else {
            selling_plan.value = '';
        }
    }
}

function inputChangeSubProduct(trigger) {
    //validates quantities for bundle products when the input field is updated
    if(isNaN(trigger.value) || trigger.value == ''){
        trigger.value = 0;
    }

    if(trigger.value > parseInt(trigger.max)) {
        trigger.value = parseInt(trigger.max);
    }

    if(trigger.value < 0) {
        trigger.value = 0;
    }

    if(trigger.value < parseInt(trigger.min)) {
        trigger.value = parseInt(trigger.min);
    }

    const bundleMax = trigger.closest('.lsg-bundle-product-set-list').dataset.bundleMax;
    const bundleQuantity = getBundleQuantity(trigger);

    if((bundleQuantity > bundleMax) && bundleMax > 0) {
        let bundleDif = bundleQuantity - bundleMax;
        if(trigger.value >= bundleDif) {
            //reduce quantity to stay within bundle max
            trigger.value = (trigger.value - bundleDif);
        } else {
            //something went wrong, reset all values to min
            trigger.closest('.lsg-bundle-product-set-list').querySelectorAll('.lsg-bundle-product-select-quantity-input').forEach(function(input){
                input.value = parseInt(input.min);
            });
        }
    }
    updateQuantityDisplay(trigger);
    updateBundlePrice(trigger);
}

function incrementSubProduct(trigger) {
    //validates quantities for the bundle products and updates the input when increment buttons are clicked
    const method = (trigger.classList.contains('lsg-bundle-product-select-quantity-minus') ? 'minus' : (trigger.classList.contains('lsg-bundle-product-select-quantity-plus') ? 'plus' : ''));
    const input = trigger.closest('.lsg-bundle-product-select-quantity-wrap').querySelector('.lsg-bundle-product-select-quantity-input');
    const bundleMax = trigger.closest('.lsg-bundle-product-set-list').dataset.bundleMax;
    const bundleQuantity = getBundleQuantity(trigger);

    switch(method) {
        case 'plus':
            if(input.value >= parseInt(input.max)) {
                //reset to inventory max if over
                input.value = parseInt(input.max);
            } else {
                if((bundleQuantity < parseInt(bundleMax)) || parseInt(bundleMax) < 1) {
                    input.value++;
                } else {
                    //at max bundle quantity, do not change
                }
            }
            updateBundlePrice(trigger);
            break;
        case 'minus':
            if(input.value <= parseInt(input.min)) {
                input.value = parseInt(input.min);
            } else if(input.value <= 0) {
                input.value = 0;
            } else {
                input.value--;
            }
            updateBundlePrice(trigger);
            break;
    }
    updateQuantityDisplay(input);
    mirrorQuantityDisplay(input);
}

function mirrorQuantityDisplay(input) {
    const bundleBlock = getBundleBlock(input);
    const productID = input.dataset.product;
    const quantity = input.value;
    const productInputs = bundleBlock.querySelectorAll('[data-product="' + productID + '"].lsg-bundle-product-select-quantity-input');
    productInputs.forEach(function(productInput){
        if(productInput !== input) {
            productInput.value = quantity;
            inputChangeSubProduct(productInput);
        }
    });
}

function updateQuantityDisplay(input) {
    const inputWrap = input.closest('.lsg-bundle-product-select-quantity-wrap'),
          cardWrapper = input.closest('.js-bundle-product-card--wrapper');
    if (input.value <= 0) {
      inputWrap.classList.add('no-quantity');
      cardWrapper.classList.remove('js-added');
    } else {
      cardWrapper.classList.add('js-added');
      inputWrap.classList.remove('no-quantity')
    }
    const inputDisplay = input.parentNode.querySelector('.lsg-bundle-product-select-quantity-input-display');
    if(inputDisplay) {
        inputDisplay.innerHTML = input.value;
    }
}

function updateBundlePrice(trigger) {
    //updates OTP/Sub pricing
  console.log('updateBundlePrice');
  const bundleBlock = getBundleBlock(trigger);
  const otpPriceEls = bundleBlock.querySelectorAll('.lsg-bundle-interval-otp-price');
  const subPriceEls = bundleBlock.querySelectorAll('.lsg-bundle-interval-sub-price');
  const curPriceEls = bundleBlock.querySelectorAll('[data-bundle-total]');
  const frequency = bundleBlock.querySelector('.lsg-bundle-interval-frequency-select:not(.is-duplicate) option:checked');
  const productList = bundleBlock.querySelector('.lsg-bundle-product-set-list');
  const hasIntervalSelect = bundleBlock.classList.contains('lsg-bundle--has-interval-select');
  const productBasePrice = parseInt(bundleBlock.dataset.productBasePrice);
  const interval = (bundleBlock.classList.contains('lsg-bundle--otp-selected')) ? 'otp' : 'sub';
  const bundleMin = (interval == 'otp' ? bundleBlock.dataset.otpBundleMin : bundleBlock.dataset.subBundleMin);
  const bundleMax = (interval == 'otp' ? bundleBlock.dataset.otpBundleMax : bundleBlock.dataset.subBundleMax);
  let totalQty = Array.from(productList.querySelectorAll('.js-bundle-product-card--wrapper.js-added .lsg-bundle-product-select-quantity-input')).map(input => {
      return parseInt(input.value)
    }).reduce(function(a, b){
      return a + b;
    });
  
  /*let interval = ''
  if(bundleBlock.classList.contains('lsg-bundle--only-otp') || bundleBlock.classList.contains('lsg-bundle--otp-selected')) {
      interval = 'otp';
  } else if (bundleBlock.classList.contains('lsg-bundle--only-sub') || bundleBlock.classList.contains('lsg-bundle--sub-selected')) {
      interval = 'sub';
  }*/
  let otpSubtotal = 0;
  let subSubtotal = 0;

  productList.querySelectorAll('.lsg-bundle-product-select-quantity-input').forEach(function(otpProductInput){
      let quantity = parseInt(otpProductInput.value);
      let price = parseInt(otpProductInput.dataset.price);
      otpSubtotal = otpSubtotal + (quantity * price);
      if(productList && frequency && hasIntervalSelect) {
          const discountType = frequency.dataset.discountType;
          const discountValue = frequency.dataset.discountValue;
          let discount = 0;
          switch(discountType){
              case 'percentage':
                  discount = (price * parseInt(discountValue)) / 100;
                  break;
              case 'fixed_amount':
                  discount = parseInt(discountValue);
                  break;
              case 'price':
                  discount = price - parseInt(discountValue);
                  break;
          }
          subSubtotal = subSubtotal + (quantity * (price - discount));
      }
  });
  if(productList && interval == 'otp') {
  }

  if(productList && interval == 'sub') {
      // const discountType = frequency.dataset.discountType;
      // const discountValue = frequency.dataset.discountValue;
    // console.log(productList.querySelectorAll('.js-bundle-product-card--wrapper'));
    
    productList.querySelectorAll('.js-bundle-product-card--wrapper.js-added').forEach(function (productGrid) {
      let productId = productGrid.dataset.productId;
      let discount = (totalQty <= parseInt(bundleMin)) ? 0 : (totalQty >= (parseInt(bundleMin) + 3)) ? 25 : 20;
      console.log(discount);
      let qty = productGrid.querySelector('.lsg-bundle-product-select-quantity-input').value,
          price = document.querySelector(`.lsg-bundle-interval-select-pod-bottom [data-product="${productId}"] [value="${discount}"][data-variant-id="${productGrid.dataset.lsgBundleVariantSelectId}"]`).dataset.sellingPrice;
      subSubtotal += (parseInt(price * qty));
    });
    
      /*productList.querySelectorAll('.lsg-bundle-product-select-quantity-input').forEach(function(subProductInput){
          let quantity = parseInt(subProductInput.value);
          let price = parseInt(subProductInput.dataset.price);
          let discount = 0;
          switch(discountType){
              case 'percentage':
                  discount = (price * parseInt(discountValue)) / 100;
                  break;
              case 'fixed_amount':
                  discount = parseInt(discountValue);
                  break;
              case 'price':
                  discount = price - parseInt(discountValue);
                  break;
          }
          subSubtotal = subSubtotal + (quantity * (price - discount));

          if(productList && hasIntervalSelect) {
              otpSubtotal = otpSubtotal + (quantity * price);
          }
      });*/
  }

  /*if (otpSubtotal > 0) {
      otpSubtotal = otpSubtotal + productBasePrice;
  }
  if (subSubtotal > 0) {
      // const discountType = frequency.dataset.discountType;
      const discountType = 'discountType';
      const discountValue = frequency.dataset.discountValue;
      let discount = 0;
      switch(discountType){
          case 'percentage':
              discount = (productBasePrice * parseInt(discountValue)) / 100;
              break;
          case 'fixed_amount':
              discount = parseInt(discountValue);
              break;
              case 'price':
              discount = productBasePrice - parseInt(discountValue);
              break;
          }
      if(discount < 0) { discount = 0; }
      subSubtotal = subSubtotal + (productBasePrice - discount);
  }*/

  const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  });
  otpPriceEls.forEach(function(el){
      el.innerHTML = currencyFormatter.format(otpSubtotal / 100);
  });
  subPriceEls.forEach(function(el){
      el.innerHTML = currencyFormatter.format(subSubtotal / 100);
  });
  curPriceEls.forEach(function(el){
      if (interval == 'otp') {
          el.innerHTML = currencyFormatter.format(otpSubtotal / 100);
      } else {
          el.innerHTML = (totalQty <= bundleMin) ? currencyFormatter.format(otpSubtotal / 100) :`<s>${currencyFormatter.format(otpSubtotal / 100)}</s> <span>${currencyFormatter.format(subSubtotal / 100)}</span>`;
      }
  });
}

function initializeBundle() {
    //loop through bundle blocks
    document.querySelectorAll('.lsg-bundle-block').forEach(function(bundleBlock){
        //set bundle block classes and initial selling_plan input
        const intervalSelect = bundleBlock.querySelector('.lsg-bundle-interval-select');
        const onlyOTP = bundleBlock.querySelector('.lsg-bundle-interval-only-otp');
        const onlySub = bundleBlock.querySelector('.lsg-bundle-interval-only-sub');
        const sellingPlanInput = bundleBlock.querySelector('.lsg-bundle-form input[name="selling_plan"]');
        const frequencySelect = bundleBlock.querySelector('.lsg-bundle-interval-frequency-select:not(.is-duplicate)');
        if(intervalSelect){
            //has otp/sub selector
            bundleBlock.classList.add('lsg-bundle--has-interval-select');
            let selectedInterval = intervalSelect.querySelector('input[name^="bundle_interval_select_"]:checked');
            switch(selectedInterval.value){
                case 'otp':
                    bundleBlock.classList.add('lsg-bundle--otp-selected');
                    // sellingPlanInput.value = '';
                    break;
                case 'sub':
                    bundleBlock.classList.add('lsg-bundle--sub-selected');
                    // sellingPlanInput.value = frequencySelect.value;
                    break;
            }
        } else if (onlyOTP) {
            //has only otp options
            bundleBlock.classList.add('lsg-bundle--only-otp');
            // sellingPlanInput.value = '';
        } else if (onlySub) {
            //has only sub options
            bundleBlock.classList.add('lsg-bundle--only-sub');
            // sellingPlanInput.value = frequencySelect.value;
        }

        //intial enable/disable for quantity increments and submit button
        bundleBlock.querySelectorAll('.lsg-bundle-product-set-list').forEach(function(productSetList){
            incrementEnableValidation(productSetList.querySelector('.lsg-bundle-product-select-quantity-input'));
        });
        checkoutEnableValidation(sellingPlanInput);
        setTimeout(function(){
            bundleBlock.classList.add('is-initialized');
        }, 500);
    });
    checkParameter();
}

function getBundleQuantity(trigger) {
    //gets the quantity of the current active bundle block product list
    let bundleBlock = getBundleBlock(trigger);
    let quantity = -1;
    let productList = bundleBlock.querySelector('.lsg-bundle-product-set-list');
    if(productList){
        quantity = 0;
        productList.querySelectorAll('.lsg-bundle-product-select-quantity-input').forEach(function(input){
            quantity = quantity + parseInt(input.value);
        });
    }
    return quantity;
}

function getBundleQuantityByChild(trigger){
    const productSetList = trigger.closest('.lsg-bundle-product-set-list');
    let quantity = -1;
    if(productSetList){
        quantity = 0;
        productSetList.querySelectorAll('.lsg-bundle-product-select-quantity-input').forEach(function(input){
            quantity = quantity + parseInt(input.value);
        });
    }
    return quantity;
}

function getBundleInterval(trigger) {
    //checks if the bundle is set to display OTP or suscription options
    let bundleBlock = getBundleBlock(trigger);
    if(bundleBlock.classList.contains('lsg-bundle--has-interval-select')) {
        if(bundleBlock.classList.contains('lsg-bundle--otp-selected')) {
            return 'otp';
        }
        if(bundleBlock.classList.contains('lsg-bundle--sub-selected')) {
            return 'sub';
        }
    }
    if(bundleBlock.classList.contains('lsg-bundle--only-otp')) {
        return 'otp';
    }
    if(bundleBlock.classList.contains('lsg-bundle--only-sub')) {
        return 'sub';
    }
    return 'err';
}

function getBundleBlock(trigger) {
    return trigger.closest('.lsg-bundle-block');
}

function getGuid() {
    let d = new Date().getTime();
    let d2 =  (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r: (r & 0x7 | 0x8)).toString(16);
    });
}

function productQuickView(url,bundleWrapper,id) {
  let productHTML = document.createElement('div'),
      productButton = document.createElement('drawer-action-button');
  productButton.setAttribute('data-id',id);
  // productHTML.innerHTML = bundleWrapper.querySelector('.js-product-htmldata').innerText;
  // productButton.insertAdjacentElement('afterbegin',productHTML.querySelector('.product-actions--wrapper'));
  // productButton.querySelector('.js-product-atb-btn').innerText = productButton.querySelector('.js-product-atb-btn').innerText.replace('Add - ','Add to Bundle - ');
  
  let drawer = document.querySelector('.js-product-quick-view-drawer');
  fetch(url)
  .then(responce => {
    return responce.text();
  })
  .then(data => {
    let fakeElement = new DOMParser().parseFromString(data, 'text/html');
    // fakeElement.querySelector('[data-product-action-button]').replaceWith(productButton);
    drawer.querySelector('.js-product-content').innerHTML = fakeElement.querySelector('#shopify-section-bundle-product-quickview').innerHTML;

    let $productMediaSlider = $(drawer).find('.js-product-content .product__media-list');
    console.log($productMediaSlider)
    var productMediaSlider = {
      prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(272.182 1503.504) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></svg></button>',
      nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="29.013" height="12.007" viewBox="0 0 29.013 12.007"><g id="Arrow" transform="translate(28.001 11.504) rotate(180)"><g id="Arrow-2" data-name="Arrow" transform="translate(271.17 1503) rotate(180)"><path id="Path_3" data-name="Path 3" d="M4.98,11,0,5.5,4.98,0" transform="translate(271.17 1503) rotate(180)" fill="none" stroke="#1f2322" stroke-width="1.5"/><path id="Path_4" data-name="Path 4" d="M249.357,1495.977h28" transform="translate(-6.188 1.523)" fill="none" stroke="#1f2322" stroke-width="1.5"/></g></g></svg></button>',
      appendArrows: '.product__media-arrows',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false
          }
        }
      ]
    };

    if ($(window).width() > 768) {
      if($productMediaSlider.slick) $productMediaSlider.slick(productMediaSlider);
    }
    
    $(window).on('resize', function() {
      let $mediaSlider = $(drawer).find('.js-product-content .product__media-list');
      if($mediaSlider.slick){
        console.log($mediaSlider);
        if ($(window).width() < 769) {
          if ($mediaSlider.hasClass('slick-initialized')) {
            $mediaSlider.slick('unslick');
          }
        }else{
          $mediaSlider.slick(productMediaSlider); 
        }
      }
    });

    var ratingCount = drawer.querySelector('.okeReviews-starRating.okeReviews-starRating--small .okeReviews-a11yText');
    if(ratingCount){
      ratingCount.innerText = ratingCount.innerText.replace('out of', '/').trim(); 
      ratingCount.innerText = ratingCount.innerText.replace('Rated', '').trim(); 
    }
      
      let myInterval = setInterval(timer, 1000);
      function timer() {
        if(drawer.querySelector('.okeReviews-reviewsSummary.js-okeReviews-reviewsSummary .okeReviews-reviewsSummary-ratingCount span')){
          let ratingText = drawer.querySelector('.okeReviews-reviewsSummary.js-okeReviews-reviewsSummary .okeReviews-reviewsSummary-ratingCount span').innerText
          drawer.querySelector('.okeReviews-reviewsSummary.js-okeReviews-reviewsSummary .okeReviews-reviewsSummary-ratingCount span').innerText = `out of ${ratingText}`;
          clearInterval(myInterval);
        }
      }
    
    drawer.classList.remove('loading');
  })
}

//Event Listeners
customElements.define('drawer-action-button',class drawerActionButton extends HTMLElement{
  constructor(){
    super();
    this.gridElement = document.querySelector(`.js-bundle-product-card--wrapper[data-lsg-bundle-variant-select-id="${this.dataset.id}"]`);
    if(!this.gridElement) return;
    this.insertAdjacentElement('afterbegin',this.gridElement.querySelector('.product-actions--wrapper').cloneNode(true));
    this.atbButton = this.querySelector('.js-product-atb-btn');
    this.plusBtn = this.querySelector('.lsg-bundle-product-select-quantity-plus');
    this.minusBtn = this.querySelector('.lsg-bundle-product-select-quantity-minus');
    this.atbButton.innerText = this.atbButton.innerText.replace('Add - ','Add to Bundle - ');
    this.atbButton.onclick = () => {
      this.gridElement.querySelector('.js-product-atb-btn').click();
      this.updateInputValue();
    }
    this.plusBtn.onclick = () => {
      this.gridElement.querySelector('.lsg-bundle-product-select-quantity-plus').click();;
      this.updateInputValue();
    }
    this.minusBtn.onclick = () => {
      this.gridElement.querySelector('.lsg-bundle-product-select-quantity-minus').click();
      this.updateInputValue();
    }
    this.updateInputValue();
  }
  updateInputValue(){
    this.querySelector('.product-qty--wrapper').classList.toggle('no-quantity',(this.gridElement.querySelector('.product-qty--wrapper').classList.contains('no-quantity')));
    this.classList.toggle('js-added',(this.gridElement.classList.contains('js-added')));
    this.querySelector('.lsg-bundle-product-select-quantity-input').value = this.gridElement.querySelector('.lsg-bundle-product-select-quantity-input').value;
    this.plusBtn.disabled = this.gridElement.querySelector('.lsg-bundle-product-select-quantity-plus').disabled;
    this.minusBtn.disabled = this.gridElement.querySelector('.lsg-bundle-product-select-quantity-minus').disabled;
  }
})
if (document.addEventListener) {
    window.addEventListener('pageshow', function (event) {
      if (event.persisted || performance.getEntriesByType("navigation")[0].type === 'back_forward') {
        document.querySelectorAll('.lsg-bundle-product-select-quantity-input').forEach(function(input){
            input.value = 0;
            inputChangeSubProduct(input);
            incrementEnableValidation(input);
            checkoutEnableValidation(input);
        });
      }
    },
    false);
}

document.querySelectorAll('[data-bundle-builder-selected-variant-id]').forEach(function(product){
  product.querySelector('.bundle-builder__selected-product-img-wrapper').addEventListener('click',() => {
    if(product.classList.contains('active')) return;
    product.closest('.lsg-bundle-summary-block--wrapper ').querySelector('.mobile-toggle-btn--wrapper').click();
    window.scrollTo({
      top: (document.querySelector('.collection-groups__grid').offsetTop - document.querySelector('header-container').offsetHeight - 20),
      behavior: "smooth",
    });
  });
});
document.querySelectorAll('[data-bundle-builder-selected-product-remove-button]').forEach(function(removeButton){
    removeButton.addEventListener('click', function(e){
        e.preventDefault();
        const triggeredProductWrapper = e.target.closest('[data-bundle-builder-selected-variant-id]');
        productSelectionButtonClicked = true;
        productSelectionIndex = triggeredProductWrapper.getAttribute('data-index');
        const variantID = triggeredProductWrapper.getAttribute('data-bundle-builder-selected-variant-id');
        const bundleBlock = getBundleBlock(e.currentTarget);
        const bundleProduct = bundleBlock.querySelector(`[data-lsg-bundle-variant-select-id='${variantID}']`);
        const bundleProductDecrement = bundleProduct.querySelector('.lsg-bundle-product-select-quantity-minus');
        bundleProductDecrement.click();
    });
});



document.querySelectorAll('.js-product-atb-btn').forEach(function(button) {
  button.addEventListener('click',function(e) {
    let wrapper = this.closest('.js-bundle-product-card--wrapper');
    wrapper.classList.add('js-added');
    wrapper.querySelector('.lsg-bundle-product-select-quantity-plus').click();
  });
});

document.querySelectorAll('.js-quick-view-button').forEach(function(button) {
  button.addEventListener('click',function(e) {
    let drawer = document.querySelector('.js-product-quick-view-drawer'),
        overlay = document.querySelector('.page-overlay'),
        productUrl = this.dataset.url + "?section_id=bundle-product-quickview";
    overlay.classList.add('is-visible');
    document.body.classList.add('open-bundle-info');
    drawer.classList.add('active');
    drawer.setAttribute('data-url',this.dataset.url); 
    drawer.classList.add('loading');
    productQuickView(productUrl,this.closest('.js-bundle-product-card--wrapper'),this.dataset.id)
  });
});

document.querySelectorAll('.lsg-bundle-product-select-quantity-increment').forEach(function(incrementButton){
    incrementButton.addEventListener('click', function(e){
        e.preventDefault();
        incrementSubProduct(e.currentTarget);
        buildSelectedProductArray(e.currentTarget);
        incrementEnableValidation(e.currentTarget);
        checkoutEnableValidation(e.currentTarget);
        setUrl(e.currentTarget);
    })
});

document.querySelectorAll('.lsg-bundle-product-select-quantity-input').forEach(function(input){
    input.addEventListener('change', function(e){
        inputChangeSubProduct(e.currentTarget);
        incrementEnableValidation(e.currentTarget);
        checkoutEnableValidation(e.currentTarget);
    })
});

document.querySelectorAll('.lsg-bundle-interval-select input[name^="bundle_interval_select_"]').forEach(function(intervalSelector){
    intervalSelector.addEventListener('change', function(e){
        updateInterval(e.currentTarget);
        checkoutEnableValidation(e.currentTarget);
        setUrl(e.currentTarget);
    });
});

document.querySelectorAll('.lsg-bundle-interval-frequency-select').forEach(function(frequencySelect){
    frequencySelect.addEventListener('change', function(e){
        const trigger = e.currentTarget;
        updateFrequency(e.currentTarget);
        setUrl(e.currentTarget);
    })
});

document.querySelectorAll('[type="submit"][data-lsg-bundle-atc]').forEach((bundleATC) => {
    bundleATC.addEventListener('click', function(e){
        e.preventDefault();
        addToCart(e.currentTarget);
        /*if(e.currentTarget.classList.contains('disabled')) {
            //scroll to top of the bundle block
            const announcementOffset = parseInt(document.body.style.getPropertyValue('--announcement-offset').replace('px', '')) || 0;
            const headerOffset = parseInt(document.body.style.getPropertyValue('--header-offset').replace('px', '')) || 0;
            const offset = announcementOffset + headerOffset;
            const bundleBlock = getBundleBlock(e.currentTarget);
            window.scrollTo({ top: bundleBlock.offsetTop - offset, behavior: 'smooth' });
        } else {
            addToCart(e.currentTarget);
        }*/
    })
})

document.querySelectorAll('.lsg-bundle-size-select-el').forEach(function(bundleSelector){
    bundleSelector.addEventListener('click', function(e){
        e.preventDefault();
        setActiveBundle(e.currentTarget);
    });
});

//Run initialize
initializeBundle();

const bundleObserver = new IntersectionObserver(([entry]) => {
    const bundleBlock = entry.target.closest('.lsg-bundle-block');
    if(bundleBlock) {
        bundleBlock.classList.remove('summary-is-below');
        bundleBlock.classList.remove('summary-is-above');
        bundleBlock.classList.remove('summary-is-visible');
        
        if(entry.isIntersecting) {
            // is visible
            bundleBlock.classList.add('summary-is-visible');
            return
        } else if(entry.boundingClientRect.top > 0) {
            // item is below view
            bundleBlock.classList.add('summary-is-below');
        } else {
            // item is above view
            bundleBlock.classList.add('summary-is-above');
        }
    }
});
const buyboxes = document.querySelectorAll('.lsg-bundle-summary-block');
buyboxes.forEach((buybox) => {
    bundleObserver.observe(buybox);
});

const bottomObserver = new IntersectionObserver(([entry]) => {
    const bundleBlocks = document.querySelectorAll('.lsg-bundle-block');
    if(entry.isIntersecting) {
        bundleBlocks.forEach((bundleBlock) => {
            bundleBlock.classList.add('is-scroll-bottom');
        })
    } else {
        bundleBlocks.forEach((bundleBlock) => {
            bundleBlock.classList.remove('is-scroll-bottom');
        })
    }
}, {
    threshold: 1
});
const subFooter = document.querySelector('.io-sub-footer');
if (subFooter) {
    bottomObserver.observe(subFooter);
}


customElements.define('drawer-variant-radios',class drawerVariantRadios extends HTMLElement {
  constructor(params) {
    super();
    let id = this.dataset.productId;
    this.mainInput = document.querySelector(`.js-bundle-product-card--wrapper[data-product-id="${id}"]`).querySelector('.lsg-bundle-product-select-quantity-input')
    this.querySelectorAll('input[type="radio"]').forEach(radio => this._radioAction(radio))
  }
  _radioAction(radio){
    if(radio.dataset.variantId == this.mainInput.dataset.product) radio.checked = true;
    radio.onchange = () => {
      this.mainInput.dataset.product = radio.dataset.variantId;
    }
  }
});

window.onload = () => {
  document.querySelector('.lsg-bundle-summary-block--wrapper').classList.remove('hidden');
}