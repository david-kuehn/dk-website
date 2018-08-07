$(document).ready(function() {

  // Get an array of the store items from the API
  $.get('/api/printstore/getitems', function(data, status) {

    // For each item in the data
    for (i = 0; i < data.length; i++) {
      createStoreItem(data[i], i);
    }
  });

  controlScroll();
});

function createStoreItem (item, index) {
  // Creates and adds item container to store
  let newItem = $(`<div class="store-item" id="store-item-${index}"></div>`);
  $('#store-content').append(newItem);

  let itemLink = $(`<a class="item-link" data-toggle="modal" data-printname="${item.title}" href="#purchase-modal"></a>`);
  $(`#store-item-${index}`).append(itemLink);

  // Creates and adds item's properties to item container
  let itemPreview = $(`<img class="item-preview" src="${item.previewImgURL}" />`);
  $(`#store-item-${index} > .item-link`).append(itemPreview);

  // Create empty div for print's details below preview
  let itemDetailsDiv = $('<div class="item-details"></div>');
  $(`#store-item-${index} > .item-link`).append(itemDetailsDiv);

  // Check if item is landscape
  if (item.landscape == "true") {
    // Center the preview
    itemPreview.css({'margin-top': '50px'});
    itemDetailsDiv.css({'padding-top': '60px'});
  }

  let itemTitle = $('<p class="item-title"></p>').text(item.title);
  $(`#store-item-${index} > .item-link >.item-details`).append(itemTitle);

  let itemPrice = $(`<p class="item-price">from $${item.price}</p>`);
  $(`#store-item-${index} > .item-link >.item-details`).append(itemPrice);
}

function controlScroll () {
  // Obtain and store necessary components
  const contentPanel = $('#store-content');
  const leftButton = $('#left-arrow-link');
  const rightButton = $('#right-arrow-link');

  if (contentPanel.scrollLeft() == 0) {
    leftButton.addClass('disabled-arrow');
  }

  // On click of the left arrow button
  leftButton.on('click', function(event) {
    // Prevent default link
    event.preventDefault();

    // Animate the scrollbar to move left the width of one item
    contentPanel.scroll();
    contentPanel.animate({
      scrollLeft: contentPanel.scrollLeft() - $("#store-item-1").width()
    }, 500, function() {
      // If it is scrolled all the way left
      if (contentPanel.scrollLeft() == 0) {
        leftButton.addClass('disabled-arrow');
      }

      // If it's not scrolled all the way right
      if (contentPanel.scrollLeft() != (contentPanel[0].scrollWidth - contentPanel.width())) {
        rightButton.removeClass('disabled-arrow');
      }
    });
  });

  // On click of the right arrow button
  rightButton.on('click', function(event) {
    // Prevent default link
    event.preventDefault();

    // Animate the scrollbar to move left the width of one item
    contentPanel.scroll();
    contentPanel.animate({
      scrollLeft: contentPanel.scrollLeft() + $("#store-item-1").width()
    }, 500, function() {
        // If it's not scrolled all the way left
        if (contentPanel.scrollLeft() != 0) {
          leftButton.removeClass('disabled-arrow');
        }

        // If it is scrolled all the way right (with a buffer of 15px)
        if (contentPanel.scrollLeft() >= (contentPanel[0].scrollWidth - (contentPanel.width() + 25))) {
          rightButton.addClass('disabled-arrow');
        }
    });

  });
}
