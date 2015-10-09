$(function() {
  $(document).on('dblclick', '.simple-popup.credit-card-bill tr.Transaction', function() {
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