/**
* @function : rlutility
* @description : use this for global email subscription modal functionality
*/
define('pages/cart', ['jquery','templates/cartPageTemplate.tpl','templates/cartmessages.tpl','handlebars','slickCarousel','viewportDetect','ajaxFactory','cartcheckoutordesummary'], 
    function($, cartPageTemplate, cartpagemessageTemplate,handlebars,slickCarousel, viewportDetect,ajaxFactory,cartcheckoutordesummary) {
        'use strict';
        var cache;
        var cartpage = {
            init: function() {
                this.initVariables();
                this.initEvents();
                this.initAjax();
                this.cartOrderSummaryAccordian();
                this.cartItemsAccordian();
                this.editItemCarousel();
                this.cartwithitems();
            },

            initVariables: function() {
                cache = {
                    $document : $(document),
                    $window :$(window),
                    $priceContainer : $('.order-summary-price-container'),
                    $itemContainer : $('.cart-items-container'),
                    $editItemCarousel :$("#editItemCarousel"),
                    $orderSummaryeElem :$('.ordersummaryContainer'),
                    $msgContainer : $('#messageContainer')
                }
            },
            initAjax: function() {},
            initEvents: function() {
                cache.$document.on('click','#removeEntry',cartpage.removeUpdateItem);
                cache.$document.on('click','.item-remove',cartpage.removeItemConfirmation);
                cache.$document.on('blur','.txt-qty',cartpage.removeUpdateItem);
                cache.$document.on('click','.viewReturnPolicy',cartpage.initPrivacyPolicy);
            },
            removeItemConfirmation: function(){
                 var targetElm = $(this);
                $('#removeEntryNumber').val(targetElm.data('entrynumber'))
                $('#removeProductCode').val(targetElm.data('productcode'))
               $('#removeConfirmation').modal();
            },
            removeUpdateItem:function(){
                
                var targetElm = $(this)
                var CSRFToken = $("input[name=CSRFToken]").val();
                var quanity = 0;
                var entrynumber = $('#removeEntryNumber').val();
                var productcode = $('#removeProductCode').val();
                
                $('#removeConfirmation').modal('hide');
                if(targetElm.data('action')!=='remove'){
                    if(targetElm.val() < 1){
                         targetElm.val(1);
                    }
                    else if(targetElm.val()>parseInt($('#cartEnteries').data('maxlengthproducts'))){
                        targetElm.val($('.item-qty span').html());
                        targetElm.parent().parent().find('.errortext').show();
                        return false;
                    }
                    if(targetElm.val() < 1){
                        quanity = 1;
                    }else{
                        quanity = targetElm.val();
                    }
                    entrynumber = targetElm.data('entrynumber');
                    productcode = targetElm.data('productcode');
                }
                var formData ={
                    "entryNumber": entrynumber,
                    "productCode": productcode,
                    "quantity":quanity,
                    "CSRFToken":CSRFToken
                }
                var options = {
                    'methodType': 'POST',
                    'dataType': 'JSON',
                    'methodData': formData,
                    'url': $('#cartData').data('updateapi'),
                    'isShowLoader': false,
                    'cache' : true
                }
                $('.errortext').hide();
                ajaxFactory.ajaxFactoryInit(options, cartpage.initcartpage);
            },
            
            cartOrderSummaryAccordian: function() {
                if (cache.$document.width() < 992) {
                    cache.$priceContainer.collapse('hide');
                    cache.$document.on('click', '.view-bag-summary', function() {
                        $(this).next('div').collapse('toggle');
                    });
                    cache.$priceContainer.on('show.bs.collapse hidden.bs.collapse', function() {
                        $(this).prev('.view-bag-summary').toggleClass('minus-icon');
                    })
                }
            },
            cartItemsAccordian: function () {
                cache.$itemContainer.collapse('show');
                cache.$document.on('click', '.last-call', function() {
                    $(this).next('div').collapse('toggle');
                });
                cache.$itemContainer.on('show.bs.collapse hidden.bs.collapse', function() {
                    $(this).prev('.last-call').toggleClass('plus-icon');
                });
            },
            editItemCarousel : function () {
                cache.$editItemCarousel.slick({
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    draggable: true,
                    infinite: false,
                    pauseOnHover: true,
                    swipe: true,
                    touchMove: true,
                    speed: 300,
                    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                    adaptiveHeight: true
                });
            },

            cartwithitems:function(){
                if($('#cartData').length>0){
                    var response= $('#cartData').val();
                    response = $.parseJSON(response);
                    cartpage.initcartpage(response);
                }
            },

            initcartpage: function(response){
                    $('html, body').animate({ scrollTop: 0 }, '100')
                    cache.$msgContainer.show();
                    $('#cartEnteries').html(cartPageTemplate(response));
                    cartcheckoutordesummary.paintordersummary(cache.$orderSummaryeElem, response);
                    cache.$msgContainer.html(cartpagemessageTemplate(response));
                    $('.cart-item span').html(response.totalUnitCount);
                    
                    setTimeout(function(){
                        cache.$msgContainer.fadeOut('slow', function(){
                            if(!response.retailerInfoData || response.retailerInfoData.length===0){
                                location.reload();
                                return false;
                            }
                        });
                        
                    }, 6000)
                    
                    $('.cart-items-container').on('show.bs.collapse hidden.bs.collapse', function() {
                        $(this).prev('.last-call').toggleClass('plus-icon');
                    });

                    $('.tooltip-init').tooltip();
                    cartpage.initPrivacyPolicy();
            },
            initPrivacyPolicy: function () {
            		var modalUrl = $(this).data('href');
            		 var options = {
                         'methodType': 'get',
                         'dataType': 'JSON',
                         'url': modalUrl,
                         'isShowLoader': false,
                         'cache' : true
                 }
                 ajaxFactory.ajaxFactoryInit(options, function(response){
                 	$('#sizeGuideModal').modal('show').find('.privacy-content').html(response.value);
                 });
            }

            
            
        }

        $(function() {
            cartpage.init();
        });

        return cartpage;
    });