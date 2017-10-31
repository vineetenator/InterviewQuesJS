/**
 * @function : rlutility
 * @description : use this for global email subscription modal functionality
 */
define(['jquery', 'utility'], function($, utility) {
    'use strict';
    var cache;
    var globalfooter = {
        init: function() {
            this.initVariables();
            this.initEvents();
            this.initAjax();
            this.mobileFooterAccordian();
            this.checkReturningUser();
        },
        initVariables: function() {
            cache = {
                $document : $(document),
                $mobileAccLinks : $('.mobile-acc-links')
            }
        },
        initAjax: function() {},
        initEvents: function() {
            cache.$document.on('click', '#acceptCookieBtn', globalfooter.footerAcceptCookie);
        },
        checkReturningUser: function(){
           if(utility.getCookie('spoReturningUser') === null){
                $('#footerCookiesComponent').removeClass('hide');    
           }
        },
        footerAcceptCookie: function() {
            utility.setCookie('spoReturningUser', 'true')    
            $('#footerCookiesComponent').addClass('hide');
        },
        mobileFooterAccordian: function() {
                if (cache.$document.width() < 992) {
                    cache.$mobileAccLinks.collapse('hide');
                    cache.$document.on('click', '.mobile-footer-accordian', function() {
                        $(this).next('ul').collapse('toggle');
                    });

                    cache.$mobileAccLinks.on('show.bs.collapse hidden.bs.collapse', function() {
                        $(this).prev('.mobile-footer-accordian').toggleClass('minus-icon');
                    })
                }
            }
    }
      
    $(function() {
        globalfooter.init();
    });

    return globalfooter;
});