$(document).ready(configureNavbar())

function configureNavbar () {
  // When the window is scrolled
  $(window).scroll(function () {
    // If the window has been scrolled more than 50px
    if ($(this).scrollTop() > 90) {
      // Assign the navbar a new style
      $('#navbar').addClass('scrolled-navbar');

      // Change the color of all navbar text and icons
      $('.navbar-link').css({'color':'black'});
      $('.navbar-social').css({'filter': 'brightness(0)'})
    }

    // If the scroll has been reduced
    else if ($(this).scrollTop() < 90) {
      // Remove the style
      $('#navbar').removeClass('scrolled-navbar');

      // Change the color of all navbar text and icons
      $('.navbar-link').css({'color':'white'});
      $('.navbar-social').css({'filter': 'brightness(0) invert(1)'})
    }
  });
}
