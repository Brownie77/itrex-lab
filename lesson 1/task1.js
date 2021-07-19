// source
function setABS(num) {
  console.log(` ABS:${num}`)
}
function setTraction(num) {
  console.log(` Traction Control:${num}`)
}
function setStability(num) {
  console.log(` Stability Control:${num}`)
}

function setAll(val) {
  setABS(val)
  setTraction(val)
  setStability(val)
}

function Beginner() {
  console.log('Beginner:'), setAll(5)
}

function GoodDriver() {
  console.log('Good Driver:'), setAll(3)
}

function Maniac() {
  console.log('Maniac:'), setAll(1)
}

Beginner()
GoodDriver()
Maniac()
