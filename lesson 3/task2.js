class Trasnform {
  toRoman(num) {
    if (num < 1) {
      console.error("Error (fn convertToRoman(num)): Can't convert negetive numbers. You provided: " + num);
      return false;
    }
    if (+num > 3000000) {
      console.error("Error (fn convertToRoman(num)): Can't convert numbers greater than 3000000. You provided: " + num);
      return false;
    }
    if (!+num) {
      console.error(
        "Error (fn convertToRoman(num)): 'num' must be a number or number in a string. You provided: " + num,
      );
      return false;
    }

    function num2let(a, b, c, num) {
      if (num < 4) return a.repeat(num);
      else if (num === 4) return a + b;
      else if (num < 9) return b + a.repeat(num - 5);
      else return a + c;
    }

    let romanArray = ['I', 'V', 'X', 'L', 'C', 'D', 'M', 'Vb', 'Xb', 'Lb', 'Cb', 'Db', 'Mb']; // Xb means Xbar

    let arr = String(+num)
      .split('')
      .map((el) => +el);
    let len = arr.length;
    let roman = '';
    arr.forEach((el) => {
      let index = (len - 1) * 2;
      roman += num2let(romanArray[index], romanArray[index + 1], romanArray[index + 2], el);
      len--;
    });

    return roman;
  }

  toArabic(num) {
    return num;
  }

  toMorse(num) {
    const str = num.toString();
    const morseCode = {
      0: '-----',
      1: '.----',
      2: '..---',
      3: '...--',
      4: '....-',
      5: '.....',
      6: '-....',
      7: '--...',
      8: '---..',
      9: '----.',
    };
    return str
      .toUpperCase()
      .split('')
      .map((el) => {
        return morseCode[el] ? morseCode[el] : el;
      })
      .join('');
  }
}

class Mul extends Trasnform {
  constructor(sys) {
    super();
    this._system = sys.toUpperCase();
  }

  multiply(a, b) {
    switch (this._system) {
      case 'ARABIC':
        return this.toArabic(a * b);
      case 'ROMAN':
        return this.toRoman(a * b);
      case 'MORSE':
        return this.toMorse(a * b);
    }
  }
}

class Sum extends Trasnform {
  constructor(sys) {
    super();
    this._system = sys.toUpperCase();
  }

  add(a, b) {
    switch (this._system) {
      case 'ARABIC':
        return this.toArabic(a + b);
      case 'ROMAN':
        return this.toRoman(a + b);
      case 'MORSE':
        return this.toMorse(a + b);
    }
  }
}

class Div extends Trasnform {
  constructor(sys) {
    super();
    this._system = sys.toUpperCase();
  }

  divide(a, b) {
    switch (this._system) {
      case 'ARABIC':
        return this.toArabic(a / b);
      case 'ROMAN':
        return this.toRoman(a / b);
      case 'MORSE':
        return this.toMorse(a / b);
    }
  }
}

const mul = new Mul('roman');
console.log(mul.multiply(1, 2)); // 2
console.log(mul.multiply(2, 3)); // 6
const sum = new Sum('Morse');
console.log(sum.add(5, 3)); // 8
const div = new Div('arabic');
console.log(div.divide(4, 2)); // 2
