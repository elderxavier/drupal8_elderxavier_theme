jQuery(document).ready(function ($) {

    var EX = window.EX || {};

    EX.slider = function () {
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
            hdr = $('#home-slider').height();
            $(window).scroll(function () {
                if ($(this).scrollTop() > hdr) {
                    mn.addClass(mns);
                } else {
                    mn.removeClass(mns);
                }
            });
        });
    };

    EX.HomeInit = function () {
        if ($('body.page-node-type-home').length) {
            EX.initSlide();
            EX.menuTop();
            $('.region-breadcrumb').hide();
            $('.main-header').removeClass('header-fixed');
        } else {
            $('#supersized-loader').hide();
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

                if ($(window).scrollTop() > ( height * 0.8) ) {
                    $arrow.css('display', 'block');
                } else {
                    $arrow.css('display', 'none');
                }
            }
        }, 250);
    }
    /*init*/

    EX.init = function () {
        window.onload = function () {

        };
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





    };


    EX.init();

    $(window).load(function () {
        var $container = $('.portfolioContainer');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.portfolioFilter a').click(function () {
            $('.portfolioFilter .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    });





});