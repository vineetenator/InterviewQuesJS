define(['viewportDetect', 'slickCarousel', 'imgZoom'],
    function(viewportDetect) {
        'use strict';
        var cache = {
                $galleryCarousel : $('#galleryCarousel'),
                $pdpimage: $('#pdpimage'),
                initalized: false
            },
            productImagesCarousel = {
            init: function() {
                if(viewportDetect.lastClass === 'small'){           
                    this.initHorizontalCarousel();
                }else{
                    this.initVerticalCarousel();
                }

                cache.initalized = true;
                cache.$galleryCarousel.find('.tail-hide').removeClass('tail-hide');
            },
            destory: function(){
                if(cache.initalized){
                    cache.$galleryCarousel.slick('unslick');
                    cache.$pdpimage.trigger('zoom.destroy');
                    cache.initalized =  false;
                }               
            },
            isInitalized: function(){
               return cache.initalized;
            },
            initVerticalCarousel : function(){
                var showArrows = ($('.carousel-stage .item').length < 6) ? false : true,
                    config = {
                        arrows: showArrows,
                        dots: false,
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        centerPadding: '10px',
                        draggable: true,
                        infinite: false,
                        pauseOnHover: true,
                        swipe: true,
                        touchMove: true,
                        vertical: true,
                        verticalSwiping: true,
                        speed: 300,
                        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                        adaptiveHeight: true,
                        prevArrow: $('.slick-top-prev'),
                        nextArrow: $('.slick-bottom-next')
                    };
                                
                cache.$galleryCarousel.slick(config);
                cache.$galleryCarousel
                    .off('click.slide')
                    .on('click.slide', '.item.slick-slide', function(event){
                        var $currItem = $(event.currentTarget).find('.thumbnail');
                        productImagesCarousel.zoomConfigForDesktop($currItem);
                    });

                    productImagesCarousel.zoomConfigForDesktop();
                
                $('.zoom-plus-icon').not('.minus')
                    .off('click.ZoomIn')
                    .on('click.ZoomIn', function(event){
                        event.stopPropagation();
                        cache.$pdpimage.trigger( 'click' );
                    });
            },
            initHorizontalCarousel: function(){// for mobile
                cache.$galleryCarousel.slick({
                    dots: true,
                    arrows: false,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 1
                });

                cache.$galleryCarousel.on('beforeChange', function(event, slick, currentSlide){
                    if(typeof $(slick.$slider).children('.zoom-plus-icon.minus')[0] !== 'undefined'){
                        $(slick.$slides[currentSlide]).trigger( 'click' );
                        $(slick.$slider).children('.zoom-plus-icon.minus').removeClass('minus');
                    }
                });
                productImagesCarousel.zoomConfigForMobile();
            },
            noImage: function(){
                var productsImgSrc = $('#noImageContainer picture').data('product-img'),
                    imgElem = productImagesCarousel.getImgElem(productsImgSrc);

                cache.$pdpimage.empty().addClass('no-image').append(imgElem);
            },
            getImgElem: function (productImgSrc){
                return $('<img role="photo" class="photo-1x" alt="product image"/>').attr('src', productImgSrc);
            },
            zoomConfigForDesktop: function ($elem){
                if(typeof $elem === 'undefined'){
                    $elem = cache.$galleryCarousel.find('.item.slick-slide:first').find('.thumbnail');
                }
    
                var $pictureElem = $elem.parents('picture:first'),
                    productImgSrc = $pictureElem.data('product-img') || $elem.attr('src'),
                    zoomImgSrc = $pictureElem.data('zoom-img-src') || productImgSrc,
                    imgElem = productImagesCarousel.getImgElem(productImgSrc);
    
                // Adding image src to right pane for desktop
                cache.$pdpimage.empty().removeClass('no-image').append(imgElem);
                cache.$pdpimage.zoom({
                                        url: zoomImgSrc,
                                        on: 'click',
                                        onZoomIn: function(){
                                            $('.zoom-plus-icon').addClass('minus');
                                            $('.zoom-cross').show();
                                            cache.$pdpimage.addClass('active');
                                        },
                                        onZoomOut: function(){
                                            $('.zoom-plus-icon').removeClass('minus');
                                            $('.zoom-cross').hide();
                                            cache.$pdpimage.removeClass('active');
                                        }
                                    });
                
                cache.$galleryCarousel.find('.item.selected').removeClass('selected');
                $elem.parents('.item:first').addClass('selected');
            },
            
            zoomConfigForMobile: function (){// for mobile
                var $productImgElems = $('.slick-track .slick-slide .thumbnail');
                
                $productImgElems.each(function(){
                    var $this = $(this),
                        $pictureElem = $this.parents('picture:first'),
                        zoomImgSrc = $pictureElem.data('zoom-img-src') || $pictureElem.data('product-img') || $this.attr('src'),
                        zoomConfig = {
                            url: zoomImgSrc,
                            on: 'grab',
                            onZoomIn: function(){
                                $('.zoom-plus-icon').addClass('minus');
                                $('.zoom-cross').show();
                                productImagesCarousel.pauseSlider(false);
                            },
                            onZoomOut: function(){
                                $('.zoom-plus-icon').removeClass('minus');
                                $('.zoom-cross').hide();
                                productImagesCarousel.pauseSlider(true);
                            }
                        };
                    //$this.removeClass('tail-hide');
                    $this.parents('.slick-slide:first').zoom(zoomConfig);                    
                });
    
                $(".carousel-stage").append('<a href="javascript:void(0);" class="zoom-cross">'+
                                            '</a><a href="javascript:void(0);" class="zoom-plus-icon"></a>');
            },
            pauseSlider: function(enableFlag){
                if(typeof enableFlag === 'undefined') {
                    enableFlag = true;
                }
                cache.$galleryCarousel.slick('slickSetOption', 'touchMove', enableFlag, true);
            }         
        };        

        return productImagesCarousel;
});