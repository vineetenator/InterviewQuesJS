/**
 * @function : rlutility
 * @description : use this for global email subscription modal functionality
 */
define(['jquery', 'ajaxFactory', 'typeahead','globalMegaMenu', 'viewportDetect'], function($, ajaxFactory, typeahead,globalMegaMenu, viewportDetect) {
    'use strict';
    var cache;
    var globalHeader = {
        init: function() {
            this.initVariables();
            this.initEvents();
            this.initAjax();
            this.initSearchEvent();
            this.setMobileMenuPosition();
            this.fixedHeader();
        },
        initVariables: function() {
            cache = {
                $document : $(document),
                $searchInput: $('#searchInput'),
                $blurScreenDiv : $('.mega-menu-blur'),
                $headerSearchContainer: $('.simon-header-search'),
                $topHeaderPromo : $('#topHeaderPromo'),
                $mobileMegaMenu: $('.mobile-mega-menu'),
                $tickerCounter : 0,
                $window: $(window),
                $headerContainer : $('.js-mainHeader'),
                $body: $('body'),
                $megaMenuBar : $('.simon-md-mega-menu')
            }
        },
        initAjax: function() {},
        initEvents: function() {
            cache.$document.on('searchSuggestion', globalHeader.suggestionOverlay);
            cache.$document.on('click', '#promoTickerBack', 'back', globalHeader.initTopPromoTicker);
            cache.$document.on('click', '#promoTickerFwd', 'fwd', globalHeader.initTopPromoTicker);
            cache.$document.on('click', '#promoTickerClose', globalHeader.closePromoTicker);
        },
        fixedHeader: function(){
            var lastScrollTop = 0,
            viewPort = viewportDetect.lastClass,
            marginTop = cache.$headerContainer.height(),
            mobileHeaderFixed = false;
            cache.$window.on('scroll', function() {
                var st = $(this).scrollTop();
                if(st < lastScrollTop && viewPort === 'large') {
                    cache.$headerContainer.addClass('navbar-fixed-top');
                    cache.$body.css('padding-top', marginTop+'px');

                }
                if(viewPort === 'small' && marginTop < st){
                    cache.$body.css('padding-top', marginTop+'px');
                    cache.$headerContainer.addClass('navbar-fixed-top');
                    if(mobileHeaderFixed === false){
                        mobileHeaderFixed = true;
                        cache.$megaMenuBar.hide();
                        cache.$headerContainer.hide().fadeIn(500);    
                    }

                    if(st < lastScrollTop){
                        cache.$megaMenuBar.fadeIn();
                    }
                }

                if(st === 0){
                    mobileHeaderFixed = false;
                    cache.$headerSearchContainer.show();
                    cache.$headerContainer.removeClass('navbar-fixed-top');
                    cache.$body.removeAttr('style');                    
                }
                lastScrollTop = st;
            });
        },
        setMobileMenuPosition: function(){
            var marginTop = cache.$headerContainer.height();
            cache.$mobileMegaMenu.css('top', marginTop-68+'px');
        },
        closePromoTicker: function(){
            cache.$topHeaderPromo.slideUp( 200, function() {
                $(this).addClass('hide');
            });
            globalHeader.setMobileMenuPosition();
        },
        initTopPromoTicker: function(elm){
            var promoItems = cache.$topHeaderPromo.find('p');

            if(elm.data === 'back'){
                cache.$tickerCounter--;
            }else{
                cache.$tickerCounter++;
            }

            if(promoItems.length <= cache.$tickerCounter){
                cache.$tickerCounter = 0;
            }
            if(cache.$tickerCounter < 0){
                cache.$tickerCounter = promoItems.length-1;
            }
            cache.$topHeaderPromo.find('.ticker-showing').text(cache.$tickerCounter+1);
            promoItems.hide();
            promoItems.eq(cache.$tickerCounter).show();
        },
        initSearchSuggestionsAjax: function(query, process) {
            var options = {
                'methodType': 'GET',
                'methodData': {'query': query},
                'dataType': 'JSON',
                'url': '/simonstorefront/_ui/responsive/simon-fe-build/json/typeahead.json',
                'isShowLoader': false,
                'cache' : true
            }
            ajaxFactory.ajaxFactoryInit(options, function(response){
                return process(response);
            });
        },
        initSearchEvent: function(){
            cache.$searchInput.typeahead({
                source: function(query, process){
                    return globalHeader.initSearchSuggestionsAjax(query, process);
                },
                items: 5,
                afterSelect: function(){
                    //write on select functonility here.
                }
            });
        },
        suggestionOverlay: function(e, val){
            var marginTop = cache.$headerContainer.height();
            if(val === 'hide'){
                cache.$blurScreenDiv.removeClass('in menu-is-open');
                cache.$headerSearchContainer.removeClass('dropdown-shown');
            }else{
                cache.$blurScreenDiv.addClass('in menu-is-open');
                cache.$headerSearchContainer.addClass('dropdown-shown');
            }
            cache.$blurScreenDiv.css({
                height: cache.$document.height()-marginTop+'px',
                top: marginTop+'px',
            });
        }
    }
      
    $(function() {
        globalHeader.init();
    });

    return globalHeader;
});