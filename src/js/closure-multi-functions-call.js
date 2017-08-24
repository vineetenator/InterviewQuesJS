function curry(func){
  // Write Here
}

function add(a, b, c, d, e, f){
  return a+b+c+d+e+f;
}

var curryAdd = curry(add);


// Below test cases should be executed.
console.log(curryAdd(1,2,3,4,5,6)); // 21
console.log(curryAdd(1,2,3)(4,5,6)); // 21
console.log(curryAdd(1,2,3)(4)(5,6)); // 21
console.log(curryAdd(1,2,3)(4)(5)(6)); // 21