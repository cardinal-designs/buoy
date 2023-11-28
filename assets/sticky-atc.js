function stickAtc() {
  const iconTextHeader = document.querySelector('.icon-text__header');
  const stickyAtc = document.querySelector('.product-form__sticky-atc');

  if (!iconTextHeader) return;
  
  const options = {
    threshold: 0.50,
  };
  const $observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stickyAtc.classList.add('active');
      } else {
        stickyAtc.classList.remove('active');
      }
    });
  }, options);

  $observer.observe(iconTextHeader);
}

stickAtc();