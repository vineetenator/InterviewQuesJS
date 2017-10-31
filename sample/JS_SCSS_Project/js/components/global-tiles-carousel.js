/**
 * @function : rlutility
 * @description : use this for global tiles carousel functionality
 */
define(['jquery','slickCarousel','viewportDetect'], function($, slickCarousel, viewportDetect){
    'use strict';
    var cache;
    var globalTilesCarousel = {
        init: function() {
            this.initVariables();
            this.initEvents();
            this.initAjax();
            this.globalTilesCarousel();
        },
        initVariables: function() {
            cache = {
                $globalTilesCarousel :$("#globalTilesCarousel")
            }
        },
        initAjax: function() {},
        initEvents: function() {},
        globalTilesCarousel : function () {
            var viewPort = viewportDetect.lastClass;
            if(viewPort === 'small'){
                cache.$globalTilesCarousel.slick({
                    autoplay: true,
                    autoplaySpeed: 3000,
                    slidesToShow: 2,
                    arrows: false,
                    dots: true
                });
            }
        }

    };
    $(function() {
        globalTilesCarousel.init();
    });
    return globalTilesCarousel;
});