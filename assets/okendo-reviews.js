const dateFormat = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

window.okeReviewsWidgetOnInit = function () {

    const warButton = document.querySelector('.okeReviews-reviewsWidget-header-controls-writeReview:not(.is-okeReviews-hidden)');
    const controlsSelect = document.querySelector(".okeReviews-reviews .okeReviews-reviews-controls-sort");
    if (warButton && controlsSelect) {
        controlsSelect.insertAdjacentElement("afterend", warButton);
    }
  
    const reviewMain = document.querySelector('.js-okeReviews-reviews-main');
    if (reviewMain) {
        const observer = new MutationObserver(formatDateForElement);
        observer.observe(reviewMain, {childList: true});
        formatDateForElement();
    }
};


function formatDateForElement() {
    const reviewDates = document.querySelectorAll('[data-oke-reviews-date]');
    for (const reviewDate of reviewDates) {
        const dateIsoString = reviewDate.getAttribute('data-oke-reviews-date');
        const date = new Date(dateIsoString);
        const localeDate = `${dateFormat.format(date)}`;
        reviewDate.innerText = localeDate;
    }
}