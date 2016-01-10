var a={a:1};
var b={b:2,c:3}
var c=Object.assign({},a,b);
console.log(a,b,c);

var obj=Object.create({foo:1},{
    bar:{
        value:2
    },
    baz:{
        value:3,
        enumerable:true
    }
});
console.log(obj);
var copy=Object.assign({},obj);
console.log(copy);

var v1='jjj',
    v2=true,
    v3=10,
    v4=Symbol('foo');
var obj=Object.assign({},v1,null,v2,undefined,v3,v4);
console.log(obj);

var target=Object.defineProperty({},'foo',{
    value:1,
    writable:false,
    enumerable:true
})
console.log(target)
