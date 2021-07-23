function counter(num) {
  let increaseVal = 2
  return () => {
    if (num % 5 === 0 && num) {
      increaseVal = 3
      return (num = num / 5)
    } else if (num % 7 === 0 && num) {
      increaseVal = 1
      return (num = num - 7)
    } else {
      return (num = num + increaseVal)
    }
  }
}

const test = counter(16)

console.log(test())
console.log(test())
console.log(test())
console.log(test())
console.log(test())
