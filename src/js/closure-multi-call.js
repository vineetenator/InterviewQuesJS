function curry(func){
  function callback(){
    
    for(var i = 0,args = []; i < arguments.length; i++){
      args.push(arguments[i]);
    }
    
    if(arguments.length < add.length){
      
      return function (){
        for(var i = 0,args2 = []; i < arguments.length; i++){
          args2.push(arguments[i]);
        }
        return callback.apply(undefined, [].concat(args,args2));
      }
    }

    return add.apply(undefined,args) ;
  };


  return callback;
}

function add(a, b, c, d, e, f){
  return a+b+c+d+e+f;
}

var curryAdd = curry(add);

console.log(curryAdd(1,2,3,4,5,6));
console.log(curryAdd(1,2,3)(4,5,6));
console.log(curryAdd(1,2,3)(4)(5,6));
console.log(curryAdd(1,2,3)(4)(5)(6));