/**
 * @function : rlutility
 * @description : use this for any global utility functions
 */
define('utility', ['jquery', 'templates/modal.tpl', 'parsley'], function($, modalTemplate, parsley){
    var utility = {
        /**
         * @function initModal
         * @description Global modal template initialize
         */
        initModal: function() {
            var modalItems = [];
            $('[data-toggle="modal"]').each(function() {
                if (typeof $(this).data('target') !== 'undefined') {
                    var modalId = $(this).data('target').replace('#', ''),
                        modalClass = 'modal-' + modalId;
                }

                if (modalItems.indexOf(modalId) === -1) {
                    $('body').append(modalTemplate({
                        modalId: modalId,
                        modalClass: modalClass
                    }));
                    modalItems.push(modalId);
                }
            });
        },
        setCookie: function(name,value,days){
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        getCookie: function(name){
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)===' '){
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) === 0){
                    return c.substring(nameEQ.length,c.length);
                }
            }
            return null;  
        },
        floatingLabelsInit:  function() {
        
        function floatingLabel(onload) {
    var $input;
    $input = $(this);
    if (onload) {
      $.each($('.sm-input-group input'), function(index, value) {
        var $current_input;
        $current_input = $(value);
        if ($current_input.val()) {
          $current_input.closest('.sm-input-group').addClass('field-float');
        }
      });
    }
    
    if($input.is( "input")){
        setTimeout(function() {
        
            if ($input.val()) {
                $input.closest('.sm-input-group').addClass('field-float');
            } else {
                $input.closest('.sm-input-group').removeClass('field-float');
            }
        }, 1);
    }
  };
  
  $('.sm-input-group input').on('keydown', floatingLabel);
  $('.sm-input-group input').on('change', floatingLabel);
  
  
if($('.sm-form-validation').length){
    $('.sm-form-validation').parsley();
    $('.sm-form-validation').parsley().on('form:error', function() {
            $.each(this.fields, function(key, field) {
              if (field.validationResult !== true) {
                field.$element.closest('.sm-input-group').addClass('has-error');
              }
            });
          });
          
          $('.sm-form-validation').parsley().on('field:validated', function() {
            if (this.validationResult === true) {
              this.$element.closest('.sm-input-group').removeClass('has-error');
            } else {
              this.$element.closest('.sm-input-group').addClass('has-error');
              var parsleyError = true;
              return parsleyError;
            }
          });
}
 

        floatingLabel(true);

        },
        pageScreenBlurOnHeaderLinks : function(action){
            var $menuBlurDiv = $('.mega-menu-blur');
            if(action === 'hide'){
                $menuBlurDiv.removeClass('menu-is-open');
                $menuBlurDiv.removeClass('in');
                $menuBlurDiv.removeAttr('style')
            }else{
                var marginTop = $('.js-mainHeader').height();
                $menuBlurDiv.addClass('in');
                $menuBlurDiv.addClass('menu-is-open');
                $menuBlurDiv.css({
                    height: $(document).height()-marginTop+'px',
                    top: marginTop+'px',
                });
            }
        },
        imgToSvg: function(){
            if(!$('.page-checkout-login').length){
            $('img[src*=".svg"], .footer-social img').each(function(){
                if(!$(this).hasClass('simon-logo')){
                    var $img = $(this);
                    var imgClass = $img.attr('class');
                    var imgURL = $img.attr('src');

                    $.get(imgURL, function(data) {
                        var $svg = $(data).find('svg');
                        if(typeof imgClass !== 'undefined') {
                            $svg = $svg.attr('class', imgClass+' svg-updated');
                        }
                        $svg = $svg.removeAttr('xmlns:a');
                        $img.replaceWith($svg);
                    }, 'xml');
                }
            });
            }
        },
        changeUrlParam: function (param, value) {
            var currentURL = window.location.href,
                urlObject = currentURL.split('?'),
                newQueryString = '?';

            value = encodeURIComponent(value);

            if(urlObject.length > 1){
                var queries = urlObject[1].split('&');

                var updatedExistingParam = false;
                for (var i = 0; i < queries.length; i++){
                    var queryItem = queries[i].split('=');

                    if(queryItem.length > 1){
                         if(queryItem[0] === param){
                            newQueryString += queryItem[0] + '=' + value + '&';
                            updatedExistingParam = true;
                         }else{
                            newQueryString += queryItem[0] + '=' + queryItem[1] + '&';
                         }
                    }
                }
                if(!updatedExistingParam){
                    newQueryString += param + '=' + value + '&';
                }
            }else{
                newQueryString += param + '=' + value + '&';
            }
            window.history.replaceState('', '', urlObject[0] + newQueryString.slice(0, -1));
        },
        removeUrlParam: function(param){
            var currentURL = window.location.href,
                urlparts= currentURL.split('?');   
            if (urlparts.length >= 2) {
        
                var prefix = encodeURIComponent(param) + '=',
                    pars = urlparts[1].split(/[&;]/g);
        
                //reverse iteration as may be destructive
                for (var i = pars.length; i-- > 0;) {    
                    //idiom for string.startsWith
                    if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                        pars.splice(i, 1);
                    }
                }
        
                currentURL = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
                window.history.replaceState('', '', currentURL);
            } 
        },
        getParamValueFromUrl: function(param){
            var queryString = window.location.search.split('?'),
                value = null;

            if(queryString.length > 1){
                queryString = queryString[1];
                var queries = queryString.split('&'); 
                queries.filter(function(query){
                    var queryItem = query.split('=');
                    if(queryItem.length > 1){
                        if(queryItem[0] === param){
                            value = queryItem[1];
                        }
                    }
                });
            }
            return value;
        }

    };

    return utility;
});