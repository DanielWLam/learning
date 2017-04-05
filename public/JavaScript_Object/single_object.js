//#1
var o = new Object();
o.name = 'daniel';
o.age = '23';
o.job = "fe";
o.sayName = function() {
    console.log(this.name);
}

o.sayName();

var person={
    name:'daniel',
    age:23,
    job:'fe',
    sayName:function(){
        console.log(this.name);
    }
}

person.sayName();