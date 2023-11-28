function stickAtc() {
  const iconTextHeader = document.querySelector('.icon-text__header');
  const stickyAtc = document.querySelector('.product-form__sticky-atc');

  if (!iconTextHeader || !stickyAtc) return;

  let lastScrollPosition = window.scrollY;

  const options = {
    threshold: 0.50,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || window.scrollY < lastScrollPosition) {
        stickyAtc.classList.add('active');
      } else {
        stickyAtc.classList.remove('active');
      }
    });

    lastScrollPosition = window.scrollY;
  }, options);

  observer.observe(iconTextHeader);
}

stickAtc();