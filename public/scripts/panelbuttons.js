$(document).ready(function() {

        // When the hover enters
        $('.panel-button').bind("mouseover", function() {
          const beforeColor = $(this).css('background-color');

          $(this).css({'color': beforeColor, 'background': 'white'});

          // When the hover leaves
          $(this).bind("mouseout", function(){
                $(this).css({'background': beforeColor, 'color': 'white'});
            })
        })
    })

/*$(document).ready(toggleColorOnHover());

function toggleColorOnHover () {

  // When a panel-button is being hovered over
  $('#github-button').hover(
    // When the hover enters
    function() {
      console.log('yup');

      // Get the color of the element before the transition
      const beforeColor = $(this).css('color');

      // Get the color of the background so that we can switch them
      const afterColor = $(this).css('background-color');

      $(this).css({'color':afterColor, 'background-color':beforeColor});
    },
    // When the hover leaves
    function() {

    }
  );
} */
