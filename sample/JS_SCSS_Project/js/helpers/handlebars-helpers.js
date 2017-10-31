/**
 * @function : hbshelpers
 * @description : use this for any global handlebars helper functions
 */
define('hbshelpers', ['handlebars', 'utility'], function(handlebars) {
    //check length helper
    handlebars.registerHelper('check_length', function(array, length, opts) {
        if (array.length > length) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    //helper to return stringify JSON
    handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });

    handlebars.registerHelper('trim', function(context) {
        return context.trim();
    });


    /**
     * helper name ifCond - to check all the possible conditions
     * @description if condition with multiple operators
     * @usage {{#ifCond a "===" b}} .. {{else}} .. {{/ifCond}}
     */

    var getCond = function(v1, operator, v2) {
        var cond;
        switch (operator) {
            case '===':
                cond = (v1 === v2);
                break;
            case '<':
                cond = (v1 < v2);
                break;
            case '<=':
                cond = (v1 <= v2);
                break;
            case '>':
                cond = (parseInt(v1) > parseInt(v2));
                break;
            case '>=':
                cond = (v1 >= v2);
                break;
            case '&&':
                cond = (v1 && v2);
                break;
            case '||':
                cond = (v1 || v2);
                break;
            case '!==':
                cond = (v1 !== v2);
                break;
            default:
                cond = false;
        }
        return cond;
    };

    
    handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
        var cond = getCond(v1, operator, v2);
        if (cond) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    //helper to generate a random number
    handlebars.registerHelper('randomNumber', function() {
        return Math.floor(Math.random() * 1000) + 1;
    });

    //helper to math values
    handlebars.registerHelper("math", function(lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    });

    //helper to get color stock
    handlebars.registerHelper('isColorOutOfStock', function(v1, v2, options) {
        
        if(v1[v2] && !v1[v2].inStore){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    });


    //helper to get index of
    handlebars.registerHelper('index_of', function(context, ndx) {
        return context[ndx];
    });

});