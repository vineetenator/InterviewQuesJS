function curry(func){  
  var cb = function(...args) {
    if (args.length >= 6) return func(...args);
    return function(...args2) {
      return cb(...[...args, ...args2]);
    };
  };
  return cb;
}

function add(a, b, c, d, e, f) {
  return a+b+c+d+e+f;
}

var curryAdd = curry(add);


// Below test cases should be executed.
console.log(curryAdd(1,2,3,4,5,6)); // 21
console.log(curryAdd(1,2,3)(4,5,6)); // 21
console.log(curryAdd(1,2,3)(4)(5,6)); // 21
console.log(curryAdd(1,2,3)(4)(5)(6)); // 21
