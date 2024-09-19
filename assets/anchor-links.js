const links = document.querySelectorAll('.anchor-links__sticky button[data-section]');

// Highlight on scroll
window.addEventListener('scroll', (event) => {
  const fromTop = window.scrollY;
  
  const announcementContainer = document.querySelector(".announcement-container");
  const headerContainer = document.querySelector(".header-container");
  const stickyAnchorLinks = document.querySelector('.anchor-links__sticky');
  
  const announcementContainerHeight = announcementContainer ? announcementContainer.clientHeight : 0;
  const headerContainerHeight = headerContainer ? headerContainer.clientHeight : 0;
  const stickyAnchorHeight = stickyAnchorLinks ? stickyAnchorLinks.clientHeight : 0;
  
  const headerOffset = headerContainerHeight + announcementContainerHeight + stickyAnchorHeight;


  links.forEach(link => {

    if(link.dataset.section == null) return

    const section = document.querySelector(`[data-anchor="${link.dataset.section}"]`).closest(".shopify-section");
    if (section) {
      if (section.offsetTop - headerOffset <= fromTop && section.offsetTop + section.clientHeight - headerOffset > fromTop) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });

  let viewAllButton = document.querySelector(".anchor-links__sticky button[data-view-all]");

  if(document.querySelectorAll('.anchor-links__sticky button[data-section].active').length == 0){
    if (viewAllButton) {
      viewAllButton.classList.add("active")
    }
  } else {
    if (viewAllButton) {
      viewAllButton.classList.remove("active")
    }
  }
});


let linksCustom = document.querySelectorAll('.anchor-links__sticky--custom button[data-section]');

// Highlight on scroll
window.addEventListener('scroll', (event) => {
  let fromTopCustom = window.scrollY;
  let announcementContainerHeightCustom = document.querySelector("announcement-container").clientHeight || 0
  let headerContainerHeightCustom = document.querySelector("header-container").clientHeight || 0
  let headerOffsetCustom = headerContainerHeightCustom + announcementContainerHeightCustom + document.querySelector('.anchor-links__sticky--custom').clientHeight;

  linksCustom.forEach(link => {

    if(link.dataset.section == null) return;

    link.addEventListener("click", function(){
      let headerHeight = document.querySelector('header').offsetHeight;
      let anchorLinksHeight = document.querySelector('.anchor-links__sticky--custom') ? document.querySelector('.anchor-links__sticky--custom').offsetHeight : 0;
      let totalOffset = headerHeight + anchorLinksHeight;
      let targetElement = document.querySelector(`[data-anchor="${link.dataset.section}"]`);
      let elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - totalOffset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    })

    let sectionCustom = document.querySelector(`[data-anchor="${link.dataset.section}"]`);
    let sectionSependCustom = document.querySelector(`[data-anchor-contain="${link.dataset.section}"]`);
    if (sectionCustom || sectionSependCustom) {
      if (sectionCustom.offsetTop - headerOffsetCustom <= fromTopCustom && sectionCustom.offsetTop + sectionCustom.clientHeight - headerOffsetCustom > fromTopCustom) {
        link.classList.add('active');
      } else if(sectionSependCustom.offsetTop - headerOffsetCustom <= fromTopCustom && sectionSependCustom.offsetTop + sectionSependCustom.clientHeight - headerOffsetCustom > fromTopCustom){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  
  });

  let viewAllButton = document.querySelector(".anchor-links__sticky--custom button[data-view-all]");
  if(document.querySelectorAll('.anchor-links__sticky--custom button[data-section].active').length == 0){
    if(viewAllButton) viewAllButton.classList.add("active")
  } else {
    if(viewAllButton) viewAllButton.classList.remove("active")
  }
});