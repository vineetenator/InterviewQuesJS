class A{
    constructor(){

    }
    func(){
        console.log("I am A");
    }
}

class B extends A{
    constructor(){
        super();
    }
    func(){
        super.func();
        console.log("I am B");
    }
}

var o = new B;
o.func();
var oa = new A;
oa.func();