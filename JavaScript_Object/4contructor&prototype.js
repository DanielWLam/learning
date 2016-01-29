function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.friends=['shely','mike'];
}

Person.prototype.sayName=function(){
    console.log(this.name);
}

var person1=new Person('daniel',23,'fe');
person1.friends.push('van');
person1.sayName();
console.log(person1.friends);

var person2=new Person('dingding',18,'fe');
console.log(person2.friends);