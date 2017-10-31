/**
 * @function : rlutility
 * @description : use this for global email subscription modal functionality
 */
define(['jquery', 'templates/cartCheckoutOrderSummary.tpl'], function($, cartOrderSummaryTemplate) {
    'use strict';
    var cache;
    var cartcheckoutordesummary = {
        init: function() {
            this.initVariables();
            this.initEvents();
        },
        initVariables: function() {
            cache = {
                $document : $(document),
                $ordersummaryContainer : $('.cart-order-summary'),
                $viewBagSummary : $('.view-bag-summary')
            }
        },
        initAjax: function() {},
        initEvents: function() {},

        paintordersummary:function(elem, response){
            elem.html(cartOrderSummaryTemplate(response));
            cache.$ordersummaryContainer.find(elem).on('show.bs.collapse hidden.bs.collapse', function() {
                $(this).prev(cache.$viewBagSummary).toggleClass('minus-icon');
                if ($(this).prev(cache.$viewBagSummary).html() === $(this).prev(cache.$viewBagSummary).data('closeAccordiantxt'))
                {
                    $(this).prev(cache.$viewBagSummary).html($(this).prev(cache.$viewBagSummary).data('openAccordiantxt'))
                }
                else
                {
                    $(this).prev(cache.$viewBagSummary).text($(this).prev(cache.$viewBagSummary).data('closeAccordiantxt'));
                }
            });

            
        }
    };
    $(function() {
            cartcheckoutordesummary.init();
        });
    return cartcheckoutordesummary;
});