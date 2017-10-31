define('pages/pdp', ['hbshelpers', 'pdpOverview', 'qtySelector','pdpAddtocart', 'globalTilesCarousel'],
    function(hbshelpers, pdpOverview, qtySelector) {
        'use strict';
        var pdp = {
            init: function() {
                pdpOverview.init();
                qtySelector.init();
            }
        };

        $(function() {
            pdp.init();
        });
    });