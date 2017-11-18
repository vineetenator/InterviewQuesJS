function Person(n, race){
  this.constructor.population++;
  // race & n are become private members
  // Private- not visible in object in console
  var alive = true, age = 1;
  var maxAge = 70+Math.round(Math.random()*15)+Math.round(Math.random()*15);
  var isSick = function(){return (Math.round(Math.random()*10) < 30);}
  function makeOlder(){
     return alive = (++age <= maxAge);
  } 

  var myName=n?n:"John Doe";
  var weight=1;
  // previlaged/protected - can't be modified for Class
  this.toString=this.getName=function(){ return myName } 
  this.eat=function(){ 
		if (makeOlder()){ 
			this.dirtFactor++;
			return weight*=3;
		} else alert(myName+" can't eat, he's dead!");
	} 
	this.exercise=function(){ 
		if (makeOlder()){ 
			this.dirtFactor++;
			return weight/=2;
		} else alert(myName+" can't exercise, he's dead!");
	} 
	this.weigh=function(){ return weight } 
	this.getRace=function(){ return race } 
	this.getAge=function(){ return age } 
	this.muchTimePasses=function(){ age+=50; this.dirtFactor=10; } 
    // pubilc
    this.clothing="nothing/naked";
	this.dirtFactor=0;
}
//public - part of prototype -  cant access private var and funtions
Person.prototype.beCool = function(){ this.clothing="khakis and black shirt" } 
Person.prototype.shower = function(){ this.dirtFactor=2 } 
Person.prototype.showLegs = function(){ console.log(this+" has "+this.legs+" legs") } 
Person.prototype.amputate = function(){ this.legs-- } 
Person.prototype.legs=2;

// static - part of constructor, where constructor is part of prototype
Person.population = 0;


function main(){
  var gk=new Person("Gavin","caucasian");
  var lk=new Person("Lisa","caucasian");
  gk.beCool();
  gk.race = "hispanic";
  //gk.getAge=function(){ return 12; } // will overwrite for gk only.
  gk.muchTimePasses();
  gk.muchTimePasses();
  gk.eat();
  gk.exercise();
  gk.eat();
  console.log(gk.getAge());
  
}

main();