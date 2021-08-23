const util = require('util');
const StrategyInterface = require('../../strategyInterface');

module.exports = class ArrayStrategy extends StrategyInterface {
  constructor(storage, name) {
    super();
    this.storage = storage;
    this.name = name;
    this.storage.get = util.promisify(this.storage.get);
    this.storage.exists = util.promisify(this.storage.exists);
    this.#init();
  }

  async insert(value) {
    const array = await this.#getArray();
    array.push(value);
    return this.storage.set(this.name, JSON.stringify(array));
  }

  async exist(value) {
    const array = await this.#getArray();
    return array.some((e) => e.name === value.name);
  }

  async delete() {
    const array = await this.#getArray();
    array.shift();
    return this.storage.set(this.name, JSON.stringify(array));
  }

  async get() {
    const array = await this.#getArray();
    return array[0];
  }

  async #getArray() {
    const array = await this.storage.get(this.name);
    return JSON.parse(array);
  }

  async #init() {
    const inited = await this.storage.exists(this.name);
    if (!inited) {
      this.storage.set(this.name, JSON.stringify([]));
    }
  }
};
