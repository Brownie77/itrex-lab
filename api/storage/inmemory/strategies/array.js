const StrategyInterface = require('../../strategyInterface');

module.exports = class ArrayStrategy extends StrategyInterface {
  constructor(storage, name) {
    super();
    this.storage = storage;
    this.name = name;
    this.#create();
  }

  async insert(value) {
    return this.storage[this.name].push(value);
  }

  async exist(value) {
    return this.storage[this.name].some((e) => e.name === value.name);
  }

  async delete() {
    return this.storage[this.name].shift();
  }

  async get() {
    return this.storage[this.name][0];
  }

  #create() {
    this.storage.allocateArray(this.name);
  }
};
