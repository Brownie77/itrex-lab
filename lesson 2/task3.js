function doIteration(xerox, copies, documentsAvailable) {
  if (xerox.currentIter > 0) {
    --xerox.currentIter;
    if (xerox.currentIter === 0) {
      ++copies;
      documentsAvailable += 2;
    }
  }
  return [copies, documentsAvailable];
}

function startCopying(xerox, timeNeeded, copiesLeft, documentsAvailable) {
  if (copiesLeft && documentsAvailable) {
    if (xerox.currentIter === 0) {
      xerox.currentIter = timeNeeded;
      --copiesLeft;
      --documentsAvailable;
    }
  }

  return [copiesLeft, documentsAvailable];
}

function shouldUseOnlyX(timeX, timeY, copiesLeft) {
  if (timeX * copiesLeft < timeY) {
    return true;
  } else {
    return false;
  }
}

function shouldUseOnlyY(timeX, timeY, copiesLeft) {
  if (timeY * copiesLeft < timeX) {
    return true;
  } else {
    return false;
  }
}

function copy(N, x, y) {
  let copies = 0; // готовые копии
  let copiesLeft = N; // осталось сделать копий
  let documentsAvailable = 1;

  const xeroxX = {
    currentIter: 0,
  };
  const xeroxY = {
    currentIter: 0,
  };

  for (let tick = 1; ; tick++) {
    if (shouldUseOnlyX(x, y, copiesLeft)) {
      [copiesLeft, documentsAvailable] = startCopying(xeroxX, x, copiesLeft, documentsAvailable); // x
    } else if (shouldUseOnlyY(x, y, copiesLeft)) {
      [copiesLeft, documentsAvailable] = startCopying(xeroxY, y, copiesLeft, documentsAvailable); // y
    } else {
      if (x < y) {
        [copiesLeft, documentsAvailable] = startCopying(xeroxX, x, copiesLeft, documentsAvailable); // x
        [copiesLeft, documentsAvailable] = startCopying(xeroxY, y, copiesLeft, documentsAvailable); // y
      } else {
        [copiesLeft, documentsAvailable] = startCopying(xeroxY, y, copiesLeft, documentsAvailable); // y
        [copiesLeft, documentsAvailable] = startCopying(xeroxX, x, copiesLeft, documentsAvailable); // x
      }
    }

    [copies, documentsAvailable] = doIteration(xeroxX, copies, documentsAvailable);
    [copies, documentsAvailable] = doIteration(xeroxY, copies, documentsAvailable);
    if (copies === N) {
      return console.log('Result:', tick, 'seconds.');
    }
  }
}

copy(4, 1, 1); // 3
copy(5, 1, 2); // 4
