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
                return item.el.data('title') + '<small></small>';
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
// due to the partial we need to delay initialization of the carusel
initOwlCarousel = function() {
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

    // Header slider

    $('#h-slider .owl-slider').owlCarousel({
        loop:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        nav:false,
        dots:true,
        smartSpeed:1000,
        slideBy:1,
        margin:20,
        items:1,
        animateOut: 'fadeOut',
    });

    // Kunst slider

    $('#kunst-slider .owl-slider, #total-slider .owl-slider').owlCarousel({
        loop:true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        nav:false,
        dots:true,
        smartSpeed:1000,
        slideBy:1,
        margin:20,
        items:1,
        animateOut: 'fadeOut',
    });
};
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
        var hash = window.location.hash.split('#') ;

            if( hash[1] !== 'undefined'){

                $('.selectpicker option').each(function(){

                    if( $(this).data('filter-value') == '.'+hash[1] ){

                        $container.isotope({ filter: '.'+hash[1] });

                    }
                });
            }
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


$(document).ready(function() {

    if ( $('#tickets, #program').length > 0 ){
        var $iso =  $('#tickets, #program').isotope({
            itemSelector: '.ticket',
            layoutMode: 'fitRows',
        });

        if ( $(window).width()< 768 ){
            $('#select-panel, #box-panel').insertBefore('#tickets');
        }

        $('#select-panel .select').on('click', function () {
            $(this).toggleClass('active');
            var select = $(this).data('select');
            $('#box-panel .'+ select).toggleClass('show');
        });

        $('#box-panel .item').on('click', function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var ctg = $(this).data('filter-value');
            var active = $(this).parent().siblings().find('.active').data('filter-value');
            ctg =  active !== undefined ? ctg+active : ctg ;
            $iso.isotope({ filter: ctg });

            $(this).parent().removeClass('show');
            var select = $(this).parent().data('select');
            $('#select-panel .' + select ).removeClass('active');

            if ($(this).data('filter-value') == '' ){
                $('#select-panel .' + select).removeClass('selected');
            }
            else{
                $('#select-panel .' + select).addClass('selected');
            }
        });
    }

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

let galleryData;
	
	let  galleryShow = (e) => {
		e.preventDefault();
		let year = e.target.innerText;
		let gallery = document.querySelector("#gallery");
		let rowYear = gallery.querySelector(".row-year-" + year);
		
		gallery.querySelectorAll(".row-year").forEach( a => a.style.display = "none");	
		rowYear.style.display = "block";
		
		document.querySelectorAll(".year-pager a").forEach( a => a.className = "");	
		e.target.className = "active";
		
		let msnry = new Masonry( rowYear, {
			itemSelector: '.imgwrp',
			columnWidth:  1,
			transitionDuration: 0
		});		
		
		let addImgs = year => {
			
			if (galleryData[year].length == 0 ){
				rowYear.classList.add('row-load');
				return;
			}
			
			let imgsData = galleryData[year];
			let imgs12 = imgsData.slice(0,12);
			galleryData[year] = galleryData[year].slice(12,);
			
			let imgs12Div = [];				
			 
			imgs12.forEach( imgData => {
				
				let imgwrp = document.createElement('div');
				imgwrp.setAttribute("class", "col-md-3 col-sm-6 imgwrp noload year-" + year);
				imgwrp.style.opacity = 0;								
				
				let src = imgData[0];
				let title = imgData[1];
				
				let galleryItem = document.createElement('div');
				galleryItem.setAttribute("class", "gallery-item fadeIn animated"); 
				
				
				let img = document.createElement('img');
				img.setAttribute("src", src);
				img.setAttribute("alt", title);
				img.setAttribute("class", "img-responsive center-block");
				
				let a = document.createElement('a');
				a.setAttribute("href", src);
				a.setAttribute("data-title", title);
				
				let caption = document.createElement('div');
				caption.setAttribute("class", "caption");
				caption.innerHTML = title;
				
				a.append(caption);
				galleryItem.append(img);
				galleryItem.append(a);
			
				imgwrp.append(galleryItem);			
				imgwrp.classList.remove("noload");					
				
				rowYear.append(imgwrp);
				
				imgs12Div.push(imgwrp);					
				
			});		
			
			gallery.querySelectorAll(".row-year").forEach( a => a.style.display = "none");	
			rowYear.style.display = "block";
			
			let loader = document.createElement('div');
			loader.className = "loading";
			loader.style.width = "100%";
			loader.style.height = "120px";
			loader.style.background = "url(/assets/img/loading.gif) no-repeat 50% 50%";
			loader.style.backgroundSize = "32px";
			
			gallery.append(loader);
			
			imagesLoaded( rowYear, function() {			 
				msnry.appended( imgs12Div );			  
				msnry.layout();	
				gallery.querySelector(".loading").remove();
				addImgs(year);
			});
		}
		
		if (!rowYear.classList.contains('row-load')){			
			addImgs(year);
		}		
	}
	
	let galleryInit = data => {
		galleryData = JSON.parse(data);
		console.log(galleryData);
		
		let ulYears = document.querySelector(".year-pager");
		let gallery = document.querySelector("#gallery");
		gallery.innerHTML = "";
		
		Object.keys(galleryData).sort((a,c) => c - a).forEach(year => {
			let li = document.createElement('li'); 
			let a = document.createElement('a');
			a.innerText = year;
			a.setAttribute("href", "#");
			a.addEventListener("click", galleryShow);
			li.append(a);			
			ulYears.append(li);			
			
			let rowYear = document.createElement('div');
			rowYear.setAttribute("class", "row row-year row-year-" + year);
			rowYear.setAttribute("style", "display:none;");
			gallery.append(rowYear);
		});	
 		document.querySelector(".year-pager a").click();			
 	}	
 	$.post('/gallery.php', galleryInit);

});
