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

				if (initOwlCarousel) initOwlCarousel();
			});
		}


    // Back to Top
		var footer = $('body > footer')
		if (footer.length > 0)
		{
			//alert($('footer > *').first();
			footer.load("partial/footer.html footer", function() {
				$(this).children(':first').unwrap();

                var wh = $(window).height();
                var footer_height = $('body > footer').height();
                var header_height = $('body > header').height();

                $('body > .main').css('min-height', wh - footer_height - header_height);

                $(document).scroll(function(){
                    if ($(window).scrollTop()>400){
                        $("#back-to-top").addClass('show');
                    }
                    else{
                        $("#back-to-top").removeClass('show');
                    }
                });

                $("#back-to-top").click(function(){
                    $('body,html').animate({scrollTop:0},1000);
                    return false;
                });

			});


		}

		// Social icon

		var soc = '<div id="social-bar">' +
			'<div class="social fb"><a href="https://www.facebook.com/festivalartdialog" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a></div>' +
			'<div class="social tw"><a href="https://twitter.com/artdialogfest" target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a></div>' +
			'<div class="social tw"><a href="https://www.instagram.com/festival.artdialog" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></div>' +
			'</div>';

    	$(window).width() < 768 ? $('body > header').append(soc) : $('.aside').append(soc);

		$(window).on('resize', function() {
            $(window).width() < 768 ? $('#social-bar').appendTo('body > header'): $('#social-bar').appendTo('.aside');
		});

});
