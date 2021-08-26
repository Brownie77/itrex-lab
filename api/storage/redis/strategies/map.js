const util = require('util');
const StrategyInterface = require('../../strategyInterface');

module.exports = class ArrayStrategy extends StrategyInterface {
  constructor(storage, name) {
    super();
    this.storage = storage;
    this.name = name;
    this.storage.get = util.promisify(this.storage.get);
  }

  async insert(key, value) {
    return this.storage.set(key, JSON.stringify(value));
  }

  async exist(value) {
    return this.storage.exists(value);
  }

  async delete(key) {
    return this.client.del(key);
  }

  async get(key) {
    const data = await this.storage.get(key);
    return JSON.parse(data);
  }
};
