function counter(num) {
  let increaseVal = 2
  return () => {
    if (num % 5 === 0 && !!num) {
      return (increaseVal = 3), (num = num / 5)
    } else if (num % 7 === 0 && !!num) {
      return (increaseVal = 1), (num = num - 7)
    } else {
      return (num = num + increaseVal)
    }
  }
}

const test = counter(-2)

console.log(test())
console.log(test())
console.log(test())
console.log(test())
console.log(test())
