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

  let itemLink = $('<a class="item-link" href="#"></a>');
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
  const contentPanel = $('#store-content');
  const leftButton = $('#left-arrow-link');
  const rightButton = $('#right-arrow-link');

  leftButton.on('click', function(event) {
    event.preventDefault();

    contentPanel.scroll();
    contentPanel.animate({
      scrollLeft: contentPanel.scrollLeft() - $("#store-item-1").width()
    }, 500);
  });

  rightButton.on('click', function(event) {
    event.preventDefault();

    contentPanel.scroll();
    contentPanel.animate({
      scrollLeft: contentPanel.scrollLeft() + $("#store-item-1").width()
    }, 500);
  });
}
