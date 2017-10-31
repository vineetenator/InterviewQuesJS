/**
 * @function : rlutility
 * @description : use this for global email subscription modal functionality
 */
define(['jquery'], function($){
    'use strict';
    var cache = {};
    var checkoutConfirmation = {
        init: function() {
            this.initVariables();
            this.initEvents();
            this.initAjax();
            this.checkoutOrderSummaryAccordian();
        },
        initVariables: function() {
            cache = {
                $document : $(document),
                $priceContainer : $('.order-summary-price-container')
            }
        },
        initAjax: function() {},
        initEvents: function() {},
        checkoutOrderSummaryAccordian: function() {
            if (cache.$document.width() < 992) {
                cache.$priceContainer.collapse('hide');
                cache.$document.on('click', '.view-bag-summary', function() {
                    $(this).next('div').collapse('toggle');
                });
                cache.$priceContainer.on('show.bs.collapse hidden.bs.collapse', function() {
                    $(this).prev('.view-bag-summary').toggleClass('minus-icon');
                })
            }
        }
    };
    return checkoutConfirmation;
});