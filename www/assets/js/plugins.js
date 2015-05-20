// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// roatating text 

(function($) {
    $.fn.extend({
        rotaterator: function(options) {

            var defaults = {
                fadeSpeed: 5000,
                pauseSpeed: 5000,
                child: null
            };

            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var obj = $(this);
                var items = $(obj.children(), obj);
                items.each(function() {
                    $(this).hide();
                })
                if (!o.child) {
                    var next = $(obj).children(':first');
                } else {
                    var next = o.child;
                }
                $(next).fadeIn(o.fadeSpeed, function() {
                    $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
                        var next = $(this).next();
                        if (next.length == 0) {
                            next = $(obj).children(':first');
                        }
                        $(obj).rotaterator({
                            child: next,
                            fadeSpeed: o.fadeSpeed,
                            pauseSpeed: o.pauseSpeed
                        });
                    })
                });
            });
        }
    });
})(jQuery);

$(document).ready(function() {
    $('#rotate').rotaterator({
        fadeSpeed: 1000,
        pauseSpeed: 3000
    });


});





// Magnific-Popup
$(document).ready(function() {
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            //tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title') + '<small></small>';
            }
        }

    });
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
});

// Owl Carousel

$('.logos').owlCarousel({

    loop: true,
    autoplay: true,
    margin: 10,
    nav: false,

    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
});
$('.aktuell').owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',


    items: 1,
    loop: true,
    autoplay: true,
    margin: 10,
    nav: false

});

$('#slider-sm-12').owlCarousel({
	animateOut: 'fadeOut',
	animateIn: 'fadeIn',
	items:1,
    margin:30,
	autoplay: true,
	autoplayTimeout: 3000,
	loop:true,
    stagePadding:15,
    smartSpeed:450

});

// smooth scroll

$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

// isotope

$(function() {

    var $container = $('#program'),
        filters = {};
		
	if ( $container.length !== 0 ){ 

    $container.isotope({
        itemSelector: '.isotope-item'
    });

    // filter buttons
    $('select').change(function() {
        var $this = $(this);

        // store filter value in object
        // i.e. filters.color = 'red'
        var group = $this.attr('data-filter-group');

        filters[group] = $this.find(':selected').attr('data-filter-value');
        // console.log( $this.find(':selected') )
        // convert object into array
        var isoFilters = [];
        for (var prop in filters) {
            isoFilters.push(filters[prop])
        }
        console.log(filters);
        var selector = isoFilters.join('');
        $container.isotope({
            filter: selector
        });
        return false;
    });
	
}

    // $('ul>li').click(function() {
    //     var $this = $(this);
    //     var group = $this.parent().data('filter-group');
    //     filters[group] = $this.data('filter-value');
    //     var isoFilters = [];
    //     for (var prop in filters) {
    //         isoFilters.push(filters[prop])
    //     }
    //     console.log(filters);
    //     var selector = isoFilters.join('');
    //     $container.isotope({
    //         filter: selector
    //     });
    //     return false;
    // });


});

/* Ajax mail send */ 


$(document).ready(function() {
	$("#contact-submit").click(function() {
		var proceed = true;		
		
		// Checking for blank fields.
		$("#contact input[required=true], #contact textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ //if this field is empty 
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag              
            }   
        });				
		
		if(proceed){			
			//get input field values data to be sent to server
            post_data = {
                'name'     		: $("#contact-name").val(), 
                'email'    		: $("#contact-email").val(), 
				'emailsubject'  : $("#contact-subject").val(), 
                'message' 		: $("#contact-message").val() 
            };
			
			$.post("../contact/form-handler.php", post_data, function(data) {
				if (data !== 'Error. Please try again.') {		
					$("#returnmessage").addClass("show fadeInDown").delay(3000).queue(function(){
						$(this).removeClass("fadeInDown").addClass("fadeOutUp").dequeue();
						$("#contact")[0].reset(); // To reset form fields on success.
					});	
				}
				else{
					$("#returnmessage .returnmessage-inner").html("Übermittlung Ihrer Nachricht ist aus technischen Gründen vorübergehend nicht möglich.");
					$("#returnmessage").addClass("show fadeInDown").delay(3000).queue(function(){
						$(this).removeClass("fadeInDown").addClass("fadeOutUp").dequeue();						
					});
					
				}
			});
			
		}
		
		return false;
	});
});

$(document).ready(function() {

 

	function ajaxgallery( yy ){

		yy = typeof yy !== 'undefined' ? yy : 2014;

 

$.post('/de/gallery.php',{ year: yy}, function(data) {

var items = $(data).find('#gal-items.row .' + yy);

var years = $(data).find('#gal-filters .year');

$('#gallery .row').remove();

$('#gallery').append('<div class="row" />');

$('.year-pager').html(years);

var j = 0;

var i = 0;

var container = $('#gallery .row');

container.masonry({

  itemSelector: '.col-md-3',

  columnWidth:  1,

}); 

 

galadditems(j);

 

function galadditems(j){

i = 12*j; 

var elem = items.slice(i, i+12);

elem.each(function(){

$(this).attr('style', 'opacity:0');

});

container.append(elem); 

container = $('#gallery .row').imagesLoaded( function() { 

container.masonry('appended',elem); 

$('.gal-items-end').remove();

$('#gallery').append('<div class="gal-items-end" />'); 

$('.gal-items-end').viewportChecker({

offset:-200, 

callbackFunction:function(elem, action){

j++;

if(i < items.length ){

galadditems(j); 

}

}

}); 

});

}

 

$('.year-pager a').on('click', function(event){

event.preventDefault();

ajaxgallery($(this).text());

});

$('.year-pager a').each(function(){

if ($(this).text() == yy){ 

$(this).addClass('active');

} 

});

});

}

 

if ($('#gallery').length !== 0){

ajaxgallery();

}

 

});