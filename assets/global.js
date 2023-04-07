.product-section {
  overflow: hidden;
}

.product {
  padding-top: 70px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}

.product__media-wrapper * {
  min-width: 0;
  min-height: 0;
}

.product__media-wrapper .sticky-images {
  position: sticky;
  top: 120px;
  margin-bottom: 50px;
}

.product__info-wrapper {
  padding: 30px 100px 70px 0;
  background: white;
  position: relative;
  z-index: 2;
}

.product__info-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  right: 100%;
  width: 2000px;
  bottom: 0;
  background: white;
}

.product__info-wrapper .okeReviews {
  margin-bottom: 8px !important;
}

.product__info-wrapper .okeReviews .okeReviews-starRating--small {
  width: 82px;
  height: 22px;
}

.product__info-wrapper .okeReviews .okeReviews-starRating--small .okeReviews-starRating-indicator-layer {
  background-size: 82px 20px;
}

.product__info-wrapper .okeReviews-reviewsSummary-ratingCount {
  margin: 0;
}

.product__info-wrapper .okeReviews-reviewsSummary-ratingCount span {
  font-family: inter, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 1.375em;
}

.product__subtitle {
  margin: 0 0 8px;
}

.product__title {
  font-size: 45px;
  margin: 0 0 12px;
}

.product__subtitle {
  font-size: 18px;
  line-height: normal;
  letter-spacing: 0;
  text-transform: inherit;
  font-weight: 400;
  margin: 0 0 16px;
}

.product__description {
  margin: 0 0 36px;
}

/* Tabs */
.product__tabs {
  margin: 40px 0;
}

.product__tabs-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
}

.product__tabs-header .body {
  padding: 0 10px 10px 0;
  display: block;
  opacity: .4;
  cursor: pointer;
  transition: opacity .2s ease;
  color: black !important;
  font-size: 12px;
}

.product__tabs-header .body:last-child {
  padding-right: 0;
}

.product__tabs-header .body.active {
  opacity: 1;
}

.product__tabs-content {
  padding-top: 20px;
}

.product__tab {
  display: none;
}

.product__tab.active {
  display: block;
}

.product__tab .check-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.product__tab .check-item {
  margin: 0;
  padding: 3px 12px 3px 0;
}

.product__tab .check-title {
  margin: 0 0 10px;
}

.product__tab .tabs-label {
  margin: 30px 0 0;
  display: block;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Bundle Tabs */
.product__bundle {
  margin-top: 40px;
}

.product__bundle-header-container {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.product__bundle-header-container button {
  width: 100%;
  padding: 7px;
  font-size: 12px;
  border: 1px solid var(--charcoal);
  border-radius: 50px;
  text-align: center;
  transition: color .2s ease, background .2s ease;
  cursor: pointer;
}

.product__bundle-header-container .hydration:hover, .product__bundle-header-container .hydration.active {
  background: var(--teal-dark);
  color: white;
}

.product__bundle-header-container .immunity:hover, .product__bundle-header-container .immunity.active {
  background: var(--green-dark);
  color: white;
}

.product__bundle-header-container .energy:hover, .product__bundle-header-container .energy.active {
  background: var(--orange-dark);
  color: white;
}

.product__bundle .product__tabs {
  display: none;
}

.product__bundle .product__tabs.active {
  display: block;
}

/* Dynamic checkout */

.shopify-payment-button__button {
  border-radius: 0;
  font-family: inherit;
  min-height: 4.6rem;
}

.shopify-payment-button__button [role="button"]:focus {
  outline: .2rem solid rgba(var(--color-foreground),.5) !important;
  outline-offset: 0.3rem;
  box-shadow: 0 0 0 .1rem rgba(var(--color-button),var(--alpha-button-border)),0 0 0 .3rem rgb(var(--color-background)),0 0 .5rem .4rem rgba(var(--color-foreground),.3) !important;
}

.shopify-payment-button__button [role="button"]:focus:not(:focus-visible) {
  outline: 0;
  box-shadow: none !important;
}

.shopify-payment-button__button [role="button"]:focus-visible {
  outline: .2rem solid rgba(var(--color-foreground),.5) !important;
  box-shadow: 0 0 0 .1rem rgba(var(--color-button),var(--alpha-button-border)),0 0 0 .3rem rgb(var(--color-background)),0 0 .5rem .4rem rgba(var(--color-foreground),.3) !important;
}

.shopify-payment-button__button--unbranded {
  background-color: rgba(var(--color-button), var(--alpha-button-background));
  box-shadow: 0 0 0 0.1rem rgba(var(--color-button), var(--alpha-button-border));
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: 0.07rem;
}

.shopify-payment-button__button--unbranded:hover,
.shopify-payment-button__button--unbranded:hover:not([disabled]) {
  background-color: rgba(var(--color-button), var(--alpha-button-background));
  box-shadow: 0 0 0 0.2rem rgba(var(--color-button), var(--alpha-button-border));
}

.shopify-payment-button__more-options {
  margin: 1.6rem 0 1rem;
  font-size: 1.2rem;
  line-height: 1.5;
  letter-spacing: 0.05rem;
  text-decoration: underline;
  text-underline-offset: 0.3rem;
}

.shopify-payment-button__button--hidden {
  display: none;
}

/* Product form */

.product-form {
  display: block;
}

/* Form Elements */
.product-form .select__select {
  width: 100%;
  height: 50px;
  padding: 0 40px;
  border: 1px solid black;
  border-radius: 100px;
  text-align: center;
}

.product-form__input {
  width: 100%;
  margin: 0 0 10px;
}

variant-radios,
variant-selects {
  display: block;
}

.product-form__input--dropdown {
  margin-bottom: 1.6rem;
}

.product-form__input .form__label {
  padding-left: 0;
}

fieldset.product-form__input .form__label {
  margin-bottom: 0.2rem;
}

.product-form__input input[type='radio'] {
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  position: absolute;
  height: 1px;
  width: 1px;
}

.product-form__input input[type='radio'] + label {
  border: 0.1rem solid rgba(var(--color-foreground), 0.55);
  border-radius: 4rem;
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-foreground));
  display: inline-block;
  margin: 0.7rem 0.5rem 0.2rem 0;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  line-height: 1;
  text-align: center;
  transition: border var(--duration-short) ease;
  cursor: pointer;
}

.product-form__input input[type='radio'] + label:hover {
  border: 0.1rem solid rgb(var(--color-foreground));
}

.product-form__input input[type='radio']:checked + label {
  background-color: rgb(var(--color-foreground));
  color: rgb(var(--color-background));
}

.product-form__input input[type='radio']:disabled + label {
  border-color: rgba(var(--color-foreground), 0.1);
  color: rgba(var(--color-foreground), 0.4);
  text-decoration: line-through;
}
.product-form__input input[type='radio']:focus-visible + label {
  box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),
    0 0 0 0.5rem rgba(var(--color-foreground), 0.55);
}

/* Fallback */
.product-form__input input[type='radio']:focus + label {
  box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),
    0 0 0 0.5rem rgba(var(--color-foreground), 0.55);
}

/* No outline when focus-visible is available in the browser */
.product-form__input input[type='radio']:focus:not(:focus-visible) + label {
  box-shadow: none;
}

.product-form__submit {
  margin-bottom: 1rem;
}

.no-js .product-form__submit.button--secondary {
  --color-button: var(--color-base-accent-1);
  --color-button-text: var(--color-base-solid-button-labels);
  --alpha-button-background: 1;
}

.product-form__submit[disabled] + .shopify-payment-button {
  display: none;
}

.product-form__buttons .button {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Overrides */
.shopify-payment-button__more-options {
  color: rgb(var(--color-foreground));
}

.shopify-payment-button__button {
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
}
  
/* .smartrr-purchase-options {
  display: none;  
}
  
.wellness-set .smartrr-purchase-options {
  display: block;  
} */

.smartrr-purchase-options [data-smartrr-selling-plan-groups] {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.smartrr-purchase-options [data-smartrr-selling-plan-groups] > div {
  padding: 0 10px;
}

.smartrr-purchase-options [data-smartrr-selling-plan-groups] * {
  font-family: inter, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 1.5em;
}

.smartrr-purchase-options .smartrr-deliver-frequency {
  display: none;
}

.smartrr-purchase-options [data-smartrr-selling-plan-group-plans] select {
  width: 100%;
  border: 1px solid var(--charcoal);
  border-radius: 50px;
}

/* Product info */

/* Product media */
.product__media-list {
  margin: 0 -8px;
  padding-right: 60px;
}

.product__media-list .slick-list {
  overflow: visible;
}

.product__media {
  padding-top: 100% !important;
}
  
.product__media img, .product__media video {
  border-radius: 16px;
}
  
.product__media-item {
  margin: 0 8px;
  border-radius: 17px;
  overflow: hidden;
  border: 1px solid black;
  position: relative;
}

.product__media-item .product-spinner {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 2;
}

.product__media-arrows {
  padding-top: 30px;
  display: flex;
  justify-content: flex-end;
}

.product__media-arrows .slick-arrow {
  cursor: pointer;
  transition: transform .2s ease;
  position: unset;
}

.product-spinner img {
  animation: spin 10s linear infinite;
}

.product__media-arrows .slick-arrow:hover.slick-prev {
  transform: translateX(-5px);
}

.product__media-arrows .slick-arrow:hover.slick-next {
  transform: translateX(5px);
}

.product__media-arrows .slick-prev {
  padding-right: 50px;
}
 
.product__media-item > * {
  display: block;
  position: relative;
}

.product__media-toggle {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: block;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
}

.product-media-modal {
  background-color: rgb(var(--color-background));
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  z-index: -1;
}

.product-media-modal[open] {
  visibility: visible;
  opacity: 1;
  z-index: 101;
}

.product-media-modal__dialog {
  display: flex;
  align-items: center;
  height: 100vh;
}

.product-media-modal__content {
  max-height: 100vh;
  width: 100%;
  overflow: auto;
}

.product-media-modal__content > *:not(.active),
.product__media-list .deferred-media {
  display: none;
}

@media screen and (min-width: 769px) {  
  
  .product__media-wrapper {
    margin-top: 40px;
  }
  
  .product-section {
    overflow: clip;
  }
    
  .product::before {
    content: '';
    position: absolute;
    top: 0;
    right: 100%;
    width: 2000px;
    bottom: 0;
    background: white;
    z-index: 1;
  }
  
  .product__info-wrapper {
    padding-right: 50px;
/*     max-height: 700px;
    overflow-y: scroll; */
  }

  .product__media-list:not(.slick-initialized) .product__media-item {
    display: none;
  }
  
  .product__media-list:not(.slick-initialized) .product__media-item:first-child {
    display: block;
  }

  .product-media-modal__content {
    padding-bottom: 2rem;
  }

  .product-media-modal__content > *:not(.active) {
    display: block;
  }

  .product__modal-opener:not(.product__modal-opener--image) {
    display: none;
  }

  .product__media-list .deferred-media {
    display: block;
  }
}

.product__media-list .deferred-media,
.product__media-list .product__modal-opener {
  border: 0.1rem solid rgba(var(--color-foreground), 0.04);
}

.product-media-modal__content > * {
  display: block;
  height: auto;
  margin: auto;
  border: 0.1rem solid rgba(var(--color-foreground), 0.04);
}

.product-media-modal__content .media {
  background: none;
}

.product-media-modal__model {
  width: 100%;
}

.product-media-modal__toggle {
  background-color: rgb(var(--color-background));
  border: 0.1rem solid rgba(var(--color-foreground), 0.1);
  border-radius: 50%;
  color: rgba(var(--color-foreground), 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  right: 2rem;
  padding: 1.2rem;
  position: fixed;
  z-index: 2;
  top: 2rem;
  width: 4rem;
}

.product-media-modal__content .deferred-media {
  width: 100%;
}

@media screen and (min-width: 769px) {
  .product-media-modal__content {
    padding: 2rem 11rem;
  }

  .product-media-modal__content > * {
    width: 100%;
  }

  .product-media-modal__content > * + * {
    margin-top: 2rem;
  }

  .product-media-modal__toggle {
    right: 5rem;
    top: 2.2rem;
  }
}

@media screen and (min-width: 990px) {
  .product-media-modal__content {
    padding: 2rem 11rem;
  }

  .product-media-modal__content > * + * {
    margin-top: 1.5rem;
  }

  .product-media-modal__content {
    padding-bottom: 1.5rem;
  }

  .product-media-modal__toggle {
    right: 5rem;
  }
}
  
@media screen and (min-width: 1051px) {  
  .product-section .page-width {
    padding: 0 80px;
  }
}

@media screen and (min-width: 1125px) {
  .product__info-wrapper {
    padding-right: 100px;
  }
}
  
.product-media-modal__toggle:hover {
  color: rgba(var(--color-foreground), 0.75);
}

.product-media-modal__toggle .icon {
  height: auto;
  margin: 0;
  width: 2.2rem;
}

.product__links {
  margin-top: 30px;
}

.product__links a {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.product__links a svg {
  margin-left: 8px;
  transition: transform .2s ease;
}

.product__links a:hover svg {
	transform: translateX(5px);
}

.rc-container {
  display: none;
}

@media screen and (max-width: 768px) {
  .product {
    padding-top: 10px;
    display: flex;
    flex-direction: column-reverse;
  }

  .product__media-wrapper {
    overflow-x: scroll;
    margin: 0px -1020px;
    scroll-padding: 0px 1000px;
    scroll-snap-type: x mandatory;
    cursor: grabbing;
  }
  
  .product__media-wrapper .sticky-images {
    margin-bottom: 16px;
  }

  .product__media-list {
    margin: 0;
    padding: 0px 1000px;
    display: inline-flex;
    white-space: nowrap; 
  }

  .product__media-item {
    width: 75vw;
    margin: 0 5px;
  }

  .product__media-item .product-spinner {
    top: 13px;
    left: 13px;
  }
  
  .product__info-wrapper {
    padding: 10px 0 0 0;
  }

  .product__info-wrapper::before {
    content: none;
  }

  .product__title {
    font-size: 30px;
  }

  .product__subtitle {
    font-size: 16px;
  }

  .template-product .product__description,
  .template-product .product__description p,
  .template-product .product__description span {
    font-size: 14px;
  }

  .product__tabs-header-wrapper {
    margin: 0 -27px;
    overflow-x: scroll;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
  
  .product__tabs-header {
    width: fit-content;
    padding: 0 27px;
    display: flex;
    justify-content: flex-start;
    border: 0;
  }

  .product__tabs-header .body {
    padding: 14px 35px 14px 0;
    white-space: nowrap;
  }

  .product__tab .body {
    font-size: 12px;
  }

  .product__bundle-header {
    margin: 0 -27px -10px;
    overflow: scroll;
  }

  .product__bundle-header-container {
    width: fit-content;
    padding: 0 27px;
  }

  .product__bundle-header-container button {
    min-width: 150px;
  }
}

/* Nutrition Label Popup */
.product-nutrition-label {
  display: none;
  position: relative;
  z-index: 3;
}

.product-nutrition-label__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-nutrition-label__overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(84, 87, 89, 0.5);
}

.product-nutrition-label__container {
  max-width: 600px;
  width: 100%;
  padding: 50px 30px 0;
  background: white;
  position: relative;
  z-index: 2;
}

.product-nutrition-label__close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.product-nutrition-label__close svg {
  height: 20px;
  width: 20px;
}

.product-nutrition-label__container-inner {
  height: 450px;
  overflow: scroll;
}

.product-nutrition-label__image {
  margin-bottom: 30px;
}

.product-nutrition-label__image img {
  max-width: 100%;
}

@media screen and (max-width: 768px) {
  .product-nutrition-label__container {
    margin: 20px;
    padding: 40px 20px 0;
  }
}

/* Tooltip */
.product__subscription-tooltip {
  margin-top: 14px;
  position: relative;
}
  
.product__subscription-tooltip:active {
  pointer-events: none;
}

.product__subscription-tooltip-text {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--charcoal-light);
  cursor: pointer;
}

.product__subscription-tooltip-text p {
  margin: 0;
  font-size: 12px;
}
  
.product__subscription-tooltip-text p span{
  font-weight: 700 !important;
}

.product__subscription-tooltip-text svg {
  height: 14px;
  width: 14px;
  margin: 0 0 0 5px;
}

.product__subscription-tooltip-popover {
  padding: 14px;
  position: absolute;
  border-radius: 5px;
  background: var(--charcoal-light);
  color: white;
  text-align: center;
  transform: translateY(20px);
  opacity: 0;
  visibility: hidden;
  transition: transform .3s ease, opacity .3s ease, visibility .3s ease;
  font-size: 12px;
  width: 350px;
  text-align: left;
}

.product__subscription-tooltip-text:hover + .product__subscription-tooltip-popover {
  transform: translateY(14px);
  opacity: 1;
  visibility: visible;
}

.product__subscription-tooltip-popover::after {
  content: '';
  height: 10px;
  width: 10px;
  border: 10px solid transparent;
  border-bottom-color: var(--charcoal-light);
  position: absolute;
  top: -19px;
  left: 25%;
  transform: translateX(-50%);
}

.product__subscription-tooltip-popover p {
  margin: 0;
  font-size: 12px;
  text-align: left;
}
  
.product__subscription-tooltip-popover p:first-of-type {
  font-size: 16px;
  text-align: left;
}
  
.product__subscription-tooltip-popover p div {
  text-align: left;
}

.product__subscription-benefits {
  margin-top: 40px;
}

.product__subscription-benefits .sh4 {
  margin: 0 0 8px;
}

.product__subscription-benefits .body {
  margin: 0 0 5px;
  color: var(--charcoal-light)
}

@media screen and (max-width: 768px) {
  .smartrr-purchase-options [data-smartrr-selling-plan-groups] {
    margin: 0 !important;
    display: block;
  }

  .smartrr-purchase-options [data-smartrr-selling-plan-groups] > div {
    padding: 0;
  }

  .smartrr-purchase-options [data-smartrr-selling-plan-group-plans] select {
    padding: 17px 18px !important;
  }

  [data-smartrr-selling-plan-group-plans] {
    margin-top: 0 !important;
  }

  .smartrr-purchase-options [data-smartrr-compare-price] {
    color: var(--charcoal-light);
    font-weight: 300;
  }
  
  .product__subscription-tooltip-popover {
    width: 250px;
  }
}
  
  
/*========== new pdp edits ==========*/
.pdp-faq .faq-section {
  margin: 30px 0;
}
  
.pdp-faq .faq__item {
  border-top: 0;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
  
.pdp-faq .faq__header {
  padding: 0; 
}

.pdp-faq .faq__header .sh4 {
  color: black !important;
}
  
.pdp-faq .faq__content {
  padding-bottom: 20px;
}

.pdp-faq .faq__content .sh4 {
  margin: 0;
}
  
.info-grid__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
  
.info-grid__item {
  padding: 12px 10px;
}
  
.info-grid__item p {
  margin: 0; 
  text-align: left;
}
  
.info-grid__item:first-of-type {
  border-bottom: 1px solid rgba(0,0,0,0.2);
  border-top: 1px solid rgba(0,0,0,0.2);
}
  
.info-grid__item:nth-of-type(2) {
  border-bottom: 1px solid rgba(0,0,0,0.2);
  border-left: 1px solid rgba(0,0,0,0.2);
  border-top: 1px solid rgba(0,0,0,0.2);
}
  
.info-grid__item:nth-of-type(3) {
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
  
.info-grid__item:last-of-type {
  border-left: 1px solid rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
  
@media screen and (max-width: 768px) {    
  .info-grid__container.shake {
    animation: shake 1s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
}
  
.smartrr-selling-plan-group-name {
  display: block !important;
  margin-bottom: 10px;
}

.smartrr-selling-plan-group-name > p {
  margin: 5px 0 0;
  font-size: 12px !important;
  color: rgba(0,0,0,0.4);
}
  
.smartrr-selling-plan-group-name > div {
  font-size: 16px !important;
}
  
[data-smartrr-form-id] .smartrr-selling-plan-group-label {
  align-items: flex-start !important;
}

.subscribe-item_info {
  display: flex;
  margin-left: -28px;
  margin-top: 10px;
}
  
.subscribe-item_info img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: hidden;
}
  
.subscribe-item_info p {
  margin: 0;
  font-size: 12px !important;
}
  
.subscribe-item_info p:first-of-type {
  margin-bottom: 3px;
}
  
.subscribe-item_info p:last-of-type {
  color: rgba(0,0,0,0.4);
}
  
.subscribe-item_info > div {
  align-self: center; 
}
  
[data-smartrr-selling-plan-groups] > div {
  padding-left: 0 !important; 
}
  
.pick-plan {
  margin-top: 40px;
  margin-bottom: 20px; 
}
  
@media screen and (max-width: 768px) {
  .product-quick-add__form-item {
    border: 1px solid black;
    padding: 7px 10px;
    border-radius: 25px;
  }
  
  .product-quick-add__form-item.subscription {
    width: 55%;
  }
  
  .product-quick-add__form-item.one-time {
    width: 45%;
  }
  
  .product-quick-add__form {
    gap: 5px !important;
    justify-content: space-between !important;
    margin-bottom: 5px !important;
  }
  
  .info-grid__container {
    overflow: auto;
    white-space: nowrap;
    width: calc(100% + 54px);
    margin-left: -27px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  
  .info-grid__item {
    display: inline-block;
    border-right: 1px solid rgba(0,0,0,0.2);
    border-bottom: 1px solid rgba(0,0,0,0.2);
    border-top: 1px solid rgba(0,0,0,0.2);
    border-left: unset !important;
  }

  .info-grid__item:last-of-type {
    border-left: 1px solid rgba(0,0,0,0.2);
  }

  .pdp-faq .faq__header {
    padding: 5px 0; 
  }
}
  
.subscribe-tooltip__flex {
  display: flex;
  gap: 8px;
  align-items: center;
}
  
.subscribe-tooltip__flex .product__subscription-tooltip {
  margin-top: 0;
  background: transparent linear-gradient(146deg, #E2EEF6 0%, #FEEBCD 26%, #E0EAEB 50%, #F0F6FA 79%, #FEEBCD 100%) 0% 0% no-repeat padding-box;
  border-radius: 14px;
  padding: 3px 12px;
    animation: gradient 3s ease infinite;
  background-size: 400% 400%;

}
 
.subscribe-tooltip__flex .product__subscription-tooltip  button > p {
  white-space: nowrap;
}
  
[data-smartrr-selling-plan-group-input] + .smartrr-selling-plan-group-input-display {
  margin-top: 6px;
}
  
.smartrr-otp [data-smartrr-selling-plan-group-input] + .smartrr-selling-plan-group-input-display {
  margin-top: 3px;
}