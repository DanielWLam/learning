function Person(){

}

Person.prototype.name='test';
Person.prototype.age=50;
Person.prototype.job='fe';
Person.prototype.sayName=function(){
    console.log(this.name);
};

var person1=new Person();
person1.sayName();

var person2=new Person();
person2.sayName();