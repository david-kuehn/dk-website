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
