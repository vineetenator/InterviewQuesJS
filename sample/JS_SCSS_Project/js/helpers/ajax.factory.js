define(['jquery'],
    function($) {
        var $body = $('body');
        var ajaxFactory = {
            ajaxFactoryInit: function(options, successCallback, errorCallback) {
                // Retreiving response from the service
                var ajaxdataType, ajaxtype, ajaxUrl, ajaxData, ajaxCallback, $parentElem, asyncType, isShowLoader, cache;
                if (!errorCallback) {
                    errorCallback = function(jqXHR, textStatus, errorThrown) {
                        ajaxFactory.showError(jqXHR.status, textStatus, errorThrown);
                    };
                }
                if (typeof options.asyncType !== 'undefined') {
                    asyncType = options.asyncType;
                } else {
                    asyncType = true;
                }

                if (typeof options.dataType !== 'undefined') {
                    ajaxdataType = options.dataType;
                } else {
                    ajaxdataType = 'json';
                }

                if (typeof options.methodType !== 'undefined') {
                    ajaxtype = options.methodType;
                } else {
                    ajaxtype = 'POST';
                }

                if (typeof options.url !== 'undefined') {
                    ajaxUrl = options.url;
                } else {
                    ajaxUrl = '#';
                }

                if (typeof options.methodData !== 'undefined') {
                    ajaxData = options.methodData;
                } else {
                    ajaxData = '';
                }

                if (typeof options.callback !== 'undefined') {
                    ajaxCallback = options.callback;
                } else {
                    ajaxCallback = '';
                }

                if (typeof options.parentElem !== 'undefined') {
                    $parentElem = options.parentElem;
                } else {
                    $parentElem = $body;
                }

                if (typeof options.isShowLoader !== 'undefined') {
                    isShowLoader = options.isShowLoader;
                } else {
                    isShowLoader = true;
                }

                if (typeof options.cache !== 'undefined') {
                    cache = options.cache;
                } else {
                    cache = false;
                }

                $.ajax({
                    url: ajaxUrl,
                    type: ajaxtype,
                    cache: cache,
                    async: asyncType,
                    beforeSend: function() {
                        ajaxFactory.ajaxHandler.ajaxStart($parentElem, isShowLoader);
                    },
                    complete: function() {
                        ajaxFactory.ajaxHandler.ajaxStop($parentElem, isShowLoader);
                    },
                    dataType: ajaxdataType,
                    data: ajaxData,
                    success: successCallback,
                    error: function(status, textStatus, errorThrown) {
                        errorCallback(status, textStatus, errorThrown);
                    },
                    jsonpCallback: ajaxCallback
                });
            },
            showError: function() {
                //use these params to display errors - status, textStatus, errorThrown
            },
            ajaxHandler: {
                ajaxStart: function() {
                    ////use these param to start loader - $elem, isShowLoader
                },
                ajaxStop: function() {
                    //use these param to stop loader - $elem, isShowLoader
                }
            }
        };
        return {
            ajaxFactory: ajaxFactory,
            httpRequest: ajaxFactory.httpRequest,
            ajaxFactoryInit: ajaxFactory.ajaxFactoryInit
        };
    });