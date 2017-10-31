define(['hbshelpers', 'handlebars', 'utility', 'ajaxFactory',
         'templates/checkoutShipping.tpl', 'cartcheckoutordesummary','templates/checkoutUserData.tpl','templates/shippingForm.tpl','templates/shippingEasypost.tpl','checkoutRevieOrder','templates/checkoutReviewOrder.tpl','templates/checkoutSaveInfo.tpl','templates/checkoutPayment.tpl', 'spreedly'],
    function(hbshelpers, handlebars, utility, ajaxFactory,  checkoutShippingTemplate, cartcheckoutordesummary,checkoutUserDetailsTemplate,shippingForm,easypostFormTemplate,checkoutRevieOrder,checkoutRevieOrderTemplate,checkoutSaveInfoTemplate,checkoutPaymentTemplate, spreedly) {
        'use strict';
        var cache;
        var checkoutShipping = {
            init: function() {
                this.initVariables();
                this.initEvents();
                this.initAjax();
                this.getCartData();
                utility.floatingLabelsInit();
                this.spreedlyinit();
                },
            initVariables: function() {
                cache = {
                    $document : $(document),
                    $window : $(window),
                    $checkoutStepsContainer : $('.checkout-shipping-container'),
                    $orderSummaryContainer : $('.order-Summary-Container'),
                    $accountInfo : $('.account-info'),
                    $response : $.parseJSON($("#cartData").val()),
                    $addressAddFlag : true
                }
            },
            initAjax: function() {},
            initEvents: function() {
                cache.$document.on('click','.shipping-fields button.guestUserSaveShipping',checkoutShipping.submitshippingformdataGuest);
                cache.$document.on('click','.shipping-fields button.loggedUserSaveShipping',checkoutShipping.submitshippingformdatalogged);
                cache.$document.on('change','.shipping-fields select#shippingFormAddress',checkoutShipping.checkforAddressForm);
            },
            
            spreedlyinit:function(){
              Spreedly.init();

                Spreedly.on('paymentMethod', function(token, pmData) {
                  var tokenField = document.getElementById("payment_method_token");
                  tokenField.setAttribute("value", token);
                  $('#cardType').val(pmData.card_type);
                  $('#cardNumber').val(pmData.number);
                  $('#lastFourDigitCard').val(pmData.last_four_digits);
                  var masterForm = document.getElementById('payment-form');

                  // Normally would now submit the form..
                  // masterForm.submit();

                  // For demonstration purposes just display the token
                  var messageEl = document.getElementById('message');
                  messageEl.innerHTML = "Success! The returned payment method token is: " + token;
                });

                Spreedly.on('errors', function(errors) {
                  var messageEl = document.getElementById('errors');
                  var errorBorder = "1px solid red";
                  for(var i = 0; i < errors.length; i++) {
                    var error = errors[i];
                    if(error["attribute"]) {
                      var masterFormElement = document.getElementById(error["attribute"]);
                      if(masterFormElement) {
                        masterFormElement.style.border = errorBorder
                      } else {
                        Spreedly.setStyle(error["attribute"], "border: " + errorBorder + ";");
                      }
                    }
                    messageEl.innerHTML += error["message"] + "<br/>";
                  }
                });

                Spreedly.on('ready', function(frame) {
                  Spreedly.setFieldType('text')
                  Spreedly.setNumberFormat('prettyFormat');
                  Spreedly.setStyle('number','width: 92%;  border: 1px solid #B4B2B0; height:36.9px;font-size:13.3px; padding: 6px 12px;');
                  Spreedly.setStyle('cvv', 'width: 80%; height: 32px; border-radius: 3px; border: 1px solid #B4B2B0; padding: .65em .5em; font-size: 91%;');
                });
                
                $( "#payment-form" ).submit(function( event ) {
                     event.preventDefault();
                     var normalBorder = "1px solid #ccc";

                    // These are the fields whose values we want to transfer *from* the
                    // master form *to* the payment frame form. Add the following if
                    // you're displaying the address:
                    // ['address1', 'address2', 'city', 'state', 'zip', 'country']
                    var paymentMethodFields = ['first_name', 'last_name', 'month', 'year'],
                    options = {};
                    for(var i = 0; i < paymentMethodFields.length; i++) {
                      var field = paymentMethodFields[i];

                      // Reset existing styles (to clear previous errors)
                      var fieldEl = document.getElementById(field);
                      fieldEl.style.border = normalBorder;

                      // add value to options
                      options[field]  = fieldEl.value
                    }

                    // Reset frame styles
                    //Spreedly.setStyle('number', "border: " + normalBorder + ";");
                   // Spreedly.setStyle('cvv', "border: " + normalBorder + ";");

                    // Reset previous messages
                    //document.getElementById('errors').innerHTML = "";
                    //document.getElementById('message').innerHTML = "";

                    // Tokenize!
                    Spreedly.tokenizeCreditCard(options,function(){
                    alert('token genrated')
                    });
                    
                    setTimeout(function() {
                      //your code to be executed after 1 second
                     var formData = {
                                  "spreedlyToken" : $("input[name=payment_method_token]").val(),
                                  "saveInAccount" :$('#saveCard').is(":checked"),
                                  "card_nameOnCard":$("#first_name").val() + $("#last_name").val(),
                                  "card_lastFourDigits":$('#lastFourDigitCard').val(),
                                  "card_cardType":$('#cardType').val(),
                                  "card_cardNumber":$('#cardNumber').val(),
                                  "card_expirationMonth":$('#month').val(),
                                  "card_expirationYear":$('#year').val(),
                                  "isShippingAddressAsBilling" : $('#useShipping').is(":checked"),
                                  "CSRFToken" :$("input[name=CSRFToken]").val(),
                                         "line1": $('#billingAddress1').val(),
                                         "line2": $('#billingAddress2').val(),
                                         "town": $('#billingCity').val(),
                                         "state": $('#billingState').val(),
                                         "postalCode": $('#zipCode').val()
                     }
                           
                         var objectOptions = {
                             'methodType': 'POST',
                             'dataType': 'JSON',
                             'methodData':formData,
                             'url': '/simonstorefront/checkout/multi/summary/placeOrder',
                             'isShowLoader': false,
                             'cache' : true
                         }
                     
                         ajaxFactory.ajaxFactoryInit(objectOptions, function(){
                           consoloe.log('satya');
                         });
                    }, 4000);
                    
                   
                    
                });
            },

            getCartData:function(){
                if($('#cartData').length>0){
                    checkoutShipping.initCheckoutPage(cache.$response);
                    checkoutShipping.initCheckoutOrderSummary(cache.$response);
                }
                
               
            },

            checkforAddressForm:function(){
                if($(this).val()==='addNewAddr' && $('#cartData').length){
                    $('#loggedUserShippingContainer').html(shippingForm(cache.$response));
                    utility.floatingLabelsInit();
                }
            },

            submitshippingformdatalogged:function(){
                var shippingFormelem = $(this).parents('#loggedshippingFormFields');
                var formData = {
                        addressId : shippingFormelem.find('#shippingFormAddress').val(),
                        CSRFToken :$("input[name=CSRFToken]").val()

                }

                var options = {
                    'methodType': 'POST',
                    'dataType': 'JSON',
                    'methodData': formData,
                    'url': $("#cartData").data('addressadd'),
                    'isShowLoader': false,
                    'cache' : true
                }
            
                ajaxFactory.ajaxFactoryInit(options, function(){consoloe.log('logged in user saved address added to user profile')});
            },

            submitshippingformdataGuest:function(e){
                e.preventDefault();
                if($('#guestUserAddressForm').parsley().validate() === false){
                    return false;
                }
                
                var shippingFormelem = $('.shippingaddressForm');
                var saveInAddressBook = true;
                if($('#saveInAddressBook').length){
                    saveInAddressBook = shippingFormelem.find('#saveInAddressBook').is(":checked");
                }
                var formData = {
                        titleCode : '',
                        firstName : shippingFormelem.find('#firstName').val(),
                        middleName: shippingFormelem.find('#middleName').val(),
                        lastName : shippingFormelem.find('#lastName').val(),
                        line1 : shippingFormelem.find('#address1').val(),
                        line2 : shippingFormelem.find('#address2').val(),
                        townCity : shippingFormelem.find('#city').val(),
                        regionIso : shippingFormelem.find('#state').val(),
                        postcode : shippingFormelem.find('#zipcode').val(),
                        countryIso : $("input[name=countryIsoCode]").val() ,
                        saveInAddressBook : saveInAddressBook,
                        shippingAddress : true,
                        billingAddress : shippingFormelem.find('.isBillingAddress').is(":checked"),
                        phone : shippingFormelem.find('#phoneNumber').val(),
                        emailId  : shippingFormelem.find('#emailId').val(),
                        CSRFToken :$("input[name=CSRFToken]").val()

                }
                var options = {
                    'methodType': 'POST',
                    'dataType': 'JSON',
                    'methodData': formData,
                    'url': $("#cartData").data('easypost'),
                    'isShowLoader': false,
                    'cache' : true
                }
                
                ajaxFactory.ajaxFactoryInit(options, function(response){
                    $('#checkoutVerifyAddressModal').modal('show').find('.modal-content').html(easypostFormTemplate(response));
                    $('#checkoutVerifyAddressModal').on('click','button.useThisAddress',function(){
                        if(cache.$addressAddFlag){
                            checkoutShipping.submitshippingform(response);
                        }
                        cache.$addressAddFlag = false;
                        
                    });
                });
            },

            submitshippingform:function(response){
                $('#checkoutVerifyAddressModal').modal('hide');
                response.returnedUser=true;
                if($('input[name=selectaddress]:checked').val()=='suggestedAddress'){
                    response.suggestedAddressFlag=true;
                }
                else{
                    response.suggestedAddressFlag=false;
                }
                cache.$checkoutStepsContainer.html(checkoutShippingTemplate(response));
                cache.$checkoutStepsContainer.html(checkoutShippingTemplate(response));
                cache.$checkoutStepsContainer.append(checkoutRevieOrderTemplate());
                cache.$checkoutStepsContainer.append(checkoutSaveInfoTemplate());
                cache.$checkoutStepsContainer.append(checkoutPaymentTemplate());

                var shippingFormelem = $('.shippingaddressForm');
                var saveInAddressBook = false;
                if($('#saveInAddressBook').length){
                    saveInAddressBook = shippingFormelem.find('#saveInAddressBook').is(":checked");
                }
                
                var formData = {
                        titleCode : '',
                        firstName : shippingFormelem.find('#firstName').val(),
                        middleName: shippingFormelem.find('#middleName').val(),
                        lastName : shippingFormelem.find('#lastName').val(),
                        line1 : shippingFormelem.find('#address1').val(),
                        line2 : shippingFormelem.find('#address2').val(),
                        townCity : shippingFormelem.find('#city').val(),
                        regionIso : shippingFormelem.find('#state').val(),
                        postcode : shippingFormelem.find('#zipcode').val(),
                        countryIso : $("input[name=countryIsoCode]").val() ,
                        saveInAddressBook : saveInAddressBook,
                        shippingAddress : true,
                        billingAddress : shippingFormelem.find('.isBillingAddress').is(":checked"),
                        phone : shippingFormelem.find('#phoneNumber').val(),
                        emailId  : shippingFormelem.find('#emailId').val(),
                        CSRFToken :$("input[name=CSRFToken]").val()

                }

                var options = {
                    'methodType': 'POST',
                    'dataType': 'JSON',
                    'methodData': formData,
                    'url': $("#cartData").data('updateapi'),
                    'isShowLoader': false,
                    'cache' : true
                }
                
                ajaxFactory.ajaxFactoryInit(options, checkoutShipping.addShippingAddress);
            },

            addShippingAddress:function(){
                console.log('Address has been added');
                $("#panel1").collapse('toggle');
                checkoutRevieOrder.initReviewOrder();
            },

            initCheckoutPage:function(response){
                cache.$accountInfo.html(checkoutUserDetailsTemplate(response));
                cache.$checkoutStepsContainer.html(checkoutShippingTemplate(response));
                cache.$checkoutStepsContainer.append(checkoutRevieOrderTemplate());
                cache.$checkoutStepsContainer.append(checkoutSaveInfoTemplate());
                cache.$checkoutStepsContainer.append(checkoutPaymentTemplate());
                $('.tooltip-init').tooltip();
                
            },
            initCheckoutOrderSummary: function (response) {
                response.isCheckout=true;
                cartcheckoutordesummary.paintordersummary(cache.$orderSummaryContainer, response);
            }

        };


        return checkoutShipping;
    });