export default class Dog {
  constructor (name) {
    this.name = name
  }
  wow () {
    console.log('wow, I am ' + this.name)
  }
}