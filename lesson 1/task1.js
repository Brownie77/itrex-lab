// source

const settings = {
  ABS: 0,
  TractionControl: 0,
  StabilityControl: 0,
}

function setABS(num) {
  settings.ABS = num
  console.log(`ABS:${settings.ABS}`)
}
function setTraction(num) {
  settings.TractionControl = num
  console.log(`Traction Control:${settings.TractionControl}`)
}
function setStability(num) {
  settings.StabilityControl = num
  console.log(`Stability Control:${settings.StabilityControl}`)
}

function setAll(val) {
  setABS(val)
  setTraction(val)
  setStability(val)
}

function Beginner() {
  console.log('**Beginner**')
  setAll(5)
}

function GoodDriver() {
  console.log('**Good Driver**')
  setAll(3)
}

function Maniac() {
  console.log('**Maniac**')
  setAll(1)
}

Beginner()
GoodDriver()
Maniac()
