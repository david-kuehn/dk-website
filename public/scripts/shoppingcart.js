$(document).ready(function() {

  // On click of the cart button, populate the cart pop-up
  $('#navbar-cart-link').click(function () {
    populateCart();
  });

  // Make an initial check as to the status of the session's cart
  updateCartButton();

  // On click of an 'add to cart' button, add the item to the cart
  $('.add-to-cart-btn').click(function() {

    // Create a new object with the data of the item being added
    const productData = {
      name: $('#purchase-modal-itemtitle').text(),
      price: $('#purchase-modal-price').text().split('$')[1],
      quantity: 1,
      size: $('#purchase-modal-sizeselect').find(":selected").text(),
      finish: $('#purchase-modal-finishselect').find(":selected").text(),
      imgPath: $('#purchase-modal-preview').prop('src')
    };

    // Store the POST request in a variable
    var postReq = $.post('/api/cart/additem', productData);

    // Once the POST request has received a response, update the cart icon in the navbar
    postReq.done(function() {
      updateCartButton();
    });
  });


});

function createCartItem(item, index) {
  let newCartItem = $(`<div class="cart-item" id="cart-item-${index}"></div>`);
  $('.cart-view-item-container').append(newCartItem);

  $(`#cart-item-${index}`).append($('<div class="container-fluid"></div>'));
  $(`#cart-item-${index} > .container-fluid`).append($('<div class="row"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-4 cart-small-cont cart-img-preview-cont"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-8 col-md-4 cart-small-cont cart-title-preview-cont"></div>'));
  $(`#cart-item-${index} > .container-fluid > .row`).append($('<div class="col-4 cart-small-cont cart-price-preview-cont"></div>'));

  $(`#cart-item-${index} > .container-fluid > .row > .cart-img-preview-cont`).append($(`<img class="cart-item-preview" src="${item.previewImage.substr(0, 24) + item.previewImage.charAt(24).toUpperCase() + item.previewImage.substr(25)}" />`));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($('<p class="cart-item-title"></p>').text(item.name));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($('<p class="cart-item-size"></p>').text(item.size));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($('<p class="cart-item-finish"></p>').text(item.finish));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-title-preview-cont`).append($(`<a href="javascript:void(0)" onclick="removeCartItemButton(${index});" class="remove-item-link">REMOVE</button>`));
  $(`#cart-item-${index} > .container-fluid > .row > .cart-price-preview-cont`).append($(`<p class="cart-item-price">$${item.price}</p>`));
}

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

function updateCartButton () {
  // Get cart items from HTML
  const cartLink = $('#navbar-cart-link');
  const cartIcon = $('#navbar-cart-img');
  const cartIconNum = $('#navbar-cart-icon-number');

  // Get the contents of the cart from the database
  $.get('/api/cart/contents', function(data, status) {
    // If there are no items in the cart
    if (data.length > 0) {
      cartLink.css({ 'pointer-events': 'auto' });
      cartIcon.css({ 'opacity': '1' });
      cartIconNum.css({ 'opacity': '1' });
    } else {    // If there ARE items in the cart
      cartLink.css({ 'pointer-events': 'none' });
      cartIcon.css({ 'opacity': '0' });
      cartIconNum.css({ 'opacity': '0' });
    }

    cartIconNum.text(data.length);
  });
}

function removeCartItemButton (cartItemIndex) {
  // Store the POST request in a variable
  var postReq = $.post('/api/cart/removeitem', { itemIndex: cartItemIndex });

  // Once the POST request has received a response, update the cart icon in the navbar
  postReq.done(function() {
    populateCart();
    updateCartButton();
  });
}
