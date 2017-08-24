function curry(func){
  var args = [];

  function myfunc(){
    if(args.length >= 6){
      args.splice(0, args.length);
    }
    for(i in arguments){
      args.push(arguments[i]);
    }
    var len = args.length;
    if(len<6){
      
      return myfunc;
    }
    return add(args[0], args[1], args[2], args[3], args[4], args[5]) ;
  };


  return myfunc;
}

function add(a, b, c, d, e, f){
  return a+b+c+d+e+f;
}

var curryAdd = curry(add);

console.log(curryAdd(1,2,3,4,5,6));
console.log(curryAdd(1,2,3)(4,5,6));
console.log(curryAdd(1,2,3)(4)(5,6));
console.log(curryAdd(1,2,3)(4)(5)(6));