define(['hbshelpers', 'handlebars', 'viewportDetect', 'ajaxFactory', 
        'utility', 'productImagesCarousel',
        'templates/pdpColorPalette.tpl', 'templates/pdpFilters.tpl', 
        'templates/pdpBaseProductDetail.tpl', 'templates/pdpPricing.tpl', 'templates/pdpProductImage.tpl',
        'templates/pdpProductHeader.tpl','scrollbar'],
function(hbshelpers, handlebars, viewportDetect, ajaxFactory, utility, productImagesCarousel,
        pdpColorPaletteTemplate, pdpFiltersTemplate, pdpBaseProductDetailTemplate, 
        pdpPricingTemplate, pdpProductImageTemplate, pdpProductHeaderTemplate) {
    'use strict';
    var cache = {
            data: {},
            currentColor: '',
            excludedParamInObj: 0, // like sku, colorId and inStore
            skusList: [],
            $colorPalette: $("#colorPalette"),
            $productFilter: $('#productFilter'),
            $designerName: $('#designerName'),
            $retailerName: $('#retailerName'),
            $addToCartBtn: $('#addToCartBtn'),
            $galleryCarousel: $('#galleryCarousel'),
            $skuKey      : $('#skuKey')
        },
        pdpOverview = {
            init: function() {
                this.initEvents();
                this.initProductOverviewAjax();
            },          
            initEvents: function() {     
                cache.$colorPalette
                    .off('click.colorPalette')
                    .on('click.colorPalette','.color-palette .color-switches', pdpOverview.onColorChange);

                // Bind events for all the varient switches
                cache.$productFilter
                    .off('click.productFilter')
                    .on('click.productFilter', '.switch-chest .switch', pdpOverview.onSwitchClick);

                // Bind events for all the varient switches
                cache.$productFilter
                    .off('change.productFilter')
                    .on('change.productFilter', '.list-dropdown select', pdpOverview.onListDropDownChange);

                // Occurs when select size modal is fully shown
                cache.$productFilter
                    .off('shown.bs.modal')
                    .on('shown.bs.modal','#selectsizeMobile', pdpOverview.onOpenSizeModal);

                // Hide tooltip when clicked outside info icon
                if(viewportDetect.lastClass === 'small'){
                    $('body').off('click.tooltipHide').on('click.tooltipHide', pdpOverview.hideTooltips);
                }
            },
            selectColorForPLP: function(){
            	 var colorId = utility.getParamValueFromUrl('colorID');
            	 if(colorId){
            		 $('[data-color-id='+colorId+']').trigger('click');
            	 }
            },
            hoverHandlerOnColorSwitches : function (baseColor){
                var $colorPalettes = cache.$colorPalette.find('.color-switches');
                cache.currentColor = baseColor || $colorPalettes.filter('.active').data('color-name').trim();
                var  handlerIn = function (event){
                        var $this = $(event.target),
                            hoveredColor = $this.data('color-name').trim();
                        
                        $('#colorName').html(hoveredColor);
                    },
                    handlerOut = function (){
                        $('#colorName').html(cache.currentColor);
                    };
                $colorPalettes
                    .off( 'mouseenter mouseleave' )
                    .hover(handlerIn, handlerOut);
            },
            initProductOverviewAjax : function(){
                var jsonUrl = $('#colorPalette').data('apiurl');
                var options = {
                    'methodType': 'GET',
                    'dataType': 'JSON',
                    'url': jsonUrl,
                    'isShowLoader': false,
                    'cache' : true
                }
                ajaxFactory.ajaxFactoryInit(options, pdpOverview.paintPage);   
                
            },
            paintPage : function(data){
                cache.data = data;
                pdpOverview.populateSkus(data);
                pdpOverview.paintProductHeader(data);
                pdpOverview.paintColorPalette(data);
                pdpOverview.paintFilter(data);
                pdpOverview.paintBaseProductDetail(data);
                pdpOverview.paintProductPrice(data);
                pdpOverview.paintImageCarousel(data, data.selectedColorName);

                // Should be called after all paints functions
                pdpOverview.equaliseSwatchWidths();
                pdpOverview.initSizeChart();
                $('.color-switches.active').trigger('click');   
                pdpOverview.selectColorForPLP();
                
                pdpOverview.retrieveProductFromSku();
                pdpOverview.initShareIcons(); 
                
                // update policy
                $('#panel2 .content').html(data.retailerShippingReturnInfo);
            },
            paintColorPalette: function(data, baseColor){
                baseColor = baseColor || data.selectedColorName;
                var defaultColor = data.colordetails[baseColor];
                cache.$colorPalette.html(pdpColorPaletteTemplate({
                    data: data,
                    defaultColor: defaultColor
                }));

                // Bind hover 
                pdpOverview.hoverHandlerOnColorSwitches(defaultColor.colorName);
            },
            paintFilter: function(data, baseColor){
                baseColor = baseColor || data.selectedColorName;
                var defaultColor = data.colordetails[baseColor],
                    isMobile = (viewportDetect.lastClass === 'small') ? true : false;
                
                if(Boolean(defaultColor.variantData) && (Object.keys(defaultColor.variantData).length !== 0)){
                cache.$productFilter.html(pdpFiltersTemplate({
                    defaultColor: defaultColor,
                    isMobile: isMobile
                }));
                }
                // In case there is no variant like size, swatches, ex. in case of jewellery
                else{
                    pdpOverview.whenNoVariantExist(defaultColor);
                }

                pdpOverview.preSelectInCaseOneVariant('color');
            },
            preSelectInCaseOneVariant : function(parent){
                if(parent === 'color'){
                    $('.switch-chest').each(function(){
                        if($(this).find('.switch').not('.hide').length === 1){
                            $(this).find('.switch').trigger('click');
                        }
                    });  
                }else{
                    parent.nextAll('.switch-chest').addClass('hoverdisabled');
                    parent.next('.switch-chest').removeClass('hoverdisabled');
                    if(parent.next('.switch-chest').find('.switch').not('.hide').length === 1){
                        parent.next('.switch-chest').find('.switch').not('.hide').trigger('click');
                    }
                }
            },                                     
            paintBaseProductDetail: function(data){
                var description = data.baseProductDesc;
                if(data.description){
                    description = data.description;
                }
                $('#baseProductDetail').html(pdpBaseProductDetailTemplate({
                    logoURL : data.retailerLogo,
                    productDetail : description
                }));
            },
            paintProductPrice: function(data){
                $('.price-container').html(pdpPricingTemplate({
                    priceRange: data.priceRange || '',
                    saleValue : data.saleValue,
                    listValue : data.listValue,
                    msrpValue : data.msrpValue,
                    percentOff: data.percentOff
                }));
                var options = {trigger:'hover'};
                if(viewportDetect.lastClass === 'small'){
                    options = {trigger:'click'};
                }
                $('.tooltip-init').tooltip(options);
            },
            paintImageCarousel: function(data, baseColor){
                productImagesCarousel.destory();
                var images = data.images;
                if(baseColor){
                    images = data.colordetails[baseColor].images;
                }
                
                if(Boolean(images) && (Object.keys(images).length === 0)){
                    images = null;
                }

                cache.$galleryCarousel.html(pdpProductImageTemplate({
                    images: images
                }));
                if(Boolean(images) && (Object.keys(images).length !== 0)){
                    productImagesCarousel.init();
                }else{
                    productImagesCarousel.noImage();
                }
            },
            paintProductHeader: function(data, selectedSku){
                var retailerUrl = data.retailerUrl || '#',
                    designerUrl = data.designerUrl || '#',
                    title = data.productTitle;
                    if(selectedSku && selectedSku.name){
                        title = selectedSku.name;
                    }
                    
                $('#productHeader').html(pdpProductHeaderTemplate({
                    productTitle: title,
                    additionalPromotion: data.additionalPromotion,
                    retailerName: data.retailerName,
                    retailerUrl: retailerUrl,
                    designerName: data.designerName,
                    designerUrl: designerUrl
                })); 
            },
            equaliseSwatchWidths: function(){
                $('.switch-chest').each(function(){
                    var $list = $(this).find('.size-palette>a'),
                        arrWidth = $list.map(function(){
                            return $(this).outerWidth();
                        }).get();

                    $list.outerWidth( Math.max.apply( null, arrWidth ) +1);
                });
            },
            onColorChange : function(event){
                cache.$addToCartBtn.addClass('disabled').prop('disabled', true);
                pdpOverview.flashOutOfStockMessage(false);
                cache.$skuKey.val('');
                pdpOverview.paintProductHeader(cache.data);
                pdpOverview.paintBaseProductDetail(cache.data);
                var $this = $(event.target),
                    colorId = $this.data('color-id'),
                    priceRange = cache.data.priceRange;
        
                    pdpOverview.paintProductPrice({
                        priceRange: priceRange,
                        percentOff: cache.data.percentOff
                    });
                $this.siblings('.active').removeClass('active');
                $this.addClass('active');
                cache.currentColor = $this.data('color-name').trim(); // update current active color 
                $("#colorName").html(cache.currentColor);
                pdpOverview.paintImageCarousel(cache.data, colorId);
                pdpOverview.paintFilter(cache.data, colorId);
                
                // Should be called after all paints functions
                pdpOverview.equaliseSwatchWidths();

                //check OOS for 1st selection
                pdpOverview.checkInStockForLevelOne(cache.data, colorId);
                
            },
            checkInStockForLevelOne : function(data, colorId){
                var $levelOneSelection = $('.variant-selection-0'),
                swatchType= $levelOneSelection.data('key');
                if($levelOneSelection.length){
                    $levelOneSelection.find('.switch').addClass('not-available').addClass('hide');
                    $levelOneSelection.find('.switch').each(function(){
                        var swatchId = $(this).data('swatchid');
                        data.colordetails[colorId].productDimensionsData.filter(function(obj){
                            if(obj.variantInStore){
                                    if(obj.dimensions[swatchType].swatches[0].valueCategoryId === swatchId){
                                    $levelOneSelection.find('[data-swatchid='+swatchId+']').removeClass('not-available').removeClass('hide');
                                }    
                            }else{
                                $levelOneSelection.find('[data-swatchid='+swatchId+']').removeClass('hide');
                            }
                            
                        });
                    })
                }
            },
            onSwitchClick: function(event){
                var $this = $(event.target),
                    $parent = $this.parents('.switch-chest'),
                    value = $this.data('swatchid');

                pdpOverview.paintProductHeader(cache.data);
                pdpOverview.paintBaseProductDetail(cache.data);

                // hide OOS message
                pdpOverview.flashOutOfStockMessage(false);
                    
                // Do not perform action if active button or not-available clicked again 
                if($this.hasClass('active') || $this.hasClass('not-available') || 
                ($parent.prev().length && !$parent.prev().hasClass('selected'))){
                    return false;
                }
                $this.siblings('.active').removeClass('active');
                $this.addClass('active');
                $parent.addClass('selected').data('selectedVal', value);
                $parent.nextAll('.switch-chest.selected').find('.switch').removeClass('active');
                $parent.nextAll('.list-dropdown.selected').find("select").each(function(){
                    $(this).find("option").eq(0).prop("selected",true);
                });
                $parent.nextAll('.selected').removeData('selectedVal').removeClass('selected');

                if(pdpOverview.isReadyToGenerateSku()){
                    pdpOverview.whenSkuIsReady();
                }else{
                    pdpOverview.whenSkuIsNotReady();                    
                }
                
                pdpOverview.getAvailableItems($parent);

                if((viewportDetect.lastClass === 'small') && 
                    ($parent.filter('[data-key="size"]').length !== 0)){
                    pdpOverview.updateSizeOnMobile($parent, value);
                }

                pdpOverview.preSelectInCaseOneVariant($parent);
            },
            onListDropDownChange: function(event){
                var $this = $(event.target),
                    $parent = $this.parents('.list-dropdown');   

                // Do not perform action if active button or not-available clicked again 
                if(!$parent.prev().hasClass('selected')){
                    $this.children("option:first").prop("selected", true);
                    return false;
                }
                if($this.data('is-title')){
                    $parent.removeClass('selected').removeData('selectedVal');
                }else{
                    $parent.addClass('selected').data('selectedVal', $this.val());
                }
                
                $parent.nextAll('.list-dropdown.selected').find("select").each(function(){
                    $(this).find("option").eq(0).prop("selected",true);
                });
                $parent.nextAll('.list-dropdown.selected').removeData('selectedVal').removeClass('selected');

                if(pdpOverview.isReadyToGenerateSku()){
                    pdpOverview.whenSkuIsReady();                    
                }else{
                    pdpOverview.whenSkuIsNotReady();                    
                }
            },
            isReadyToGenerateSku: function(){
                var $totalFilter = cache.$productFilter.find(".switch-chest, .list-dropdown"),
                    $totalSelectedFilter = $totalFilter.filter(".selected");

                if($totalFilter.length === $totalSelectedFilter.length ){
                    return true;
                }
                return false;
            },
            whenSkuIsReady: function(){
                var searchObj = {}, sku = null;
                cache.$productFilter.find(".selected[data-key]").each(function(){
                    searchObj[$(this).data('key')] = $(this).data('selectedVal');
                });

                searchObj['colorId'] = cache.$colorPalette.find('.color-switches.active').data('color-id');
                
                sku = pdpOverview.getSku(searchObj);
                if(!sku){
                    return;
                }
                cache.$skuKey.val(sku);                
                pdpOverview.rePaintDetailsOnSkuSelection(sku);

                utility.changeUrlParam('sku', sku);

                if(pdpOverview.isSkuInStore(sku)){
                    cache.$addToCartBtn.removeClass('disabled').prop('disabled', false);
                }else{
                    pdpOverview.flashOutOfStockMessage(true);
                }
                                
                pdpOverview.initShareIcons(); 
            },
            whenSkuIsNotReady:function(){
                cache.$addToCartBtn.addClass('disabled').prop('disabled', true);
                cache.$skuKey.val('');
                utility.removeUrlParam('sku');

                pdpOverview.paintProductPrice(cache.data);
                pdpOverview.initShareIcons(); 
            },
            rePaintDetailsOnSkuSelection: function(sku){
                var selectedColor = cache.data.colordetails[$('.color-switches.active').data('color-id')];
                if(sku){
                    var getSKuIndexData = selectedColor.productDimensionsData.filter(function(obj){
                        if(obj.sku === sku){
                            return obj;
                        }
                    });

                    pdpOverview.paintProductPrice(getSKuIndexData[0]);
                    pdpOverview.paintImageCarousel(getSKuIndexData[0]);
                    pdpOverview.paintBaseProductDetail(getSKuIndexData[0]);
                    pdpOverview.paintProductHeader(cache.data, getSKuIndexData[0]);
                }
            },
            initSizeGuideScroll: function(){
                var $scrollBar = $('#scrollContainer');            
                var containerHeight = window.innerHeight-320;
                $scrollBar.css('height', containerHeight+'px');

                $scrollBar.customScrollbar();

                $(document).off('change.sizeChartCategories').on('change.sizeChartCategories', '#sizeChartCategories', function () {
                    $scrollBar.customScrollbar('scrollTo', $('#'+$(this).val()));
                }); 
            },
            initSizeChart: function () {
                var $pdpSizeChartLink = $('#pdpSizeChartLink'),
                modalUrl = $pdpSizeChartLink.data('href');
                $(document)
                    .off('click.pdpSizeChartLink')
                    .on('click.pdpSizeChartLink', '#pdpSizeChartLink', function(){
                        $('#sizeGuideModal').modal('show').find('.modal-content').load(modalUrl, pdpOverview.initSizeGuideScroll);
                    });
                $('#sizeGuideModal').on('shown.bs.modal', pdpOverview.initSizeGuideScroll);
            },
            getSku: function(searchObj){
                var sku = null,
                    list = cache.skusList.filter(function(item){
                        if((Object.keys(item).length === (Object.keys(searchObj).length + cache.excludedParamInObj)) &&
                            (searchObj['colorId'] === item['colorId'])){
                            sku = item["sku"];
                            for(var key in searchObj){
                                if((searchObj[key] !== item[key])){
                                    sku = null;
                                }
                            }
                        }
                        return Boolean(sku);
                    });

                return list[0].sku;
            },
            populateSkus: function(data){
                var colordetails = data.colordetails;
                for (var i in colordetails){
                    var productDimensionsData = colordetails[i].productDimensionsData,
                        list = productDimensionsData.map(function(item){
                        var dimensions = item.dimensions,
                            obj = {sku: item.sku};
                        obj.inStore = item.variantInStore;
                        cache.excludedParamInObj = Object.keys(obj).length; // record number of items not to include while search sku in fn getSku
                        obj.colorId = item.colorId;
                        for(var x in dimensions){
                            obj[x] = dimensions[x].swatches[0].valueCategoryId;
                        }
                        return obj;
                    });
                    cache.skusList = list.concat(cache.skusList);
                }
                
            },
            getAvailableItems: function($parent){
                var colordetails = cache.data.colordetails,
                    colorId = $('#colorPalette .color-switches.active').data('color-id').trim(),
                    key = $parent.data('key').trim(), 
                    selectedVal = $parent.data('selectedVal').trim(),
                    $switches = $parent.nextAll('.switch-chest').find('.switch'),
                    $dropList = $parent.nextAll('.list-dropdown').find('option[value]'),
                    collection = [];

                // making all switches & droplists crossed
                
                $switches.addClass('not-available');
                $switches.addClass('hide');
                $dropList.prop('disabled', true);

                // enabling available switches/dropdown options
                var productDimensionsData = colordetails[colorId].productDimensionsData,
                    list = productDimensionsData.map(function(item){
                        var dimensions = item.dimensions,
                            obj = {};
                        
                        var allPrevSelection = $parent.prevAll('.selected.switch-chest'),
                            isAllKeysSelected = (dimensions[key].swatches[0].valueCategoryId === selectedVal);
                        allPrevSelection.each(function(){
                            var prevSelectedKey = $(this).data('key'),
                                prevSelectedVal = $(this).data('selectedVal');
                            isAllKeysSelected = isAllKeysSelected && (dimensions[prevSelectedKey].swatches[0].valueCategoryId === prevSelectedVal);
                        });

                        if(isAllKeysSelected){
                            for(var x in dimensions){                            
                                if(x === key){
                                    continue;
                                }
                                if(item.variantInStore){
                                    obj[x] = dimensions[x].swatches[0].valueCategoryId;
                                    $switches
                                        .filter('[data-swatchid="'+dimensions[x].swatches[0].valueCategoryId+'"]')
                                        .removeClass('not-available').removeClass('hide');

                                    $dropList
                                        .filter('[value="'+dimensions[x].swatches[0].valueCategoryId+'"]')
                                        .prop('disabled', false);
                                }else{
                                    $switches
                                        .filter('[data-swatchid="'+dimensions[x].swatches[0].valueCategoryId+'"]')
                                        .removeClass('hide');
                                }                                
                            }
                        }
                    return obj;
                    
                });

                collection = list.concat(collection);
            },
            // In case there is no variant like size, swatches, ex. in case of jewellery
            whenNoVariantExist: function(colordetails){
                var sku = colordetails.productDimensionsData.sku;
                cache.$skuKey.val(sku);
                cache.$addToCartBtn.removeClass('disabled').prop('disabled', false);

                utility.changeUrlParam('sku', sku);
            },
            isSkuInStore: function(sku){
                return cache.skusList.filter(function(obj){
                    if(obj.sku ===  sku){
                        return obj.inStore;
                    }
                }).length !== 0? true : false;
            },
            isProductInStore: function(baseColor, isVariant){
                if(isVariant){
                    return cache.data.colordetails[baseColor].productDimensionsData.variantInStore;
                }else{
                    return cache.data.colordetails[baseColor].inStore;
                }               
            },
            flashOutOfStockMessage: function(showMsg){
                if(showMsg){
                    // when product is out of stock
                    $('.out-of-stock.msg').removeClass('hide');
                    cache.$addToCartBtn.html(cache.$addToCartBtn.data('oos-msg'));
                    $('.price-container .off').add('.price-container .tooltip-init').addClass('hide');
                    $('.select-quantity .plus-minus').addClass('out-of-stock');
                }else{
                    $('.out-of-stock.msg').addClass('hide');
                    cache.$addToCartBtn.html(cache.$addToCartBtn.data('addtobag'));
                    $('.price-container .off').add('.price-container .tooltip-init').removeClass('hide');
                    $('.select-quantity .plus-minus').removeClass('out-of-stock');
                }
            },
            retrieveProductFromSku: function(){
                var sku = utility.getParamValueFromUrl('sku');
                if(!Boolean(sku)){
                    pdpOverview.onBaseProductOOS();
                    return false;
                }
                cache.skusList.filter(function(obj){
                    if(obj.sku === sku){
                        $('[data-color-id="'+obj.colorId+'"]').trigger('click');
                        for(var i in obj){
                            if(i === 'sku' || i === 'inStore' || i ==='colorId'){
                                continue;
                            }
                            if(obj.inStore){
                                $('[data-swatchid='+obj[i]+']').trigger('click');
                            }else{
                                pdpOverview.flashOutOfStockMessage(true);
                                $('[data-swatchid='+obj[i]+']').addClass('not-available');
                            }                                   
                        }                        
                    }
                });                   
                
                return true;
            },
            // check base product for OOS 
            onBaseProductOOS: function(){
                if(!pdpOverview.isProductInStore(cache.data.selectedColorName, false)){
                    pdpOverview.flashOutOfStockMessage(true);
                }
            },
            onOpenSizeModal: function (event) {
                var $callingBtn = $(event.relatedTarget),
                    $this = $(event.target),
                    $switches = $this.find('.switch');
                // Remove size set during hidden
                $switches.removeAttr('style');

                // Resize all swatches to same size
                var arrWidth = $switches.map(function(){
                        return $(this).outerWidth();
                    }).get();
                $switches.outerWidth( Math.max.apply( null, arrWidth ) +1);
            },
            updateSizeOnMobile: function ($parent, value){
                $parent.find('.size-update').html(value);
            },
            initShareIcons: function(){
            	var $shareIcons = $(".footer-social section a");
            	$shareIcons.each(function(){
	            	var $this = $(this),
	            		shareUrl = $this.data('href');
	            	if($this.attr('id') !== 'email'){
	            		shareUrl += window.encodeURI(window.location.href);
	            	}else{
	            		shareUrl += window.encodeURI(' <a href="'+window.location.href+'>here</a>.');
	            	} 
	            	$this.attr('href', shareUrl);
            	});
            },
            hideTooltips: function(event){
                if((typeof $('.tooltip.fade.in')[0] !== 'undefined') && !$(event.target).hasClass('tooltip-icon')){
                    $('.tooltip-init').tooltip('hide');
                }                            
            }
            
        };
    
   return pdpOverview;
});