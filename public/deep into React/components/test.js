class Rectangle {
  constructor (width, length) {
    this.width = width
    this.length = length
  }
  getSize () {
    console.log('width: ', this.width)
    console.log('length: ', this.length)
    return this.width * this.length
  }
}

class Square extends Rectangle {
  constructor (length) {
    super()
  }
}

const s = new Square(10)

console.log(s.getSize())

