$(document).ready(function() {

  $('#navbar-cart-link').click(function () {
    // Get an array of the store items from the API
    $.get('/api/cart/contents', function(data, status) {

      $('.cart-view-item-container').empty();

      // For each item in the data
      for (i = 0; i < data.length; i++) {
        createCartItem(data[i], i);
      }
    });
  });

});

function createCartItem(item, index) {
  let newCartItem = $(`<div class="cart-item" id="cart-item-${index}"></div>`);
  $('.cart-view-item-container').append(newCartItem);

  $(`#cart-item-${index}`).append($('<div class="container-fluid"></div>'));
  $(`#cart-item-${index} > .container-fluid`).append($('<div class="row"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-xs-4 cart-img-preview-cont"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-xs-4 cart-title-preview-cont"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-xs-4 cart-price-preview-cont"></div>'));

  console.log(item);
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($('<p class="cart-item-title"></p>').text(item.name));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-price-preview-cont`).append($(`<p class="cart-item-price">$${item.price}</p>`));
}
