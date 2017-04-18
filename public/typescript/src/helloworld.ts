declare function require(path: string): any;
const _ = require('lodash');
// import _ from 'lodash';

interface Person {
  firstName: string,
  lastName: string
}

class Student {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`;
  }
}

function greeter(person: Person) {
    return `Hello, ${person.firstName} ${person.lastName}`;
}

var user = new Student('Daniel', 'HH', "lam");

// document.body.innerHTML = greeter(user);

let arr = [1,2,3,4,5,6,76,8,8,10];
_.map(arr, (item) => {
  console.log(item)
})