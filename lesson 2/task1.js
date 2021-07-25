function bulbs(bulbsAmount, inversions) {
  if (bulbsAmount <= 0) {
    throw new Error('The amount of bulbs should be greater than 0.');
  }

  const arrayOfBulbs = new Array(bulbsAmount).fill(false);

  inversions.forEach((inv) => {
    if (inv <= 0 || inv > bulbsAmount) {
      throw new Error('All values in the inversions array should be greater than 0 and less than N.');
    }

    arrayOfBulbs.forEach((isBurning, idx, self) => {
      if ((idx + 1) % inv === 0) {
        self[idx] = !isBurning;
      }
    });
  });

  return arrayOfBulbs.reduce((bulb, count) => count + bulb, 0);
}

console.log(bulbs(20, [2, 3, 8])); // returns 8
console.log(bulbs(172, [19, 2, 7, 13, 40, 23, 16, 1, 45, 9])); // returns 99
