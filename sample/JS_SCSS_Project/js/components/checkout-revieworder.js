define(['hbshelpers', 'handlebars',  'ajaxFactory',
         'templates/checkoutShipping.tpl', 'cartcheckoutordesummary','templates/checkoutUserData.tpl','templates/shippingForm.tpl','templates/shippingEasypost.tpl'],
    function(hbshelpers, handlebars,  ajaxFactory,  checkoutShippingTemplate, cartcheckoutordesummary,checkoutUserDetailsTemplate,shippingForm,easypostFormTemplate) {
        'use strict';
        var cache;
        var checkoutRevieOrder = {
            init: function() {
                this.initVariables();
                this.initEvents();
                this.initAjax();
               
                //this.initReviewOrder();
               
            },
            initVariables: function() {
                cache = {
                    $document : $(document),
                    $window : $(window),
                    $checkoutStepsContainer : $('.checkout-shipping-container')
                }
            },
            initAjax: function() {},
            initEvents: function() {},

            initReviewOrder:function(response){
                $("#panel2").collapse('toggle');
                /*var options = {
                    'methodType': 'GET',
                    'dataType': 'JSON',
                    'methodData': formData,
                    'url': /checkout/multi/delivery-method/choose,
                    'isShowLoader': false,
                    'cache' : true
                }*/
                
                //ajaxFactory.ajaxFactoryInit(options, checkoutShipping.addShippingAddress);
                
            }

            

        };
        $(function() {
            checkoutRevieOrder.init();
        });

        return checkoutRevieOrder;
    });