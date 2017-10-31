define(['jquery', 'matchMedia'], function($){
	'use strict';
	function viewportDetect() {
		this.jsMedia = [{
			size: '(min-width: 960px)',
			screen: 'large'
		}, {
			size: '(min-width: 320px)',
			screen: 'small'
		}];
		this.lastClass = '';
		this.init();
	}
	viewportDetect.prototype = {
		init: function() {
			this.getViewport();
			this.trackViewportOnResize();
		},
		getViewport: function() {
		    for (var i = 0; i < this.jsMedia.length; i++) {
				if (window.matchMedia(this.jsMedia[i].size).matches) {
				    if(this.lastClass !== this.jsMedia[i].screen) {
				        $('body').attr('data-viewport', this.jsMedia[i].screen);
				        $(document).trigger(this.jsMedia[i].screen);
				        this.lastClass = this.jsMedia[i].screen;
				    }
					break;
				}
			}
		},
		trackViewportOnResize: function() {
			var _self = this;
			window.addEventListener('resize', function() {
				_self.getViewport();
			});
		}
	};
	return new viewportDetect();
});