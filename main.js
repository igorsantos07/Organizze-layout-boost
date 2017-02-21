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
/* ****************  CLEARS UP USELESS STRINGS IN BUDGETS WIDGET  **************** */
/* ******************************************************************************* */

	//shortens up the main budget title
	$firstBudget = $('body.dashboard .widget_box.budgets .box-content ul li:first-child .info big')
	if ($firstBudget.text().indexOf('Meta geral de despesa') != -1) {
		$firstBudget.text('Geral - despesas')
	}

	//removes empty cents
	$('#user_account_widget_budgets .box-content ul li').each(function() {
		$(this).find('.info p strong').each(function() {
		  if (this.innerText.indexOf(',00') != -1) {
		    $(this).text(this.innerText.substr(0, this.innerText.length - 3))
		  }
		})
	})

/* ******************************************************************************* */
/* ****************************  ADDING MENU ENTRIES  **************************** */
/* ******************************************************************************* */

	var userId = $('.settings .drop-down-box ul li:first a').attr('href')
	userId = userId.substr(1)
	userId = userId.substr(0, userId.indexOf('/'))
	console.log(`User ID: ${userId}`)

	//to be used in the mutation observer below
	function addMenuEntries($header) {
		$header.find('.tools .drop-down-box ul')
			.append($(
				"<li>"+
					"<a href='/"+userId+"/configuracoes/atividades'>Histórico de Atividades</a>"+
				"</li>"
			))

		$header.find('.settings .drop-down-box ul')
			.find('a[href*=categorias]')
			.after($(
				"<li>"+
					"<a href='/"+userId+"/a/contas'>Contas e carteiras</a>"+
				"</li>"+
				"<li>"+
					"<a href='/"+userId+"/cartao-de-credito'>Cartões de Crédito</a>"+
				"</li>"
			))
	}

/* ******************************************************************************* */
/* *******************  DOLLAR SIGN IN INTERNATIONAL ACCOUNTS  ******************* */
/* ******************************************************************************* */

	//to be used in the mutation observer below
	function intoDollars($element) {
	$element = (typeof $element == 'object')? $element : $(this)
	$element
		.text($element.text().replace('R$', '$'))
		.addClass('dollar')
	}

/* ******************************************************************************* */
/* *******************  DOLLAR SIGN IN INTERNATIONAL ACCOUNTS  ******************* */
/* ******************************************************************************* */

	new MutationObserver(function(mutations, observer) {
		//console.count('Mutated')

		//fixing dollar sign on dashboard accounts list
		var $accounts = $('.accounts-list li:not(.currencied)')
		if ($accounts.length > 0) {
		  $accounts.each(function() {
		    //console.count('Looking for a Dollar account')
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
		    $table.find('td.amount:not(.dollar)').each(intoDollars)
				//FIXME: these two are dangerous, as they break data updates from Angular
				//$table.find('.results-detail strong:not(.dollar)').each(intoDollars)
		    //$('.details-transactions td big:not(.dollar), .final-balance strong:not(.dollar)').each(intoDollars)
		  }
		}

		//adding menu entries
		$header = $('body > header')
		if (!$header.hasClass('expanded')) { //a guard so we don't add stuff repeatedly
			addMenuEntries($header)
			$header.addClass('expanded')
		}
	}).observe(document, {
		childList: true,
		subtree: true
	})

	//forcing a mutation on page load
  setTimeout(function() { $('body').addClass('dollarObserver') }, 100)
})
