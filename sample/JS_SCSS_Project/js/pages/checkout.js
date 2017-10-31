/**
 * @function : rlutility
 * @description : use this for global email subscription modal functionality
 */
define('pages/checkout',['jquery','checkoutShipping', 'checkoutConfirmation','ajaxFactory','hbshelpers', 'handlebars'],
    function($, checkoutShipping,checkoutConfirmation,ajaxFactory,hbshelpers, handlebars) {
        'use strict';
        var cache;
        var checkout = {
            init: function() {
                this.initVariables();
                this.initEvents();
                this.initAjax();
                checkoutShipping.init();
                this.initCheckout();
                checkoutConfirmation.init();

            },
            initVariables: function() { },
            initAjax: function() {},
            initEvents: function() {},
            initCheckout: function() {
                //this code is written for demo purpose, it has to be removed after hybris integration.
                var shippingFieldsEdited = $('.shipping-fields-edit');
                var verifyAddressBtn = $('.checkout-verify-address-modal .edit-address-btn .btn:last-child'),
                    shippingFields = $('#panel1 .shipping-fields');

                verifyAddressBtn.on('click', function() {
                    shippingFields.hide();
                    shippingFieldsEdited.show();
                    shippingFieldsEdited.closest('.panel-default').find('h5 a').append('<span class="tick"></span>');
                });

                var itemsOrderDetails = $('.cart-checkout-items-order-details'),
                    itemsOrderDetailsBtn = itemsOrderDetails.find('.btn'),
                    cartCheckoutItems = $('.cart-checkout-items-order-details > .cart-checkout-items');
                itemsOrderDetailsBtn.on('click', function() {
                    cartCheckoutItems.hide();
                });

                var saveInformationContainer = $('.save-information-container'),
                    saveInformationContainerBtn = saveInformationContainer.find('.secondary-btn');
                $('.create-account, .account-created').hide();
                saveInformationContainerBtn.on('click', function() {
                    $('.create-account').show();
                    $('.save-information-container > .row').hide();
                });
                $('.create-account a').on('click', function() {
                    $('.create-account').hide();
                    $('.save-information-container > .row').show();
                });
                $('.save-information-container .btn').eq(0).on('click', function() {
                    $('.create-account').hide();
                    $('.save-information-container > .row').hide();
                    $('.account-created').show();
                });



                $('.shipping-address .btn').on('click', function() {
                    $('.shipping-address .shipping-method').hide();
                    $(this).hide();
                    $('.shipping-fields-edit').show();
                });

                $('.shipping-fields-edit h6 a').on('click', function() {
                    $('.shipping-fields-edit').hide();
                    $('.shipping-address .shipping-method').show();
                    $('.shipping-address .btn').show();
                     $('.shipping-fields').show();
                });

            }

            
        }

        $(function() {
            checkout.init();
        });

        return checkout;
    });