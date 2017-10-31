define('pages/plp', ['hbshelpers', 'slickCarousel', 'viewportDetect','globalCustomComponents'],
    function(hbshelpers, slickCarousel, viewportDetect,globalCustomComponents) {
        'use strict';
        var cache;
        var plp = {
            init: function() {
                this.initVariables();
                this.initEvents();
                this.clpCarousal();
                this.plpSearchMobileCarousal();
                if(viewportDetect.lastClass === 'small'){
                    this.colorSwitchesMobile();
                }else{
                    this.colorSwitchesCarousal();
                }
                this.plpFilter();
                globalCustomComponents.socialShopCarousel(cache.$carousalFooter);
                
            },
            initVariables: function() {
                 cache = {
                    $document : $(document),
                    $carousalFooter : $('#carousalFooter'),
                    $homepageCarousel : $('#homepageCarousel'),
                    $plpSearchMobileCarousal : $('.initCarouselMobile'),
                    $dropdownAccordion : $('.dropdown-accordion'),
                    $colorSwitchesCarousal : $('.color-switches-carousal'),
                    $dropdownMenu : $('ul.dropdown-menu')
                }
            },
            initEvents: function() {
                //init expand text
                plp.plpExpandText();
                plp.openActiveLink();
            },
            clpCarousal:function(){
                var options = {
                    autoplay: true,
                    autoplaySpeed: 3000,
                    slidesToShow: 1,
                    arrows: false,
                    infinite: true,
                    dots: true,
                    draggable: true,
                    pauseOnHover: true,
                    swipe: true,
                    touchMove: true,
                    speed: 300,
                    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    adaptiveHeight: false,
                    prevArrow: '<button class="slick-prev"></button>',
                    nextArrow: '<button class="slick-next"></button>',
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                arrows: false
                            }
                        }
                    ]
                }
                globalCustomComponents.heroCarousel(cache.$homepageCarousel, options);
                cache.$homepageCarousel.find('.tail-hide').removeClass('tail-hide');
            },

            // Tiles Carousal
            colorSwitchesCarousal:function(){
                var options = {
                    autoplay: false,
                    autoplaySpeed: 3000,
                    slidesToShow: 4.5,
                    arrows: true,
                    infinite: false,
                    dots: false,
                    draggable: true,
                    pauseOnHover: true,
                    swipe: true,
                    touchMove: true,
                    speed: 300,
                    singleItem: true,
                    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    adaptiveHeight: true,
                    prevArrow: '<button class="slick-prev"></button>',
                    nextArrow: '<button class="slick-next"></button>',
                    responsive: [
                        {
                            breakpoint: 991,
                            settings: {
                                arrows: false
                            }
                        }
                    ]
                }
                
                globalCustomComponents.heroCarousel(cache.$colorSwitchesCarousal, options);

                // Hide first arrow of carousal
                cache.$colorSwitchesCarousal.find('.slick-prev').hide();
                cache.$colorSwitchesCarousal.find('.slick-next').on('click', function() {
                    $(this).closest(cache.$colorSwitchesCarousal).find('.slick-prev').show();                     
                });
            },

            // Tiles Carousal
            colorSwitchesMobile:function(){
                if ( (viewportDetect.lastClass === 'small') && ($("div").hasClass('color-switches-carousal')) ) {
                        // Adding class for mobile
                        cache.$colorSwitchesCarousal.addClass('color-switches-mobile');
                        cache.$colorSwitchesCarousal.append("<span class='count'></span>");  
                        cache.$colorSwitchesCarousal.each(function() {
                            var length = $(this).find('.item').length;
                            $('.count').html('+'+(length-3));
                        });
                }
            },

            // Tiles Filter Accordion
            plpFilter: function() {
                // Collapse accordion every time dropdown is shown
                cache.$dropdownAccordion.on('show.bs.dropdown', function (event) {
                  var accordion = $(this).find($(this).data('accordion'));
                  accordion.find('.panel-collapse.in').collapse('hide');    
                });

                // Prevent dropdown to be closed when we click on an accordion link
                cache.$dropdownAccordion
                    .off('click.dropdownAccordion')
                    .on('click.dropdownAccordion', 'a[data-toggle="collapse"]', function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $($(this).data('parent')).find('.panel-collapse.in').collapse('hide');
                        $($(this).attr('href')).collapse('show');
                    });

                // Stopping Filter dropdown to close
                cache.$dropdownMenu
                    .off('click.dropdownMenu')
                    .on('click.dropdownMenu', '.panel-body', function(event) {
                        event.stopPropagation();
                    });



                // Mobile viewport - expand collapse
                    var viewPort = viewportDetect.lastClass;
                    if(viewPort === 'small') {
                    $('.plp-filters-modal .panel-title').on('click', function() {
                        $(this).closest('.panel').find('.panel-collapse').toggleClass('in').css('height','inherit');
                        $(this).closest('.panel').siblings().find('.panel-collapse').removeClass('in');
                    });
                }

            },

            //this is used to expand plp categories link
            plpExpandText: function () {
                if (cache.$document.width() < 992) {
                    $('.truncated').hide()
                        .after('<span class="more-option">See More</span>')
                        .next().on('click', function () {
                        $(this).toggleClass('icon-minus-sign').prev().toggle();
                        $('#ellipsisText').toggleClass('hide-ellipsis')
                    });
                }
            },

            //this is used to init carousal on plp and search page
            plpSearchMobileCarousal:function() {
                var viewPort = viewportDetect.lastClass;
                if(viewPort === 'small') {
                    cache.$plpSearchMobileCarousal.slick({
                        autoplay: true,
                        autoplaySpeed: 3000,
                        slidesToShow: 2,
                        arrows: false,
                        dots: true
                    });
                }
            },
            openActiveLink: function(){
                var $parents = $('.left-menu .active:first')
                                    .parentsUntil('.left-menu')
                                    .filter('li.has-level-1, li.has-level-2');
                
                $parents.each(function(){
                    $(this).children('.accordion-menu').click();	
                });
            }


        };

        $(function() {
            plp.init();
        });
    });