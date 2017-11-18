class Person{
    constructor(name, age){
        this.name = name;
        this.age =  age;        
    }

    about(){
        console.log(`You're ${this.name} and your age is ${this.age}`);
    }
}

class Athlete extends Person{
    constructor(name, age, gold){
        super(name, age); // super class must be called before assigning other variables
        this.gold = gold;
    }

    aboutMe(){
        console.log(`You're ${this.name} and your age is ${this.age} and golds ${this.gold}`);
	}
}

var a = new Athlete("Bolt", 35, 15);
a.aboutMe();