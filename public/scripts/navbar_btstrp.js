$(document).ready(function () {
  let isToggled = false;
  // When the navbar collapse toggle is clicked
  $('.navbar-toggler').click(function() {
    isToggled = !isToggled;
    console.log(isToggled);

    // If the toggle is open
    if (isToggled == true) {
      // Assign the navbar a new style
      $('.navbar').addClass('scrolled-navbar');
      $('.navbar').removeClass('bg-transparent');

      // Change the color of all navbar text and icons
      $('.navbar-social').css({'filter': 'brightness(0)'});
      console.log('should be added')
    } else {
      // Remove the style
      $('.navbar').removeClass('scrolled-navbar');
      $('.navbar').addClass('bg-transparent');

      // Change the color of all navbar text and icons
      $('.navbar-social').css({'filter': 'brightness(0) invert(1)'});
    }
  });

  // When a link in the navbar is clicked
  $('.nav-link').on('click', function (event) {
    // Don't do the default on-click action
    event.preventDefault();

    // Smooth scroll
    $('html, body').animate(
      // Scroll to the normal href of the link
      {scrollTop: $( $(this).attr('href') ).offset().top - $('#navbar').height()}, 'slow');
    return false;
  });

  // When the window is scrolled
  $(window).scroll(function () {
    console.log('yup');

    // If the window has been scrolled more than 50px
    if ($(this).scrollTop() > 90 || isToggled == true) {
      // Assign the navbar a new style
      $('.navbar').addClass('scrolled-navbar');
      $('.navbar').removeClass('bg-transparent');

      // Change the color of all navbar text and icons
      $('.navbar-social').css({'filter': 'brightness(0)'});
    }

    // If the scroll has been reduced
    else if ($(this).scrollTop() < 90) {
      // Remove the style
      $('.navbar').removeClass('scrolled-navbar');
      $('.navbar').addClass('bg-transparent');

      // Change the color of all navbar text and icons
      $('.navbar-social').css({'filter': 'brightness(0) invert(1)'});
    }
  });
})