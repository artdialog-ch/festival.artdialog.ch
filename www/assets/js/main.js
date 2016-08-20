function showTicketsModal() {
	$('#TicketsModal').modal('show');
}

function getLang() {
	var q = $('html[lang]');
	return q.length ? q[0].lang : 'de';
}

var ticketATagSelector = 'a[href="#tickets"]';

function getEventId(aTag) {
	aTag = aTag || $(ticketATagSelector)[0];
	return aTag.id.match(/buyAticket-(.+)/)[1];
}

function loadTicketsModal(eventId)
{
	if ($('#' + eventId).length) {
		showTicketsModal();
	}
	else {
		doLoadTicketsModal(eventId);
	}
}

function doLoadTicketsModal(eventId)
{
	var lang = getLang();
	var loadurl = "payment-popup.php?eventid=" + encodeURIComponent(eventId) + "&lang=" + encodeURIComponent(lang);
	$("#TicketsModal").load(loadurl + "#" + eventId, function( response, status, xhr ) {
	  if ( status != "error" ) {
	  	showTicketsModal();
	  }
	  else
	  {
	  	$("#ticket-cancel").removeClass("hidden");
	  }
	});
}

$(document).ready(function() {
	var hStr = location.hash;
	getLang();

	if (hStr.indexOf('tickets') >= 0) {
		loadTicketsModal(getEventId());
	}

	var qStr = window.location.search.substring(1)
  if (qStr.indexOf('paypal=success') >= 0) {
    $("#ticket-success").removeClass("hidden");
  }
  else if (qStr.indexOf('paypal=cancel') >= 0) {
    $("#ticket-cancel").removeClass("hidden");
  }});

$(ticketATagSelector).click(function() {
	var eventId = getEventId(this);
	loadTicketsModal(eventId);
	return false;
});

$( document ).ready(function() {
		var partNavBar = $('#partial-nav-bar')
		if (partNavBar.length > 0)
		{
				partNavBar.load("partial/nav-bar.html", function() {

				$(this).children(':first').unwrap();

				var href = document.location.href;
				var filename = href.substr(href.lastIndexOf('/') + 1);

				if (/detail_.+/.test(filename)) filename = "programm.html"

				$("a[href='" + filename + "']").parent().addClass("active")
			});
		}
});
