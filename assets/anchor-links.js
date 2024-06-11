const links = document.querySelectorAll('.anchor-links__sticky button[data-section]');

// Highlight on scroll
window.addEventListener('scroll', (event) => {
  const fromTop = window.scrollY;
  const announcementContainerHeight = document.querySelector("announcement-container").clientHeight || 0
  const headerContainerHeight = document.querySelector("header-container").clientHeight || 0
  const headerOffset = headerContainerHeight + announcementContainerHeight + document.querySelector('.anchor-links__sticky').clientHeight;

  links.forEach(link => {

    if(link.dataset.section == null) return

    const section = document.querySelector(`[data-anchor="${link.dataset.section}"]`).closest(".shopify-section");

    console.log(section)

    if (section) {
      if (section.offsetTop - headerOffset <= fromTop && section.offsetTop + section.clientHeight - headerOffset > fromTop) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });

  if(document.querySelectorAll('.anchor-links__sticky button[data-section].active').length == 0){
    document.querySelector(".anchor-links__sticky button[data-view-all]").classList.add("active")
  } else {
    document.querySelector(".anchor-links__sticky button[data-view-all]").classList.remove("active")
  }
});