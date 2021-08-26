const { randomUUID: uuid } = require('crypto');

module.exports = class Patient {
  static publicTag = 0; // needed for handling the same names

  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.#increment();
    this.identifier = `${this.name}-${this.publicTag}`;
  }

  #increment() {
    // eslint-disable-next-line no-plusplus
    this.publicTag = ++Patient.publicTag;
  }
};
