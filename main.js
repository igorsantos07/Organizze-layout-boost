$(function() {

/* ******************************************************************************* */
/* ********************  LINE CHECKER FOR CREDIT CARD BILLS  ********************* */
/* ******************************************************************************* */

  $(document).on('dblclick', '#transactions-table tr.CreditCard', function() {
    $tr = $(this)
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

/* ******************************************************************************* */
/* ********************  ADDING ACTIVITY HISTORY TO SETTINGS  ******************** */
/* ******************************************************************************* */

var $settings = $('.configurations .drop-down-box ul')
var userId = $settings.find('li').first().find('a').attr('href')
userId = userId.substr(1)
userId = userId.substr(0, userId.indexOf('/'))

$settings.append($(
  "<li>"+
    "<a href='/"+userId+"/configuracoes/atividades'>Histórico de Atividades</a>"+
  "</li>"
))

/* ******************************************************************************* */
/* *******************  DOLLAR SIGN IN INTERNATIONAL ACCOUNTS  ******************* */
/* ******************************************************************************* */

  function intoDollars($element) {
    $element = (typeof $element == 'object')? $element : $(this)
    $element
      .text($element.text().replace('R$', '$'))
      .addClass('dollar')
  }

  new MutationObserver(function(mutations, observer) {
    console.count('Mutated')

    //fixing dollar sign on dashboard accounts list
    var $accounts = $('.accounts-list li:not(.currencied)')
    if ($accounts.length > 0) {
      $accounts.each(function() {
        console.count('Looking for a Dollar account')
        var $account = $(this)
        var account = $account.find('.name').text()
        var value = $account.find('.value')

        if (account.indexOf('$') >= 0) {
          console.log('Conta '+account+' agora aparece em dólares.')
          intoDollars($account.find('.value'))
          
        }
        
        //this class avoids multiple runs when other mutations happen
        $account.addClass('currencied')
      })
    }

    //fixing dollar sign on transactions list
    var $table = $('table.transactions-table')
    if ($table.length > 0) {
      if ($('.filter-account .top-level').text().indexOf('$') >= 0) {
        $table.find('td.amount:not(.dollar), .results-detail strong:not(.dollar)').each(intoDollars)
        $('.details-transactions td big:not(.dollar), .final-balance strong:not(.dollar)').each(intoDollars)
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true
  })

  setTimeout(function() { $('body').addClass('dollarObserver') }, 100) //forcing a mutation on page load
})