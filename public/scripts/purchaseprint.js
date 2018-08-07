$(document).ready(function() {
  $('#purchase-modal').on('show.bs.modal', function (event) {
    let trigger = $(event.relatedTarget);
    let print = trigger.data('printname');
    let price = $('.item-details > .item-price', trigger).text();
    let previewURL = `img/photo/store/preview/${print.replace(/\s/g, '')}.jpg`;

    $('#purchase-modal-itemtitle').text(print);
    $('#purchase-modal-preview').attr('src', previewURL);
    $('#purchase-modal-price').text(price);
  });
});
