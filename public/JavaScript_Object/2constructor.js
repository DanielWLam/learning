function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.sayName=function(){
        console.log(this.name);
    }
}

var person1=new Person('daniel',23,'fe');
var person2=new Person('dingding',18,'fe');

var person3=new Object();
Person.call(person3,'quanju',100,'computer');
person1.sayName();
person3.sayName();
console.log(person1 instanceof Object);
console.log(person1 instanceof Person);