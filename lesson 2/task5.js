function findKayakAmount(peopleWeights, carryingCapacity) {
  const map = new Map();

  for (const [firstIdx, personX] of peopleWeights.entries()) {
    map.set(firstIdx, personX);
    for (const [secondIdx, personY] of peopleWeights.entries()) {
      if (personX !== personY) {
        const twoPersonsWeight = personX + personY;
        if (twoPersonsWeight <= carryingCapacity && map.get(firstIdx) < twoPersonsWeight) {
          map.set(firstIdx, twoPersonsWeight);
          if (map.has(secondIdx)) {
            map.delete(secondIdx);
          }
        }
      }
    }
  }

  return console.log('The minimum amount of kayaks needed is:', map.size);
}

findKayakAmount([50, 74, 60, 82], 135); // 2
findKayakAmount([50, 120, 74, 60, 100, 82], 135); // 4
