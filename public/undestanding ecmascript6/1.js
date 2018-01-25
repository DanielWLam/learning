var func = []
var object = {
  a: true,
  b: true,
  c: true
}

for (var key in object) {
  func.push(function () {
    console.log(key)
  })
}

func.forEach(item => {
  item()
})