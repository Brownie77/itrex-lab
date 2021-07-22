/*
Имеется ряд из N лампочек, которые пронумерованы от 1 до N. Изначально ни одна из лампочек не горит.
Далее происходит K последовательных линейных инверсий этого ряда ламп.
Под линейной инверсией понимается инверсия каждой P-й лампочки в ряде. Например, если P=3, то произойдет инверсия 3й, 6й, 9й и т.д. лампочек.

Требуется определить: сколько горящих лампочек останется после реализации всех заданных линейных инверсий?

## Input

N: number // amount of bulbs
P: number[] // array of P's


## Output

amout: number // amount of burning light bulb


## Example

// Ex. 1
bulbs(20, [2,3,8]); // returns 8

// Ex. 2
bulbs(172, [19 2 7 13 40 23 16 1 45 9]) // returns 99
*/

function bulbs(N, P) {
  if (N <= 0) {
    throw new Error('N should be greater than 0.')
  }

  const arrayOfBulbs = new Array(N).fill(false)

  for (const inv of P) {
    if (inv <= 0 || inv > N) {
      throw new Error(
        'All values in P should be greater than 0 and less than N.',
      )
    }

    for (let [idx, isBurning] of arrayOfBulbs.entries()) {
      if ((idx + 1) % inv === 0) {
        arrayOfBulbs[idx] = !isBurning
      }
    }
  }

  let count = 0
  arrayOfBulbs.forEach((bulb) => {
    if (bulb) {
      ++count
    }
  })
  return count
}

console.log(bulbs(20, [2, 3, 8])) // returns 8
console.log(bulbs(172, [19, 2, 7, 13, 40, 23, 16, 1, 45, 9])) // returns 99
