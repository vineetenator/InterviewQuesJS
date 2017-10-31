define('pages/homepage', ['hbshelpers', 'slickCarousel', 'viewportDetect','globalCustomComponents'],
    function(hbshelpers, slickCarousel, viewportDetect,globalCustomComponents) {
        'use strict';
        var cache;
        var Homepage = {
            init: function() {
                this.initVariables();
                this.initEvents();
                this.initAjax();
                this.homepageCarousal();
                globalCustomComponents.socialShopCarousel(cache.$carousalFooter);
                
            },
            initVariables: function() {
                cache = {
                    $window :$(window),
                    $carousalFooter : $('#carousalFooter'),
                    $homepageCarousel : $('#homepageCarousel')
                }
            },
            initAjax: function() {},
            initEvents: function() {
                cache.$window.on('resize',Homepage.viewportWindowResize);
            },
            homepageCarousal:function(){
                cache.$homepageCarousel.find('.tail-hide').removeClass('tail-hide');
                var options = {
                    autoplay: true,
                    autoplaySpeed: 3000,
                    slidesToShow: 1,
                    infinite: true,
                    arrows: true,
                    dots: true,
                    draggable: true,
                    pauseOnHover: true,
                    swipe: true,
                    touchMove: true,
                    speed: 300,
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
                globalCustomComponents.heroCarousel(cache.$homepageCarousel, options);
            },


            viewportWindowResize:function(){
                if(viewportDetect.lastClass==='small'){
                    globalCustomComponents.socialShopCarousel(cache.$carousalFooter);
                }
                else{
                    if ($('#carousalFooter').hasClass('slick-initialized')) {
                        $('#carousalFooter').slick('destroy');
                    }   
                }

            }
        };

        $(function() {
            Homepage.init();
        });
    });