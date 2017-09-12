class counter{
    constructor(){
        var c = 0; // Private var accessible only in constructor 
    
        this.add = () =>{
            return c++;
        }
        this.curr = () =>{
        return c;
        }
    }

    sub(){ // Note: it is a part prototype
        c--; // ReferenceError: c is not defined when c is defined as variable
    }

    // Here we can't cant define a function with function or this key word
    // function sub(){} -- error
    // this.sub = function(){} --  error
    // this.sub = () =>{} -- error
}

var mycounter = new counter();
mycounter.add();
mycounter.add();
//mycounter.sub();
mycounter.add();

console.log(mycounter.curr());

var x = new counter();

x.add();
x.add()
console.log(x.curr());
console.log(x);

/* Object x
********************************************************************
counter {add: ƒ, curr: ƒ}
    add : () =>{ return c++; }  // ---- Note: this is for self ----
    curr : () =>{ return c; } // ---- Note: this is for self ----
    __proto__ :
        constructor : class counter
        sub : ƒ sub() // ---- Note: it is a part prototype ----
         __proto__ : Object
*/