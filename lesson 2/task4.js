function fillSquare(n, square) {
  let i = Math.floor(n / 2);
  let j = n - 1;

  for (let value = 1; value <= n ** 2; ) {
    if (i === -1 && j === n) {
      i = 0;
      j = n - 2;
    } else {
      if (i < 0) {
        i = n - 1;
      }
      if (j === n) {
        j = 0;
      }
    }

    if (square[i][j] !== 0) {
      ++i;
      j = j - 2;
      continue;
    } else {
      square[i][j] = value;
      ++value;
    }
    --i;
    j++;
  }

  return square;
}

function genMagicSquare(n) {
  if (n === 1) {
    return [1];
  } else if (n < 3) {
    return 'Impossible';
  } else if (n % 2) {
    const MagicSquare = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0));

    return fillSquare(n, [...MagicSquare]);
  } else {
    return 'This solution only works w/ odd numbers.';
  }
}

function logger(n) {
  return console.log('For n =', n + ':', genMagicSquare(n));
}

logger(0); // Impossible
logger(1); // [1]
logger(2); // Impossible
logger(3);
logger(4); // err
logger(5);
