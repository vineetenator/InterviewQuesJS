/**
 * @description global.js 
 */
require.config({
    waitSeconds: 140,
    paths: {
        // Libraries
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'require': '../bower_components/requirejs/require',
        'jquery': '../bower_components/jquery/jquery.min',
        'parsley': '../bower_components/parsleyjs/dist/parsley.min',
        'handlebars': '../bower_components/handlebars/handlebars.min',
        'slickCarousel': 'helpers/slick.min',
        'picturefill': '../bower_components/picturefill/dist/picturefill.min',
        'imgZoom': '../bower_components/jquery-zoom/jquery.zoom.min',

        //templates folder
        'templates': '../compiledTemplates',

        'async': '../bower_components/requirejs-plugins/src/async',

        // custom helpers
        'ajaxFactory': 'helpers/ajax.factory',
        'viewportDetect': 'helpers/viewport-detect',
        'utility': 'helpers/global-utility',
        'hbshelpers': 'helpers/handlebars-helpers',
        'matchMedia': 'helpers/matchMedia',
        'typeahead': 'helpers/typeahead',

        //mobile mega menu jQuery Plugin
        'mobileMegaMenu': 'helpers/mobile-mega-menu',

        //global components
        'globalFooter': 'components/global-footer',
        'globalHeader': 'components/global-header',
        'globalCustomComponents': 'components/global-custom-components',

        'cartcheckoutordesummary' : 'components/cart-checkout-order-summary',

        'qtySelector': 'components/global-qty-selector',


        // global minibag
        'globalMinibag': 'components/global-minibag',
        'scrollbar': '../bower_components/jquery-custom-scrollbar/jquery.custom-scrollbar',
        
        //megaMenu
        'globalMegaMenu': 'components/global-mega-menu',
        'globalTilesCarousel': 'components/global-tiles-carousel',

        // pdp components
        'productImagesCarousel': 'components/pdp-product-carousel-zoom',
        'pdpOverview': 'components/pdp-overview',
        'pdpAddtocart': 'components/pdp-addtocart',
        'hybrisJS' : 'hybrisconvertaddon',

        // checkout components
        'checkoutShipping': 'components/checkout-shipping',
        'checkoutConfirmation': 'components/checkout-confirmation',
        'checkoutRevieOrder': 'components/checkout-revieworder',
        'spreedly' : 'iframe-v1.min'

        
    },
    shim: {
        // define JS dependencies here, plugins (non-amd compliant) need this shim config
        'typeahead': {
            deps: ['bootstrap']
        },'bootstrap': {
            deps: ['jquery']
        },
        'globalCustomComponents': {
            deps:['jquery','slickCarousel']
        },
        'matchMedia': {
            deps: ['jquery']
        },
        'globalMegaMenu': {
            deps: ['jquery']
        },
        'globalMinibag': {
            deps: ['jquery']
        },
        'viewportDetect': {
            deps: ['matchMedia']
        },
        'mobileMegaMenu': {
            deps: ['jquery']
        },
        'hybrisJS': {
            deps: ['jquery']
        },
        'handlebars': {
            deps: ['jquery']
        },
        'require': {
            deps: ['jquery']
        },
        'parsley': {
            deps: ['jquery']
        },
        'imgZoom': {
            deps: ['jquery']
        },
        'slickCarousel': {
            deps: ['jquery']
        },
        'scrollbar': {
            deps: ['jquery']
        },
        'spreedly': {
            deps: ['jquery']
        }
    }
});


/**
 * @function Global Module Loader
 * @description : use this for any global functionality
 */
define('global', ['jquery', 'bootstrap', 'utility', 'parsley', 'globalMegaMenu', 'mobileMegaMenu', 'globalFooter', 'globalHeader', 'globalTilesCarousel','globalMinibag','hybrisJS'],
    function($, bootstrap, utility) {
        'use strict';
        var simonGlobal = {
            init: function() {
                this.initVariables();
                this.initAjax();
                this.initCurrentPage();
                utility.initModal();
                utility.imgToSvg();
                utility.floatingLabelsInit();
                this.initEvents();
                this.tooltip();
                this.accordion();
                this.popOver();
            },
            initCurrentPage: function() {
                var pages = $('script[data-page]');
                pages.each(function() {
                    var el = $(this);
                    var list = el.attr('data-page').split(' ');
                    require(list);
                });
            },
            initVariables: function() {},
            initEvents: function() {},
            initAjax: function() {},
            tooltip: function() {
                $('.tooltip-init').tooltip();
            },
            popOver: function(){
                $('.popover-init').tooltip({"trigger":"click"}); 
            },
            accordion: function() {
                var selectHeading = $('.panel > .panel-collapse');
                $(function ($) {
                    selectHeading.on('show.bs.collapse hidden.bs.collapse', function () {
                        $(this).prev().find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
                    })
                });
            }
        }

        $(function() {
            simonGlobal.init();
        });

        return simonGlobal;
    });