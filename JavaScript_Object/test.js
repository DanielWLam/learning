function Foo(){

}
Object.prototype.name='my object';
Foo.prototype.name='Bar';

var obj=new Object();
var foo=new Foo();
console.log(obj.name);
console.log(foo.name);
console.log(foo.__proto__.name);
console.log(foo.__proto__.__proto__.name);
console.log(foo.__proto__.constructor.prototype.name);