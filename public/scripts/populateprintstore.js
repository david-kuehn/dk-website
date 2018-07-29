$(document).ready(function() {

  // Get an array of the store items from the API
  $.get('/api/printstore/getitems', function(data, status) {

    // For each item in the data
    for (i = 0; i < data.length; i++) {
      createStoreItem(data[i], i);
    }
  });
});

function createStoreItem (item, index) {
  // Creates and adds item container to store
  let newItem = $(`<div class="store-item" id="store-item-${index}"></div>`);
  $('#store-content').append(newItem);

  // Creates and adds item's details to item container
  // TODO: add rest of item details
  let itemTitle = $('<p></p>').text(item.title);
  $(`#store-item-${index}`).append(itemTitle);
}
