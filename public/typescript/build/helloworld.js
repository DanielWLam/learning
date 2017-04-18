var _ = require('lodash');
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student('Daniel', 'HH', "lam");
// document.body.innerHTML = greeter(user);
var arr = [1, 2, 3, 4, 5, 6, 76, 8, 8, 10];
_.map(arr, function (item) {
    console.log(item);
});
