function doIteration(xerox, copies, documentsAvailable) {
  let docsTotal = documentsAvailable,
    copied = copies;
  if (xerox.currentIter > 0) {
    --xerox.currentIter;
    if (xerox.currentIter === 0) {
      ++copied;
      docsTotal += 2;
    }
  }
  return [xerox, copied, docsTotal];
}

function startCopying(xerox, timeNeeded, copiesLeft, documentsAvailable) {
  let docsToCopy = copiesLeft,
    docsTotal = documentsAvailable;
  if (docsToCopy && docsTotal) {
    if (xerox.currentIter === 0) {
      xerox.currentIter = timeNeeded;
      --docsToCopy;
      --docsTotal;
    }
  }

  return [xerox, docsToCopy, docsTotal];
}

function shouldUseOnlyX(timeX, timeY, copiesLeft) {
  return timeX * copiesLeft < timeY;
}

function shouldUseOnlyY(timeX, timeY, copiesLeft) {
  return timeY * copiesLeft < timeX;
}

function copy(amountOfCopies, timeForXeroxX, timeForXeroxY) {
  let copies = 0; // already copied docs
  let copiesLeft = amountOfCopies; // docs left to copy
  let documentsAvailable = 1;

  let xeroxX = {
    currentIter: 0,
  };
  let xeroxY = {
    currentIter: 0,
  };

  for (let tick = 1; ; tick++) {
    if (shouldUseOnlyX(timeForXeroxX, timeForXeroxY, copiesLeft)) {
      [xeroxX, copiesLeft, documentsAvailable] = startCopying(
        { ...xeroxX },
        timeForXeroxX,
        copiesLeft,
        documentsAvailable,
      ); // Xerox X
    } else if (shouldUseOnlyY(timeForXeroxX, timeForXeroxY, copiesLeft)) {
      [xeroxY, copiesLeft, documentsAvailable] = startCopying(
        { ...xeroxY },
        timeForXeroxY,
        copiesLeft,
        documentsAvailable,
      ); // Xerox Y
    } else {
      if (timeForXeroxX < timeForXeroxY) {
        [xeroxX, copiesLeft, documentsAvailable] = startCopying(
          { ...xeroxX },
          timeForXeroxX,
          copiesLeft,
          documentsAvailable,
        ); // Xerox X
        [xeroxY, copiesLeft, documentsAvailable] = startCopying(
          { ...xeroxY },
          timeForXeroxY,
          copiesLeft,
          documentsAvailable,
        ); // Xerox Y
      } else {
        [xeroxY, copiesLeft, documentsAvailable] = startCopying(
          { ...xeroxY },
          timeForXeroxY,
          copiesLeft,
          documentsAvailable,
        ); // Xerox Y
        [xeroxX, copiesLeft, documentsAvailable] = startCopying(
          { ...xeroxX },
          timeForXeroxX,
          copiesLeft,
          documentsAvailable,
        ); // Xerox X
      }
    }

    [xeroxX, copies, documentsAvailable] = doIteration({ ...xeroxX }, copies, documentsAvailable);
    [xeroxY, copies, documentsAvailable] = doIteration({ ...xeroxY }, copies, documentsAvailable);

    if (copies === amountOfCopies) {
      return console.log('Result:', tick, 'seconds.');
    }
  }
}

copy(4, 1, 1); // 3
copy(5, 1, 2); // 4
copy(5, 1, 26); // 5
