/**
 * @function : rlutility
 * @description : use this for global tiles carousel functionality
 */
define(['jquery','slickCarousel','viewportDetect'], function($, slickCarousel, viewportDetect){
    'use strict';
    var globalCustomComponents = {
        init: function() {
            this.initVariables();
            this.initEvents();
            this.initAjax();
            this.homepageCarousel();
        },
        initVariables: function() {},
        initAjax: function() {},
        initEvents: function() {},

        heroCarousel: function(elem, options) {
                elem.slick(options);
        },
        socialShopCarousel: function(elem) {
            var viewPort = viewportDetect.lastClass;
            if (viewPort === 'small') {
                elem.slick({
                    arrows: false,
                    dots: false,
                    slidesToShow: 1.3,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    draggable: true,
                    infinite: false,
                    pauseOnHover: true,
                    swipe: true,
                    touchMove: true,
                    speed: 300,
                    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    adaptiveHeight: true
                });
            }
        }        
    };
    
    return globalCustomComponents;
});