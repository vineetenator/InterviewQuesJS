define(['hbshelpers','handlebars',  'ajaxFactory', 
        'templates/pdpJustAddedModal.tpl'],
function(hbshelpers,  handlebars,ajaxFactory, 
        pdpJustAddedmodal) {
    'use strict';
    var cache = {
            $document : $(document)
        },
        pdpAddtocart = {
            init: function() {
                this.initEvents();
                
            },          
            initEvents: function() {     
                cache.$document.on('click','.addtocart',pdpAddtocart.addtocartModal)
            },

            addtocartModal:function(event){
                event.preventDefault();
                    var modalUrl        = $(this).data('apiurl'),
                        CSRFToken       = $("input[name=CSRFToken]").val(),
                        qty             = $("input[name=qty]").val(),
                        productCodePost = $("input[name=productCodePost]").val();
                    var formData ={
                        "productCodePost": productCodePost,
                        "qty": qty,
                        "CSRFToken":CSRFToken
                    }
                     var options = {
                             'methodType': 'POST',
                             'dataType': 'JSON',
                             'url': modalUrl,
                             'methodData': formData,
                             'isShowLoader': false,
                             'cache' : true
                         }
                         ajaxFactory.ajaxFactoryInit(options, function(response){
                            if(response.statusCode!=='success'){
                                return false;
                            }
                            $('#justAddedModal').modal('show').find('.just-added-items').html(pdpJustAddedmodal(response));
                            $('.minicart').addClass('active');
                            $('.minicart span').html(response.itemCount);

                            $('.tooltip-init').tooltip();

                         });
            }
        };
    $(function() {
            pdpAddtocart.init();
        });
   return pdpAddtocart;
});