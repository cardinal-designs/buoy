// let signUpForm = document.querySelector('.hydration-sign-up');
// let signUpLink = document.querySelector('#sign-up')

// if (signUpLink) {
//   signUpLink.addEventListener('click', function() {
//     signUpForm.scrollIntoView({ behavior: 'smooth', block: 'end'});
//   });
// }

$(document).ready(function() {
  $('a[href^="#"]').click(function(event) {
    var id = $(this).attr("href");
    var offset = 60;
    var target = $(id).offset().top - offset;
    $('html, body').animate({scrollTop:target}, 500);
    event.preventDefault();
  });
});