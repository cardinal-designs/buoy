function stickAtc() {
  const iconTextHeader = document.querySelector('.icon-text__header');
  const stickyAtc = document.querySelector('.product-form__sticky-atc');

  if (!iconTextHeader || !stickyAtc) return;

  window.addEventListener('scroll', () => {
    const iconTextHeaderRect = iconTextHeader.getBoundingClientRect();
    const shouldStick = iconTextHeaderRect.bottom > 0; // Check if iconTextHeader is visible

    if (shouldStick) {
      stickyAtc.classList.add('active');
    } else {
      stickyAtc.classList.remove('active');
    }
  });
}

stickAtc();