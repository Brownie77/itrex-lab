const StrategyInterface = require('../../strategyInterface');

module.exports = class ArrayStrategy extends StrategyInterface {
  constructor(storage, name) {
    super();
    this.storage = storage;
    this.name = name;
    this.#create();
  }

  async insert(key, value) {
    return this.storage[this.name].set(key, value);
  }

  async exist(value) {
    return this.storage[this.name].has(value);
  }

  async delete(key) {
    return this.storage[this.name].set(key, null);
  }

  async get(key) {
    return { ...this.storage[this.name].get(key) };
  }

  #create() {
    this.storage.allocateMap(this.name);
  }
};
