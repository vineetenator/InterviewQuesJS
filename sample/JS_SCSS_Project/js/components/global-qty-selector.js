define([],
function() {
    'use strict';
    var selector = {},
        DELAY_IN_CONTINUOUS_UPDATE = 70,
        requestId = null,
        qtySelector = {
            init: function() {
                this.initVariables();
                this.initEvents();
                this.initialize();
            },
            initVariables: function() {
                selector = {
                    container : '.select-quantity',
                    qtyBox: '.plus-minus',
                    plus: 'a.increase',
                    minus: 'a.decrease',
                    input: 'input.quantity'
                }
            },  
            
            initEvents: function() { 
                var $qtyBox = $(selector.qtyBox),
                    $allplus = $qtyBox.children(selector.plus),
                    $allMinus = $qtyBox.children(selector.minus),
                    $allInput = $qtyBox.children(selector.input);
                    
                // Bind event to minus/plus btn
                $allMinus
                    .add($allplus)
                    .off('allMinusPlus')
                    .on('mousedown.allMinusPlus', function(event){
                        event.preventDefault();
                        var $this = $(event.target),
                            step = $this.hasClass('decrease') ? -1 : 1,
                            timeOutId = null;

                        if($this.hasClass('disabled')){
                            return false;
                        }
                        
                        timeOutId = window.setInterval(function(){
                            qtySelector.updateQty($this, step);
                        }, DELAY_IN_CONTINUOUS_UPDATE);

                        $this.data('timeOutId', timeOutId);
                    })
                    .on('mouseup.allMinusPlus mouseleave.allMinusPlus', function(event){
                        event.preventDefault();
                        var $this = $(event.target),
                            timeOutId = $this.data('timeOutId');
                        
                        timeOutId && clearInterval(timeOutId);
                        $this.removeData('timeOutId');
                    });

                // Bind validator on input field
                qtySelector.qtyValidator($allInput);
            },
            initialize : function (){
                var $qtyBox = $(selector.qtyBox);
        
                // enable disable plus-minus box according to value
                $qtyBox.each(function() {
                    qtySelector.rectifyQtyBox($(this));
                });
            },

            rectifyQtyBox: function($currQtyBox){
                if(!Boolean($currQtyBox)){
                    console.warn("$currQtyBox should be jQuery Object.");
                    return false;
                }

                var $plus = $currQtyBox.children(selector.plus),
                    $minus = $currQtyBox.children(selector.minus),
                    $input = $currQtyBox.children(selector.input),
                    val = parseInt($input.val()),
                    max = parseInt($input.attr('max')),
                    min = parseInt($input.attr('min')),
                
                    minusDisable = (val <= min) ? 'addClass' : 'removeClass',
                    plusDisable = (val >= max) ? 'addClass' : 'removeClass';

                $minus[minusDisable]('disabled');
                $plus[plusDisable]('disabled');
            },
            updateQty: function ($this, byValue){
                var $parent = $this.parent(),
                    $input = $parent.children(selector.input),
                    max = parseInt($input.attr('max')),
                    min = parseInt($input.attr('min')),
                    newVal = parseInt($input.val()) + parseInt(byValue);
        
                // Checks out of bound values
                if(newVal < min || newVal > max){
                    return false;
                }
                $input.val(newVal);
                qtySelector.rectifyQtyBox($parent);
                return true;
            },
            qtyValidator: function($allInput){
                $allInput.keypress(function(event){
                        if(event.keyCode === 13){
                            return false;
                        }
                        var charCode = (event.which) ? event.which : event.keyCode;
                        if (charCode!==9 && charCode!==190 && charCode!==46 && charCode > 31 && (charCode < 48 || charCode > 57)){
                            return false;
                        }
                        return true;
                    }).keyup(function(event){
                        var $this = $(event.target),
                            max = parseInt($this.attr('max')),
                            min = parseInt($this.attr('min')),
                            val = parseInt($this.val());
                        if(val > max){
                            $this.val(max);
                            qtySelector.rectifyQtyBox($this.parent());
                        }
                        if(val < min){
                            $this.val(min);
                            qtySelector.rectifyQtyBox($this.parent());
                        }
                    }).blur(function(event){
                        var $this = $(event.target);
                        if($this.val() === ''){
                            $this.val(1);
                            qtySelector.rectifyQtyBox($this.parent());
                        }
                    });
            }

        };

   
   return qtySelector;
});