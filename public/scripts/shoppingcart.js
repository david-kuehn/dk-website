$(document).ready(function() {

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

function updateCartButton() {
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
