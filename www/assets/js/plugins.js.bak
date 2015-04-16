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
})
$('.aktuell').owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',


    items: 1,
    loop: true,
    autoplay: true,
    margin: 10,
    nav: false

})

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
