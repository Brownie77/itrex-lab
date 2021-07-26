function fillSquare(squareSize, square) {
  let i = Math.floor(squareSize / 2);
  let j = squareSize - 1;

  for (let value = 1; value <= squareSize ** 2; ) {
    if (i === -1 && j === squareSize) {
      i = 0;
      j = squareSize - 2;
    } else {
      if (i < 0) {
        i = squareSize - 1;
      }
      if (j === squareSize) {
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

function genMagicSquare(squareSize) {
  if (squareSize === 1) {
    return [1];
  } else if (squareSize < 3) {
    return 'Impossible';
  } else if (squareSize % 2) {
    const MagicSquare = Array(squareSize)
      .fill(0)
      .map(() => Array(squareSize).fill(0));

    return fillSquare(squareSize, [...MagicSquare]);
  } else {
    return 'This solution only works w/ odd numbers.';
  }
}

function logger(squareSize) {
  return console.log('For squareSize =', squareSize + ':', genMagicSquare(squareSize));
}

logger(0); // Impossible
logger(1); // [1]
logger(2); // Impossible
logger(3);
logger(4); // err
logger(5);
