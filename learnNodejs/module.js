var name;
module.exports = {
    
    setName: function(thyName) {
        name = thyName;
    },
    sayHello: function() {
        console.log('Hello ' + name);
    }
}