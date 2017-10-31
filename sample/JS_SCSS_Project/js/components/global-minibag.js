/**
 * @function : rlutility
 * @description : use this for global email subscription modal functionality
 */
define(['jquery', 'templates/minicart.tpl', 'handlebars', 'ajaxFactory', 'utility', 'hbshelpers', 'viewportDetect'], 
    function($, miniCartTemplate, handlebars, ajaxFactory, utility, hbshelpers, viewportDetect) {
    'use strict';
    var cache = {};
    var globalMinibag = {
        init: function() {
            this.initVariables();
            this.initEvents();
            this.initAjax();
            this.initMiniBagAjax();
            this.initBlurScreen();
        },
        initVariables: function() {
            cache = {
                $document: $(document),
                $window: $(window),
                $minbagIcon: $('.minicart'),
                $miniBag: $('.mini-cart'),
                $megaMenuBlur: $('.mega-menu-blur'),
                $megaMenuArea: $('.mini-cart-area'),
                $minbagContainer: $('#miniCartItems'),
                $dropDown: $('.mini-cart.dropdown'),
                $APIdataUrl: $('#miniCartItems').attr("data-url"),
                $isMinicartOpen :false
            }
        },
        initAjax: function() {},
        initEvents: function() {
             cache.$document.on('mouseover', '.minicart',function(){
                if(!cache.$isMinicartOpen){
                    globalMinibag.initMiniBagAjax();
                    cache.$isMinicartOpen =true;
                }

             });
        },
        initBlurScreen: function() {
            cache.$miniBag.on('hide.bs.dropdown', function() {
                utility.pageScreenBlurOnHeaderLinks('hide');
            });
            cache.$miniBag.on('show.bs.dropdown', function() {
                utility.pageScreenBlurOnHeaderLinks('show');
            });
            cache.$megaMenuArea.on('click', function(e) {
                e.stopPropagation();
            });
           
        },
        initMiniBagAjax: function() {
            var options = {
                'methodType': 'GET',
                'dataType': 'JSON',
                'url': cache.$APIdataUrl,
                'isShowLoader': false,
                'cache': true
            }
            ajaxFactory.ajaxFactoryInit(options, globalMinibag.initMiniBag);
        },
        initMiniBag: function(response) {
            function addScroll(){
                var heightofdiv = window.innerHeight - ($('.js-mainHeader').height() - $('.simon-md-mega-menu').height());
                heightofdiv = heightofdiv - 177;
                var currentHeight = $('.item-cart').height()-177;
                if (currentHeight > heightofdiv) {
                    $('.scrollablediv').css('height', heightofdiv-10 + 'px');
                }
            }

            var viewPort = viewportDetect.lastClass;
            cache.$minbagContainer.html(miniCartTemplate(response));
            if (response.totalUnitCount > 0) {
                $('.minicart span').html(response.totalUnitCount);
                $('.minicart').addClass('active');
            }

            $('.itemcount').on('click', function() {
                $(this).next('.product-container').collapse('toggle');
            });
            cache.$dropDown.on('show.bs.dropdown', function() {
                $(this).find('.dropdown-menu').first().stop(true, true).slideDown(400, addScroll);
            });
            cache.$dropDown.on('hide.bs.dropdown', function(e) {
                e.preventDefault();
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp(400, function() {
                    cache.$dropDown.removeClass('open');
                    cache.$dropDown.find('.dropdown-toggle').attr('aria-expanded', 'false');
                });
            });

            if(viewPort === 'large'){
                $('.navbar .mini-cart').hover(function() {
                    $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown(400, addScroll);
                    utility.pageScreenBlurOnHeaderLinks('show');
                }, function() {
                    $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp()
                    utility.pageScreenBlurOnHeaderLinks('hide');
                    cache.$isMinicartOpen =false;
                });
            }

            $('.product-container').on('show.bs.collapse hidden.bs.collapse', function() {
                $(this).prev('.itemcount').toggleClass('plus-icon');
            })
            
            addScroll();
            $('.tooltip-init').tooltip();
        }
    };
    $(function() {
        globalMinibag.init();
    });
    return globalMinibag;
});