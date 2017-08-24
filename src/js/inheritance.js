function Person(a,h){
  this.age = a;
  this.h = h;
  this.getAge = function(){return this.age;}
}

function Athlete(a,h,g){
  this.gold = g;
  /*****************************************************/
  Person.call(this,a,h);
  /*****************************************************/
}

/*****************************************************/
Athlete.prototype = Object.create(Person.prototype, Man.prototype);
Athlete.prototype.constructor = Athlete;
/*****************************************************/
var ath = new Athlete(21,61,10);
var ath2 = new Athlete(2,16,4);

console.log(ath);
console.log("height: "+ath.h);

console.log(ath2);
console.log("height2: "+ath2.h);
console.log("Age: "+ath.getAge());