/**
 * Sticky Add to Cart
 */
function stickAtc() {
  const iconTextHeader = document.querySelector('.icon-text__header');
  const stickyAtc = document.querySelector('.product-form__sticky-atc');
  const stickyAtcBtn = document.querySelector('.product-form__submit-sticky');

  if (!iconTextHeader || !stickyAtc) return;

  let lastScrollPosition = window.scrollY;

  const options = {
    threshold: 0.50,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (window.scrollY > lastScrollPosition) {
        stickyAtc.classList.add('active');
      } else {
        stickyAtc.classList.remove('active');
      }
    });

    lastScrollPosition = window.scrollY;
  }, options);

  observer.observe(iconTextHeader);

  stickyAtcBtn.addEventListener('click', () => {
    stickyAtc.classList.remove('active');
  })
}

stickAtc();