class StringFormater {
  removeNonUniqueChars(string) {
    const occurrences = new Set();
    return string.replace(/[A-Z]/gi, (val) => {
      const atLeastSecondOccurency = occurrences.has(val);
      if (!atLeastSecondOccurency) {
        occurrences.add(val);
      }
      return atLeastSecondOccurency ? '' : val;
    });
  }
}

class RemoveWithRegex extends StringFormater {
  constructor(regex) {
    super();
    this._regex = regex;
    this.occurrences = new Set();
  }

  removeNonUniqueChars(string) {
    // removes second+ occurences
    return string.replace(this._regex, (val) => {
      const atLeastSecondOccurency = this.occurrences.has(val);
      if (!atLeastSecondOccurency) {
        this.occurrences.add(val);
      }
      return atLeastSecondOccurency ? '' : val;
    });
  }
}

const char = new StringFormater(); // removes all the repeated chars
console.log(char.removeNonUniqueChars('dsnfk14sqasld,13'));
const number = new RemoveWithRegex(/[0-9]/g); // removes numbers
console.log(number.removeNonUniqueChars('dsnfk14asld,13'));
const date = new RemoveWithRegex(/(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}/g); // removes dates
console.log(date.removeNonUniqueChars('dsnfk14asl30-08-2011d,130-08-20113'));
const substring = new RemoveWithRegex(/sn/g); // removes the substrings
console.log(substring.removeNonUniqueChars('snod[sn]lf'));
