function showTicketsModal() {
	$('#TicketsModal').modal('show');
}

$(document).ready(function() {
	var hStr = location.hash;

	if (hStr.indexOf('tickets') >= 0) {
		showTicketsModal();
	}
	
	var qStr = window.location.search.substring(1)  
  if (qStr.indexOf('paypal=success') >= 0) {
    $("#ticket-success").removeClass("hidden");
  }
  else if (qStr.indexOf('paypal=cancel') >= 0) {
    $("#ticket-cancel").removeClass("hidden");        	
  }});

$('a[href="#ticktes"]').click(function() {
	showTicketsModal();
	return false;
});

/*
 * $(window).on('hashchange', function() { showTicketsModal(); });
 */

