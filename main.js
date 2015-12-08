$(function() {
  $(document).on('dblclick', '#transactions-table tr.CreditCard', function() {
    $tr = $(this);
    if ($tr.data('selected')) {
      $tr
        .css({ backgroundColor: 'inherit' })
        .data('selected', false)
    } else {
      $tr
        .css({ backgroundColor: '#FFFDDD' })
        .data('selected', true)
    }
  })
});
