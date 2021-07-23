function generateVolumes(pages, k) {
  function calculate(arr, depth, parts) {
    const currentIndex = parts.length - depth;

    if (depth === 1) {
      parts[currentIndex] = arr.reduce((total, val) => total + val, 0);
      return Math.max(...parts);
    }

    let biggest = -1;

    for (let i = 0; i < arr.length - depth + 1; ++i) {
      parts[currentIndex] = arr.slice(0, i + 1).reduce((total, val) => total + val, 0);

      const next_biggest = calculate(arr.slice(i + 1), depth - 1, parts);
      if (biggest == -1 || next_biggest < biggest) {
        biggest = next_biggest;
      }
    }
    return biggest;
  }

  return console.log('Result:', calculate(pages, k, Array(k).fill(0)));
}

generateVolumes([1, 2, 1], 2); // returns: 3
generateVolumes([1, 2, 1, 1], 3); // returns: 2
generateVolumes([6, 1, 1, 1], 2); // returns: 6
generateVolumes([1, 3, 2, 1], 3); // returns: 3