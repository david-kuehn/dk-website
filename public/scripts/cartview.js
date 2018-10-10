$(document).ready(function() {

  $('#navbar-cart-link').click(function () {
    populateCart();
  });
});

function populateCart () {
  // Get an array of the store items from the API
  $.get('/api/cart/contents', function(data, status) {

    $('.cart-view-item-container').empty();

    // For each item in the data
    for (i = 0; i < data.length; i++) {
      createCartItem(data[i], i);
    }
  });
}

function createCartItem(item, index) {
  let newCartItem = $(`<div class="cart-item" id="cart-item-${index}"></div>`);
  $('.cart-view-item-container').append(newCartItem);

  $(`#cart-item-${index}`).append($('<div class="container-fluid"></div>'));
  $(`#cart-item-${index} > .container-fluid`).append($('<div class="row"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-4 cart-small-cont cart-img-preview-cont"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-8 col-md-4 cart-small-cont cart-title-preview-cont"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-4 cart-small-cont cart-price-preview-cont"></div>'));

  console.log(item);
  $(`#cart-item-${index} > .container-fluid > .row > .cart-img-preview-cont`).append($(`<img class="cart-item-preview" src="${item.previewImage.substr(0, 24) + item.previewImage.charAt(24).toUpperCase() + item.previewImage.substr(25)}" />`));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($('<p class="cart-item-title"></p>').text(item.name));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($('<p class="cart-item-size"></p>').text(item.size));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($('<p class="cart-item-finish"></p>').text(item.finish));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($(`<a href="javascript:void(0)" onclick="removeCartItemButton(${index});" class="remove-item-link">REMOVE</button>`));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-price-preview-cont`).append($(`<p class="cart-item-price">$${item.price}</p>`));
}
