function stickAtc() {
  const iconTextHeader = document.querySelector('.icon-text__header');
  const stickyAtc = document.querySelector('.product-form__sticky-atc');
  
  const options = {
    threshold: 0.25,
  };
  const $observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('hey')
      }
    });
  }, options);

  $observer.observe(iconTextHeader);
}

stickAtc();