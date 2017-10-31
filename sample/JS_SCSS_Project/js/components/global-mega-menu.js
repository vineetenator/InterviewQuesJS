/**
 * @function : rlutility
 * @description : use this for global email subscription modal functionality
 */
define(['jquery', 'mobileMegaMenu', 'utility'], function($, mobileMegaMenu, utility) {
    'use strict';
    var cache = {};
    var globalMegaMenu = {
        init: function() {
            this.initVariables();
            this.initEvents();
            this.initAjax();
            this.megaMenuNevigation();
            this.initMobileMenu();
        },
        initVariables: function() {
            cache = {
                $menuLevel1Ancor: $('.menu-level-1 a'),
                $desktopMegaMenu: $('.desktop-mega-menu'),
                $desktopCatPanel: $('.desktop-cat-panel'),
                $megaMenuBanner: $('.mega-menu-banner'),
                $navbar: $('#navbar'),
                $topMenuOpen: $('.top-menu-open'),
                $mainMenu: $('.main-menu'),
                $mobileMenuAccordian : $('.mobile-accordian'),
                $document : $(document),
                $navLoginFlyout : $('.login-area')
            }
        },
        initAjax: function() {},
        initEvents: function() {
            cache.$document.on('keydown', '.menu-level-1 a', globalMegaMenu.handleLeftToRightArrow);
            cache.$document.on('keydown', '.desktop-cat-panel a', globalMegaMenu.handleRightToLeftArrow);
            //init calculate height function.
            this.calculateNavHeight();
        },
        handleRightToLeftArrow: function(event){
            if (event.keyCode === 37) {
                // left arrow key pressed, focus to 1st level category 
                cache.$menuLevel1Ancor.eq(0).focus();
            }
        },
        handleLeftToRightArrow: function(event){
            if (event.keyCode === 39) {
                // right arrow key pressed, focus to 2nd level categories link
                $($(this).data('cat-id')).find('a').eq(0).focus();
            }
        },
        initMobileMenu: function() {
            cache.$mainMenu.mobileMegaMenu({
                changeToggleText: true,
                enableWidgetRegion: true,
                prependCloseButton: true,
                stayOnActive: true,
                toogleTextOnClose: '<span class="mobile-close-menu"></span>',
                menuToggle: 'main-menu-toggle'
            });
            $("li.mymobilemenu > ul").css("display","none");
            cache.$document.on('click', '.open-accordian', function(e) {
                e.preventDefault();
                $(this).next('.mobile-accordian').collapse('toggle');
            });

            cache.$mobileMenuAccordian.on('show.bs.collapse hidden.bs.collapse', function() {
                $(this).prev('a').toggleClass('minus-icon');
            });
        },
        megaMenuNevigation: function() {
            cache.$menuLevel1Ancor.on('mouseover focus', function() {
                var catId = $(this).data('cat-id');
                cache.$menuLevel1Ancor.removeClass('active');
                $(this).addClass('active');
                cache.$desktopMegaMenu.addClass('white-bg');
                cache.$desktopCatPanel.hide();
                cache.$megaMenuBanner.show();
                $(catId).show();
            });
            cache.$topMenuOpen.on('hide.bs.dropdown', function() {
                cache.$desktopMegaMenu.removeClass('white-bg');
                cache.$desktopCatPanel.hide();
                cache.$menuLevel1Ancor.removeClass('active');
                cache.$navbar.removeClass('navbarborder');
                cache.$megaMenuBanner.hide();
                utility.pageScreenBlurOnHeaderLinks('hide');

            });
            cache.$topMenuOpen.on('show.bs.dropdown', function() {
                cache.$navbar.addClass('navbarborder');
                utility.pageScreenBlurOnHeaderLinks('show');
            });
            cache.$navLoginFlyout.on('hide.bs.dropdown', function() {
                utility.pageScreenBlurOnHeaderLinks('hide');
            });
            cache.$navLoginFlyout.on('show.bs.dropdown', function() {
                utility.pageScreenBlurOnHeaderLinks('show');
            });
            cache.$desktopMegaMenu.on('click', function(e) {
                e.stopPropagation();
            })
            $(document).on('click', '.second-level-menu a', function(e) {
                e.stopImmediatePropagation();
            })
        },

        //this function is used to calculate top navigation height.
        calculateNavHeight:function () {
            $(document).ready(function () {
                var height = 0;
                $('.menu-level-1').find("li").each(function () {
                    if (height === 0) {
                        height = $(this).height();
                    } else {
                        height = height + $(this).height();
                    }
                });
                $('.menu-borderleft').css('min-height', height + 10 + 'px');
            });
        }
    };
    $(function() {
        globalMegaMenu.init();
    });
    return globalMegaMenu;
});