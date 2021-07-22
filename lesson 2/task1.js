function bulbs(N, P) {
  if (N <= 0) {
    throw new Error('N should be greater than 0.');
  }

  const arrayOfBulbs = new Array(N).fill(false);

  for (const inv of P) {
    if (inv <= 0 || inv > N) {
      throw new Error('All values in P should be greater than 0 and less than N.');
    }

    for (let [idx, isBurning] of arrayOfBulbs.entries()) {
      if ((idx + 1) % inv === 0) {
        arrayOfBulbs[idx] = !isBurning;
      }
    }
  }

  let count = 0;
  arrayOfBulbs.forEach((bulb) => {
    if (bulb) {
      ++count;
    }
  });
  return count;
}

console.log(bulbs(20, [2, 3, 8])); // returns 8
console.log(bulbs(172, [19, 2, 7, 13, 40, 23, 16, 1, 45, 9])); // returns 99
