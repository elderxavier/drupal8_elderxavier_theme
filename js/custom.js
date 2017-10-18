jQuery(document).ready(function ($) {

    var EX = window.EX || {};

    EX.slider = function () {
        if (!$('body.page-node-type-home').length) {
            return;
        }
        $.supersized({
            // Functionality
            slideshow: 1,
            autoplay: 1,
            start_slide: 1,
            stop_loop: 0,
            random: 0,
            slide_interval: 12000,
            transition: 1,
            transition_speed: 300,
            new_window: 1,
            pause_hover: 0,
            keyboard_nav: 1,
            performance: 1,
            image_protect: 1,
            min_width: 0,
            min_height: 0,
            vertical_center: 1,
            horizontal_center: 1,
            fit_always: 0,
            fit_portrait: 1,
            fit_landscape: 0,
            slide_links: 'blank',
            thumb_links: 0,
            thumbnail_navigation: 0,
            slides: [
                {image: 'themes/drupal8_elderxavier_theme/img/slider-images/image01.jpg', title: '<div class="slide-content">PROGRAMADOR / WEB DEVELOPER</div>', thumb: '', url: ''},
                {image: 'themes/drupal8_elderxavier_theme/img/slider-images/image02.jpg', title: '<div class="slide-content">MAGENTO DEVELOPER</div>', thumb: '', url: ''},
                {image: 'themes/drupal8_elderxavier_theme/img/slider-images/image03.jpg', title: '<div class="slide-content">DOMINIO DE DIVERSAS LINGUAGENS</div>', thumb: '', url: ''},
                {image: 'themes/drupal8_elderxavier_theme/img/slider-images/image04.jpg', title: '<div class="slide-content">E-CCOMERCE DEVELOPER</div>', thumb: '', url: ''},
                {image: 'themes/drupal8_elderxavier_theme/img/slider-images/image05.jpg', title: '<div class="slide-content">WEB DEVELOPER</div>', thumb: '', url: ''}
            ],
            // Theme Options			   
            progress_bar: 0, // Timer for each slide							
            mouse_scrub: 0

        });

    };

    EX.initSlide = function () {
        $(function (a) {
            EX.slider();
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            a(document).ready(function () {
                if ($(window).width() > 767) {

                    $("#home-slider").append($('#supersized'));
                    $("#home-slider").height(height);
                }
            });
            a(window).resize(function () {
                if ($(window).width() > 767) {
                    $("#home-slider").append($('#supersized'));
                    $("#home-slider").height(height);
                }
            });

        });
    };

    EX.menuTop = function () {
        $('.header').removeClass('header-fixed');
        $(document).scroll(function () {
            var mn = $(".main-header");
            mns = "header-fixed";
            hdr = $('#home-slider').height() || $('#particles-js').height();
            //$(window).scroll(function () {
            if ($(this).scrollTop() > hdr) {
                mn.addClass(mns);
            } else {
                mn.removeClass(mns);
            }
            //});
        });
    };

    EX.HomeInit = function () {
        EX.menuTop();
        if ($('body.page-node-type-home').length) {
            EX.initSlide();
            $('.region-breadcrumb').hide();
        } else {
            $('#supersized li').remove();
            $('#supersized').addClass('ul-particles');
            $('#supersized').append('<li class="li-particles"></li>');
            $('#supersized-loader').hide();
            pagetitle = $('title:eq(0)').html();
            pagetitle = pagetitle.split("|")[0] || pagetitle || "";
            $('#supersized li').append('<div class="container"><h1>' + pagetitle + '</h1></div>');
            particle = $('#particles-js');
            $('#particles-js').remove();
            $('#supersized li').append(particle);
        }
    };
    EX.NextSlide = function () {
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        $('#nextsection').click(function (e) {
            $('body,html').animate({scrollTop: height + ""}, 750, 'easeOutExpo');
            e.preventDefault();
        });
    };
    EX.scrollToTop = function () {
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var windowWidth = $(window).width();
        var didScroll = false;
        var $arrow = $('#back-to-top');
        $arrow.click(function (e) {
            $('body,html').animate({scrollTop: "0"}, 750, 'easeOutExpo');
            e.preventDefault();
        })

        $(window).scroll(function () {
            didScroll = true;
        });

        setInterval(function () {
            if (didScroll) {
                didScroll = false;

                if ($(window).scrollTop() > (height * 0.8)) {
                    $arrow.css('display', 'block');
                } else {
                    $arrow.css('display', 'none');
                }
            }
        }, 250);
    }


    EX.fadeinWrapperOverlay = function () {        
        if ($(window).width() < 767) {
            $('.wrapper-overlay').addClass('fadeInUp');
        } else {
            $('.wrapper-overlay').removeClass('fadeInUp');
            $(document).scroll(function () {
                try {
                    var mn = $(".wrapper-overlay");
                    mnr = "fadeOutDown";
                    mns = "fadeInUp";
                    hdr = mn.offset().top;
                    if ($(this).scrollTop() >= (hdr * 0.3)) {
                        mn.removeClass(mnr);
                        mn.addClass(mns);
                    } else {
                        mn.removeClass(mns);
                        mn.addClass(mnr);
                    }
                } catch (err) {
                    return;
                }

            });
        }
    };

    EX.filters = function () {
        if ($('#projects').length > 0) {
            var $container = $('#projects');

            $container.imagesLoaded(function () {
                $container.isotope({
                    // options
                    animationEngine: 'best-available',
                    itemSelector: '.item-thumbs',
                    layoutMode: 'fitRows'
                });
            });

            // filter items when filter link is clicked
            var $optionSets = $('#options .option-set'),
                    $optionLinks = $optionSets.find('a');

            $optionLinks.click(function () {
                var $this = $(this);
                // don't proceed if already selected
                if ($this.hasClass('selected')) {
                    return false;
                }
                var $optionSet = $this.parents('.option-set');
                $optionSet.find('.selected').removeClass('selected');
                $this.addClass('selected');

                // make option object dynamically, i.e. { filter: '.my-filter-class' }
                var options = {},
                        key = $optionSet.attr('data-option-key'),
                        value = $this.attr('data-option-value');
                // parse 'false' as false boolean
                value = value === 'false' ? false : value;
                options[ key ] = value;
                if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                    // changes in layout modes need extra logic
                    changeLayoutMode($this, options)
                } else {
                    // otherwise, apply new options
                    $container.isotope(options);
                }

                return false;
            });
        }
    }
    /*init*/

    EX.init = function () {
        $(function () {
            var includes = $('[data-include]');
            jQuery.each(includes, function () {
                var file = '/themes/drupal8_elderxavier_theme/content-body/' + $(this).data('include');
                $(this).load(file);
            });
        });
        $(window).load(function () {
            $('#block-page-ui').addClass('hidden');
            EX.fadeinWrapperOverlay();
            EX.filters();
        });
        
        
        $(function () {
            //Main menu
            $('#main-menu').smartmenus();

            //Mobile menu toggle
            $('.navbar-toggle').click(function () {
                $('.region-primary-menu').slideToggle();
            });

            //Mobile dropdown menu

            if ($(window).width() < 767) {
                $(".region-primary-menu li a:not(.has-submenu)").click(function () {
                    $('.region-primary-menu').hide();
                });
                $('#supersized-loader').hide();

            } else {
                EX.HomeInit();
            }

            EX.NextSlide();
            EX.scrollToTop();
            
            

        });
        window.onbeforeunload = function () {
            $('#block-page-ui').removeClass('hidden');
        }
    };


    EX.init();



});