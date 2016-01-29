function createPerson(name,age,job){
    var o=new Object();
    o.name=name;
    o.age=age;
    o.job=job;
    o.sayName=function(){
        console.log(this.name);
    }
    return o;
}

var person=createPerson('daniel',23,'fe');
var person2='createPerson('dingding',23,'doctor');
person.sayName();
person2.sayName();
console.log(person instanceof Object);
console.log(person instanceof createPerson);